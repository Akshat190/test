'use client';

import { useState } from 'react';

import Icon from '@/components/Icon';
import type { Campus } from '@/lib/types';

type Errors = Record<string, string[]>;

const REQUIRED = [
  { field: 'name', label: 'Your name', type: 'text', placeholder: 'Enter your full name', autoComplete: 'name' },
  { field: 'email', label: 'Your email', type: 'email', placeholder: 'Enter your email address', autoComplete: 'email' },
  { field: 'phone', label: 'Phone number', type: 'tel', placeholder: 'Enter your phone number', autoComplete: 'tel' },
] as const;

export default function ContactForm({ campuses }: { campuses: Campus[] }) {
  const [values, setValues] = useState({
    name: '',
    email: '',
    phone: '',
    campus: '',
    subject: '',
    message: '',
    website: '',
  });
  const [errors, setErrors] = useState<Errors>({});
  const [success, setSuccess] = useState(false);
  const [sending, setSending] = useState(false);

  const set = (field: keyof typeof values) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setValues((current) => ({ ...current, [field]: event.target.value }));
  };

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    setSuccess(false);
    setErrors({});

    try {
      const response = await fetch('/api/contact/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setErrors(data.errors || { __all__: ['Could not send your message. Please try again.'] });
        return;
      }

      setSuccess(true);
      setValues({ name: '', email: '', phone: '', campus: '', subject: '', message: '', website: '' });
    } catch {
      setErrors({ __all__: ['Could not send your message. Please try again.'] });
    } finally {
      setSending(false);
    }
  }

  const fieldErrors = (field: string) =>
    errors[field] ? (
      <div id={`${field}-error`} className="text-danger small" role="alert">{errors[field].join(', ')}</div>
    ) : null;

  const describedBy = (field: string) => (errors[field] ? `${field}-error` : undefined);

  return (
    <>
      <div aria-live="polite">
        {success && (
          <div className="alert alert-success" role="status">
            Thank you. Your message has been received.
          </div>
        )}
        {Object.keys(errors).length > 0 && (
          <div className="alert alert-danger" role="alert">Please correct the errors below.</div>
        )}
        {errors.__all__ && (
          <div className="alert alert-danger" role="alert">{errors.__all__.join(', ')}</div>
        )}
      </div>

      <form className="contact-form" method="post" action="/contact/" onSubmit={onSubmit} noValidate>
        {/* Honeypot: hidden from people, bots fill it and the server drops the message. */}
        <div className="hp-field" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input
            id="website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={values.website}
            onChange={set('website')}
          />
        </div>

        {REQUIRED.map((input) => (
          <div key={input.field} className="form-group">
            <label htmlFor={input.field}>
              {input.label} {input.field !== 'phone' && <span className="required-mark" aria-hidden="true">*</span>}
            </label>
            <input
              type={input.type}
              name={input.field}
              className="form-control"
              id={input.field}
              placeholder={input.placeholder}
              autoComplete={input.autoComplete}
              required={input.field !== 'phone'}
              aria-required={input.field !== 'phone'}
              aria-invalid={errors[input.field] ? true : undefined}
              aria-describedby={describedBy(input.field)}
              value={values[input.field]}
              onChange={set(input.field)}
            />
            {fieldErrors(input.field)}
          </div>
        ))}

        <div className="form-group">
          <label htmlFor="campus">Campus</label>
          <select name="campus" className="form-control" id="campus" value={values.campus} onChange={set('campus')}>
            <option value="">Select a campus (optional)</option>
            {campuses.map((campus) => (
              <option key={campus.id} value={campus.id}>{campus.name}</option>
            ))}
          </select>
          {fieldErrors('campus')}
        </div>

        <div className="form-group">
          <label htmlFor="subject">
            Subject <span className="required-mark" aria-hidden="true">*</span>
          </label>
          <input
            type="text"
            name="subject"
            className="form-control"
            id="subject"
            placeholder="What is this regarding?"
            required
            aria-required
            aria-invalid={errors.subject ? true : undefined}
            aria-describedby={describedBy('subject')}
            value={values.subject}
            onChange={set('subject')}
          />
          {fieldErrors('subject')}
        </div>

        <div className="form-group">
          <label htmlFor="message">
            Your message <span className="required-mark" aria-hidden="true">*</span>
          </label>
          <textarea
            name="message"
            className="form-control"
            id="message"
            rows={5}
            placeholder="Type your message here..."
            required
            aria-required
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={describedBy('message')}
            value={values.message}
            onChange={set('message')}
          ></textarea>
          {fieldErrors('message')}
        </div>

        <button type="submit" className="btn-submit" disabled={sending}>
          {sending ? 'Sending...' : 'Send message'} <Icon name="paper-plane" className="ms-2" />
        </button>
      </form>
    </>
  );
}
