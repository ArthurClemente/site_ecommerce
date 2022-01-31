import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import "./Header.css";
import { Link } from 'react-router-dom';
import logo from '../../img/logo.png';
import { useStateValue } from '../../data/StateProvider';

function Header(){

    const [{carrinho}, dispatch] = useStateValue(); // estado do carrinho


    return(
        <nav className="header">
            <Link to="/" className="header-link">
                <img className="header-logo" src={logo} alt="" />
            </Link>

            <div className="header-pesquisa">   
                <input type="text" className="header-inputPesquisa" />
                <SearchIcon className="header-searchIcon" />
            </div>

            <div className="header-nav">
                {/* Link login */}
                <Link to="/login" className="header-link">
                    <div className="header-option">     
                        <span className="header-option-linhaUm">Olá Usuário</span>
                        <span className="header-option-linhaDois">Fazer login</span>
                    </div>
                </Link>

            </div>
            
            {/* Link do carrinho de compras */}
            <Link to="/checkout" className="header-link">
                <div className="header-option-carrinho">
                    <ShoppingBasketIcon />
                    <span className="header-option-linhaDois header-contadorProdutos">{carrinho?.length}</span>
                </div>
            </Link>
        </nav>
    )
}

export default Header;