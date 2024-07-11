import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Modal from "../components/Modal";
import "../assets/styles/module.scss";
import io from "socket.io-client";
import HistoricalChart from "../components/HistoricalChart";

const Module = () => {
  const [temperature, setTemperature] = useState();
  const { id } = useParams();
  const [module, setModule] = useState();
  const [warningMessage, setWarningMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
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

  useEffect(() => {
    const socket = io("localhost:3001", {
      transports: ["websocket"],
    });
    socket.on("connection", () => {
      console.log("connected to socket io");
    });
    socket.on("moduleUpdate", (data) => {
      let obj = data.find((el) => el.id === id);
      if (obj) setTemperature(obj.temperature);
    });
    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <div className="module-container">
      {module ? (
        <div className="module-container__information">
          <h1>{module.name}</h1>
          <p>
            <b>Description:</b> {module.description}
          </p>
          <p>
            <b>Available:</b> {module.available ? "True" : "False"}
          </p>
          <p>
            <b>Target temperature:</b> {module.targetTemperature}
          </p>
          <p>
            <b>Temperature:</b>{" "}
            <span
              style={{
                color:
                  temperature === undefined
                    ? "black"
                    : (temperature - module.targetTemperature)>0.5 || (temperature - module.targetTemperature) <-0.5
                    ? "green"
                    : "red"
              }}
              
            >
              {temperature ? temperature : "N/A"}
            </span>
          </p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <div className="module-container__edit-container">
        <button
          id="edit-button"
          className="edit-container_button"
          onClick={() => setModalOpen(true)}
        >
          Edit
        </button>
        <p className="edit-container__warning">{warningMessage}</p>
      </div>
      <div className="module-container__return-button">
        <Link to="/">
          <FontAwesomeIcon icon={faArrowLeft} size="3x" />
        </Link>
      </div>
      {module && module.available && (
        <>
          <div className="module-container__return-button">
            <Link to="/">
              <FontAwesomeIcon icon={faArrowLeft} size="3x" />
            </Link>
          </div>
          <Modal
            show={modalOpen}
            id={id}
            close={() => {
              setModalOpen(false);
              fetchModule();
            }}
          />
          <HistoricalChart />
        </>
      )}
    </div>
  );
};
export default Module;
