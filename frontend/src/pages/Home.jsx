import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import "../assets/styles/home.scss";
import io from "socket.io-client";

const Home = () => {
  const [temperatures, setTemperatures] = useState([]);
  const [modules, setModules] = useState([]);
  const navigate = useNavigate();
  const fetchModules = async () => {
    try {
      const response = await api.get("/modules");
      setModules(response.data);
    } catch (err) {
      console.log("Error occured while fetching modules: ", err);
    }
  };

  const handleModuleSubmit = (id) => {
    navigate(`/modules/${id}`);
  };

  useEffect(() => {
    fetchModules();
  }, []);
  useEffect(() => {
    const socket = io("localhost:3001", {
      transports: ["websocket"],
    });
    socket.on("connection", () => {
      console.log("connected to socket io");
    });
    socket.on("moduleUpdate", (data) => {
      setTemperatures(data);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="home-container">
      {modules.map((el) =>{
        const tempData = temperatures.find((temp) => temp.id === el.id);
        const temperature = tempData ? tempData.temperature : null;
        const isInRange = (temperature - el.targetTemperature)>0.5 || (temperature - el.targetTemperature) <-0.5
        const style = {
          color: isInRange ? "red": "green",
        }
        return (
        
        <div
          className="home-container__module"
          key={el.id}
          onClick={() => handleModuleSubmit(el.id)}
        >
          <p>
            <b>Module name:</b> {el.name}
          </p>
          <p>
            <b>Available:</b> {el.available ? "True" : "False"}
          </p>
          <p>
            <b>Target temperature:</b> {el.targetTemperature}
          </p>
          <p>
            <b>Temperature:</b> <span style={tempData ? style : null}>{tempData ? tempData.temperature : "N/A"}</span>
          </p>
        </div>
        );
      })}
    </div>
  );
};
export default Home;
