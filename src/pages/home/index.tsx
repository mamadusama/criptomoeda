import { useState, FormEvent, useEffect } from "react";

import styles from "./home.module.css"
import { BsSearch } from "react-icons/bs"
import { Link, useNavigate } from "react-router-dom";

 export interface coinProps {
   id: string;
   rank: string;
   symbol: string;
   name: string;
   supply: string;
   maxSupply: string;
   marketCapUsd: string;
   volumeUsd24Hr: string;
   priceUsd: string;
   changePercent24Hr: string;
   vwap24Hr: string;
   explorer: string;
   formatedPrice?: string;
   formatedMarketCap?: string;
   formatedVolume?: string;

 }

 interface dataProps{
    data: coinProps[];
 }


export function Home(){
  const[input, setInput] = useState("");
  const [coins, setCoins] = useState<coinProps[]>([]);
  const[offset, setOffset] = useState(0);
  const navigate = useNavigate();

 

  useEffect(()=> {
    getData();
   
  },[offset])

   async function getData() {
    fetch(`https://api.coincap.io/v2/assets?limit=10&offset=${offset}`)
      .then((response) => response.json())
      .then((data: dataProps) => {
        const coinsData = data.data;
        setCoins(coinsData);

        const price = Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        });

        const priceCompact = Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          notation: "compact",
        });

        const formatedResult = coinsData.map((item) => {
          const formated = {
            ...item,
            formatedPrice: price.format(Number(item.priceUsd)),
            formatedMarketCap: priceCompact.format(Number(item.marketCapUsd)),
            formatedVolume: priceCompact.format(Number(item.volumeUsd24Hr)),
          };
          return formated;
        });
        const listCoins = [...coins, ...formatedResult];
        /*  console.log(formatedResult) */
        setCoins(listCoins);
      });

   }

  function handleSubmit(event: FormEvent){
    event.preventDefault();

    if(input === "") return;
    navigate(`/detail/${input}`);

    
  }

  function handelGetMore(){
    if(offset === 0){
      setOffset(10);
      return;
    }
    setOffset(offset + 10);
  }


    return (
      <main className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
           placeholder="Procure por nome da moeda... EX: bitcoin"

           value={input}
            onChange={(e) => setInput(e.target.value)}
           
           />

          <button type="submit">
            <BsSearch size={30} color="#FFF" />
          </button>
        </form>

        <table>
          <thead>
            <tr>
              <th scope="col">Moeda</th>
              <th scope="col">Valor mercado</th>
              <th scope="col">Preço</th>
              <th scope="col">Volume</th>
              <th scope="col">Mudança 24h</th>
            </tr>
          </thead>

          <tbody id="tbody">
            {coins.length > 0 && coins.map((item)=> (

              <tr className={styles.tr} key={item.id}>
              <td className={styles.tdLable} data-label="Moeda">


                <div className={styles.name}>
                  <img
                  className={styles.logo}
                   src={`https://assets.coincap.io/assets/icons/${item.symbol.toLocaleLowerCase()}@2x.png`}
                   alt={item.name}
                   />
                  <Link to={`/detail/${item.id}`}>
                    <span>{item.name}</span> | {item.symbol}
                  </Link>
                </div>

              </td>

              <td className={styles.tdLable} data-label="Valor mercado">
                {item.formatedMarketCap}
              </td>

              <td className={styles.tdLable} data-label="Preço">
               {item.formatedPrice}
              </td>

              <td className={styles.tdLable} data-label="Volume">
               {item.formatedVolume}
              </td>

              <td className={Number(item.changePercent24Hr) > 0 ? styles.tdProfit : styles.tdLoss} data-label="Mudança 24h "> 
                 <span>{Number(item.changePercent24Hr).toFixed(3)}</span>
              </td>
            </tr>
            ))}
           
          </tbody>
        </table>
        <button className={styles.buttonMore} onClick={handelGetMore}>
          carergar mais...
        </button>
      </main>
    );
}

// agora vamos explicar o projeto em forma de documentaçao , mostrando quais sao tecnologias usadas , em reumo oque é cada tecnologia , tambem bibliotecas usas ou hooks usadas

// Tecnologias usadas:
// - React
// - Typescript
// - CSS
// - HTML
// - API
// - Axios
// - React-router-dom
// - React-icons


