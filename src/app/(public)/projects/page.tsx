'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLocationDot,
  faCheck,
  faSpinner,
  faClock,
  faClipboardList,
  faDraftingCompass,
  faHardHat,
  faCheckDouble,
  faFlagCheckered,
} from '@fortawesome/free-solid-svg-icons';
import styles from './projects.module.css';

type Category = 'all' | 'road' | 'bridge' | 'building' | 'fabrication' | 'infrastructure';

type Project = {
  title: string;
  location: string;
  description: string;
  image: string;
  categoryLabel: string;
  category: Exclude<Category, 'all'>;
  scope: string[];
  outcome?: string;
};

const filters: { key: Category; label: string }[] = [
  { key: 'all', label: 'All Projects' },
  { key: 'road', label: 'Road Projects' },
  { key: 'bridge', label: 'Bridge Projects' },
  { key: 'building', label: 'Building Projects' },
  { key: 'fabrication', label: 'Fabrication Projects' },
  { key: 'infrastructure', label: 'Infrastructure Projects' },
];

const completedProjects: Project[] = [
  {
    title: 'Highway Rehabilitation Project',
    location: 'Western Area, Sierra Leone',
    description:
      'Divinerock Engineering Services undertook the rehabilitation of a major community access road designed to improve transportation efficiency and regional connectivity.',
    image: '/images/project-road.jpg',
    categoryLabel: 'Road Construction',
    category: 'road',
    scope: ['Earthworks and grading', 'Drainage installation', 'Road base construction', 'Asphalt surfacing'],
    outcome:
      'The completed road significantly improved travel time, accessibility, and economic activity within the surrounding communities.',
  },
  {
    title: 'Reinforced Concrete Bridge Construction',
    location: 'Port Loko District, Sierra Leone',
    description:
      'The company successfully executed the construction of a reinforced concrete bridge designed to support vehicular and pedestrian traffic across a seasonal waterway.',
    image: '/images/bridge.jpg',
    categoryLabel: 'Bridge Construction',
    category: 'bridge',
    scope: ['Foundation works', 'Reinforced concrete piers', 'Bridge deck construction', 'Installation of safety railings'],
    outcome:
      'The structure was designed to withstand environmental pressures and provide long-term durability, connecting communities on both sides.',
  },
  {
    title: 'Commercial Office Building Development',
    location: 'Freetown, Sierra Leone',
    description:
      'Divinerock Engineering Services delivered a multi-purpose office complex designed to provide modern workspace facilities for business operations.',
    image: '/images/bridge.jpg',
    categoryLabel: 'Building Construction',
    category: 'building',
    scope: ['Structural foundation works', 'Reinforced concrete frame', 'Roofing and finishing works', 'Electrical and plumbing'],
    outcome: 'Modern commercial facility providing quality office space for multiple businesses.',
  },
  {
    title: 'Structural Steel Fabrication Project',
    location: 'Industrial Site, Wellington',
    description:
      'The company completed a structural steel fabrication project involving the design, fabrication, and installation of steel frames for an industrial facility.',
    image: '/images/project-road.jpg',
    categoryLabel: 'Fabrication',
    category: 'fabrication',
    scope: ['Precision steel cutting', 'Welding and assembly', 'Fabrication of structural frames', 'Installation of steel supports'],
    outcome:
      'Strong and durable steel structure supporting industrial operations, meeting all engineering specifications.',
  },
  {
    title: 'Stormwater Drainage Infrastructure Project',
    location: 'Urban Area, Freetown',
    description:
      'Divinerock Engineering Services constructed a drainage system designed to manage stormwater flow and reduce flooding risks in an urban area.',
    image: '/images/bridge.jpg',
    categoryLabel: 'Infrastructure',
    category: 'infrastructure',
    scope: ['Excavation and earthworks', 'Culvert installation', 'Reinforced concrete channels', 'Erosion control measures'],
    outcome: 'Effective stormwater management significantly reduced flooding risks in the community.',
  },
  {
    title: 'Community Access Road Development',
    location: 'Western Area Rural',
    description: 'Construction of a vital community access road connecting remote villages to the main highway.',
    image: '/images/bridge.jpg',
    categoryLabel: 'Road Construction',
    category: 'road',
    scope: ['Site clearing and earthworks', 'Road grading and compaction', 'Drainage installation', 'Pavement construction'],
    outcome: 'Improved transportation access and connectivity for surrounding communities.',
  },
];

