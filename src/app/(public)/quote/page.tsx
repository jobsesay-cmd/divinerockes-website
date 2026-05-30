'use client';

import Link from 'next/link';
import { type FormEvent, useState } from 'react';
import styles from './quote.module.css';

type FormData = {
  projectType: string;
  location: string;
  budget: string;
  startDate: string;
  duration: string;
  description: string;
  requirements: string;
  size: string;
  personnel: string;
  fullName: string;
  company: string;
  email: string;
  phone: string;
  contactTime: string;
  comments: string;
  privacy: boolean;
};

const initialFormData: FormData = {
  projectType: '',
  location: '',
  budget: '',
  startDate: '',
  duration: '',
  description: '',
  requirements: '',
  size: '',
  personnel: '',
  fullName: '',
  company: '',
  email: '',
  phone: '',
  contactTime: 'anytime',
  comments: '',
  privacy: false,
};

export default function QuotePage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validateStep = (step: number) => {
    const nextErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.projectType) nextErrors.projectType = 'Please select a project type';
      if (!formData.location.trim()) nextErrors.location = 'Please enter project location';
    }

    if (step === 2) {
      if (!formData.description.trim()) nextErrors.description = 'Please describe your project';
    }

    if (step === 3) {
      if (!formData.fullName.trim()) nextErrors.fullName = 'Please enter your full name';
      if (!formData.email.includes('@')) nextErrors.email = 'Please enter a valid email address';
      if (!formData.phone.trim()) nextErrors.phone = 'Please enter your phone number';
      if (!formData.privacy) nextErrors.privacy = 'Please agree to the Privacy Policy';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const nextStep = (target: number) => {
    if (validateStep(currentStep)) setCurrentStep(target);
  };

  const prevStep = (target: number) => setCurrentStep(target);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateStep(3)) return;

    setIsSubmitting(true);
    setErrors((prev) => ({ ...prev, submit: '' }));

    try {
      const payload = {
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        company: formData.company || undefined,
        serviceType: formData.projectType,
        timeline: formData.duration || formData.startDate || undefined,
        requirements: [
          `Location: ${formData.location}`,
          formData.budget ? `Budget: ${formData.budget}` : '',
          `Description: ${formData.description}`,
          formData.requirements ? `Specific requirements: ${formData.requirements}` : '',
          formData.size ? `Project size: ${formData.size}` : '',
          formData.personnel ? `Personnel: ${formData.personnel}` : '',
          formData.contactTime ? `Preferred contact time: ${formData.contactTime}` : '',
          formData.comments ? `Additional comments: ${formData.comments}` : '',
        ]
          .filter(Boolean)
          .join('\n'),
      };

      const response = await fetch('/api/inquiries/quotes', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to submit quote request');
      }

      setSubmitted(true);
    } catch (error) {
      console.error(error);
      setErrors((prev) => ({ ...prev, submit: 'Failed to submit request. Please try again.' }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section className={styles.pageBanner}>
        <div className={styles.container}>
          <h1>Request a Quote</h1>
          <p>Tell us about your project and we&apos;ll provide a comprehensive, competitive quote within 48 hours</p>
        </div>
      </section>

      <section className={styles.introSection}>
        <div className={styles.container}>
          <div className={styles.quoteIntro}>
            <h2 className={styles.sectionTitle}>Let&apos;s Build Together</h2>
            <p>
              Fill out the form below with your project details. Our team will review your requirements and prepare a
              detailed quotation tailored to your specific needs. All quotes include comprehensive breakdown of costs,
              timelines, and deliverables.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className={styles.container}>
          {submitted ? (
            <div className={styles.successMessage}>
              <div className={styles.successIcon}>
                <i className="fas fa-check-circle" />
              </div>
              <h2>Thank You for Your Inquiry!</h2>
              <p>
                Your quote request has been submitted successfully. Our team will review your details and get back to
                you within 48 hours.
              </p>

              <div className={styles.successDetails}>
                <h4>What happens next?</h4>
                <ul>
                  <li><i className="fas fa-check-circle" /> You&apos;ll receive a confirmation email shortly</li>
                  <li><i className="fas fa-check-circle" /> Our project manager will review your requirements</li>
                  <li><i className="fas fa-check-circle" /> We may contact you for additional details</li>
                  <li><i className="fas fa-check-circle" /> You&apos;ll receive a detailed quote within 48 hours</li>
                </ul>
              </div>

              <Link href="/" className={`${styles.btn} ${styles.btnPrimary}`}>
                Return to Home
              </Link>
            </div>
          ) : (
            <div className={styles.quoteFormWrapper}>
              <div className={styles.formHeader}>
                <i className="fas fa-file-invoice" />
                <h2>Project Quote Request</h2>
                <p>Please provide as much detail as possible to help us prepare an accurate quote</p>
              </div>

              <div className={styles.formBody}>
                <div className={styles.formProgress}>
                  {[1, 2, 3].map((step) => (
                    <div
                      key={step}
                      className={`${styles.progressStep} ${
                        currentStep === step ? styles.activeStep : ''
                      } ${currentStep > step ? styles.completedStep : ''}`}
                    >
                      <div className={styles.stepNumber}>{step}</div>
                      <div className={styles.stepLabel}>
                        {step === 1 && 'Project Info'}
                        {step === 2 && 'Project Details'}
                        {step === 3 && 'Contact Information'}
                      </div>
                    </div>
                  ))}
                </div>

                <form onSubmit={onSubmit}>
                  {currentStep === 1 && (
                    <div className={styles.formStep}>
                      <FormGroup label="Project Type *" icon="fas fa-tag" error={errors.projectType}>
                        <select
                          className={styles.formControl}
                          value={formData.projectType}
                          onChange={(e) => updateField('projectType', e.target.value)}
                        >
                          <option value="">Select project type</option>
                          <option value="construction">Construction Services</option>
                          <option value="civil">Civil Engineering & Infrastructure</option>
                          <option value="fabrication">Fabrication & Metal Works</option>
                          <option value="project-management">Project Management & Consultancy</option>
                          <option value="renovation">Renovation & Maintenance</option>
                          <option value="engineering">Engineering Consultancy</option>
                          <option value="other">Other</option>
                        </select>
                      </FormGroup>

                      <div className={styles.formRow}>
                        <FormGroup label="Project Location *" icon="fas fa-map-marker-alt" error={errors.location}>
                          <input
                            className={styles.formControl}
                            placeholder="City/District, Sierra Leone"
                            value={formData.location}
                            onChange={(e) => updateField('location', e.target.value)}
                          />
                        </FormGroup>

                        <FormGroup label="Budget Range" icon="fas fa-money-bill-wave">
                          <select
                            className={styles.formControl}
                            value={formData.budget}
                            onChange={(e) => updateField('budget', e.target.value)}
                          >
                            <option value="">Select budget range</option>
                            <option value="under-50k">Under $50,000</option>
                            <option value="50k-100k">$50,000 - $100,000</option>
                            <option value="100k-250k">$100,000 - $250,000</option>
                            <option value="250k-500k">$250,000 - $500,000</option>
                            <option value="500k-1m">$500,000 - $1 million</option>
                            <option value="over-1m">Over $1 million</option>
                            <option value="not-specified">Not specified</option>
                          </select>
                        </FormGroup>
                      </div>

                      <div className={styles.formRow}>
                        <FormGroup label="Expected Start Date" icon="fas fa-calendar-alt">
                          <input
                            type="date"
                            className={styles.formControl}
                            value={formData.startDate}
                            onChange={(e) => updateField('startDate', e.target.value)}
                          />
                        </FormGroup>

                        <FormGroup label="Project Duration" icon="fas fa-clock">
                          <select
                            className={styles.formControl}
                            value={formData.duration}
                            onChange={(e) => updateField('duration', e.target.value)}
                          >
                            <option value="">Select expected duration</option>
                            <option value="under-3">Under 3 months</option>
                            <option value="3-6">3-6 months</option>
                            <option value="6-12">6-12 months</option>
                            <option value="over-12">Over 12 months</option>
                            <option value="not-specified">Not specified</option>
                          </select>
                        </FormGroup>
                      </div>

                      <div className={styles.formActionsRight}>
                        <button type="button" className={`${styles.btn} ${styles.btnPrimary}`} onClick={() => nextStep(2)}>
                          Next Step <i className="fas fa-arrow-right" />
                        </button>
                      </div>
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div className={styles.formStep}>
                      <FormGroup label="Project Scope / Description *" icon="fas fa-clipboard-list" error={errors.description}>
                        <textarea
                          className={styles.formControl}
                          placeholder="Please describe your project in detail. Include information about size, specifications, materials, and any special requirements..."
                          value={formData.description}
                          onChange={(e) => updateField('description', e.target.value)}
                        />
                      </FormGroup>

                      <FormGroup label="Specific Requirements" icon="fas fa-file-alt">
                        <textarea
                          className={styles.formControl}
                          placeholder="List any specific technical requirements, materials, or standards that need to be met..."
                          value={formData.requirements}
                          onChange={(e) => updateField('requirements', e.target.value)}
                        />
                      </FormGroup>

                      <div className={styles.formRow}>
                        <FormGroup label="Project Size / Scale" icon="fas fa-ruler-combined">
                          <input
                            className={styles.formControl}
                            placeholder="e.g., 500 sq meters, 2 km road, etc."
                            value={formData.size}
                            onChange={(e) => updateField('size', e.target.value)}
                          />
                        </FormGroup>

                        <FormGroup label="Number of Personnel Needed" icon="fas fa-hard-hat">
                          <input
                            type="number"
                            className={styles.formControl}
                            placeholder="Estimated workforce required"
                            value={formData.personnel}
                            onChange={(e) => updateField('personnel', e.target.value)}
                          />
                        </FormGroup>
                      </div>

                      <div className={styles.formActionsBetween}>
                        <button type="button" className={`${styles.btn} ${styles.btnOutline}`} onClick={() => prevStep(1)}>
                          <i className="fas fa-arrow-left" /> Previous
                        </button>
                        <button type="button" className={`${styles.btn} ${styles.btnPrimary}`} onClick={() => nextStep(3)}>
                          Next Step <i className="fas fa-arrow-right" />
                        </button>
                      </div>
                    </div>
                  )}

                  {currentStep === 3 && (
                    <div className={styles.formStep}>
                      <div className={styles.formRow}>
                        <FormGroup label="Full Name *" icon="fas fa-user" error={errors.fullName}>
                          <input
                            className={styles.formControl}
                            placeholder="John Doe"
                            value={formData.fullName}
                            onChange={(e) => updateField('fullName', e.target.value)}
                          />
                        </FormGroup>

                        <FormGroup label="Company/Organization" icon="fas fa-building">
                          <input
                            className={styles.formControl}
                            placeholder="Company name (if applicable)"
                            value={formData.company}
                            onChange={(e) => updateField('company', e.target.value)}
                          />
                        </FormGroup>
                      </div>

                      <div className={styles.formRow}>
                        <FormGroup label="Email Address *" icon="fas fa-envelope" error={errors.email}>
                          <input
                            type="email"
                            className={styles.formControl}
                            placeholder="your@email.com"
                            value={formData.email}
                            onChange={(e) => updateField('email', e.target.value)}
                          />
                        </FormGroup>

                        <FormGroup label="Phone Number *" icon="fas fa-phone" error={errors.phone}>
                          <input
                            type="tel"
                            className={styles.formControl}
                            placeholder="+232 XX XXX XXX"
                            value={formData.phone}
                            onChange={(e) => updateField('phone', e.target.value)}
                          />
                        </FormGroup>
                      </div>

                      <FormGroup label="Preferred Contact Time" icon="fas fa-clock">
                        <select
                          className={styles.formControl}
                          value={formData.contactTime}
                          onChange={(e) => updateField('contactTime', e.target.value)}
                        >
                          <option value="anytime">Anytime</option>
                          <option value="morning">Morning (8 AM - 12 PM)</option>
                          <option value="afternoon">Afternoon (12 PM - 5 PM)</option>
                          <option value="evening">Evening (5 PM - 8 PM)</option>
                        </select>
                      </FormGroup>

                      <FormGroup label="Additional Comments" icon="fas fa-comment">
                        <textarea
                          className={styles.formControl}
                          placeholder="Any other information you'd like us to know..."
                          value={formData.comments}
                          onChange={(e) => updateField('comments', e.target.value)}
                        />
                      </FormGroup>

                      <div className={styles.formCheck}>
                        <input
                          id="privacy"
                          type="checkbox"
                          checked={formData.privacy}
                          onChange={(e) => updateField('privacy', e.target.checked)}
                        />
                        <label htmlFor="privacy">
                          I agree to the <Link href="/privacy-policy">Privacy Policy</Link> and consent to being
                          contacted about my project. *
                        </label>
                      </div>
                      {errors.privacy && <p className={styles.errorMessage}>{errors.privacy}</p>}
                      {errors.submit && <p className={styles.errorMessage}>{errors.submit}</p>}

                      <div className={styles.formActionsBetween}>
                        <button type="button" className={`${styles.btn} ${styles.btnOutline}`} onClick={() => prevStep(2)}>
                          <i className="fas fa-arrow-left" /> Previous
                        </button>
                        <button type="submit" disabled={isSubmitting} className={`${styles.btn} ${styles.btnAccent} ${styles.btnLarge}`}>
                          {isSubmitting ? 'Submitting...' : 'Submit Quote Request'} <i className="fas fa-paper-plane" />
                        </button>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function FormGroup({
  label,
  icon,
  error,
  children,
}: {
  label: string;
  icon: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={styles.formGroup}>
      <label className={styles.formLabel}>
        <i className={icon} />
        {label}
      </label>
      {children}
      {error && <div className={styles.errorMessage}>{error}</div>}
    </div>
  );
}