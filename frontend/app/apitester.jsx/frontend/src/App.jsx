import { useState } from "react";
import Sidebar from "./components/Sidebar";
import RequestBar from "./components/RequestBar";
import RequestTabs from "./components/RequestTabs";
import ResponsePanel from "./components/ResponsePanel";
import "./App.css";

function App() {
  const [activeSidebarTab, setActiveSidebarTab] = useState("tester");
  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("https://dummyjson.com/products/1");
  const [headers, setHeaders] = useState([{ key: "Content-Type", value: "application/json" }]);
  const [body, setBody] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const sendRequest = async () => {
    let targetUrl = url.trim();
    if (!targetUrl.startsWith("http://") && !targetUrl.startsWith("https://")) {
      alert("Please enter a valid URL");
      return;
    }

    setLoading(true);
    setResponse(null);
    const startTime = performance.now();

    try {
      const headerObj = {};
      headers.forEach(({ key, value }) => {
        if (key.trim()) headerObj[key] = value;
      });

      const options = { method, headers: headerObj };
      if (["POST", "PUT", "PATCH"].includes(method) && body) {
        options.body = body;
      }

      const res = await fetch(targetUrl, options);
      const endTime = performance.now();

      const contentType = res.headers.get("content-type");
      const data = contentType && contentType.includes("application/json") 
        ? await res.json() 
        : await res.text();

      setResponse({
        status: res.status,
        statusText: res.statusText || "OK",
        time: `${Math.round(endTime - startTime)} ms`,
        data,
      });
    } catch (err) {
      setResponse({
        status: "Error",
        statusText: "Network Error / CORS Blocked",
        time: "0 ms",
        data: { error: err.message },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <Sidebar activeTab={activeSidebarTab} setActiveTab={setActiveSidebarTab} />

      <main className="main">
        {activeSidebarTab === "tester" && (
          <>
            <div className="topbar">
              <h1>API Tester</h1>
              <p>Test and inspect your APIs</p>
            </div>

            <RequestBar
              method={method}
              setMethod={setMethod}
              url={url}
              setUrl={setUrl}
              sendRequest={sendRequest}
              loading={loading}
            />

            <RequestTabs
              headers={headers}
              setHeaders={setHeaders}
              body={body}
              setBody={setBody}
            />

            <ResponsePanel response={response} loading={loading} />
          </>
        )}

        {activeSidebarTab === "collections" && <h2>Collections (Saved Requests)</h2>}
        {activeSidebarTab === "history" && <h2>Request History</h2>}
        {activeSidebarTab === "environments" && <h2>Environment Variables</h2>}
      </main>
    </div>
  );
}

export default App;