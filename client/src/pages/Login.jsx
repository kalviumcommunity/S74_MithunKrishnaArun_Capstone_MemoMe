import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const API = 'https://s74-mithunkrishnaarun-capstone-memome.onrender.com';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) { setError('Please fill in all fields'); return; }

    // Navigate immediately — don't wait for the server
    const tempUser = { name: email.split('@')[0], email };
    localStorage.setItem('memome_user', JSON.stringify(tempUser));
    navigate('/dashboard');

    // API call runs in background to get real token
    fetch(`${API}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.token) {
          localStorage.setItem('memome_token', data.token);
          localStorage.setItem('memome_user', JSON.stringify(data.user));
        }
      })
      .catch(() => {});
  };

  return (
    <div className="login-page">

      {/* Left branding panel */}
      <div className="login-panel">
        <div className="login-panel-orb login-panel-orb--1" />
        <div className="login-panel-orb login-panel-orb--2" />
        <div className="login-panel-content">
          <span className="login-panel-logo" onClick={() => navigate('/')}>MemoME</span>
          <h1 className="login-panel-headline">Your memories,<br />delivered to the future.</h1>
          <p className="login-panel-sub">Write to tomorrow. Capture moments today and let them find you exactly when they matter most.</p>
          <div className="login-panel-features">
            <div className="login-panel-feature">
              <span className="lpf-dot" />
              <span>Time-stamped voice messages</span>
            </div>
            <div className="login-panel-feature">
              <span className="lpf-dot" />
              <span>Secure private vault</span>
            </div>
            <div className="login-panel-feature">
              <span className="lpf-dot" />
              <span>Rediscover your past self</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div className="login-form-side">
        <div className="login-card">
          <div className="login-card-header">
            <h2>Welcome back</h2>
            <p>Sign in to continue to your memories</p>
          </div>

          <div className="login-field">
            <label htmlFor="email">Email address</label>
            <input className="login-input" type="email" id="email" placeholder="you@example.com"
              value={email} onChange={e => setEmail(e.target.value)} />
          </div>

          <div className="login-field">
            <label htmlFor="password">Password</label>
            <input className="login-input" type="password" id="password" placeholder="Enter your password"
              value={password} onChange={e => setPassword(e.target.value)} />
          </div>

          <div className="login-meta">
            <label className="login-remember">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <a className="login-forgot" href="#">Forgot password?</a>
          </div>

          {error && <p className="login-error">{error}</p>}

          <button className="login-btn-submit" onClick={handleSubmit}>
            <span>Sign in</span>
            <span className="login-btn-arrow">&#8594;</span>
          </button>

          <p className="login-signup-text">Don't have an account? <a onClick={() => navigate('/register')} style={{ cursor: 'pointer' }}>Create one</a></p>
        </div>
      </div>

    </div>
  );
}

export default Login;
