import { useNavigate } from 'react-router-dom';
import './Home.css';
import heroImage from '../assets/hero.png';

function Home() {
  const navigate = useNavigate();
  return (
    <div className="home">
      {/* Navbar */}
      <nav className="navbar">
        <h2 className="logo">MemoME</h2>
        <div className="nav-buttons">
          <button className="login-btn" onClick={() => navigate('/login')}>Log in</button>
          <button className="schedule-btn">Schedule</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-orb hero-orb--1" />
        <div className="hero-orb hero-orb--2" />
        <div className="hero-content">
          <div className="hero-text">
            <h1>Say Hello to your <span className="hero-gradient-word">Future!</span></h1>
            <p>Send messages to your future self with a click — capture moments, emotions, and memories to revisit later.</p>
            <div className="hero-cta-row">
              <button className="create-btn" onClick={() => navigate(localStorage.getItem('memome_token') ? '/dashboard' : '/register')}>Create a message</button>
            </div>
          </div>
          <div className="hero-img-wrapper">
            <div className="hero-img-glow" />
            <img src={heroImage} alt="hero" className="hero-img" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features">
        <div className="features-header">
          <span className="features-eyebrow">Why MemoMe</span>
          <h2 className="features-title">Everything you need to capture your story</h2>
          <p className="features-subtitle">MemoMe makes it effortless to preserve your thoughts, moments, and voice — and deliver them exactly when they matter most.</p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">◷</div>
            <h3>Time-Stamped Memories</h3>
            <p>Schedule your messages to arrive at a future date — months or even years from now.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">◈</div>
            <h3>Capture Any Moment</h3>
            <p>Record voice notes, write letters, or attach media to create rich, lasting memories.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">◎</div>
            <h3>Your Personal Vault</h3>
            <p>All your memories stored securely and privately — only you decide what gets sent.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⌁</div>
            <h3>Rediscover Yourself</h3>
            <p>Reconnect with past thoughts and track how far you've grown over time.</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <div className="testimonials-header">
          <span className="testimonials-eyebrow">Testimonials</span>
          <h2 className="testimonials-title">Trusted by people who value their memories</h2>
        </div>
        <div className="testimonial-cards">
          <div className="card">
            <div className="card-stars">★★★★★</div>
            <p className="card-quote">"I adore how MemoMe allows me to capture my thoughts and hear them later. It's like talking to my future self."</p>
            <div className="card-author">
              <div className="card-avatar">S</div>
              <div className="card-author-info">
                <strong>Seshan</strong>
                <span>Verified Customer</span>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-stars">★★★★★</div>
            <p className="card-quote">"Hearing my own voice from twelve months ago was surreal. This platform makes recording and revisiting memories incredibly simple."</p>
            <div className="card-author">
              <div className="card-avatar">SM</div>
              <div className="card-author-info">
                <strong>Sara M</strong>
                <span>Verified Customer</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <span className="footer-logo">MemoME</span>
            <p>Send messages to your future self with a click.</p>
          </div>
          <div className="footer-links">
            <span className="footer-links-label">Follow us</span>
            <div className="socials">
              <a className="social-btn" href="#">Ig</a>
              <a className="social-btn" href="#">Fb</a>
              <a className="social-btn" href="#">Tw</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 MemoME. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}

export default Home;
