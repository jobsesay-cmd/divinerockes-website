import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './services.module.css';

export const metadata: Metadata = {
  title: 'Our Services - Divinerock Engineering Services',
  description:
    'Divinerock Engineering Services provides comprehensive civil engineering, construction, and specialized solutions.',
};

type ServiceCard = {
  icon: string;
  title: string;
  text: string;
  items: string[];
};

const coreServices: ServiceCard[] = [
  {
    icon: 'fa-building',
    title: 'Construction Services',
    text:
      'Divinerock Engineering Services undertakes construction projects including roads, bridges, buildings, drainage systems, and reinforced concrete structures designed to meet modern infrastructure demands.',
    items: [
      'Road construction and rehabilitation',
      'Bridge construction',
      'Building construction',
      'Drainage and culvert systems',
      'Reinforced concrete works',
    ],
  },
  {
    icon: 'fa-drafting-compass',
    title: 'Civil Engineering & Infrastructure',
    text:
      'Our civil engineering services support infrastructure planning, design, and construction. We ensure projects are technically sound, durable, and compliant with engineering standards.',
    items: [
      'Infrastructure development',
      'Structural engineering',
      'Site preparation and earthworks',
      'Geotechnical investigations',
    ],
  },
  {
    icon: 'fa-wrench',
    title: 'Fabrication & Metal Works',
    text:
      'The company provides professional steel fabrication and metal works for construction and industrial projects. Our fabrication capabilities ensure durable steel structures and metal components.',
    items: [
      'Structural steel fabrication',
      'Metal fabrication and welding',
      'Industrial steel structures',
      'Steel installation and assembly',
    ],
  },
  {
    icon: 'fa-tasks',
    title: 'Project Management & Consultancy',
    text:
      'Divinerock Engineering Services provides professional project management and technical consultancy to ensure smooth execution from planning to completion.',
    items: [
      'Construction project management',
      'Engineering consultancy',
      'Construction supervision',
      'Project planning and coordination',
    ],
  },
  {
    icon: 'fa-tools',
    title: 'Renovation & Maintenance',
    text:
      'We provide renovation and maintenance services that extend the lifespan of infrastructure, buildings, and critical systems.',
    items: [
      'Building renovation',
      'Structural rehabilitation',
      'Road maintenance',
      'Infrastructure upgrades',
    ],
  },
  {
    icon: 'fa-chart-line',
    title: 'Engineering Consultancy',
    text:
      'Our consultancy services provide expert technical advice and engineering guidance across all project stages.',
    items: [
      'Technical feasibility studies',
      'Engineering design reviews',
      'Value engineering',
      'Risk assessments',
    ],
  },
  {
    icon: 'fa-cogs',
    title: 'Mechanical & Maintenance Engineering',
    text:
      'Divinerock Engineering Services offers comprehensive mechanical engineering and maintenance solutions for industrial and commercial facilities. Our team ensures optimal equipment performance and operational efficiency.',
    items: [
      'Industrial machinery installation and maintenance',
      'HVAC system design and servicing',
      'Plumbing and piping systems',
      'Generator servicing',
    ],
  },
  {
    icon: 'fa-solar-panel',
    title: 'Electrical & Solar Installation',
    text:
      'Divinerock Engineering Services provides professional electrical and solar energy solutions for residential, commercial, and industrial applications. We deliver reliable power solutions that reduce energy costs and promote sustainability.',
    items: [
      'Solar panel installation and maintenance',
      'Solar water pumping systems',
      'Electrical wiring and installations',
      'Backup power systems and inverters',
      'Energy efficiency audits',
      'Street/security lighting',
    ],
  },
  {
    icon: 'fa-leaf',
    title: 'Landscaping, Pest Control & Fogging',
    text:
      'Divinerock Engineering Services offers professional landscaping, pest control, and fogging services to enhance property aesthetics and maintain healthy environments.',
    items: [
      'Landscape design and installation',
      'Lawn and garden maintenance',
      'Pest control and fumigation',
      'Mosquito fogging and vector control',
      'Tree planting and pruning',
      'Erosion control solutions',
    ],
  },
];

