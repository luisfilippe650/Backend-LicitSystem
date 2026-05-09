import React, { useEffect, useState } from "react";
import Sidebar from "../../components/layout/Sidebar";
import "./ProcurementList.css";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "../../components/ui";

function ProcurementList() {
    const navigate = useNavigate();

    const irParaSelecao = () => {
        navigate("/CreateProcurements");
    };

    const [showFilter, setShowFilter] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState("");
    const [selectedTipo, setSelectedTipo] = useState("");
    const [selectedOrigem, setSelectedOrigem] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);
    
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 1440) {
                setItemsPerPage(5);
            } else {
                setItemsPerPage(7);
            }

            setCurrentPage(1);
        };

        handleResize();

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        }
    }, []);

    const procurements = [
        {
            id: 1,
            numeroAno: "21/2026",
            tipo: "Pregao Eletronico",
            origem: "SEAD",
            publicacao: "01/04/2026",
            abertura: "11/04/2026",
            status: "Aberto",
        },
        {
            id: 2,
            numeroAno: "22/2026",
            tipo: "Concorrencia Publica",
            origem: "SEOS",
            publicacao: "01/04/2026",
            abertura: "11/04/2026",
            status: "Em Andamento",
        },
        {
            id: 3,
            numeroAno: "23/2026",
            tipo: "Pregao Eletronico",
            origem: "SEMUS",
            publicacao: "01/04/2026",
            abertura: "11/04/2026",
            status: "Suspenso",
        },
        {
            id: 4,
            numeroAno: "24/2026",
            tipo: "Pregao Eletronico",
            origem: "SEMUS",
            publicacao: "01/04/2026",
            abertura: "11/04/2026",
            status: "Revogado",
        },
        {
            id: 5,
            numeroAno: "25/2026",
            tipo: "Concorrencia Publica",
            origem: "SEDU",
            publicacao: "01/04/2026",
            abertura: "11/04/2026",
            status: "Finalizado",
        },
        {
            id: 6,
            numeroAno: "26/2026",
            tipo: "Pregao Eletronico",
            origem: "SEAS",
            publicacao: "01/04/2026",
            abertura: "11/04/2026",
            status: "Finalizado",
        },
        {
            id: 7,
            numeroAno: "27/2026",
            tipo: "Concorrencia Publica",
            origem: "SEAS",
            publicacao: "01/04/2026",
            abertura: "11/04/2026",
            status: "Finalizado",
        },
    ];

    const filteredProcurements = procurements.filter((item) => {
        const matchesStatus = selectedStatus ? item.status === selectedStatus : true;
        const matchesTipo = selectedTipo ? item.tipo === selectedTipo : true;
        const matchesOrigem = selectedOrigem ? item.origem === selectedOrigem : true;

        return matchesStatus && matchesTipo && matchesOrigem;
    });

    const totalPages = Math.ceil(filteredProcurements.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const currentItems = filteredProcurements.slice(indexOfFirstItem, indexOfLastItem);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedStatus, selectedTipo, selectedOrigem]);

    const getStatusColor = (status) => {
        switch (status) {
            case "Aberto":
                return "#16A34A";
            case "Em Andamento":
                return "#2563EB";
            case "Suspenso":
                return "#DC2626";
            case "Revogado":
                return "#F59E0B";
            case "Finalizado":
                return "#1F2937";
            default:
                return "#fffff";
        }
    };

    return (
        <div className="page">
            <Sidebar/>

            <div className="content">
                <div className="top-bar">
                    <Input placeholder="Buscar..." icon="bi bi-search" className="input-search"/>

                    <div className="filter-container">
                        <button
                            className="filter-btn"
                            onClick={() => setShowFilter(!showFilter)}
                        >
                            <i className="bi bi-funnel-fill"></i>
                            Filtro
                        </button>

                        {showFilter && (
                            <div className="dropdown-filter">
                                <div className="filter-section">
                                    <h3 className="section-title">Status</h3>

                                    <div className="filter-grid status-grid">
                                        <button
                                            className={`filter-pill status-pill ${selectedStatus === "Aberto" ? "active" : ""}`}
                                            onClick={() => setSelectedStatus("Aberto")}
                                        >
                                            <span>Aberto</span>
                                            <span className="status-dot green"></span>
                                        </button>

                                        <button
                                            className={`filter-pill status-pill large-status ${selectedStatus === "Em Andamento" ? "active" : ""}`}
                                            onClick={() => setSelectedStatus("Em Andamento")}
                                        >
                                            <span>Em Andamento</span>
                                            <span className="status-dot blue"></span>
                                        </button>

                                        <button
                                            className={`filter-pill status-pill ${selectedStatus === "Suspenso" ? "active" : ""}`}
                                            onClick={() => setSelectedStatus("Suspenso")}
                                        >
                                            <span>Suspenso</span>
                                            <span className="status-dot red"></span>
                                        </button>

                                        <button
                                            className={`filter-pill status-pill ${selectedStatus === "Revogado" ? "active" : ""}`}
                                            onClick={() => setSelectedStatus("Revogado")}
                                        >
                                            <span>Revogado</span>
                                            <span className="status-dot orange"></span>
                                        </button>

                                        <button
                                            className={`filter-pill status-pill ${selectedStatus === "Finalizado" ? "active" : ""}`}
                                            onClick={() => setSelectedStatus("Finalizado")}
                                        >
                                            <span>Finalizado</span>
                                            <span className="status-dot dark"></span>
                                        </button>
                                    </div>
                                </div>

                                <div className="filter-section">
                                    <h3 className="section-title">Tipo de Licitação</h3>

                                    <div className="filter-grid type-grid">
                                        <button
                                            className={`filter-pill type-pill ${selectedTipo === "Pregao Eletronico" ? "active" : ""}`}
                                            onClick={() => setSelectedTipo("Pregao Eletronico")}
                                        >
                                            Pregão Eletrônico
                                        </button>

                                        <button
                                            className={`filter-pill type-pill ${selectedTipo === "Concorrencia Publica" ? "active" : ""}`}
                                            onClick={() => setSelectedTipo("Concorrencia Publica")}
                                        >
                                            Concorrencia Publica
                                        </button>
                                    </div>
                                </div>

                                <div className="filter-section">
                                    <h3 className="section-title">Origem</h3>

                                    <div className="filter-grid origin-grid">
                                        {[
                                            "SEGOV",
                                            "SEFAZ",
                                            "SEAD",
                                            "SEFI",
                                            "SEMEC",
                                            "SEMUS",
                                            "SEESP",
                                            "SMSP",
                                            "SEAS",
                                            "SEPCD",
                                            "SEMDH",
                                            "SEC",
                                            "SEPP",
                                            "SEOS",
                                            "SEMA",
                                            "SEDU",
                                            "SEDET",
                                            "SEAJ",
                                        ].map((origin) => (
                                            <button
                                                key={origin}
                                                className={`filter-pill origin-pill ${selectedOrigem === origin ? "active" : ""}`}
                                                onClick={() => setSelectedOrigem(origin)}
                                            >
                                                {origin}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="filter-actions">
                                    <button
                                        className="clear-filter-btn"
                                        onClick={() => {
                                            setSelectedStatus("");
                                            setSelectedTipo("");
                                            setSelectedOrigem("");
                                        }}
                                    >
                                        Limpar
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    <Button
                        className="btn-New"
                        variant="primary"
                        onClick={irParaSelecao}
                        icon="bi bi-plus-circle-fill"
                    >
                        Nova Licitação
                    </Button>
                </div>

                    <div className="pagination-modern">

                    <span className="page-info">
                      {currentPage} of {totalPages}
                    </span>

                        <div className="page-controls">
                            <button
                                className="page-btn"
                                onClick={() => setCurrentPage(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                <i className="bi bi-caret-left-fill"></i>
                            </button>

                            <button
                                className="page-btn"
                                onClick={() => setCurrentPage(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            >
                                <i className="bi bi-caret-right-fill"></i>
                            </button>
                        </div>

                    </div>

                <div className="table-container">
                    <table>
                        <thead>
                        <tr>
                            <th>Número/Ano</th>
                            <th>Tipo</th>
                            <th>Origem</th>
                            <th>Publicação</th>
                            <th>Abertura</th>
                            <th>Status</th>
                        </tr>
                        </thead>

                        <tbody>
                        {currentItems.length > 0 ? (
                            currentItems.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.numeroAno}</td>
                                    <td>{item.tipo}</td>
                                    <td>{item.origem}</td>
                                    <td>{item.publicacao}</td>
                                    <td>{item.abertura}</td>
                                    <td>
                      <span
                          className="status-dot"
                          style={{backgroundColor: getStatusColor(item.status)}}
                      ></span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6">Nenhuma licitação encontrada.</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ProcurementList;