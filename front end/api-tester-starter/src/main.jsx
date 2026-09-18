import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

const METHODS = ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD"];

const starterHeaders = [
  { key: "Content-Type", value: "application/json", enabled: true }
];

function App() {
  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("https://jsonplaceholder.typicode.com/posts/1");
  const [headers, setHeaders] = useState(starterHeaders);
  const [body, setBody] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("Body");
  const [responseTab, setResponseTab] = useState("Pretty");
  const [history, setHistory] = useState([]);

  const updateHeader = (index, field, value) => {
    setHeaders(prev =>
      prev.map((h, i) => i === index ? { ...h, [field]: value } : h)
    );
  };

  const addHeader = () => {
    setHeaders(prev => [...prev, { key: "", value: "", enabled: true }]);
  };

  const removeHeader = (index) => {
    setHeaders(prev => prev.filter((_, i) => i !== index));
  };

  const sendRequest = async () => {
    if (!url.trim()) return;

    setLoading(true);
    setResponse(null);

    const headerObject = {};
    headers.forEach(h => {
      if (h.enabled && h.key.trim()) headerObject[h.key.trim()] = h.value;
    });

    try {
      const result = await fetch("/api/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: url.trim(),
          method,
          headers: headerObject,
          body
        })
      });

      const data = await result.json();

      if (!result.ok) {
        setResponse({
          status: data.error ? "ERROR" : result.status,
          statusText: data.error || "Request failed",
          time: 0,
          size: 0,
          headers: {},
          body: data
        });
      } else {
        setResponse(data);
      }

      setHistory(prev => [
        { method, url: url.trim(), time: new Date().toLocaleTimeString() },
        ...prev.filter(x => !(x.method === method && x.url === url.trim()))
      ].slice(0, 10));
    } catch (error) {
      setResponse({
        status: "ERROR",
        statusText: error.message,
        time: 0,
        size: 0,
        headers: {},
        body: { error: error.message }
      });
    } finally {
      setLoading(false);
    }
  };

  const formattedResponse = () => {
    if (!response) return "";
    if (responseTab === "Raw") {
      return typeof response.body === "string"
        ? response.body
        : JSON.stringify(response.body);
    }
    if (typeof response.body === "string") return response.body;
    return JSON.stringify(response.body, null, 2);
  };

  const loadHistory = item => {
    setMethod(item.method);
    setUrl(item.url);
  };

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <div className="logo">⌁</div>
          <div>
            <h1>API Tester</h1>
            <span>Simple API client</span>
          </div>
        </div>
        <div className="top-actions">
          <button className="ghost">Import</button>
          <button className="ghost">Export</button>
        </div>
      </header>

      <main className="workspace">
        <aside className="sidebar">
          <div className="side-title">
            <span>REQUEST HISTORY</span>
            <button onClick={() => setHistory([])}>Clear</button>
          </div>

          {history.length === 0 ? (
            <div className="empty-history">Your requests will appear here.</div>
          ) : (
            history.map((item, index) => (
              <button
                className="history-item"
                key={index}
                onClick={() => loadHistory(item)}
              >
                <b className={`method mini ${item.method.toLowerCase()}`}>
                  {item.method}
                </b>
                <span>{item.url}</span>
              </button>
            ))
          )}
        </aside>

        <section className="main">
          <div className="request-bar">
            <select value={method} onChange={e => setMethod(e.target.value)}>
              {METHODS.map(m => <option key={m}>{m}</option>)}
            </select>
            <input
              value={url}
              onChange={e => setUrl(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendRequest()}
              placeholder="https://api.example.com/users"
            />
            <button className="send" onClick={sendRequest} disabled={loading}>
              {loading ? "Sending..." : "Send  ➜"}
            </button>
          </div>

          <div className="panel request-panel">
            <div className="tabs">
              {["Params", "Headers", "Body"].map(tab => (
                <button
                  key={tab}
                  className={activeTab === tab ? "active" : ""}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                  {tab === "Headers" && (
                    <span className="count">{headers.filter(h => h.enabled && h.key).length}</span>
                  )}
                </button>
              ))}
            </div>

            {activeTab === "Params" && (
              <div className="placeholder">
                <strong>Query parameters</strong>
                <p>Add parameters directly to the URL for now, e.g. <code>?page=1&limit=10</code>.</p>
              </div>
            )}

            {activeTab === "Headers" && (
              <div className="headers-editor">
                {headers.map((h, index) => (
                  <div className="header-row" key={index}>
                    <input
                      type="checkbox"
                      checked={h.enabled}
                      onChange={e => updateHeader(index, "enabled", e.target.checked)}
                    />
                    <input
                      placeholder="Header name"
                      value={h.key}
                      onChange={e => updateHeader(index, "key", e.target.value)}
                    />
                    <input
                      placeholder="Value"
                      value={h.value}
                      onChange={e => updateHeader(index, "value", e.target.value)}
                    />
                    <button onClick={() => removeHeader(index)}>×</button>
                  </div>
                ))}
                <button className="add-btn" onClick={addHeader}>+ Add Header</button>
              </div>
            )}

            {activeTab === "Body" && (
              <div className="body-editor">
                <div className="editor-label">
                  <span>Request body</span>
                  <span>JSON</span>
                </div>
                <textarea
                  value={body}
                  onChange={e => setBody(e.target.value)}
                  placeholder={'{\n  "name": "Addya",\n  "course": "CSE"\n}'}
                  spellCheck="false"
                />
              </div>
            )}
          </div>

          <div className="response-heading">
            <div>
              <h2>Response</h2>
              {response && (
                <div className="meta">
                  <span className={response.status >= 200 && response.status < 300 ? "success" : "error"}>
                    {response.status} {response.statusText}
                  </span>
                  <span>{response.time} ms</span>
                  <span>{response.size} B</span>
                </div>
              )}
            </div>
          </div>

          <div className="panel response-panel">
            <div className="response-tabs">
              {["Pretty", "Raw", "Headers"].map(tab => (
                <button
                  key={tab}
                  className={responseTab === tab ? "active" : ""}
                  onClick={() => setResponseTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            {!response ? (
              <div className="response-empty">
                <div className="response-icon">⌁</div>
                <h3>No response yet</h3>
                <p>Enter an endpoint and click <b>Send</b> to test your API.</p>
              </div>
            ) : responseTab === "Headers" ? (
              <pre>{JSON.stringify(response.headers, null, 2)}</pre>
            ) : (
              <pre>{formattedResponse()}</pre>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
