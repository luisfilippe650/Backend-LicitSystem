import React from "react";
import { Download, FileText, FileSpreadsheet } from "lucide-react";
import "./AttachmentItem.css";

function AttachmentItem({ anexo }) {
  const isSpreadsheet = anexo.tipo === "xlsx";
  const Icon = isSpreadsheet ? FileSpreadsheet : FileText;

  return (
    <div className="attachment-item">
      <div className="attachment-info">
        <Icon size={20} className={isSpreadsheet ? "file-xlsx" : "file-doc"} />

        <div>
          <strong>{anexo.nome}</strong>
          <span>{anexo.tamanho}</span>
        </div>
      </div>

      <button className="attachment-download" type="button">
        <Download size={15} />
      </button>
    </div>
  );
}

export default AttachmentItem;