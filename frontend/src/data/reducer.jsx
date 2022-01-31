export const initialState = {
    carrinho: [], // estado inicial do carrinho
}

const reducer = (state, action) => { // recebe a ação de adicionar e remover produtos do carrinho
    switch(action.type){
        case 'ADD_AO_CARRINHO' : 
            return {
                ...state,
                carrinho: [ ...state.carrinho, action.item]
            }
        case 'REMOVER_DO_CARRINHO':
            let novoCarrinho = [...state.carrinho]
            const indice = state.carrinho.findIndex((itemCarrinho) => itemCarrinho.id === action.id)
            if(indice >= 0){
                novoCarrinho.splice(indice, 1)
            }else{
                alert("Ocorreu um erro ao tentar retirar o produto do carrinho!")
            }
            return {
                ...state, 
                carrinho: novoCarrinho
            }
    }
}

export default reducer