import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Link from 'next/link';
import styles from './about.module.css';

type Accent = 'blue' | 'red';
type IconName =
  | 'target'
  | 'eye'
  | 'star'
  | 'handshake'
  | 'shield'
  | 'person'
  | 'bulb'
  | 'team'
  | 'badge'
  | 'hardhat'
  | 'leaf'
  | 'building';

type InfoCard = {
  title: string;
  description: string;
  icon: IconName;
  accent?: Accent;
};

type Stat = {
  value: string;
  label: string;
};

type TeamMember = {
  name: string;
  role: string;
  initials: string;
  imageSrc?: string;
};

type ExperienceGroup = {
  title: string;
  items: string[];
};

export const metadata: Metadata = {
  title: 'About | Divinerock Engineering Services',
  description:
    'About Divinerock Engineering Services: our mission, vision, values, capability, safety commitment, and professional team.',
};

const values: InfoCard[] = [
  {
    title: 'Quality',
    icon: 'star',
    description:
      'We are committed to delivering dependable work that meets agreed standards, client expectations, and long-term performance goals.',
  },
  {
    title: 'Integrity',
    icon: 'handshake',
    description:
      'We operate with transparency, accountability, and ethical decision-making across every engagement and project phase.',
  },
  {
    title: 'Safety',
    icon: 'shield',
    description:
      'We place safety first by protecting our teams, clients, communities, and the environments where we work.',
  },
  {
    title: 'Professionalism',
    icon: 'person',
    description:
      'Our team brings disciplined project execution, clear communication, and respect for every stakeholder.',
  },
  {
    title: 'Innovation',
    icon: 'bulb',
    description:
      'We use modern engineering methods, practical technology, and continuous improvement to solve complex challenges.',
  },
  {
    title: 'Teamwork',
    icon: 'team',
    description:
      'We build collaborative relationships with clients, consultants, suppliers, and communities to achieve shared outcomes.',
  },
];

const stats: Stat[] = [
  { value: '25+', label: 'Years of experience' },
  { value: '15+', label: 'Skilled professionals' },
  { value: '10+', label: 'Major service areas' },
];

const safetyItems = [
  'Safe working environment for all personnel and visitors',
  'Regular safety training, awareness, and toolbox talks',
  'Risk assessments and hazard controls before site activities',
  'Site supervision and compliance monitoring',
  'Personal protective equipment standards',
  'Incident reporting and continuous improvement practices',
];

const certifications: InfoCard[] = [
  {
    title: 'ISO 9001:2015',
    icon: 'badge',
    description: 'Quality Management Systems',
  },
  {
    title: 'OHS Standard',
    icon: 'hardhat',
    description: 'Occupational Health & Safety',
  },
  {
    title: 'ISO 14001',
    icon: 'leaf',
    description: 'Environmental Management',
  },
  {
    title: 'NCA Registered',
    icon: 'building',
    description: 'National Construction Authority',
  },
];

const teamMembers: TeamMember[] = [
  { name: 'Franklyn Kamara', role: 'Managing Director & CEO', initials: 'FK', imageSrc: '/images/team/franklyn-kamara.jpg' },
  { name: 'Ing. Abass Sesay', role: 'Head of Operations', initials: 'AS', imageSrc: '/images/team/abass-sesay.jpg' },
  { name: 'Elisha James', role: 'Civil Engineer', initials: 'EJ', imageSrc: '/images/team/elisha-james.jpeg' },
  { name: 'Samuel Bangura', role: 'Lead Masoner', initials: 'SB', imageSrc: '/images/team/samuel-bangura.jpg' },
  { name: 'Augustine Tucker', role: 'Lead Fumigator', initials: 'AT', imageSrc: '/images/team/augustine-tucker.jpeg' },
  { name: 'Alimamy Kamara', role: 'Lead Welder', initials: 'AK', imageSrc: '/images/team/alimamy-kamara.jpg' },
  { name: 'Abdulai Kabba', role: 'Lead Tiler', initials: 'AK', imageSrc: '/images/team/abdulai-kabba.jpeg' },
  { name: 'Saio Marah', role: 'Electrician', initials: 'SM', imageSrc: '/images/team/saio-marah.jpeg' },
  { name: 'Jude Sorie Kamara', role: 'Supervisor', initials: 'JSK', imageSrc: '/images/team/jude-sorie-kamara.jpeg' },
  { name: 'Komba Jimissa', role: 'Foreman', initials: 'KJ', imageSrc: '/images/team/komba-jimissa.jpeg' },
];

