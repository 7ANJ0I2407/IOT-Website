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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

function RealtimeDashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const sensorRef = ref(db, 'iot/ESP32-1/logs');
    onValue(sensorRef, (snapshot) => {
      const values = snapshot.val();
      const chartData = [];
      for (let key in values) {
        chartData.push({
          time: new Date(values[key].timestamp).toLocaleTimeString(),
          temperature: values[key].temperature,
          humidity: values[key].humidity,
        });
      }
      chartData.sort((a, b) => new Date(a.time) - new Date(b.time));
      setData(chartData);
      // console.log(chartData);
    });
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">🌡️ ESP32 Live Sensor Dashboard</h1>

      <div className="bg-white rounded-2xl shadow-lg p-6 mb-10">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Live Chart</h2>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
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

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Live Data Table</h2>
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
              {data.map((row, index) => (
                <tr key={index} className="text-center hover:bg-gray-50 transition-all">
                  <td className="border px-4 py-2">{row.time}</td>
                  <td className="border px-4 py-2 text-red-600 font-medium">{row.temperature}</td>
                  <td className="border px-4 py-2 text-blue-600 font-medium">{row.humidity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default RealtimeDashboard;
