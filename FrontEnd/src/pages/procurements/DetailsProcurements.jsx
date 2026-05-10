import React from "react";
import { Link, useParams } from "react-router-dom";
import {ArrowLeft, Home, IdCard, Pencil, CalendarDays, FolderOpen, CircleDollarSign, Landmark, Paperclip, Printer, Download,} from "lucide-react";

import Sidebar from "../../components/layout/Sidebar";
import {Card, InfoField, StatusBadge, AttachmentItem, Button, AttachmentModal} from "../../components/ui/main";

import FormatProcurements from "../../components/shared/FormatProcurements";
import { procurements } from "../../database/procurements";
import "./DetailsProcurements.css";

function DetailsProcurements() {
  const { id } = useParams();

  const procurement = procurements.find((item) => item.id === Number(id));

  if (!procurement) {
    return <p>Licitação não encontrada.</p>;
  }

  const tituloLicitacao = FormatProcurements(procurement);
  const anexos = procurement.anexos ?? [];

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
              <InfoField label="Descrição do Objeto:" value={procurement.descricao} />
            </Card>

            <Card title="Datas" icon={CalendarDays} className="span-4">
              <InfoField label="Data de Publicação:" value={procurement.publicacao} />
              <InfoField label="Data de Abertura:" value={procurement.abertura} />
            </Card>

            <Card title="Classificação" icon={FolderOpen} className="span-3">
              <InfoField label="Classificação:" value={procurement.classificacao} />

              {anexos[2] && <AttachmentItem anexo={anexos[2]} />}
            </Card>

            <Card title="Financeiro" icon={CircleDollarSign} className="span-3">
              <InfoField label="Valor Estimado:" value={procurement.valorEstimado} />
            </Card>

            <Card title="Origem" icon={Landmark} className="span-3">
              <InfoField
                label="Secretaria Responsável:"
                value={procurement.secretaria}
                muted
              />
            </Card>

            
            <Card title="Prazo" icon={CalendarDays} className="span-3">
              <div className="countdown-box">
                <span className="countdown-label">Abertura em</span>

                <div className="countdown-days">
                  12
                </div>

                <small>dias restantes</small>
              </div>
            </Card>

          </div>
        </section>
      </main>
    </div>
  );
}

export default DetailsProcurements;