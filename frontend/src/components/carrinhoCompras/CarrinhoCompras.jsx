import React from 'react'
import './CarrinhoCompras.css'
import {useStateValue} from '../../data/StateProvider'

function CarrinhoCompras({id,titulo,imagem,preco,nota}){ // Função recebe o id, titulo, imagem, preço e nota do produto a ser exibido. Parametros passados pelo componente Produto
    const [{carrinho}, dispatch] = useStateValue(); // Carrinho carregado com o estado gerado em data/StateProvider 

    const removerItem = () => { // Remove o item pelo id
        dispatch({ // Dispatch ativa o caso REMOVER_DO_CARRINHO declarado em data/reducer
            type: 'REMOVER_DO_CARRINHO',
            id: id
        })
    }

    return(
        <div className="carrinhocompras">
            <img src={imagem} alt="" className="carrinhocompras-imagem" />
            <div className="carrinhocompras-info">
                <p className='carrinhocompras-titulo'>{titulo}</p>
                <p className='carrinhocompras-preco'>{preco}</p>
                <div className='carrinhocompras-nota'>
                    {
                        Array(nota) // Mostra no produto a avaliação passada no componente Produto
                        .fill()
                        .map((_) => (
                            <span>*</span>
                            ))
                        }
                </div>
                <button onClick={removerItem}>Remover do carrinho</button>
            </div>
        </div>
    )
}

export default CarrinhoCompras