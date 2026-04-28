import type { Metadata } from 'next';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBuilding,
  faDraftingCompass,
  faWrench,
  faTasks,
  faTools,
  faChartLine,
  faUserTie,
  faMedal,
  faClock,
  faShieldHalved,
  faTractor,
  faSmile,
  faMapMarkerAlt,
  faPhone,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons';
import styles from './home.module.css';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Divinerock Engineering Services - Home',
};

const services = [
  [faBuilding, 'Construction Services', 'Roads, bridges, buildings, drainage systems, and reinforced concrete structures.'],
  [faDraftingCompass, 'Civil Engineering', 'Structural design, infrastructure development, site preparation, and geotechnical support.'],
  [faWrench, 'Fabrication & Metal Works', 'Steel fabrication, welding services, structural metal works, and installation.'],
  [faTasks, 'Project Management', 'Efficient project delivery, on time and within budget with professional oversight.'],
  [faTools, 'Renovation & Maintenance', 'Building rehabilitation, infrastructure upgrades, and maintenance services.'],
  [faChartLine, 'Engineering Consultancy', 'Technical advice, feasibility studies, and engineering solutions.'],
] as const;

export default function HomePage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div>
          <h1>Building Strong Foundations for Sustainable Infrastructure</h1>
          <p>Divinerock Engineering Services delivers reliable civil engineering, construction, and fabrication solutions for infrastructure, commercial, and industrial development.</p>
          <div className={styles.buttonRow}>
            <Link href="/services" className={`${styles.btn} ${styles.primary}`}>View Our Services</Link>
            <Link href="/quote" className={`${styles.btn} ${styles.accent}`}>Request a Quote</Link>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.aboutGrid}>
          <div className={styles.imageWrap}><img src="/images/about-construction.JPG" alt="Construction site" /></div>
          <div>
            <h2 className={styles.title}>About Divinerock Engineering Services</h2>
            <p>Divinerock Engineering Services is a dynamic civil engineering and construction company dedicated to innovative and reliable infrastructure solutions.</p>
            <p>Our engineers, technicians, and construction professionals deliver projects that meet modern engineering standards and community needs.</p>
            <Link href="/about" className={`${styles.btn} ${styles.primary}`}>Learn More About Us</Link>
          </div>
        </div>
      </section>

      <section className={`${styles.light} ${styles.section}`}>
        <div className={styles.center}>
          <h2 className={styles.title}>Our Engineering & Construction Services</h2>
          <p className={styles.subtitle}>Comprehensive engineering and construction services designed to support infrastructure development and structural projects.</p>
          {services.map(([icon, title, copy]) => (
            <article key={title} className={styles.card}>
              <span className={styles.icon}><FontAwesomeIcon icon={icon} /></span>

              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={`${styles.section} ${styles.statsWrap}`}>
        <div className={styles.stats}>
          <div className={styles.statItem}><strong>25+</strong><span>Projects Completed</span></div>
          <div className={styles.statItem}><strong>15+</strong><span>Skilled Engineers & Technicians</span></div>
          <div className={styles.statItem}><strong>10+</strong><span>Years Industry Experience</span></div>
          <div className={styles.statItem}><strong>100%</strong><span>Commitment to Quality</span></div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.center}>
          <h2 className={styles.title}>Why Choose Divinerock Engineering Services</h2>
          <p className={styles.subtitle}>We deliver excellence through expertise, quality, and commitment to clients.</p>
        </div>
        <div className={styles.features}>
          {[
            [faUserTie, 'Professional Expertise', 'Experienced engineers and construction specialists.'],
            [faMedal, 'Quality Workmanship', 'High standards through planning and quality control.'],
            [faClock, 'Reliable Delivery', 'Projects delivered within timelines and budget.'],
            [faShieldHalved, 'Safety Commitment', 'Protection of workers, clients, and communities.'],
            [faTractor, 'Modern Equipment', 'Modern construction methods and technologies.'],
            [faSmile, 'Client Satisfaction', 'Solutions aligned with client goals and expectations.'],
          ].map(([icon, title, copy]) => (
            <article key={title as string} className={styles.card}>
              <span className={styles.icon}><FontAwesomeIcon icon={icon as typeof faUserTie} /></span>
              <h3>{title as string}</h3>
              <p>{copy as string}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={`${styles.light} ${styles.section}`}>
        <div className={styles.center}>
          <h2 className={styles.title}>Our Recent Projects</h2>
          <p className={styles.subtitle}>Delivering quality infrastructure and construction solutions across Sierra Leone.</p>
        </div>
        <div className={styles.grid2}>
          {[
            ['/images/bridge.jpg', 'Road Construction Project', 'Community access road development', 'Western Area'],
            ['/images/bridge.jpg', 'Bridge Construction Project', 'Reinforced concrete bridge', 'Sierra Leone'],
            ['https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80', 'Commercial Building Project', 'Modern office facility', 'Freetown'],
            ['https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80', 'Steel Fabrication Project', 'Structural steel for industrial facility', 'Industrial Site'],
          ].map(([image, title, subtitle, location]) => (
            <article key={title as string} className={styles.projectCard}>
              <img src={image as string} alt={title as string} />
              <div className={styles.overlay}>
                <h3>{title as string}</h3>
                <p>{subtitle as string}</p>
                <p><FontAwesomeIcon icon={faMapMarkerAlt} /> {location as string}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.center}>
          <h2 className={styles.title}>Our Team of Experts</h2>
          <p className={styles.subtitle}>Meet the professionals behind our successful projects.</p>
        </div>
        <div className={styles.team}>
          {[
            ['/images/John-kamara2.jpg', 'John Kamara', 'Senior Civil Engineer'],
            ['/images/Fatmata-bangura2.jpg', 'Mariatu Sesay', 'Project Manager'],
            ['/images/Ibrahim-turay2.jpg', 'Ibrahim Turay', 'Site Engineer'],
          ].map(([image, name, role]) => (
            <article key={name as string} className={styles.card}>
              <div className={styles.imageWrap}><img src={image as string} alt={name as string} /></div>
              <h3>{name as string}</h3>
              <p>{role as string}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.cta}>
        <h2>Have a Project in Mind?</h2>
        <p>Divinerock Engineering Services is ready to deliver reliable engineering and construction solutions for your next project.</p>
        <Link href="/quote" className={`${styles.btn} ${styles.accent}`}>Request a Quote</Link>
      </section>

      <section className={styles.section}>
        <div className={styles.center}>
          <h2 className={styles.title}>Get In Touch</h2>
          <p className={styles.subtitle}>Contact Divinerock Engineering Services to discuss your project requirements.</p>
        </div>
        <div className={styles.contactGrid}>
          <div className={styles.contactInfo}>
            <p><FontAwesomeIcon icon={faMapMarkerAlt} /> Sierratel Earth Station, Main Motor Road, Wilberforce, Freetown, Sierra Leone</p>
            <p><FontAwesomeIcon icon={faPhone} /> +232 00 000 000</p>
            <p><FontAwesomeIcon icon={faEnvelope} /> info@divinerock.sl</p>
          </div>
          <form className={styles.contactForm}>
            <input className={styles.formControl} type="text" placeholder="Your Full Name" required />
            <input className={styles.formControl} type="email" placeholder="Email Address" required />
            <input className={styles.formControl} type="text" placeholder="Subject" required />
            <textarea className={styles.formControl} placeholder="Your Message" rows={5} required />
            <button type="submit" className={`${styles.btn} ${styles.primary}`} style={{ width: '100%' }}>Send Message</button>
          </form>
        </div>
        <div className={styles.map}>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126900.58164911648!2d-13.289974!3d8.465677!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOMKwMjcnNTYuNCJOIDEzwrAxNScwMC4wIlc!5e0!3m2!1sen!2ssl!4v1611111111111!5m2!1sen!2ssl" loading="lazy" title="Office map" />
        </div>
      </section>
    </div>
  );
}
