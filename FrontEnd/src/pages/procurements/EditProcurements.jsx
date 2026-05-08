import React, { useState } from "react";
import { ArrowLeft, Home, Pencil, IdCard, CalendarDays, FolderOpen, CircleDollarSign, Landmark, Paperclip, Trash2, Save,  X,} from "lucide-react";
import "./EditProcurements.css";

const initialLicitacao = {
  numero: "",
  ano: "",
  tipo: "",
  status: "",
  objeto: "",
  descricao: "",
  dataPublicacao: "",
  dataAbertura: "",
  dataCriacao: "",
  classificacao: "",
  valorEstimado: "",
  secretaria: "",
  anexos: [],
};

const tiposLicitacao = [
  "Pregão Eletrônico",
  "Concorrência",
  "Tomada de Preços",
];

const statusLicitacao = [
  "Aberto",
  "Em Andamento",
  "Suspenso",
  "Revogado",
  "Finalizado",
];

const classificacoes = ["Global", "Por Item", "Por Lote"];

const secretarias = [
  "Secretaria de Administração",
  "Secretaria de Educação",
  "Secretaria de Saúde",
];

export default function EditarLicitacao() {
  const [licitacao, setLicitacao] = useState(initialLicitacao);

  function handleChange(campo, valor) {
    setLicitacao((prev) => ({
      ...prev,
      [campo]: valor,
    }));
  }

  return (
    <div className="wrapper">
      <main className="main">
        <div className="detalhes-wrapper">
          <PageHeader licitacao={licitacao} />
          <EditarCard licitacao={licitacao} onChange={handleChange} />
        </div>
      </main>
    </div>
  );
}

function PageHeader({ licitacao }) {
  const titulo = `Pregão Eletrônico nº ${licitacao.numero || "---"}/${licitacao.ano || "----"}`;

  return (
    <div className="page-header">
      <div className="page-header-esquerda">
        <button className="btn-back" type="button">
          <ArrowLeft size={18} />
        </button>

        <div className="titulo">
          <h1>Editar Licitação</h1>
          <p>Altere informações da licitação</p>
        </div>
      </div>

      <div className="page-header-direita">
        <div className="breadcrumb">
          <Home size={14} />
          <span>/</span>
          <span>Licitações</span>
          <span>/</span>
          <span className="breadcrumb-ativo">{titulo}</span>
        </div>
      </div>
    </div>
  );
}

function EditarCard({ licitacao, onChange }) {
  const titulo = `${licitacao.tipo || "Licitação"} nº ${licitacao.numero || "---"}/${licitacao.ano || "----"}`;

  return (
    <div className="licitacao-card">
      <div className="licitacao-card-header">
        <div className="licitacao-card-titulo">
          <h2>{titulo}</h2>
          <p>Criada em {licitacao.dataCriacao || "Data não informada"}</p>
        </div>

        <div className="licitacao-card-acoes">
          <ButtonAction className="btn-excluir" icon={Trash2}>
            Excluir
          </ButtonAction>

          <ButtonAction className="btn-cancelar" icon={X}>
            Cancelar
          </ButtonAction>

          <ButtonAction className="btn-salvar" icon={Save}>
            Salvar
          </ButtonAction>
        </div>
      </div>

      <div className="cards-linha">
        <CardIdentificacao licitacao={licitacao} onChange={onChange} />
        <CardDescricao licitacao={licitacao} onChange={onChange} />
        <CardDatas licitacao={licitacao} onChange={onChange} />
      </div>

      <div className="cards-linha">
        <CardClassificacao licitacao={licitacao} onChange={onChange} />
        <CardFinanceiro licitacao={licitacao} onChange={onChange} />
        <CardOrigem licitacao={licitacao} onChange={onChange} />
        <CardAnexos licitacao={licitacao} onChange={onChange} />
      </div>
    </div>
  );
}

function CardIdentificacao({ licitacao, onChange }) {
  return (
    <CardSection icon={IdCard} title="Identificação">
      <div className="card-linha">
        <FormInput label="Número" value={licitacao.numero} onChange={(valor) => onChange("numero", valor)} />
        <FormInput label="Ano" value={licitacao.ano} onChange={(valor) => onChange("ano", valor)} />
      </div>

      <FormSelect label="Tipo de Licitação" value={licitacao.tipo} options={tiposLicitacao} onChange={(valor) => onChange("tipo", valor)} />

      <FormSelect label="Status" value={licitacao.status} options={statusLicitacao} onChange={(valor) => onChange("status", valor)} />
    </CardSection>
  );
}

