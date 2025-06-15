import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts';

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyDCL7E3J7PXYlOVkAZuee9AWKdcmcqpdLs",
  authDomain: "esp32-iot-project-75fdf.firebaseapp.com",
  databaseURL: "https://esp32-iot-project-75fdf-default-rtdb.firebaseio.com",
  projectId: "esp32-iot-project-75fdf",
  storageBucket: "esp32-iot-project-75fdf.firebasestorage.app",
  messagingSenderId: "977259537662",
  appId: "1:977259537662:web:767238c95db10f90a7f1af"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

function RealtimeDashboard() {
  const [deviceIds, setDeviceIds] = useState([]);
  const [deviceData, setDeviceData] = useState({});
  const [selectedDevice, setSelectedDevice] = useState('');

  useEffect(() => {
    const iotRef = ref(db, 'iot');
    onValue(iotRef, (snapshot) => {
      const devices = snapshot.val();
      if (!devices) return;

      const ids = Object.keys(devices);
      setDeviceIds(ids);

      // if (!selectedDevice) setSelectedDevice(ids[0]); // default select first device
      setSelectedDevice((current) => current || ids[0] || '');

      const updatedData = {};
      ids.forEach((id) => {
        const logs = devices[id]?.logs || {};
        const chartData = Object.values(logs).map((entry) => ({
          timestamp: entry.timestamp,
          time: new Date(entry.timestamp).toLocaleTimeString(),
          temperature: entry.temperature,
          humidity: entry.humidity,
        }));
        chartData.sort((a, b) => a.timestamp - b.timestamp);
        updatedData[id] = chartData.slice(-30);
      });
      setDeviceData(updatedData);
    });
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">🌡️ ESP32 Live Sensor Dashboard</h1>

      {/* Dropdown for selecting device */}
      <div className="mb-6 flex justify-center">
        <select
          className="border border-gray-300 rounded-lg px-4 py-2 text-lg"
          value={selectedDevice}
          onChange={(e) => setSelectedDevice(e.target.value)}
        >
          {deviceIds.map((id) => (
            <option key={id} value={id}>
              {id}
            </option>
          ))}
        </select>
      </div>

      {selectedDevice && deviceData[selectedDevice] && (
        <>
          {/* Chart */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-10">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">{selectedDevice} - Live Chart</h2>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={deviceData[selectedDevice]} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
                <CartesianGrid strokeDasharray="4 4" stroke="#e0e0e0" />
                <XAxis dataKey="time" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#ffffff", borderColor: "#dddddd" }}
                  labelStyle={{ color: "#666" }}
                  cursor={{ stroke: "#ccc", strokeWidth: 1 }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="temperature"
                  stroke="#FF6B6B"
                  strokeWidth={3}
                  dot={false}
                  name="Temperature (°C)"
                />
                <Line
                  type="monotone"
                  dataKey="humidity"
                  stroke="#4ECDC4"
                  strokeWidth={3}
                  dot={false}
                  name="Humidity (%)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Table */}
          {/* <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">{selectedDevice} - Live Data Table</h2>
            <div className="overflow-x-auto">
              <table className="table-auto w-full border border-gray-200">
                <thead>
                  <tr className="bg-gray-100 text-gray-700">
                    <th className="border px-4 py-2">Time</th>
                    <th className="border px-4 py-2">Temperature (°C)</th>
                    <th className="border px-4 py-2">Humidity (%)</th>
                  </tr>
                </thead>
                <tbody>
                  {deviceData[selectedDevice].slice(-20).map((row, index) => (
                    <tr key={index} className="text-center hover:bg-gray-50 transition-all">
                      <td className="border px-4 py-2">{row.time}</td>
                      <td className="border px-4 py-2 text-red-600 font-medium">{row.temperature}</td>
                      <td className="border px-4 py-2 text-blue-600 font-medium">{row.humidity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div> */}
        </>
      )}
    </div>
  );
}

export default RealtimeDashboard;