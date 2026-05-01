"use client";

import React from 'react';
import { useState } from 'react';

export default function NewsPage() {

  const [activeCategory, setActiveCategory] = useState('all');
  const categories = [
    ['all', 'All News'],
    ['projects', 'Project Updates'],
    ['announcements', 'Company Announcements'],
    ['industry', 'Industry Insights'],
    ['events', 'Events'],
  ];

  return (
    <>
      <style>{`

        /* Additional styles specific to News page */
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
        
        /* News Introduction */
        .news-intro {
            text-align: center;
            max-width: 800px;
            margin: 0 auto 60px;
        }
        
        .news-intro p {
            font-size: 1.2rem;
            color: #4a5a6a;
            line-height: 1.8;
        }
        
        /* News Categories */
        .news-categories {
            display: flex;
            justify-content: center;
            gap: 15px;
            margin-bottom: 50px;
            flex-wrap: wrap;
        }
        
        .category-btn {
            padding: 10px 25px;
            background: white;
            border: 2px solid #0972C2;
            color: #0972C2;
            font-weight: 600;
            border-radius: 30px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-family: 'Montserrat', sans-serif;
        }
        
        .category-btn:hover,
        .category-btn.active {
            background: #0972C2;
            color: white;
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(9,114,194,0.3);
        }
        
        /* Featured News */
        .featured-news {
            margin-bottom: 60px;
        }
        
        .featured-card {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 40px;
            background: white;
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            border: 1px solid #f0f0f0;
        }
        
        .featured-image {
            height: 100%;
            min-height: 400px;
            overflow: hidden;
        }
        
        .featured-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.5s ease;
        }
        
        .featured-card:hover .featured-image img {
            transform: scale(1.05);
        }
        
        .featured-content {
            padding: 50px 40px;
        }
        
        .featured-tag {
            display: inline-block;
            background: #D83936;
            color: white;
            padding: 5px 20px;
            border-radius: 30px;
            font-size: 0.9rem;
            font-weight: 600;
            margin-bottom: 20px;
        }
        
        .featured-date {
            display: flex;
            align-items: center;
            gap: 10px;
            color: #4a5a6a;
            margin-bottom: 15px;
        }
        
        .featured-date i {
            color: #D83936;
        }
        
        .featured-content h2 {
            font-size: 2.2rem;
            color: #0972C2;
            margin-bottom: 20px;
            line-height: 1.3;
        }
        
        .featured-content p {
            color: #4a5a6a;
            margin-bottom: 25px;
            font-size: 1.1rem;
            line-height: 1.8;
        }
        
        .featured-meta {
            display: flex;
            align-items: center;
            gap: 30px;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #eee;
        }
        
        .featured-author {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .featured-author img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            object-fit: cover;
        }
        
        .featured-author span {
            font-weight: 600;
            color: #0972C2;
        }
        
        .featured-share {
            display: flex;
            gap: 15px;
        }
        
        .featured-share a {
            width: 40px;
            height: 40px;
            background: #F5F7FA;
            color: #0972C2;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
        }
        
        .featured-share a:hover {
            background: #0972C2;
            color: white;
            transform: translateY(-3px);
        }
        
        /* News Grid */
        .news-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 30px;
            margin-top: 40px;
        }
        
        .news-card {
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0,0,0,0.05);
            transition: all 0.3s ease;
            border: 1px solid #f0f0f0;
            height: 100%;
            display: flex;
            flex-direction: column;
        }
        
        .news-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 25px 50px rgba(9,114,194,0.15);
            border-color: #0972C2;
        }
        
        .news-image {
            position: relative;
            height: 220px;
            overflow: hidden;
        }
        
        .news-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.5s ease;
        }
        
        .news-card:hover .news-image img {
            transform: scale(1.1);
        }
        
        .news-category {
            position: absolute;
            top: 15px;
            right: 15px;
            background: #D83936;
            color: white;
            padding: 5px 15px;
            border-radius: 30px;
            font-size: 0.8rem;
            font-weight: 600;
            z-index: 2;
        }
        
        .news-content {
            padding: 25px;
            flex: 1;
            display: flex;
            flex-direction: column;
        }
        
        .news-date {
            display: flex;
            align-items: center;
            gap: 8px;
            color: #4a5a6a;
            font-size: 0.9rem;
            margin-bottom: 12px;
        }
        
        .news-date i {
            color: #D83936;
            font-size: 0.9rem;
        }
        
        .news-content h3 {
            color: #0972C2;
            margin-bottom: 12px;
            font-size: 1.3rem;
            line-height: 1.4;
        }
        
        .news-content p {
            color: #4a5a6a;
            margin-bottom: 20px;
            line-height: 1.7;
            flex: 1;
        }
        
        .news-link {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            color: #0972C2;
            font-weight: 600;
            text-decoration: none;
            transition: all 0.3s ease;
            margin-top: auto;
        }
        
        .news-link i {
            transition: transform 0.3s ease;
        }
        
        .news-link:hover {
            color: #D83936;
        }
        
        .news-link:hover i {
            transform: translateX(5px);
        }
        
        /* Project Updates Section */
        .updates-section {
            background: linear-gradient(135deg, #0972C2 0%, #0a5fa0 100%);
            color: white;
        }
        
        .updates-section .section-title {
            color: white;
        }
        
        .updates-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 30px;
            margin-top: 40px;
        }
        
        .update-card {
            background: rgba(255,255,255,0.1);
            border-radius: 12px;
            padding: 30px;
            backdrop-filter: blur(5px);
            transition: all 0.3s ease;
            border: 1px solid rgba(255,255,255,0.2);
        }
        
        .update-card:hover {
            background: rgba(255,255,255,0.15);
            transform: translateY(-5px);
        }
        
        .update-header {
            display: flex;
            align-items: center;
            gap: 15px;
            margin-bottom: 20px;
        }
        
        .update-icon {
            width: 50px;
            height: 50px;
            background: #D83936;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
        }
        
        .update-meta {
            flex: 1;
        }
        
        .update-project {
            font-weight: 700;
            font-size: 1.1rem;
            margin-bottom: 5px;
        }
        
        .update-date {
            font-size: 0.9rem;
            opacity: 0.8;
        }
        
        .update-card p {
            margin-bottom: 15px;
            line-height: 1.7;
            opacity: 0.95;
        }
        
        .update-progress {
            margin-top: 15px;
        }
        
        .progress-bar {
            height: 8px;
            background: rgba(255,255,255,0.2);
            border-radius: 4px;
            overflow: hidden;
            margin-bottom: 10px;
        }
        
        .progress-fill {
            height: 100%;
            background: #D83936;
            border-radius: 4px;
            transition: width 1s ease;
        }
        
        .progress-stats {
            display: flex;
            justify-content: space-between;
            font-size: 0.9rem;
            opacity: 0.9;
        }
        
        /* Company Announcements */
        .announcements-list {
            max-width: 900px;
            margin: 40px auto 0;
        }
        
        .announcement-item {
            background: white;
            border-radius: 10px;
            padding: 30px;
            margin-bottom: 20px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.03);
            border-left: 4px solid #0972C2;
            transition: all 0.3s ease;
            display: flex;
            gap: 20px;
        }
        
        .announcement-item:hover {
            box-shadow: 0 10px 30px rgba(9,114,194,0.1);
            transform: translateX(5px);
        }
        
        .announcement-icon {
            width: 60px;
            height: 60px;
            background: #0972C2;
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.8rem;
            flex-shrink: 0;
        }
        
        .announcement-content {
            flex: 1;
        }
        
        .announcement-content h3 {
            color: #0972C2;
            margin-bottom: 10px;
            font-size: 1.3rem;
        }
        
        .announcement-meta {
            display: flex;
            gap: 20px;
            margin-bottom: 15px;
            color: #4a5a6a;
            font-size: 0.9rem;
        }
        
        .announcement-meta i {
            color: #D83936;
            margin-right: 5px;
        }
        
        .announcement-content p {
            color: #4a5a6a;
            line-height: 1.7;
        }
        
        /* Industry Insights */
        .insights-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 30px;
            margin-top: 40px;
        }
        
        .insight-card {
            background: white;
            border-radius: 10px;
            padding: 30px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.05);
            transition: all 0.3s ease;
            border: 1px solid #f0f0f0;
            text-align: center;
        }
        
        .insight-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 20px 40px rgba(9,114,194,0.1);
            border-color: #0972C2;
        }
        
        .insight-icon {
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
        
        .insight-card:hover .insight-icon {
            background: #D83936;
            transform: rotateY(360deg);
        }
        
        .insight-card h3 {
            color: #0972C2;
            margin-bottom: 15px;
        }
        
        .insight-card p {
            color: #4a5a6a;
            line-height: 1.7;
        }
        
        /* Pagination */
        .pagination {
            display: flex;
            justify-content: center;
            gap: 10px;
            margin-top: 50px;
        }
        
        .page-link {
            width: 45px;
            height: 45px;
            background: white;
            border: 2px solid #0972C2;
            color: #0972C2;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
            transition: all 0.3s ease;
            cursor: pointer;
        }
        
        .page-link:hover,
        .page-link.active {
            background: #0972C2;
            color: white;
            transform: translateY(-2px);
        }
        
        /* Newsletter Section */
        .newsletter-section {
            background: #F5F7FA;
            text-align: center;
        }
        
        .newsletter-box {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            padding: 50px;
            border-radius: 15px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.05);
        }
        
        .newsletter-box h3 {
            color: #0972C2;
            margin-bottom: 15px;
            font-size: 1.8rem;
        }
        
        .newsletter-box p {
            color: #4a5a6a;
            margin-bottom: 30px;
        }
        
        .newsletter-form {
            display: flex;
            gap: 15px;
        }
        
        .newsletter-input {
            flex: 1;
            padding: 15px;
            border: 2px solid #eee;
            border-radius: 5px;
            font-size: 1rem;
            transition: all 0.3s ease;
        }
        
        .newsletter-input:focus {
            outline: none;
            border-color: #0972C2;
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
            .featured-card {
                grid-template-columns: 1fr;
            }
            
            .featured-image {
                min-height: 300px;
            }
            
            .news-grid,
            .insights-grid {
                grid-template-columns: repeat(2, 1fr);
            }
            
            .updates-grid {
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
            
            .featured-content {
                padding: 30px;
            }
            
            .featured-content h2 {
                font-size: 1.8rem;
            }
            
            .news-grid,
            .insights-grid,
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
            
            .announcement-item {
                flex-direction: column;
                align-items: center;
                text-align: center;
            }
            
            .newsletter-form {
                flex-direction: column;
            }
            
            .featured-meta {
                flex-direction: column;
                align-items: flex-start;
                gap: 15px;
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
          <a href="/equipment">
            Equipment
          </a>
          <a href="/news" className="active">
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
          News & Updates
        </h1>
        <p>
          Stay informed about Divinerock Engineering Services' latest projects, company announcements, and industry insights
        </p>
      </div>
    </section>
    <section>
      <div className="container">
        <div className="news-intro">
          <h2 className="section-title">
            Latest from Divinerock
          </h2>
          <p>
            Follow our journey as we continue to deliver quality infrastructure solutions across Sierra Leone. Get updates on project milestones, company achievements, and industry developments.
          </p>
        </div>
      </div>
    </section>
    <div className="container">
      <div className="news-categories">
        <button className="category-btn active" data-category="all">
          All News
        </button>
        <button className="category-btn" data-category="projects">
          Project Updates
        </button>
        <button className="category-btn" data-category="announcements">
          Company Announcements
        </button>
        <button className="category-btn" data-category="industry">
          Industry Insights
        </button>
        <button className="category-btn" data-category="events">
          Events
        </button>
      </div>
    </div>
    <section className="bg-light" style={{paddingTop: '0'}}>
      <div className="container">
        <div className="featured-news">
          <div className="featured-card">
            <div className="featured-image">
              <img src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&amp;fit=crop&amp;w=1200&amp;q=80" alt="Featured News" />
            </div>
            <div className="featured-content">
              <span className="featured-tag">
                Featured Story
              </span>
              <div className="featured-date">
                <i className="far fa-calendar-alt"></i>
                <span>
                  March 15, 2025
                </span>
                <i className="far fa-clock" style={{marginLeft: '15px'}}></i>
                <span>
                  5 min read
                </span>
              </div>
              <h2>
                Divinerock Completes Major Highway Rehabilitation Project in Western Area
              </h2>
              <p>
                The newly completed 15-kilometer highway connects several communities, significantly reducing travel time and improving access to markets, schools, and healthcare facilities. The project employed over 200 local workers and utilized modern construction techniques to ensure long-term durability.
              </p>
              <p>
                "This project represents our commitment to improving infrastructure and creating economic opportunities for communities across Sierra Leone," said John Kamara, Project Manager at Divinerock Engineering Services.
              </p>
              <div className="featured-meta">
                <div className="featured-author">
                  <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Author" />
                  <span>
                    By John Kamara
                  </span>
                </div>
                <div className="featured-share">
                  <a href="#">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="#">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="#">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                  <a href="#">
                    <i className="fas fa-envelope"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div className="container">
        <h2 className="section-title">
          Recent News
        </h2>
        <div className="news-grid" id="news-grid">
          <div className="news-card" data-category="projects">
            <div className="news-image">
              <img src="https://images.unsplash.com/photo-1590673846749-2c63c1c75e0b?auto=format&amp;fit=crop&amp;w=600&amp;q=80" alt="Bridge Project" />
              <span className="news-category">
                Project Update
              </span>
            </div>
            <div className="news-content">
              <div className="news-date">
                <i className="far fa-calendar-alt"></i>
                <span>
                  March 10, 2025
                </span>
              </div>
              <h3>
                New Bridge Construction Reaches 50% Completion
              </h3>
              <p>
                The reinforced concrete bridge in Port Loko District is progressing ahead of schedule, with foundation works completed and pier construction underway.
              </p>
              <a href="#" className="news-link">
                Read More
                <i className="fas fa-arrow-right"></i>
              </a>
            </div>
          </div>
          <div className="news-card" data-category="announcements">
            <div className="news-image">
              <img src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&amp;fit=crop&amp;w=600&amp;q=80" alt="Safety Milestone" />
              <span className="news-category">
                Announcement
              </span>
            </div>
            <div className="news-content">
              <div className="news-date">
                <i className="far fa-calendar-alt"></i>
                <span>
                  March 5, 2025
                </span>
              </div>
              <h3>
                Divinerock Achieves 500 Days Without Lost-Time Injury
              </h3>
              <p>
                This significant safety milestone reflects our unwavering commitment to maintaining the highest safety standards across all project sites.
              </p>
              <a href="#" className="news-link">
                Read More
                <i className="fas fa-arrow-right"></i>
              </a>
            </div>
          </div>
          <div className="news-card" data-category="industry">
            <div className="news-image">
              <img src="https://images.unsplash.com/photo-1545324451-9ae5c4c0c6b5?auto=format&amp;fit=crop&amp;w=600&amp;q=80" alt="Industry Insights" />
              <span className="news-category">
                Industry Insight
              </span>
            </div>
            <div className="news-content">
              <div className="news-date">
                <i className="far fa-calendar-alt"></i>
                <span>
                  February 28, 2025
                </span>
              </div>
              <h3>
                Sustainable Construction Practices in Sierra Leone
              </h3>
              <p>
                How local engineering firms are adopting environmentally responsible methods to build resilient infrastructure for the future.
              </p>
              <a href="#" className="news-link">
                Read More
                <i className="fas fa-arrow-right"></i>
              </a>
            </div>
          </div>
          <div className="news-card" data-category="events">
            <div className="news-image">
              <img src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&amp;fit=crop&amp;w=600&amp;q=80" alt="Industry Event" />
              <span className="news-category">
                Event
              </span>
            </div>
            <div className="news-content">
              <div className="news-date">
                <i className="far fa-calendar-alt"></i>
                <span>
                  February 20, 2025
                </span>
              </div>
              <h3>
                Divinerock to Exhibit at Sierra Leone Infrastructure Forum 2025
              </h3>
              <p>
                Join us at the annual infrastructure exhibition where we'll showcase our recent projects and discuss future opportunities.
              </p>
              <a href="#" className="news-link">
                Read More
                <i className="fas fa-arrow-right"></i>
              </a>
            </div>
          </div>
          <div className="news-card" data-category="projects">
            <div className="news-image">
              <img src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&amp;fit=crop&amp;w=600&amp;q=80" alt="School Project" />
              <span className="news-category">
                Project Update
              </span>
            </div>
            <div className="news-content">
              <div className="news-date">
                <i className="far fa-calendar-alt"></i>
                <span>
                  February 15, 2025
                </span>
              </div>
              <h3>
                Construction Begins on New Secondary School in Bo
              </h3>
              <p>
                The 12-classroom facility will provide modern learning environments for over 500 students in the region.
              </p>
              <a href="#" className="news-link">
                Read More
                <i className="fas fa-arrow-right"></i>
              </a>
            </div>
          </div>
          <div className="news-card" data-category="announcements">
            <div className="news-image">
              <img src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&amp;fit=crop&amp;w=600&amp;q=80" alt="Equipment Upgrade" />
              <span className="news-category">
                Announcement
              </span>
            </div>
            <div className="news-content">
              <div className="news-date">
                <i className="far fa-calendar-alt"></i>
                <span>
                  February 10, 2025
                </span>
              </div>
              <h3>
                Fleet Expansion: New Excavators Arrive
              </h3>
              <p>
                Three new 30-ton excavators have been added to our equipment fleet, increasing our earthworks capacity by 40%.
              </p>
              <a href="#" className="news-link">
                Read More
                <i className="fas fa-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="pagination">
          <span className="page-link active">
            1
          </span>
          <span className="page-link">
            2
          </span>
          <span className="page-link">
            3
          </span>
          <span className="page-link">
            <i className="fas fa-chevron-right"></i>
          </span>
        </div>
      </div>
    </section>
    <section className="updates-section">
      <div className="container">
        <h2 className="section-title">
          Ongoing Project Updates
        </h2>
        <p className="section-subtitle" style={{color: 'rgba(255,255,255,0.9)'}}>
          Real-time progress on our current construction projects
        </p>
        <div className="updates-grid">
          <div className="update-card">
            <div className="update-header">
              <div className="update-icon">
                <i className="fas fa-road"></i>
              </div>
              <div className="update-meta">
                <div className="update-project">
                  Highway Rehabilitation Project
                </div>
                <div className="update-date">
                  <i className="far fa-calendar-alt"></i>
                  Updated: March 14, 2025
                </div>
              </div>
            </div>
            <p>
              Asphalt paving is now 75% complete. Drainage installation finished. Expected completion: May 2025.
            </p>
            <div className="update-progress">
              <div className="progress-bar">
                <div className="progress-fill" style={{width: '75%'}}></div>
              </div>
              <div className="progress-stats">
                <span>
                  Overall Progress
                </span>
                <span>
                  75%
                </span>
              </div>
            </div>
          </div>
          <div className="update-card">
            <div className="update-header">
              <div className="update-icon">
                <i className="fas fa-bridge"></i>
              </div>
              <div className="update-meta">
                <div className="update-project">
                  Moyamba Bridge Construction
                </div>
                <div className="update-date">
                  <i className="far fa-calendar-alt"></i>
                  Updated: March 12, 2025
                </div>
              </div>
            </div>
            <p>
              Pier construction underway. Foundation works completed. On track for Q3 2025 completion.
            </p>
            <div className="update-progress">
              <div className="progress-bar">
                <div className="progress-fill" style={{width: '45%'}}></div>
              </div>
              <div className="progress-stats">
                <span>
                  Overall Progress
                </span>
                <span>
                  45%
                </span>
              </div>
            </div>
          </div>
          <div className="update-card">
            <div className="update-header">
              <div className="update-icon">
                <i className="fas fa-school"></i>
              </div>
              <div className="update-meta">
                <div className="update-project">
                  Bo Educational Facility
                </div>
                <div className="update-date">
                  <i className="far fa-calendar-alt"></i>
                  Updated: March 10, 2025
                </div>
              </div>
            </div>
            <p>
              Foundation completed. Wall construction in progress. Materials delivered for next phase.
            </p>
            <div className="update-progress">
              <div className="progress-bar">
                <div className="progress-fill" style={{width: '30%'}}></div>
              </div>
              <div className="progress-stats">
                <span>
                  Overall Progress
                </span>
                <span>
                  30%
                </span>
              </div>
            </div>
          </div>
          <div className="update-card">
            <div className="update-header">
              <div className="update-icon">
                <i className="fas fa-tools"></i>
              </div>
              <div className="update-meta">
                <div className="update-project">
                  Industrial Fabrication Project
                </div>
                <div className="update-date">
                  <i className="far fa-calendar-alt"></i>
                  Updated: March 8, 2025
                </div>
              </div>
            </div>
            <p>
              Steel fabrication 60% complete. Installation to begin April 2025.
            </p>
            <div className="update-progress">
              <div className="progress-bar">
                <div className="progress-fill" style={{width: '60%'}}></div>
              </div>
              <div className="progress-stats">
                <span>
                  Overall Progress
                </span>
                <span>
                  60%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div className="container">
        <h2 className="section-title">
          Company Announcements
        </h2>
        <p className="section-subtitle">
          Important updates and news from Divinerock Engineering Services
        </p>
        <div className="announcements-list">
          <div className="announcement-item">
            <div className="announcement-icon">
              <i className="fas fa-trophy"></i>
            </div>
            <div className="announcement-content">
              <h3>
                Divinerock Wins Safety Excellence Award
              </h3>
              <div className="announcement-meta">
                <span>
                  <i className="far fa-calendar-alt"></i>
                  March 1, 2025
                </span>
                <span>
                  <i className="fas fa-tag"></i>
                  Award
                </span>
              </div>
              <p>
                We are proud to announce that Divinerock Engineering Services has received the Safety Excellence Award from the Sierra Leone Construction Industry Association for our outstanding safety record in 2024.
              </p>
            </div>
          </div>
          <div className="announcement-item">
            <div className="announcement-icon">
              <i className="fas fa-user-plus"></i>
            </div>
            <div className="announcement-content">
              <h3>
                New Team Members Join Divinerock
              </h3>
              <div className="announcement-meta">
                <span>
                  <i className="far fa-calendar-alt"></i>
                  February 20, 2025
                </span>
                <span>
                  <i className="fas fa-tag"></i>
                  Team
                </span>
              </div>
              <p>
                We welcome two new senior engineers to our team: Fatmata Bangura (Structural Engineer) and Mohamed Koroma (Geotechnical Specialist).
              </p>
            </div>
          </div>
          <div className="announcement-item">
            <div className="announcement-icon">
              <i className="fas fa-certificate"></i>
            </div>
            <div className="announcement-content">
              <h3>
                ISO 9001:2015 Certification Renewed
              </h3>
              <div className="announcement-meta">
                <span>
                  <i className="far fa-calendar-alt"></i>
                  February 10, 2025
                </span>
                <span>
                  <i className="fas fa-tag"></i>
                  Certification
                </span>
              </div>
              <p>
                We are pleased to announce the successful renewal of our ISO 9001:2015 Quality Management certification following a comprehensive audit.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="bg-light">
      <div className="container">
        <h2 className="section-title">
          Industry Insights
        </h2>
        <p className="section-subtitle">
          Expert perspectives on construction and engineering in Sierra Leone
        </p>
        <div className="insights-grid">
          <div className="insight-card">
            <div className="insight-icon">
              <i className="fas fa-chart-line"></i>
            </div>
            <h3>
              Infrastructure Outlook 2025
            </h3>
            <p>
              Analysis of upcoming infrastructure projects and opportunities in Sierra Leone's construction sector.
            </p>
          </div>
          <div className="insight-card">
            <div className="insight-icon">
              <i className="fas fa-leaf"></i>
            </div>
            <h3>
              Sustainable Construction
            </h3>
            <p>
              How eco-friendly building practices are transforming the local construction industry.
            </p>
          </div>
          <div className="insight-card">
            <div className="insight-icon">
              <i className="fas fa-hard-hat"></i>
            </div>
            <h3>
              Workforce Development
            </h3>
            <p>
              Addressing the skills gap in Sierra Leone's engineering and construction workforce.
            </p>
          </div>
        </div>
      </div>
    </section>
    <section className="newsletter-section">
      <div className="container">
        <div className="newsletter-box">
          <i className="fas fa-envelope-open-text" style={{fontSize: '3rem', color: '#0972C2', marginBottom: '20px'}}></i>
          <h3>
            Subscribe to Our Newsletter
          </h3>
          <p>
            Get the latest news, project updates, and industry insights delivered straight to your inbox.
          </p>
          <form className="newsletter-form">
            <input type="email" className="newsletter-input" placeholder="Enter your email address" required="" />
            <button type="submit" className="btn btn-primary">
              Subscribe
            </button>
          </form>
          <p style={{fontSize: '0.9rem', marginTop: '20px', color: '#4a5a6a'}}>
            We respect your privacy. Unsubscribe at any time.
          </p>
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

