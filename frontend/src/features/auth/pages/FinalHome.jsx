import "./FinalHome.css";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the scroll plugin
gsap.registerPlugin(ScrollTrigger);

const FinalHome = () => {
  const scope = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out", duration: 1.2 } });

      tl.from(".hero-content .badge", {
        y: 30,
        opacity: 0,
        delay:1,
      })
      .from(".hero-content h1", {
        y: 50,
        opacity: 0,
      },) // Start 0.8s early
      .from(".hero-content p", {
        y: 30,
        opacity: 0,
      }, "-=0.8")
      .from(".hero-content .buttons", {
        y: 20,
        opacity: 0,
      },"-=0.9")
      .from(".hero-gradient-orb", {
        scale: 0.5,
        opacity: 0,
        duration: 2,
      },"-=0.8");

      // --- 2. SECOND SECTION (Scroll Triggered) ---
      gsap.from(".hero-card", {
        scrollTrigger: {
          trigger: ".wrapper",
          start: "top 60%", 
          toggleActions: "play none none none",
          scrub:3,
        },
        y: 100,
        opacity: 0,
        scale: 0.3,
        ease: "power3.out",
      });
    }, scope);

    return () => ctx.revert(); // Cleanup GSAP on unmount
  }, []);

  return (
    <div ref={scope} className="home-main-bg">
      {/* HERO */}
      <header className="hero">
        <div className="hero-content">
          <span className="badge">
            Next-Gen Career Intelligence
          </span>

          <h1>
            Engineered for the <br />
            <span>Elite Professional</span>
          </h1>

          <p>
            Generate interview-winning resumes and comprehensive job market
            reports in seconds.
          </p>

          <div className="buttons">
            <Link to={"/Hero"}>
              <button className="btn primary">
                Build My Resume
              </button>
            </Link>

            <Link to={"/hero"}>
              <button className="btn secondary">
                Get a Job Report
              </button>
            </Link>
          </div>
        </div>

        <div className="hero-gradient-orb"></div>
      </header>

      {/* SECOND SECTION */}
      <div className="wrapper">
        <section className="hero-card">
          <div className="badge">● START TODAY</div>

          <h1>
            Your Dream Job Is <br />
            <span>One Resume Away</span>
          </h1>

          <p>
            No credit card required. Generate your first AI-powered resume free.
          </p>

          <div className="buttons">
            <Link to={"/Hero"}>
              <button className="btn primary">Get Started</button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default FinalHome;