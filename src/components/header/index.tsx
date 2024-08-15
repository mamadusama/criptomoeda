import logoImg from "../../assets/logo.svg";
import { Link } from "react-router-dom";
import  styles from "./header.module.css"

export function Header(){
    return (
      <header className={styles.container}>
        <Link to= "/">
          <img src={logoImg} alt="Logo cripto Moeda" />
        </Link>

        
      </header>
    );
}