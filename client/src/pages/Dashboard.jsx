import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import { API_BASE_URL } from '../config/api';

function Dashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem('memome_token');
  const user = useMemo(() => JSON.parse(localStorage.getItem('memome_user') || '{}'), []);
  const [memories, setMemories] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState('');
  const [editingId, setEditingId] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchMemories = async () => {
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      setLoading(true);
      setError('');
      const res = await fetch(`${API_BASE_URL}/memories`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to load memories');
      setMemories(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || 'Failed to load memories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMemories();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('memome_token');
    localStorage.removeItem('memome_user');
    navigate('/');
  };

  const resetForm = () => {
    setTitle('');
    setContent('');
    setDate('');
    setEditingId('');
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim() || !date) {
      setError('Please fill in title, message, and delivery date.');
      return;
    }

    try {
      setSaving(true);
      setError('');

      const endpoint = editingId ? `${API_BASE_URL}/memories/${editingId}` : `${API_BASE_URL}/memories`;
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: title.trim(), content: content.trim(), date }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Unable to save memory');

      await fetchMemories();
      resetForm();
    } catch (err) {
      setError(err.message || 'Unable to save memory');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (memory) => {
    setEditingId(memory._id);
    setTitle(memory.title || '');
    setContent(memory.content || '');
    setDate(memory.date ? new Date(memory.date).toISOString().slice(0, 10) : '');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    try {
      setError('');
      const res = await fetch(`${API_BASE_URL}/memories/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Unable to delete memory');

      if (editingId === id) resetForm();
      setMemories(prev => prev.filter(memory => memory._id !== id));
    } catch (err) {
      setError(err.message || 'Unable to delete memory');
    }
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
        <div className="dashboard-content">
          <section className="dashboard-welcome">
            <span className="dashboard-eyebrow">Welcome back</span>
            <h1>Hello, {user.name || 'there'}</h1>
            <p>Capture a memory now and schedule when your future self should receive it.</p>
          </section>

          <section className="dashboard-grid">
            <div className="dashboard-panel">
              <h2>{editingId ? 'Edit Memory' : 'Create Memory'}</h2>
              <form className="memory-form" onSubmit={handleSave}>
                <label htmlFor="memory-title">Title</label>
                <input
                  id="memory-title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="A note to my future self"
                />

                <label htmlFor="memory-content">Message</label>
                <textarea
                  id="memory-content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write what you want to remember..."
                  rows={5}
                />

                <label htmlFor="memory-date">Delivery date</label>
                <input
                  id="memory-date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />

                <div className="memory-form-actions">
                  <button type="submit" className="dashboard-cta" disabled={saving}>
                    {saving ? 'Saving...' : editingId ? 'Update memory' : 'Create memory'}
                  </button>
                  {editingId && (
                    <button type="button" className="dashboard-secondary" onClick={resetForm}>
                      Cancel edit
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="dashboard-panel">
              <h2>Your Scheduled Memories</h2>
              {loading ? <p className="dashboard-status">Loading memories...</p> : null}
              {!loading && memories.length === 0 ? <p className="dashboard-status">No memories yet. Create your first one.</p> : null}

              <div className="memory-list">
                {memories.map((memory) => (
                  <article className="memory-card" key={memory._id}>
                    <div className="memory-card-top">
                      <h3>{memory.title}</h3>
                      <span>{new Date(memory.date).toLocaleDateString()}</span>
                    </div>
                    <p>{memory.content}</p>
                    <div className="memory-card-actions">
                      <button type="button" className="dashboard-secondary" onClick={() => handleEdit(memory)}>Edit</button>
                      <button type="button" className="dashboard-danger" onClick={() => handleDelete(memory._id)}>Delete</button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {error ? <p className="dashboard-error">{error}</p> : null}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
