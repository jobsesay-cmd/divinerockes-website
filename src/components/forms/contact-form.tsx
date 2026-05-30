'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { apiPost } from '@/lib/api/client';
import { contactFormSchema } from '@/lib/validation/forms';
import type { z } from 'zod';

type ContactValues = z.infer<typeof contactFormSchema>;

export function ContactForm() {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      company: '',
      message: '',
    },
  });

  const onSubmit = async (values: ContactValues) => {
    setSubmitError(null);

    try {
      await apiPost('/api/inquiries', {
        name: values.fullName,
        email: values.email,
        phone: values.phone || undefined,
        subject: values.company?.trim() || 'Website contact inquiry',
        message: values.message,
        sourcePage: '/contact',
      });

      setShowSuccess(true);
      reset();
      window.setTimeout(() => setShowSuccess(false), 5000);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : 'Unable to send your message right now. Please try again.'
      );
    }
  };

  return (
    <>
      {showSuccess ? (
        <div className="success-message">
          <i className="fas fa-check-circle" style={{ marginRight: '10px' }}></i>
          Thank you for your message! We&apos;ll get back to you within 24 hours.
        </div>
      ) : null}

      {submitError ? <div className="error-message">{submitError}</div> : null}

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="form-group">
          <label className="form-label" htmlFor="fullName">
            Full Name *
          </label>
          <input id="fullName" className="form-control" {...register('fullName')} />
          {errors.fullName ? <p className="field-error">{errors.fullName.message}</p> : null}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label" htmlFor="email">
              Email Address *
            </label>
            <input id="email" type="email" className="form-control" {...register('email')} />
            {errors.email ? <p className="field-error">{errors.email.message}</p> : null}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="phone">
              Phone Number
            </label>
            <input id="phone" className="form-control" {...register('phone')} />
            {errors.phone ? <p className="field-error">{errors.phone.message}</p> : null}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="company">
            Company / Subject
          </label>
          <input id="company" className="form-control" {...register('company')} />
          {errors.company ? <p className="field-error">{errors.company.message}</p> : null}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="message">
            Message *
          </label>
          <textarea id="message" className="form-control" rows={6} {...register('message')} />
          {errors.message ? <p className="field-error">{errors.message.message}</p> : null}
        </div>

        <button type="submit" className="btn btn-primary btn-large" disabled={isSubmitting}>
          <i className="fas fa-paper-plane" style={{ marginRight: '10px' }}></i>
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </>
  );
}