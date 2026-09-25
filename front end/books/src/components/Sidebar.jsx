function Sidebar() {
  return (
    <aside className="sidebar">

      <div className="logo">
        <div className="logo-icon">⚡</div>
        <span>API Tester</span>
      </div>

      <div className="menu-title">
        WORKSPACE
      </div>

      <div className="menu-item active">
        <span>▣</span>
        API Tester
      </div>

      <div className="menu-item">
        <span>▤</span>
        Collections
      </div>

      <div className="menu-item">
        <span>🕘</span>
        History
      </div>

      <div className="menu-item">
        <span>⚙</span>
        Environments
      </div>

      <div className="menu-title history-title">
        RECENT
      </div>

      <div className="recent-request">
        <span className="get">GET</span>
        /users
      </div>

      <div className="recent-request">
        <span className="post">POST</span>
        /users
      </div>

      <div className="recent-request">
        <span className="delete">DELETE</span>
        /users/1
      </div>

    </aside>
  );
}

export default Sidebar;