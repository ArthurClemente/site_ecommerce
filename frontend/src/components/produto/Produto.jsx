import { useStateValue } from '../../data/StateProvider';
import './Produto.css';
function Produto({id, titulo, imagem, preco, nota}){
    
    const [{carrinho}, dispatch] = useStateValue() // Carrinho carregado com o estado gerado em data/StateProvider

    const addAoCarrinho = () => {
        dispatch({ // Dispatch ativa o caso ADD_AO_CARRINHO declarado em data/reducer
            type: 'ADD_AO_CARRINHO',
            item: { // Parametros para o produto
                id: id,
                titulo: titulo,
                imagem: imagem,
                preco: preco,
                nota: nota
            }
        })
    }

    return(
        <div className="produto">
            <div className="produto-info">
                <p>{titulo}</p>
                <p className='produto-preco'>
                    <small>R$</small>
                    <strong>{preco}</strong>
                </p>
                <div className="produto-nota">
                    {
                        Array(nota)
                        .fill()
                        .map((_) => (
                            <p>*</p>
                        ))
                    }
                </div>
            </div>
            <img src={imagem} alt="" />
            <button onClick={addAoCarrinho}>Adicionar ao carrinho</button>
        </div>
    )
}

export default Produto