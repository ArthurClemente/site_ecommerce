import React from 'react';
import './Footer.css';
import InstagramIcon from '@material-ui/icons/Instagram';
import { Facebook } from '@material-ui/icons';
function Footer(){
    return(
        <footer className="footer">
            <div className="footer-info">
                <div className="footer-areaDeInfo">
                    <p className="textoContato">Contato</p>
                    <span className="contato">(82)4002-8922</span>
                </div>
                <div className="footer-areaDeInfo">
                    <p className="textoEmailSuporte">Suporte</p>
                    <a href="mailto:suporte@ecommerce.com" targe="_blank">suporte@ecommerce.com</a>
                </div>
                <div className="footer-areaDeInfoSocial">
                    <a href="https://instagram.com" target="_blank" className="footer-SocialLink" rel="noopener noreferrer"><InstagramIcon/></a>
                    <a href="https://www.facebook.com/" target="_blank" className="footer-SocialLink" rel="noopener noreferrer"><Facebook/></a>
                </div>
            </div>
        </footer>
    )
}

export default Footer