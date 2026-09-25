function RequestBar({
  method,
  setMethod,
  url,
  setUrl,
  sendRequest
}) {

  return (
    <div className="request-container">

      <select
        value={method}
        onChange={(e) => setMethod(e.target.value)}
        className={`method ${method.toLowerCase()}`}
      >
        <option value="GET">GET</option>
        <option value="POST">POST</option>
        <option value="PUT">PUT</option>
        <option value="PATCH">PATCH</option>
        <option value="DELETE">DELETE</option>
      </select>

      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="url-input"
        placeholder="Enter request URL"
      />

      <button
        className="send-button"
        onClick={sendRequest}
      >
        Send
      </button>

    </div>
  );
}

export default RequestBar;