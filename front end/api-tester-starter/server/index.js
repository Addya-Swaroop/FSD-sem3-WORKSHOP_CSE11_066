const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));

app.post("/api/request", async (req, res) => {
  const { url, method = "GET", headers = {}, body = "" } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  const start = Date.now();

  try {
    const cleanHeaders = {};
    for (const [key, value] of Object.entries(headers || {})) {
      if (key.trim() && value !== undefined && value !== "") {
        cleanHeaders[key.trim()] = String(value);
      }
    }

    const options = {
      method: method.toUpperCase(),
      headers: cleanHeaders
    };

    if (!["GET", "HEAD"].includes(options.method) && body) {
      options.body = typeof body === "string" ? body : JSON.stringify(body);
    }

    const response = await fetch(url, options);
    const elapsed = Date.now() - start;
    const responseText = await response.text();

    const responseHeaders = {};
    response.headers.forEach((value, key) => {
      responseHeaders[key] = value;
    });

    let parsedBody = responseText;
    const contentType = response.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      try {
        parsedBody = JSON.parse(responseText);
      } catch (_) {}
    }

    res.json({
      status: response.status,
      statusText: response.statusText,
      time: elapsed,
      size: Buffer.byteLength(responseText, "utf8"),
      headers: responseHeaders,
      body: parsedBody
    });
  } catch (error) {
    res.status(502).json({
      error: error.message || "Request failed"
    });
  }
});

app.use(express.static(path.join(__dirname, "..", "dist")));

app.get("*splat", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`API Tester server running on http://localhost:${PORT}`);
});
