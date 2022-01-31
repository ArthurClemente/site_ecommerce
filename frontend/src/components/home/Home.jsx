import React from 'react'
import Produto from '../produto/Produto'
import './Home.css'
function Home() {
    return (
        <div className="home">
            <div className="home-linha">
                <Produto // Componente Produto exibido com os seus parametros
                    id="121"
                    titulo="MEMORIA G.SKILL TRIDENT Z ROYAL ELITE, RGB, 64GB (4X16GB), DDR4, 4266MHZ, C19, DOURADA, F4-4266C19Q-64GTEG"
                    preco={4293.19}
                    nota={5}
                    imagem="https://media.pichau.com.br/media/catalog/product/cache/2f958555330323e505eba7ce930bdf27/f/4/f4-4266c19q-64gteg1.jpg"
                />
                <Produto 
                    id="122"
                    titulo="Mouse pad"
                    preco={40.00}
                    nota={1}
                    imagem="https://media.pichau.com.br/media/catalog/product/cache/2f958555330323e505eba7ce930bdf27/i/d/id0063.jpg"
                />
                <Produto 
                    id="123"
                    titulo="PROCESSADOR INTEL CORE I9-10940X, 14-CORE, 28-THREADS, 3.3GHZ (4.6GHZ TURBO), CACHE 19.25MB, LGA2066, BX8069510940X"
                    preco={6499.90}
                    nota={5}
                    imagem="https://media.pichau.com.br/media/catalog/product/cache/2f958555330323e505eba7ce930bdf27/b/x/bx8069510940x.jpg"
                />
            </div>
        </div>
    )
}

export default Home