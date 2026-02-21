import './Home.css';
import heroImage from '../assets/hero.png';

function Home() {
  return (
    <div className="home">
      {/* Navbar */}
      <nav className="navbar">
        <h2 className="logo">MemoME</h2>
        <div className="nav-buttons">
          <button className="login-btn">Log in</button>
          <button className="schedule-btn">Schedule</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-text">
          <h1>Say Hello to your Future !</h1>
          <p>Send messages to your future self with a click</p>
          <button className="create-btn">Create a message</button>
        </div>
        <img src={heroImage} alt="hero" className="hero-img" />
      </section>

      {/* Features */}
      <section className="features">
        <p><strong>MemoMe</strong> is a great tool for.....</p>
        <ul>
          <li>Your past, replayed for the future 🧠</li>
          <li>Save a moment, hear it later ⏳</li>
          <li>A time capsule for your voice 📯</li>
          <li>Send a message to your future self 📬</li>
        </ul>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <h2>What do our users say</h2>
        <div className="testimonial-cards">
          <div className="card">
            <p>“I adore how MemoMe allows me to capture my thoughts and hear them later. It’s like talking to my future self!”</p>
            <strong>Seshan</strong><br />
            <small>Customer</small>
          </div>
          <div className="card">
            <p>“Hearing my own voice from twelve months ago was weird! This site makes recording and remembering things so easy.”</p>
            <strong>Sara M</strong><br />
            <small>Customer</small>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <h3 style={{ color: "#2b72ff" }}>MemoME</h3>
        <p>Send messages to your future self with a click</p>
        <div className="socials">
          <span>📷</span>
          <span>📘</span>
          <span>🐦</span>
        </div>
      </footer>
    </div>
  );
}

export default Home;
