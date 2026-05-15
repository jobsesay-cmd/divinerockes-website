import type { Metadata } from 'next';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faBuilding,
  faDraftingCompass,
  faWrench,
  faTasks,
  faTools,
  faChartLine,
  faCogs,
  faLeaf,
  faCircleCheck,
  faTractor,
  faTruck,
  faRoad,
  faIndustry,
  faBolt,
  faSprayCan,
  faHome,
  faCity,
} from '@fortawesome/free-solid-svg-icons';
import styles from './services.module.css';

export const metadata: Metadata = {
  title: 'Our Services',
  description: 'Engineering and construction services from Divinerock Engineering Services',
};

type Service = {
  title: string;
  description: string;
  items: readonly string[];
  icon?: IconDefinition;
  subItems?: readonly string[];
};

type EquipmentItem = {
  icon: IconDefinition;
  title: string;
  copy: string;
};

type IndustryItem = {
  icon: IconDefinition;
  title: string;
  copy: string;
};

type ProcessStep = {
  step: string;
  title: string;
  copy: string;
};

const services: Service[] = [
  {
    icon: faBuilding,
    title: 'Construction Services',
    description: 'Construction projects including roads, bridges, buildings, drainage systems, and reinforced concrete structures.',
    items: ['Road construction and rehabilitation', 'Bridge construction', 'Building construction', 'Drainage and culvert systems', 'Reinforced concrete works'],
  },
  {
    icon: faDraftingCompass,
    title: 'Civil Engineering & Infrastructure',
    description: 'Civil engineering services supporting planning, design, and construction of durable infrastructure.',
    items: ['Infrastructure development', 'Structural engineering', 'Site preparation and earthworks', 'Geotechnical investigations'],
  },
  {
    icon: faWrench,
    title: 'Fabrication & Metal Works',
    description: 'Professional steel fabrication and metal works for construction and industrial projects.',
    items: ['Structural steel fabrication', 'Metal fabrication and welding', 'Industrial steel structures', 'Steel installation and assembly'],
  },
  {
    icon: faTasks,
    title: 'Project Management & Consultancy',
    description: 'Professional project management and technical consultancy for efficient delivery.',
    items: ['Construction project management', 'Engineering consultancy', 'Construction supervision', 'Project planning and coordination'],
  },
  {
    icon: faTools,
    title: 'Renovation & Maintenance',
    description: 'Renovation and maintenance that extends lifespan of buildings and infrastructure.',
    items: ['Building renovation', 'Structural rehabilitation', 'Road maintenance', 'Infrastructure upgrades'],
  },
  {
    icon: faChartLine,
    title: 'Engineering Consultancy',
    description: 'Expert advice and engineering solutions for informed lifecycle decisions.',
    items: ['Technical feasibility studies', 'Engineering design reviews', 'Value engineering', 'Risk assessments'],
  },
  {
    icon: faCogs,
    title: 'Mechanical & Maintenance Engineering',
    description: 'Mechanical engineering and maintenance solutions for industrial and commercial facilities.',
    items: ['Industrial machinery maintenance', 'HVAC design and servicing', 'Plumbing and piping systems', 'Generator servicing'],
    subItems: ['Industrial Maintenance', 'HVAC Systems', 'Plumbing Systems', 'Generator Services'],
  },
  {
    title: 'Electrical & Solar Installation',
    description: 'Electrical and solar energy solutions for residential, commercial, and industrial applications.',
    items: ['Solar panel installation', 'Solar water pumping', 'Electrical wiring installations', 'Backup power and inverters'],
    subItems: ['Solar Installation', 'Electrical Wiring', 'Backup Power', 'Solar Pumping'],
  },
  {
    icon: faLeaf,
    title: 'Landscaping, Pest Control & Fogging',
    description: 'Landscaping and environmental services for healthy and functional outdoor spaces.',
    items: ['Landscape design and installation', 'Pest control and fumigation', 'Mosquito fogging', 'Erosion control solutions'],
    subItems: ['Landscaping', 'Pest Control', 'Fogging Services', 'Erosion Control'],
  },
];

const equipmentItems: EquipmentItem[] = [
  { icon: faTractor, title: 'Excavators', copy: 'Heavy earthmoving and excavation' },
  { icon: faTruck, title: 'Dump Trucks', copy: 'Material transport and hauling' },
  { icon: faRoad, title: 'Graders', copy: 'Road grading and leveling' },
  { icon: faIndustry, title: 'Concrete Mixers', copy: 'Concrete production and placement' },
  { icon: faBolt, title: 'Solar Equipment', copy: 'Panels, inverters, batteries' },
  { icon: faSprayCan, title: 'Fogging Machines', copy: 'Pest control and disinfection' },
  { icon: faLeaf, title: 'Landscaping Tools', copy: 'Mowers, trimmers, blowers' },
  { icon: faTools, title: 'Mechanical Tools', copy: 'Maintenance and repair equipment' },
];

