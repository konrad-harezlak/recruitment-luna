import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Module = () => {
  const { id } = useParams();
  const [module, setModule] = useState();
  const [warningMessage, setWarningMessage] = useState("");
  const fetchModule = async () => {
    try {
      const response = await api.get(`/modules/${id}`);
      setModule(response.data);
    } catch (err) {
      console.log("Error occured while fetching module: ", err);
    }
  };
  useEffect(() => {
    fetchModule();
    const btn = document.getElementById("edit-button");
    if (module && !module.available) {
      btn.disabled = true;
      setWarningMessage("You can't edit this module!");
    } else {
      btn.disabled = false;
      setWarningMessage("");
    }
  }, [module]);
  return (
    <div className="module-container">
      {module ? (
        <div className="module-container__information">
          <p>Name: {module.name}</p>
          <p>Description: {module.description}</p>
          <p>Available: {module.available ? "True" : "False"}</p>
          <p>Temperature: {module.targetTemperature}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <div className="module-container__edit-container">
        <button id="edit-button" className="edit-container_button">
          Edit
        </button>
        <p className="edit-container__warning">{warningMessage}</p>
      </div>
      <div className="module-container__return-button">
        <FontAwesomeIcon icon={faArrowLeft}  size="3x"/>
      </div>
    </div>
  );
};
export default Module;
