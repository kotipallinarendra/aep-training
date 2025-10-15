import React, { useState } from "react";

const ApiRequest = () => {
  const [endpoint, setEndpoint] = useState("");
  const [params, setParams] = useState([{ key: "", value: "" }]);
  const [headers, setHeaders] = useState([{ key: "", value: "" }]);
  const [auth, setAuth] = useState("");
  const [body, setBody] = useState("{}");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const addField = (setter, state) => {
    setter([...state, { key: "", value: "" }]);
  };

  const updateField = (setter, state, index, field, value) => {
    const newState = [...state];
    newState[index][field] = value;
    setter(newState);
  };

  const removeField = (setter, state, index) => {
    const newState = state.filter((_, i) => i !== index);
    setter(newState);
  };

  const handleSubmit = async () => {
    setError(null);
    setResponse(null);

    if (!endpoint) {
      setError("Endpoint URL is required.");
      return;
    }

    let url = endpoint;
    const queryParams = params
      .filter((p) => p.key && p.value)
      .map((p) => `${encodeURIComponent(p.key)}=${encodeURIComponent(p.value)}`)
      .join("&");
    if (queryParams) url += `?${queryParams}`;

    let requestHeaders = {};
    headers.forEach((h) => {
      if (h.key && h.value) requestHeaders[h.key] = h.value;
    });
    if (auth) {
      requestHeaders["Authorization"] = auth;
    }

    let parsedBody = null;
    try {
      if (body.trim()) {
        parsedBody = JSON.parse(body);
      }
    } catch (err) {
      setError("Invalid JSON body.");
      return;
    }

    try {
      const res = await fetch(url, {
        method: "POST", // can be enhanced to a dropdown
        headers: {
          "Content-Type": "application/json",
          ...requestHeaders,
        },
        body: parsedBody ? JSON.stringify(parsedBody) : undefined,
      });

      const data = await res.json().catch(() => res.text());
      setResponse(data);
    } catch (err) {
      setError("Request failed: " + err.message);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">API Request</h1>

      {/* Endpoint */}
      <div className="mb-4">
        <label className="block font-medium mb-1">API Endpoint</label>
        <input
          type="text"
          value={endpoint}
          onChange={(e) => setEndpoint(e.target.value)}
          placeholder="https://api.example.com"
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Params */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Parameters</label>
        {params.map((param, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <input
              type="text"
              placeholder="Key"
              value={param.key}
              onChange={(e) =>
                updateField(setParams, params, i, "key", e.target.value)
              }
              className="flex-1 p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Value"
              value={param.value}
              onChange={(e) =>
                updateField(setParams, params, i, "value", e.target.value)
              }
              className="flex-1 p-2 border rounded"
            />
            <button
              type="button"
              onClick={() => removeField(setParams, params, i)}
              className="px-2 bg-red-500 text-white rounded"
            >
              ✕
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addField(setParams, params)}
          className="mt-1 px-3 py-1 bg-gray-200 rounded"
        >
          + Add Param
        </button>
      </div>

      {/* Auth */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Authentication</label>
        <input
          type="text"
          value={auth}
          onChange={(e) => setAuth(e.target.value)}
          placeholder="Bearer token or custom value"
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Headers */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Headers</label>
        {headers.map((header, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <input
              type="text"
              placeholder="Key"
              value={header.key}
              onChange={(e) =>
                updateField(setHeaders, headers, i, "key", e.target.value)
              }
              className="flex-1 p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Value"
              value={header.value}
              onChange={(e) =>
                updateField(setHeaders, headers, i, "value", e.target.value)
              }
              className="flex-1 p-2 border rounded"
            />
            <button
              type="button"
              onClick={() => removeField(setHeaders, headers, i)}
              className="px-2 bg-red-500 text-white rounded"
            >
              ✕
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addField(setHeaders, headers)}
          className="mt-1 px-3 py-1 bg-gray-200 rounded"
        >
          + Add Header
        </button>
      </div>

      {/* Body */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Body (JSON)</label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder='e.g. { "id": 1, "name": "Test" }'
          className="w-full h-40 p-2 border rounded font-mono text-sm"
        />
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Submit
      </button>

      {/* Error */}
      {error && <p className="text-red-600 mt-4">{error}</p>}

      {/* Response */}
      {response && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Response</h2>
          <pre className="bg-gray-100 p-3 rounded font-mono text-sm whitespace-pre-wrap">
            {typeof response === "string"
              ? response
              : JSON.stringify(response, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default ApiRequest;