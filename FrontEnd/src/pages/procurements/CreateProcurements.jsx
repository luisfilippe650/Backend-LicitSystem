import React from 'react';
import { useNavigate } from "react-router-dom";

import Sidebar from '../../components/layout/Sidebar';

function CreateProcurements() {
    const navigate = useNavigate();

    return (
        <div
            style={{
                display: "flex",
                minHeight: "100vh",
                background: "var(--bg)",
            }}
        >
            <Sidebar />

            <main
                style={{
                    flex: 1,
                    marginLeft: "150px",
                    padding: "40px",
                }}
            >
                <h1
                    style={{
                        margin: 0,
                        color: "var(--text-primary, #1f2937)",
                        fontSize: "36px",
                    }}
                >
                    Nova Licitação
                </h1>

                <p
                    style={{
                        marginTop: "8px",
                        color: "var(--text-secondary, #6b7280)",
                        fontSize: "18px",
                    }}
                >
                    Essa é a tela de cadastro de uma nova licitação.
                </p>

                <button
                    type="button"
                    onClick={() => navigate("/procurements")}
                    style={{
                        marginTop: "24px",
                        height: "48px",
                        padding: "0 20px",
                        border: "none",
                        borderRadius: "12px",
                        background: "#2563EB",
                        color: "#FFFFFF",
                        cursor: "pointer",
                        fontSize: "16px",
                    }}
                >
                    Voltar para Licitações
                </button>
            </main>
        </div>
    );
}

export default CreateProcurements;