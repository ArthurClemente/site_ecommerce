import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import logo from '../../img/logo.png';
import axios from 'axios';

function Login(){

    const pagInicial = useNavigate(); // Utilizado para retornar para a página inicial após o login
    const [emailUsuario, getEmailUsuario] = useState('') // Estado inicial de email é vazio
    const [senhaUsuario, getSenhaUsuario] = useState('') // Estado inicial de senha é vazio

    function fazerLogin(obj){
        axios.post('http://localhost/ecommerce-backend/login.php', obj) // faz um post no arquivo login.php com o email e senha passados no formulário
        .then(res => {
            if(res.data.success === 1){ // Caso o login seja bem sucedido
                alert("Login realizado com sucesso!")
                pagInicial('/')
            }else{// Caso falha no login
                alert(res.data.mensagem)
            }
        })
    }
    
    const envioDadosLogin = event => { // Captura o email e senha informados
        event.preventDefault();

        const objLogin = {// Objeto gerado com os dados
            email: emailUsuario,
            senha: senhaUsuario,
        };
        fazerLogin(objLogin);
    }


    return (
        <div className="login">
            <Link to="/">
                <img src={logo} alt="logo" className="login-logo" />
            </Link>
            <div className="login-container">
                <h1>Entrar</h1>
                <form name='form-conect' onSubmit={envioDadosLogin} method='post'>
                    <h5>E-mail</h5>
                    <input type="email" name="email-usuario" value={emailUsuario} onChange={event => getEmailUsuario(event.target.value)}/>
                    <h5>Senha</h5>
                    <input type="password" name="senha-usuario" value={senhaUsuario} onChange={event => getSenhaUsuario(event.target.value)}/>
                    <button type="submit"  className="login-botaoEntrar">Entrar</button>
                </form>
                <Link to="/registro" className='link-registro'>
                    <button type="submit" className="login-botaoCadastro">Criar conta</button>
                </Link>
            </div>
        </div>
    )
}

export default Login