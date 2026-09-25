function ResponsePanel({ response }) {

  return (
    <div className="response-section">

      <div className="response-header">

        <div>
          <h2>Response</h2>
        </div>

        {response && (
          <div className="response-info">

            <span className="success">
              {response.status} OK
            </span>

            <span>
              {response.time}
            </span>

          </div>
        )}

      </div>

      <div className="response-toolbar">

        <span className="response-tab active">
          Pretty
        </span>

        <span className="response-tab">
          Raw
        </span>

        <span className="response-tab">
          Preview
        </span>

      </div>

      <div className="response-box">

        {!response ? (

          <div className="empty-response">
            <div className="empty-icon">
              ⇄
            </div>

            <h3>No response yet</h3>

            <p>
              Send a request to see the response here.
            </p>
          </div>

        ) : (

          <pre>
            {JSON.stringify(response.data, null, 2)}
          </pre>

        )}

      </div>

    </div>
  );
}

export default ResponsePanel;