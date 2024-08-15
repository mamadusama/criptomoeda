import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { coinProps } from "../home";
import  styles from  "./detail.module.css";

interface ResponseData{
  data: coinProps;
}

interface ErrorData{
  error: string;
}

type DataProps = ResponseData | ErrorData;

export function Detail() {
  const {cripto} = useParams();
  const navigate = useNavigate();
  const [coins, setCoins] = useState<coinProps>();
  const [loading, setLoading] = useState(true);

  useEffect(() =>{
    async function getCoin(){
         try {
          fetch(`https://api.coincap.io/v2/assets/${cripto}`)
            .then((response) => response.json())
            .then((data: DataProps) => {
              if ("error" in data) {
                navigate("/");
                return;
              }
              const price = Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              });

              const priceCompact = Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                notation: "compact",
              });

              const resultData = {
                ...data.data,
                formatedPrice: price.format(Number(data.data.priceUsd)),
                formatedMarketCap: priceCompact.format(
                  Number(data.data.marketCapUsd)
                ),
                formatedVolume: priceCompact.format(
                  Number(data.data.volumeUsd24Hr)
                ),
              };
              setCoins(resultData);
              setLoading(false);
            });
         } catch {
           console.log("Error");
           navigate("/")
         }
    }
  getCoin();

  },[cripto])

if(loading || !coins){
  return (
    <div className={styles.container}>
      <h1 className={styles.center}>Carregando detalhes...</h1>
    </div>
  );
  
}

  return (
    <div className={styles.container}>
      <h1 className={styles.center}>{coins?.name}</h1>
      <h1 className={styles.center}>{coins?.symbol}</h1>

      <section className={styles.content}>
        <img
          src={`https://assets.coincap.io/assets/icons/${coins?.symbol.toLocaleLowerCase()}@2x.png`}
          alt={coins?.name}
          className={styles.logo}
        />
        <h1>
          {coins?.name} | {coins?.symbol}
        </h1>
        <strong>Preço: {coins?.formatedPrice}</strong>
        <a>
          <strong>Maercado: {coins?.formatedMarketCap}</strong>
        </a>
        <a>
          <strong>Volume: {coins?.formatedVolume}</strong>
        </a>

        <a>
          <strong>Mudança 24h:</strong><span className={Number(coins.changePercent24Hr) > 0 ? styles.profit : styles.loss} >{Number(coins.changePercent24Hr).toFixed(3)}</span>
        </a>

      </section>
    </div>
  );
}


