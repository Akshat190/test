"""Outbound notifications for the website contact form."""

import logging

from django.conf import settings
from django.core.mail import EmailMessage

logger = logging.getLogger('khschool')


def notify_new_enquiry(submission):
    """Email the office about a new enquiry. Never raises: a mail failure
    must not lose a submission that is already saved."""
    if not getattr(settings, 'EMAIL_HOST', ''):
        logger.warning(
            'Enquiry %s saved but email is not configured (EMAIL_HOST unset)', submission.pk
        )
        return

    recipient = getattr(settings, 'CONTACT_NOTIFY_EMAIL', '')
    if not recipient:
        logger.warning('Enquiry %s saved but CONTACT_NOTIFY_EMAIL is unset', submission.pk)
        return

    campus = submission.campus.name if submission.campus else 'Not specified'
    body = (
        f'New enquiry from the school website.\n\n'
        f'Name:    {submission.name}\n'
        f'Email:   {submission.email}\n'
        f'Phone:   {submission.phone or "-"}\n'
        f'Campus:  {campus}\n'
        f'Subject: {submission.subject}\n\n'
        f'{submission.message}\n\n'
        f'-- \n'
        f'Reply to this email to answer {submission.name} directly.\n'
        f'Open in admin: /admin/khschool/contactsubmission/{submission.pk}/change/\n'
    )

    try:
        EmailMessage(
            subject=f'Website enquiry: {submission.subject}',
            body=body,
            from_email=settings.DEFAULT_FROM_EMAIL,
            to=[recipient],
            reply_to=[submission.email],
        ).send(fail_silently=False)
    except Exception:
        logger.exception('Enquiry %s saved but the notification email failed', submission.pk)
