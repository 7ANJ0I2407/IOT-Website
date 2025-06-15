import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UploadFirmwarePage() {
  const [file, setFile] = useState(null);
  const [version, setVersion] = useState('');
  const [currentVersion, setCurrentVersion] = useState('v1.0.0'); // Display only
  const [message, setMessage] = useState('');

  const fetchCurrentVersion = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/current-version');
      if (response.status === 200) {
        const fetchedVersion = response.data.version || 'v1.0.0';
        setCurrentVersion(fetchedVersion);
        setVersion(fetchedVersion); // Optional: prefill input
      }
    } catch (error) {
      console.error("Error fetching current version:", error);
      setMessage("❌ Error fetching current version.");
    }
  };

  useEffect(() => {
    fetchCurrentVersion();
  }, []);

  const handleUpload = async () => {
    if (!file || !version) {
      setMessage("⚠️ Please select a .bin file and enter a version.");
      return;
    }

    const formData = new FormData();
    formData.append('firmware', file);
    formData.append('version', version);

    try {
      const response = await axios.post('http://localhost:5001/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response.status === 200) {
        setMessage("✅ Firmware uploaded successfully.");
        setTimeout(() => {
          window.location.reload(); // Reload to reflect changes
        }, 1000
        )
        await fetchCurrentVersion(); // refresh currentVersion
      } else {
        setMessage(`❌ Upload failed with status ${response.status}`);
      }
    } catch (error) {
      if (error.response) {
        setMessage(`❌ Upload failed: ${error.response.data || error.response.statusText}`);
      } else if (error.request) {
        setMessage("❌ No response from server. Is it running?");
      } else {
        setMessage(`❌ Error: ${error.message}`);
      }
    }
  };

  return (
    <div className="p-8 md:p-12 bg-gradient-to-br from-gray-50 to-gray-200 min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-xl transition-all duration-300">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 tracking-tight">
          📤 Upload ESP32 Firmware
        </h1>

        <p className="text-center text-gray-600 mt-2 text-lg">
          🔖 Current Firmware Version: <span className="font-semibold">{currentVersion}</span>
        </p>

        <div className="space-y-6 mt-8">
          <div style={{ margin: "20px" }}>
            <label className="text-gray-700 font-medium mb-2" style={{ margin: "20px" }}>Firmware File (.bin)</label>
            <input
              type="file"
              accept=".bin"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-400 outline-none transition-all"
            />
          </div>

          <div style={{ margin: "20px" }}>
            <label className="text-gray-700 font-medium mb-2" style={{ margin: "20px" }}>Firmware Version</label>
            <input
              type="text"
              placeholder="e.g. v1.0.3"
              value={version}
              onChange={(e) => setVersion(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-400 outline-none transition-all"
            />
          </div>

          <button
            onClick={handleUpload}
            className="bg-blue-600 hover:bg-blue-700 transition-all text-white font-semibold px-6 py-3 rounded-xl w-full shadow-md"
          >
            🚀 Upload Firmware
          </button>

          {message && (
            <p className="text-center text-sm text-gray-700 mt-4">
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default UploadFirmwarePage;
