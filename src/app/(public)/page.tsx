<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Divinerock Engineering Services - Home</title>
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Open+Sans:wght@300;400;600;700&display=swap" rel="stylesheet">
    <!-- Font Awesome for icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <!-- Link to global CSS (will be created next) -->
    <link rel="stylesheet" href="css/style.css">
    <style>
        /* Temporary inline styles for home page - will be moved to global CSS */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Open Sans', sans-serif;
            color: #1e2b37;
            line-height: 1.6;
            overflow-x: hidden;
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
            animation: slideInDown 0.5s ease;
        }
        
        @keyframes slideInDown {
            from {
                transform: translateY(-100%);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
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
        
        .nav-menu a:hover::after {
            width: 100%;
        }
        
        .nav-menu a:hover {
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
        
        /* Hero Section */
        .hero {
            position: relative;
            height: 90vh;
            min-height: 700px;
            background: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('images/hero-bg.jpg');
            background-size: cover;
            align-items: center;
            color: white;
            text-align: center;
        }
        
        .hero-content {
            max-width: 900px;
            margin: 0 auto;
            animation: fadeInUp 1s ease;
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
        
        .hero h1 {
            font-size: 4rem;
            font-weight: 800;
            margin-bottom: 20px;
            line-height: 1.2;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
            animation: fadeInUp 1s ease 0.2s both;
        }
        
        .hero p {
            font-size: 1.3rem;
            margin-bottom: 30px;
            opacity: 0.95;
            max-width: 700px;
            margin-left: auto;
            margin-right: auto;
            animation: fadeInUp 1s ease 0.4s both;
        }
        
        .hero-buttons {
            display: flex;
            gap: 20px;
            justify-content: center;
            animation: fadeInUp 1s ease 0.6s both;
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
        
        /* Section Styles */
        section {
            padding: 100px 0;
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
            max-width: 700px;
        }
        
        .text-center {
            text-align: center;
        }
        
        .text-center .section-title::after {
            left: 50%;
            transform: translateX(-50%);
        }
        
        /* About Section */
        .about-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 60px;
            align-items: center;
        }
        
        .about-image {
            position: relative;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }
        
        .about-image img {
            width: 100%;
            height: auto;
            display: block;
            transition: transform 0.5s ease;
        }
        
        .about-image:hover img {
            transform: scale(1.05);
        }
        
        .about-content p {
            margin-bottom: 30px;
            font-size: 1.1rem;
            color: #2c3e50;
        }
        
        /* Services Section */
        .services-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 30px;
        }
        
        .service-card {
            background: white;
            padding: 40px 30px;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.05);
            transition: all 0.3s ease;
            text-align: center;
            border: 1px solid #eee;
        }
        
        .service-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 20px 40px rgba(9,114,194,0.1);
            border-color: #0972C2;
        }
        
        .service-icon {
            width: 80px;
            height: 80px;
            background: #0972C2;
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 25px;
            font-size: 2rem;
            transition: all 0.3s ease;
        }
        
        .service-card:hover .service-icon {
            background: #D83936;
            transform: rotateY(360deg);
        }
        
        .service-card h3 {
            margin-bottom: 15px;
            color: #0972C2;
        }
        
        .service-card p {
            color: #4a5a6a;
            line-height: 1.8;
        }
        
        /* Stats Section */
        .stats-section {
            background: linear-gradient(135deg, #0972C2 0%, #0a5fa0 100%);
            color: white;
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
            font-size: 3.5rem;
            font-weight: 800;
            font-family: 'Montserrat', sans-serif;
            margin-bottom: 10px;
            color: white;
        }
        
        .stat-label {
            font-size: 1.1rem;
            opacity: 0.9;
            font-weight: 500;
        }
        
        /* Why Choose Us */
        .features-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 30px;
        }
        
        .feature-item {
            display: flex;
            gap: 20px;
            padding: 30px;
            background: white;
            border-radius: 10px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.03);
            transition: all 0.3s ease;
            border: 1px solid #f0f0f0;
        }
        
        .feature-item:hover {
            box-shadow: 0 10px 30px rgba(9,114,194,0.1);
            transform: translateX(5px);
        }
        
        .feature-icon {
            width: 50px;
            height: 50px;
            background: #D83936;
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.3rem;
            flex-shrink: 0;
        }
        
        .feature-content h3 {
            margin-bottom: 10px;
            color: #0972C2;
        }
        
        .feature-content p {
            color: #4a5a6a;
            line-height: 1.7;
        }
        
        /* Projects Section */
        .projects-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 30px;
        }
        
        .project-card {
            position: relative;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }
        
        .project-image {
            position: relative;
            overflow: hidden;
            height: 300px;
        }
        
        .project-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.5s ease;
        }
        
        .project-card:hover .project-image img {
            transform: scale(1.1);
        }
        
        .project-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(to top, rgba(9,114,194,0.9), transparent);
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            padding: 30px;
            color: white;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .project-card:hover .project-overlay {
            opacity: 1;
        }
        
        .project-overlay h3 {
            font-size: 1.5rem;
            margin-bottom: 5px;
            transform: translateY(20px);
            transition: transform 0.3s ease;
        }
        
        .project-card:hover .project-overlay h3 {
            transform: translateY(0);
        }
        
        .project-overlay p {
            margin-bottom: 10px;
            transform: translateY(20px);
            transition: transform 0.3s ease 0.1s;
        }
        
        .project-card:hover .project-overlay p {
            transform: translateY(0);
        }
        
        .project-location {
            display: flex;
            align-items: center;
            gap: 5px;
            font-size: 0.9rem;
            transform: translateY(20px);
            transition: transform 0.3s ease 0.2s;
        }
        
        .project-card:hover .project-location {
            transform: translateY(0);
        }
        
        /* Team Section */
        .team-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 30px;
        }
        
        .team-card {
            text-align: center;
            padding: 30px;
            background: white;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.05);
            transition: all 0.3s ease;
        }
        
        .team-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 20px 40px rgba(9,114,194,0.1);
        }
        
        .team-image {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            overflow: hidden;
            margin: 0 auto 20px;
            border: 5px solid #0972C2;
            transition: all 0.3s ease;
        }
        
        .team-card:hover .team-image {
            border-color: #D83936;
            transform: scale(1.05);
        }
        
        .team-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        
        .team-card h3 {
            color: #0972C2;
            margin-bottom: 5px;
        }
        
        .team-card p {
            color: #4a5a6a;
            font-weight: 500;
        }
        
        /* CTA Section */
        .cta-section {
            background: linear-gradient(rgba(9,114,194,0.9), rgba(9,114,194,0.9)), url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=2000&q=80');
            background-size: cover;
            background-position: center;
            background-attachment: fixed;
            color: white;
            text-align: center;
        }
        
        .cta-content {
            max-width: 700px;
            margin: 0 auto;
        }
        
        .cta-content h2 {
            font-size: 3rem;
            margin-bottom: 20px;
        }
        
        .cta-content p {
            font-size: 1.2rem;
            margin-bottom: 40px;
            opacity: 0.95;
        }
        
        /* Contact Section */
        .contact-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 50px;
        }
        
        .contact-info {
            background: #0972C2;
            color: white;
            padding: 50px;
            border-radius: 10px;
        }
        
        .contact-item {
            display: flex;
            gap: 20px;
            margin-bottom: 30px;
            align-items: flex-start;
        }
        
        .contact-icon {
            width: 50px;
            height: 50px;
            background: rgba(255,255,255,0.1);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.3rem;
        }
        
        .contact-text h4 {
            margin-bottom: 5px;
        }
        
        .contact-form {
            background: white;
            padding: 50px;
            border-radius: 10px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.05);
        }
        
        .form-group {
            margin-bottom: 20px;
        }
        
        .form-control {
            width: 100%;
            padding: 15px;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-family: 'Open Sans', sans-serif;
            transition: all 0.3s ease;
        }
        
        .form-control:focus {
            outline: none;
            border-color: #0972C2;
            box-shadow: 0 0 0 3px rgba(9,114,194,0.1);
        }
        
        textarea.form-control {
            resize: vertical;
            min-height: 120px;
        }
        
        .map-container {
            margin-top: 50px;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(0,0,0,0.05);
        }
        
        .map-container iframe {
            width: 100%;
            height: 400px;
            border: 0;
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
            .services-grid,
            .features-grid,
            .stats-grid,
            .team-grid {
                grid-template-columns: repeat(2, 1fr);
            }
            
            .footer-grid {
                grid-template-columns: repeat(2, 1fr);
            }
        }
        
        @media (max-width: 768px) {
            .hero h1 {
                font-size: 2.5rem;
            }
            
            .hero p {
                font-size: 1.1rem;
            }
            
            .about-grid,
            .projects-grid,
            .contact-grid {
                grid-template-columns: 1fr;
            }
            
            .services-grid,
            .features-grid,
            .stats-grid,
            .team-grid,
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
        }
    </style>
