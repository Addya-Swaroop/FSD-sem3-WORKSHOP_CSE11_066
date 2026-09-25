import { useState } from "react";

function RequestTabs() {

  const [activeTab, setActiveTab] = useState("Params");

  const tabs = [
    "Params",
    "Authorization",
    "Headers",
    "Body"
  ];

  return (
    <div className="request-section">

      <div className="tabs">

        {tabs.map((tab) => (
          <button
            key={tab}
            className={activeTab === tab ? "tab active-tab" : "tab"}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}

      </div>

      <div className="tab-content">

        {activeTab === "Params" && (
          <div>
            <div className="input-row">
              <input type="checkbox" />
              <input
                placeholder="Parameter name"
                className="small-input"
              />
              <input
                placeholder="Value"
                className="small-input"
              />
            </div>

            <button className="add-button">
              + Add parameter
            </button>
          </div>
        )}

        {activeTab === "Authorization" && (
          <div className="empty-tab">
            Authorization settings
          </div>
        )}

        {activeTab === "Headers" && (
          <div>
            <div className="input-row">
              <input type="checkbox" />
              <input
                placeholder="Header name"
                className="small-input"
              />
              <input
                placeholder="Header value"
                className="small-input"
              />
            </div>

            <button className="add-button">
              + Add header
            </button>
          </div>
        )}

        {activeTab === "Body" && (
          <textarea
            className="body-editor"
            placeholder={`{
  "name": "Aarushi",
  "email": "example@gmail.com"
}`}
          />
        )}

      </div>

    </div>
  );
}

export default RequestTabs;