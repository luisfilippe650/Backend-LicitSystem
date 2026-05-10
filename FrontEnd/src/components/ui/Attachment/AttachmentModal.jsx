import React, { useState } from "react";
import { Paperclip, X } from "lucide-react";
import AttachmentItem from "./AttachmentItem";
import "./AttachmentModal.css";

function AttachmentModal({ anexos = [] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="attachments-card-button"
        type="button"
        onClick={() => setIsOpen(true)}
      >
        <Paperclip size={26} />
      </button>

      {isOpen && (
        <div className="attachments-modal-overlay">
          <section className="attachments-modal">
            <header className="attachments-modal-header">
              <div>
                <h2>Anexos</h2>
                <p>{anexos.length} arquivo(s)</p>
              </div>

              <button type="button" onClick={() => setIsOpen(false)}>
                <X size={22} />
              </button>
            </header>

            <div className="attachments-modal-body">
              {anexos.map((anexo, index) => (
                <AttachmentItem key={index} anexo={anexo} />
              ))}
            </div>
          </section>
        </div>
      )}
    </>
  );
}

export default AttachmentModal;