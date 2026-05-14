import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './about.module.css';

export const metadata: Metadata = {
  title: 'About Us - Divinerock Engineering Services',
  description:
    'Learn about Divinerock Engineering Services, our mission, vision, values, capability, safety commitment, and team.',
};

const values = [
  ['fa-star', 'Quality', 'We are committed to delivering projects that meet the highest standards of engineering excellence and durability, ensuring long-term value for our clients.'],
  ['fa-handshake', 'Integrity', 'We conduct our operations with honesty, transparency, and accountability, building trust with clients, partners, and communities.'],
  ['fa-shield-alt', 'Safety', 'We prioritize the safety of our workforce, clients, and the communities where we operate through rigorous safety protocols and training.'],
  ['fa-user-tie', 'Professionalism', 'Our team maintains high levels of competence, efficiency, and ethical conduct in every project we undertake.'],
  ['fa-lightbulb', 'Innovation', 'We continuously adopt modern construction techniques and technologies to improve project outcomes and deliver cutting-edge solutions.'],
  ['fa-users', 'Teamwork', 'We foster collaboration and mutual respect among our team members, ensuring that collective expertise drives project success.'],
] as const;

const safetyPoints = [
  'Strict safety procedures and protocols on all sites',
  'Regular safety training and toolbox talks for all staff',
  'Mandatory personal protective equipment (PPE) usage',
  'Regular site inspections and safety audits',
  'Incident reporting and investigation procedures',
  'Emergency response plans for all project locations',
];

const certs = [
  ['fa-certificate', 'ISO 9001:2015', 'Quality Management Systems'],
  ['fa-hard-hat', 'ISO 45001', 'Occupational Health & Safety'],
  ['fa-leaf', 'ISO 14001', 'Environmental Management'],
  ['fa-building', 'NCCE Registered', 'National Council of Civil Engineers'],
] as const;

