import { Fragment, useState, useEffect } from "react"
import Sidebar from "../../components/layout/Sidebar"
import {
  Home,
  ArrowLeft,
  Eye,
  EyeOff,
  FileText,
  Clock,
  XCircle,
  PauseCircle,
  CheckSquare,
  FolderOpen,
  Plus,
  Link2,
} from "lucide-react"
import "./Dashboard.css"

const STATUS_MAP = {
  Aberto: "badge-aberto",
  "Em andamento": "badge-andamento",
  Suspenso: "badge-suspenso",
  Revogado: "badge-revogado",
  Finalizado: "badge-finalizado",
}

const COR_STATUS = {
  Aberto: "#22c55e",
  "Em andamento": "#3b82f6",
  Suspenso: "#ef4444",
  Revogado: "#f59e0b",
  Finalizado: "#1e1e2e",
}

function DonutChart({ data }) {
  const size = 220
  const r = 80
  const stroke = 44
  const circum = 2 * Math.PI * r

  if (!data || data.every((d) => d.percent === 0)) {
    return <div className="donut-vazio">Sem dados</div>
  }

  let acumulado = 0

  const slices = data.map((d) => {
    const dash = (d.percent / 100) * circum
    const slice = { ...d, dash, offset: circum - acumulado }
    acumulado += dash
    return slice
  })

  return (
    <div className="donut-wrapper">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {slices.map((s, i) => (
          <circle
            key={i}
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={s.cor}
            strokeWidth={stroke}
            strokeDasharray={`${s.dash} ${circum - s.dash}`}
            strokeDashoffset={s.offset}
          />
        ))}
      </svg>

      <div className="donut-legenda">
        {data.map((d, i) => (
          <div className="legenda-item" key={i}>
            <span
              className="legenda-dot"
              style={{ background: d.cor }}
            ></span>
            <span className="legenda-label">{d.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function PageHeader() {
  return (
    <div className="page-header">
      <div className="page-header-esquerda">
        <button className="btn-back">
          <ArrowLeft size={18} />
        </button>

        <div>
          <h1>DashBoard</h1>
          <p>Visão geral das licitações</p>
        </div>
      </div>

      <div className="breadcrumb">
        <Home size={14} />
        <span>/</span>
        <span>Licitações</span>
        <span>/</span>
        <span className="breadcrumb-ativo">Dashboard</span>
      </div>
    </div>
  )
}

const STAT_CONFIG = [
  { label: "Abertas", chave: "abertas", cor: "stat-verde", icon: FileText },
  { label: "Em Andamento", chave: "emAndamento", cor: "stat-azul", icon: Clock },
  { label: "Suspensas", chave: "suspensas", cor: "stat-vermelho", icon: XCircle },
  { label: "Revogadas", chave: "revogadas", cor: "stat-laranja", icon: PauseCircle },
  { label: "Finalizadas", chave: "finalizadas", cor: "stat-preto", icon: CheckSquare },
]

function CardStats({ resumo, loading }) {
  return (
    <div className="stats-row">
      {STAT_CONFIG.map((s) => {
        const Icon = s.icon

        return (
          <div className="stat-card" key={s.chave}>
            <div className="stat-top">
              <span className="stat-label">{s.label}</span>

              <div className={`stat-icon-box ${s.cor}-icon`}>
                <Icon size={20} />
              </div>
            </div>

            <span className={`stat-valor ${s.cor}`}>
              {loading ? "—" : resumo[s.chave] ?? 0}
            </span>
          </div>
        )
      })}
    </div>
  )
}

function TabelaLicitacoes({
  licitacoes,
  loading,
  linhasOcultas,
  onToggleOcultar,
}) {
  return (
    <div className="card tabela-card">
      <h3 className="tabela-titulo">Últimas Licitações</h3>

      <table className="tabela">
        <thead>
          <tr>
            <th>Nº do Processo</th>
            <th>Origem</th>
            <th>Status</th>
            <th>Data de Abertura</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {loading && (
            <tr>
              <td colSpan={5} className="tabela-empty">
                Carregando...
              </td>
            </tr>
          )}

          {!loading && licitacoes.length === 0 && (
            <tr>
              <td colSpan={5} className="tabela-empty">
                Nenhuma licitação encontrada
              </td>
            </tr>
          )}

          {!loading &&
            licitacoes.map((l, i) => {
              const id = l.id ?? i
              const oculta = linhasOcultas.includes(id)

              return (
                <Fragment key={id}>
                  <tr className="linha-controle">
                    <td
                      colSpan={4}
                      className={oculta ? "linha-controle-oculta-info" : ""}
                    >
                      {oculta && (
                        <span className="linha-oculta-aviso">
                          Linha oculta
                        </span>
                      )}
                    </td>

                    <td>
                      <button
                        className={`btn-ver ${oculta ? "btn-ver-oculto" : ""}`}
                        onClick={() => onToggleOcultar(id)}
                        title={oculta ? "Mostrar linha" : "Ocultar linha"}
                      >
                        {oculta ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </td>
                  </tr>

                  {!oculta && (
                    <tr className="linha-dados">
                      <td>{l.numero}</td>
                      <td>{l.origem}</td>
                      <td>
                        <span
                          className={`status-badge ${
                            STATUS_MAP[l.status] ?? "badge-finalizado"
                          }`}
                        >
                          {l.status?.toUpperCase()}
                        </span>
                      </td>
                      <td>{l.dataAbertura}</td>
                      <td></td>
                    </tr>
                  )}
                </Fragment>
              )
            })}
        </tbody>
      </table>

      <div className="tabela-rodape">
        <button className="btn-ver-todas">Ver todas</button>
      </div>
    </div>
  )
}

function CardGrafico({ chartData, loading }) {
  return (
    <div className="card grafico-card">
      <h3 className="tabela-titulo">Licitações por Status</h3>

      {loading ? (
        <div className="donut-vazio">Carregando...</div>
      ) : (
        <DonutChart data={chartData} />
      )}
    </div>
  )
}

function FooterBar({ total, loading }) {
  return (
    <div className="footer-bar">
      <div className="footer-total">
        <div className="footer-total-esquerda">
          <span className="footer-label">Total de Licitações</span>
          <span className="footer-valor">{loading ? "—" : total ?? 0}</span>
        </div>

        <div className="footer-total-icon">
          <FolderOpen size={22} />
        </div>
      </div>

      <div className="footer-acoes">
        <span className="footer-acoes-titulo">Ações Rápidas</span>

        <div className="footer-acoes-botoes">
          <button className="btn-acao">
            <Plus size={16} />
            Nova Licitação
          </button>

          <button className="btn-acao">
            <Link2 size={16} />
            Gerar Acesso
          </button>
        </div>
      </div>
    </div>
  )
}

function Dashboard() {
  const [loading, setLoading] = useState(true)
  const [resumo, setResumo] = useState({})
  const [licitacoes, setLicitacoes] = useState([])
  const [chartData, setChartData] = useState([])
  const [total, setTotal] = useState(null)
  const [linhasOcultas, setLinhasOcultas] = useState([])

  useEffect(() => {
    setResumo({
      abertas: 34,
      emAndamento: 28,
      suspensas: 10,
      revogadas: 6,
      finalizadas: 50,
    })

    setTotal(128)

    setChartData([
      { label: "Aberto", percent: 27, cor: COR_STATUS.Aberto },
      {
        label: "Em Andamento",
        percent: 22,
        cor: COR_STATUS["Em andamento"],
      },
      { label: "Suspenso", percent: 8, cor: COR_STATUS.Suspenso },
      { label: "Revogado", percent: 5, cor: COR_STATUS.Revogado },
      { label: "Finalizado", percent: 39, cor: COR_STATUS.Finalizado },
    ])

    setLicitacoes([
      {
        id: 1,
        numero: "21/2026",
        origem: "SEAD",
        status: "Aberto",
        dataAbertura: "15/05/2026",
      },
    ])

    setLoading(false)
  }, [])

  const handleToggleOcultar = (id) => {
    setLinhasOcultas((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  return (
    <div className="wrapper">
      <Sidebar />

      <main className="main">
        <PageHeader />

        <CardStats resumo={resumo} loading={loading} />

        <div className="meio-row">
          <TabelaLicitacoes
            licitacoes={licitacoes}
            loading={loading}
            linhasOcultas={linhasOcultas}
            onToggleOcultar={handleToggleOcultar}
          />

          <CardGrafico chartData={chartData} loading={loading} />
        </div>

        <FooterBar total={total} loading={loading} />
      </main>
    </div>
  )
}

export default Dashboard