import React from "react";
import "./Card.css";

function Card({ title, icon: Icon, children, className = "", action }) {
  return (
    <article className={`detail-card ${className}`}>
      <header className="detail-card-header">
        <div className="detail-card-title">
          {Icon && <Icon size={24} />}
          <h3>{title}</h3>
        </div>

        {action}
      </header>

      <div className="detail-card-body">{children}</div>
    </article>
  );
}

export default Card;