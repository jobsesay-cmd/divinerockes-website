import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Divinerock Engineering Services - Home',
  description:
    'Divinerock Engineering Services delivers reliable civil engineering, construction, and fabrication solutions.',
};

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Building Strong Foundations for Sustainable Infrastructure</h1>
            <p>
              Divinerock Engineering Services delivers reliable civil engineering, construction, and fabrication
              solutions for infrastructure, commercial, and industrial development.
            </p>
            <div className="hero-buttons">
              <Link href="/services" className="btn btn-primary">
                View Our Services
              </Link>
              <Link href="/quote" className="btn btn-accent">
                Request a Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="about-grid">
            <div className="about-image">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/about-construction.JPG" alt="Construction site" />
            </div>
            <div className="about-content">
              <h2 className="section-title">About Divinerock Engineering Services</h2>
              <p>
                Divinerock Engineering Services is a dynamic civil engineering and construction company dedicated to
                providing innovative and reliable infrastructure solutions.
              </p>
              <p>
                Our team of experienced engineers, technicians, and construction professionals work together to deliver
                projects that meet modern engineering standards while addressing client and community needs.
              </p>
              <Link href="/about" className="btn btn-primary">
                Learn More About Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-light">
        <div className="container">
          <div className="text-center">
            <h2 className="section-title">Our Engineering & Construction Services</h2>
            <p className="section-subtitle">
              Divinerock Engineering Services offers a comprehensive range of engineering and construction services
              designed to support infrastructure development and structural projects.
            </p>
          </div>

          <div className="services-grid">
            {[
              ['fa-building', 'Construction Services', 'Roads, bridges, buildings, drainage systems, and reinforced concrete structures.'],
              ['fa-drafting-compass', 'Civil Engineering', 'Structural design, infrastructure development, site preparation, and geotechnical support.'],
              ['fa-wrench', 'Fabrication & Metal Works', 'Steel fabrication, welding services, structural metal works, and installation.'],
              ['fa-tasks', 'Project Management', 'Efficient project delivery, on time and within budget with professional oversight.'],
              ['fa-tools', 'Renovation & Maintenance', 'Building rehabilitation, infrastructure upgrades, and maintenance services.'],
              ['fa-chart-line', 'Engineering Consultancy', 'Technical advice, feasibility studies, and engineering solutions.'],
            ].map(([icon, title, copy]) => (
              <div className="service-card" key={title}>
                <div className="service-icon">
                  <i className={`fas ${icon}`} />
                </div>
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
            ))}
          </div>

          <div className="text-center" style={{ marginTop: '50px' }}>
            <Link href="/services" className="btn btn-primary">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item"><div className="stat-number">25+</div><div className="stat-label">Projects Completed</div></div>
            <div className="stat-item"><div className="stat-number">15+</div><div className="stat-label">Skilled Engineers & Technicians</div></div>
            <div className="stat-item"><div className="stat-number">10+</div><div className="stat-label">Years Industry Experience</div></div>
            <div className="stat-item"><div className="stat-number">100%</div><div className="stat-label">Commitment to Quality</div></div>
          </div>
        </div>
      </section>

      {/* 1. Why Choose */}
      <section>
        <div className="container">
          <div className="text-center">
            <h2 className="section-title">Why Choose Divinerock Engineering Services</h2>
            <p className="section-subtitle">
              We deliver excellence through expertise, quality, and commitment to our clients.
            </p>
          </div>

          <div className="features-grid">
            {[
              ['fa-user-tie', 'Professional Expertise', 'Our team consists of experienced engineers and construction specialists with extensive knowledge in civil engineering.'],
              ['fa-medal', 'Quality Workmanship', 'We maintain high standards of quality through careful planning, skilled execution, and strict quality control.'],
              ['fa-clock', 'Reliable Project Delivery', 'We are committed to delivering projects within agreed timelines while maintaining efficiency and professionalism.'],
              ['fa-shield-alt', 'Safety Commitment', 'Safety is a priority in all our operations, ensuring the protection of workers, clients, and communities.'],
              ['fa-tractor', 'Modern Equipment', 'We apply modern construction methods and engineering technologies to achieve durable and efficient outcomes.'],
              ['fa-smile', 'Client Satisfaction', 'Our approach focuses on understanding client needs and delivering solutions that meet their expectations.'],
            ].map(([icon, title, text]) => (
              <div className="feature-item" key={title}>
                <div className="feature-icon">
                  <i className={`fas ${icon}`} />
                </div>
                <div className="feature-content">
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Our Recent Projects */}
      <section className="bg-light">
        <div className="container">
          <div className="text-center">
            <h2 className="section-title">Our Recent Projects</h2>
            <p className="section-subtitle">
              Delivering quality infrastructure and construction solutions across Sierra Leone.
            </p>
          </div>

          <div className="projects-grid">
            {[
              ['/images/bridge.jpg', 'Road Construction Project', 'Community access road development', 'Western Area'],
              ['/images/bridge.jpg', 'Bridge Construction Project', 'Reinforced concrete bridge', 'Sierra Leone'],
              ['https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80', 'Commercial Building Project', 'Modern office facility', 'Freetown'],
              ['https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80', 'Steel Fabrication Project', 'Structural steel for industrial facility', 'Industrial Site'],
            ].map(([img, title, subtitle, location]) => (
              <div className="project-card" key={title}>
                <div className="project-image">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt={title} />
                </div>
                <div className="project-overlay">
                  <h3>{title}</h3>
                  <p>{subtitle}</p>
                  <div className="project-location">
                    <i className="fas fa-map-marker-alt" />
                    <span>{location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center" style={{ marginTop: '50px' }}>
            <Link href="/projects" className="btn btn-primary">
              View All Projects
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Our Team of Experts */}
      <section>
        <div className="container">
          <div className="text-center">
            <h2 className="section-title">Our Team of Experts</h2>
            <p className="section-subtitle">Meet the professionals behind our successful projects.</p>
          </div>

          <div className="team-grid">
            {[
              ['/images/John-kamara2.jpg', 'John Kamara', 'Senior Civil Engineer'],
              ['/images/Fatmata-bangura2.jpg', 'Mariatu Sesay', 'Project Manager'],
              ['/images/Ibrahim-turay2.jpg', 'Ibrahim Turay', 'Site Engineer'],
            ].map(([img, name, role]) => (
              <div className="team-card" key={name}>
                <div className="team-image">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt={name} />
                </div>
                <h3>{name}</h3>
                <p>{role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Have a Project in Mind? */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Have a Project in Mind?</h2>
            <p>
              Divinerock Engineering Services is ready to deliver reliable engineering and construction solutions for
              your next project.
            </p>
            <Link href="/quote" className="btn btn-accent" style={{ fontSize: '1.1rem', padding: '18px 45px' }}>
              Request a Quote
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Get In Touch */}
      <section>
        <div className="container">
          <div className="text-center">
            <h2 className="section-title">Get In Touch</h2>
            <p className="section-subtitle">
              Contact Divinerock Engineering Services to discuss your project requirements.
            </p>
          </div>

          <div className="contact-grid">
            <div className="contact-info">
              <div className="contact-item">
                <div className="contact-icon"><i className="fas fa-map-marker-alt" /></div>
                <div className="contact-text">
                  <h4>Office Address</h4>
                  <p>Sierratel Earth Station, Main Motor Road, Wilberforce, Freetown, Sierra Leone</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon"><i className="fas fa-phone" /></div>
                <div className="contact-text">
                  <h4>Phone Number</h4>
                  <p>+232 00 000 000</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon"><i className="fas fa-envelope" /></div>
                <div className="contact-text">
                  <h4>Email Address</h4>
                  <p>info@divinerock.sl</p>
                </div>
              </div>
            </div>

            <div className="contact-form">
              <form>
                <div className="form-group"><input type="text" className="form-control" placeholder="Your Full Name" required /></div>
                <div className="form-group"><input type="email" className="form-control" placeholder="Email Address" required /></div>
                <div className="form-group"><input type="text" className="form-control" placeholder="Subject" required /></div>
                <div className="form-group"><textarea className="form-control" placeholder="Your Message" required /></div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                  Send Message
                </button>
              </form>
            </div>
          </div>

          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126900.58164911648!2d-13.289974!3d8.465677!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOMKwMjcnNTYuNCJOIDEzwrAxNScwMC4wIlc!5e0!3m2!1sen!2ssl!4v1611111111111!5m2!1sen!2ssl"
              title="Divinerock office map"
              loading="lazy"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </>
  );
}