const experienceGroups: ExperienceGroup[] = [
  {
    title: 'Infrastructure Projects',
    items: ['Road construction and rehabilitation', 'Water and sanitation', 'Drainage systems', 'Bridges and culverts'],
  },
  {
    title: 'Building Projects',
    items: ['Commercial buildings', 'Residential buildings', 'Educational facilities', 'Industrial structures'],
  },
];

export default function AboutPage() {
  const companyOverviewImageSrc = '/Images/divine-rock-team-picture.jpeg';
  const healthSafetyImageSrc = '/Images/divine-rock-safety-first.jpg';

  return (
    <main className={styles.legacyAbout} aria-labelledby="about-page-title">
      <section className={styles.legacyAboutHero}>
        <div className={styles.legacyAboutHeroOverlay} />
        <div className={`${styles.legacyAboutContainer} ${styles.legacyAboutHeroContent}`}>
          <p className={styles.legacyAboutEyebrow}>Engineering • Construction • Project Delivery</p>
          <h1 id="about-page-title">About Divinerock Engineering Services</h1>
          <p>
            Building stronger foundations for sustainable infrastructure through expertise, integrity,
            and innovation.
          </p>
        </div>
      </section>

      <section className={`${styles.legacyAboutSection} ${styles.legacyAboutSectionWhite}`}>
        <div className={`${styles.legacyAboutContainer} ${styles.legacyAboutSplit} ${styles.legacyAboutSplitTop}`}>
          <div className={styles.legacyAboutCopy}>
            <SectionHeading align="left" title="Company Overview" />
            <p>
              Divinerock Engineering Services is a professional engineering and construction company
              dedicated to delivering quality, sustainable infrastructure and engineering solutions.
            </p>
            <p>
              We combine technical knowledge, modern project controls, and ethical service delivery to
              build reliable assets that support communities and long-term development.
            </p>
            <p>
              From concept development and design coordination to field supervision and construction
              delivery, we approach every assignment with practical solutions and measurable quality outcomes.
            </p>

            <div className={styles.legacyAboutCommitment}>
              <h3>Our Commitment</h3>
              <p>
                We are committed to ethical service, strong engineering practice, sustainable outcomes,
                and infrastructure solutions that create lasting value.
              </p>
            </div>
          </div>

          <VisualFrame imageSrc={companyOverviewImageSrc} alt="Divinerock team company overview" />
        </div>
      </section>

      <section className={`${styles.legacyAboutSection} ${styles.legacyAboutSectionMuted}`}>
        <div className={`${styles.legacyAboutContainer} ${styles.legacyAboutMissionGrid}`}>
          <article className={`${styles.legacyAboutStatement} ${styles.legacyAboutStatementBlue}`}>
            <IconBadge icon="target" />
            <h2>Our Mission</h2>
            <p>
              To provide high-quality engineering and construction services that support infrastructure
              development with reliability and client-focused delivery.
            </p>
          </article>
          <article className={`${styles.legacyAboutStatement} ${styles.legacyAboutStatementRed}`}>
            <IconBadge icon="eye" tone="red" />
            <h2>Our Vision</h2>
            <p>
              To be a trusted engineering and construction partner recognized for innovation and
              sustainable infrastructure.
            </p>
          </article>
        </div>
      </section>

      <section className={`${styles.legacyAboutSection} ${styles.legacyAboutSectionWhite}`}>
        <div className={styles.legacyAboutContainer}>
          <SectionHeading title="Our Core Values" subtitle="The principles that guide our work and define our company culture." />
          <div className={`${styles.legacyAboutCardGrid} ${styles.legacyAboutCardGridValues}`}>
            {values.map((value) => (
              <InfoTile key={value.title} item={value} />
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.legacyAboutSection} ${styles.legacyAboutSectionBlue}`}>
        <div className={`${styles.legacyAboutContainer} ${styles.legacyAboutCentered} ${styles.legacyAboutCapability}`}>
          <h2>Our Capability Statement</h2>
          <p>
            Divinerock Engineering Services provides professional civil engineering, construction,
            maintenance, and project management support.
          </p>
          <p>
            We have the resources and management systems required to deliver projects of varying scale
            and complexity.
          </p>
          <div className={styles.legacyAboutStats}>
            {stats.map((stat) => (
              <div className={styles.legacyAboutStat} key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.legacyAboutSection} ${styles.legacyAboutSectionWhite}`}>
        <div className={`${styles.legacyAboutContainer} ${styles.legacyAboutSplit} ${styles.legacyAboutSplitMiddle}`}>
          <div className={styles.legacyAboutCopy}>
            <SectionHeading align="left" title="Health & Safety Commitment" />
            <p>
              We maintain a proactive safety culture across our operations, ensuring every project is
              planned and executed with clear controls.
            </p>
            <ul className={styles.legacyAboutCheckList}>
              {safetyItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <VisualFrame imageSrc={healthSafetyImageSrc} alt="Divinerock safety-first operations" />
        </div>
      </section>

      <section className={`${styles.legacyAboutSection} ${styles.legacyAboutSectionMuted}`}>
        <div className={styles.legacyAboutContainer}>
          <SectionHeading
            title="Certifications & Compliance"
            subtitle="We operate in accordance with recognized standards and regulatory requirements."
          />
          <div className={`${styles.legacyAboutCardGrid} ${styles.legacyAboutCardGridCerts}`}>
            {certifications.map((item) => (
              <InfoTile key={item.title} item={item} compact />
            ))}
          </div>
          <p className={styles.legacyAboutComplianceNote}>
            Our management systems emphasize quality assurance, health and safety, and environmental responsibility.
          </p>
        </div>
      </section>

      <section className={`${styles.legacyAboutSection} ${styles.legacyAboutSectionWhite}`}>
        <div className={styles.legacyAboutContainer}>
          <SectionHeading
            title="Our Professional Team"
            subtitle="Experienced professionals who support each stage of project delivery."
          />
          <div className={styles.legacyAboutTeamGrid}>
            {teamMembers.map((member) => (
              <article className={styles.legacyAboutTeamCard} key={member.name}>
                <div className={styles.legacyAboutAvatarWrap}>
                  {member.imageSrc ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={member.imageSrc} alt={member.name} className={styles.legacyAboutAvatarImage} />
                  ) : (
                    <div className={styles.legacyAboutAvatar} aria-hidden="true">
                      {member.initials}
                    </div>
                  )}
                </div>
                <h3>{member.name}</h3>
                <p>{member.role}</p>
                <div className={styles.legacyAboutSocials} aria-label={`${member.name} profile links`}>
                  <span>in</span>
                  <span>f</span>
                  <span>✉</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.legacyAboutSection} ${styles.legacyAboutSectionMuted}`}>
        <div className={styles.legacyAboutContainer}>
          <SectionHeading
            title="Our Experience & Expertise"
            subtitle="Years of experience across civil and building project delivery."
          />
          <div className={styles.legacyAboutExperienceCard}>
            {experienceGroups.map((group) => (
              <div className={styles.legacyAboutExperienceGroup} key={group.title}>
                <h3>{group.title}</h3>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.legacyAboutCta} aria-labelledby="about-cta-title">
        <div className={styles.legacyAboutHeroOverlay} />
        <div className={`${styles.legacyAboutContainer} ${styles.legacyAboutCtaContent}`}>
          <h2 id="about-cta-title">Ready to Start Your Project?</h2>
          <p>
            Partner with Divinerock Engineering Services for reliable, professional, and cost-effective
            engineering solutions.
          </p>
          <Link className={styles.legacyAboutButton} href="/contact">
            Request a Quote
          </Link>
        </div>
      </section>
    </main>
  );
}

function SectionHeading({
  title,
  subtitle,
  align = 'center',
}: {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}) {
  return (
    <div
      className={`${styles.legacyAboutHeading} ${
        align === 'left' ? styles.legacyAboutHeadingLeft : styles.legacyAboutHeadingCenter
      }`}
    >
      <h2>{title}</h2>
      <span aria-hidden="true" />
      {subtitle ? <p>{subtitle}</p> : null}
    </div>
  );
}

function InfoTile({ item, compact = false }: { item: InfoCard; compact?: boolean }) {
  return (
    <article className={`${styles.legacyAboutTile} ${compact ? styles.legacyAboutTileCompact : ''}`}>
      <IconBadge icon={item.icon} tone={item.accent ?? 'blue'} />
      <h3>{item.title}</h3>
      <p>{item.description}</p>
    </article>
  );
}

function VisualFrame({ imageSrc, alt }: { imageSrc?: string; alt: string }) {
  return (
    <div className={styles.legacyAboutVisualFrame}>
      {imageSrc ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={imageSrc} alt={alt} loading="lazy" />
      ) : (
        <div className={styles.legacyAboutMockPhoto} role="img" aria-label={alt}>
          <div className={styles.legacyAboutMockWindow}>
            {Array.from({ length: 14 }).map((_, index) => (
              <span key={index} style={{ width: `${42 + ((index * 13) % 48)}%` }} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function IconBadge({ icon, tone = 'blue' }: { icon: IconName; tone?: Accent }) {
  return (
    <span className={`${styles.legacyAboutIcon} ${tone === 'red' ? styles.legacyAboutIconRed : ''}`} aria-hidden="true">
      <svg viewBox="0 0 24 24" focusable="false">
        {iconSvg(icon)}
      </svg>
    </span>
  );
}

function iconSvg(icon: IconName): ReactNode {
  switch (icon) {
    case 'target':
      return (
        <>
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="12" cy="12" r="1.6" />
        </>
      );
    case 'eye':
      return (
        <>
          <path d="M3 12s3.4-5.5 9-5.5S21 12 21 12s-3.4 5.5-9 5.5S3 12 3 12Z" />
          <circle cx="12" cy="12" r="2.5" />
        </>
      );
    case 'star':
      return <path d="m12 3 2.6 5.4 5.9.8-4.3 4.2 1 5.9-5.2-2.8-5.2 2.8 1-5.9-4.3-4.2 5.9-.8L12 3Z" />;
    case 'handshake':
      return <path d="M8 12.3 5.8 10 3 12.8l5.7 5.7c.9.9 2.3.9 3.2 0l5.9-5.9-2.8-2.8-4.4 4.4-2.6-1.9Zm5.1-5.1 2.1-2.1c.8-.8 2.1-.8 2.9 0L21 8l-3.1 3.1-2.8-2.8-2.2 2.2-1.5-1.5 1.7-1.8Z" />;
    case 'shield':
      return <path d="M12 3 5 6v5.4c0 4.4 2.8 8.4 7 10.1 4.2-1.7 7-5.7 7-10.1V6l-7-3Zm0 4.2 4 1.7v2.5c0 2.9-1.5 5.5-4 7-2.5-1.5-4-4.1-4-7V8.9l4-1.7Z" />;
    case 'person':
      return <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8c.6-3.5 3.2-6 7-6s6.4 2.5 7 6H5Z" />;
    case 'bulb':
      return <path d="M9 19h6v2H9v-2Zm3-17a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2Zm2.7 11.3-.7.5V15h-4v-1.2l-.7-.5A4.8 4.8 0 1 1 14.7 13.3Z" />;
    case 'team':
      return <path d="M8.5 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm7 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM2.5 19c.4-3.2 2.7-5.5 6-5.5s5.6 2.3 6 5.5h-12Zm10.7-4.4c.8-.4 1.7-.6 2.8-.6 3.1 0 5.2 2 5.5 5h-4.7a7.8 7.8 0 0 0-3.6-4.4Z" />;
    case 'badge':
      return <path d="m12 2 2.2 2 3-.4.8 2.9 2.6 1.5-1.2 2.8 1.2 2.8-2.6 1.5-.8 2.9-3-.4L12 22l-2.2-2-3 .4-.8-2.9-2.6-1.5 1.2-2.8-1.2-2.8L6 8.9l.8-2.9 3 .4L12 2Zm-2.1 11.8 5.3-5.3 1.4 1.4-6.7 6.7-3.5-3.5 1.4-1.4 2.1 2.1Z" />;
    case 'hardhat':
      return <path d="M4 15h16v2H4v-2Zm2-1v-2a6 6 0 0 1 4-5.7V10h2V5.9h2V10h2V6.3a6 6 0 0 1 4 5.7v2H6Zm-1 4h14v2H5v-2Z" />;
    case 'leaf':
      return <path d="M19.8 3.5c-6.6.2-11.6 2.2-14.1 5.6-2.2 3-1.5 6.3-.2 8.2 2.4-4.6 6.6-7.4 11.4-8.6-4.7 2-8.2 5.1-10.1 10.2 2.4 1.6 6.8 1.8 9.7-1.1 3.3-3.4 3.7-9.4 3.3-14.3Z" />;
    case 'building':
      return <path d="M5 21V3h14v18h-4v-4H9v4H5Zm3-14h3V5H8v2Zm5 0h3V5h-3v2ZM8 11h3V9H8v2Zm5 0h3V9h-3v2ZM8 15h3v-2H8v2Zm5 0h3v-2h-3v2Z" />;
    default:
      return null;
  }
}