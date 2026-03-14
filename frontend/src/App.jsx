import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <div className="app-shell">
      {/* Top Navigation Bar */}
      <nav className="topbar">
        <div className="topbar-logo">
          <div className="topbar-logo-icon">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
            </svg>
          </div>
          <span className="topbar-title">WindForecast Monitor</span>
        </div>

        <div className="topbar-status">
          <div className="status-dot" />
          <span>Live · UK National Grid</span>
        </div>

        <span className="topbar-badge">Jan 2024 · BMRS</span>
      </nav>

      {/* Main content */}
      <main>
        <Dashboard />
      </main>
    </div>
  );
}