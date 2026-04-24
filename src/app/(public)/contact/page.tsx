<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Us - Divinerock Engineering Services</title>
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Open+Sans:wght@300;400;600;700&display=swap" rel="stylesheet">
    <!-- Font Awesome for icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <!-- Link to global CSS -->
    <link rel="stylesheet" href="css/style.css">
    <style>
        /* Additional styles specific to Contact page */
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
        
        /* Contact Info Cards */
        .contact-info-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 25px;
            margin-bottom: 60px;
        }
        
        .contact-info-card {
            background: white;
            padding: 35px 25px;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.05);
            transition: all 0.3s ease;
            text-align: center;
            border: 1px solid #f0f0f0;
            position: relative;
            overflow: hidden;
        }
        
        .contact-info-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 4px;
            background: #0972C2;
            transition: height 0.3s ease;
        }
        
        .contact-info-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 20px 40px rgba(9,114,194,0.1);
            border-color: #0972C2;
        }
        
        .contact-info-card:hover::before {
            height: 8px;
            background: #D83936;
        }
        
        .info-icon {
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
        
        .contact-info-card:hover .info-icon {
            background: #D83936;
            transform: rotateY(360deg);
        }
        
        .contact-info-card h3 {
            color: #0972C2;
            margin-bottom: 10px;
            font-size: 1.3rem;
        }
        
        .contact-info-card p {
            color: #4a5a6a;
            line-height: 1.7;
        }
        
        .contact-info-card a {
            color: #4a5a6a;
            text-decoration: none;
            transition: color 0.3s ease;
        }
        
        .contact-info-card a:hover {
            color: #D83936;
        }
        
        /* Main Contact Grid */
        .contact-main-grid {
            display: grid;
            grid-template-columns: 1fr 1.5fr;
            gap: 50px;
            margin-bottom: 60px;
        }
        
        /* Contact Form */
        .contact-form-wrapper {
            background: white;
            padding: 50px;
            border-radius: 15px;
            box-shadow: 0 20px 50px rgba(0,0,0,0.05);
            border: 1px solid #f0f0f0;
        }
        
        .form-title {
            color: #0972C2;
            margin-bottom: 30px;
            font-size: 1.8rem;
        }
        
        .form-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-bottom: 20px;
        }
        
        .form-group {
            margin-bottom: 20px;
        }
        
        .form-label {
            display: block;
            margin-bottom: 8px;
            font-weight: 600;
            color: #2c3e50;
        }
        
        .form-control {
            width: 100%;
            padding: 15px;
            border: 2px solid #eee;
            border-radius: 8px;
            font-family: 'Open Sans', sans-serif;
            transition: all 0.3s ease;
            font-size: 1rem;
        }
        
        .form-control:focus {
            outline: none;
            border-color: #0972C2;
            box-shadow: 0 0 0 4px rgba(9,114,194,0.1);
        }
        
        textarea.form-control {
            resize: vertical;
            min-height: 150px;
        }
        
        .form-check {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 25px;
        }
        
        .form-check input {
            width: 20px;
            height: 20px;
            cursor: pointer;
        }
        
        .form-check label {
            color: #4a5a6a;
            cursor: pointer;
        }
        
        .form-check a {
            color: #0972C2;
            text-decoration: none;
            font-weight: 600;
        }
        
        .form-check a:hover {
            color: #D83936;
            text-decoration: underline;
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
        
        .btn-large {
            padding: 18px 45px;
            font-size: 1.1rem;
            width: 100%;
        }
        
        /* Office Location */
        .office-details {
            background: white;
            padding: 40px;
            border-radius: 15px;
            box-shadow: 0 20px 50px rgba(0,0,0,0.05);
            border: 1px solid #f0f0f0;
            height: 100%;
        }
        
        .office-details h3 {
            color: #0972C2;
            margin-bottom: 25px;
            font-size: 1.5rem;
        }
        
        .office-details h4 {
            color: #0972C2;
            margin: 25px 0 15px;
            font-size: 1.2rem;
        }
        
        .office-details h4:first-of-type {
            margin-top: 0;
        }
        
        .office-hours {
            list-style: none;
            margin-bottom: 25px;
        }
        
        .office-hours li {
            display: flex;
            justify-content: space-between;
            padding: 10px 0;
            border-bottom: 1px dashed #eee;
        }
        
        .office-hours li span:first-child {
            font-weight: 600;
            color: #2c3e50;
        }
        
        .office-hours li span:last-child {
            color: #4a5a6a;
        }
        
        .office-features {
            list-style: none;
        }
        
        .office-features li {
            margin-bottom: 12px;
            display: flex;
            align-items: center;
            gap: 10px;
            color: #4a5a6a;
        }
        
        .office-features i {
            color: #D83936;
            width: 20px;
        }
        
        /* Map Section */
        .map-section {
            padding: 0 0 60px;
        }
        
        .map-container {
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 20px 50px rgba(0,0,0,0.1);
            border: 1px solid #f0f0f0;
        }
        
        .map-container iframe {
            width: 100%;
            height: 450px;
            border: 0;
            display: block;
        }
        
        /* Business Inquiries Section */
        .business-inquiries {
            background: linear-gradient(135deg, #0972C2 0%, #0a5fa0 100%);
            color: white;
        }
        
        .inquiries-content {
            max-width: 800px;
            margin: 0 auto;
            text-align: center;
        }
        
        .inquiries-content h2 {
            color: white;
            margin-bottom: 20px;
            font-size: 2.5rem;
        }
        
        .inquiries-content h2::after {
            background-color: #D83936;
            left: 50%;
            transform: translateX(-50%);
        }
        
        .inquiries-content p {
            font-size: 1.2rem;
            margin-bottom: 30px;
            opacity: 0.95;
            line-height: 1.8;
        }
        
        .inquiry-buttons {
            display: flex;
            gap: 20px;
            justify-content: center;
            margin-top: 40px;
        }
        
        .inquiry-btn {
            background: rgba(255,255,255,0.15);
            color: white;
            padding: 15px 30px;
            border-radius: 50px;
            text-decoration: none;
            font-weight: 600;
            display: inline-flex;
            align-items: center;
            gap: 10px;
            transition: all 0.3s ease;
            border: 2px solid rgba(255,255,255,0.3);
        }
        
        .inquiry-btn:hover {
            background: #D83936;
            transform: translateY(-3px);
            border-color: #D83936;
            box-shadow: 0 10px 20px rgba(0,0,0,0.2);
        }
        
        .inquiry-btn i {
            font-size: 1.2rem;
        }
        
        /* FAQ Section */
        .faq-section {
            background: #F5F7FA;
        }
        
        .faq-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 30px;
            margin-top: 40px;
        }
        
        .faq-item {
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.03);
            transition: all 0.3s ease;
            border: 1px solid #f0f0f0;
        }
        
        .faq-item:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 40px rgba(9,114,194,0.1);
            border-color: #0972C2;
        }
        
        .faq-item h3 {
            color: #0972C2;
            margin-bottom: 15px;
            font-size: 1.2rem;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .faq-item h3 i {
            color: #D83936;
            font-size: 1.1rem;
        }
        
        .faq-item p {
            color: #4a5a6a;
            line-height: 1.7;
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
        
        /* Success Message */
        .success-message {
            background: #4CAF50;
            color: white;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 20px;
            display: none;
            animation: slideInDown 0.5s ease;
        }
        
        .success-message.show {
            display: block;
        }
        
        /* Responsive */
        @media (max-width: 1024px) {
            .contact-info-grid {
                grid-template-columns: repeat(2, 1fr);
            }
            
            .contact-main-grid {
                grid-template-columns: 1fr;
            }
            
            .faq-grid {
                grid-template-columns: 1fr;
            }
            
            .footer-grid {
                grid-template-columns: repeat(2, 1fr);
            }
        }
        
        @media (max-width: 768px) {
            .page-banner h1 {
                font-size: 2.5rem;
            }
            
            .contact-info-grid {
                grid-template-columns: 1fr;
            }
            
            .form-row {
                grid-template-columns: 1fr;
            }
            
            .inquiry-buttons {
                flex-direction: column;
                align-items: center;
            }
            
            .inquiry-btn {
                width: 100%;
                justify-content: center;
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
            
            .contact-form-wrapper {
                padding: 30px;
            }
            
            .office-details {
                padding: 30px;
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
                <a href="projects.html">Projects</a>
                <a href="equipment.html">Equipment</a>
                <a href="news.html">News</a>
                <a href="contact.html" class="active">Contact</a>
                <a href="quote.html" class="quote-btn">Request a Quote</a>
            </nav>
        </div>
    </header>

    <!-- Page Banner -->
    <section class="page-banner">
        <div class="container">
            <h1>Contact Divinerock Engineering Services</h1>
            <p>Get in touch with our team to discuss your project requirements, request a quote, or learn more about our services</p>
        </div>
    </section>

    <!-- Contact Info Cards -->
    <section style="padding-bottom: 0;">
        <div class="container">
            <div class="contact-info-grid">
                <!-- Office Address -->
                <div class="contact-info-card">
                    <div class="info-icon">
                        <i class="fas fa-map-marker-alt"></i>
                    </div>
                    <h3>Office Address</h3>
                    <p>Sierratel Earth Station,<br>Main Motor Road, Wilberforce,<br>Freetown, Sierra Leone</p>
                </div>
                
                <!-- Phone Number -->
                <div class="contact-info-card">
                    <div class="info-icon">
                        <i class="fas fa-phone-alt"></i>
                    </div>
                    <h3>Phone Number</h3>
                    <p><a href="tel:+23200000000">+232 00 000 000</a><br>
                    <a href="tel:+23211111111">+232 11 111 111</a><br>
                    <small>Mon-Fri, 8:00 AM - 5:00 PM</small></p>
                </div>
                
                <!-- Email Address -->
                <div class="contact-info-card">
                    <div class="info-icon">
                        <i class="fas fa-envelope"></i>
                    </div>
                    <h3>Email Address</h3>
                    <p><a href="mailto:info@divinerock.sl">info@divinerock.sl</a><br>
                    <a href="mailto:projects@divinerock.sl">projects@divinerock.sl</a><br>
                    <a href="mailto:tenders@divinerock.sl">tenders@divinerock.sl</a></p>
                </div>
                
                <!-- Office Hours -->
                <div class="contact-info-card">
                    <div class="info-icon">
                        <i class="fas fa-clock"></i>
                    </div>
                    <h3>Office Hours</h3>
                    <p>Monday - Friday: 8:00 AM - 5:00 PM<br>
                    Saturday: 9:00 AM - 1:00 PM<br>
                    Sunday: Closed</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Main Contact Section -->
    <section>
        <div class="container">
            <div class="contact-main-grid">
                <!-- Contact Form -->
                <div class="contact-form-wrapper">
                    <h2 class="form-title">Send Us a Message</h2>
                    
                    <!-- Success Message -->
                    <div class="success-message" id="successMessage">
                        <i class="fas fa-check-circle" style="margin-right: 10px;"></i>
                        Thank you for your message! We'll get back to you within 24 hours.
                    </div>
                    
                    <form id="contactForm">
                        <div class="form-row">
                            <div class="form-group">
                                <label class="form-label" for="firstName">First Name *</label>
                                <input type="text" class="form-control" id="firstName" required>
                            </div>
                            <div class="form-group">
                                <label class="form-label" for="lastName">Last Name *</label>
                                <input type="text" class="form-control" id="lastName" required>
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label class="form-label" for="email">Email Address *</label>
                                <input type="email" class="form-control" id="email" required>
                            </div>
                            <div class="form-group">
                                <label class="form-label" for="phone">Phone Number</label>
                                <input type="tel" class="form-control" id="phone">
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label" for="company">Company / Organization</label>
                            <input type="text" class="form-control" id="company">
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label" for="subject">Subject *</label>
                            <select class="form-control" id="subject" required>
                                <option value="">Select a subject</option>
                                <option value="general">General Inquiry</option>
                                <option value="project">Project Discussion</option>
                                <option value="quote">Request a Quote</option>
                                <option value="tender">Tender / Bid Inquiry</option>
                                <option value="partnership">Partnership Opportunity</option>
                                <option value="careers">Careers / Employment</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label" for="message">Message *</label>
                            <textarea class="form-control" id="message" required></textarea>
                        </div>
                        
                        <div class="form-check">
                            <input type="checkbox" id="privacy" required>
                            <label for="privacy">I agree to the <a href="#">Privacy Policy</a> and consent to being contacted *</label>
                        </div>
                        
                        <button type="submit" class="btn btn-primary btn-large">
                            <i class="fas fa-paper-plane" style="margin-right: 10px;"></i>
                            Send Message
                        </button>
                    </form>
                </div>
                
                <!-- Office Details -->
                <div class="office-details">
                    <h3>Visit Our Office</h3>
                    
                    <h4><i class="fas fa-building" style="margin-right: 10px; color: #D83936;"></i>Headquarters</h4>
                    <p style="margin-bottom: 25px;">Sierratel Earth Station, Main Motor Road, Wilberforce, Freetown, Sierra Leone</p>
                    
                    <h4><i class="fas fa-clock" style="margin-right: 10px; color: #D83936;"></i>Office Hours</h4>
                    <ul class="office-hours">
                        <li><span>Monday - Friday:</span> <span>8:00 AM - 5:00 PM</span></li>
                        <li><span>Saturday:</span> <span>9:00 AM - 1:00 PM</span></li>
                        <li><span>Sunday:</span> <span>Closed</span></li>
                        <li><span>Public Holidays:</span> <span>Closed</span></li>
                    </ul>
                    
                    <h4><i class="fas fa-phone-alt" style="margin-right: 10px; color: #D83936;"></i>Direct Contacts</h4>
                    <ul class="office-features">
                        <li><i class="fas fa-user"></i> <strong>General Inquiries:</strong> info@divinerock.sl</li>
                        <li><i class="fas fa-hard-hat"></i> <strong>Projects Department:</strong> projects@divinerock.sl</li>
                        <li><i class="fas fa-file-contract"></i> <strong>Tenders & Bids:</strong> tenders@divinerock.sl</li>
                        <li><i class="fas fa-handshake"></i> <strong>Partnerships:</strong> partnerships@divinerock.sl</li>
                        <li><i class="fas fa-briefcase"></i> <strong>Careers:</strong> careers@divinerock.sl</li>
                    </ul>
                    
                    <h4><i class="fas fa-directions" style="margin-right: 10px; color: #D83936;"></i>Getting Here</h4>
                    <p>Located on Main Motor Road in Wilberforce, opposite the Sierratel Earth Station. Ample parking available for visitors.</p>
                    
                    <div style="margin-top: 30px; display: flex; gap: 15px;">
                        <a href="#" style="color: #0972C2; font-size: 1.8rem; transition: color 0.3s ease;" onmouseover="this.style.color='#D83936'" onmouseout="this.style.color='#0972C2'">
                            <i class="fab fa-facebook"></i>
                        </a>
                        <a href="#" style="color: #0972C2; font-size: 1.8rem; transition: color 0.3s ease;" onmouseover="this.style.color='#D83936'" onmouseout="this.style.color='#0972C2'">
                            <i class="fab fa-twitter"></i>
                        </a>
                        <a href="#" style="color: #0972C2; font-size: 1.8rem; transition: color 0.3s ease;" onmouseover="this.style.color='#D83936'" onmouseout="this.style.color='#0972C2'">
                            <i class="fab fa-linkedin"></i>
                        </a>
                        <a href="#" style="color: #0972C2; font-size: 1.8rem; transition: color 0.3s ease;" onmouseover="this.style.color='#D83936'" onmouseout="this.style.color='#0972C2'">
                            <i class="fab fa-whatsapp"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Map Section -->
    <section class="map-section">
        <div class="container">
            <div class="map-container">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126900.58164911648!2d-13.289974!3d8.465677!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOMKwMjcnNTYuNCJOIDEzwrAxNScwMC4wIlc!5e0!3m2!1sen!2ssl!4v1611111111111!5m2!1sen!2ssl" allowfullscreen="" loading="lazy"></iframe>
            </div>
        </div>
    </section>

    <!-- Business & Tender Inquiries Section -->
    <section class="business-inquiries">
        <div class="container">
            <div class="inquiries-content">
                <h2 class="section-title">Business & Tender Inquiries</h2>
                <p>Divinerock Engineering Services welcomes opportunities to collaborate with government agencies, private developers, and international organizations on infrastructure and construction projects.</p>
                <p>For project inquiries, tender participation, or partnership opportunities, please contact our dedicated teams using the options below.</p>
                
                <div class="inquiry-buttons">
                    <a href="mailto:tenders@divinerock.sl" class="inquiry-btn">
                        <i class="fas fa-file-contract"></i>
                        Tender Submissions
                    </a>
                    <a href="mailto:partnerships@divinerock.sl" class="inquiry-btn">
                        <i class="fas fa-handshake"></i>
                        Partnership Opportunities
                    </a>
                    <a href="quote.html" class="inquiry-btn">
                        <i class="fas fa-calculator"></i>
                        Request a Quote
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- FAQ Section -->
    <section class="faq-section">
        <div class="container">
            <div class="text-center">
                <h2 class="section-title">Frequently Asked Questions</h2>
                <p class="section-subtitle">Quick answers to common questions about our services and processes</p>
            </div>
            
            <div class="faq-grid">
                <div class="faq-item">
                    <h3><i class="fas fa-question-circle"></i> How do I request a quote?</h3>
                    <p>You can request a quote by filling out our online form on the "Request a Quote" page, or by emailing projects@divinerock.sl with your project details.</p>
                </div>
                
                <div class="faq-item">
                    <h3><i class="fas fa-question-circle"></i> What information do you need for a project inquiry?</h3>
                    <p>Please provide project type, location, scope of work, estimated timeline, and any specific requirements or drawings available.</p>
                </div>
                
                <div class="faq-item">
                    <h3><i class="fas fa-question-circle"></i> How quickly do you respond to inquiries?</h3>
                    <p>We typically respond to all inquiries within 24-48 hours during business days.</p>
                </div>
                
                <div class="faq-item">
                    <h3><i class="fas fa-question-circle"></i> Do you work with government agencies?</h3>
                    <p>Yes, we actively participate in government tenders and have experience working with public sector clients on infrastructure projects.</p>
                </div>
                
                <div class="faq-item">
                    <h3><i class="fas fa-question-circle"></i> What areas do you serve?</h3>
                    <p>We serve clients throughout Sierra Leone, with project experience in Western Area, Port Loko, Moyamba, Bo, and other regions.</p>
                </div>
                
                <div class="faq-item">
                    <h3><i class="fas fa-question-circle"></i> How can I apply for jobs at Divinerock?</h3>
                    <p>Please send your CV and cover letter to careers@divinerock.sl. Check our News page for current openings.</p>
                </div>
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
            if (link.getAttribute('href') === 'contact.html') {
                link.classList.add('active');
            }
        });
        
        // Contact Form Submission
        const contactForm = document.getElementById('contactForm');
        const successMessage = document.getElementById('successMessage');
        
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Show success message
                successMessage.classList.add('show');
                
                // Scroll to success message
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                // Reset form
                this.reset();
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMessage.classList.remove('show');
                }, 5000);
            });
        }
        
        // Form input animations
        const formControls = document.querySelectorAll('.form-control');
        formControls.forEach(control => {
            control.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            control.addEventListener('blur', function() {
                this.parentElement.classList.remove('focused');
            });
        });
    </script>
</body>
</html>
