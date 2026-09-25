export default function Sidebar({ activeTab, setActiveTab }) {
  return (
    <aside className="sidebar">
      <h2>⚡ API Tester</h2>

      <nav>
        <button 
          className={`nav-item ${activeTab === "tester" ? "active" : ""}`}
          onClick={() => setActiveTab("tester")}
        >
          📋 API Tester
        </button>
        <button 
          className={`nav-item ${activeTab === "collections" ? "active" : ""}`}
          onClick={() => setActiveTab("collections")}
        >
          📁 Collections
        </button>
        <button 
          className={`nav-item ${activeTab === "history" ? "active" : ""}`}
          onClick={() => setActiveTab("history")}
        >
          🕒 History
        </button>
        <button 
          className={`nav-item ${activeTab === "environments" ? "active" : ""}`}
          onClick={() => setActiveTab("environments")}
        >
          ⚙️ Environments
        </button>
      </nav>
    </aside>
  );
}