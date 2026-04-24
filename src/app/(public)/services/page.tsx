<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Our Services - Divinerock Engineering Services</title>
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Open+Sans:wght@300;400;600;700&display=swap" rel="stylesheet">
    <!-- Font Awesome for icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <!-- Link to global CSS -->
    <link rel="stylesheet" href="css/style.css">
    <style>
        /* Additional styles specific to Services page */
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
            background: linear-gradient(rgba(9,114,194,0.9), rgba(9,114,194,0.9)), url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=2000&q=80');
            background-size: cover;
            background-position: center;
            padding: 80px 0;
            text-align: center;
            color: white;
        }
        
        .page-banner h1 {
            font-size: 3.5rem;
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
        
        /* Services Introduction */
        .services-intro {
            text-align: center;
            max-width: 900px;
            margin: 0 auto 60px;
        }
        
        .services-intro p {
            font-size: 1.2rem;
            color: #4a5a6a;
            line-height: 1.8;
        }
        
        /* Service Categories - Main Grid - Now 9 services (3x3 grid) */
        .services-main-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 40px;
            margin-top: 50px;
        }
        
        .service-category {
            background: white;
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 15px 40px rgba(0,0,0,0.05);
            transition: all 0.3s ease;
            border: 1px solid #f0f0f0;
        }
        
        .service-category:hover {
            transform: translateY(-10px);
            box-shadow: 0 25px 50px rgba(9,114,194,0.15);
            border-color: #0972C2;
        }
        
        .service-header {
            background: #0972C2;
            color: white;
            padding: 30px;
            position: relative;
            overflow: hidden;
        }
        
        .service-header::after {
            content: '';
            position: absolute;
            top: -50%;
            right: -50%;
            width: 200%;
            height: 200%;
            background: rgba(255,255,255,0.1);
            transform: rotate(45deg);
            transition: all 0.5s ease;
        }
        
        .service-category:hover .service-header::after {
            transform: rotate(45deg) translate(10%, 10%);
        }
        
        .service-header i {
            font-size: 3.5rem;
            margin-bottom: 15px;
            position: relative;
            z-index: 1;
        }
        
        .service-header h3 {
            font-size: 1.8rem;
            color: white;
            margin-bottom: 10px;
            position: relative;
            z-index: 1;
        }
        
        .service-content {
            padding: 30px;
        }
        
        .service-content p {
            color: #4a5a6a;
            margin-bottom: 25px;
            font-size: 1.05rem;
            line-height: 1.8;
        }
        
        .service-features {
            list-style: none;
        }
        
        .service-features li {
            margin-bottom: 15px;
            display: flex;
            align-items: center;
            gap: 10px;
            color: #2c3e50;
        }
        
        .service-features i {
            color: #D83936;
            font-size: 1.1rem;
            width: 25px;
        }
        
        /* Construction Services Sub-section */
        .construction-subsection {
            margin-top: 30px;
        }
        
        .construction-subsection h4 {
            color: #0972C2;
            margin-bottom: 15px;
            font-size: 1.3rem;
        }
        
        .construction-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
            margin-top: 20px;
        }
        
        .construction-item {
            background: #F5F7FA;
            padding: 15px;
            border-radius: 8px;
            transition: all 0.3s ease;
        }
        
        .construction-item:hover {
            background: #0972C2;
            color: white;
            transform: translateY(-3px);
        }
        
        .construction-item:hover h5,
        .construction-item:hover p {
            color: white;
        }
        
        .construction-item h5 {
            color: #0972C2;
            margin-bottom: 5px;
            font-size: 1.1rem;
            transition: color 0.3s ease;
        }
        
        .construction-item p {
            color: #4a5a6a;
            font-size: 0.95rem;
            transition: color 0.3s ease;
        }
        
        /* Equipment & Operational Capacity */
        .equipment-section {
            background: linear-gradient(135deg, #0972C2 0%, #0a5fa0 100%);
            color: white;
        }
        
        .equipment-content {
            max-width: 1000px;
            margin: 0 auto;
        }
        
        .equipment-content h2 {
            color: white;
            margin-bottom: 30px;
        }
        
        .equipment-content h2::after {
            background-color: #D83936;
        }
        
        .equipment-content p {
            font-size: 1.2rem;
            margin-bottom: 40px;
            opacity: 0.95;
            text-align: center;
        }
        
        .equipment-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 25px;
        }
        
        .equipment-item {
            background: rgba(255,255,255,0.1);
            padding: 25px;
            border-radius: 10px;
            text-align: center;
            backdrop-filter: blur(5px);
            transition: all 0.3s ease;
        }
        
        .equipment-item:hover {
            background: rgba(255,255,255,0.2);
            transform: translateY(-5px);
        }
        
        .equipment-item i {
            font-size: 2.5rem;
            margin-bottom: 15px;
            color: #D83936;
        }
        
        .equipment-item h4 {
            color: white;
            margin-bottom: 10px;
        }
        
        .equipment-item p {
            font-size: 0.95rem;
            margin-bottom: 0;
            opacity: 0.9;
        }
        
        /* Industries Served */
        .industries-grid {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 25px;
            margin-top: 40px;
        }
        
        .industry-card {
            background: white;
            padding: 30px 20px;
            border-radius: 10px;
            text-align: center;
            box-shadow: 0 5px 20px rgba(0,0,0,0.03);
            transition: all 0.3s ease;
            border: 1px solid #f0f0f0;
        }
        
        .industry-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 30px rgba(9,114,194,0.1);
            border-color: #0972C2;
        }
        
        .industry-icon {
            width: 70px;
            height: 70px;
            background: #0972C2;
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2rem;
            margin: 0 auto 20px;
            transition: all 0.3s ease;
        }
        
        .industry-card:hover .industry-icon {
            background: #D83936;
            transform: rotateY(360deg);
        }
        
        .industry-card h4 {
            color: #0972C2;
            margin-bottom: 10px;
        }
        
        .industry-card p {
            color: #4a5a6a;
            font-size: 0.95rem;
        }
        
        /* Process Section */
        .process-grid {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 20px;
            margin-top: 50px;
        }
        
        .process-step {
            text-align: center;
            position: relative;
        }
        
        .process-step:not(:last-child)::after {
            content: '→';
            position: absolute;
            top: 40px;
            right: -15px;
            font-size: 2rem;
            color: #D83936;
            font-weight: 700;
        }
        
        .step-number {
            width: 60px;
            height: 60px;
            background: #0972C2;
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.8rem;
            font-weight: 700;
            margin: 0 auto 20px;
            transition: all 0.3s ease;
        }
        
        .process-step:hover .step-number {
            background: #D83936;
            transform: scale(1.1);
        }
        
        .process-step h4 {
            color: #0972C2;
            margin-bottom: 10px;
        }
        
        .process-step p {
            color: #4a5a6a;
            font-size: 0.95rem;
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
            .services-main-grid {
                grid-template-columns: repeat(2, 1fr);
            }
            
            .equipment-grid,
            .industries-grid,
            .process-grid {
                grid-template-columns: repeat(2, 1fr);
            }
            
            .process-step:not(:last-child)::after {
                display: none;
            }
            
            .footer-grid {
                grid-template-columns: repeat(2, 1fr);
            }
        }
        
        @media (max-width: 768px) {
            .page-banner h1 {
                font-size: 2.5rem;
            }
            
            .services-main-grid {
                grid-template-columns: 1fr;
            }
            
            .construction-grid,
            .equipment-grid,
            .industries-grid,
            .process-grid,
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
                <a href="index.html">Home</a>
                <a href="about.html">About Us</a>
                <a href="services.html" class="active">Services</a>
                <a href="projects.html">Projects</a>
                <a href="equipment.html">Equipment</a>
                <a href="news.html">News</a>
                <a href="contact.html">Contact</a>
                <a href="quote.html" class="quote-btn">Request a Quote</a>
            </nav>
        </div>
    </header>

    <!-- Page Banner -->
    <section class="page-banner">
        <div class="container">
            <h1>Our Engineering & Construction Services</h1>
            <p>Divinerock Engineering Services provides comprehensive civil engineering, construction, and specialized solutions for infrastructure and industrial development.</p>
        </div>
    </section>

    <!-- Services Introduction -->
    <section>
        <div class="container">
            <div class="services-intro">
                <h2 class="section-title">Engineering Solutions You Can Trust</h2>
                <p>Divinerock Engineering Services delivers reliable engineering and construction services designed to support infrastructure development, commercial construction, industrial projects, and specialized services. Our experienced team combines technical expertise with modern techniques to ensure every project meets the highest standards of quality, safety, and durability.</p>
            </div>
        </div>
    </section>

    <!-- Core Services Grid - 9 Services Total -->
    <section class="bg-light">
        <div class="container">
            <div class="text-center">
                <h2 class="section-title">Our Core Services</h2>
                <p class="section-subtitle">Comprehensive engineering and construction solutions tailored to your needs</p>
            </div>
            
            <div class="services-main-grid">
                <!-- 1. Construction Services -->
                <div class="service-category">
                    <div class="service-header">
                        <i class="fas fa-building"></i>
                        <h3>Construction Services</h3>
                    </div>
                    <div class="service-content">
                        <p>Divinerock Engineering Services undertakes construction projects including roads, bridges, buildings, drainage systems, and reinforced concrete structures designed to meet modern infrastructure demands.</p>
                        
                        <div class="construction-subsection">
                            <h4>Includes:</h4>
                            <ul class="service-features">
                                <li><i class="fas fa-check-circle"></i> Road construction and rehabilitation</li>
                                <li><i class="fas fa-check-circle"></i> Bridge construction</li>
                                <li><i class="fas fa-check-circle"></i> Building construction</li>
                                <li><i class="fas fa-check-circle"></i> Drainage and culvert systems</li>
                                <li><i class="fas fa-check-circle"></i> Reinforced concrete works</li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                <!-- 2. Civil Engineering & Infrastructure -->
                <div class="service-category">
                    <div class="service-header">
                        <i class="fas fa-drafting-compass"></i>
                        <h3>Civil Engineering & Infrastructure</h3>
                    </div>
                    <div class="service-content">
                        <p>Our civil engineering services support infrastructure planning, design, and construction. We ensure projects are technically sound, durable, and compliant with engineering standards.</p>
                        
                        <div class="construction-subsection">
                            <h4>Includes:</h4>
                            <ul class="service-features">
                                <li><i class="fas fa-check-circle"></i> Infrastructure development</li>
                                <li><i class="fas fa-check-circle"></i> Structural engineering</li>
                                <li><i class="fas fa-check-circle"></i> Site preparation and earthworks</li>
                                <li><i class="fas fa-check-circle"></i> Geotechnical investigations</li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                <!-- 3. Fabrication & Metal Works -->
                <div class="service-category">
                    <div class="service-header">
                        <i class="fas fa-wrench"></i>
                        <h3>Fabrication & Metal Works</h3>
                    </div>
                    <div class="service-content">
                        <p>The company provides professional steel fabrication and metal works for construction and industrial projects. Our fabrication capabilities ensure durable steel structures and metal components.</p>
                        
                        <div class="construction-subsection">
                            <h4>Includes:</h4>
                            <ul class="service-features">
                                <li><i class="fas fa-check-circle"></i> Structural steel fabrication</li>
                                <li><i class="fas fa-check-circle"></i> Metal fabrication and welding</li>
                                <li><i class="fas fa-check-circle"></i> Industrial steel structures</li>
                                <li><i class="fas fa-check-circle"></i> Steel installation and assembly</li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                <!-- 4. Project Management & Consultancy -->
                <div class="service-category">
                    <div class="service-header">
                        <i class="fas fa-tasks"></i>
                        <h3>Project Management & Consultancy</h3>
                    </div>
                    <div class="service-content">
                        <p>Divinerock Engineering Services provides professional project management and technical consultancy to ensure efficient project delivery, on time and within budget.</p>
                        
                        <div class="construction-subsection">
                            <h4>Includes:</h4>
                            <ul class="service-features">
                                <li><i class="fas fa-check-circle"></i> Construction project management</li>
                                <li><i class="fas fa-check-circle"></i> Engineering consultancy</li>
                                <li><i class="fas fa-check-circle"></i> Construction supervision</li>
                                <li><i class="fas fa-check-circle"></i> Project planning and coordination</li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                <!-- 5. Renovation & Infrastructure Maintenance -->
                <div class="service-category">
                    <div class="service-header">
                        <i class="fas fa-tools"></i>
                        <h3>Renovation & Maintenance</h3>
                    </div>
                    <div class="service-content">
                        <p>We provide renovation and maintenance services that extend the lifespan of existing buildings and infrastructure, ensuring continued functionality and safety.</p>
                        
                        <div class="construction-subsection">
                            <h4>Includes:</h4>
                            <ul class="service-features">
                                <li><i class="fas fa-check-circle"></i> Building renovation</li>
                                <li><i class="fas fa-check-circle"></i> Structural rehabilitation</li>
                                <li><i class="fas fa-check-circle"></i> Road maintenance</li>
                                <li><i class="fas fa-check-circle"></i> Infrastructure upgrades</li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                <!-- 6. Engineering Consultancy -->
                <div class="service-category">
                    <div class="service-header">
                        <i class="fas fa-chart-line"></i>
                        <h3>Engineering Consultancy</h3>
                    </div>
                    <div class="service-content">
                        <p>Our consultancy services provide expert technical advice and engineering solutions to help clients make informed decisions throughout the project lifecycle.</p>
                        
                        <div class="construction-subsection">
                            <h4>Includes:</h4>
                            <ul class="service-features">
                                <li><i class="fas fa-check-circle"></i> Technical feasibility studies</li>
                                <li><i class="fas fa-check-circle"></i> Engineering design reviews</li>
                                <li><i class="fas fa-check-circle"></i> Value engineering</li>
                                <li><i class="fas fa-check-circle"></i> Risk assessments</li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                <!-- 7. Mechanical & Maintenance Engineering Services (NEW) -->
                <div class="service-category">
                    <div class="service-header">
                        <i class="fas fa-cogs"></i>
                        <h3>Mechanical & Maintenance Engineering</h3>
                    </div>
                    <div class="service-content">
                        <p>Divinerock Engineering Services offers comprehensive mechanical engineering and maintenance solutions for industrial and commercial facilities. Our team ensures optimal equipment performance and operational efficiency.</p>
                        
                        <div class="construction-subsection">
                            <h4>Includes:</h4>
                            <ul class="service-features">
                                <li><i class="fas fa-check-circle"></i> Industrial machinery installation and maintenance</li>
                                <li><i class="fas fa-check-circle"></i> HVAC system design and servicing</li>
                                <li><i class="fas fa-check-circle"></i> Plumbing and piping systems</li>
                                <li><i class="fas fa-check-circle"></i> Preventive and predictive maintenance programs</li>
                                <li><i class="fas fa-check-circle"></i> Pump, compressor, and generator servicing</li>
                                <li><i class="fas fa-check-circle"></i> Mechanical system audits and optimization</li>
                            </ul>
                        </div>
                        
                        <div class="construction-grid">
                            <div class="construction-item">
                                <h5>Industrial Maintenance</h5>
                                <p>Machinery servicing and repairs</p>
                            </div>
                            <div class="construction-item">
                                <h5>HVAC Systems</h5>
                                <p>Installation and maintenance</p>
                            </div>
                            <div class="construction-item">
                                <h5>Plumbing Systems</h5>
                                <p>Design, installation, repair</p>
                            </div>
                            <div class="construction-item">
                                <h5>Generator Services</h5>
                                <p>Installation and maintenance</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- 8. Electrical & Solar Installation Services (NEW) -->
                <div class="service-category">
                    <div class="service-header">
                        <i class="fas fa-solar-panel"></i>
                        <h3>Electrical & Solar Installation</h3>
                    </div>
                    <div class="service-content">
                        <p>Divinerock Engineering Services provides professional electrical and solar energy solutions for residential, commercial, and industrial applications. We deliver reliable power solutions that reduce energy costs and promote sustainability.</p>
                        
                        <div class="construction-subsection">
                            <h4>Includes:</h4>
                            <ul class="service-features">
                                <li><i class="fas fa-check-circle"></i> Solar panel installation and maintenance</li>
                                <li><i class="fas fa-check-circle"></i> Solar water pumping systems</li>
                                <li><i class="fas fa-check-circle"></i> Electrical wiring and installations</li>
                                <li><i class="fas fa-check-circle"></i> Backup power systems and inverters</li>
                                <li><i class="fas fa-check-circle"></i> Energy efficiency audits and solutions</li>
                                <li><i class="fas fa-check-circle"></i> Street lighting and security lighting</li>
                            </ul>
                        </div>
                        
                        <div class="construction-grid">
                            <div class="construction-item">
                                <h5>Solar Installation</h5>
                                <p>Panels, inverters, batteries</p>
                            </div>
                            <div class="construction-item">
                                <h5>Electrical Wiring</h5>
                                <p>Residential and commercial</p>
                            </div>
                            <div class="construction-item">
                                <h5>Backup Power</h5>
                                <p>Inverter and generator systems</p>
                            </div>
                            <div class="construction-item">
                                <h5>Solar Pumping</h5>
                                <p>Water supply solutions</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- 9. Landscaping, Pest Control & Fogging Projects (NEW) -->
                <div class="service-category">
                    <div class="service-header">
                        <i class="fas fa-leaf"></i>
                        <h3>Landscaping, Pest Control & Fogging</h3>
                    </div>
                    <div class="service-content">
                        <p>Divinerock Engineering Services offers professional landscaping, pest control, and fogging services to enhance property aesthetics and maintain healthy environments. Our integrated approach ensures beautiful outdoor spaces free from pests and disease vectors.</p>
                        
                        <div class="construction-subsection">
                            <h4>Includes:</h4>
                            <ul class="service-features">
                                <li><i class="fas fa-check-circle"></i> Landscape design and installation</li>
                                <li><i class="fas fa-check-circle"></i> Lawn and garden maintenance</li>
                                <li><i class="fas fa-check-circle"></i> Pest control and fumigation services</li>
                                <li><i class="fas fa-check-circle"></i> Mosquito fogging and vector control</li>
                                <li><i class="fas fa-check-circle"></i> Tree planting and pruning</li>
                                <li><i class="fas fa-check-circle"></i> Erosion control and drainage solutions</li>
                            </ul>
                        </div>
                        
                        <div class="construction-grid">
                            <div class="construction-item">
                                <h5>Landscaping</h5>
                                <p>Design, planting, maintenance</p>
                            </div>
                            <div class="construction-item">
                                <h5>Pest Control</h5>
                                <p>Residential and commercial</p>
                            </div>
                            <div class="construction-item">
                                <h5>Fogging Services</h5>
                                <p>Mosquito and vector control</p>
                            </div>
                            <div class="construction-item">
                                <h5>Erosion Control</h5>
                                <p>Slope stabilization</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Equipment & Operational Capacity Section -->
    <section class="equipment-section">
        <div class="container">
            <div class="equipment-content">
                <h2 class="section-title">Equipment & Operational Capacity</h2>
                <p>Divinerock Engineering Services utilizes modern construction equipment and skilled personnel to support efficient project delivery. Our operational capacity includes earthmoving machinery, concrete equipment, fabrication tools, construction support vehicles, and specialized equipment for electrical, mechanical, and landscaping services.</p>
                
                <div class="equipment-grid">
                    <div class="equipment-item">
                        <i class="fas fa-tractor"></i>
                        <h4>Excavators</h4>
                        <p>Heavy earthmoving and excavation</p>
                    </div>
                    
                    <div class="equipment-item">
                        <i class="fas fa-truck"></i>
                        <h4>Dump Trucks</h4>
                        <p>Material transport and hauling</p>
                    </div>
                    
                    <div class="equipment-item">
                        <i class="fas fa-road"></i>
                        <h4>Graders</h4>
                        <p>Road grading and leveling</p>
                    </div>
                    
                    <div class="equipment-item">
                        <i class="fas fa-industry"></i>
                        <h4>Concrete Mixers</h4>
                        <p>Concrete production and placement</p>
                    </div>
                    
                    <div class="equipment-item">
                        <i class="fas fa-bolt"></i>
                        <h4>Solar Equipment</h4>
                        <p>Panels, inverters, batteries</p>
                    </div>
                    
                    <div class="equipment-item">
                        <i class="fas fa-spray-can"></i>
                        <h4>Fogging Machines</h4>
                        <p>Pest control and disinfection</p>
                    </div>
                    
                    <div class="equipment-item">
                        <i class="fas fa-leaf"></i>
                        <h4>Landscaping Tools</h4>
                        <p>Mowers, trimmers, blowers</p>
                    </div>
                    
                    <div class="equipment-item">
                        <i class="fas fa-tools"></i>
                        <h4>Mechanical Tools</h4>
                        <p>Maintenance and repair equipment</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Industries We Serve -->
    <section>
        <div class="container">
            <div class="text-center">
                <h2 class="section-title">Industries We Serve</h2>
                <p class="section-subtitle">Divinerock Engineering Services supports projects across multiple sectors</p>
            </div>
            
            <div class="industries-grid">
                <div class="industry-card">
                    <div class="industry-icon">
                        <i class="fas fa-road"></i>
                    </div>
                    <h4>Infrastructure</h4>
                    <p>Roads, bridges, drainage</p>
                </div>
                
                <div class="industry-card">
                    <div class="industry-icon">
                        <i class="fas fa-building"></i>
                    </div>
                    <h4>Commercial</h4>
                    <p>Office buildings, retail</p>
                </div>
                
                <div class="industry-card">
                    <div class="industry-icon">
                        <i class="fas fa-industry"></i>
                    </div>
                    <h4>Industrial</h4>
                    <p>Factories, warehouses</p>
                </div>
                
                <div class="industry-card">
                    <div class="industry-icon">
                        <i class="fas fa-city"></i>
                    </div>
                    <h4>Public Sector</h4>
                    <p>Government projects</p>
                </div>
                
                <div class="industry-card">
                    <div class="industry-icon">
                        <i class="fas fa-home"></i>
                    </div>
                    <h4>Residential</h4>
                    <p>Housing developments</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Project Delivery Approach -->
    <section class="bg-light">
        <div class="container">
            <div class="text-center">
                <h2 class="section-title">Our Project Execution Process</h2>
                <p class="section-subtitle">A structured approach to ensure quality, safety, and timely delivery</p>
            </div>
            
            <div class="process-grid">
                <div class="process-step">
                    <div class="step-number">1</div>
                    <h4>Project Planning</h4>
                    <p>Detailed planning and resource allocation</p>
                </div>
                
                <div class="process-step">
                    <div class="step-number">2</div>
                    <h4>Engineering Design</h4>
                    <p>Technical specifications and drawings</p>
                </div>
                
                <div class="process-step">
                    <div class="step-number">3</div>
                    <h4>Construction Execution</h4>
                    <p>On-site implementation and management</p>
                </div>
                
                <div class="process-step">
                    <div class="step-number">4</div>
                    <h4>Quality Control</h4>
                    <p>Inspection and testing throughout</p>
                </div>
                
                <div class="process-step">
                    <div class="step-number">5</div>
                    <h4>Project Completion</h4>
                    <p>Handover and client satisfaction</p>
                </div>
            </div>
            
            <p style="text-align: center; margin-top: 50px; color: #4a5a6a; font-size: 1.1rem;">This ensures every project is delivered safely, efficiently, and according to engineering standards.</p>
        </div>
    </section>

    <!-- Call to Action Section -->
    <section class="cta-section">
        <div class="container">
            <div class="cta-content">
                <h2>Need Professional Engineering Services?</h2>
                <p>Divinerock Engineering Services is ready to support your construction, infrastructure, or specialized project with reliable engineering solutions.</p>
                <a href="quote.html" class="btn btn-accent" style="font-size: 1.1rem; padding: 18px 45px;">Request a Quote</a>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <div class="footer-grid">
                <div class="footer-col">
                    <h4>About Divinerock</h4>
                    <p>Divinerock Engineering Services is a civil engineering and construction company committed to delivering reliable infrastructure solutions. Specialized in road construction, bridge development, building construction, steel fabrication, project management, mechanical engineering, electrical and solar installation, and landscaping services for both public and private sector clients.</p>
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
                        <li><a href="services.html">Mechanical Engineering</a></li>
                        <li><a href="services.html">Electrical & Solar</a></li>
                        <li><a href="services.html">Landscaping & Pest Control</a></li>
                    </ul>
                </div>
                
                <div class="footer-col">
                    <h4>Contact Information</h4>
                    <ul class="footer-links">
                        <li><i class="fas fa-map-marker-alt" style="margin-right: 10px;"></i> Sierratel Earth Station, Wilberforce, Freetown</li>
                        <li><i class="fas fa-phone" style="margin-right: 10px;"></i> +232 00 000 000</li>
                        <li><i class="fas fa-envelope" style="margin-right: 10px;"></i> info@divinerock.sl</li>
                    </ul>
                </div>
            </div>
            
            <div class="footer-bottom">
                <p>&copy; 2025 Divinerock Engineering Services. All rights reserved. | Building Strong Foundations for Sustainable Infrastructure</p>
            </div>
        </div>
    </footer>

    <!-- JavaScript -->
    <script>
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
        
        // Active link highlighting
        const currentLocation = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-menu a');
        
        navLinks.forEach(link => {
            if (link.getAttribute('href') === 'services.html') {
                link.classList.add('active');
            }
        });
    </script>
</body>
</html>
