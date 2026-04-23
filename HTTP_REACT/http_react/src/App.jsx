import {useState, useEffect} from 'react'
import { useFetch } from './hooks/useFetch';
const url = "http://localhost:3000/products"
import './App.css'

function App() {
  // 1. Resgatando dados
  const [products, setProducts] = useState([]);


  // 4- custom hook
  // pode ser renomeado para items para melhor compreensão,
  //  já que o nome data é genérico e não indica claramente
  //  o que está sendo resgatado.

  // O uso do custom hook useFetch torna o código mais limpo e reutilizável,
  //  pois encapsula a lógica de busca de dados e pode ser facilmente
  //  reutilizado em outros componentes ou partes da aplicação.
  const {data: items} = useFetch(url);

  // useEffect(() => {

  //   async function getData() {

  //     const res = await fetch(url)

  //     const data = await res.json()
  //     setProducts(data);

  //   };
  //   getData();
   
  // },[]);

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
        {/* Validação para garantir que items não seja null ou undefined
        pois caso seja, não haverá dados para serem exibidos */}
        {items && 
        items.map((product) =>(
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
