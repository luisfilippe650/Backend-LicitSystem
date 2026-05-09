import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from "react"
import Sidebar from '../../components/layout/Sidebar';
import Input  from "../../components/ui/Input/Input"
import Button from "../../components/ui/Button/Button"
import { Home, ArrowLeft, Upload, Copy, AlertCircle, User, Lock } from "lucide-react"
import "./RemoteAccess.css"

function PageHeader() {
  return (
    <div className="page-header">
      <div className="page-header-esquerda">
        <button className="btn-back">
          <ArrowLeft size={18} />
        </button>
        <div>
          <h1>Acesso Remoto</h1>
          <p>Gerencie os usuários que podem ter acesso remoto</p>
        </div>
      </div>
      <div className="breadcrumb">
        <Home size={14} />
        <span>/</span>
        <span>Licitações</span>
        <span>/</span>
        <span className="breadcrumb-ativo">Acesso Remoto</span>
      </div>
    </div>
  )
}

function RemoteAccess() {
  const [dados, setDados] = useState({
    usuario: "",
    senha: "",
    perfil: "",
    validade: "",
    mensagem: "",
  })
  const [linkGerado, setLinkGerado] = useState("")
  const [copiado, setCopiado] = useState(false)

  const handleChange = (campo, valor) => {
    setDados(prev => ({ ...prev, [campo]: valor }))
  }

  const handleGerarLink = () => {
    const link = ``
    setLinkGerado(link)
    console.log("Link gerado:", link)
  }

  const handleCopiar = () => {
    navigator.clipboard.writeText(linkGerado)
    setCopiado(true)
    setTimeout(() => setCopiado(false), 2000)
  }

  return (
    <div className="wrapper">
      <Sidebar />
      <main className="main">
        <PageHeader />

        <div className="acesso-card">

          <div className="acesso-form">
            <div className="acesso-card-titulo">
              <div className="acesso-icon">
                <i className="bi bi-send"></i>
              </div>
              <div>
                <h2>Gerar link de Acesso</h2>
                <p>Crie um convite para que o prefeito ou outra pessoa possa acessar o sistema</p>
              </div>
            </div>

            <div className="campos-linha">
              <div className="campo">
                <label>Usuário de acesso</label>
                <Input
                  icon={User}
                  placeholder="Nome"
                  value={dados.usuario}
                  onChange={(e) => handleChange('usuario', e.target.value)}
                />
              </div>
              <div className="campo">
                <label>Senha de acesso</label>
                <Input
                  isPassword={true}
                  icon={Lock}
                  placeholder="••••••••"
                  value={dados.senha}
                  onChange={(e) => handleChange('senha', e.target.value)}
                />
              </div>
            </div>

            <div className="campos-linha">
              <div className="campo">
                <label>Perfil de acesso</label>
                <div className="select-wrapper">
                  <select
                    value={dados.perfil}
                    onChange={(e) => handleChange('perfil', e.target.value)}
                  >
                    <option value="" disabled>Selecione</option>
                    <option>Apenas visualização</option>
                    <option>Editor</option>
                    <option>Administrador</option>
                  </select>
                </div>
              </div>
              <div className="campo">
                <label>Validade do Link</label>
                <div className="select-wrapper">
                  <select
                    value={dados.validade}
                    onChange={(e) => handleChange('validade', e.target.value)}
                  >
                    <option value="" disabled>Selecione</option>
                    <option>7 dias</option>
                    <option>15 dias</option>
                    <option>30 dias</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="campo">
              <label>Mensagem <span className="opcional">(opcional)</span></label>
              <textarea
                className="textarea"
                placeholder='Olá! Você foi convidado a acessar o sisteman de licitaçoes. crie sua conta clicando no link abaixo.'
                value={dados.mensagem}
                onChange={(e) => handleChange('mensagem', e.target.value)}
              />
            </div>

            <div className="acesso-botoes">
              <Button variant="primary" onClick={handleGerarLink}>
                <i className="bi bi-link-45deg"></i>
                Gerar Link de Acesso
              </Button>
              <Button variant="segundary">
                <i className="bi bi-envelope"></i>
                Enviar por E-mail
              </Button>
            </div>
          </div>

          <div className="divisor"></div>

          <div className="acesso-info">
            <div className="link-gerado-box">
              <label>Link gerado:</label>
              <div className="link-input">
                <input
                  type="text"
                  readOnly
                  value={linkGerado || ""}
                  placeholder=""
                />
                <button className="btn-copiar" onClick={handleCopiar}>
                  <Copy size={18} />
                </button>
              </div>
              {copiado && <span className="copiado-msg">Copiado!</span>}
              <div className="link-aviso">
                <AlertCircle size={14} />
                <span>O link expira em 7 dias ou após o primeiro acesso</span>
              </div>
            </div>

            <div className="como-funciona">
              <p className="como-titulo">Como funciona:</p>
              <div className="passo">
                <div className="passo-numero">1</div>
                <p>Você gera e envia o link de convite</p>
              </div>
              <div className="passo-linha"></div>
              <div className="passo">
                <div className="passo-numero">2</div>
                <p>O novo usuario recebe, cria a conta e ativa o acesso</p>
              </div>
              <div className="passo-linha"></div>
              <div className="passo">
                <div className="passo-numero">3</div>
                <p>O usuário fica salvo na lista para próximos acessos</p>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}

export default RemoteAccess