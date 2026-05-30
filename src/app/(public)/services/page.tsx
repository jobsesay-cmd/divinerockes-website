import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './services.module.css';
import ServicesComponent, { type FrontendServiceCard } from '@/components/services/services-component';

type IconName =
  | 'building'
  | 'drafting'
  | 'wrench'
  | 'checklist'
  | 'tools'
  | 'chart'
  | 'gears'
  | 'solar'
  | 'leaf'
  | 'excavator'
  | 'truck'
  | 'road'
  | 'mixer'
  | 'bolt'
  | 'fog'
  | 'home'
  | 'factory'
  | 'city';

type SmallCard = {
  icon: IconName;
  title: string;
  description: string;
};

type ServicesApiResponse = { items: FrontendServiceCard[] };

export const metadata: Metadata = {
  title: 'Services | Divinerock Engineering Services',
  description:
    'Explore Divinerock Engineering Services offerings: construction, civil engineering, fabrication, project management, mechanical, electrical/solar, and landscaping services.',
};

const equipment: SmallCard[] = [
  { icon: 'excavator', title: 'Excavators', description: 'Heavy earthmoving and excavation' },
  { icon: 'truck', title: 'Dump Trucks', description: 'Material transport and hauling' },
  { icon: 'road', title: 'Graders', description: 'Road grading and leveling' },
  { icon: 'mixer', title: 'Concrete Mixers', description: 'Concrete production and placement' },
  { icon: 'bolt', title: 'Solar Equipment', description: 'Panels, inverters, batteries' },
  { icon: 'fog', title: 'Fogging Machines', description: 'Pest control and disinfection' },
  { icon: 'leaf', title: 'Landscaping Tools', description: 'Mowers, trimmers, blowers' },
  { icon: 'tools', title: 'Mechanical Tools', description: 'Maintenance and repair equipment' },
];

const industries: SmallCard[] = [
  { icon: 'road', title: 'Infrastructure', description: 'Roads, bridges, drainage' },
  { icon: 'building', title: 'Commercial', description: 'Office buildings, retail' },
  { icon: 'factory', title: 'Industrial', description: 'Factories, warehouses' },
  { icon: 'city', title: 'Public Sector', description: 'Government projects' },
  { icon: 'home', title: 'Residential', description: 'Housing developments' },
];

const processSteps = [
  { step: 1, title: 'Project Planning', description: 'Detailed planning and resource allocation' },
  { step: 2, title: 'Engineering Design', description: 'Technical specifications and drawings' },
  { step: 3, title: 'Construction Execution', description: 'On-site implementation and management' },
  { step: 4, title: 'Quality Control', description: 'Inspection and testing throughout' },
  { step: 5, title: 'Project Completion', description: 'Handover and client satisfaction' },
];

async function getCoreServices(): Promise<FrontendServiceCard[]> {
  const base =
    process.env.NEXT_PUBLIC_APP_URL ||
    process.env.APP_URL ||
    'http://localhost:3000';

  try {
    const res = await fetch(new URL('/api/services', base).toString(), {
      cache: 'no-store',
    });

    if (!res.ok) return [];

    const payload = (await res.json()) as { data?: ServicesApiResponse } & ServicesApiResponse;
    const data = payload?.data ?? payload;
    return data?.items ?? [];
  } catch {
    return [];
  }
}

