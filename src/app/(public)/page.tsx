import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './home.module.css';

export const metadata: Metadata = {
  title: 'Divinerock Engineering Services - Home',
  description:
    'Divinerock Engineering Services delivers reliable civil engineering, construction, and fabrication solutions.',
};

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className={styles.heroSection}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <h1>Building Strong Foundations for Sustainable Infrastructure</h1>
            <p>
              Divinerock Engineering Services delivers reliable civil engineering, construction, and fabrication
              solutions for infrastructure, commercial, and industrial development.
            </p>
            <div className={styles.buttonRow}>
              <Link href="/services" className={`${styles.btn} ${styles.primary}`}>
                View Our Services
              </Link>
              <Link href="/quote" className={`${styles.btn} ${styles.accent}`}>
                Request a Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className={styles.sectionAltA}>
        <div className={styles.container}>
          <div className={styles.aboutGrid}>
            <div className={styles.imageWrap}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/about-construction.JPG" alt="Construction site" />
            </div>
            <div>
              <h2 className={styles.title}>About Divinerock Engineering Services</h2>
              <p className={styles.copy}>
                Divinerock Engineering Services is a dynamic civil engineering and construction company dedicated to
                providing innovative and reliable infrastructure solutions.
              </p>
              <p className={styles.copy}>
                Our team of experienced engineers, technicians, and construction professionals work together to deliver
                projects that meet modern engineering standards while addressing client and community needs.
              </p>
              <Link href="/about" className={`${styles.btn} ${styles.primary}`}>
                Learn More About Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className={styles.sectionAltB}>
        <div className={styles.container}>
          <div className={styles.center}>
            <h2 className={styles.title}>Our Engineering &amp; Construction Services</h2>
            <p className={styles.subtitle}>
              Divinerock Engineering Services offers a comprehensive range of engineering and construction services
              designed to support infrastructure development and structural projects.
            </p>
          </div>

          <div className={styles.features}>
            {[
              ['fa-building', 'Construction Services', 'Roads, bridges, buildings, drainage systems, and reinforced concrete structures.'],
              ['fa-drafting-compass', 'Civil Engineering', 'Structural design, infrastructure development, site preparation, and geotechnical support.'],
              ['fa-wrench', 'Fabrication & Metal Works', 'Steel fabrication, welding services, structural metal works, and installation.'],
              ['fa-tasks', 'Project Management', 'Efficient project delivery, on time and within budget with professional oversight.'],
              ['fa-tools', 'Renovation & Maintenance', 'Building rehabilitation, infrastructure upgrades, and maintenance services.'],
              ['fa-chart-line', 'Engineering Consultancy', 'Technical advice, feasibility studies, and engineering solutions.'],
            ].map(([icon, title, copy]) => (
              <div className={styles.card} key={title}>
                <div className={styles.icon}>
                  <i className={`fas ${icon}`} />
                </div>
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className={styles.sectionAltA}>
        <div className={styles.container}>
          <div className={styles.center}>
            <h2 className={styles.title}>Why Choose Divinerock Engineering Services</h2>
            <p className={styles.subtitle}>
              We deliver excellence through expertise, quality, and commitment to our clients.
            </p>
          </div>

          <div className={styles.whyGrid}>
            {[
              ['fa-user-tie', 'Professional Expertise', 'Our team consists of experienced engineers and construction specialists with extensive knowledge in civil engineering.'],
              ['fa-medal', 'Quality Workmanship', 'We maintain high standards of quality through careful planning, skilled execution, and strict quality control.'],
              ['fa-clock', 'Reliable Project Delivery', 'We are committed to delivering projects within agreed timelines while maintaining efficiency and professionalism.'],
              ['fa-shield-alt', 'Safety Commitment', 'Safety is a priority in all our operations, ensuring the protection of workers, clients, and communities.'],
              ['fa-tractor', 'Modern Equipment', 'We apply modern construction methods and engineering technologies to achieve durable and efficient outcomes.'],
              ['fa-smile', 'Client Satisfaction', 'Our approach focuses on understanding client needs and delivering solutions that meet their expectations.'],
            ].map(([icon, title, text]) => (
              <div className={styles.whyCard} key={title}>
                <div className={styles.whyHead}>
                  <div className={styles.iconAccent}>
                    <i className={`fas ${icon}`} />
                  </div>
                  <h3>{title}</h3>
                </div>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <h2>Have a Project in Mind?</h2>
            <p>
              Divinerock Engineering Services is ready to deliver reliable engineering and construction
              solutions for your next project.
            </p>
            <Link href="/quote" className={`${styles.btn} ${styles.accent}`}>
              Request a Quote
            </Link>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className={styles.sectionAltB}>
        <div className={styles.container}>
          <div className={styles.center}>
            <h2 className={styles.title}>Get In Touch</h2>
            <p className={styles.subtitle}>
              Contact Divinerock Engineering Services to discuss your project requirements.
            </p>
          </div>

          <div className={styles.contactGrid}>
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <div className={styles.contactIcon}><i className="fas fa-map-marker-alt" /></div>
                <div className={styles.contactText}>
                  <h4>Office Address</h4>
                  <p>Sierratel Earth Station, Main Motor Road, Wilberforce, Freetown, Sierra Leone</p>
                </div>
              </div>

              <div className={styles.contactItem}>
                <div className={styles.contactIcon}><i className="fas fa-phone" /></div>
                <div className={styles.contactText}>
                  <h4>Phone Number</h4>
                  <p>+232 00 000 000</p>
                </div>
              </div>

              <div className={styles.contactItem}>
                <div className={styles.contactIcon}><i className="fas fa-envelope" /></div>
                <div className={styles.contactText}>
                  <h4>Email Address</h4>
                  <p>info@divinerock.sl</p>
                </div>
              </div>
            </div>

            <div className={styles.contactForm}>
              <form>
                <div className={styles.formGroup}>
                  <input type="text" className={styles.formControl} placeholder="Your Full Name" required />
                </div>
                <div className={styles.formGroup}>
                  <input type="email" className={styles.formControl} placeholder="Email Address" required />
                </div>
                <div className={styles.formGroup}>
                  <input type="text" className={styles.formControl} placeholder="Subject" required />
                </div>
                <div className={styles.formGroup}>
                  <textarea className={styles.formControl} placeholder="Your Message" required />
                </div>
                <button type="submit" className={`${styles.btn} ${styles.primary} ${styles.fullBtn}`}>
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}