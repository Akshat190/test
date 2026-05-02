from django.contrib import admin
from khschool.models import (
    Celebration, CarouselImage, CelebrationPhoto, Gallery, GalleryImage,
    Campus, CampusDocument
)
from khschool.forms import (
    CelebrationForm, CelebrationPhotoForm, CarouselImageForm,
    GalleryForm, GalleryImageForm
)

# Register your models here.

class CelebrationPhotoInline(admin.TabularInline):
    model = CelebrationPhoto
    form = CelebrationPhotoForm
    extra = 3  # Show 3 empty forms for adding photos
    fields = ('photo', 'photo_url', 'caption', 'order')
    readonly_fields = ('photo_url',)

    def photo_url(self, obj):
        return obj.get_photo_url()

@admin.register(CarouselImage)
class CarouselImageAdmin(admin.ModelAdmin):
    form = CarouselImageForm
    list_display = ('title', 'order', 'is_active')
    list_editable = ('order', 'is_active')
    list_filter = ('is_active',)
    search_fields = ('title', 'subtitle')
    readonly_fields = ('image_url',)

    def image_url(self, obj):
        return obj.get_image_url()

@admin.register(Celebration)
class CelebrationAdmin(admin.ModelAdmin):
    form = CelebrationForm
    list_display = ('festivalname', 'celebration_type', 'date', 'photo_count_display', 'preview_image')
    list_filter = ('date', 'celebration_type', 'is_featured')
    search_fields = ('festivalname', 'description')
    date_hierarchy = 'date'
    ordering = ('-date',)
    readonly_fields = ('image_url',)
    inlines = [CelebrationPhotoInline]
    
    def preview_image(self, obj):
        image_url = obj.get_image_url()
        if image_url:
            return f'<img src="{image_url}" width="50" height="50" style="object-fit: cover; border-radius: 5px;" />'
        return 'No Image'
    
    def photo_count_display(self, obj):
        count = obj.photo_count()
        return f'{count} photo{"s" if count != 1 else ""}'
    
    preview_image.allow_tags = True
    preview_image.short_description = 'Image Preview'
    photo_count_display.short_description = 'Additional Photos'

    def image_url(self, obj):
        return obj.get_image_url()

@admin.register(CelebrationPhoto)
class CelebrationPhotoAdmin(admin.ModelAdmin):
    form = CelebrationPhotoForm
    list_display = ('celebration', 'caption', 'order', 'preview_photo')
    list_filter = ('celebration',)
    list_editable = ('order',)
    readonly_fields = ('photo_url',)
    search_fields = ('celebration__festivalname', 'caption')
    
    def preview_photo(self, obj):
        photo_url = obj.get_photo_url()
        if photo_url:
            return f'<img src="{photo_url}" width="50" height="50" style="object-fit: cover; border-radius: 5px;" />'
        return 'No Image'
    
    preview_photo.allow_tags = True
    preview_photo.short_description = 'Photo Preview'

    def photo_url(self, obj):
        return obj.get_photo_url()


class GalleryImageInline(admin.TabularInline):
    model = GalleryImage
    form = GalleryImageForm
    extra = 3  # Show 3 empty forms for adding images
    fields = ('image', 'image_url', 'title', 'caption', 'order')
    readonly_fields = ('image_url',)

    def image_url(self, obj):
        return obj.get_image_url()


@admin.register(Gallery)
class GalleryAdmin(admin.ModelAdmin):
    form = GalleryForm
    list_display = ('name', 'category', 'date_created', 'image_count_display', 'preview_thumbnail', 'is_featured')
    list_filter = ('category', 'date_created', 'is_featured')
    search_fields = ('name', 'description')
    date_hierarchy = 'date_created'
    ordering = ('-date_created',)
    readonly_fields = ('thumbnail_url',)
    inlines = [GalleryImageInline]
    
    def preview_thumbnail(self, obj):
        thumbnail_url = obj.get_thumbnail_url()
        if thumbnail_url:
            return f'<img src="{thumbnail_url}" width="50" height="50" style="object-fit: cover; border-radius: 5px;" />'
        return 'No Thumbnail'
    
    def image_count_display(self, obj):
        count = obj.image_count()
        return f'{count} image{"s" if count != 1 else ""}'
    
    preview_thumbnail.allow_tags = True
    preview_thumbnail.short_description = 'Thumbnail'
    image_count_display.short_description = 'Images'

    def thumbnail_url(self, obj):
        return obj.get_thumbnail_url()


