import React from 'react';

export default function EquipmentPage() {

  return (
    <>
      <style>{`
/* Hide legacy per-page nav/footer; shared layout renders these */
        .header,
        .footer {
            display: none !important;
        }
        
/* Additional styles specific to Equipment page */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Open Sans', sans-serif;
            color: #1e2b37;
            line-height: 1.6;
        }
        
        h1, h2, h3, h4, h5, h6 {
            font-family: 'Montserrat', sans-serif;
            font-weight: 700;
            letter-spacing: -0.02em;
        }
        
        .container {
            max-width: 1280px;
            margin: 0 auto;
            padding: 0 30px;
        }
        
        /* Header Styles */
        .header {
            background-color: #0972C2;
            padding: 15px 0;
            position: sticky;
            top: 0;
            z-index: 1000;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }
        
        .header .container {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .logo h1 {
            color: white;
            font-size: 1.8rem;
            font-weight: 800;
            line-height: 1.2;
        }
        
        .logo span {
            font-size: 0.9rem;
            font-weight: 400;
            opacity: 0.9;
            display: block;
            letter-spacing: 1px;
        }
        
        .nav-menu {
            display: flex;
            gap: 30px;
            align-items: center;
        }
        
        .nav-menu a {
            color: white;
            text-decoration: none;
            font-weight: 600;
            font-size: 1rem;
            transition: all 0.3s ease;
            position: relative;
            padding: 5px 0;
        }
        
        .nav-menu a::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 0;
            height: 2px;
            background-color: #D83936;

            transition: width 0.3s ease;
        }
        
        .nav-menu a:hover::after,
        .nav-menu a.active::after {
            width: 100%;

        }
        
        .quote-btn {
            background-color: #D83936;
            padding: 12px 24px !important;
            border-radius: 4px;
            font-weight: 700;
        }
        
        .quote-btn:hover {
            background-color: #b02e2a;
            transform: translateY(-2px);
        }
        
        .quote-btn::after {
            display: none !important;
        }
        
        /* Page Banner */
        .page-banner {
            background: linear-gradient(rgba(9,114,194,0.9), rgba(9,114,194,0.9)), url('https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=2000&q=80');
            background-size: cover;
            background-position: center;
            padding: 80px 0;
            text-align: center;
            color: white;
        }
        
        .page-banner h1 {
            font-size: 3.5rem;
            margin-bottom: 15px;
            animation: fadeInUp 0.8s ease;
        }
        
        .page-banner p {
            font-size: 1.2rem;
            max-width: 800px;
            margin: 0 auto;
            opacity: 0.95;
            animation: fadeInUp 0.8s ease 0.2s both;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        /* Section Styles */
        section {
            padding: 80px 0;
        }
        
        .section-title {
            font-size: 2.5rem;
            color: #0972C2;
            margin-bottom: 20px;
            position: relative;
            padding-bottom: 15px;
        }
        
        .section-title::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 80px;
            height: 4px;
            background-color: #D83936;
        }
        
        .section-subtitle {
            font-size: 1.2rem;
            color: #4a5a6a;
            margin-bottom: 50px;
            max-width: 800px;
        }
        
        .text-center {
            text-align: center;
        }
        
        .text-center .section-title::after {
            left: 50%;
            transform: translateX(-50%);
        }
        
        .bg-light {
            background-color: #F5F7FA;
        }
        
        /* Equipment Introduction */
        .equipment-intro {
            text-align: center;
            max-width: 900px;
            margin: 0 auto 60px;
        }
        
        .equipment-intro p {
            font-size: 1.2rem;
            color: #4a5a6a;
            line-height: 1.8;
        }
        
        /* Equipment Categories */
        .equipment-category {
            margin-bottom: 60px;
        }
        
        .category-title {
            font-size: 2rem;
            color: #0972C2;
            margin-bottom: 30px;
            padding-bottom: 10px;
            border-bottom: 3px solid #D83936;
            display: inline-block;
        }
        
        /* Equipment Main Grid */
        .equipment-main-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 30px;
            margin-bottom: 40px;
        }
        
        .equipment-item {
            background: white;
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0,0,0,0.05);
            transition: all 0.3s ease;
            border: 1px solid #f0f0f0;
            position: relative;
        }
        
        .equipment-item:hover {
            transform: translateY(-10px);
            box-shadow: 0 25px 50px rgba(9,114,194,0.15);
            border-color: #0972C2;
        }
        
        .equipment-image {
            height: 200px;
            overflow: hidden;
            position: relative;
            background: #0972C2;
        }
        
        .equipment-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.5s ease;
            opacity: 0.9;
        }
        
        .equipment-item:hover .equipment-image img {
            transform: scale(1.1);
        }
        
        .equipment-image::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, rgba(9,114,194,0.3), rgba(216,57,54,0.3));
            z-index: 1;
        }
        
        .equipment-icon {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 4rem;
            color: white;
            z-index: 2;
            text-shadow: 2px 2px 10px rgba(0,0,0,0.3);
        }
        
        .equipment-details {
            padding: 25px;
        }
        
        .equipment-details h3 {
            color: #0972C2;
            margin-bottom: 10px;
            font-size: 1.3rem;
        }
        
        .equipment-details p {
            color: #4a5a6a;
            margin-bottom: 15px;
            line-height: 1.7;
        }
        
        .equipment-specs {
            background: #F5F7FA;
            padding: 15px;
            border-radius: 8px;
            margin-top: 15px;
        }
        
        .equipment-specs h4 {
            color: #0972C2;
            margin-bottom: 10px;
            font-size: 1rem;
        }
        
        .equipment-specs ul {
            list-style: none;
        }
        
        .equipment-specs li {
            margin-bottom: 8px;
            display: flex;
            align-items: center;
            gap: 8px;
            color: #2c3e50;
            font-size: 0.95rem;
        }
        
        .equipment-specs i {
            color: #D83936;
            width: 18px;
        }
        
        .equipment-badge {
            position: absolute;
            top: 15px;
            right: 15px;
            background: #D83936;
            color: white;
            padding: 5px 15px;
            border-radius: 30px;
            font-size: 0.8rem;
            font-weight: 600;
            z-index: 3;
            box-shadow: 0 5px 15px rgba(216,57,54,0.3);
        }
        
        /* Heavy Equipment Grid */
        .heavy-equipment-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 30px;
        }
        
        .heavy-equipment-item {
            background: white;
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0,0,0,0.05);
            transition: all 0.3s ease;
            border: 1px solid #f0f0f0;
        }
        
        .heavy-equipment-item:hover {
            transform: translateY(-10px);
            box-shadow: 0 25px 50px rgba(9,114,194,0.15);
            border-color: #0972C2;
        }
        
        .heavy-equipment-image {
            height: 250px;
            overflow: hidden;
            position: relative;
        }
        
        .heavy-equipment-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.5s ease;
        }
        
        .heavy-equipment-item:hover .heavy-equipment-image img {
            transform: scale(1.1);
        }
        
        .heavy-equipment-content {
            padding: 25px;
        }
        
        .heavy-equipment-content h3 {
            color: #0972C2;
            margin-bottom: 10px;
            font-size: 1.4rem;
        }
        
        .heavy-equipment-content p {
            color: #4a5a6a;
            margin-bottom: 20px;
        }
        
        .equipment-features {
            display: flex;
            flex-wrap: wrap;
            gap: 15px;
            margin-top: 15px;
        }
        
        .equipment-feature {
            display: flex;
            align-items: center;
            gap: 5px;
            background: #F5F7FA;
            padding: 5px 12px;
            border-radius: 30px;
            font-size: 0.9rem;
            color: #2c3e50;
        }
        
        .equipment-feature i {
            color: #D83936;
        }
        
        /* Fabrication Equipment Grid */
        .fabrication-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 25px;
        }
        
        .fabrication-item {
            background: white;
            padding: 30px 20px;
            border-radius: 10px;
            text-align: center;
            box-shadow: 0 5px 20px rgba(0,0,0,0.03);
            transition: all 0.3s ease;
            border: 1px solid #f0f0f0;
        }
        
        .fabrication-item:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 30px rgba(9,114,194,0.1);
            border-color: #0972C2;
        }
        
        .fabrication-icon {
            width: 80px;
            height: 80px;
            background: #0972C2;
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2.5rem;
            margin: 0 auto 20px;
            transition: all 0.3s ease;
        }
        
        .fabrication-item:hover .fabrication-icon {
            background: #D83936;
            transform: rotateY(360deg);
        }
        
        .fabrication-item h4 {
            color: #0972C2;
            margin-bottom: 10px;
        }
        
        .fabrication-item p {
            color: #4a5a6a;
            font-size: 0.95rem;
        }
        
        /* Vehicle Fleet Grid */
        .vehicle-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 25px;
        }
        
        .vehicle-item {
            background: white;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 5px 20px rgba(0,0,0,0.03);
            transition: all 0.3s ease;
            border: 1px solid #f0f0f0;
        }
        
        .vehicle-item:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 30px rgba(9,114,194,0.1);
            border-color: #0972C2;
        }
        
        .vehicle-image {
            height: 150px;
            overflow: hidden;
            background: #0972C2;
        }
        
        .vehicle-image i {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 4rem;
            color: white;
        }
        
        .vehicle-content {
            padding: 20px;
            text-align: center;
        }
        
        .vehicle-content h4 {
            color: #0972C2;
            margin-bottom: 5px;
        }
        
        .vehicle-content p {
            color: #4a5a6a;
            font-size: 0.9rem;
        }
        
        /* Equipment Stats */
        .equipment-stats {
            background: linear-gradient(135deg, #0972C2 0%, #0a5fa0 100%);
            color: white;
            padding: 60px 0;
        }
        
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 30px;
            text-align: center;
        }
        
        .stat-item {
            padding: 30px;
            background: rgba(255,255,255,0.1);
            border-radius: 10px;
            backdrop-filter: blur(5px);
            transition: transform 0.3s ease;
        }
        
        .stat-item:hover {
            transform: translateY(-5px);
            background: rgba(255,255,255,0.15);
        }
        
        .stat-number {
            font-size: 3rem;
            font-weight: 800;
            font-family: 'Montserrat', sans-serif;
            margin-bottom: 10px;
            color: white;
        }
        
        .stat-label {
            font-size: 1.1rem;
            opacity: 0.9;
        }
        
        /* Maintenance Section */
        .maintenance-section {
            background: white;
        }
        
        .maintenance-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 50px;
            align-items: center;
        }
        
        .maintenance-content h3 {
            color: #0972C2;
            margin-bottom: 20px;
            font-size: 1.8rem;
        }
        
        .maintenance-list {
            list-style: none;
            margin-top: 20px;
        }
        
        .maintenance-list li {
            margin-bottom: 15px;
            display: flex;
            align-items: center;
            gap: 15px;
            color: #2c3e50;
        }
        
        .maintenance-list i {
            color: #D83936;
            font-size: 1.2rem;
            width: 25px;
        }
        
        .maintenance-image {
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }
        
        .maintenance-image img {
            width: 100%;
            height: auto;
            display: block;
        }
        
        /* CTA Section */
        .cta-section {
            background: linear-gradient(rgba(9,114,194,0.9), rgba(9,114,194,0.9)), url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=2000&q=80');
            background-size: cover;
            background-position: center;
            color: white;
            text-align: center;
        }
        
        .cta-content {
            max-width: 700px;
            margin: 0 auto;
        }
        
        .cta-content h2 {
            font-size: 2.8rem;
            margin-bottom: 20px;
            color: white;
        }
        
        .cta-content p {
            font-size: 1.2rem;
            margin-bottom: 40px;
            opacity: 0.95;
        }
        
        .btn {
            display: inline-block;
            padding: 15px 35px;
            font-weight: 700;
            text-decoration: none;
            border-radius: 4px;
            transition: all 0.3s ease;
            font-family: 'Montserrat', sans-serif;
            font-size: 1rem;
            border: none;
            cursor: pointer;
        }
        
        .btn-primary {
            background-color: #0972C2;
            color: white;
        }
        
        .btn-primary:hover {
            background-color: #0860a3;
            transform: translateY(-3px);
            box-shadow: 0 10px 20px rgba(0,0,0,0.2);
        }
        
        .btn-accent {
            background-color: #D83936;
            color: white;
        }
        
        .btn-accent:hover {
            background-color: #c4312e;
            transform: translateY(-3px);
            box-shadow: 0 10px 20px rgba(0,0,0,0.2);
        }
        
        /* Footer */
        .footer {
            background-color: #0972C2;
            color: white;
            padding: 80px 0 30px;
        }
        
        .footer-grid {
            display: grid;
            grid-template-columns: 2fr 1fr 1.5fr 1.5fr;
            gap: 50px;
            margin-bottom: 50px;
        }
        
        .footer-col h4 {
            margin-bottom: 25px;
            position: relative;
            padding-bottom: 10px;
            color: white;
        }
        
        .footer-col h4::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 50px;
            height: 3px;
            background-color: #D83936;
        }
        
        .footer-col p, .footer-col a {
            color: rgba(255,255,255,0.8);
            text-decoration: none;
            line-height: 1.9;
            transition: color 0.3s ease;
        }
        
        .footer-col a:hover {
            color: #D83936;
        }
        
        .footer-links {
            list-style: none;
        }
        
        .footer-links li {
            margin-bottom: 10px;
        }
        
        .footer-links a {
            display: inline-block;
            transition: transform 0.3s ease;
        }
        
        .footer-links a:hover {
            transform: translateX(5px);
        }
        
        .footer-bottom {
            text-align: center;
            padding-top: 30px;
            border-top: 1px solid rgba(255,255,255,0.1);
            color: rgba(255,255,255,0.6);
        }
        
        /* Responsive */
        @media (max-width: 1024px) {
            .equipment-main-grid,
            .heavy-equipment-grid,
            .fabrication-grid,
            .vehicle-grid {
                grid-template-columns: repeat(2, 1fr);
            }
            
            .stats-grid {
                grid-template-columns: repeat(2, 1fr);
            }
            
            .footer-grid {
                grid-template-columns: repeat(2, 1fr);
            }
        }
        
        @media (max-width: 768px) {
            .page-banner h1 {
                font-size: 2.5rem;
            }
            
            .equipment-main-grid,
            .heavy-equipment-grid,
            .fabrication-grid,
            .vehicle-grid,
            .stats-grid,
            .maintenance-grid,
            .footer-grid {
                grid-template-columns: 1fr;
            }
            
            .nav-menu {
                display: none;
            }
            
            section {
                padding: 60px 0;
            }
            
            .section-title {
                font-size: 2rem;
            }
            
            .category-title {
                font-size: 1.6rem;
            }
        }
    
      `}</style>
    <header className="header">
      <div className="container">
        <div className="logo">
          <h1>
            DIVINEROCK
          </h1>
          <span>
            Engineering Services
          </span>
        </div>
        <nav className="nav-menu">
          <a href="/">
            Home
          </a>
          <a href="/about">
            About Us
          </a>
          <a href="/services">
            Services
          </a>
          <a href="/projects">
            Projects
          </a>
          <a href="/equipment" className="active">
            Equipment
          </a>
          <a href="/news">
            News
          </a>
          <a href="/contact">
            Contact
          </a>
          <a href="/quote" className="quote-btn">
            Request a Quote
          </a>
        </nav>
      </div>
    </header>
    <section className="page-banner">
      <div className="container">
        <h1>
          Equipment & Machinery
        </h1>
        <p>
          Modern fleet of heavy equipment and machinery enabling efficient project execution across Sierra Leone
        </p>
      </div>
    </section>
    <section>
      <div className="container">
        <div className="equipment-intro">
          <h2 className="section-title">
            Our Operational Capacity
          </h2>
          <p>
            Divinerock Engineering Services utilizes modern construction equipment and skilled personnel to support efficient project delivery. Our operational capacity includes earthmoving machinery, concrete equipment, fabrication tools, and construction support vehicles that enable us to execute projects safely and efficiently.
          </p>
        </div>
      </div>
    </section>
    <section className="bg-light">
      <div className="container">
        <div className="equipment-category">
          <h2 className="category-title">
            Heavy Earthmoving Equipment
          </h2>
          <p className="section-subtitle">
            Powerful machinery for large-scale earthworks and site preparation
          </p>
          <div className="heavy-equipment-grid">
            <div className="heavy-equipment-item">
              <div className="heavy-equipment-image">
                <img src="https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&amp;fit=crop&amp;w=800&amp;q=80" alt="Excavator" />
              </div>
              <div className="heavy-equipment-content">
                <h3>
                  Excavators
                </h3>
                <p>
                  Heavy-duty excavation machines for digging, trenching, and material handling.
                </p>
                <div className="equipment-features">
                  <span className="equipment-feature">
                    <i className="fas fa-weight-hanging"></i>
                    20-30 ton
                  </span>
                  <span className="equipment-feature">
                    <i className="fas fa-ruler"></i>
                    Deep digging
                  </span>
                  <span className="equipment-feature">
                    <i className="fas fa-tools"></i>
                    Multi-purpose
                  </span>
                </div>
                <div className="equipment-specs">
                  <h4>
                    Specifications:
                  </h4>
                  <ul>
                    <li>
                      <i className="fas fa-check"></i>
                      Multiple bucket sizes available
                    </li>
                    <li>
                      <i className="fas fa-check"></i>
                      Long reach capabilities
                    </li>
                    <li>
                      <i className="fas fa-check"></i>
                      GPS guided operation
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="heavy-equipment-item">
              <div className="heavy-equipment-image">
                <img src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&amp;fit=crop&amp;w=800&amp;q=80" alt="Bulldozer" />
              </div>
              <div className="heavy-equipment-content">
                <h3>
                  Bulldozers
                </h3>
                <p>
                  Powerful tracked vehicles for grading, pushing, and site leveling.
                </p>
                <div className="equipment-features">
                  <span className="equipment-feature">
                    <i className="fas fa-weight-hanging"></i>
                    Heavy-duty
                  </span>
                  <span className="equipment-feature">
                    <i className="fas fa-tachometer-alt"></i>
                    High power
                  </span>
                  <span className="equipment-feature">
                    <i className="fas fa-mountain"></i>
                    Rough terrain
                  </span>
                </div>
                <div className="equipment-specs">
                  <h4>
                    Specifications:
                  </h4>
                  <ul>
                    <li>
                      <i className="fas fa-check"></i>
                      Large blade capacity
                    </li>
                    <li>
                      <i className="fas fa-check"></i>
                      Ripper attachment available
                    </li>
                    <li>
                      <i className="fas fa-check"></i>
                      All-terrain capability
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="heavy-equipment-item">
              <div className="heavy-equipment-image">
                <img src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&amp;fit=crop&amp;w=800&amp;q=80" alt="Motor Grader" />
              </div>
              <div className="heavy-equipment-content">
                <h3>
                  Motor Graders
                </h3>
                <p>
                  Precision grading equipment for road construction and leveling.
                </p>
                <div className="equipment-features">
                  <span className="equipment-feature">
                    <i className="fas fa-road"></i>
                    Road finishing
                  </span>
                  <span className="equipment-feature">
                    <i className="fas fa-level-up-alt"></i>
                    Precision
                  </span>
                  <span className="equipment-feature">
                    <i className="fas fa-ruler-combined"></i>
                    Fine grading
                  </span>
                </div>
                <div className="equipment-specs">
                  <h4>
                    Specifications:
                  </h4>
                  <ul>
                    <li>
                      <i className="fas fa-check"></i>
                      14ft moldboard
                    </li>
                    <li>
                      <i className="fas fa-check"></i>
                      Laser grading capable
                    </li>
                    <li>
                      <i className="fas fa-check"></i>
                      All-wheel drive
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div className="container">
        <div className="equipment-category">
          <h2 className="category-title">
            Construction Equipment Fleet
          </h2>
          <p className="section-subtitle">
            Comprehensive range of machinery for all construction needs
          </p>
          <div className="equipment-main-grid">
            <div className="equipment-item">
              <div className="equipment-image">
                <i className="fas fa-tractor equipment-icon"></i>
              </div>
              <div className="equipment-details">
                <h3>
                  Excavators
                </h3>
                <p>
                  Multiple units available for earthworks, trenching, and foundation excavation.
                </p>
                <div className="equipment-specs">
                  <ul>
                    <li>
                      <i className="fas fa-check"></i>
                      5 units available
                    </li>
                    <li>
                      <i className="fas fa-check"></i>
                      20-30 ton capacity
                    </li>
                    <li>
                      <i className="fas fa-check"></i>
                      Various bucket sizes
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="equipment-item">
              <div className="equipment-image">
                <i className="fas fa-tractor equipment-icon"></i>
              </div>
              <div className="equipment-details">
                <h3>
                  Bulldozers
                </h3>
                <p>
                  Heavy-duty tracked dozers for grading, clearing, and pushing operations.
                </p>
                <div className="equipment-specs">
                  <ul>
                    <li>
                      <i className="fas fa-check"></i>
                      3 units available
                    </li>
                    <li>
                      <i className="fas fa-check"></i>
                      D6 & D8 models
                    </li>
                    <li>
                      <i className="fas fa-check"></i>
                      Ripper attachments
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="equipment-item">
              <div className="equipment-image">
                <i className="fas fa-road equipment-icon"></i>
              </div>
              <div className="equipment-details">
                <h3>
                  Motor Graders
                </h3>
                <p>
                  Precision grading equipment for road construction and fine leveling.
                </p>
                <div className="equipment-specs">
                  <ul>
                    <li>
                      <i className="fas fa-check"></i>
                      2 units available
                    </li>
                    <li>
                      <i className="fas fa-check"></i>
                      14ft moldboard
                    </li>
                    <li>
                      <i className="fas fa-check"></i>
                      Laser guided
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="equipment-item">
              <div className="equipment-image">
                <i className="fas fa-compress equipment-icon"></i>
              </div>
              <div className="equipment-details">
                <h3>
                  Compactors
                </h3>
                <p>
                  Soil and asphalt compactors for foundation and pavement construction.
                </p>
                <div className="equipment-specs">
                  <ul>
                    <li>
                      <i className="fas fa-check"></i>
                      4 units available
                    </li>
                    <li>
                      <i className="fas fa-check"></i>
                      Smooth drum & padfoot
                    </li>
                    <li>
                      <i className="fas fa-check"></i>
                      Vibratory models
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="equipment-item">
              <div className="equipment-image">
                <i className="fas fa-truck-mixer equipment-icon"></i>
              </div>
              <div className="equipment-details">
                <h3>
                  Concrete Mixers
                </h3>
                <p>
                  Transit mixers and batch plants for concrete production and placement.
                </p>
                <div className="equipment-specs">
                  <ul>
                    <li>
                      <i className="fas fa-check"></i>
                      6 transit mixers
                    </li>
                    <li>
                      <i className="fas fa-check"></i>
                      1 batch plant
                    </li>
                    <li>
                      <i className="fas fa-check"></i>
                      7-10m³ capacity
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="equipment-item">
              <div className="equipment-image">
                <i className="fas fa-truck-water equipment-icon"></i>
              </div>
              <div className="equipment-details">
                <h3>
                  Water Trucks
                </h3>
                <p>
                  For dust suppression and compaction moisture control.
                </p>
                <div className="equipment-specs">
                  <ul>
                    <li>
                      <i className="fas fa-check"></i>
                      3 units available
                    </li>
                    <li>
                      <i className="fas fa-check"></i>
                      10,000L capacity
                    </li>
                    <li>
                      <i className="fas fa-check"></i>
                      Spray bars included
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="equipment-item">
              <div className="equipment-image">
                <i className="fas fa-truck equipment-icon"></i>
              </div>
              <div className="equipment-details">
                <h3>
                  Dump Trucks
                </h3>
                <p>
                  For material transport and earthmoving operations.
                </p>
                <div className="equipment-specs">
                  <ul>
                    <li>
                      <i className="fas fa-check"></i>
                      8 units available
                    </li>
                    <li>
                      <i className="fas fa-check"></i>
                      15-20 ton capacity
                    </li>
                    <li>
                      <i className="fas fa-check"></i>
                      Articulated & rigid
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="equipment-item">
              <div className="equipment-image">
                <i className="fas fa-truck-pickup equipment-icon"></i>
              </div>
              <div className="equipment-details">
                <h3>
                  Lowbed Trailers
                </h3>
                <p>
                  For transporting heavy equipment between sites.
                </p>
                <div className="equipment-specs">
                  <ul>
                    <li>
                      <i className="fas fa-check"></i>
                      2 units available
                    </li>
                    <li>
                      <i className="fas fa-check"></i>
                      40 ton capacity
                    </li>
                    <li>
                      <i className="fas fa-check"></i>
                      Extendable decks
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="bg-light">
      <div className="container">
        <div className="equipment-category">
          <h2 className="category-title">
            Fabrication & Metal Works Equipment
          </h2>
          <p className="section-subtitle">
            Modern workshop equipment for steel fabrication and welding
          </p>
          <div className="fabrication-grid">
            <div className="fabrication-item">
              <div className="fabrication-icon">
                <i className="fas fa-bolt"></i>
              </div>
              <h4>
                Welding Machines
              </h4>
              <p>
                Multiple arc and MIG welders for steel fabrication
              </p>
            </div>
            <div className="fabrication-item">
              <div className="fabrication-icon">
                <i className="fas fa-cut"></i>
              </div>
              <h4>
                Plasma Cutters
              </h4>
              <p>
                Precision cutting equipment for metal plates
              </p>
            </div>
            <div className="fabrication-item">
              <div className="fabrication-icon">
                <i className="fas fa-tools"></i>
              </div>
              <h4>
                Angle Grinders
              </h4>
              <p>
                Heavy-duty grinding and finishing tools
              </p>
            </div>
            <div className="fabrication-item">
              <div className="fabrication-icon">
                <i className="fas fa-compress"></i>
              </div>
              <h4>
                Hydraulic Press
              </h4>
              <p>
                For metal forming and bending operations
              </p>
            </div>
            <div className="fabrication-item">
              <div className="fabrication-icon">
                <i className="fas fa-drill"></i>
              </div>
              <h4>
                Drilling Machines
              </h4>
              <p>
                Radial and pillar drills for precision holes
              </p>
            </div>
            <div className="fabrication-item">
              <div className="fabrication-icon">
                <i className="fas fa-wind"></i>
              </div>
              <h4>
                Extraction Systems
              </h4>
              <p>
                Fume extraction for safe workshop environment
              </p>
            </div>
            <div className="fabrication-item">
              <div className="fabrication-icon">
                <i className="fas fa-weight-hanging"></i>
              </div>
              <h4>
                Overhead Cranes
              </h4>
              <p>
                5-ton capacity for heavy lifting in workshop
              </p>
            </div>
            <div className="fabrication-item">
              <div className="fabrication-icon">
                <i className="fas fa-ruler-combined"></i>
              </div>
              <h4>
                Measuring Tools
              </h4>
              <p>
                Precision measurement and alignment equipment
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div className="container">
        <div className="equipment-category">
          <h2 className="category-title">
            Support Vehicles & Transport
          </h2>
          <p className="section-subtitle">
            Fleet of vehicles for logistics and site support
          </p>
          <div className="vehicle-grid">
            <div className="vehicle-item">
              <div className="vehicle-image">
                <i className="fas fa-truck"></i>
              </div>
              <div className="vehicle-content">
                <h4>
                  Flatbed Trucks
                </h4>
                <p>
                  Material transport, 4 units
                </p>
              </div>
            </div>
            <div className="vehicle-item">
              <div className="vehicle-image">
                <i className="fas fa-truck-pickup"></i>
              </div>
              <div className="vehicle-content">
                <h4>
                  Pickup Trucks
                </h4>
                <p>
                  Crew transport, 6 units
                </p>
              </div>
            </div>
            <div className="vehicle-item">
              <div className="vehicle-image">
                <i className="fas fa-bus"></i>
              </div>
              <div className="vehicle-content">
                <h4>
                  Crew Buses
                </h4>
                <p>
                  Worker transportation, 2 units
                </p>
              </div>
            </div>
            <div className="vehicle-item">
              <div className="vehicle-image">
                <i className="fas fa-truck-tank"></i>
              </div>
              <div className="vehicle-content">
                <h4>
                  Fuel Trucks
                </h4>
                <p>
                  On-site refueling, 2 units
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="equipment-stats">
      <div className="container">
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-number">
              45+
            </div>
            <div className="stat-label">
              Heavy Equipment Units
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-number">
              15+
            </div>
            <div className="stat-label">
              Support Vehicles
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-number">
              100%
            </div>
            <div className="stat-label">
              Regularly Maintained
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-number">
              24/7
            </div>
            <div className="stat-label">
              Mechanical Support
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="maintenance-section">
      <div className="container">
        <div className="maintenance-grid">
          <div className="maintenance-content">
            <h3>
              Equipment Maintenance Program
            </h3>
            <p>
              Divinerock Engineering Services maintains all equipment through a rigorous preventive maintenance program to ensure reliability, safety, and optimal performance on every project.
            </p>
            <ul className="maintenance-list">
              <li>
                <i className="fas fa-check-circle"></i>
                Regular scheduled servicing by qualified mechanics
              </li>
              <li>
                <i className="fas fa-check-circle"></i>
                Daily pre-operation inspections
              </li>
              <li>
                <i className="fas fa-check-circle"></i>
                Genuine OEM parts for all repairs
              </li>
              <li>
                <i className="fas fa-check-circle"></i>
                Computerized maintenance tracking system
              </li>
              <li>
                <i className="fas fa-check-circle"></i>
                On-site mechanics for rapid response
              </li>
              <li>
                <i className="fas fa-check-circle"></i>
                Comprehensive parts inventory
              </li>
            </ul>
          </div>
          <div className="maintenance-image">
            <img src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&amp;fit=crop&amp;w=800&amp;q=80" alt="Equipment Maintenance" />
          </div>
        </div>
      </div>
    </section>
    <section className="cta-section">
      <div className="container">
        <div className="cta-content">
          <h2>
            Need Equipment for Your Project?
          </h2>
          <p>
            Divinerock Engineering Services has the machinery and expertise to handle projects of any scale. Contact us to discuss your equipment needs.
          </p>
          <a href="/quote" className="btn btn-accent" style={{fontSize: '1.1rem', padding: '18px 45px'}}>
            Request Equipment Quote
          </a>
        </div>
      </div>
    </section>
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <h4>
              About Divinerock
            </h4>
            <p>
              Divinerock Engineering Services is a civil engineering and construction company committed to delivering reliable infrastructure solutions. Specialized in road construction, bridge development, building construction, steel fabrication, and project management services for both public and private sector clients.
            </p>
          </div>
          <div className="footer-col">
            <h4>
              Quick Links
            </h4>
            <ul className="footer-links">
              <li>
                <a href="/">
                  Home
                </a>
              </li>
              <li>
                <a href="/about">
                  About Us
                </a>
              </li>
              <li>
                <a href="/services">
                  Services
                </a>
              </li>
              <li>
                <a href="/projects">
                  Projects
                </a>
              </li>
              <li>
                <a href="/contact">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>
              Our Services
            </h4>
            <ul className="footer-links">
              <li>
                <a href="/services">
                  Construction Services
                </a>
              </li>
              <li>
                <a href="/services">
                  Civil Engineering
                </a>
              </li>
              <li>
                <a href="/services">
                  Fabrication & Metal Works
                </a>
              </li>
              <li>
                <a href="/services">
                  Project Management
                </a>
              </li>
              <li>
                <a href="/services">
                  Renovation & Maintenance
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>
              Contact Information
            </h4>
            <ul className="footer-links">
              <li>
                <i className="fas fa-map-marker-alt" style={{marginRight: '10px'}}></i>
                Sierratel Earth Station, Wilberforce, Freetown
              </li>
              <li>
                <i className="fas fa-phone" style={{marginRight: '10px'}}></i>
                +232 00 000 000
              </li>
              <li>
                <i className="fas fa-envelope" style={{marginRight: '10px'}}></i>
                info@divinerock.sl
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            © 2025 Divinerock Engineering Services. All rights reserved. | Building Strong Foundations for Sustainable Infrastructure
          </p>
        </div>
      </div>
    </footer>
    </>
  );
}
