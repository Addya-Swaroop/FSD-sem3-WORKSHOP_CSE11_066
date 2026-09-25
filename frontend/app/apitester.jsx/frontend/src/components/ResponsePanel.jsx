export default function ResponsePanel({ response, loading }) {
  if (loading) return <div className="response-panel">Sending request...</div>;
  if (!response) return <div className="response-panel">Click Send to test the API endpoint.</div>;

  const isSuccess = typeof response.status === "number" && response.status < 400;

  return (
    <div className="response-panel">
      <div className="response-meta">
        <span>Status: <strong className="response-code" style={{ color: isSuccess ? "#4caf50" : "#f44336" }}>{response.status} {response.statusText}</strong></span>
        <span>Time: <strong>{response.time}</strong></span>
      </div>

      <pre className="response-body">
        {typeof response.data === "object"
          ? JSON.stringify(response.data, null, 2)
          : response.data}
      </pre>
    </div>
  );
}