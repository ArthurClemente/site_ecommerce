import React from 'react'
import './Checkout.css'
import Subtotal from './Subtotal'
import {useStateValue} from '../../data/StateProvider'
import CarrinhoCompras from '../carrinhoCompras/CarrinhoCompras'
function Checkout(){
    
    const [{carrinho}] = useStateValue(); // Aciona o estado do carrinho
    
    return(            
        <div className="checkout">
            <div className="checkout-esquerda">

            {
                carrinho.length === 0 ? ( // Caso carrinho esteja vazio
                    <div> 
                        <h2 className="checkout-titulo">Seu carrinho está vazio.</h2>
                        <p>Voce não possui itens no carrinho.</p>
                    </div>
                ) : ( // Caso carrinho tenha algum produto
                    <div>
                        <h2 className='tituloItensCarrinho'>Itens no carrinho</h2>
                        {
                            carrinho.map(item => (
                                <CarrinhoCompras 
                                    id={item.id}
                                    titulo={item.titulo}
                                    imagem={item.imagem}
                                    preco={item.preco}
                                    nota={item.nota}
                                />
                            ))
                        }
                    </div>
                )
            }
            </div>
            {
                carrinho.length > 0 && ( // Com o carrinho tendo um produto, o Componente Subtotal é exibido
                    <div className="checkout-direita">
                        <Subtotal/>
                    </div>
                )
            }
        </div>
    )
}

export default Checkout