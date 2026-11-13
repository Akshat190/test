"""Register the disclosure PDFs already present in MEDIA_ROOT as CampusDocuments.

The files in ``campus/documents/`` are the CBSE mandatory-disclosure set
(Affiliation Letter, NOC, Recognition, Building Safety, Fire Safety, fee
structure, academic calendar and the PTA/SMC lists), so they belong to the
CBSE-affiliated campus, Chhatral. Use ``--campus`` to register them against a
different slug, and ``--dry-run`` to see the titles first.

Existing rows are left alone, so the command is safe to re-run.
"""

import re
from pathlib import Path

from django.conf import settings
from django.core.management.base import BaseCommand, CommandError

from khschool.forms import title_from_filename
from khschool.models import Campus, CampusDocument


def natural_key(name):
    return [int(part) if part.isdigit() else part.lower() for part in re.split(r'(\d+)', name)]


ACRONYMS = {'Cbse': 'CBSE', 'Noc': 'NOC', 'Pta': 'PTA', 'Smc': 'SMC', 'Ix': 'IX'}


def readable_title(filename):
    """Filename -> a title that reads well in the public disclosure list."""
    title = title_from_filename(filename)
    # "RECOGNITION CERTIFICATE 1 5 6 8" -> drop the trailing class fragments
    title = re.sub(r'(\s+\d+){3,}\s*$', '', title).strip()
    if title.isupper():
        title = title.title()
        for wrong, right in ACRONYMS.items():
            title = title.replace(wrong, right)
    elif title[:1].islower():
        title = title[:1].upper() + title[1:]
    return title


class Command(BaseCommand):
    help = 'Create CampusDocument rows for the PDFs already in media/campus/documents/'

    def add_arguments(self, parser):
        parser.add_argument('--campus', default='chattral', help='Campus slug (default: chattral)')
        parser.add_argument('--dry-run', action='store_true', help='List what would be created')

    def handle(self, *args, **options):
        folder = Path(settings.MEDIA_ROOT) / 'campus' / 'documents'
        if not folder.is_dir():
            raise CommandError(f'No documents folder at {folder}')

        files = sorted((p for p in folder.iterdir() if p.suffix.lower() == '.pdf'), key=lambda p: natural_key(p.name))
        if not files:
            raise CommandError(f'No PDFs in {folder}')

        if options['dry_run']:
            for name in sorted((p.name for p in files), key=natural_key):
                self.stdout.write(f'  {readable_title(name)}')
            self.stdout.write(f'{len(files)} file(s) found in {folder}')
            return

        slug = options['campus']
        try:
            campus = Campus.objects.get(slug__iexact=slug)
        except Campus.DoesNotExist:
            raise CommandError(f'No campus with slug "{slug}"')

        created = 0
        for order, path in enumerate(files):
            relative = f'campus/documents/{path.name}'
            if CampusDocument.objects.filter(campus=campus, file=relative).exists():
                continue
            CampusDocument.objects.create(
                campus=campus,
                title=readable_title(path.name),
                file=relative,
                order=order,
            )
            created += 1
            self.stdout.write(f'  {readable_title(path.name)}')

        self.stdout.write(self.style.SUCCESS(f'{created} document(s) added to {campus.name}'))
