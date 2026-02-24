import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('memome_user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('memome_token');
    localStorage.removeItem('memome_user');
    navigate('/');
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-orb dashboard-orb--1" />
      <div className="dashboard-orb dashboard-orb--2" />

      <nav className="dashboard-nav">
        <span className="dashboard-logo" onClick={() => navigate('/')}>MemoME</span>
        <button className="dashboard-logout" onClick={handleLogout}>Log out</button>
      </nav>

      <div className="dashboard-body">
        <div className="dashboard-welcome">
          <span className="dashboard-eyebrow">Welcome back</span>
          <h1>Hello, {user.name || 'there'} 👋</h1>
          <p>You're all set. Start capturing your memories and schedule them for the future.</p>
          <button className="dashboard-cta">+ Create a new memory</button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
