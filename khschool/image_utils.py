"""Image upload helpers: downscale + re-encode photos on save.

Phone/camera originals (10-25 MB) are wasteful as web images and can
trip upload limits. Every model that stores photos calls
:func:`compress_field_file` from its ``save()`` (via
``CompressedImageMixin``), so admin single uploads, bulk uploads and
any future upload path all get the same treatment.

Rules:
- Never upscale; only shrink images larger than ``MAX_DIMENSION``.
- Re-encode files larger than ``REENCODE_ABOVE_BYTES`` even when
  dimensions are fine (e.g. heavy PNG screenshots).
- Animated GIFs are left untouched (resizing would kill animation).
- Any failure falls back to the original file — uploads never break
  because of compression.
"""

import io
import logging

from django.core.files.base import ContentFile

logger = logging.getLogger('khschool')

MAX_DIMENSION = 1920
JPEG_QUALITY = 80
REENCODE_ABOVE_BYTES = 3 * 1024 * 1024
SKIP_FORMATS = {'GIF'}


def compress_field_file(field_file, max_dimension=MAX_DIMENSION):
    """Return a compressed ``ContentFile`` for an uploaded image.

    Returns ``None`` when no processing is needed or the file cannot
    be handled, in which case the caller keeps the original.
    """
    from PIL import Image as PILImage

    try:
        raw = field_file.read()
    except Exception as exc:
        logger.warning('Could not read uploaded image %s: %s',
                       getattr(field_file, 'name', '?'), exc)
        return None

    size = len(raw)
    try:
        img = PILImage.open(io.BytesIO(raw))
        img.load()
        fmt = (img.format or '').upper()
        width, height = img.size
    except Exception as exc:
        logger.warning('Could not parse uploaded image %s: %s',
                       getattr(field_file, 'name', '?'), exc)
        return None

    if fmt in SKIP_FORMATS:
        return None

    needs_resize = width > max_dimension or height > max_dimension
    needs_reencode = size > REENCODE_ABOVE_BYTES and fmt in {'JPEG', 'JPG', 'PNG', 'WEBP'}
    if not (needs_resize or needs_reencode):
        return None

    try:
        if needs_resize:
            img.thumbnail((max_dimension, max_dimension), PILImage.LANCZOS)
        save_format = 'JPEG' if fmt in {'JPEG', 'JPG'} else (fmt if fmt in {'PNG', 'WEBP'} else 'JPEG')
        if save_format == 'JPEG' and img.mode in ('RGBA', 'LA', 'P'):
            background = PILImage.new('RGB', img.size, (255, 255, 255))
            background.paste(img, mask=img.split()[-1] if img.mode in ('RGBA', 'LA') else None)
            img = background
        elif save_format in {'PNG', 'WEBP'} and img.mode == 'P':
            img = img.convert('RGBA' if save_format == 'PNG' else 'RGB')

        buf = io.BytesIO()
        save_kwargs = {'optimize': True}
        if save_format in {'JPEG', 'WEBP'}:
            save_kwargs['quality'] = JPEG_QUALITY
        img.save(buf, format=save_format, **save_kwargs)
        logger.info('Compressed image %s: %dx%d %dKB -> %dx%d %dKB (%s)',
                    getattr(field_file, 'name', '?'),
                    width, height, size // 1024,
                    img.size[0], img.size[1], buf.tell() // 1024, save_format)
        return ContentFile(buf.getvalue())
    except Exception as exc:
        logger.warning('Image compression failed for %s, keeping original: %s',
                       getattr(field_file, 'name', '?'), exc)
        return None


class CompressedImageMixin:
    """Model mixin: compress image fields on save.

    Set ``COMPRESS_FIELDS = ['photo', ...]`` with the ImageField names.
    Only freshly uploaded files are processed — already-stored files
    are left alone.
    """

    COMPRESS_FIELDS = []

    def _compress_images(self):
        from django.core.files.uploadedfile import UploadedFile

        for field_name in self.COMPRESS_FIELDS:
            field_file = getattr(self, field_name, None)
            if not field_file:
                continue
            try:
                current = field_file.file
            except Exception:
                continue
            if not isinstance(current, UploadedFile):
                continue  # not a fresh upload; leave stored file alone
            compressed = compress_field_file(current)
            if compressed is None:
                continue
            original_name = field_file.name or getattr(current, 'name', 'upload.jpg')
            field_file.save(original_name, compressed, save=False)

    def save(self, *args, **kwargs):
        self._compress_images()
        super().save(*args, **kwargs)
