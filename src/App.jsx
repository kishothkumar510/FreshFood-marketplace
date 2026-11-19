import { useState } from 'react';

const cartCount = () => {
  try {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    return Array.isArray(cart) ? cart.length : 0;
  } catch {
    return 0;
  }
};

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [itemCount] = useState(cartCount);
  const [feedbackStatus, setFeedbackStatus] = useState('');
  const [feedbackError, setFeedbackError] = useState('');

  async function submitFeedback(event) {
    event.preventDefault();
    setFeedbackStatus('');
    setFeedbackError('');

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          message: formData.get('message'),
        }),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Unable to submit feedback.');
      }

      setFeedbackStatus(result.message);
      form.reset();
    } catch (error) {
      setFeedbackError(error.message || 'Unable to submit feedback. Please try again.');
    }
  }

  function submitAuth(event, type) {
    event.preventDefault();
    window.location.href = type === 'login' ? 'loginsucess.html' : 'signupsucess.html';
  }

  return (
    <>
      <nav className="navbar">
        <a href="index.html" className="logo-container">
          <img src="/FF%20logo%20(1).jpg" alt="Fresh Foods logo" className="ff-logo-img" />
          <span className="logo-text">FRESH FOODS</span>
        </a>
        <button
          className="burger"
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
        <ul className={`nav-links${menuOpen ? ' active' : ''}`}>
          <li><a href="index.html" className="active">Home</a></li>
          <li><a href="product.html">Products</a></li>
          <li><a href="reservation.html">Reservations</a></li>
          <li><a href="#about">About Us</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><a href="cart.html"><i className="fas fa-shopping-cart" aria-hidden="true" /> Cart <span className="cart-badge">{itemCount}</span></a></li>
          <li><a href="#auth">Login/Signup</a></li>
        </ul>
      </nav>

      <header className="hero">
        <div>
          <h1>Fresh Field &amp; Authentic Flavors</h1>
          <p>Taste the Heritage of the South with 100% Organic Ingredients</p>
          <div className="hero-btns">
            <a href="product.html" className="cta-btn">Order Online</a>
            <a href="reservation.html" className="cta-btn-outline">Book a Table (24/7)</a>
          </div>
        </div>
      </header>

      <section id="about">
        <h2>Our Culinary Story</h2>
        <p>
          Bringing the authentic, soul-satisfying traditional tastes of Tamil Nadu, Karnataka, and Kerala
          straight to your plate since 1995. We take immense pride in farm-to-table freshness, hand-ground
          spices, and generational recipes crafted with love.
        </p>
      </section>

      <section id="contact">
        <h2>Contact Us</h2>
        <p className="contact-intro">We&apos;d love to hear your feedback or queries!</p>
        <div className="contact-container">
          <form onSubmit={submitFeedback}>
            <div className="form-group">
              <label htmlFor="feedback-name">Your Name</label>
              <input id="feedback-name" name="name" type="text" placeholder="Enter your name" maxLength="100" required />
            </div>
            <div className="form-group">
              <label htmlFor="feedback-email">Your Email</label>
              <input id="feedback-email" name="email" type="email" placeholder="Enter your email" maxLength="254" required />
            </div>
            <div className="form-group">
              <label htmlFor="feedback-message">Your Feedback / Query</label>
              <textarea id="feedback-message" name="message" placeholder="Write your message here..." rows="4" maxLength="2000" required />
            </div>
            <button type="submit" className="btn">Submit Feedback</button>
            {feedbackStatus && <p className="form-status" role="status">{feedbackStatus}</p>}
            {feedbackError && <p className="form-error" role="alert">{feedbackError}</p>}
          </form>
        </div>
      </section>

      <section id="auth">
        <div className="auth-card">
          <div className="auth-toggle" role="tablist" aria-label="Account options">
            <button
              id="loginBtn"
              type="button"
              role="tab"
              aria-selected={authMode === 'login'}
              className={`toggle-btn${authMode === 'login' ? ' active' : ''}`}
              onClick={() => setAuthMode('login')}
            >
              Login
            </button>
            <button
              id="signupBtn"
              type="button"
              role="tab"
              aria-selected={authMode === 'signup'}
              className={`toggle-btn${authMode === 'signup' ? ' active' : ''}`}
              onClick={() => setAuthMode('signup')}
            >
              Signup
            </button>
          </div>

          {authMode === 'login' ? (
            <form className="form-container" onSubmit={(event) => submitAuth(event, 'login')}>
              <h3>Welcome Back</h3>
              <div className="form-group"><input type="email" name="email" placeholder="Email Address" aria-label="Email Address" required /></div>
              <div className="form-group"><input type="password" name="password" placeholder="Password" aria-label="Password" required /></div>
              <button className="btn" type="submit">Login</button>
            </form>
          ) : (
            <form className="form-container" onSubmit={(event) => submitAuth(event, 'signup')}>
              <h3>Create Fresh Foods Account</h3>
              <div className="form-group"><input type="text" name="name" placeholder="Full Name" aria-label="Full Name" required /></div>
              <div className="form-group"><input type="email" name="email" placeholder="Email Address" aria-label="Email Address" required /></div>
              <div className="form-group"><input type="password" name="password" placeholder="Create Password" aria-label="Create Password" required /></div>
              <button className="btn" type="submit">Register</button>
            </form>
          )}
        </div>
      </section>

      <footer>
        <div className="footer-content">
          <div className="footer-col">
            <h3>Fresh Foods (FF)</h3>
            <p className="footer-description">Your ultimate destination for pure, healthy, and authentic South Indian heritage cuisine.</p>
          </div>
          <div className="footer-col">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="index.html">Home</a></li>
              <li><a href="product.html">Our Menu</a></li>
              <li><a href="reservation.html">Table Reservation</a></li>
              <li><a href="#about">About Us</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h3>Contact Info</h3>
            <p className="contact-detail"><i className="fas fa-map-marker-alt" aria-hidden="true" /> 123 Heritage Lane, Chennai, India</p>
            <p className="contact-detail"><i className="fas fa-phone" aria-hidden="true" /> +91 98765 43210</p>
            <p className="contact-detail"><i className="fas fa-envelope" aria-hidden="true" /> support@freshfoods.com</p>
          </div>
          <div className="footer-col">
            <h3>Connect With Us</h3>
            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook"><i className="fab fa-facebook" /></a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><i className="fab fa-instagram" /></a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube"><i className="fab fa-youtube" /></a>
            </div>
          </div>
        </div>
        <div className="copyright">
          <p>&copy; 2026 Fresh Foods (FF). All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}

export default App;
