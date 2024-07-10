import React, { useState, useEffect } from "react";
import { useNavigate} from "react-router-dom";
import api from "../api/api";
import '../assets/styles/home.scss';

const Home = () => {
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
    navigate(`/modules/${id}`)
  };

  useEffect(() => {
    fetchModules();
  }, []);
  return (
    <div className="home-container">
      {modules.map((el) => (
        <div
          className="home-container__module"
          key={el.id}
          onClick={()=>handleModuleSubmit(el.id)}
        >
          <p><b>Module name:</b> {el.name}</p>
          <p><b>Available:</b> {el.available ? "True" : "False"}</p>
          <p><b>Temperature:</b> {el.targetTemperature}</p>
        </div>
      ))}
    </div>
  );
}
export default Home;
