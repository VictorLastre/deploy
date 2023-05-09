import { NavLink } from "react-router-dom";
import styles from "./Landing.module.css"
import pokebola from "../../images/LandingPage/pokebola.gif";
import title from '../../images/LandingPage/pokemon-title.gif'

const Landing = () => {
    return(
        
            <div className={styles.container}>
                <img className={styles.title} src={title} alt="pokemon-title" />                    
                        <NavLink className={styles.buttonGengar} to="/home"><img src={pokebola} alt="Gengar"/></NavLink>                                    
            </div>        
    )
}

export default Landing