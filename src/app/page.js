"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [trips, setTrips] = useState(0);
  const [passengers, setPassengers] = useState(0);
  const [aircraft, setAircraft] = useState(0);
  const [metric1, setMetric1] = useState(0);
  const [metric2, setMetric2] = useState(0);
  const [metric3, setMetric3] = useState(0);
  const [metrics, setMetrics] = useState([0, 0, 0]);
  const metricTargets = [12000, 2000, 15];
  const metricRefs = [useRef(), useRef(), useRef()];
  const [openFaq, setOpenFaq] = useState(null);

  // Testimonial slider state
  const testimonials = [
    {
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      quote: "VMO AERO exceeded all my expectations. The service was impeccable!",
      name: "Jane D.",
      title: "CEO"
    },
    {
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      quote: "Professional, reliable, and truly luxurious. Highly recommended.",
      name: "John S.",
      title: "Entrepreneur"
    },
    {
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
      quote: "The best aircraft management experience I've ever had.",
      name: "Emily R.",
      title: "Pilot"
    }
  ];
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const nextTestimonial = () => setTestimonialIdx((testimonialIdx + 1) % testimonials.length);
  const prevTestimonial = () => setTestimonialIdx((testimonialIdx - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    let tripsTarget = 1240;
    let passengersTarget = 9800;
    let aircraftTarget = 32;
    let m1Target = 12000;
    let m2Target = 2000;
    let m3Target = 15;
    let tripsInterval = setInterval(() => {
      setTrips((prev) => {
        if (prev < tripsTarget) return prev + 20;
        clearInterval(tripsInterval);
        return tripsTarget;
      });
    }, 10);
    let passengersInterval = setInterval(() => {
      setPassengers((prev) => {
        if (prev < passengersTarget) return prev + 100;
        clearInterval(passengersInterval);
        return passengersTarget;
      });
    }, 10);
    let aircraftInterval = setInterval(() => {
      setAircraft((prev) => {
        if (prev < aircraftTarget) return prev + 1;
        clearInterval(aircraftInterval);
        return aircraftTarget;
      });
    }, 80);
    let m1Interval = setInterval(() => {
      setMetric1((prev) => {
        if (prev < m1Target) return prev + 120;
        clearInterval(m1Interval);
        return m1Target;
      });
    }, 10);
    let m2Interval = setInterval(() => {
      setMetric2((prev) => {
        if (prev < m2Target) return prev + 20;
        clearInterval(m2Interval);
        return m2Target;
      });
    }, 10);
    let m3Interval = setInterval(() => {
      setMetric3((prev) => {
        if (prev < m3Target) return prev + 1;
        clearInterval(m3Interval);
        return m3Target;
      });
    }, 80);
    return () => {
      clearInterval(tripsInterval);
      clearInterval(passengersInterval);
      clearInterval(aircraftInterval);
      clearInterval(m1Interval);
      clearInterval(m2Interval);
      clearInterval(m3Interval);
    };
  }, []);

  useEffect(() => {
    function animateMetric(idx) {
      let start = 0;
      const end = metricTargets[idx];
      const duration = 1200;
      const step = Math.max(1, Math.floor(end / (duration / 16)));
      function update() {
        start += step;
        if (start >= end) {
          setMetrics((prev) => {
            const copy = [...prev];
            copy[idx] = end;
            return copy;
          });
          return;
        }
        setMetrics((prev) => {
          const copy = [...prev];
          copy[idx] = start;
          return copy;
        });
        requestAnimationFrame(update);
      }
      update();
    }
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry, idx) => {
          if (entry.isIntersecting) {
            animateMetric(idx);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    metricRefs.forEach((ref, idx) => {
      if (ref.current) observer.observe(ref.current);
    });
    return () => observer.disconnect();
  }, []);

  const handleFaqClick = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="flexjet-hero">
        <Image
          src="/airplane.jpg"
          alt="Hero Background"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
        <div className="flexjet-overlay"></div>
        <div className="flexjet-navbar">
          <div className="flexjet-nav-left">
            <button
              className={`flexjet-hamburger-btn${menuOpen ? " open" : ""}`}
              onClick={() => setMenuOpen((open) => !open)}
              aria-label="Open menu"
            >
              <span className="flexjet-bar"></span>
              <span className="flexjet-bar"></span>
              <span className="flexjet-bar"></span>
            </button>
          </div>
        </div>
        <div className="flexjet-hero-bottom-left">
          <div className="flexjet-hero-line"></div>
          <h1 className="flexjet-hero-title">Driving Innovation and Excellence<br />in Aircraft Management</h1>
          <div className="flexjet-hero-subtitle">Ready to elevate your aviation experience?</div>
          <button className="flexjet-learn-more">Learn More</button>
        </div>
        <div className="flexjet-bottom-text" style={{fontStyle: 'italic', color: '#fff', width: '100%', textAlign: 'center'}}>
          Soar beyond boundaries...
        </div>
      </div>
      {/* Feature Section Below Hero */}
      <section className="flexjet-feature-section">
        <div className="flexjet-feature-headline">
          <h2>YOU WON'T JUST BE FLOWN, YOU'LL BE MOVED</h2>
          <button className="flexjet-feature-cta">ENQUIRE NOW</button>
        </div>
        <div className="flexjet-feature-cards">
          <div>
            <div className="flexjet-feature-card">
              <div className="flexjet-feature-img-wrap">
                <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80" alt="Praetor 600" className="flexjet-feature-img" />
                <div className="flexjet-feature-card-overlay">
                  <h3>PRAETOR 600</h3>
                  <p>EXCEEDING EXCELLENCE<br/>IS OUR ETHOS</p>
                </div>
              </div>
            </div>
            <button className="flexjet-feature-card-btn">DEMO THE PRAETOR 600</button>
          </div>
          <div>
            <div className="flexjet-feature-card">
              <div className="flexjet-feature-img-wrap">
                <img src="https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?auto=format&fit=crop&w=600&q=80" alt="Royal Ascot" className="flexjet-feature-img" />
                <div className="flexjet-feature-card-overlay">
                  <h3>ROYAL ASCOT</h3>
                  <p>JUNE 2025</p>
                </div>
              </div>
            </div>
            <button className="flexjet-feature-card-btn">EVENTS</button>
          </div>
          <div>
            <div className="flexjet-feature-card">
              <div className="flexjet-feature-img-wrap">
                <img src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=600&q=80" alt="Sikorsky S-76" className="flexjet-feature-img" />
                <div className="flexjet-feature-card-overlay">
                  <h3>SIKORSKY S-76</h3>
                  <p>ELEVATE YOUR EXPECTATIONS</p>
                </div>
              </div>
            </div>
            <button className="flexjet-feature-card-btn">DISCOVER MORE</button>
          </div>
        </div>
      </section>

      {/* Metric Counter Section */}
      <section className="flexjet-metrics-section">
        <div className="flexjet-metrics-container">
          {["PASSENGER COUNT", "NUMBER OF TRIPS", "DIGITAL INNOVATION AGENCY OF THE YEAR FINALIST"].map((label, idx) => (
            <div className="flexjet-metric" key={label}>
              <div className="flexjet-metric-value" ref={metricRefs[idx]}>
                {metrics[idx].toLocaleString()}
              </div>
              <div className="flexjet-metric-label">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="flexjet-testimonials-section">
        <h2>What Our Clients Say</h2>
        <div className="flexjet-testimonial-slider">
          <button className="flexjet-testimonial-arrow" onClick={prevTestimonial} aria-label="Previous Testimonial">&#8592;</button>
          <div className="flexjet-testimonial-card visual">
            <img src={testimonials[testimonialIdx].avatar} alt={testimonials[testimonialIdx].name} className="flexjet-testimonial-avatar" />
            <div className="flexjet-testimonial-quote">“{testimonials[testimonialIdx].quote}”</div>
            <div className="flexjet-testimonial-name">{testimonials[testimonialIdx].name}</div>
            <div className="flexjet-testimonial-title">{testimonials[testimonialIdx].title}</div>
          </div>
          <button className="flexjet-testimonial-arrow" onClick={nextTestimonial} aria-label="Next Testimonial">&#8594;</button>
        </div>
        <div className="flexjet-testimonial-dots">
          {testimonials.map((_, idx) => (
            <span
              key={idx}
              className={`flexjet-testimonial-dot${testimonialIdx === idx ? " active" : ""}`}
              onClick={() => setTestimonialIdx(idx)}
            />
          ))}
        </div>
      </section>

      {/* FAQs Section */}
      <section className="flexjet-faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="flexjet-faq-container">
          {[
            {
              q: "What services does VMO AERO offer?",
              a: "We offer comprehensive aircraft management, charter, and maintenance services tailored to your needs.",
            },
            {
              q: "How do I book a flight?",
              a: "You can book a flight by contacting us directly or using our online booking platform.",
            },
            {
              q: "Is my information secure?",
              a: "Yes, we use industry-leading security measures to protect your data and privacy.",
            },
          ].map((item, idx) => (
            <div className={`flexjet-faq-item${openFaq === idx ? " open" : ""}`} key={item.q}>
              <button className="flexjet-faq-question" onClick={() => handleFaqClick(idx)}>
                {item.q}
              </button>
              <div className="flexjet-faq-answer">{item.a}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact/CTA Section */}
      <section className="flexjet-contact-section">
        <h2>Ready to Experience the Difference?</h2>
        <p>Contact us today to learn more about our services or to request a personalized quote.</p>
        <button className="flexjet-contact-btn">Contact Us</button>
      </section>

      {/* Footer */}
      <footer className="flexjet-footer">
        <div className="flexjet-footer-content">
          <span>&copy; {new Date().getFullYear()} VMO AERO. All rights reserved.</span>
          <nav>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Contact</a>
          </nav>
        </div>
      </footer>
    </main>
  );
}