function Icon({ name, className }: { name: IconName; className?: string }) {
  const props = {
    viewBox: '0 0 64 64',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
    className,
    'aria-hidden': true,
  } as const;

  const strokeProps = {
    stroke: 'currentColor',
    strokeWidth: 5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  switch (name) {
    case 'building':
      return (
        <svg {...props}>
          <rect x="14" y="9" width="36" height="50" rx="3" fill="currentColor" opacity="0.18" />
          <path {...strokeProps} d="M14 59V9h36v50M24 20h.1M34 20h.1M44 20h.1M24 31h.1M34 31h.1M44 31h.1M24 42h.1M34 42h.1M44 42h.1M28 59V48h8v11" />
        </svg>
      );
    case 'drafting':
      return (
        <svg {...props}>
          <path {...strokeProps} d="M11 51 44 18l8 8-33 33H11v-8Z" />
          <path {...strokeProps} d="M38 24 47 15M15 47l11 11M32 37l8 8M42 27l8 8" />
          <circle cx="47" cy="15" r="5" fill="currentColor" />
        </svg>
      );
    case 'wrench':
      return (
        <svg {...props}>
          <path {...strokeProps} d="M42 9a15 15 0 0 0-17 19L9 44a7 7 0 1 0 10 10l16-16A15 15 0 0 0 54 21l-11 11-11-11L42 9Z" />
        </svg>
      );
    case 'checklist':
      return (
        <svg {...props}>
          <path {...strokeProps} d="M27 18h29M27 32h29M27 46h29M8 16l5 5 9-10M8 31l5 5 9-10M8 46l5 5 9-10" />
        </svg>
      );
    case 'tools':
      return (
        <svg {...props}>
          <path {...strokeProps} d="M19 10l13 13M12 17l13 13M15 13l-5 5 12 12 5-5" />
          <path {...strokeProps} d="M39 9a10 10 0 0 0-8 14L12 42a7 7 0 1 0 10 10l19-19a10 10 0 0 0 14-12l-8 8-8-8 8-8a10 10 0 0 0-8-4Z" />
        </svg>
      );
    case 'chart':
      return (
        <svg {...props}>
          <path {...strokeProps} d="M9 9v50h50M18 44l11-13 10 7 15-22" />
          <path {...strokeProps} d="M48 16h6v6" />
        </svg>
      );
    case 'gears':
      return (
        <svg {...props}>
          <circle cx="24" cy="25" r="9" {...strokeProps} />
          <circle cx="44" cy="44" r="8" {...strokeProps} />
          <path {...strokeProps} d="M24 8v7M24 34v7M7 25h7M33 25h7M12 13l5 5M31 32l5 5M12 37l5-5M31 18l5-5M44 31v5M44 52v5M31 44h5M52 44h5M35 35l4 4M49 49l4 4M35 53l4-4M49 39l4-4" />
        </svg>
      );
    case 'solar':
      return (
        <svg {...props}>
          <path {...strokeProps} d="M10 35h44M15 18h34l5 26H10l5-26ZM32 18v26M21 18l-3 26M43 18l3 26M16 52h32" />
        </svg>
      );
    case 'leaf':
      return (
        <svg {...props}>
          <path {...strokeProps} d="M53 11C28 12 15 23 15 39c0 9 7 16 16 16 15 0 23-16 22-44Z" />
          <path {...strokeProps} d="M17 51c9-16 22-25 37-28" />
        </svg>
      );
    case 'excavator':
      return (
        <svg {...props}>
          <path {...strokeProps} d="M9 43h29l12-14M28 43l9-20 11 6M42 43h12M15 43a6 6 0 1 0 0 12 6 6 0 0 0 0-12ZM43 43a6 6 0 1 0 0 12 6 6 0 0 0 0-12ZM50 29l6-11" />
          <path {...strokeProps} d="M30 23h-9l-7 14" />
        </svg>
      );
    case 'truck':
      return (
        <svg {...props}>
          <path {...strokeProps} d="M8 36V18h31v24H8v-6ZM39 27h10l7 9v6H39V27Z" />
          <circle cx="19" cy="46" r="6" {...strokeProps} />
          <circle cx="47" cy="46" r="6" {...strokeProps} />
        </svg>
      );
    case 'road':
      return (
        <svg {...props}>
          <path {...strokeProps} d="M25 7 13 59M39 7l12 52M32 16v7M32 32v7M32 48v7" />
        </svg>
      );
    case 'mixer':
      return (
        <svg {...props}>
          <path {...strokeProps} d="M8 42h43l5-17H40l-8-9H18v26" />
          <path {...strokeProps} d="M22 19 39 38M39 19 22 38" />
          <circle cx="18" cy="48" r="6" {...strokeProps} />
          <circle cx="44" cy="48" r="6" {...strokeProps} />
        </svg>
      );
    case 'bolt':
      return (
        <svg {...props}>
          <path fill="currentColor" d="M37 4 12 36h19l-4 28 26-37H34L37 4Z" />
        </svg>
      );
    case 'fog':
      return (
        <svg {...props}>
          <path {...strokeProps} d="M12 26h28M12 38h40M12 50h28M42 16h6a8 8 0 0 1 0 16h-4" />
        </svg>
      );
    case 'home':
      return (
        <svg {...props}>
          <path {...strokeProps} d="M8 31 32 11l24 20M15 28v28h34V28M26 56V40h12v16" />
        </svg>
      );
    case 'factory':
      return (
        <svg {...props}>
          <path {...strokeProps} d="M10 54V29l16 9V28l16 10V20h12v34H10ZM20 48h.1M32 48h.1M44 48h.1" />
        </svg>
      );
    case 'city':
      return (
        <svg {...props}>
          <path {...strokeProps} d="M9 56V22h15v34M24 56V11h18v45M42 56V29h13v27M17 31h.1M17 42h.1M32 20h.1M32 31h.1M32 42h.1M49 38h.1M49 48h.1" />
        </svg>
      );
    default:
      return null;
  }
}

function SectionHeading({
  title,
  subtitle,
  light = false,
  align = 'center',
}: {
  title: string;
  subtitle?: string;
  light?: boolean;
  align?: 'center' | 'left';
}) {
  return (
    <div
      className={`${styles.apSectionHeading} ${
        align === 'left' ? styles.apSectionHeadingLeft : ''
      } ${light ? styles.apSectionHeadingLight : ''}`}
    >
      <h2>{title}</h2>
      <span aria-hidden="true" />
      {subtitle ? <p>{subtitle}</p> : null}
    </div>
  );
}

export default async function ServicesPage() {
  const coreServices = await getCoreServices();

  return (
    <main className={styles.aboutPage}>
      <section className={styles.apHero}>
        <div className={`${styles.apContainer} ${styles.apHeroContent}`}>
          <h1>Our Engineering &amp; Construction Services</h1>
          <p>
            Divinerock Engineering Services provides comprehensive civil engineering, construction, and
            specialized solutions for infrastructure and industrial development.
          </p>
        </div>
      </section>

      <section className={styles.apIntro} aria-labelledby="engineering-solutions-title">
        <div className={`${styles.apContainer} ${styles.apIntroInner}`}>
          <SectionHeading title="Engineering Solutions You Can Trust" align="left" />
          <p id="engineering-solutions-title">
            Divinerock Engineering Services delivers reliable engineering and construction services designed
            to support infrastructure development, commercial construction, industrial projects, and specialized
            services. Our experienced team combines technical expertise with modern techniques to ensure every
            project meets the highest standards of quality, safety, and durability.
          </p>
        </div>
      </section>

      <section className={styles.apServices} aria-labelledby="core-services-title">
        <div className={styles.apContainer}>
          <SectionHeading
            title="Our Core Services"
            subtitle="Comprehensive engineering and construction solutions tailored to your needs"
          />
          <div id="core-services-title">
            <ServicesComponent items={coreServices} />
          </div>
        </div>
      </section>

      <section className={styles.apEquipment} aria-labelledby="equipment-title">
        <div className={styles.apContainer}>
          <SectionHeading
            title="Equipment &amp; Operational Capacity"
            light
            align="left"
            subtitle="Divinerock Engineering Services utilizes modern construction equipment and skilled personnel to support efficient project delivery. Our operational capacity includes earthmoving machinery, concrete equipment, fabrication tools, construction support vehicles, and landscaping equipment for electrical, mechanical, and landscaping services."
          />
          <div className={styles.apEquipmentGrid} id="equipment-title">
            {equipment.map((item) => (
              <article className={styles.apEquipmentCard} key={item.title}>
                <Icon name={item.icon} className={styles.apEquipmentCardIcon} />
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.apIndustries} aria-labelledby="industries-title">
        <div className={styles.apContainer}>
          <SectionHeading
            title="Industries We Serve"
            subtitle="Divinerock Engineering Services supports projects across multiple sectors"
          />
          <div className={styles.apIndustriesGrid} id="industries-title">
            {industries.map((industry) => (
              <article className={styles.apIndustryCard} key={industry.title}>
                <span className={styles.apIndustryCardIconWrap}>
                  <Icon name={industry.icon} className={styles.apIndustryCardIcon} />
                </span>
                <h3>{industry.title}</h3>
                <p>{industry.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.apProcess} aria-labelledby="process-title">
        <div className={styles.apContainer}>
          <SectionHeading
            title="Our Project Execution Process"
            subtitle="A structured approach to ensure quality, safety, and timely delivery"
          />
          <div className={styles.apProcessTimeline} id="process-title">
            {processSteps.map((step, index) => (
              <div key={step.step} className={styles.apProcessNode}>
                <article className={styles.apProcessStep}>
                  <span>{step.step}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </article>
                {index < processSteps.length - 1 ? (
                  <div className={styles.apProcessArrow} aria-hidden="true">
                    →
                  </div>
                ) : null}
              </div>
            ))}
          </div>
          <p className={styles.apProcessNote}>
            This ensures every project is delivered safely, efficiently, and according to engineering standards.
          </p>
        </div>
      </section>

      <section className={styles.apCta} aria-labelledby="cta-title">
        <div className={`${styles.apContainer} ${styles.apCtaInner}`}>
          <h2 id="cta-title">
            Need Professional
            <br />
            Engineering Services?
          </h2>
          <p>
            Divinerock Engineering Services is ready to support your construction, infrastructure, or
            specialized project with reliable engineering solutions.
          </p>
          <Link className={`${styles.apButton} ${styles.apButtonCta}`} href="/request-a-quote">
            Request a Quote
          </Link>
        </div>
      </section>
    </main>
  );
}