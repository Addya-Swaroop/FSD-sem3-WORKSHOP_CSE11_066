import { useState } from "react";

export default function RequestTabs({ headers, setHeaders, body, setBody }) {
  const [activeTab, setActiveTab] = useState("headers");

  // Add a new empty header row
  const addHeader = () => {
    setHeaders([...headers, { key: "", value: "" }]);
  };

  // Update specific key or value in the headers array
  const updateHeader = (index, field, value) => {
    const updated = [...headers];
    updated[index][field] = value;
    setHeaders(updated);
  };

  // Remove a header row
  const removeHeader = (index) => {
    setHeaders(headers.filter((_, i) => i !== index));
  };

  return (
    <div className="request-tabs" style={{ marginBottom: "20px" }}>
      {/* Tab Switcher */}
      <div style={{ display: "flex", gap: "10px", borderBottom: "1px solid #ccc", marginBottom: "10px" }}>
        <button 
          onClick={() => setActiveTab("headers")} 
          style={{ fontWeight: activeTab === "headers" ? "bold" : "normal" }}
        >
          Headers ({headers.length})
        </button>
        <button 
          onClick={() => setActiveTab("body")} 
          style={{ fontWeight: activeTab === "body" ? "bold" : "normal" }}
        >
          Body
        </button>
      </div>

      {/* Headers Tab Content */}
      {activeTab === "headers" && (
        <div>
          {headers.map((header, index) => (
            <div key={index} style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
              <input
                placeholder="Key (e.g. Authorization)"
                value={header.key}
                onChange={(e) => updateHeader(index, "key", e.target.value)}
              />
              <input
                placeholder="Value (e.g. Bearer token...)"
                value={header.value}
                onChange={(e) => updateHeader(index, "value", e.target.value)}
              />
              <button onClick={() => removeHeader(index)}>X</button>
            </div>
          ))}
          <button onClick={addHeader}>+ Add Header</button>
        </div>
      )}

      {/* Body Tab Content */}
      {activeTab === "body" && (
        <div>
          <textarea
            rows="6"
            placeholder='{\n  "title": "foo",\n  "body": "bar"\n}'
            value={body}
            onChange={(e) => setBody(e.target.value)}
            style={{ width: "100%", fontFamily: "monospace", padding: "8px" }}
          />
        </div>
      )}
    </div>
  );
}