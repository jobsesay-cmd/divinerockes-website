"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import styles from "./quote.module.css";

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
  projectType: "",
  location: "",
  budget: "",
  startDate: "",
  duration: "",
  description: "",
  requirements: "",
  size: "",
  personnel: "",
  fullName: "",
  company: "",
  email: "",
  phone: "",
  contactTime: "anytime",
  comments: "",
  privacy: false,
};

export default function QuotePage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const updateField = (
    field: keyof FormData,
    value: string | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.projectType) newErrors.projectType = "Please select a project type";
      if (!formData.location.trim()) newErrors.location = "Please enter project location";
    }

    if (step === 2) {
      if (!formData.description.trim()) newErrors.description = "Please describe your project";
    }

    if (step === 3) {
      if (!formData.fullName.trim()) newErrors.fullName = "Please enter your full name";
      if (!formData.email.includes("@")) newErrors.email = "Please enter a valid email address";
      if (!formData.phone.trim()) newErrors.phone = "Please enter your phone number";
      if (!formData.privacy) newErrors.privacy = "Please agree to the Privacy Policy";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = (step: number) => {
    if (validateStep(currentStep)) {
      setCurrentStep(step);
    }
  };

  const previousStep = (step: number) => {
    setCurrentStep(step);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateStep(3)) return;

    console.log("Quote Request Submitted:", formData);

    // Future backend integration:
    // await fetch("/api/quotes", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(formData),
    // });

    setSubmitted(true);
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.logo}>
            <h1>DIVINEROCK</h1>
            <span>Engineering Services</span>
          </div>

          <nav className={styles.navMenu}>
            <Link href="/">Home</Link>
            <Link href="/about">About Us</Link>
            <Link href="/services">Services</Link>
            <Link href="/projects">Projects</Link>
            <Link href="/equipment">Equipment</Link>
            <Link href="/news">News</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/quote" className={`${styles.quoteBtn} ${styles.active}`}>
              Request a Quote
            </Link>
          </nav>
        </div>
      </header>

      <section className={styles.pageBanner}>
        <div className={styles.container}>
          <h1>Request a Quote</h1>
          <p>
            Tell us about your project and we&apos;ll provide a comprehensive,
            competitive quote within 48 hours
          </p>
        </div>
      </section>

      <section className={styles.introSection}>
        <div className={styles.container}>
          <div className={styles.quoteIntro}>
            <h2 className={styles.sectionTitle}>Let&apos;s Build Together</h2>
            <p>
              Fill out the form below with your project details. Our team will
              review your requirements and prepare a detailed quotation tailored
              to your specific needs. All quotes include comprehensive breakdown
              of costs, timelines, and deliverables.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className={styles.container}>
          {submitted ? (
            <div className={`${styles.successMessage} ${styles.show}`}>
              <div className={styles.successIcon}>
                <i className="fas fa-check" />
              </div>

              <h2>Thank You for Your Inquiry!</h2>
              <p>
                Your quote request has been submitted successfully. Our team will
                review your project details and get back to you within 48 hours.
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
                <p>
                  Please provide as much detail as possible to help us prepare an
                  accurate quote
                </p>
              </div>

              <div className={styles.formBody}>
                <div className={styles.formProgress}>
                  {[1, 2, 3].map((step) => (
                    <div
                      key={step}
                      className={`${styles.progressStep} ${
                        currentStep === step ? styles.activeStep : ""
                      } ${currentStep > step ? styles.completedStep : ""}`}
                    >
                      <div className={styles.stepNumber}>{step}</div>
                      <div className={styles.stepLabel}>
                        {step === 1 && "Project Info"}
                        {step === 2 && "Project Details"}
                        {step === 3 && "Contact Information"}
                      </div>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSubmit}>
                  {currentStep === 1 && (
                    <div className={styles.formStep}>
                      <FormGroup label="Project Type *" icon="fas fa-tag" error={errors.projectType}>
                        <select
                          className={styles.formControl}
                          value={formData.projectType}
                          onChange={(e) => updateField("projectType", e.target.value)}
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
                            value={formData.location}
                            placeholder="City/District, Sierra Leone"
                            onChange={(e) => updateField("location", e.target.value)}
                          />
                        </FormGroup>

                        <FormGroup label="Budget Range" icon="fas fa-money-bill-wave">
                          <select
                            className={styles.formControl}
                            value={formData.budget}
                            onChange={(e) => updateField("budget", e.target.value)}
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
                            onChange={(e) => updateField("startDate", e.target.value)}
                          />
                        </FormGroup>

                        <FormGroup label="Project Duration" icon="fas fa-clock">
                          <select
                            className={styles.formControl}
                            value={formData.duration}
                            onChange={(e) => updateField("duration", e.target.value)}
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
                          value={formData.description}
                          placeholder="Please describe your project in detail..."
                          onChange={(e) => updateField("description", e.target.value)}
                        />
                      </FormGroup>

                      <FormGroup label="Specific Requirements" icon="fas fa-file-alt">
                        <textarea
                          className={styles.formControl}
                          value={formData.requirements}
                          placeholder="List technical requirements, materials, or standards..."
                          onChange={(e) => updateField("requirements", e.target.value)}
                        />
                      </FormGroup>

                      <div className={styles.formRow}>
                        <FormGroup label="Project Size / Scale" icon="fas fa-ruler-combined">
                          <input
                            className={styles.formControl}
                            value={formData.size}
                            placeholder="e.g., 500 sq meters, 2 km road"
                            onChange={(e) => updateField("size", e.target.value)}
                          />
                        </FormGroup>

                        <FormGroup label="Number of Personnel Needed" icon="fas fa-hard-hat">
                          <input
                            type="number"
                            className={styles.formControl}
                            value={formData.personnel}
                            placeholder="Estimated workforce required"
                            onChange={(e) => updateField("personnel", e.target.value)}
                          />
                        </FormGroup>
                      </div>

                      <FormGroup label="Upload Supporting Documents Optional" icon="fas fa-paperclip">
                        <input
                          type="file"
                          className={styles.formControl}
                          multiple
                          accept=".pdf,.doc,.docx,.dwg,.jpg,.png"
                        />
                        <small>You can upload drawings, specifications, or relevant documents. Max 10MB.</small>
                      </FormGroup>

                      <div className={styles.formActionsBetween}>
                        <button type="button" className={`${styles.btn} ${styles.btnOutline}`} onClick={() => previousStep(1)}>
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
                            value={formData.fullName}
                            placeholder="John Doe"
                            onChange={(e) => updateField("fullName", e.target.value)}
                          />
                        </FormGroup>

                        <FormGroup label="Company/Organization" icon="fas fa-building">
                          <input
                            className={styles.formControl}
                            value={formData.company}
                            placeholder="Company name"
                            onChange={(e) => updateField("company", e.target.value)}
                          />
                        </FormGroup>
                      </div>

                      <div className={styles.formRow}>
                        <FormGroup label="Email Address *" icon="fas fa-envelope" error={errors.email}>
                          <input
                            type="email"
                            className={styles.formControl}
                            value={formData.email}
                            placeholder="your@email.com"
                            onChange={(e) => updateField("email", e.target.value)}
                          />
                        </FormGroup>

                        <FormGroup label="Phone Number *" icon="fas fa-phone" error={errors.phone}>
                          <input
                            type="tel"
                            className={styles.formControl}
                            value={formData.phone}
                            placeholder="+232 XX XXX XXX"
                            onChange={(e) => updateField("phone", e.target.value)}
                          />
                        </FormGroup>
                      </div>

                      <FormGroup label="Preferred Contact Time" icon="fas fa-clock">
                        <select
                          className={styles.formControl}
                          value={formData.contactTime}
                          onChange={(e) => updateField("contactTime", e.target.value)}
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
                          value={formData.comments}
                          placeholder="Any other information you'd like us to know..."
                          onChange={(e) => updateField("comments", e.target.value)}
                        />
                      </FormGroup>

                      <div className={styles.formCheck}>
                        <input
                          type="checkbox"
                          id="privacy"
                          checked={formData.privacy}
                          onChange={(e) => updateField("privacy", e.target.checked)}
                        />
                        <label htmlFor="privacy">
                          I agree to the <Link href="/privacy-policy">Privacy Policy</Link> and consent to being contacted about my project. *
                        </label>
                      </div>
                      {errors.privacy && <p className={styles.errorMessage}>{errors.privacy}</p>}

                      <div className={styles.formActionsBetween}>
                        <button type="button" className={`${styles.btn} ${styles.btnOutline}`} onClick={() => previousStep(2)}>
                          <i className="fas fa-arrow-left" /> Previous
                        </button>
                        <button type="submit" className={`${styles.btn} ${styles.btnAccent} ${styles.btnLarge}`}>
                          Submit Quote Request <i className="fas fa-paper-plane" />
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

      <WhyChooseSection />
      <TestimonialsSection />
      <Footer />
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

function WhyChooseSection() {
  const items = [
    ["fas fa-clock", "48-Hour Response", "We provide detailed quotes within 48 hours of receiving your request"],
    ["fas fa-file-invoice", "Detailed Breakdown", "Transparent pricing with full breakdown of costs, materials, and labor"],
    ["fas fa-calendar-check", "Project Timeline", "Clear project milestones and completion schedule included"],
    ["fas fa-handshake", "No Obligation", "Free quotes with no commitment required"],
  ];

  return (
    <section className={styles.bgLight}>
      <div className={styles.container}>
        <div className={styles.textCenter}>
          <h2 className={styles.sectionTitle}>Why Choose Divinerock</h2>
          <p className={styles.sectionSubtitle}>When you request a quote from us, you&apos;re getting more than just a price</p>
        </div>

        <div className={styles.whyChooseGrid}>
          {items.map(([icon, title, text]) => (
            <div className={styles.whyItem} key={title}>
              <div className={styles.whyIcon}>
                <i className={icon} />
              </div>
              <h4>{title}</h4>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className={styles.testimonialsSection}>
      <div className={styles.container}>
        <div className={styles.textCenter}>
          <h2 className={styles.sectionTitle}>What Our Clients Say</h2>
          <p className={styles.whiteSubtitle}>Trusted by leading organizations across Sierra Leone</p>
        </div>

        <div className={styles.testimonialGrid}>
          <Testimonial
            image="https://randomuser.me/api/portraits/men/45.jpg"
            name="James Koroma"
            role="Project Director, Ministry of Works"
            text="Divinerock provided the most comprehensive quote we received. Their attention to detail and professional approach gave us confidence from day one."
          />
          <Testimonial
            image="https://randomuser.me/api/portraits/women/32.jpg"
            name="Mariatu Sesay"
            role="CEO, Sesay Construction Ltd"
            text="The quoting process was smooth and transparent. They took time to understand our requirements and delivered a quote that matched our budget perfectly."
          />
        </div>
      </div>
    </section>
  );
}

function Testimonial({
  image,
  name,
  role,
  text,
}: {
  image: string;
  name: string;
  role: string;
  text: string;
}) {
  return (
    <div className={styles.testimonialCard}>
      <div className={styles.testimonialContent}>
        <i className="fas fa-quote-left" /> {text}
      </div>
      <div className={styles.testimonialAuthor}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt={name} />
        <div className={styles.authorInfo}>
          <h4>{name}</h4>
          <p>{role}</p>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerGrid}>
          <div className={styles.footerCol}>
            <h4>About Divinerock</h4>
            <p>
              Divinerock Engineering Services is a civil engineering and
              construction company committed to delivering reliable
              infrastructure solutions.
            </p>
          </div>

          <div className={styles.footerCol}>
            <h4>Quick Links</h4>
            <ul className={styles.footerLinks}>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/services">Services</Link></li>
              <li><Link href="/projects">Projects</Link></li>
              <li><Link href="/contact">Contact Us</Link></li>
            </ul>
          </div>

          <div className={styles.footerCol}>
            <h4>Our Services</h4>
            <ul className={styles.footerLinks}>
              <li><Link href="/services">Construction Services</Link></li>
              <li><Link href="/services">Civil Engineering</Link></li>
              <li><Link href="/services">Fabrication & Metal Works</Link></li>
              <li><Link href="/services">Project Management</Link></li>
            </ul>
          </div>

          <div className={styles.footerCol}>
            <h4>Contact Information</h4>
            <ul className={styles.footerLinks}>
              <li><i className="fas fa-map-marker-alt" /> Sierratel Earth Station, Wilberforce, Freetown</li>
              <li><i className="fas fa-phone" /> +232 00 000 000</li>
              <li><i className="fas fa-envelope" /> info@divinerock.sl</li>
            </ul>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p>&copy; 2025 Divinerock Engineering Services. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}