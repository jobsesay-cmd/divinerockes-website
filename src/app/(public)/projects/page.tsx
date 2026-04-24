<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Our Projects - Divinerock Engineering Services</title>
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Open+Sans:wght@300;400;600;700&display=swap" rel="stylesheet">
    <!-- Font Awesome for icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <!-- Link to global CSS -->
    <link rel="stylesheet" href="css/style.css">
    <style>
        /* Additional styles specific to Projects page */
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
        
        /* Project Filters */
        .project-filters {
            display: flex;
            justify-content: center;
            gap: 15px;
            margin-bottom: 50px;
            flex-wrap: wrap;
        }
        
        .filter-btn {
            padding: 12px 25px;
            background: white;
            border: 2px solid #0972C2;
            color: #0972C2;
            font-weight: 600;
            border-radius: 30px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-family: 'Montserrat', sans-serif;
        }
        
        .filter-btn:hover,
        .filter-btn.active {
            background: #0972C2;
            color: white;
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(9,114,194,0.3);
        }
        
        /* Projects Grid */
        .projects-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 40px;
            margin-top: 30px;
        }
        
        .project-card {
            background: white;
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 15px 40px rgba(0,0,0,0.05);
            transition: all 0.3s ease;
            border: 1px solid #f0f0f0;
            position: relative;
        }
        
        .project-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 25px 50px rgba(9,114,194,0.15);
            border-color: #0972C2;
        }
        
        .project-image {
            position: relative;
            height: 280px;
            overflow: hidden;
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
        
        .project-category {
            position: absolute;
            top: 20px;
            right: 20px;
            background: #D83936;
            color: white;
            padding: 8px 20px;
            border-radius: 30px;
            font-size: 0.9rem;
            font-weight: 600;
            z-index: 2;
            box-shadow: 0 5px 15px rgba(216,57,54,0.3);
        }
        
        .project-content {
            padding: 30px;
        }
        
        .project-content h3 {
            color: #0972C2;
            font-size: 1.5rem;
            margin-bottom: 10px;
        }
        
        .project-location {
            display: flex;
            align-items: center;
            gap: 8px;
            color: #4a5a6a;
            margin-bottom: 15px;
            font-size: 1rem;
        }
        
        .project-location i {
            color: #D83936;
        }
        
        .project-description {
            color: #4a5a6a;
            margin-bottom: 20px;
            line-height: 1.8;
        }
        
        .project-details {
            background: #F5F7FA;
            padding: 20px;
            border-radius: 10px;
            margin-top: 15px;
        }
        
        .project-details h4 {
            color: #0972C2;
            margin-bottom: 15px;
            font-size: 1.1rem;
        }
        
        .project-details ul {
            list-style: none;
        }
        
        .project-details li {
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            gap: 10px;
            color: #2c3e50;
        }
        
        .project-details i {
            color: #D83936;
            width: 20px;
        }
        
        .project-outcome {
            margin-top: 20px;
            padding: 15px;
            background: rgba(9,114,194,0.05);
            border-left: 4px solid #D83936;
            border-radius: 5px;
        }
        
        .project-outcome p {
            color: #2c3e50;
            font-style: italic;
        }
        
        .project-outcome strong {
            color: #0972C2;
        }
        
        /* Ongoing Projects Section */
        .ongoing-badge {
            background: #D83936;
            color: white;
            padding: 5px 15px;
            border-radius: 20px;
            font-size: 0.9rem;
            font-weight: 600;
            display: inline-block;
            margin-bottom: 20px;
        }
        
        /* Project Stats */
        .project-stats {
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
        
        /* Project Delivery Approach */
        .approach-grid {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 20px;
            margin-top: 50px;
        }
        
        .approach-step {
            text-align: center;
            position: relative;
        }
        
        .approach-step:not(:last-child)::after {
            content: '→';
            position: absolute;
            top: 40px;
            right: -15px;
            font-size: 2rem;
            color: #D83936;
            font-weight: 700;
        }
        
        .step-icon {
            width: 80px;
            height: 80px;
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
        
        .approach-step:hover .step-icon {
            background: #D83936;
            transform: rotateY(360deg);
        }
        
        .approach-step h4 {
            color: #0972C2;
            margin-bottom: 10px;
        }
        
        .approach-step p {
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
            .projects-grid,
            .stats-grid {
                grid-template-columns: repeat(2, 1fr);
            }
            
            .approach-grid {
                grid-template-columns: repeat(3, 1fr);
            }
            
            .approach-step:not(:last-child)::after {
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
            
            .projects-grid,
            .stats-grid,
            .approach-grid,
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
            
            .project-filters {
                flex-direction: column;
                align-items: center;
            }
            
            .filter-btn {
                width: 100%;
                max-width: 250px;
                text-align: center;
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
                <a href="services.html">Services</a>
                <a href="projects.html" class="active">Projects</a>
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
            <h1>Our Projects</h1>
            <p>Delivering reliable engineering and construction solutions across diverse infrastructure and development projects in Sierra Leone</p>
        </div>
    </section>

    <!-- Projects Introduction -->
    <section>
        <div class="container">
            <div class="text-center">
                <h2 class="section-title">Project Portfolio</h2>
                <p class="section-subtitle">Divinerock Engineering Services undertakes projects that support infrastructure development and economic growth. Our portfolio includes road construction, bridge development, building construction, structural fabrication, and drainage infrastructure projects.</p>
            </div>
        </div>
    </section>

    <!-- Project Filters -->
    <section class="bg-light" style="padding-top: 0;">
        <div class="container">
            <div class="project-filters">
                <button class="filter-btn active" data-filter="all">All Projects</button>
                <button class="filter-btn" data-filter="road">Road Projects</button>
                <button class="filter-btn" data-filter="bridge">Bridge Projects</button>
                <button class="filter-btn" data-filter="building">Building Projects</button>
                <button class="filter-btn" data-filter="fabrication">Fabrication Projects</button>
                <button class="filter-btn" data-filter="infrastructure">Infrastructure Projects</button>
            </div>
        </div>
    </section>

    <!-- Completed Projects Section -->
    <section class="bg-light">
        <div class="container">
            <div class="text-center">
                <h2 class="section-title">Completed Projects</h2>
                <p class="section-subtitle">Successfully delivered projects that demonstrate our expertise and commitment to quality</p>
            </div>
            
            <div class="projects-grid" id="completed-projects">
                <!-- Highway Rehabilitation Project -->
                <div class="project-card" data-category="road">
                    <div class="project-image">
                        <img src="images/project-road.jpg" alt="Highway Rehabilitation">
                        <span class="proj.jpgect-category">Road Construction</span>
                    </div>
                    <div class="project-content">
                        <h3>Highway Rehabilitation Project</h3>
                        <div class="project-location">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>Western Area, Sierra Leone</span>
                        </div>
                        <p class="project-description">Divinerock Engineering Services undertook the rehabilitation of a major community access road designed to improve transportation efficiency and regional connectivity.</p>
                        
                        <div class="project-details">
                            <h4>Scope of Work:</h4>
                            <ul>
                                <li><i class="fas fa-check"></i> Earthworks and grading</li>
                                <li><i class="fas fa-check"></i> Drainage installation</li>
                                <li><i class="fas fa-check"></i> Road base construction</li>
                                <li><i class="fas fa-check"></i> Asphalt surfacing</li>
                            </ul>
                        </div>
                        
                        <div class="project-outcome">
                            <p><strong>Outcome:</strong> The completed road significantly improved travel time, accessibility, and economic activity within the surrounding communities.</p>
                        </div>
                    </div>
                </div>
                
                <!-- Reinforced Concrete Bridge -->
                <div class="project-card" data-category="bridge">
                    <div class="project-image">
                        <img src="images/bridge.jpg" alt="Bridge Construction">
                        <span class="project-category">Bridge Construction</span>
                    </div>
                    <div class="project-content">
                        <h3>Reinforced Concrete Bridge Construction</h3>
                        <div class="project-location">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>Port Loko District, Sierra Leone</span>
                        </div>
                        <p class="project-description">The company successfully executed the construction of a reinforced concrete bridge designed to support vehicular and pedestrian traffic across a seasonal waterway.</p>
                        
                        <div class="project-details">
                            <h4>Scope of Work:</h4>
                            <ul>
                                <li><i class="fas fa-check"></i> Foundation works</li>
                                <li><i class="fas fa-check"></i> Reinforced concrete piers</li>
                                <li><i class="fas fa-check"></i> Bridge deck construction</li>
                                <li><i class="fas fa-check"></i> Installation of safety railings</li>
                            </ul>
                        </div>
                        
                        <div class="project-outcome">
                            <p><strong>Outcome:</strong> The structure was designed to withstand environmental pressures and provide long-term durability, connecting communities on both sides.</p>
                        </div>
                    </div>
                </div>
                
                <!-- Commercial Office Building -->
                <div class="project-card" data-category="building">
                    <div class="project-image">
                        <img src="images/bridge.jpg" alt="Office Building">
                        <span class="project-category">Building Construction</span>
                    </div>
                    <div class="project-content">
                        <h3>Commercial Office Building Development</h3>
                        <div class="project-location">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>Freetown, Sierra Leone</span>
                        </div>
                        <p class="project-description">Divinerock Engineering Services delivered a multi-purpose office complex designed to provide modern workspace facilities for business operations.</p>
                        
                        <div class="project-details">
                            <h4>Scope of Work:</h4>
                            <ul>
                                <li><i class="fas fa-check"></i> Structural foundation works</li>
                                <li><i class="fas fa-check"></i> Reinforced concrete frame</li>
                                <li><i class="fas fa-check"></i> Roofing and finishing works</li>
                                <li><i class="fas fa-check"></i> Electrical and plumbing</li>
                            </ul>
                        </div>
                        
                        <div class="project-outcome">
                            <p><strong>Outcome:</strong> Modern commercial facility providing quality office space for multiple businesses.</p>
                        </div>
                    </div>
                </div>
                
                <!-- Structural Steel Fabrication -->
                <div class="project-card" data-category="fabrication">
                    <div class="project-image">
                        <img src="images/project-road.jpg" alt="Steel Fabrication">
                        <span class="project-category">Fabrication</span>
                    </div>
                    <div class="project-content">
                        <h3>Structural Steel Fabrication Project</h3>
                        <div class="project-location">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>Industrial Site, Wellington</span>
                        </div>
                        <p class="project-description">The company completed a structural steel fabrication project involving the design, fabrication, and installation of steel frames for an industrial facility.</p>
                        
                        <div class="project-details">
                            <h4>Scope of Work:</h4>
                            <ul>
                                <li><i class="fas fa-check"></i> Precision steel cutting</li>
                                <li><i class="fas fa-check"></i> Welding and assembly</li>
                                <li><i class="fas fa-check"></i> Fabrication of structural frames</li>
                                <li><i class="fas fa-check"></i> Installation of steel supports</li>
                            </ul>
                        </div>
                        
                        <div class="project-outcome">
                            <p><strong>Outcome:</strong> Strong and durable steel structure supporting industrial operations, meeting all engineering specifications.</p>
                        </div>
                    </div>
                </div>
                
                <!-- Stormwater Drainage Infrastructure -->
                <div class="project-card" data-category="infrastructure">
                    <div class="project-image">
                        <img src="images/bridge.jpg" alt="Drainage System">
                        <span class="project-category">Infrastructure</span>
                    </div>
                    <div class="project-content">
                        <h3>Stormwater Drainage Infrastructure Project</h3>
                        <div class="project-location">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>Urban Area, Freetown</span>
                        </div>
                        <p class="project-description">Divinerock Engineering Services constructed a drainage system designed to manage stormwater flow and reduce flooding risks in an urban area.</p>
                        
                        <div class="project-details">
                            <h4>Scope of Work:</h4>
                            <ul>
                                <li><i class="fas fa-check"></i> Excavation and earthworks</li>
                                <li><i class="fas fa-check"></i> Culvert installation</li>
                                <li><i class="fas fa-check"></i> Reinforced concrete channels</li>
                                <li><i class="fas fa-check"></i> Erosion control measures</li>
                            </ul>
                        </div>
                        
                        <div class="project-outcome">
                            <p><strong>Outcome:</strong> Effective stormwater management significantly reduced flooding risks in the community.</p>
                        </div>
                    </div>
                </div>
                
                <!-- Community Access Road -->
                <div class="project-card" data-category="road">
                    <div class="project-image">
                        <img src="images/bridge.jpg" alt="Community Road">
                        <span class="project-category">Road Construction</span>
                    </div>
                    <div class="project-content">
                        <h3>Community Access Road Development</h3>
                        <div class="project-location">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>Western Area Rural</span>
                        </div>
                        <p class="project-description">Construction of a vital community access road connecting remote villages to the main highway.</p>
                        
                        <div class="project-details">
                            <h4>Scope of Work:</h4>
                            <ul>
                                <li><i class="fas fa-check"></i> Site clearing and earthworks</li>
                                <li><i class="fas fa-check"></i> Road grading and compaction</li>
                                <li><i class="fas fa-check"></i> Drainage installation</li>
                                <li><i class="fas fa-check"></i> Pavement construction</li>
                            </ul>
                        </div>
                        
                        <div class="project-outcome">
                            <p><strong>Outcome:</strong> Improved transportation access and connectivity for surrounding communities.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Ongoing Projects Section -->
    <section>
        <div class="container">
            <div class="text-center">
                <h2 class="section-title">Ongoing Projects</h2>
                <p class="section-subtitle">Current projects under construction and development</p>
            </div>
            
            <div class="projects-grid">
                <!-- Ongoing Bridge Project -->
                <div class="project-card">
                    <div class="project-image">
                        <img src="images/bridge.jpg" alt="Ongoing Bridge">
                        <span class="project-category">Bridge Construction</span>
                    </div>
                    <div class="project-content">
                        <div class="ongoing-badge">
                            <i class="fas fa-spinner fa-pulse"></i> In Progress
                        </div>
                        <h3>Moyamba Bridge Construction</h3>
                        <div class="project-location">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>Moyamba District</span>
                        </div>
                        <p class="project-description">Construction of a 50-meter reinforced concrete bridge to improve connectivity.</p>
                        
                        <div class="project-details">
                            <h4>Current Status:</h4>
                            <ul>
                                <li><i class="fas fa-check"></i> Foundation works completed</li>
                                <li><i class="fas fa-spinner fa-pulse"></i> Pier construction underway</li>
                                <li><i class="fas fa-clock"></i> Expected completion: Q3 2025</li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                <!-- Ongoing Building Project -->
                <div class="project-card">
                    <div class="project-image">
                        <img src="images/bridge.jpg" alt="Ongoing Building">
                        <span class="project-category">Building Construction</span>
                    </div>
                    <div class="project-content">
                        <div class="ongoing-badge">
                            <i class="fas fa-spinner fa-pulse"></i> In Progress
                        </div>
                        <h3>Educational Facility Construction</h3>
                        <div class="project-location">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>Bo, Sierra Leone</span>
                        </div>
                        <p class="project-description">Construction of a modern secondary school with 12 classrooms and laboratory facilities.</p>
                        
                        <div class="project-details">
                            <h4>Current Status:</h4>
                            <ul>
                                <li><i class="fas fa-check"></i> Foundation completed</li>
                                <li><i class="fas fa-spinner fa-pulse"></i> Wall construction in progress</li>
                                <li><i class="fas fa-clock"></i> Expected completion: Q4 2025</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Project Statistics -->
    <section class="project-stats">
        <div class="container">
            <div class="stats-grid">
                <div class="stat-item">
                    <div class="stat-number">25+</div>
                    <div class="stat-label">Projects Completed</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">12</div>
                    <div class="stat-label">Ongoing Projects</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">8</div>
                    <div class="stat-label">Government Contracts</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">100%</div>
                    <div class="stat-label">Client Satisfaction</div>
                </div>
            </div>
        </div>
    </section>

    <!-- Project Delivery Approach -->
    <section class="bg-light">
        <div class="container">
            <div class="text-center">
                <h2 class="section-title">Our Project Delivery Approach</h2>
                <p class="section-subtitle">A structured methodology ensuring quality, safety, and timely completion</p>
            </div>
            
            <div class="approach-grid">
                <div class="approach-step">
                    <div class="step-icon">
                        <i class="fas fa-clipboard-list"></i>
                    </div>
                    <h4>Project Planning</h4>
                    <p>Detailed planning, resource allocation, and scheduling</p>
                </div>
                
                <div class="approach-step">
                    <div class="step-icon">
                        <i class="fas fa-drafting-compass"></i>
                    </div>
                    <h4>Engineering Design</h4>
                    <p>Technical specifications, drawings, and approvals</p>
                </div>
                
                <div class="approach-step">
                    <div class="step-icon">
                        <i class="fas fa-hard-hat"></i>
                    </div>
                    <h4>Construction Execution</h4>
                    <p>On-site implementation with strict supervision</p>
                </div>
                
                <div class="approach-step">
                    <div class="step-icon">
                        <i class="fas fa-check-double"></i>
                    </div>
                    <h4>Quality Control</h4>
                    <p>Continuous inspection and testing throughout</p>
                </div>
                
                <div class="approach-step">
                    <div class="step-icon">
                        <i class="fas fa-flag-checkered"></i>
                    </div>
                    <h4>Project Completion</h4>
                    <p>Final inspection, handover, and client satisfaction</p>
                </div>
            </div>
            
            <p style="text-align: center; margin-top: 50px; color: #4a5a6a; font-size: 1.1rem;">This structured approach ensures every project is delivered safely, efficiently, and according to engineering standards.</p>
        </div>
    </section>

    <!-- Call to Action Section -->
    <section class="cta-section">
        <div class="container">
            <div class="cta-content">
                <h2>Looking for a Reliable Construction Partner?</h2>
                <p>Divinerock Engineering Services is ready to deliver dependable engineering solutions for your next project.</p>
                <a href="contact.html" class="btn btn-accent" style="font-size: 1.1rem; padding: 18px 45px;">Contact Us Today</a>
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
            if (link.getAttribute('href') === 'projects.html') {
                link.classList.add('active');
            }
        });
        
        // Project Filtering
        const filterButtons = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');
                
                const filterValue = button.getAttribute('data-filter');
                
                projectCards.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    </script>
</body>
</html>
