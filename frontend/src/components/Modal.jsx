import React, { useState } from "react";
import "../assets/styles/modal.scss";
import api from "../api/api";

const Modal = ({ show, id, close }) => {
  const [editData, setEditData] = useState({
    name: "",
    description: "",
    temperature: "",
  });
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    if (validationForm()) {
      try {
        const response = await api.patch(`/modules/${id}`, {
          name: editData.name,
          description: editData.description,
          targetTemperature: editData.temperature,
        });
        setEditData({
          name: "",
          description: "",
          temperature: "",
        });
        close();
        console.log(response);
      } catch (err) {
        console.log("Error occured while editing module: ", err);
      }
    }
  };

  const validationForm = () => {
    const warning = document.getElementById("warning");
    let isValidate = true;
    warning.innerHTML = "";
    if (!editData.name) {
      warning.innerHTML += "Name can't be empty"+'<br/>';
      isValidate = false;
    }
    if (!editData.description) {
      warning.innerHTML += "Description can't be empty"+'<br/>';
      isValidate = false;
    }
    if (!editData.temperature || editData.temperature < 0 || editData.temperature > 40) {
        warning.innerHTML += "Temperature must be between 0 and 40"+'<br/>';
        isValidate = false;
      }
    return isValidate;
  };
  if (!show) {
    return null;
  }
  return (
    <div className="modal-container">
      <form onSubmit={formSubmit}>
        <div className="input-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            onChange={handleInputChange}
            value={editData.name}

          ></input>
        </div>
        <div className="input-group">
          <label htmlFor="description">Description</label>
          <input
            id="description"
            name="description"
            onChange={handleInputChange}
            value={editData.description}
          ></input>
        </div>
        <div className="input-group">
          <label htmlFor="temperature">Temperature</label>
          <input
            id="temperature"
            type="number"
            name="temperature"
            onChange={handleInputChange}
            value={editData.temperature}
          ></input>
        </div>
        <div id="warning"></div>
        <button>Save</button>
        
      </form>
      <button className="close-button" onClick={close}>
        &times;
      </button>
    </div>
  );
};
export default Modal;