</head>
<body>
    <!-- Header -->
    <header class="header">
        <div class="container">
            <div class="logo">
                <h1>DIVINEROCK</h1>
                <span>Engineering Services</span>
            </div>
            <nav class="nav-menu">
                <a href="index.html" class="active">Home</a>
                <a href="about.html">About Us</a>
                <a href="services.html">Services</a>
                <a href="projects.html">Projects</a>
                <a href="equipment.html">Equipment</a>
                <a href="news.html">News</a>
                <a href="contact.html">Contact</a>
                <a href="quote.html" class="quote-btn">Request a Quote</a>
            </nav>
        </div>
    </header>

    <!-- Hero Section -->
    <section class="hero">
        <div class="container">
            <div class="hero-content">
                <h1>Building Strong Foundations for Sustainable Infrastructure</h1>
                <p>Divinerock Engineering Services delivers reliable civil engineering, construction, and fabrication solutions for infrastructure, commercial, and industrial development.</p>
                <div class="hero-buttons">
                    <a href="services.html" class="btn btn-primary">View Our Services</a>
                    <a href="quote.html" class="btn btn-accent">Request a Quote</a>
                </div>
            </div>
        </div>
    </section>

    <!-- About Section -->
    <section>
        <div class="container">
            <div class="about-grid">
                <div class="about-image">
                    <img src="images/about-construction.JPG" alt="Construction site">
                </div>
                <div class="about-content">
                    <h2 class="section-title">About Divinerock Engineering Services</h2>
                    <p>Divinerock Engineering Services is a dynamic civil engineering and construction company dedicated to providing innovative and reliable infrastructure solutions. The company undertakes a wide range of projects including road construction, bridge development, building construction, structural fabrication, and engineering consultancy services.</p>
                    <p>Our team of experienced engineers, technicians, and construction professionals work together to deliver projects that meet modern engineering standards while addressing the needs of our clients and communities.</p>
                    <a href="about.html" class="btn btn-primary">Learn More About Us</a>
                </div>
            </div>
        </div>
    </section>

    <!-- Services Section -->
    <section class="bg-light">
        <div class="container">
            <div class="text-center">
                <h2 class="section-title">Our Engineering & Construction Services</h2>
                <p class="section-subtitle">Divinerock Engineering Services offers a comprehensive range of engineering and construction services designed to support infrastructure development and structural projects.</p>
            </div>
            
            <div class="services-grid">
                <div class="service-card">
                    <div class="service-icon">
                        <i class="fas fa-building"></i>
                    </div>
                    <h3>Construction Services</h3>
                    <p>Roads, bridges, buildings, drainage systems, and reinforced concrete structures.</p>
                </div>
                
                <div class="service-card">
                    <div class="service-icon">
                        <i class="fas fa-drafting-compass"></i>
                    </div>
                    <h3>Civil Engineering</h3>
                    <p>Structural design, infrastructure development, site preparation, and geotechnical support.</p>
                </div>
                
                <div class="service-card">
                    <div class="service-icon">
                        <i class="fas fa-wrench"></i>
                    </div>
                    <h3>Fabrication & Metal Works</h3>
                    <p>Steel fabrication, welding services, structural metal works, and installation.</p>
                </div>
                
                <div class="service-card">
                    <div class="service-icon">
                        <i class="fas fa-tasks"></i>
                    </div>
                    <h3>Project Management</h3>
                    <p>Efficient project delivery, on time and within budget with professional oversight.</p>
                </div>
                
                <div class="service-card">
                    <div class="service-icon">
                        <i class="fas fa-tools"></i>
                    </div>
                    <h3>Renovation & Maintenance</h3>
                    <p>Building rehabilitation, infrastructure upgrades, and maintenance services.</p>
                </div>
                
                <div class="service-card">
                    <div class="service-icon">
                        <i class="fas fa-chart-line"></i>
                    </div>
                    <h3>Engineering Consultancy</h3>
                    <p>Technical advice, feasibility studies, and engineering solutions.</p>
                </div>
            </div>
            
            <div class="text-center" style="margin-top: 50px;">
                <a href="services.html" class="btn btn-primary">View All Services</a>
            </div>
        </div>
    </section>

    <!-- Stats Section -->
    <section class="stats-section">
        <div class="container">
            <div class="stats-grid">
                <div class="stat-item">
                    <div class="stat-number">25+</div>
                    <div class="stat-label">Projects Completed</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">15+</div>
                    <div class="stat-label">Skilled Engineers & Technicians</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">10+</div>
                    <div class="stat-label">Years Industry Experience</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">100%</div>
                    <div class="stat-label">Commitment to Quality</div>
                </div>
            </div>
        </div>
    </section>

    <!-- Why Choose Us -->
    <section>
        <div class="container">
            <div class="text-center">
                <h2 class="section-title">Why Choose Divinerock Engineering Services</h2>
                <p class="section-subtitle">We deliver excellence through expertise, quality, and commitment to our clients.</p>
            </div>
            
            <div class="features-grid">
                <div class="feature-item">
                    <div class="feature-icon">
                        <i class="fas fa-user-tie"></i>
                    </div>
                    <div class="feature-content">
                        <h3>Professional Expertise</h3>
                        <p>Our team consists of experienced engineers and construction specialists with extensive knowledge in civil engineering.</p>
                    </div>
                </div>
                
                <div class="feature-item">
                    <div class="feature-icon">
                        <i class="fas fa-medal"></i>
                    </div>
                    <div class="feature-content">
                        <h3>Quality Workmanship</h3>
                        <p>We maintain high standards of quality through careful planning, skilled execution, and strict quality control.</p>
                    </div>
                </div>
                
                <div class="feature-item">
                    <div class="feature-icon">
                        <i class="fas fa-clock"></i>
                    </div>
                    <div class="feature-content">
                        <h3>Reliable Project Delivery</h3>
                        <p>We are committed to delivering projects within agreed timelines while maintaining efficiency and professionalism.</p>
                    </div>
                </div>
                
                <div class="feature-item">
                    <div class="feature-icon">
                        <i class="fas fa-shield-alt"></i>
                    </div>
                    <div class="feature-content">
                        <h3>Safety Commitment</h3>
                        <p>Safety is a priority in all our operations, ensuring the protection of workers, clients, and communities.</p>
                    </div>
                </div>
                
                <div class="feature-item">
                    <div class="feature-icon">
                        <i class="fas fa-tractor"></i>
                    </div>
                    <div class="feature-content">
                        <h3>Modern Equipment</h3>
                        <p>We apply modern construction methods and engineering technologies to achieve durable and efficient outcomes.</p>
                    </div>
                </div>
                
                <div class="feature-item">
                    <div class="feature-icon">
                        <i class="fas fa-smile"></i>
                    </div>
                    <div class="feature-content">
                        <h3>Client Satisfaction</h3>
                        <p>Our approach focuses on understanding client needs and delivering solutions that meet their expectations.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Projects Section -->
    <section class="bg-light">
        <div class="container">
            <div class="text-center">
                <h2 class="section-title">Our Recent Projects</h2>
                <p class="section-subtitle">Delivering quality infrastructure and construction solutions across Sierra Leone.</p>
            </div>
            
            <div class="projects-grid">
                <div class="project-card">
                    <div class="project-image">
                        <img src="images/bridge.jpg" alt="Road Construction">
                    </div>
                    <div class="project-overlay">
                        <h3>Road Construction Project</h3>
                        <p>Community access road development</p>
                        <div class="project-location">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>Western Area</span>
                        </div>
                    </div>
                </div>
                
                <div class="project-card">
                    <div class="project-image">
                        <img src="images/bridge.jpg" alt="Bridge Construction">
                    </div>
                    <div class="project-overlay">
                        <h3>Bridge Construction Project</h3>
                        <p>Reinforced concrete bridge</p>
                        <div class="project-location">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>Sierra Leone</span>
                        </div>
                    </div>
                </div>
                
                <div class="project-card">
                    <div class="project-image">
                        <img src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80" alt="Building Construction">
                    </div>
                    <div class="project-overlay">
                        <h3>Commercial Building Project</h3>
                        <p>Modern office facility</p>
                        <div class="project-location">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>Freetown</span>
                        </div>
                    </div>
                </div>
                
                <div class="project-card">
                    <div class="project-image">
                        <img src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80" alt="Steel Fabrication">
                    </div>
                    <div class="project-overlay">
                        <h3>Steel Fabrication Project</h3>
                        <p>Structural steel for industrial facility</p>
                        <div class="project-location">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>Industrial Site</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="text-center" style="margin-top: 50px;">
                <a href="projects.html" class="btn btn-primary">View All Projects</a>
            </div>
        </div>
    </section>

    <!-- Team Section -->
    <section>
        <div class="container">
            <div class="text-center">
                <h2 class="section-title">Our Team of Experts</h2>
                <p class="section-subtitle">Meet the professionals behind our successful projects.</p>
            </div>
            
            <div class="team-grid">
                <div class="team-card">
                    <div class="team-image">
                        <img src="images/John-kamara2.jpg" alt="Civil Engineer">
                    </div>
                    <h3>John Kamara</h3>
                    <p>Senior Civil Engineer</p>
                </div>
                
                <div class="team-card">
                    <div class="team-image">
                        <img src="images/Fatmata-bangura2.jpg" alt="Project Manager">
                    </div>
                    <h3>Mariatu Sesay</h3>
                    <p>Project Manager</p>
                </div>
                
                <div class="team-card">
                    <div class="team-image">
                        <img src="images/Ibrahim-turay2.jpg" alt="Site Engineer">
                    </div>
                    <h3>Ibrahim Turay</h3>
                    <p>Site Engineer</p>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
        <div class="container">
            <div class="cta-content">
                <h2>Have a Project in Mind?</h2>
                <p>Divinerock Engineering Services is ready to deliver reliable engineering and construction solutions for your next project.</p>
                <a href="quote.html" class="btn btn-accent" style="font-size: 1.1rem; padding: 18px 45px;">Request a Quote</a>
            </div>
        </div>
    </section>

    <!-- Contact Section -->
    <section>
        <div class="container">
            <div class="text-center">
                <h2 class="section-title">Get In Touch</h2>
                <p class="section-subtitle">Contact Divinerock Engineering Services to discuss your project requirements.</p>
            </div>
            
            <div class="contact-grid">
                <div class="contact-info">
                    <div class="contact-item">
                        <div class="contact-icon">
                            <i class="fas fa-map-marker-alt"></i>
                        </div>
                        <div class="contact-text">
                            <h4>Office Address</h4>
                            <p>Sierratel Earth Station, Main Motor Road, Wilberforce, Freetown, Sierra Leone</p>
                        </div>
                    </div>
                    
                    <div class="contact-item">
                        <div class="contact-icon">
                            <i class="fas fa-phone"></i>
                        </div>
                        <div class="contact-text">
                            <h4>Phone Number</h4>
                            <p>+232 00 000 000</p>
                        </div>
                    </div>
                    
                    <div class="contact-item">
                        <div class="contact-icon">
                            <i class="fas fa-envelope"></i>
                        </div>
                        <div class="contact-text">
                            <h4>Email Address</h4>
                            <p>info@divinerock.sl</p>
                        </div>
                    </div>
                </div>
                
                <div class="contact-form">
                    <form>
                        <div class="form-group">
                            <input type="text" class="form-control" placeholder="Your Full Name" required>
                        </div>
                        <div class="form-group">
                            <input type="email" class="form-control" placeholder="Email Address" required>
                        </div>
                        <div class="form-group">
                            <input type="text" class="form-control" placeholder="Subject" required>
                        </div>
                        <div class="form-group">
                            <textarea class="form-control" placeholder="Your Message" required></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary" style="width: 100%;">Send Message</button>
                    </form>
                </div>
            </div>
            
            <div class="map-container">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126900.58164911648!2d-13.289974!3d8.465677!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOMKwMjcnNTYuNCJOIDEzwrAxNScwMC4wIlc!5e0!3m2!1sen!2ssl!4v1611111111111!5m2!1sen!2ssl" allowfullscreen="" loading="lazy"></iframe>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <div class="footer-grid">
                <div class="footer-col">
                    <h4>About Divinerock</h4>
                    <p>Divinerock Engineering Services is a civil engineering and construction company committed to delivering reliable infrastructure solutions. Specialized in road construction, bridge development, building construction, steel fabrication, and project management services for both public and private sector clients.</p>
                </div>
                
                <div class="footer-col">
                    <h4>Quick Links</h4>
                    <ul class="footer-links">
                        <li><a href="index.html">Home</a></li>
                        <li><a href="about.html">About Us</a></li>
                        <li><a href="services.html">Services</a></li>
                        <li><a href="projects.html">Projects</a></li>
                        <li><a href="contact.html">Contact Us</a></li>
                    </ul>
                </div>
                
                <div class="footer-col">
                    <h4>Our Services</h4>
                    <ul class="footer-links">
                        <li><a href="services.html">Construction Services</a></li>
                        <li><a href="services.html">Civil Engineering</a></li>
                        <li><a href="services.html">Fabrication & Metal Works</a></li>
                        <li><a href="services.html">Project Management</a></li>
                        <li><a href="services.html">Renovation & Maintenance</a></li>
                    </ul>
                </div>
                
                <div class="footer-col">
                    <h4>Contact Information</h4>
                    <ul class="footer-links">
                        <li><i class="fas fa-map-marker-alt" style="margin-right: 10px;"></i> Sierratel Earth Station, Wilberforce</li>
                        <li><i class="fas fa-phone" style="margin-right: 10px;"></i> +232 00 000 000</li>
                        <li><i class="fas fa-envelope" style="margin-right: 10px;"></i> info@divinerock.sl</li>
                    </ul>
                </div>
            </div>
            
            <div class="footer-bottom">
                <p>&copy; 2025 Divinerock Engineering Services. All rights reserved. | Website by Divinerock</p>
            </div>
        </div>
    </footer>

    <!-- Smooth scroll animation -->
    <script>
        // Add smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
        
        // Header scroll effect
        window.addEventListener('scroll', function() {
            const header = document.querySelector('.header');
            if (window.scrollY > 100) {
                header.style.background = '#0860a3';
                header.style.padding = '10px 0';
            } else {
                header.style.background = '#0972C2';
                header.style.padding = '15px 0';
            }
        });
    </script>
</body>
</html>            background-position: center;
            

