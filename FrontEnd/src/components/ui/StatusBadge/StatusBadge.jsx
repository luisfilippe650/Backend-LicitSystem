import React from "react";
import "./StatusBadge.css";

function StatusBadge({ status, label = "Status:" }) {
  const statusClass = String(status).toLowerCase();

  return (
    <div className="status-group">
      {label && <span className="info-label">{label}</span>}
      <span className={`status-badge ${statusClass}`}>{status}</span>
    </div>
  );
}

export default StatusBadge;