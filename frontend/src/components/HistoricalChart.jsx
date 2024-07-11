import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { useParams } from "react-router-dom";
import api from "../api/api";
import "../assets/styles/historicalChart.scss";

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const HistoricalChart = () => {
  const { id } = useParams();
  const [historyData, setHistoryData] = useState([]);
  const [start, setStart] = useState("");
  const [stop, setStop] = useState("");
  const [mode, setMode] = useState("hourly");

  const fetchHistoryData = async () => {
    try {
      const response = await api.get(`/modules/${id}/history`, {
        params: {
          start,
          stop,
          mode,
        },
      });
      setHistoryData(response.data);
    } catch (err) {
      console.log("Error occurred while fetching historical data: ", err);
    }
  };

  useEffect(() => {
    if (start && stop) {
      fetchHistoryData();
    }
  }, [start, stop, mode]);

  const data = {
    labels: historyData.map((entry) =>
      new Date(entry.timestamp).toLocaleString()
    ),
    datasets: [
      {
        label: "Temperature",
        data: historyData.map((entry) => entry.temperature),
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="historical-data-container">
      <div className="historical-data-form">
        <div className="input-group">
          <label>
            Start Date:
            <input
              type="datetime-local"
              value={start}
              onChange={(e) => setStart(e.target.value)}
            />
          </label>
        </div>
        <div className="input-group">
          <label>
            Stop Date:
            <input
              type="datetime-local"
              value={stop}
              onChange={(e) => setStop(e.target.value)}
            />
          </label>
        </div>
        <div className="input-group">
          <label>
            Mode:
            <select value={mode} onChange={(e) => setMode(e.target.value)}>
              <option value="hourly">Hourly</option>
              <option value="daily">Daily</option>
            </select>
          </label>
        </div>
      </div>
      <Line data={data} />
    </div>
  );
};

export default HistoricalChart;
