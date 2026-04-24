<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>About Us - Divinerock Engineering Services</title>
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Open+Sans:wght@300;400;600;700&display=swap" rel="stylesheet">
    <!-- Font Awesome for icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <!-- Link to global CSS -->
    <link rel="stylesheet" href="css/style.css">
    <style>
        /* Additional styles specific to About page */
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
        
        /* Header Styles (repeated for standalone page) */
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
            margin-bottom: 15px;
            animation: fadeInUp 0.8s ease;
        }
        
        .page-banner p {
            font-size: 1.2rem;
            max-width: 700px;
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
            max-width: 700px;
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
        
        /* About Content Grid */
        .about-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 60px;
            align-items: center;
        }
        
        .about-content p {
            margin-bottom: 20px;
            font-size: 1.1rem;
            color: #2c3e50;
        }
        
        .about-highlight {
            background: #0972C2;
            color: white;
            padding: 30px;
            border-radius: 10px;
            margin-top: 30px;
        }
        
        .about-highlight h3 {
            color: white;
            margin-bottom: 15px;
            font-size: 1.5rem;
        }
        
        .about-highlight p {
            color: rgba(255,255,255,0.9);
            margin-bottom: 0;
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
        
        /* Mission Vision Grid */
        .mission-vision-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 30px;
            margin-top: 50px;
        }
        
        .mission-card, .vision-card {
            background: white;
            padding: 40px;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.05);
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }
        
        .mission-card:hover, .vision-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 20px 40px rgba(9,114,194,0.1);
        }
        
        .mission-card::before, .vision-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 5px;
            height: 100%;
            background: #0972C2;
        }
        
        .vision-card::before {
            background: #D83936;
        }
        
        .card-icon {
            width: 70px;
            height: 70px;
            background: #0972C2;
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2rem;
            margin-bottom: 25px;
        }
        
        .vision-card .card-icon {
            background: #D83936;
        }
        
        .mission-card h3, .vision-card h3 {
            font-size: 1.8rem;
            margin-bottom: 15px;
            color: #0972C2;
        }
        
        .vision-card h3 {
            color: #D83936;
        }
        
        .mission-card p, .vision-card p {
            color: #4a5a6a;
            line-height: 1.8;
            font-size: 1.1rem;
        }
        
        /* Core Values */
        .values-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 30px;
            margin-top: 50px;
        }
        
        .value-card {
            background: white;
            padding: 35px;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.05);
            text-align: center;
            transition: all 0.3s ease;
            border: 1px solid #f0f0f0;
        }
        
        .value-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 20px 40px rgba(9,114,194,0.1);
            border-color: #0972C2;
        }
        
        .value-icon {
            width: 80px;
            height: 80px;
            background: #0972C2;
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2rem;
            margin: 0 auto 25px;
            transition: all 0.3s ease;
        }
        
        .value-card:hover .value-icon {
            background: #D83936;
            transform: rotateY(360deg);
        }
        
        .value-card h3 {
            margin-bottom: 15px;
            color: #0972C2;
        }
        
        .value-card p {
            color: #4a5a6a;
            line-height: 1.7;
        }
        
        /* Capability Statement */
        .capability-section {
            background: linear-gradient(135deg, #0972C2 0%, #0a5fa0 100%);
            color: white;
        }
        
        .capability-content {
            max-width: 900px;
            margin: 0 auto;
            text-align: center;
        }
        
        .capability-content h2 {
            color: white;
            margin-bottom: 30px;
        }
        
        .capability-content h2::after {
            background-color: #D83936;
            left: 50%;
            transform: translateX(-50%);
        }
        
        .capability-content p {
            font-size: 1.2rem;
            margin-bottom: 30px;
            opacity: 0.95;
            line-height: 1.8;
        }
        
        .capability-stats {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 30px;
            margin-top: 50px;
        }
        
        .capability-stat {
            padding: 20px;
            background: rgba(255,255,255,0.1);
            border-radius: 10px;
            backdrop-filter: blur(5px);
        }
        
        .capability-stat .stat-number {
            font-size: 2.5rem;
            font-weight: 800;
            margin-bottom: 5px;
            color: white;
        }
        
        .capability-stat .stat-label {
            font-size: 1rem;
            opacity: 0.9;
        }
        
        /* Health & Safety */
        .safety-section {
            background: white;
        }
        
        .safety-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 50px;
            align-items: center;
        }
        
        .safety-content h3 {
            color: #0972C2;
            margin-bottom: 20px;
            font-size: 1.8rem;
        }
        
        .safety-list {
            list-style: none;
        }
        
        .safety-list li {
            margin-bottom: 15px;
            display: flex;
            align-items: center;
            gap: 15px;
        }
        
        .safety-list i {
            color: #D83936;
            font-size: 1.3rem;
            width: 30px;
        }
        
        .safety-image {
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }
        
        .safety-image img {
            width: 100%;
            height: auto;
            display: block;
        }
        
        /* Certifications */
        .certifications {
            background: #F5F7FA;
        }
        
        .cert-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 30px;
            margin-top: 50px;
        }
        
        .cert-card {
            background: white;
            padding: 30px;
            border-radius: 10px;
            text-align: center;
            box-shadow: 0 5px 20px rgba(0,0,0,0.03);
            transition: all 0.3s ease;
        }
        
        .cert-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 30px rgba(9,114,194,0.1);
        }
        
        .cert-icon {
            font-size: 3rem;
            color: #0972C2;
            margin-bottom: 20px;
        }
        
        .cert-card h4 {
            color: #0972C2;
            margin-bottom: 10px;
        }
        
        /* Team Section */
        .team-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 30px;
            margin-top: 50px;
        }
        
        .team-card {
            text-align: center;
            background: white;
            padding: 30px 20px;
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
            margin-bottom: 15px;
        }
        
        .team-social {
            display: flex;
            gap: 10px;
            justify-content: center;
        }
        
        .team-social a {
            width: 35px;
            height: 35px;
            background: #F5F7FA;
            color: #0972C2;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            text-decoration: none;
            transition: all 0.3s ease;
        }
        
        .team-social a:hover {
            background: #0972C2;
            color: white;
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
            .values-grid,
            .team-grid,
            .cert-grid {
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
            
            .about-grid,
            .mission-vision-grid,
            .safety-grid {
                grid-template-columns: 1fr;
            }
            
            .values-grid,
            .team-grid,
            .cert-grid,
            .capability-stats,
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
                <a href="about.html" class="active">About Us</a>
                <a href="services.html">Services</a>
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
            <h1>About Divinerock Engineering Services</h1>
            <p>Building strong foundations for sustainable infrastructure through expertise, integrity, and innovation</p>
        </div>
    </section>

    <!-- Company Overview Section -->
    <section>
        <div class="container">
            <div class="about-grid">
                <div class="about-content">
                    <h2 class="section-title">Company Overview</h2>
                    <p>Divinerock Engineering Services is a professional civil engineering and construction company dedicated to delivering high-quality infrastructure and engineering solutions. The company specializes in construction, civil engineering works, fabrication, and project management services for both public and private sector clients.</p>
                    <p>With a strong commitment to quality, innovation, and safety, Divinerock Engineering Services undertakes projects that contribute to sustainable infrastructure development and economic growth. Our experienced team of engineers, technicians, and construction professionals work together to deliver projects that meet international engineering standards while responding to the specific needs of each client.</p>
                    <p>From road construction and bridge development to building construction and structural fabrication, the company is equipped with the expertise and technical capacity required to execute projects efficiently and responsibly.</p>
                    
                    <div class="about-highlight">
                        <h3>Our Commitment</h3>
                        <p>We are committed to excellence in every project, ensuring that our work not only meets but exceeds client expectations while contributing to the development of sustainable infrastructure across Sierra Leone.</p>
                    </div>
                </div>
                <div class="about-image">
                    <img src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80" alt="Divinerock Engineering Team">
                </div>
            </div>
        </div>
    </section>

    <!-- Mission & Vision Section -->
    <section class="bg-light">
        <div class="container">
            <div class="mission-vision-grid">
                <div class="mission-card">
                    <div class="card-icon">
                        <i class="fas fa-bullseye"></i>
                    </div>
                    <h3>Our Mission</h3>
                    <p>To provide reliable and high-quality engineering and construction services that support infrastructure development while maintaining the highest standards of professionalism, safety, and environmental responsibility.</p>
                </div>
                
                <div class="vision-card">
                    <div class="card-icon">
                        <i class="fas fa-eye"></i>
                    </div>
                    <h3>Our Vision</h3>
                    <p>To become a trusted leader in civil engineering and construction services, recognized for delivering innovative and sustainable infrastructure solutions that transform communities and drive economic growth.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Core Values Section -->
    <section>
        <div class="container">
            <div class="text-center">
                <h2 class="section-title">Our Core Values</h2>
                <p class="section-subtitle">The principles that guide our work and define our company culture</p>
            </div>
            
            <div class="values-grid">
                <div class="value-card">
                    <div class="value-icon">
                        <i class="fas fa-star"></i>
                    </div>
                    <h3>Quality</h3>
                    <p>We are committed to delivering projects that meet the highest standards of engineering excellence and durability, ensuring long-term value for our clients.</p>
                </div>
                
                <div class="value-card">
                    <div class="value-icon">
                        <i class="fas fa-handshake"></i>
                    </div>
                    <h3>Integrity</h3>
                    <p>We conduct our operations with honesty, transparency, and accountability, building trust with clients, partners, and communities.</p>
                </div>
                
                <div class="value-card">
                    <div class="value-icon">
                        <i class="fas fa-shield-alt"></i>
                    </div>
                    <h3>Safety</h3>
                    <p>We prioritize the safety of our workforce, clients, and the communities where we operate through rigorous safety protocols and training.</p>
                </div>
                
                <div class="value-card">
                    <div class="value-icon">
                        <i class="fas fa-user-tie"></i>
                    </div>
                    <h3>Professionalism</h3>
                    <p>Our team maintains high levels of competence, efficiency, and ethical conduct in every project we undertake.</p>
                </div>
                
                <div class="value-card">
                    <div class="value-icon">
                        <i class="fas fa-lightbulb"></i>
                    </div>
                    <h3>Innovation</h3>
                    <p>We continuously adopt modern construction techniques and technologies to improve project outcomes and deliver cutting-edge solutions.</p>
                </div>
                
                <div class="value-card">
                    <div class="value-icon">
                        <i class="fas fa-users"></i>
                    </div>
                    <h3>Teamwork</h3>
                    <p>We foster collaboration and mutual respect among our team members, ensuring that collective expertise drives project success.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Capability Statement Section -->
    <section class="capability-section">
        <div class="container">
            <div class="capability-content">
                <h2 class="section-title">Our Capability Statement</h2>
                <p>Divinerock Engineering Services provides professional civil engineering, construction, and fabrication services with expertise in road construction, bridge development, building construction, structural steel fabrication, and project management. Our technical capacity and skilled workforce enable us to deliver infrastructure projects that meet modern engineering standards.</p>
                <p>We have the resources, experience, and commitment to handle projects of varying scales and complexities, from community access roads to major infrastructure developments.</p>
                
                <div class="capability-stats">
                    <div class="capability-stat">
                        <div class="stat-number">25+</div>
                        <div class="stat-label">Projects Completed</div>
                    </div>
                    <div class="capability-stat">
                        <div class="stat-number">15+</div>
                        <div class="stat-label">Skilled Engineers</div>
                    </div>
                    <div class="capability-stat">
                        <div class="stat-number">10+</div>
                        <div class="stat-label">Years Experience</div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Health & Safety Commitment -->
    <section class="safety-section">
        <div class="container">
            <div class="safety-grid">
                <div class="safety-content">
                    <h3>Health & Safety Commitment</h3>
                    <p>At Divinerock Engineering Services, the safety of our workforce, clients, and communities is our highest priority. We implement comprehensive safety management systems across all project sites.</p>
                    
                    <ul class="safety-list">
                        <li>
                            <i class="fas fa-check-circle"></i>
                            <span>Strict safety procedures and protocols on all sites</span>
                        </li>
                        <li>
                            <i class="fas fa-check-circle"></i>
                            <span>Regular safety training and toolbox talks for all staff</span>
                        </li>
                        <li>
                            <i class="fas fa-check-circle"></i>
                            <span>Mandatory personal protective equipment (PPE) usage</span>
                        </li>
                        <li>
                            <i class="fas fa-check-circle"></i>
                            <span>Regular site inspections and safety audits</span>
                        </li>
                        <li>
                            <i class="fas fa-check-circle"></i>
                            <span>Incident reporting and investigation procedures</span>
                        </li>
                        <li>
                            <i class="fas fa-check-circle"></i>
                            <span>Emergency response plans for all project locations</span>
                        </li>
                    </ul>
                </div>
                <div class="safety-image">
                    <img src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80" alt="Safety on site">
                </div>
            </div>
        </div>
    </section>

    <!-- Certifications & Compliance -->
    <section class="certifications">
        <div class="container">
            <div class="text-center">
                <h2 class="section-title">Certifications & Compliance</h2>
                <p class="section-subtitle">We operate in accordance with industry standards and regulatory requirements</p>
            </div>
            
            <div class="cert-grid">
                <div class="cert-card">
                    <div class="cert-icon">
                        <i class="fas fa-certificate"></i>
                    </div>
                    <h4>ISO 9001:2015</h4>
                    <p>Quality Management Systems</p>
                </div>
                
                <div class="cert-card">
                    <div class="cert-icon">
                        <i class="fas fa-hard-hat"></i>
                    </div>
                    <h4>ISO 45001</h4>
                    <p>Occupational Health & Safety</p>
                </div>
                
                <div class="cert-card">
                    <div class="cert-icon">
                        <i class="fas fa-leaf"></i>
                    </div>
                    <h4>ISO 14001</h4>
                    <p>Environmental Management</p>
                </div>
                
                <div class="cert-card">
                    <div class="cert-icon">
                        <i class="fas fa-building"></i>
                    </div>
                    <h4>NCCE Registered</h4>
                    <p>National Council of Civil Engineers</p>
                </div>
            </div>
            
            <p style="text-align: center; margin-top: 30px; color: #4a5a6a;">Divinerock Engineering Services operates in compliance with professional engineering standards and construction safety regulations. The company adheres to relevant industry practices and maintains the necessary operational and safety procedures required for construction and infrastructure development projects.</p>
        </div>
    </section>

    <!-- Professional Team Section -->
    <section>
        <div class="container">
            <div class="text-center">
                <h2 class="section-title">Our Professional Team</h2>
                <p class="section-subtitle">Meet the experienced professionals behind our successful projects</p>
            </div>
            
            <div class="team-grid">
                <div class="team-card">
                    <div class="team-image">
                        <img src="images/john-kamara2.jpg" alt="John Kamara">
                    </div>
                    <h3>John Kamara</h3>
                    <p>Senior Civil Engineer</p>
                    <div class="team-social">
                        <a href="#"><i class="fab fa-linkedin-in"></i></a>
                        <a href="#"><i class="fab fa-twitter"></i></a>
                        <a href="#"><i class="fas fa-envelope"></i></a>
                    </div>
                </div>
                
                <div class="team-card">
                    <div class="team-image">
                        <img src="images/Mariatu-sesay2.jpg" alt="Mariatu Sesay">
                    </div>
                    <h3>Mariatu Sesay</h3>
                    <p>Project Manager</p>
                    <div class="team-social">
                        <a href="#"><i class="fab fa-linkedin-in"></i></a>
                        <a href="#"><i class="fab fa-twitter"></i></a>
                        <a href="#"><i class="fas fa-envelope"></i></a>
                    </div>
                </div>
                
                <div class="team-card">
                    <div class="team-image">
                        <img src="images/ibrahim-turay2.jpg" alt="Ibrahim Turay">
                    </div>
                    <h3>Ibrahim Turay</h3>
                    <p>Site Engineer</p>
                    <div class="team-social">
                        <a href="#"><i class="fab fa-linkedin-in"></i></a>
                        <a href="#"><i class="fab fa-twitter"></i></a>
                        <a href="#"><i class="fas fa-envelope"></i></a>
                    </div>
                </div>
                
                <div class="team-card">
                    <div class="team-image">
                        <img src="images/Mariatu-sesay2.jpg" alt="Fatmata Bangura">
                    </div>
                    <h3>Fatmata Bangura</h3>
                    <p>Structural Engineer</p>
                    <div class="team-social">
                        <a href="#"><i class="fab fa-linkedin-in"></i></a>
                        <a href="#"><i class="fab fa-twitter"></i></a>
                        <a href="#"><i class="fas fa-envelope"></i></a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Company Experience Section -->
    <section class="bg-light">
        <div class="container">
            <div class="text-center">
                <h2 class="section-title">Our Experience & Expertise</h2>
                <p class="section-subtitle">Years of successful project delivery across diverse sectors</p>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 30px; margin-top: 40px;">
                <div style="background: white; padding: 30px; border-radius: 10px;">
                    <h3 style="color: #0972C2; margin-bottom: 15px;">Infrastructure Projects</h3>
                    <ul style="list-style: none;">
                        <li style="margin-bottom: 10px;"><i class="fas fa-check" style="color: #D83936; margin-right: 10px;"></i>Road construction and rehabilitation</li>
                        <li style="margin-bottom: 10px;"><i class="fas fa-check" style="color: #D83936; margin-right: 10px;"></i>Bridge development</li>
                        <li style="margin-bottom: 10px;"><i class="fas fa-check" style="color: #D83936; margin-right: 10px;"></i>Drainage systems</li>
                        <li style="margin-bottom: 10px;"><i class="fas fa-check" style="color: #D83936; margin-right: 10px;"></i>Water infrastructure</li>
                    </ul>
                </div>
                
                <div style="background: white; padding: 30px; border-radius: 10px;">
                    <h3 style="color: #0972C2; margin-bottom: 15px;">Building Projects</h3>
                    <ul style="list-style: none;">
                        <li style="margin-bottom: 10px;"><i class="fas fa-check" style="color: #D83936; margin-right: 10px;"></i>Commercial buildings</li>
                        <li style="margin-bottom: 10px;"><i class="fas fa-check" style="color: #D83936; margin-right: 10px;"></i>Residential complexes</li>
                        <li style="margin-bottom: 10px;"><i class="fas fa-check" style="color: #D83936; margin-right: 10px;"></i>Educational facilities</li>
                        <li style="margin-bottom: 10px;"><i class="fas fa-check" style="color: #D83936; margin-right: 10px;"></i>Industrial structures</li>
                    </ul>
                </div>
            </div>
        </div>
    </section>

    <!-- Call to Action Section -->
    <section class="cta-section">
        <div class="container">
            <div class="cta-content">
                <h2>Ready to Start Your Project?</h2>
                <p>Partner with Divinerock Engineering Services for reliable, professional, and quality engineering solutions. Let's discuss how we can bring your vision to life.</p>
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
            if (link.getAttribute('href') === 'about.html') {
                link.classList.add('active');
            }
        });
    </script>
</body>
</html>
