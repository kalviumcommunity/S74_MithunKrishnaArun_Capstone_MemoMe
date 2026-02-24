import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import './Register.css';

const API = 'https://s74-mithunkrishnaarun-capstone-memome.onrender.com';

function Register() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!firstName || !email || !password) { setError('Please fill in all fields'); return; }
    if (password !== confirm) { setError('Passwords do not match'); return; }

    // Navigate immediately — don't wait for the server
    const tempUser = { name: `${firstName} ${lastName}`.trim(), email };
    localStorage.setItem('memome_user', JSON.stringify(tempUser));
    navigate('/dashboard');

    // API call runs in background to persist the account
    fetch(`${API}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: tempUser.name, email, password }),
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
          <h1 className="login-panel-headline">Start writing to<br />your future self.</h1>
          <p className="login-panel-sub">Create your free account and send your first memory today. It only takes a minute.</p>
          <div className="login-panel-features">
            <div className="login-panel-feature">
              <span className="lpf-dot" />
              <span>Free to get started</span>
            </div>
            <div className="login-panel-feature">
              <span className="lpf-dot" />
              <span>No credit card required</span>
            </div>
            <div className="login-panel-feature">
              <span className="lpf-dot" />
              <span>Your memories, always private</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div className="login-form-side">
        <div className="login-card">
          <div className="login-card-header">
            <h2>Create your account</h2>
            <p>Join MemoME and capture your first memory</p>
          </div>

          <div className="register-name-row">
            <div className="login-field">
              <label htmlFor="firstname">First name</label>
              <input className="login-input" type="text" id="firstname" placeholder="John"
                value={firstName} onChange={e => setFirstName(e.target.value)} />
            </div>
            <div className="login-field">
              <label htmlFor="lastname">Last name</label>
              <input className="login-input" type="text" id="lastname" placeholder="Doe"
                value={lastName} onChange={e => setLastName(e.target.value)} />
            </div>
          </div>

          <div className="login-field">
            <label htmlFor="reg-email">Email address</label>
            <input className="login-input" type="email" id="reg-email" placeholder="you@example.com"
              value={email} onChange={e => setEmail(e.target.value)} />
          </div>

          <div className="login-field">
            <label htmlFor="reg-password">Password</label>
            <input className="login-input" type="password" id="reg-password" placeholder="Create a password"
              value={password} onChange={e => setPassword(e.target.value)} />
          </div>

          <div className="login-field">
            <label htmlFor="confirm-password">Confirm password</label>
            <input className="login-input" type="password" id="confirm-password" placeholder="Repeat your password"
              value={confirm} onChange={e => setConfirm(e.target.value)} />
          </div>

          {error && <p className="login-error">{error}</p>}

          <button className="login-btn-submit" onClick={handleSubmit}>
            <span>Create account</span>
            <span className="login-btn-arrow">&#8594;</span>
          </button>

          <p className="login-signup-text">Already have an account? <a onClick={() => navigate('/login')} style={{ cursor: 'pointer' }}>Sign in</a></p>
        </div>
      </div>

    </div>
  );
}

export default Register;