const team = [
  ['/images/John-kamara2.jpg', 'John Kamara', 'Senior Civil Engineer'],
  ['/images/Mariatu-sesay2.jpg', 'Mariatu Sesay', 'Project Manager'],
  ['/images/Ibrahim-turay2.jpg', 'Ibrahim Turay', 'Site Engineer'],
  ['/images/Fatmata-bangura2.jpg', 'Fatmata Bangura', 'Structural Engineer'],
] as const;

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <section className={styles.pageBanner}>
        <h1>About Divinerock Engineering Services</h1>
        <p>
          Building strong foundations for sustainable infrastructure through expertise, integrity, and innovation
        </p>
      </section>

      <section className={styles.section}>
        <div className={styles.aboutGrid}>
          <div className={styles.aboutContent}>
            <h2 className={styles.sectionTitle}>Company Overview</h2>
            <p>
              Divinerock Engineering Services is a professional civil engineering and construction company dedicated
              to delivering high-quality infrastructure and engineering solutions. The company specializes in
              construction, civil engineering works, fabrication, and project management services for both public and
              private sector clients.
            </p>
            <p>
              With a strong commitment to quality, innovation, and safety, Divinerock Engineering Services undertakes
              projects that contribute to sustainable infrastructure development and economic growth. Our experienced
              team of engineers, technicians, and construction professionals work together to deliver projects that
              meet international engineering standards while responding to the specific needs of each client.
            </p>
            <p>
              From road construction and bridge development to building construction and structural fabrication, the
              company is equipped with the expertise and technical capacity required to execute projects efficiently
              and responsibly.
            </p>

            <div className={styles.aboutHighlight}>
              <h3>Our Commitment</h3>
              <p>
                We are committed to excellence in every project, ensuring that our work not only meets but exceeds
                client expectations while contributing to the development of sustainable infrastructure across Sierra Leone.
              </p>
            </div>
          </div>

          <div className={styles.aboutImage}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80"
              alt="Divinerock engineering team and workstation"
            />
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.bgLight}`}>
        <div className={styles.missionVisionGrid}>
          <article className={styles.missionCard}>
            <div className={styles.cardIcon}><i className="fas fa-bullseye" /></div>
            <h3>Our Mission</h3>
            <p>
              To provide reliable and high-quality engineering and construction services that support infrastructure
              development while maintaining the highest standards of professionalism, safety, and environmental responsibility.
            </p>
          </article>

          <article className={styles.visionCard}>
            <div className={styles.cardIcon}><i className="fas fa-eye" /></div>
            <h3>Our Vision</h3>
            <p>
              To become a trusted leader in civil engineering and construction services, recognized for delivering
              innovative and sustainable infrastructure solutions that transform communities and drive economic growth.
            </p>
          </article>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.textCenter}>
          <h2 className={styles.sectionTitle}>Our Core Values</h2>
          <p className={styles.sectionSubtitle}>
            The principles that guide our work and define our company culture
          </p>
        </div>

        <div className={styles.valuesGrid}>
          {values.map(([icon, title, text]) => (
            <article className={styles.valueCard} key={title}>
              <div className={styles.valueIcon}><i className={`fas ${icon}`} /></div>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.capabilitySection}>
        <div className={styles.capabilityContent}>
          <h2 className={styles.sectionTitle}>Our Capability Statement</h2>
          <p>
            Divinerock Engineering Services provides professional civil engineering, construction, and fabrication
            services with expertise in road construction, bridge development, building construction, structural steel
            fabrication, and project management. Our technical capacity and skilled workforce enable us to deliver
            infrastructure projects that meet modern engineering standards.
          </p>
          <p>
            We have the resources, experience, and commitment to handle projects of varying scales and complexities,
            from community access roads to major infrastructure developments.
          </p>

          <div className={styles.capabilityStats}>
            <div className={styles.capabilityStat}><div className={styles.statNumber}>25+</div><div className={styles.statLabel}>Projects Completed</div></div>
            <div className={styles.capabilityStat}><div className={styles.statNumber}>15+</div><div className={styles.statLabel}>Skilled Engineers</div></div>
            <div className={styles.capabilityStat}><div className={styles.statNumber}>10+</div><div className={styles.statLabel}>Years Experience</div></div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.safetyGrid}>
          <div className={styles.safetyContent}>
            <h3>Health &amp; Safety Commitment</h3>
            <p>
              At Divinerock Engineering Services, the safety of our workforce, clients, and communities is our highest priority.
              We implement comprehensive safety management systems across all project sites.
            </p>

            <ul className={styles.safetyList}>
              {safetyPoints.map((item) => (
                <li key={item}>
                  <i className="fas fa-check-circle" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.safetyImage}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80"
              alt="Health and safety at worksite"
            />
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.bgLight}`}>
        <div className={styles.textCenter}>
          <h2 className={styles.sectionTitle}>Certifications &amp; Compliance</h2>
          <p className={styles.sectionSubtitle}>
            We operate in accordance with industry standards and regulatory requirements
          </p>
        </div>

        <div className={styles.certGrid}>
          {certs.map(([icon, title, subtitle]) => (
            <article className={styles.certCard} key={title}>
              <div className={styles.certIcon}><i className={`fas ${icon}`} /></div>
              <h4>{title}</h4>
              <p>{subtitle}</p>
            </article>
          ))}
        </div>

        <p className={styles.complianceText}>
          Divinerock Engineering Services operates in compliance with professional engineering standards and construction
          safety regulations. The company adheres to relevant industry practices and maintains the necessary operational
          and safety procedures required for construction and infrastructure development projects.
        </p>
      </section>

      <section className={styles.section}>
        <div className={styles.textCenter}>
          <h2 className={styles.sectionTitle}>Our Professional Team</h2>
          <p className={styles.sectionSubtitle}>
            Meet the experienced professionals behind our successful projects
          </p>
        </div>

        <div className={styles.teamGrid}>
          {team.map(([img, name, role]) => (
            <article className={styles.teamCard} key={name}>
              <div className={styles.teamImage}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img} alt={name} />
              </div>
              <h3>{name}</h3>
              <p>{role}</p>
              <div className={styles.teamSocial}>
                <a href="#" aria-label={`${name} on LinkedIn`}><i className="fab fa-linkedin-in" /></a>
                <a href="#" aria-label={`${name} on Twitter`}><i className="fab fa-twitter" /></a>
                <a href="#" aria-label={`Email ${name}`}><i className="fas fa-envelope" /></a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={`${styles.section} ${styles.bgLight}`}>
        <div className={styles.textCenter}>
          <h2 className={styles.sectionTitle}>Our Experience &amp; Expertise</h2>
          <p className={styles.sectionSubtitle}>Years of successful project delivery across diverse sectors</p>
        </div>

        <div className={styles.expertiseGrid}>
          <div className={styles.expertiseCard}>
            <h3>Infrastructure Projects</h3>
            <ul>
              <li><i className="fas fa-check" />Road construction and rehabilitation</li>
              <li><i className="fas fa-check" />Bridge development</li>
              <li><i className="fas fa-check" />Drainage systems</li>
              <li><i className="fas fa-check" />Water infrastructure</li>
            </ul>
          </div>

          <div className={styles.expertiseCard}>
            <h3>Building Projects</h3>
            <ul>
              <li><i className="fas fa-check" />Commercial buildings</li>
              <li><i className="fas fa-check" />Residential complexes</li>
              <li><i className="fas fa-check" />Educational facilities</li>
              <li><i className="fas fa-check" />Industrial structures</li>
            </ul>
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <h2>Ready to Start Your Project?</h2>
        <p>
          Partner with Divinerock Engineering Services for reliable, professional, and quality engineering solutions.
          Let&apos;s discuss how we can bring your vision to life.
        </p>
        <Link href="/quote" className={styles.ctaBtn}>Request a Quote</Link>
      </section>
    </div>
  );
}