export default function ServicesPage() {
  return (
    <div className={styles.page}>
      <section className={styles.pageBanner}>
        <h1>Our Engineering & Construction Services</h1>
        <p>
          Divinerock Engineering Services provides comprehensive civil engineering, construction, and specialized
          solutions for infrastructure and industrial development.
        </p>
      </section>

      <section className={styles.section}>
        <div className={styles.textCenter}>
          <h2 className={styles.sectionTitle}>Engineering Solutions You Can Trust</h2>
          <p className={styles.sectionSubtitle}>
            Divinerock Engineering Services delivers reliable engineering and construction services designed to
            support infrastructure development, commercial construction, industrial projects, and specialized
            services. Our experienced team combines technical expertise with modern techniques to ensure every
            project meets the highest standards of quality, safety, and durability.
          </p>
        </div>
      </section>

      <section className={`${styles.section} ${styles.bgLight}`}>
        <div className={styles.textCenter}>
          <h2 className={styles.sectionTitle}>Our Core Services</h2>
          <p className={styles.sectionSubtitle}>
            Comprehensive engineering and construction solutions tailored to your needs
          </p>
        </div>

        <div className={styles.servicesGrid}>
          {coreServices.map((service) => (
            <article className={styles.serviceCard} key={service.title}>
              <div className={styles.serviceIcon}>
                <i className={`fas ${service.icon}`} />
              </div>
              <h3 className={styles.serviceTitle}>{service.title}</h3>
              <p className={styles.serviceText}>{service.text}</p>

              <div className={styles.includesBlock}>
                <h4 className={styles.includesTitle}>Includes:</h4>
                <ul className={styles.featureList}>
                  {service.items.map((item) => (
                    <li key={item}>
                      <i className="fas fa-check-circle" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.equipmentSection}>
        <h2 className={styles.sectionTitle}>Equipment & Operational Capacity</h2>
        <p className={styles.sectionSubtitle}>
          Divinerock Engineering Services utilizes modern construction equipment and skilled personnel to support
          efficient project delivery. Our operational capacity includes earthmoving machinery, concrete equipment,
          fabrication tools, construction support vehicles, and specialized equipment for electrical, mechanical,
          and landscaping services.
        </p>

        <div className={styles.equipmentGrid}>
          {[
            ['fa-tractor', 'Excavators', 'Heavy earthmoving and excavation'],
            ['fa-truck', 'Dump Trucks', 'Material transport and hauling'],
            ['fa-road', 'Graders', 'Road grading and leveling'],
            ['fa-industry', 'Concrete Mixers', 'Concrete production and placement'],
            ['fa-bolt', 'Solar Equipment', 'Panels, inverters, batteries'],
            ['fa-spray-can', 'Fogging Machines', 'Pest control and disinfection'],
            ['fa-leaf', 'Landscaping Tools', 'Mowers, trimmers, blowers'],
            ['fa-tools', 'Mechanical Tools', 'Maintenance and repair equipment'],
          ].map(([icon, title, desc]) => (
            <div className={styles.equipmentItem} key={title}>
              <i className={`fas ${icon}`} />
              <h4>{title}</h4>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.textCenter}>
          <h2 className={styles.sectionTitle}>Industries We Serve</h2>
          <p className={styles.sectionSubtitle}>
            Divinerock Engineering Services supports projects across multiple sectors
          </p>
        </div>

        <div className={styles.industriesGrid}>
          {[
            ['fa-road', 'Infrastructure', 'Roads, bridges, drainage'],
            ['fa-building', 'Commercial', 'Office buildings, retail'],
            ['fa-industry', 'Industrial', 'Factories, warehouses'],
            ['fa-city', 'Public Sector', 'Government projects'],
            ['fa-home', 'Residential', 'Housing developments'],
          ].map(([icon, title, desc]) => (
            <div className={styles.industryCard} key={title}>
              <div className={styles.industryIcon}>
                <i className={`fas ${icon}`} />
              </div>
              <h4>{title}</h4>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={`${styles.section} ${styles.bgLight}`}>
        <div className={styles.textCenter}>
          <h2 className={styles.sectionTitle}>Our Project Execution Process</h2>
          <p className={styles.sectionSubtitle}>
            A structured approach to ensure quality, safety, and timely delivery
          </p>
        </div>

        <div className={styles.processGrid}>
          {[
            ['1', 'Project Planning', 'Detailed planning and resource allocation'],
            ['2', 'Engineering Design', 'Technical specifications and drawings'],
            ['3', 'Construction Execution', 'On-site implementation and management'],
            ['4', 'Quality Control', 'Inspection and testing throughout'],
            ['5', 'Project Completion', 'Handover and client satisfaction'],
          ].map(([step, title, desc], idx) => (
            <div className={styles.processStep} key={step}>
              <div className={styles.stepNumber}>{step}</div>
              <h4>{title}</h4>
              <p>{desc}</p>
              {idx < 4 ? <span className={styles.stepArrow}>→</span> : null}
            </div>
          ))}
        </div>

        <p className={styles.processNote}>
          This ensures every project is delivered safely, efficiently, and according to engineering standards.
        </p>
      </section>

      <section className={styles.ctaSection}>
        <h2>Need Professional Engineering Services?</h2>
        <p>
          Divinerock Engineering Services is ready to support your construction, infrastructure, or specialized
          project with reliable engineering solutions.
        </p>
        <Link href="/quote" className={`${styles.btn} ${styles.btnAccent}`}>
          Request a Quote
        </Link>
      </section>
    </div>
  );
}