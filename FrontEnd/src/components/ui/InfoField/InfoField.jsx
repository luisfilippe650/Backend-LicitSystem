import React from "react";
import "./InfoField.css";

function InfoField({ label, value, plain = false, muted = false }) {
  return (
    <div className={`info-field ${plain ? "plain" : ""} ${muted ? "muted" : ""}`}>
      <span className="info-label">{label}</span>
      <div className="info-value">{value}</div>
    </div>
  );
}

export default InfoField;