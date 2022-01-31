import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Registro.css';
import logo from '../../img/logo.png';
import axios from 'axios';

function Registro(){

    const pagLogin = useNavigate()// usado para retornar a página de login após o registro
    const [nomeUsuario, getNomeUsuario] = useState('')// estado inicial de nome é vazio
    const [emailUsuario, getEmailUsuario] = useState('')// estado inicial de email é vazio
    const [senhaUsuario, getSenhaUsuario] = useState('')// estado inicial de senha é vazio

    function confirmRegistro(obj){
        axios.post('http://localhost/ecommerce-backend/registro.php', obj) // Faz post no arquivo registro.php com os dados passados no formulário
            .then(res => { // Caso registro bem sucedido
                if (res.data.status === 201){
                    alert("Registro realizado com sucesso!")
                    pagLogin('/login')
                }else{// caso falha no registro
                    alert(res.data.mensagem)
                }
            })
    }

    const envioDadosRegistro = event => { // Captura os dados do formulário
        event.preventDefault();

        const obj = { // Objeto gerado com os dados
            nome: nomeUsuario,
            email: emailUsuario,
            senha: senhaUsuario,
        };

        confirmRegistro(obj);
    }


    return (
        <div className="registro">
            <Link to="/">
                <img src={logo} alt="logo" className="registro-logo" />
            </Link>
            <div className="registro-container">
                <h1>Criar conta</h1>
                <form name='formConect' onSubmit={envioDadosRegistro} method='post'>
                    <h5>Nome</h5>
                    <input type="text" name="nome-usuario" value={nomeUsuario} onChange={event => getNomeUsuario(event.target.value)}/>
                    <h5>E-mail</h5>
                    <input type="email" name="email-usuario" value={emailUsuario} onChange={event => getEmailUsuario(event.target.value)}/>
                    <h5>Senha</h5>
                    <input type="password" name="senha-usuario" value={senhaUsuario} onChange={event => getSenhaUsuario(event.target.value)}/>
                    <button type="submit"  className="registro-botaoRegistrar">Criar conta</button>
                </form>
            </div>
        </div>
    )
}

export default Registro