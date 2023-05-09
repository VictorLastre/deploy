import { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonById } from "../../redux/actions/actions";
import style from "./Detail.module.css";
import {clearDetail} from "../../redux/actions/actions";
import loading from "../../images/Loading/loading.gif"
import background from "./backgroundTypes.module.css"
import typeImages from './PokemonTypesImg.js'
import speed from '../../images/Detail/speed.svg'
import height from '../../images/Detail/height.svg'
import weight from '../../images/Detail/weight.svg'
import hp from '../../images/Detail/life.svg'
import attack from '../../images/Detail/attack.svg'
import defense from '../../images/Detail/defense.svg'

const Detail = () => {
    
    const { id } = useParams();
    const dispatch = useDispatch();
    const pokemon = useSelector(state => state.selectedPokemon);
    
    useEffect(() => {
        dispatch(getPokemonById(id))
        return () =>  dispatch(clearDetail())
        
    }, [dispatch, id])

    if (!pokemon) {
        return (
            <div className={style.bigDiv}>
                <div className={style.container} >                    
                    <img style={{width: "25%"}} src={loading} alt="loading"/>                                        
                </div>
            </div>
        )
    }

    let color = pokemon?.types[0]
    if(pokemon?.types?.length > 1 && color === "normal") color = pokemon?.types[1]
    
    return (
      <div className={style.bigDiv}>
        <NavLink to="/home">
          <button className={style.backButton}>⏪ Back Home</button>
        </NavLink>
        <div key={pokemon?.id} className={style.pokemon_card_container}>
          <div className={`${background[color]}`}>
            <div className={style.logitos}>
              <p className={style.name}>{pokemon?.name.toUpperCase()}</p>
              {pokemon?.types.map((type, index) => {
                return (
                  <div key={index}>
                    {}
                    <img
                      class={style.img_logitos}
                      src={typeImages[type]}
                      alt={type}
                    />
                  </div>
                );
              })}
            </div>
            <div className={`${style.background} `}>
              <div>
                <img
                  className={style.image}
                  src={pokemon?.image}
                  alt={pokemon?.name}
                />
              </div>
            </div>
            <div className={style.pokemonInfo}>
              <div className={style.table}>
                <div className="">
                  <div>
                    <label className={style.pokemon_id}>ID: #{pokemon?.id}</label>
                    <hr />
                    {pokemon?.speed && <label className={style.label_detail}><img className={style.icons} src={speed} alt="" /> SPEED: {pokemon?.speed}</label>}
                    
                    {pokemon?.height && (
                      <label className={style.label_detail}><img className={style.icons} src={height} alt="" /> HEIGHT: {pokemon?.height}</label>
                    )}
                    

                    {pokemon?.weight && (
                      <label className={style.label_detail}><img className={style.icons} src={weight} alt="" /> WEIGHT: {pokemon?.weight}</label>
                    )}

                    <label className={style.label_detail} for="hp"><img className={style.icons} src={hp} alt="" /> HP: {pokemon?.hp}</label>

                    <label className={style.label_detail}><img className={style.icons} src={attack} alt="" /> ATTACK: {pokemon?.attack}</label>                    
                    
                    <label className={style.label_detail}><img className={style.icons} src={defense} alt="" /> DEFENSE: {pokemon?.defense}</label>
                    

                  </div>

                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Detail



