import React from 'react'
import './Subtotal.css'
import { useStateValue } from '../../data/StateProvider';
function Subtotal(){



    const totalCarrinho = (carrinho) =>
    carrinho?.reduce((quantidade, item) => item.preco + quantidade, 0) // Caso tenham produtos no carrinho, é exibido o valor total de todos os produtos

    const [{carrinho}] = useStateValue(); // Aciona o estado de carrinho

    return( // Exibe a quantidade de itens e o valor total
        <div className="subtotal">

            <div>
                Subtotal({carrinho.length} itens) : <strong>{`${totalCarrinho(carrinho).toFixed(2)}`}</strong> 
            </div>
    
            <button className='checkout-botaoCheckout'>Seguir para o Checkout</button>
        </div>
    )
}

export default Subtotal