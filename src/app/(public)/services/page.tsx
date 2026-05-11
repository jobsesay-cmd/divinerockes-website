import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Our Services - Divinerock Engineering Services',
  description:
    'Divinerock Engineering Services provides comprehensive civil engineering, construction, and specialized solutions.',
};

export default function ServicesPage() {
  return (
    <>
      <section className="page-banner">
        <div className="container">
          <h1>Our Engineering & Construction Services</h1>
          <p>
            Divinerock Engineering Services provides comprehensive civil engineering, construction, and specialized
            solutions for infrastructure and industrial development.
          </p>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="services-intro">
            <h2 className="section-title">Engineering Solutions You Can Trust</h2>
            <p>
              Divinerock Engineering Services delivers reliable engineering and construction services designed to
              support infrastructure development, commercial construction, industrial projects, and specialized
              services.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-light">
        <div className="container">
          <div className="text-center">
            <h2 className="section-title">Our Core Services</h2>
            <p className="section-subtitle">
              Comprehensive engineering and construction solutions tailored to your needs
            </p>
          </div>

          <div className="services-main-grid">
            {[
              {
                icon: 'fa-building',
                title: 'Construction Services',
                text: 'Construction projects including roads, bridges, buildings, drainage systems, and reinforced concrete structures.',
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
                text: 'Civil engineering services supporting planning, design, and construction of durable infrastructure.',
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
                text: 'Professional steel fabrication and metal works for construction and industrial projects.',
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
                text: 'Professional project management and technical consultancy for efficient project delivery.',
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
                text: 'Renovation and maintenance services that extend the lifespan of existing buildings and infrastructure.',
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
                text: 'Expert technical advice and engineering solutions throughout the project lifecycle.',
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
                text: 'Mechanical engineering and maintenance solutions for industrial and commercial facilities.',
                items: [
                  'Industrial machinery maintenance',
                  'HVAC design and servicing',
                  'Plumbing and piping systems',
                  'Generator servicing',
                ],
                sub: [
                  ['Industrial Maintenance', 'Machinery servicing and repairs'],
                  ['HVAC Systems', 'Installation and maintenance'],
                  ['Plumbing Systems', 'Design, installation, repair'],
                  ['Generator Services', 'Installation and maintenance'],
                ],
              },
              {
                icon: 'fa-solar-panel',
                title: 'Electrical & Solar Installation',
                text: 'Electrical and solar energy solutions for residential, commercial, and industrial applications.',
                items: [
                  'Solar panel installation and maintenance',
                  'Solar water pumping systems',
                  'Electrical wiring and installations',
                  'Backup power systems and inverters',
                  'Energy efficiency audits',
                  'Street/security lighting',
                ],
                sub: [
                  ['Solar Installation', 'Panels, inverters, batteries'],
                  ['Electrical Wiring', 'Residential and commercial'],
                  ['Backup Power', 'Inverter and generator systems'],
                  ['Solar Pumping', 'Water supply solutions'],
                ],
              },
              {
                icon: 'fa-leaf',
                title: 'Landscaping, Pest Control & Fogging',
                text: 'Landscaping and environmental services to enhance property aesthetics and maintain healthy environments.',
                items: [
                  'Landscape design and installation',
                  'Lawn and garden maintenance',
                  'Pest control and fumigation',
                  'Mosquito fogging and vector control',
                  'Tree planting and pruning',
                  'Erosion control solutions',
                ],
                sub: [
                  ['Landscaping', 'Design, planting, maintenance'],
                  ['Pest Control', 'Residential and commercial'],
                  ['Fogging Services', 'Mosquito and vector control'],
                  ['Erosion Control', 'Slope stabilization'],
                ],
              },
            ].map((service) => (
              <div className="service-category" key={service.title}>
                <div className="service-header">
                  <i className={`fas ${service.icon}`} />
                  <h3>{service.title}</h3>
                </div>
                <div className="service-content">
                  <p>{service.text}</p>

                  <div className="construction-subsection">
                    <h4>Includes:</h4>
                    <ul className="service-features">
                      {service.items.map((item) => (
                        <li key={item}>
                          <i className="fas fa-check-circle" /> {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {'sub' in service && service.sub ? (
                    <div className="construction-grid">
                      {service.sub.map(([title, desc]) => (
                        <div className="construction-item" key={title}>
                          <h5>{title}</h5>
                          <p>{desc}</p>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="equipment-section">
        <div className="container">
          <div className="equipment-content">
            <h2 className="section-title">Equipment & Operational Capacity</h2>
            <p>
              Divinerock Engineering Services utilizes modern construction equipment and skilled personnel to support
              efficient project delivery across all service lines.
            </p>

            <div className="equipment-grid">
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
                <div className="equipment-item" key={title}>
                  <i className={`fas ${icon}`} />
                  <h4>{title}</h4>
                  <p>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="text-center">
            <h2 className="section-title">Industries We Serve</h2>
            <p className="section-subtitle">Divinerock Engineering Services supports projects across multiple sectors</p>
          </div>

          <div className="industries-grid">
            {[
              ['fa-road', 'Infrastructure', 'Roads, bridges, drainage'],
              ['fa-building', 'Commercial', 'Office buildings, retail'],
              ['fa-industry', 'Industrial', 'Factories, warehouses'],
              ['fa-city', 'Public Sector', 'Government projects'],
              ['fa-home', 'Residential', 'Housing developments'],
            ].map(([icon, title, desc]) => (
              <div className="industry-card" key={title}>
                <div className="industry-icon">
                  <i className={`fas ${icon}`} />
                </div>
                <h4>{title}</h4>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-light">
        <div className="container">
          <div className="text-center">
            <h2 className="section-title">Our Project Execution Process</h2>
            <p className="section-subtitle">A structured approach to ensure quality, safety, and timely delivery</p>
          </div>

          <div className="process-grid">
            {[
              ['1', 'Project Planning', 'Detailed planning and resource allocation'],
              ['2', 'Engineering Design', 'Technical specifications and drawings'],
              ['3', 'Construction Execution', 'On-site implementation and management'],
              ['4', 'Quality Control', 'Inspection and testing throughout'],
              ['5', 'Project Completion', 'Handover and client satisfaction'],
            ].map(([step, title, desc]) => (
              <div className="process-step" key={step}>
                <div className="step-number">{step}</div>
                <h4>{title}</h4>
                <p>{desc}</p>
              </div>
            ))}
          </div>

          <p style={{ textAlign: 'center', marginTop: '50px', color: '#4a5a6a', fontSize: '1.1rem' }}>
            This ensures every project is delivered safely, efficiently, and according to engineering standards.
          </p>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Need Professional Engineering Services?</h2>
            <p>
              Divinerock Engineering Services is ready to support your construction, infrastructure, or specialized
              project with reliable engineering solutions.
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