import {use, useState, useEffect} from 'react'

const url = "http://localhost:3000/products"

import './App.css'

function App() {
  // 1. Resgatando dados
  const [products, setProducts] = useState([]);

  useEffect(() => {

    async function getData() {

      const res = await fetch(url)

      const data = await res.json()

      setProducts(data)

    }
    getData();
    // 2 - Enviando dados
    <div className='add-product'>
      <form>
        <label>
          <span>Nome:</span>
          <input type='text' value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          <span>Preço:</span>
          <input type='text' value={price} onChange={(e) => setPrice(e.target.value)} />
        </label>
        <label input type='submit' value='Enviar'></label>
        
        

      </form>
    </div>

    

  },[])


  

  return (
    <div className="App">
      <h1>HTTP em React</h1>
      {/* 1 - resgate de dados */}
      <ul>
        {products.map((product) =>(
          <li key={product.id}> {product.name} 
           - R${product.price}</li>
        ))}
      </ul>

    </div>
  );
}

export default App
