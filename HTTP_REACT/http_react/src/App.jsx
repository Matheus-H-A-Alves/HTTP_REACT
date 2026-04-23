import {useState, useEffect} from 'react'
const url = "http://localhost:3000/products"
import './App.css'

function App() {
  // 1. Resgatando dados
  const [products, setProducts] = useState([]);

  useEffect(() => {

    async function getData() {

      const res = await fetch(url)

      const data = await res.json()
      setProducts(data);

    };
    getData();
   
  },[]);

  const [name, setName] = useState("");
  const [price,setPrice] = useState("");
  const handleSubmit = async (e) =>{

    e.preventDefault();
    const product = {
      name,
      price
    };
    const res = await fetch(url,{
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      // Necessário converter o json para string pois o fetch não reconhece json puro.
      body: JSON.stringify(product),
    });

    // 3- Carregamento dinâmico
    // Aproveita a resposta do servidor para atualizar a
    //  lista de produtos sem precisar fazer uma nova requisição.
    const addedProduct = await res.json()

    setProducts((prevProducts)=> [...prevProducts, addedProduct]);
  
  };
    
  
  return (
    <div className="App">
      <h1>HTTP em React</h1>
      {/* 1 - resgate de dados */}
      <ul>
        {products.map((product) =>(
          <li key={product.id}>
            {product.name} 
           - R${product.price}
           </li>
        ))}
      </ul>
      {/* 2- enviando dados */}
      <div className='add-product'>
        <form onSubmit={handleSubmit}>
          <label>
            <span>Nome:</span>
            <input type='text' value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <label>
            <span>Preço:</span>
            <input type='text' value={price} onChange={(e) => setPrice(e.target.value)} />
          </label>
          <input type="submit" value="Enviar"></input>
        </form>
      </div>
    </div>
  );
};

export default App
