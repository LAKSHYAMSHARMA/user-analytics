import { NavLink, Outlet } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-shell">
      <aside className="dashboard-sidebar">
        <div className="dashboard-brand">
          <span className="dashboard-brand-mark">UA</span>
          <span>Pulse Analytics</span>
        </div>
        <p className="dashboard-nav-label">Workspace</p>
        <nav className="dashboard-nav" aria-label="Dashboard sections">
          <NavLink
            className={({ isActive }) => `dashboard-nav-link ${isActive ? 'dashboard-nav-link-active' : ''}`}
            to="/sessions"
          >
            <span className="dashboard-nav-icon">◷</span>
            Sessions
          </NavLink>
          <NavLink
            className={({ isActive }) => `dashboard-nav-link ${isActive ? 'dashboard-nav-link-active' : ''}`}
            to="/heatmap"
          >
            <span className="dashboard-nav-icon">⊞</span>
            Heatmap
          </NavLink>
        </nav>
      </aside>
      <main className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <p className="dashboard-eyebrow">User behavior overview</p>
            <h1 className="dashboard-title">Analytics Dashboard</h1>
          </div>
          <div className="dashboard-status">
            <span className="dashboard-status-dot" />
            Tracking active
          </div>
        </header>
        <div className="dashboard-sections">
          <section className="dashboard-panel">
            <Outlet />
          </section>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;