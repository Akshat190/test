from django.core.management.base import BaseCommand
from khschool.models import Role


class Command(BaseCommand):
    help = 'Create default hierarchy roles for campus management'

    def handle(self, *args, **options):
        roles = [
            {
                'name': 'document_editor',
                'display_name': 'Document Editor',
                'level': 1,
                'can_change_photo': False,
                'can_change_documents': True,
                'can_manage_users': False,
                'can_manage_roles': False,
                'is_super_admin': False,
            },
            {
                'name': 'photo_editor',
                'display_name': 'Photo Editor',
                'level': 2,
                'can_change_photo': True,
                'can_change_documents': False,
                'can_manage_users': False,
                'can_manage_roles': False,
                'is_super_admin': False,
            },
            {
                'name': 'admin',
                'display_name': 'Admin',
                'level': 3,
                'can_change_photo': True,
                'can_change_documents': True,
                'can_manage_users': True,
                'can_manage_roles': False,
                'is_super_admin': False,
            },
            {
                'name': 'super_admin',
                'display_name': 'Super Admin',
                'level': 4,
                'can_change_photo': True,
                'can_change_documents': True,
                'can_manage_users': True,
                'can_manage_roles': True,
                'is_super_admin': True,
            },
        ]

        for role_data in roles:
            role, created = Role.objects.get_or_create(
                name=role_data['name'],
                defaults=role_data
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f'Created role: {role.display_name}'))
            else:
                # Update existing role if fields changed
                updated = False
                for field, value in role_data.items():
                    if getattr(role, field) != value:
                        setattr(role, field, value)
                        updated = True
                if updated:
                    role.save()
                    self.stdout.write(self.style.WARNING(f'Updated role: {role.display_name}'))
                else:
                    self.stdout.write(self.style.NOTICE(f'Role already exists: {role.display_name}'))

        self.stdout.write(self.style.SUCCESS('\nDone! Use /admin/khschool/userprofile/ to assign roles to users.'))
        self.stdout.write(self.style.NOTICE('Hierarchy: Document Editor (1) < Photo Editor (2) < Admin (3) < Super Admin (4)'))
