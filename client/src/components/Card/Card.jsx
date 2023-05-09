import style from "./Card.module.css";
//import types from "./types.module.css"
import background from "./backgroundTypes.module.css"
import typeImages from './PokemonTypesImg.js'
import { NavLink } from "react-router-dom";

const Card = (props) => {    

    let color = props.types[0];
    if(props.types.length > 1 && color === "normal") color = props.types[1]

    return(        
    <div key={props.id} className={style.pokemon_card_container}>
        <div className={`${background[color]}`}>
            <div className={`${style.background} `}>
                <div className={style.pokebola}><NavLink to={`/pokemons/${props.id}`}><img className={style.image} src={props.image} alt={props.name}/></NavLink></div>
            </div>
            <div className={StyleSheet.pokemonInfo }>
            <p className={style.name}>{props.name.toUpperCase()}</p>
            <div className={style.logitos}>                            
            {props.types.map((type, index) => { 
                return <div
                    
                    key={index}>{}
                    <img class={style.img_logitos} src={typeImages[type]} alt={type} />
                    </div>
            })}                      
            </div>                        
            </div>
        </div>
    </div>
    )
}

export default Card
