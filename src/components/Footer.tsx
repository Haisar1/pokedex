import { Link } from "react-router-dom";
import styles from "./footer.module.css";
import Pokemons from "../assets/pikachu.png";
import Maps from "../assets/pointer.png";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Link className={styles.footerLink} to="/pokemons">
        <img className={styles.footerIcon} src={Pokemons} alt="Pokemon" />
        Pokemons
      </Link>


      <Link
        className={styles.footerLink} 
        to="/maps"
      >
        <img className={styles.footerIcon} src={Maps} alt="Pokemon" />
        Mapa
      </Link>
    </footer>
  );
};

export default Footer;
