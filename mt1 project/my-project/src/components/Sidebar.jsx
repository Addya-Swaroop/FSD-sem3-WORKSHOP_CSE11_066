import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("loggedIn");
    navigate("/");
  };

  return (
    <aside className="sidebar">

      <div className="sidebar-logo">
        STUDENT<span>HUB</span>
      </div>

      <div className="menu">

        <div className="menu-title">
          MAIN MENU
        </div>

        <div className="menu-item active">
          <span>▦</span>
          Dashboard
        </div>

        <div className="menu-item">
          <span>♙</span>
          Students
        </div>

        <div className="menu-item">
          <span>◉</span>
          Reports
        </div>

      </div>

      <div className="sidebar-bottom">

        <div className="menu-item">
          <span>⚙</span>
          Settings
        </div>

        <button className="logout-button" onClick={logout}>
          <span>↪</span>
          Logout
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;