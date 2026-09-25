// components/RequestBar.jsx
export default function RequestBar({ method, setMethod, url, setUrl, sendRequest, loading }) {
  return (
    <div className="request-bar">
      <select value={method} onChange={(e) => setMethod(e.target.value)}>
        <option value="GET">GET</option>
        <option value="POST">POST</option>
        <option value="PUT">PUT</option>
        <option value="PATCH">PATCH</option>
        <option value="DELETE">DELETE</option>
      </select>

      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)} // <--- Check this line
        placeholder="https://dummyjson.com/products/1"
      />

      <button onClick={sendRequest} disabled={loading}>
        {loading ? "Sending..." : "Send"}
      </button>
    </div>
  );
}