const ongoingProjects = [
  {
    title: 'Moyamba Bridge Construction',
    location: 'Moyamba District',
    description: 'Construction of a 50-meter reinforced concrete bridge to improve connectivity.',
    image: '/images/bridge.jpg',
    categoryLabel: 'Bridge Construction',
    status: ['Foundation works completed', 'Pier construction underway', 'Expected completion: Q3 2026'],
  },
  {
    title: 'Educational Facility Construction',
    location: 'Bo, Sierra Leone',
    description: 'Construction of a modern secondary school with 12 classrooms and laboratory facilities.',
    image: '/images/bridge.jpg',
    categoryLabel: 'Building Construction',
    status: ['Foundation completed', 'Wall construction in progress', 'Expected completion: Q4 2026'],
  },
] as const;

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<Category>('all');

  const visibleProjects = useMemo(
    () => (activeFilter === 'all' ? completedProjects : completedProjects.filter((project) => project.category === activeFilter)),
    [activeFilter],
  );

  return (
    <div className={styles.page}>
      <section className={styles.pageBanner}>
        <div className={styles.container}>
          <h1>Our Projects</h1>
          <p>Delivering reliable engineering and construction solutions across diverse infrastructure and development projects in Sierra Leone</p>
        </div>
      </section>

      <section>
        <div className={styles.container}>
          <div className={styles.textCenter}>
            <h2 className={styles.sectionTitle}>Project Portfolio</h2>
            <p className={styles.sectionSubtitle}>
              Divinerock Engineering Services undertakes projects that support infrastructure development and economic growth. Our portfolio includes road construction,
              bridge development, building construction, structural fabrication, and drainage infrastructure projects.
            </p>
          </div>
        </div>
      </section>

      <section className={`${styles.bgLight} ${styles.filterSection}`}>
        <div className={styles.container}>
          <div className={styles.projectFilters}>
            {filters.map((filter) => (
              <button
                key={filter.key}
                type="button"
                className={`${styles.filterBtn} ${activeFilter === filter.key ? styles.active : ''}`}
                onClick={() => setActiveFilter(filter.key)}
                aria-pressed={activeFilter === filter.key}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.bgLight}>
        <div className={styles.container}>
          <div className={styles.textCenter}>
            <h2 className={styles.sectionTitle}>Completed Projects</h2>
            <p className={styles.sectionSubtitle}>Successfully delivered projects that demonstrate our expertise and commitment to quality</p>
          </div>

          <div className={styles.projectsGrid}>
            {visibleProjects.map((project) => (
              <article key={project.title} className={styles.projectCard}>
                <div className={styles.projectImage}>
                  <Image src={project.image} alt={project.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw" />
                  <span className={styles.projectCategory}>{project.categoryLabel}</span>
                </div>
                <div className={styles.projectContent}>
                  <h3>{project.title}</h3>
                  <div className={styles.projectLocation}>
                    <FontAwesomeIcon icon={faLocationDot} />
                    <span>{project.location}</span>
                  </div>
                  <p className={styles.projectDescription}>{project.description}</p>

                  <div className={styles.projectDetails}>
                    <h4>Scope of Work:</h4>
                    <ul>
                      {project.scope.map((item) => (
                        <li key={item}>
                          <FontAwesomeIcon icon={faCheck} /> {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {project.outcome ? (
                    <div className={styles.projectOutcome}>
                      <p>
                        <strong>Outcome:</strong> {project.outcome}
                      </p>
                    </div>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className={styles.container}>
          <div className={styles.textCenter}>
            <h2 className={styles.sectionTitle}>Ongoing Projects</h2>
            <p className={styles.sectionSubtitle}>Current projects under construction and development</p>
          </div>

          <div className={styles.projectsGrid}>
            {ongoingProjects.map((project) => (
              <article key={project.title} className={styles.projectCard}>
                <div className={styles.projectImage}>
                  <Image src={project.image} alt={project.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw" />
                  <span className={styles.projectCategory}>{project.categoryLabel}</span>
                </div>
                <div className={styles.projectContent}>
                  <div className={styles.ongoingBadge}>
                    <FontAwesomeIcon spin icon={faSpinner} /> In Progress
                  </div>
                  <h3>{project.title}</h3>
                  <div className={styles.projectLocation}>
                    <FontAwesomeIcon icon={faLocationDot} />
                    <span>{project.location}</span>
                  </div>
                  <p className={styles.projectDescription}>{project.description}</p>

                  <div className={styles.projectDetails}>
                    <h4>Current Status:</h4>
                    <ul>
                      <li>
                        <FontAwesomeIcon icon={faCheck} /> {project.status[0]}
                      </li>
                      <li>
                        <FontAwesomeIcon spin icon={faSpinner} /> {project.status[1]}
                      </li>
                      <li>
                        <FontAwesomeIcon icon={faClock} /> {project.status[2]}
                      </li>
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.projectStats}>
        <div className={styles.container}>
          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>25+</div>
              <div className={styles.statLabel}>Projects Completed</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>12</div>
              <div className={styles.statLabel}>Ongoing Projects</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>8</div>
              <div className={styles.statLabel}>Government Contracts</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>100%</div>
              <div className={styles.statLabel}>Client Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.bgLight}>
        <div className={styles.container}>
          <div className={styles.textCenter}>
            <h2 className={styles.sectionTitle}>Our Project Delivery Approach</h2>
            <p className={styles.sectionSubtitle}>A structured methodology ensuring quality, safety, and timely completion</p>
          </div>

          <div className={styles.approachGrid}>
            {[
              [faClipboardList, 'Project Planning', 'Detailed planning, resource allocation, and scheduling'],
              [faDraftingCompass, 'Engineering Design', 'Technical specifications, drawings, and approvals'],
              [faHardHat, 'Construction Execution', 'On-site implementation with strict supervision'],
              [faCheckDouble, 'Quality Control', 'Continuous inspection and testing throughout'],
              [faFlagCheckered, 'Project Completion', 'Final inspection, handover, and client satisfaction'],
            ].map(([icon, title, copy]) => (
              <article key={title} className={styles.approachStep}>
                <div className={styles.stepIcon}>
                  <FontAwesomeIcon icon={icon} />
                </div>
                <h4>{title}</h4>
                <p>{copy}</p>
              </article>
            ))}
          </div>

          <p className={styles.approachNote}>This structured approach ensures every project is delivered safely, efficiently, and according to engineering standards.</p>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <h2>Looking for a Reliable Construction Partner?</h2>
            <p>Divinerock Engineering Services is ready to deliver dependable engineering solutions for your next project.</p>
            <Link href="/contact" className={`${styles.btn} ${styles.btnAccent}`}>
              Contact Us Today
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
