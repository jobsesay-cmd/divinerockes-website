<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Request a Quote - Divinerock Engineering Services</title>
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Open+Sans:wght@300;400;600;700&display=swap" rel="stylesheet">
    <!-- Font Awesome for icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <!-- Link to global CSS -->
    <link rel="stylesheet" href="css/style.css">
    <style>
        /* Additional styles specific to Quote page */
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
            margin: 0 auto;
            opacity: 0.95;
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
        
        /* Quote Introduction */
        .quote-intro {
            text-align: center;
            max-width: 800px;
            margin: 0 auto 60px;
        }
        
        .quote-intro p {
            font-size: 1.2rem;
            color: #4a5a6a;
            line-height: 1.8;
        }
        
        /* Quote Form */
        .quote-form-wrapper {
            background: white;
            border-radius: 20px;
            box-shadow: 0 30px 60px rgba(0,0,0,0.1);
            overflow: hidden;
            border: 1px solid #f0f0f0;
            margin-bottom: 60px;
        }
        
        .form-header {
            background: #0972C2;
            color: white;
            padding: 40px;
            text-align: center;
        }
        
        .form-header h2 {
            color: white;
            font-size: 2rem;
            margin-bottom: 10px;
        }
        
        .form-header p {
            opacity: 0.95;
            font-size: 1.1rem;
        }
        
        .form-header i {
            font-size: 3rem;
            margin-bottom: 20px;
            color: #D83936;
        }
        
        .form-body {
            padding: 50px;
        }
        
        .form-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 25px;
            margin-bottom: 25px;
        }
        
        .form-group {
            margin-bottom: 25px;
        }
        
        .form-label {
            display: block;
            margin-bottom: 8px;
            font-weight: 600;
            color: #2c3e50;
        }
        
        .form-label i {
            color: #D83936;
            margin-right: 8px;
            width: 20px;
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
        
        .form-control.error {
            border-color: #D83936;
        }
        
        .error-message {
            color: #D83936;
            font-size: 0.9rem;
            margin-top: 5px;
            display: none;
        }
        
        .error-message.show {
            display: block;
        }
        
        select.form-control {
            cursor: pointer;
            appearance: none;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%230972C2' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
            background-repeat: no-repeat;
            background-position: right 15px center;
            background-size: 16px;
        }
        
        textarea.form-control {
            resize: vertical;
            min-height: 150px;
        }
        
        .form-check {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 30px;
            padding: 15px;
            background: #F5F7FA;
            border-radius: 8px;
        }
        
        .form-check input {
            width: 20px;
            height: 20px;
            cursor: pointer;
        }
        
        .form-check label {
            color: #2c3e50;
            cursor: pointer;
            flex: 1;
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
        
        .btn:disabled {
            opacity: 0.6;
            cursor: not-allowed;
        }
        
        /* Progress Bar */
        .form-progress {
            display: flex;
            justify-content: space-between;
            margin-bottom: 40px;
            position: relative;
        }
        
        .form-progress::before {
            content: '';
            position: absolute;
            top: 15px;
            left: 0;
            width: 100%;
            height: 2px;
            background: #eee;
            z-index: 1;
        }
        
        .progress-step {
            position: relative;
            z-index: 2;
            background: white;
            text-align: center;
            flex: 1;
        }
        
        .step-number {
            width: 30px;
            height: 30px;
            background: #eee;
            color: #4a5a6a;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 10px;
            font-weight: 600;
            transition: all 0.3s ease;
        }
        
        .progress-step.active .step-number {
            background: #0972C2;
            color: white;
        }
        
        .progress-step.completed .step-number {
            background: #D83936;
            color: white;
        }
        
        .step-label {
            font-size: 0.9rem;
            color: #4a5a6a;
        }
        
        .progress-step.active .step-label {
            color: #0972C2;
            font-weight: 600;
        }
        
        /* Success Message */
        .success-message {
            text-align: center;
            padding: 60px 40px;
            background: white;
            border-radius: 20px;
            box-shadow: 0 30px 60px rgba(0,0,0,0.1);
            display: none;
        }
        
        .success-message.show {
            display: block;
            animation: fadeInUp 0.5s ease;
        }
        
        .success-icon {
            width: 100px;
            height: 100px;
            background: #4CAF50;
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 3rem;
            margin: 0 auto 30px;
            animation: pulse 1s ease;
        }
        
        .success-message h2 {
            color: #0972C2;
            margin-bottom: 15px;
            font-size: 2.2rem;
        }
        
        .success-message p {
            color: #4a5a6a;
            margin-bottom: 30px;
            font-size: 1.1rem;
        }
        
        .success-details {
            background: #F5F7FA;
            padding: 25px;
            border-radius: 10px;
            margin: 30px 0;
            text-align: left;
        }
        
        .success-details h4 {
            color: #0972C2;
            margin-bottom: 15px;
        }
        
        .success-details ul {
            list-style: none;
        }
        
        .success-details li {
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            gap: 10px;
            color: #2c3e50;
        }
        
        .success-details i {
            color: #4CAF50;
        }
        
        /* Why Choose Section */
        .why-choose-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 25px;
            margin-top: 40px;
        }
        
        .why-item {
            text-align: center;
            padding: 30px;
            background: white;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.05);
            transition: all 0.3s ease;
            border: 1px solid #f0f0f0;
        }
        
        .why-item:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 40px rgba(9,114,194,0.1);
            border-color: #0972C2;
        }
        
        .why-icon {
            width: 70px;
            height: 70px;
            background: #0972C2;
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.8rem;
            margin: 0 auto 20px;
            transition: all 0.3s ease;
        }
        
        .why-item:hover .why-icon {
            background: #D83936;
            transform: rotateY(360deg);
        }
        
        .why-item h4 {
            color: #0972C2;
            margin-bottom: 10px;
        }
        
        .why-item p {
            color: #4a5a6a;
            font-size: 0.95rem;
        }
        
        /* Testimonials */
        .testimonials-section {
            background: linear-gradient(135deg, #0972C2 0%, #0a5fa0 100%);
            color: white;
        }
        
        .testimonials-section .section-title {
            color: white;
        }
        
        .testimonial-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 30px;
            margin-top: 40px;
        }
        
        .testimonial-card {
            background: rgba(255,255,255,0.1);
            padding: 30px;
            border-radius: 10px;
            backdrop-filter: blur(5px);
            border: 1px solid rgba(255,255,255,0.2);
            transition: all 0.3s ease;
        }
        
        .testimonial-card:hover {
            transform: translateY(-5px);
            background: rgba(255,255,255,0.15);
        }
        
        .testimonial-content {
            margin-bottom: 20px;
            font-style: italic;
            line-height: 1.8;
        }
        
        .testimonial-content i {
            color: #D83936;
            margin-right: 5px;
        }
        
        .testimonial-author {
            display: flex;
            align-items: center;
            gap: 15px;
        }
        
        .testimonial-author img {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            object-fit: cover;
            border: 3px solid #D83936;
        }
        
        .author-info h4 {
            color: white;
            margin-bottom: 5px;
        }
        
        .author-info p {
            opacity: 0.9;
            font-size: 0.9rem;
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
            .why-choose-grid {
                grid-template-columns: repeat(2, 1fr);
            }
            
            .testimonial-grid {
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
            
            .form-row {
                grid-template-columns: 1fr;
            }
            
            .why-choose-grid {
                grid-template-columns: 1fr;
            }
            
            .form-progress {
                flex-direction: column;
                gap: 20px;
                align-items: flex-start;
            }
            
            .form-progress::before {
                display: none;
            }
            
            .progress-step {
                display: flex;
                align-items: center;
                gap: 15px;
                width: 100%;
            }
            
            .step-number {
                margin: 0;
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
            
            .form-body {
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
                <a href="contact.html">Contact</a>
                <a href="quote.html" class="quote-btn active">Request a Quote</a>
            </nav>
        </div>
    </header>

    <!-- Page Banner -->
    <section class="page-banner">
        <div class="container">
            <h1>Request a Quote</h1>
            <p>Tell us about your project and we'll provide a comprehensive, competitive quote within 48 hours</p>
        </div>
    </section>

    <!-- Quote Introduction -->
    <section style="padding-bottom: 0;">
        <div class="container">
            <div class="quote-intro">
                <h2 class="section-title">Let's Build Together</h2>
                <p>Fill out the form below with your project details. Our team will review your requirements and prepare a detailed quotation tailored to your specific needs. All quotes include comprehensive breakdown of costs, timelines, and deliverables.</p>
            </div>
        </div>
    </section>

    <!-- Quote Form Section -->
    <section>
        <div class="container">
            <!-- Success Message -->
            <div class="success-message" id="successMessage">
                <div class="success-icon">
                    <i class="fas fa-check"></i>
                </div>
                <h2>Thank You for Your Inquiry!</h2>
                <p>Your quote request has been submitted successfully. Our team will review your project details and get back to you within 48 hours.</p>
                
                <div class="success-details">
                    <h4>What happens next?</h4>
                    <ul>
                        <li><i class="fas fa-check-circle"></i> You'll receive a confirmation email shortly</li>
                        <li><i class="fas fa-check-circle"></i> Our project manager will review your requirements</li>
                        <li><i class="fas fa-check-circle"></i> We may contact you for additional details</li>
                        <li><i class="fas fa-check-circle"></i> You'll receive a detailed quote within 48 hours</li>
                    </ul>
                </div>
                
                <a href="index.html" class="btn btn-primary">Return to Home</a>
            </div>

            <!-- Quote Form -->
            <div class="quote-form-wrapper" id="quoteForm">
                <div class="form-header">
                    <i class="fas fa-file-invoice"></i>
                    <h2>Project Quote Request</h2>
                    <p>Please provide as much detail as possible to help us prepare an accurate quote</p>
                </div>
                
                <!-- Form Progress -->
                <div class="form-body">
                    <div class="form-progress">
                        <div class="progress-step active" id="step1">
                            <div class="step-number">1</div>
                            <div class="step-label">Project Info</div>
                        </div>
                        <div class="progress-step" id="step2">
                            <div class="step-number">2</div>
                            <div class="step-label">Project Details</div>
                        </div>
                        <div class="progress-step" id="step3">
                            <div class="step-number">3</div>
                            <div class="step-label">Contact Information</div>
                        </div>
                    </div>
                    
                    <form id="quoteRequestForm">
                        <!-- Step 1: Project Info -->
                        <div class="form-step" id="step1-content">
                            <div class="form-group">
                                <label class="form-label">
                                    <i class="fas fa-tag"></i>
                                    Project Type *
                                </label>
                                <select class="form-control" id="projectType" required>
                                    <option value="">Select project type</option>
                                    <option value="construction">Construction Services</option>
                                    <option value="civil">Civil Engineering & Infrastructure</option>
                                    <option value="fabrication">Fabrication & Metal Works</option>
                                    <option value="project-management">Project Management & Consultancy</option>
                                    <option value="renovation">Renovation & Maintenance</option>
                                    <option value="engineering">Engineering Consultancy</option>
                                    <option value="other">Other</option>
                                </select>
                                <div class="error-message" id="projectTypeError">Please select a project type</div>
                            </div>
                            
                            <div class="form-row">
                                <div class="form-group">
                                    <label class="form-label">
                                        <i class="fas fa-map-marker-alt"></i>
                                        Project Location *
                                    </label>
                                    <input type="text" class="form-control" id="location" placeholder="City/District, Sierra Leone" required>
                                    <div class="error-message" id="locationError">Please enter project location</div>
                                </div>
                                
                                <div class="form-group">
                                    <label class="form-label">
                                        <i class="fas fa-money-bill-wave"></i>
                                        Budget Range
                                    </label>
                                    <select class="form-control" id="budget">
                                        <option value="">Select budget range</option>
                                        <option value="under-50k">Under $50,000</option>
                                        <option value="50k-100k">$50,000 - $100,000</option>
                                        <option value="100k-250k">$100,000 - $250,000</option>
                                        <option value="250k-500k">$250,000 - $500,000</option>
                                        <option value="500k-1m">$500,000 - $1 million</option>
                                        <option value="over-1m">Over $1 million</option>
                                        <option value="not-specified">Not specified</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div class="form-row">
                                <div class="form-group">
                                    <label class="form-label">
                                        <i class="fas fa-calendar-alt"></i>
                                        Expected Start Date
                                    </label>
                                    <input type="date" class="form-control" id="startDate">
                                </div>
                                
                                <div class="form-group">
                                    <label class="form-label">
                                        <i class="fas fa-clock"></i>
                                        Project Duration
                                    </label>
                                    <select class="form-control" id="duration">
                                        <option value="">Select expected duration</option>
                                        <option value="under-3">Under 3 months</option>
                                        <option value="3-6">3-6 months</option>
                                        <option value="6-12">6-12 months</option>
                                        <option value="over-12">Over 12 months</option>
                                        <option value="not-specified">Not specified</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div style="text-align: right; margin-top: 30px;">
                                <button type="button" class="btn btn-primary" onclick="nextStep(2)">Next Step <i class="fas fa-arrow-right"></i></button>
                            </div>
                        </div>
                        
                        <!-- Step 2: Project Details -->
                        <div class="form-step" id="step2-content" style="display: none;">
                            <div class="form-group">
                                <label class="form-label">
                                    <i class="fas fa-clipboard-list"></i>
                                    Project Scope / Description *
                                </label>
                                <textarea class="form-control" id="description" placeholder="Please describe your project in detail. Include information about size, specifications, materials, and any special requirements..." required></textarea>
                                <div class="error-message" id="descriptionError">Please describe your project</div>
                            </div>
                            
                            <div class="form-group">
                                <label class="form-label">
                                    <i class="fas fa-file-alt"></i>
                                    Specific Requirements
                                </label>
                                <textarea class="form-control" id="requirements" placeholder="List any specific technical requirements, materials, or standards that need to be met..."></textarea>
                            </div>
                            
                            <div class="form-row">
                                <div class="form-group">
                                    <label class="form-label">
                                        <i class="fas fa-ruler-combined"></i>
                                        Project Size / Scale
                                    </label>
                                    <input type="text" class="form-control" id="size" placeholder="e.g., 500 sq meters, 2 km road, etc.">
                                </div>
                                
                                <div class="form-group">
                                    <label class="form-label">
                                        <i class="fas fa-hard-hat"></i>
                                        Number of Personnel Needed
                                    </label>
                                    <input type="number" class="form-control" id="personnel" placeholder="Estimated workforce required">
                                </div>
                            </div>
                            
                            <div class="form-group">
                                <label class="form-label">
                                    <i class="fas fa-paperclip"></i>
                                    Upload Supporting Documents (Optional)
                                </label>
                                <input type="file" class="form-control" id="documents" multiple accept=".pdf,.doc,.docx,.dwg,.jpg,.png">
                                <small style="color: #4a5a6a;">You can upload drawings, specifications, or any relevant documents (Max 10MB)</small>
                            </div>
                            
                            <div style="display: flex; justify-content: space-between; margin-top: 30px;">
                                <button type="button" class="btn btn-outline" onclick="prevStep(1)"><i class="fas fa-arrow-left"></i> Previous</button>
                                <button type="button" class="btn btn-primary" onclick="nextStep(3)">Next Step <i class="fas fa-arrow-right"></i></button>
                            </div>
                        </div>
                        
                        <!-- Step 3: Contact Information -->
                        <div class="form-step" id="step3-content" style="display: none;">
                            <div class="form-row">
                                <div class="form-group">
                                    <label class="form-label">
                                        <i class="fas fa-user"></i>
                                        Full Name *
                                    </label>
                                    <input type="text" class="form-control" id="fullName" placeholder="John Doe" required>
                                    <div class="error-message" id="nameError">Please enter your full name</div>
                                </div>
                                
                                <div class="form-group">
                                    <label class="form-label">
                                        <i class="fas fa-building"></i>
                                        Company/Organization
                                    </label>
                                    <input type="text" class="form-control" id="company" placeholder="Company name (if applicable)">
                                </div>
                            </div>
                            
                            <div class="form-row">
                                <div class="form-group">
                                    <label class="form-label">
                                        <i class="fas fa-envelope"></i>
                                        Email Address *
                                    </label>
                                    <input type="email" class="form-control" id="email" placeholder="your@email.com" required>
                                    <div class="error-message" id="emailError">Please enter a valid email address</div>
                                </div>
                                
                                <div class="form-group">
                                    <label class="form-label">
                                        <i class="fas fa-phone"></i>
                                        Phone Number *
                                    </label>
                                    <input type="tel" class="form-control" id="phone" placeholder="+232 XX XXX XXX" required>
                                    <div class="error-message" id="phoneError">Please enter your phone number</div>
                                </div>
                            </div>
                            
                            <div class="form-group">
                                <label class="form-label">
                                    <i class="fas fa-clock"></i>
                                    Preferred Contact Time
                                </label>
                                <select class="form-control" id="contactTime">
                                    <option value="anytime">Anytime</option>
                                    <option value="morning">Morning (8 AM - 12 PM)</option>
                                    <option value="afternoon">Afternoon (12 PM - 5 PM)</option>
                                    <option value="evening">Evening (5 PM - 8 PM)</option>
                                </select>
                            </div>
                            
                            <div class="form-group">
                                <label class="form-label">
                                    <i class="fas fa-comment"></i>
                                    Additional Comments
                                </label>
                                <textarea class="form-control" id="comments" placeholder="Any other information you'd like us to know..."></textarea>
                            </div>
                            
                            <div class="form-check">
                                <input type="checkbox" id="privacy" required>
                                <label for="privacy">I agree to the <a href="#">Privacy Policy</a> and consent to being contacted about my project. *</label>
                            </div>
                            
                            <div style="display: flex; justify-content: space-between; margin-top: 30px;">
                                <button type="button" class="btn btn-outline" onclick="prevStep(2)"><i class="fas fa-arrow-left"></i> Previous</button>
                                <button type="submit" class="btn btn-accent btn-large">Submit Quote Request <i class="fas fa-paper-plane"></i></button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>

    <!-- Why Choose Us Section -->
    <section class="bg-light">
        <div class="container">
            <div class="text-center">
                <h2 class="section-title">Why Choose Divinerock</h2>
                <p class="section-subtitle">When you request a quote from us, you're getting more than just a price</p>
            </div>
            
            <div class="why-choose-grid">
                <div class="why-item">
                    <div class="why-icon">
                        <i class="fas fa-clock"></i>
                    </div>
                    <h4>48-Hour Response</h4>
                    <p>We provide detailed quotes within 48 hours of receiving your request</p>
                </div>
                
                <div class="why-item">
                    <div class="why-icon">
                        <i class="fas fa-file-invoice"></i>
                    </div>
                    <h4>Detailed Breakdown</h4>
                    <p>Transparent pricing with full breakdown of costs, materials, and labor</p>
                </div>
                
                <div class="why-item">
                    <div class="why-icon">
                        <i class="fas fa-calendar-check"></i>
                    </div>
                    <h4>Project Timeline</h4>
                    <p>Clear project milestones and completion schedule included</p>
                </div>
                
                <div class="why-item">
                    <div class="why-icon">
                        <i class="fas fa-handshake"></i>
                    </div>
                    <h4>No Obligation</h4>
                    <p>Free quotes with no commitment required</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Testimonials Section -->
    <section class="testimonials-section">
        <div class="container">
            <div class="text-center">
                <h2 class="section-title">What Our Clients Say</h2>
                <p style="color: rgba(255,255,255,0.9); margin-bottom: 40px;">Trusted by leading organizations across Sierra Leone</p>
            </div>
            
            <div class="testimonial-grid">
                <div class="testimonial-card">
                    <div class="testimonial-content">
                        <i class="fas fa-quote-left"></i>
                        Divinerock provided the most comprehensive quote we received. Their attention to detail and professional approach gave us confidence from day one.
                    </div>
                    <div class="testimonial-author">
                        <img src="https://randomuser.me/api/portraits/men/45.jpg" alt="Client">
                        <div class="author-info">
                            <h4>James Koroma</h4>
                            <p>Project Director, Ministry of Works</p>
                        </div>
                    </div>
                </div>
                
                <div class="testimonial-card">
                    <div class="testimonial-content">
                        <i class="fas fa-quote-left"></i>
                        The quoting process was smooth and transparent. They took time to understand our requirements and delivered a quote that matched our budget perfectly.
                    </div>
                    <div class="testimonial-author">
                        <img src="https://randomuser.me/api/portraits/women/32.jpg" alt="Client">
                        <div class="author-info">
                            <h4>Mariatu Sesay</h4>
                            <p>CEO, Sesay Construction Ltd</p>
                        </div>
                    </div>
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
            if (link.getAttribute('href') === 'quote.html') {
                link.classList.add('active');
            }
        });
        
        // Multi-step form
        let currentStep = 1;
        
        function showStep(step) {
            document.getElementById('step1-content').style.display = 'none';
            document.getElementById('step2-content').style.display = 'none';
            document.getElementById('step3-content').style.display = 'none';
            
            document.getElementById(`step${step}-content`).style.display = 'block';
            
            // Update progress indicators
            document.querySelectorAll('.progress-step').forEach((el, index) => {
                const stepNum = index + 1;
                el.classList.remove('active', 'completed');
                
                if (stepNum === step) {
                    el.classList.add('active');
                } else if (stepNum < step) {
                    el.classList.add('completed');
                }
            });
            
            currentStep = step;
        }
        
        function nextStep(step) {
            // Validate current step
            if (currentStep === 1) {
                const projectType = document.getElementById('projectType').value;
                const location = document.getElementById('location').value;
                
                if (!projectType) {
                    document.getElementById('projectTypeError').classList.add('show');
                    return;
                } else {
                    document.getElementById('projectTypeError').classList.remove('show');
                }
                
                if (!location) {
                    document.getElementById('locationError').classList.add('show');
                    return;
                } else {
                    document.getElementById('locationError').classList.remove('show');
                }
            }
            
            if (currentStep === 2) {
                const description = document.getElementById('description').value;
                
                if (!description) {
                    document.getElementById('descriptionError').classList.add('show');
                    return;
                } else {
                    document.getElementById('descriptionError').classList.remove('show');
                }
            }
            
            showStep(step);
        }
        
        function prevStep(step) {
            showStep(step);
        }
        
        // Form submission
        const quoteForm = document.getElementById('quoteRequestForm');
        const quoteFormWrapper = document.getElementById('quoteForm');
        const successMessage = document.getElementById('successMessage');
        
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate step 3
            const fullName = document.getElementById('fullName').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const privacy = document.getElementById('privacy').checked;
            
            let isValid = true;
            
            if (!fullName) {
                document.getElementById('nameError').classList.add('show');
                isValid = false;
            } else {
                document.getElementById('nameError').classList.remove('show');
            }
            
            if (!email || !email.includes('@')) {
                document.getElementById('emailError').classList.add('show');
                isValid = false;
            } else {
                document.getElementById('emailError').classList.remove('show');
            }
            
            if (!phone) {
                document.getElementById('phoneError').classList.add('show');
                isValid = false;
            } else {
                document.getElementById('phoneError').classList.remove('show');
            }
            
            if (!privacy) {
                alert('Please agree to the Privacy Policy');
                isValid = false;
            }
            
            if (isValid) {
                // Show success message
                quoteFormWrapper.style.display = 'none';
                successMessage.classList.add('show');
                
                // Scroll to success message
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                // Log form data (in real application, this would be sent to server)
                const formData = {
                    projectType: document.getElementById('projectType').value,
                    location: document.getElementById('location').value,
                    budget: document.getElementById('budget').value,
                    startDate: document.getElementById('startDate').value,
                    duration: document.getElementById('duration').value,
                    description: document.getElementById('description').value,
                    requirements: document.getElementById('requirements').value,
                    size: document.getElementById('size').value,
                    personnel: document.getElementById('personnel').value,
                    fullName: fullName,
                    company: document.getElementById('company').value,
                    email: email,
                    phone: phone,
                    contactTime: document.getElementById('contactTime').value,
                    comments: document.getElementById('comments').value
                };
                
                console.log('Quote Request Submitted:', formData);
            }
        });
        
        // Real-time validation
        document.getElementById('projectType').addEventListener('change', function() {
            if (this.value) {
                document.getElementById('projectTypeError').classList.remove('show');
            }
        });
        
        document.getElementById('location').addEventListener('input', function() {
            if (this.value) {
                document.getElementById('locationError').classList.remove('show');
            }
        });
        
        document.getElementById('description').addEventListener('input', function() {
            if (this.value) {
                document.getElementById('descriptionError').classList.remove('show');
            }
        });
        
        document.getElementById('fullName').addEventListener('input', function() {
            if (this.value) {
                document.getElementById('nameError').classList.remove('show');
            }
        });
        
        document.getElementById('email').addEventListener('input', function() {
            if (this.value && this.value.includes('@')) {
                document.getElementById('emailError').classList.remove('show');
            }
        });
        
        document.getElementById('phone').addEventListener('input', function() {
            if (this.value) {
                document.getElementById('phoneError').classList.remove('show');
            }
        });
        
        // Initialize first step
        showStep(1);
    </script>
</body>
</html>            animation: fadeInUp 0.8s ease 0.2s both;
        }
        

