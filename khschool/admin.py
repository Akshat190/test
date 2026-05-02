from django.contrib import admin
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from khschool.models import (
    Celebration, CarouselImage, CelebrationPhoto, Gallery, GalleryImage,
    Campus, CampusDocument, Role, UserProfile
)
from khschool.forms import (
    CelebrationForm, CelebrationPhotoForm, CarouselImageForm,
    GalleryForm, GalleryImageForm
)


def get_user_role(user):
    """Helper to get a user's role from their profile."""
    if not user or not user.is_authenticated:
        return None
    if hasattr(user, 'profile') and user.profile.role:
        return user.profile.role
    return None


# ─── Role Admin ────────────────────────────────────────────────

@admin.register(Role)
class RoleAdmin(admin.ModelAdmin):
    list_display = ('display_name', 'level', 'can_change_photo', 'can_change_documents',
                    'can_manage_users', 'can_manage_roles', 'is_super_admin')
    list_filter = ('level',)
    ordering = ['-level']

    def has_add_permission(self, request):
        # Roles are pre-defined; nobody can create new ones
        return False

    def has_change_permission(self, request, obj=None):
        role = get_user_role(request.user)
        return request.user.is_superuser or (role and role.can_manage_roles)

    def has_delete_permission(self, request, obj=None):
        # Pre-defined roles cannot be deleted
        return False


# ─── UserProfile Admin ─────────────────────────────────────────

class UserProfileInline(admin.StackedInline):
    model = UserProfile
    can_delete = False
    verbose_name_plural = 'Campus Role'
    fields = ('role',)


class UserAdmin(BaseUserAdmin):
    inlines = (UserProfileInline,)
    list_display = ('username', 'email', 'first_name', 'last_name', 'is_staff', 'get_role')

    def get_role(self, obj):
        if hasattr(obj, 'profile') and obj.profile.role:
            return obj.profile.role.display_name
        return '-'
    get_role.short_description = 'Campus Role'

    def get_queryset(self, request):
        qs = super().get_queryset(request)
        role = get_user_role(request.user)
        if request.user.is_superuser or (role and role.can_manage_users):
            return qs
        # Regular users can only see themselves
        return qs.filter(id=request.user.id)

    def save_formset(self, request, form, formset, change):
        """Override to use get_or_create for UserProfile inline, preventing UNIQUE constraint errors."""
        instances = formset.save(commit=False)
        for instance in instances:
            if isinstance(instance, UserProfile):
                # Use get_or_create to avoid duplicate profile errors
                UserProfile.objects.get_or_create(
                    user=instance.user,
                    defaults={'role': instance.role}
                )
            else:
                instance.save()
        formset.save_m2m()


# Re-register UserAdmin
admin.site.unregister(User)
admin.site.register(User, UserAdmin)


# ─── Campus Document Inline ────────────────────────────────────

class CampusDocumentInline(admin.TabularInline):
    model = CampusDocument
    extra = 1
    fields = ('title', 'file', 'order')
    ordering = ['order']

    def has_add_permission(self, request, obj=None):
        role = get_user_role(request.user)
        if not role:
            return False
        return role.can_change_documents or role.is_super_admin

    def has_change_permission(self, request, obj=None):
        role = get_user_role(request.user)
        if not role:
            return False
        return role.can_change_documents or role.is_super_admin

    def has_delete_permission(self, request, obj=None):
        role = get_user_role(request.user)
        if not role:
            return False
        return role.can_change_documents or role.is_super_admin


# ─── Campus Admin ──────────────────────────────────────────────

@admin.register(Campus)
class CampusAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'board', 'is_active', 'has_photo', 'document_count')
    list_filter = ('is_active', 'board')
    search_fields = ('name', 'slug', 'board', 'affiliation_number')
    ordering = ['name']

    def _get_role(self, request):
        return get_user_role(request.user)

    def get_fields(self, request, obj=None):
        role = self._get_role(request)
        if request.user.is_superuser or (role and role.is_super_admin):
            return ['slug', 'name', 'board', 'affiliation_number', 'timings', 'photo', 'is_active']
        if role and role.can_change_photo:
            return ['name', 'photo']
        return ['name']

    def get_readonly_fields(self, request, obj=None):
        role = self._get_role(request)
        if request.user.is_superuser or (role and role.is_super_admin):
            return []
        if role and role.can_change_photo:
            return ['name']
        return ['slug', 'name', 'board', 'affiliation_number', 'timings', 'photo', 'is_active']

    def get_inline_instances(self, request, obj=None):
        inlines = []
        role = self._get_role(request)
        if role and (role.can_change_documents or role.is_super_admin):
            inlines.append(CampusDocumentInline(self.model, self.admin_site))
        return inlines

    def has_change_permission(self, request, obj=None):
        if super().has_change_permission(request, obj):
            return True
        role = self._get_role(request)
        if role and (role.can_change_photo or role.can_change_documents):
            return True
        return False

    def has_module_permission(self, request):
        if super().has_module_permission(request):
            return True
        role = self._get_role(request)
        if role and (role.can_change_photo or role.can_change_documents or role.is_super_admin):
            return True
        return False

    def has_view_permission(self, request, obj=None):
        if super().has_view_permission(request, obj):
            return True
        role = self._get_role(request)
        if role and (role.can_change_photo or role.can_change_documents or role.is_super_admin):
            return True
        return False

    def has_add_permission(self, request):
        role = self._get_role(request)
        return request.user.is_superuser or (role and role.is_super_admin)

    def has_delete_permission(self, request, obj=None):
        role = self._get_role(request)
        return request.user.is_superuser or (role and role.is_super_admin)

    def get_queryset(self, request):
        qs = super().get_queryset(request)
        if request.user.is_superuser:
            return qs
        role = self._get_role(request)
        if role and role.can_change_documents and not role.can_change_photo:
            # Document-only editor - show all active campuses
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

    def get_queryset(self, request):
        qs = super().get_queryset(request)
        role = get_user_role(request.user)
        if request.user.is_superuser or (role and role.can_manage_roles):
            return qs
        # Document editors and photo editors only see their campuses
        return qs.filter(campus__is_active=True)

    def has_add_permission(self, request):
        role = get_user_role(request.user)
        return request.user.is_superuser or (role and (role.can_change_documents or role.is_super_admin))

    def has_change_permission(self, request, obj=None):
        role = get_user_role(request.user)
        return request.user.is_superuser or (role and (role.can_change_documents or role.is_super_admin))

    def has_delete_permission(self, request, obj=None):
        role = get_user_role(request.user)
        return request.user.is_superuser or (role and (role.can_change_documents or role.is_super_admin))


# ─── Existing Model Admins ─────────────────────────────────────

class CelebrationPhotoInline(admin.TabularInline):
    model = CelebrationPhoto
    form = CelebrationPhotoForm
    extra = 3
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
    extra = 3
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