@admin.register(GalleryImage)
class GalleryImageAdmin(admin.ModelAdmin):
    form = GalleryImageForm
    list_display = ('gallery', 'title', 'order', 'date_added', 'preview_image')
    list_filter = ('gallery', 'date_added')
    list_editable = ('order',)
    readonly_fields = ('image_url',)
    search_fields = ('gallery__name', 'title', 'caption')
    date_hierarchy = 'date_added'

    def preview_image(self, obj):
        image_url = obj.get_image_url()
        if image_url:
            return f'<img src="{image_url}" width="50" height="50" style="object-fit: cover; border-radius: 5px;" />'
        return 'No Image'

    preview_image.allow_tags = True
    preview_image.short_description = 'Image Preview'

    def image_url(self, obj):
        return obj.get_image_url()


class CampusDocumentInline(admin.TabularInline):
    model = CampusDocument
    extra = 1
    fields = ('title', 'file', 'order')
    ordering = ['order']

    def has_add_permission(self, request, obj=None):
        return request.user.has_perm('khschool.add_campusdocument')

    def has_change_permission(self, request, obj=None):
        return request.user.has_perm('khschool.change_campusdocument')

    def has_delete_permission(self, request, obj=None):
        return request.user.has_perm('khschool.delete_campusdocument')


@admin.register(Campus)
class CampusAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'board', 'is_active', 'has_photo', 'document_count')
    list_filter = ('is_active', 'board')
    search_fields = ('name', 'slug', 'board', 'affiliation_number')
    ordering = ['name']

    def get_fields(self, request, obj=None):
        """Show different fields based on user permissions."""
        can_edit_photo = request.user.has_perm('khschool.change_campus_photo')
        can_edit_all = request.user.has_perm('khschool.change_campus')

        if can_edit_all:
            return ['slug', 'name', 'board', 'affiliation_number', 'timings', 'photo', 'is_active']
        elif can_edit_photo:
            return ['name', 'photo']
        else:
            return ['name']

    def get_readonly_fields(self, request, obj=None):
        """Make fields readonly based on user permissions."""
        can_edit_photo = request.user.has_perm('khschool.change_campus_photo')
        can_edit_all = request.user.has_perm('khschool.change_campus')

        if can_edit_all:
            return []
        elif can_edit_photo:
            return ['name']
        else:
            return ['slug', 'name', 'board', 'affiliation_number', 'timings', 'photo', 'is_active']

    def get_inline_instances(self, request, obj=None):
        """Only show document inline if user has document permissions."""
        inlines = []
        if request.user.has_perm('khschool.change_campusdocument') or \
           request.user.has_perm('khschool.add_campusdocument'):
            inlines.append(CampusDocumentInline(self.model, self.admin_site))
        return inlines

    def has_change_permission(self, request, obj=None):
        """Allow change if user has any campus-related permission."""
        if super().has_change_permission(request, obj):
            return True
        if request.user.has_perm('khschool.change_campus_photo'):
            return True
        return False

    def has_module_permission(self, request):
        """Show Campus module if user has any related permission."""
        if super().has_module_permission(request):
            return True
        perms = [
            'khschool.change_campus_photo',
            'khschool.add_campusdocument',
            'khschool.change_campusdocument',
            'khschool.delete_campusdocument',
        ]
        return any(request.user.has_perm(p) for p in perms)

    def has_view_permission(self, request, obj=None):
        """Allow viewing if user has any campus-related permission."""
        if super().has_view_permission(request, obj):
            return True
        perms = [
            'khschool.change_campus',
            'khschool.change_campus_photo',
            'khschool.add_campusdocument',
            'khschool.change_campusdocument',
            'khschool.delete_campusdocument',
        ]
        return any(request.user.has_perm(p) for p in perms)

    def has_add_permission(self, request):
        """Only superusers/staff with full change permission can add new campuses."""
        return request.user.has_perm('khschool.add_campus')

    def has_delete_permission(self, request, obj=None):
        """Only superusers/staff with full delete permission can delete campuses."""
        return request.user.has_perm('khschool.delete_campus')

    def get_queryset(self, request):
        """Document managers only see campuses they can manage documents for."""
        qs = super().get_queryset(request)
        if request.user.is_superuser:
            return qs
        if not request.user.has_perm('khschool.change_campus') and \
           not request.user.has_perm('khschool.change_campus_photo'):
            # Document-only manager - show all active campuses
            return qs.filter(is_active=True)
        return qs

    def has_photo(self, obj):
        return bool(obj.photo)
    has_photo.boolean = True
    has_photo.short_description = 'Photo'

    def document_count(self, obj):
        return obj.documents.count()
    document_count.short_description = 'Documents'


@admin.register(CampusDocument)
class CampusDocumentAdmin(admin.ModelAdmin):
    list_display = ('title', 'campus', 'order')
    list_filter = ('campus',)
    list_editable = ('order',)
    search_fields = ('title', 'campus__name')
    ordering = ['campus', 'order']