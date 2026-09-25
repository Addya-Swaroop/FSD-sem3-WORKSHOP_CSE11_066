import { useState } from "react";
import Sidebar from "./components/Sidebar";
import RequestBar from "./components/RequestBar";
import RequestTabs from "./components/RequestTabs";
import ResponsePanel from "./components/ResponsePanel";
import "./App.css";

function App() {
  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("https://api.example.com/users");

  const [response, setResponse] = useState(null);

  const sendRequest = () => {
    // Frontend-only dummy response
    setResponse({
      status: 200,
      time: "245 ms",
      data: {
        message: "Request successful",
        method: method,
        url: url,
        users: [
          {
            id: 1,
            name: "addya"
          },
          {
            id: 2,
            name: "Rahul"
          }
        ]
      }
    });
  };

  return (
    <div className="app">

      <Sidebar />

      <main className="main">

        <div className="topbar">
          <div>
            <h1>API Tester</h1>
            <p>Test and inspect your APIs</p>
          </div>
        </div>

        <RequestBar
          method={method}
          setMethod={setMethod}
          url={url}
          setUrl={setUrl}
          sendRequest={sendRequest}
        />

        <RequestTabs />

        <ResponsePanel response={response} />

      </main>

    </div>
  );
}

export default App;