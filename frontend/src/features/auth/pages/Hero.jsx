import React, { useEffect } from "react";
import "./Hero.css";
import { Link } from "react-router-dom";
import gsap from "gsap";

const Hero = () => {

  useEffect(() => {
    const ctx = gsap.context(() => {

      const tl = gsap.timeline({
        defaults: { ease: "power4.out", duration: 1 }
      });

      // Navbar animation
      tl.from(".logo", {
        y: -30,
        opacity: 0,
        delay: 0.5
      })
      .from(".user-profile", {
        y: -30,
        opacity: 0
      }, "-=0.7")
      // Hero Content
      .from(".hero-header h1", {
        y: 40,
        opacity: 0
      }, "-=0.5")

      .from(".hero-header p", {
        y: 20,
        opacity: 0
      }, "-=0.7")

      // Stats cards
      .from(".stat-card", {
        y: 30,
        opacity: 0,
        stagger: 0.15
      }, "-=0.6")

      // Buttons
      .from(".action-row button", {
        y: 20,
        opacity: 0,
        stagger: 0.1
      }, "-=0.6")

      // Decoration
      .from(".glass-card-decoration", {
        scale: 0.7,
        opacity: 0,
        duration: 1.5
      }, "-=1");
      

    });

    return () => ctx.revert(); // cleanup
  }, []);

  return (
    <div className="hero-container">

      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          SMART<span>AI</span>
        </div>

        <div className="user-profile">
          <div className="status-indicator"></div>
          <h3>AI Active</h3>
        </div>
      </nav>

      <div className="main-layout">

        {/* Sidebar */}
        <aside className="sidebar">
          <div className="sidebar-group">
            <Link to="/AllReport" className="sidebar-link">
              <div className="sidebar-item">My Report</div>
            </Link>

            <div className="sidebar-item">My Resume</div>
          </div>
        </aside>

        {/* Content */}
        <main className="content-area">

          <div className="hero-content-wrapper">

            <header className="hero-header">
              <h1>
                INTELLIGENCE <span>EVOLVED</span>
              </h1>
              <p>
                Welcome back. All systems are operational. Manage your AI reports and resumes.
              </p>
            </header>

            <div className="stats-grid">
              <div className="stat-card">
                <label>Response Time</label>
                <h3>15s</h3>
                <div className="mini-graph">
                  <div className="fill" style={{ width: "40%" }}></div>
                </div>
              </div>

              <div className="stat-card">
                <label>Trial per User</label>
                <h3>3</h3>
              </div>

              <div className="stat-card">
                <label>Status</label>
                <h3>Active</h3>
              </div>
            </div>

            <div className="action-row">
              <Link to="/form">
                <button className="cta-btn primary">+ New Report</button>
              </Link>

              <Link to="/form">
                <button className="cta-btn secondary">+ New Resume</button>
              </Link>
            </div>

          </div>

          <div className="glass-card-decoration"></div>

        </main>
      </div>
    </div>
  );
};

export default Hero;