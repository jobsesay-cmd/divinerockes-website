import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './about.module.css';

export const metadata: Metadata = {
  title: 'About Us - Divinerock Engineering Services',
  description:
    'Learn about Divinerock Engineering Services, our mission, vision, values, and engineering capability.',
};

export default function AboutPage() {
  return (
    <>
      <section className="page-banner">
        <div className="container">
          <h1>About Divinerock Engineering Services</h1>
          <p>
            Building strong foundations for sustainable infrastructure through expertise, integrity, and innovation
          </p>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="about-grid">
            <div className="about-content">
              <h2 className="section-title">Company Overview</h2>
              <p>
                Divinerock Engineering Services is a professional civil engineering and construction company dedicated
                to delivering high-quality infrastructure and engineering solutions.
              </p>
              <p>
                With a strong commitment to quality, innovation, and safety, we undertake projects that contribute to
                sustainable infrastructure development and economic growth.
              </p>
              <p>
                From road construction and bridge development to building construction and structural fabrication, we
                are equipped with the technical capacity to execute projects efficiently and responsibly.
              </p>

              <div className="about-highlight">
                <h3>Our Commitment</h3>
                <p>
                  We are committed to excellence in every project, ensuring our work exceeds expectations while
                  contributing to sustainable infrastructure across Sierra Leone.
                </p>
              </div>
            </div>

            <div className="about-image">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80"
                alt="Divinerock Engineering Team"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-light">
        <div className="container">
          <div className="mission-vision-grid">
            <div className="mission-card">
              <div className="card-icon">
                <i className="fas fa-bullseye" />
              </div>
              <h3>Our Mission</h3>
              <p>
                To provide reliable and high-quality engineering and construction services that support infrastructure
                development while maintaining high standards of professionalism, safety, and environmental
                responsibility.
              </p>
            </div>

            <div className="vision-card">
              <div className="card-icon">
                <i className="fas fa-eye" />
              </div>
              <h3>Our Vision</h3>
              <p>
                To become a trusted leader in civil engineering and construction services, recognized for delivering
                innovative and sustainable infrastructure solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="text-center">
            <h2 className="section-title">Our Core Values</h2>
            <p className="section-subtitle">The principles that guide our work and define our company culture</p>
          </div>

          <div className="values-grid">
            {[
              ['fa-star', 'Quality', 'We are committed to delivering projects that meet high standards of engineering excellence and durability.'],
              ['fa-handshake', 'Integrity', 'We conduct operations with honesty, transparency, and accountability.'],
              ['fa-shield-alt', 'Safety', 'We prioritize safety through rigorous protocols and training.'],
              ['fa-user-tie', 'Professionalism', 'Our team maintains high competence, efficiency, and ethical conduct.'],
              ['fa-lightbulb', 'Innovation', 'We adopt modern techniques and technologies to improve outcomes.'],
              ['fa-users', 'Teamwork', 'We foster collaboration and mutual respect to drive project success.'],
            ].map(([icon, title, text]) => (
              <div className="value-card" key={title}>
                <div className="value-icon">
                  <i className={`fas ${icon}`} />
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="capability-section">
        <div className="container">
          <div className="capability-content">
            <h2 className="section-title">Our Capability Statement</h2>
            <p>
              Divinerock Engineering Services provides professional civil engineering, construction, and fabrication
              services with expertise in road construction, bridge development, building construction, structural steel
              fabrication, and project management.
            </p>
            <p>
              We have the resources, experience, and commitment to handle projects of varying scales and complexities.
            </p>

            <div className="capability-stats">
              <div className="capability-stat">
                <div className="stat-number">25+</div>
                <div className="stat-label">Projects Completed</div>
              </div>
              <div className="capability-stat">
                <div className="stat-number">15+</div>
                <div className="stat-label">Skilled Engineers</div>
              </div>
              <div className="capability-stat">
                <div className="stat-number">10+</div>
                <div className="stat-label">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="safety-section">
        <div className="container">
          <div className="safety-grid">
            <div className="safety-content">
              <h3>Health & Safety Commitment</h3>
              <p>
                At Divinerock Engineering Services, the safety of our workforce, clients, and communities is our
                highest priority.
              </p>

              <ul className="safety-list">
                {[
                  'Strict safety procedures and protocols on all sites',
                  'Regular safety training and toolbox talks for all staff',
                  'Mandatory personal protective equipment (PPE) usage',
                  'Regular site inspections and safety audits',
                  'Incident reporting and investigation procedures',
                  'Emergency response plans for all project locations',
                ].map((item) => (
                  <li key={item}>
                    <i className="fas fa-check-circle" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="safety-image">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80"
                alt="Safety on site"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="certifications">
        <div className="container">
          <div className="text-center">
            <h2 className="section-title">Certifications & Compliance</h2>
            <p className="section-subtitle">We operate in accordance with industry standards and regulatory requirements</p>
          </div>

          <div className="cert-grid">
            {[
              ['fa-certificate', 'ISO 9001:2015', 'Quality Management Systems'],
              ['fa-hard-hat', 'ISO 45001', 'Occupational Health & Safety'],
              ['fa-leaf', 'ISO 14001', 'Environmental Management'],
              ['fa-building', 'NCCE Registered', 'National Council of Civil Engineers'],
            ].map(([icon, title, subtitle]) => (
              <div className="cert-card" key={title}>
                <div className="cert-icon">
                  <i className={`fas ${icon}`} />
                </div>
                <h4>{title}</h4>
                <p>{subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="text-center">
            <h2 className="section-title">Our Professional Team</h2>
            <p className="section-subtitle">Meet the experienced professionals behind our successful projects</p>
          </div>

          <div className="team-grid">
            {[
              ['/images/John-kamara2.jpg', 'John Kamara', 'Senior Civil Engineer'],
              ['/images/Mariatu-sesay2.jpg', 'Mariatu Sesay', 'Project Manager'],
              ['/images/Ibrahim-turay2.jpg', 'Ibrahim Turay', 'Site Engineer'],
              ['/images/Mariatu-sesay2.jpg', 'Fatmata Bangura', 'Structural Engineer'],
            ].map(([img, name, role]) => (
              <div className="team-card" key={name}>
                <div className="team-image">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt={name} />
                </div>
                <h3>{name}</h3>
                <p>{role}</p>
                <div className="team-social">
                  <a href="#"><i className="fab fa-linkedin-in" /></a>
                  <a href="#"><i className="fab fa-twitter" /></a>
                  <a href="#"><i className="fas fa-envelope" /></a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-light">
        <div className="container">
          <div className="text-center">
            <h2 className="section-title">Our Experience & Expertise</h2>
            <p className="section-subtitle">Years of successful project delivery across diverse sectors</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '30px', marginTop: '40px' }}>
            <div style={{ background: 'white', padding: '30px', borderRadius: '10px' }}>
              <h3 style={{ color: '#0972C2', marginBottom: '15px' }}>Infrastructure Projects</h3>
              <ul style={{ listStyle: 'none' }}>
                <li style={{ marginBottom: '10px' }}><i className="fas fa-check" style={{ color: '#D83936', marginRight: '10px' }} />Road construction and rehabilitation</li>
                <li style={{ marginBottom: '10px' }}><i className="fas fa-check" style={{ color: '#D83936', marginRight: '10px' }} />Bridge development</li>
                <li style={{ marginBottom: '10px' }}><i className="fas fa-check" style={{ color: '#D83936', marginRight: '10px' }} />Drainage systems</li>
                <li style={{ marginBottom: '10px' }}><i className="fas fa-check" style={{ color: '#D83936', marginRight: '10px' }} />Water infrastructure</li>
              </ul>
            </div>

            <div style={{ background: 'white', padding: '30px', borderRadius: '10px' }}>
              <h3 style={{ color: '#0972C2', marginBottom: '15px' }}>Building Projects</h3>
              <ul style={{ listStyle: 'none' }}>
                <li style={{ marginBottom: '10px' }}><i className="fas fa-check" style={{ color: '#D83936', marginRight: '10px' }} />Commercial buildings</li>
                <li style={{ marginBottom: '10px' }}><i className="fas fa-check" style={{ color: '#D83936', marginRight: '10px' }} />Residential complexes</li>
                <li style={{ marginBottom: '10px' }}><i className="fas fa-check" style={{ color: '#D83936', marginRight: '10px' }} />Educational facilities</li>
                <li style={{ marginBottom: '10px' }}><i className="fas fa-check" style={{ color: '#D83936', marginRight: '10px' }} />Industrial structures</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Your Project?</h2>
            <p>
              Partner with Divinerock Engineering Services for reliable, professional, and quality engineering
              solutions. Let&apos;s discuss how we can bring your vision to life.
            </p>
            <Link href="/quote" className="btn btn-accent" style={{ fontSize: '1.1rem', padding: '18px 45px' }}>
              Request a Quote
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}