import React from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Home,
  IdCard,
  Pencil,
  CalendarDays,
  FolderOpen,
  CircleDollarSign,
  Landmark,
  Printer,
} from "lucide-react";

import Sidebar from "../../components/layout/Sidebar";
import {
  Card,
  InfoField,
  StatusBadge,
  Button,
  AttachmentModal,
} from "../../components/ui/main";

import FormatProcurements from "../../components/shared/FormatProcurements";
import { procurements } from "../../database/procurements";
import "./DetailsProcurements.css";

const ACTIVE_STATUSES = ["ABERTO", "EM ANDAMENTO"];
const INACTIVE_STATUSES = ["REVOGADO", "SUSPENSO", "FINALIZADO"];

function parseBrazilianDate(dateString) {
  if (!dateString) return null;

  const [day, month, year] = dateString.split("/").map(Number);

  if (!day || !month || !year) return null;

  return new Date(year, month - 1, day, 12, 0, 0);
}

function getTodayAtMidday() {
  const today = new Date();
  return new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    12,
    0,
    0
  );
}

function calculateDaysUntil(openingDateString) {
  const openingDate = parseBrazilianDate(openingDateString);

  if (!openingDate) return null;

  const today = getTodayAtMidday();
  const differenceInMs = openingDate.getTime() - today.getTime();

  return Math.ceil(differenceInMs / (1000 * 60 * 60 * 24));
}

function getDeadlineInfo(procurement) {
  const status = procurement.status?.toUpperCase();
  const daysUntilOpening = calculateDaysUntil(procurement.abertura);

  if (INACTIVE_STATUSES.includes(status)) {
    return {
      type: "neutral",
      label: "Cronograma interrompido",
      value: "Processo sem prazo ativo",
      description: `Status atual: ${procurement.status}`,
    };
  }

  if (!ACTIVE_STATUSES.includes(status)) {
    return {
      type: "neutral",
      label: "Prazo indisponível",
      value: "Status não reconhecido",
      description: `Status atual: ${procurement.status}`,
    };
  }

  if (daysUntilOpening === null) {
    return {
      type: "neutral",
      label: "Prazo indisponível",
      value: "Data inválida",
      description: "Verifique a data de abertura",
    };
  }

  if (daysUntilOpening < 0) {
    return {
      type: "negative",
      label: "Abertura vencida",
      value: `${Math.abs(daysUntilOpening)} dias atrás`,
      description: "A data de abertura já passou",
    };
  }

  if (daysUntilOpening === 0) {
    return {
      type: "positive",
      label: "Abertura hoje",
      value: "Hoje",
      description: "O processo abre hoje",
    };
  }

  return {
    type: "positive",
    label: "Abertura em",
    value: `${daysUntilOpening}`,
    description: daysUntilOpening === 1 ? "dia restante" : "dias restantes",
  };
}

function DetailsProcurements() {
  const { id } = useParams();

  const procurement = procurements.find((item) => item.id === Number(id));

  if (!procurement) {
    return <p>Licitação não encontrada.</p>;
  }

  const tituloLicitacao = FormatProcurements(procurement);
  const anexos = procurement.anexos ?? [];
  const deadlineInfo = getDeadlineInfo(procurement);

  return (
    <div className="procurement-page">
      <Sidebar />

      <main className="procurement-main">
        <header className="page-header">
          <div className="page-title-group">
            <Link to="/ProcurementList" className="back-button">
              <ArrowLeft size={26} />
            </Link>

            <div>
              <h1>Detalhes da Licitação</h1>
              <p>Visualize informações da licitação</p>
            </div>
          </div>

          <nav className="breadcrumb">
            <Home size={15} />
            <span>/ Licitações /</span>
            <strong>{tituloLicitacao}</strong>
          </nav>
        </header>

        <section className="details-container">
          <div className="details-top">
            <div>
              <h2>{tituloLicitacao}</h2>
              <p>Criada em {procurement.criadoEm}</p>
            </div>

            <div className="details-actions">
              <AttachmentModal anexos={anexos} />

              <Button variant="secondary" className="btn">
                <Pencil size={24} />
                Editar
              </Button>

              <Button variant="primary" className="btn">
                <Printer size={24} />
                Imprimir
              </Button>
            </div>
          </div>

          <div className="cards-grid">
            <Card title="Identificação" icon={IdCard} className="span-3">
              <div className="two-columns">
                <InfoField label="Número:" value={procurement.numero} plain />
                <InfoField label="Ano:" value={procurement.ano} plain />
              </div>

              <InfoField label="Tipo de Licitação:" value={procurement.tipo} />
              <StatusBadge status={procurement.status} />
            </Card>

            <Card title="Descrição" icon={Pencil} className="span-5">
              <InfoField label="Objeto:" value={procurement.objeto} />
              <InfoField
                label="Descrição do Objeto:"
                value={procurement.descricao}
              />
            </Card>

            <Card title="Datas" icon={CalendarDays} className="span-4">
              <InfoField
                label="Data de Publicação:"
                value={procurement.publicacao}
              />
              <InfoField
                label="Data de Abertura:"
                value={procurement.abertura}
              />
            </Card>

            <Card
              title="Classificação"
              icon={FolderOpen}
              className="span-3 compact-card"
            >
              <div className="compact-card-content">
                <InfoField
                  label="Classificação:"
                  value={procurement.classificacao}
                />
              </div>
            </Card>

            <Card
              title="Financeiro"
              icon={CircleDollarSign}
              className="span-3 compact-card"
            >
              <div className="compact-card-content">
                <InfoField
                  label="Valor Estimado:"
                  value={procurement.valorEstimado}
                />
              </div>
            </Card>

            <Card
              title="Origem"
              icon={Landmark}
              className="span-3 compact-card"
            >
              <div className="compact-card-content">
                <InfoField
                  label="Secretaria Responsável:"
                  value={procurement.secretaria}
                  muted
                />
              </div>
            </Card>

            <Card
              title="Prazo"
              icon={CalendarDays}
              className={`span-3 compact-card deadline-card deadline-${deadlineInfo.type}`}
            >
              <div className="compact-card-content countdown-compact">
                <span className="countdown-label">{deadlineInfo.label}</span>

                <div className="countdown-line">
                  <strong className="countdown-days">
                    {deadlineInfo.value}
                  </strong>
                </div>
              </div>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}

export default DetailsProcurements;