function CardDescricao({ licitacao, onChange }) {
  return (
    <CardSection icon={Pencil} title="Descrição" className="card-largo">
      <FormTextarea label="Objeto" value={licitacao.objeto} onChange={(valor) => onChange("objeto", valor)} />

      <FormTextarea label="Descrição do Objeto" value={licitacao.descricao} onChange={(valor) => onChange("descricao", valor)} />
    </CardSection>
  );
}

function CardDatas({ licitacao, onChange }) {
  return (
    <CardSection icon={CalendarDays} title="Datas">
      <FormInput label="Data de Publicação" type="date" value={licitacao.dataPublicacao} onChange={(valor) => onChange("dataPublicacao", valor)} />

      <FormInput label="Data de Abertura" type="date" value={licitacao.dataAbertura} onChange={(valor) => onChange("dataAbertura", valor)} />
    </CardSection>
  );
}

function CardClassificacao({ licitacao, onChange }) {
  return (
    <CardSection icon={FolderOpen} title="Classificação">
      <FormSelect label="Classificação" value={licitacao.classificacao} options={classificacoes} onChange={(valor) => onChange("classificacao", valor)} />
    </CardSection>
  );
}

function CardFinanceiro({ licitacao, onChange }) {
  return (
    <CardSection icon={CircleDollarSign} title="Financeiro">
      <FormInput label="Valor Estimado" value={licitacao.valorEstimado} onChange={(valor) => onChange("valorEstimado", valor)} />
    </CardSection>
  );
}

function CardOrigem({ licitacao, onChange }) {
  return (
    <CardSection icon={Landmark} title="Origem">
      <FormSelect label="Secretaria Responsável" value={licitacao.secretaria} options={secretarias} onChange={(valor) => onChange("secretaria", valor)} />
    </CardSection>
  );
}

function CardAnexos({ licitacao, onChange }) {
  function removerAnexo(nome) {
    const novosAnexos = licitacao.anexos.filter((anexo) => anexo.nome !== nome);
    onChange("anexos", novosAnexos);
  }

  function removerTodosAnexos() {
    onChange("anexos", []);
  }

  return (
    <CardSection
      icon={Paperclip}
      title="Anexos"
      action={
        <button className="btn-excluir-todos" type="button" onClick={removerTodosAnexos}>
          <X size={14} />
          Excluir todos
        </button>
      }
    >
      {licitacao.anexos.length === 0 ? (
        <p className="card-label">Nenhum anexo cadastrado.</p>
      ) : (
        licitacao.anexos.map((anexo) => (
          <div className="anexo-item" key={anexo.nome}>
            <div className="anexo-info">
              <div>
                <p className="card-valor">{anexo.nome}</p>
                <span className="card-label">{anexo.tamanho}</span>
              </div>
            </div>

            <button className="btn-remover-anexo" type="button" onClick={() => removerAnexo(anexo.nome)}>
              <X size={16} />
            </button>
          </div>
        ))
      )}
    </CardSection>
  );
}

function CardSection({ icon: Icon, title, children, action, className = "" }) {
  return (
    <div className={`card ${className}`}>
      <div className="card-header">
        <Icon size={18} />
        <h3>{title}</h3>
        {action}
      </div>

      <div className="card-body">{children}</div>
    </div>
  );
}

function FormInput({ label, value, onChange, type = "text" }) {
  return (
    <label className="campo">
      <span className="card-label">{label}</span>
      <input className="input" type={type} value={value} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}

function FormTextarea({ label, value, onChange }) {
  return (
    <label className="campo">
      <span className="card-label">{label}</span>
      <textarea className="input input-textarea" value={value} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}

function FormSelect({ label, value, options, onChange }) {
  return (
    <label className="campo">
      <span className="card-label">{label}</span>

      <select className="input" value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">Selecione</option>

        {options.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function ButtonAction({ children, icon: Icon, className }) {
  return (
    <button className={className} type="button">
      <Icon size={16} />
      {children}
    </button>
  );
}