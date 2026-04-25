import React, { useState } from 'react'
import { User, Lock, Eye, EyeOff } from 'lucide-react'
import "./Login.css";
import {logo, lighting, male_laptop, name} from "../../assets/images/images.js"
import {Button, Input} from "../../components/ui/index.jsx";
import { NavLink } from "react-router-dom";


function Login() {
    const [cpf, setCpf] = useState("")
    const [senha, setSenha] = useState("")
    const [mostrarSenha, setMostrarSenha] = useState(false)
    const [lembrar, setLembrar] = useState(false)

    const enviar = (event) => {
        event.preventDefault()
        const dados = { cpf, senha, lembrar }
        console.log("Login:", dados)
    }

    return (
        <div className='wrapper'>

            <div className='panel-left'>
                <div className='logo'>
                    <img src={logo} alt="LicitSys" className='logo-img'/>
                    <img src={name} alt="LicitSys" className='logo-name'/>
                    <div>
                        <p>Sistema de Gestão de Licitações</p>
                    </div>
                </div>

                <div className='form-header'>
                    <h2>Bem-vindo de volta!</h2>
                    <p>Acesse sua conta para continuar</p>
                </div>

                <form onSubmit={enviar}>

                    <Input className="input-login"
                           type='text'
                           icon={User}
                           placeholder='CPF'
                           value={cpf}
                           onChange={(e) => setCpf(e.target.value)}/>

                    <Input className="input-password"
                           type={mostrarSenha ? "text" : "password"}
                           icon={Lock}
                           isPassword
                           placeholder='Senha'
                           value={senha}
                           onChange={(e) => setSenha(e.target.value)}/>

                    <div className='opcoes'>
                        <label className='checkbox-label'>
                            <input
                                type='checkbox'
                                checked={lembrar}
                                onChange={(e) => setLembrar(e.target.checked)}
                            />
                            Lembrar de mim
                        </label>
                        <a href='#' className='forgot-link'>Esqueci minha senha</a>
                    </div>

                    <Button
                        as={NavLink}
                        to="/procurements"
                        className="btn-login"
                    >
                        Entrar
                    </Button>

                </form>
            </div>


            <div className='panel-deco'>
                <div className='deco-circulo c1'></div>
                <div className='deco-circulo c2'></div>
                <img src={male_laptop} alt="ilustração" className='ilustracao'/>
                <h2>Gestão eficiente, transparente e segura.</h2>
                <p>Tudo que você precisa em um só lugar.</p>
            </div>

        </div>
    )
}

export default Login