const industries: IndustryItem[] = [
  { icon: faRoad, title: 'Infrastructure', copy: 'Roads, bridges, drainage' },
  { icon: faBuilding, title: 'Commercial', copy: 'Office buildings, retail' },
  { icon: faIndustry, title: 'Industrial', copy: 'Factories, warehouses' },
  { icon: faCity, title: 'Public Sector', copy: 'Government projects' },
  { icon: faHome, title: 'Residential', copy: 'Housing developments' },
];

const processSteps: ProcessStep[] = [
  { step: '1', title: 'Project Planning', copy: 'Detailed planning and resource allocation' },
  { step: '2', title: 'Engineering Design', copy: 'Technical specifications and drawings' },
  { step: '3', title: 'Construction Execution', copy: 'On-site implementation and management' },
  { step: '4', title: 'Quality Control', copy: 'Inspection and testing throughout execution' },
  { step: '5', title: 'Project Completion', copy: 'Handover and client satisfaction' },
];

export default function ServicesPage() {
  return (
    <div className={styles.page}>
      <section className={styles.banner}>
        <h1>Our Engineering & Construction Services</h1>
        <p>Divinerock Engineering Services provides comprehensive civil engineering, construction, and specialized solutions for infrastructure and industrial development.</p>
      </section>

      <section className={styles.section}>
        <div className={styles.intro}>
          <h2 className={styles.title}>Engineering Solutions You Can Trust</h2>
          <p className={styles.subtitle}>We deliver reliable engineering and construction services designed for infrastructure development, commercial projects, industrial facilities, and specialized operations.</p>
        </div>
      </section>

      <section className={`${styles.section} ${styles.light}`}>
        <div className={styles.center}>
          <h2 className={styles.title}>Our Core Services</h2>
          <p className={styles.subtitle}>Comprehensive engineering and construction solutions tailored to your needs.</p>
        </div>
        <div className={styles.servicesGrid}>
          {services.map((service) => (
            <article key={service.title} className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.icon}>{service.icon ? <FontAwesomeIcon icon={service.icon} /> : <FontAwesomeIcon icon={faBolt} />}</span>
                <h3>{service.title}</h3>
              </div>
              <div className={styles.cardBody}>
                <p>{service.description}</p>
                <ul className={styles.list}>
                  {service.items.map((item) => (
                    <li key={item}>
                      <FontAwesomeIcon icon={faCircleCheck} color="#d83936" /> {item}
                    </li>
                  ))}
                </ul>
                {service.subItems?.length ? (
                  <div className={styles.subGrid}>
                    {service.subItems.map((sub) => (
                      <div key={sub} className={styles.subItem}>
                        {sub}
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.equipment}>
        <div className={styles.center}>
          <h2 className={styles.title}>Equipment & Operational Capacity</h2>
          <p className={styles.subtitle}>Modern equipment and skilled personnel supporting efficient project delivery across all service lines.</p>
        </div>
        <div className={styles.equipmentGrid}>
          {equipmentItems.map((item) => (
            <article key={item.title} className={styles.glass}>
              <FontAwesomeIcon icon={item.icon} />
              <h4>{item.title}</h4>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.center}>
          <h2 className={styles.title}>Industries We Serve</h2>
          <p className={styles.subtitle}>Divinerock Engineering Services supports projects across multiple sectors.</p>
        </div>
        <div className={styles.industryGrid}>
          {industries.map((item) => (
            <article key={item.title} className={styles.card}>
              <span className={styles.icon}>
                <FontAwesomeIcon icon={item.icon} />
              </span>
              <h4>{item.title}</h4>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={`${styles.section} ${styles.light}`}>
        <div className={styles.center}>
          <h2 className={styles.title}>Our Project Execution Process</h2>
          <p className={styles.subtitle}>A structured approach to ensure quality, safety, and timely delivery.</p>
        </div>
        <div className={styles.processGrid}>
          {processSteps.map((item) => (
            <article key={item.step} className={styles.center}>
              <div className={styles.pill}>{item.step}</div>
              <h4>{item.title}</h4>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.cta}>
        <h2>Need Professional Engineering Services?</h2>
        <p>Divinerock Engineering Services is ready to support your construction, infrastructure, or specialized project with reliable engineering solutions.</p>
        <Link href="/quote" className={`${styles.btn} ${styles.accent}`}>
          Request a Quote
        </Link>
      </section>
    </div>
  );
}
