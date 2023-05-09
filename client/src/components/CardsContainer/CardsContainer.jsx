import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import style from "./CardsContainer.module.css";
import Card from "../Card/Card";
import Filters from "../Filters/Filters";
import loading from "../../images/Loading/loading.gif"
import notFound from "../../images/404/404.gif"

const CardsContainer = () => {
    const pokemonsGlobal = useSelector(state => state.pokemonsGlobal);
    const filteredPokemons = useSelector(state => state.filteredPokemons);
    const orderedPokemons = useSelector(state => state.orderedPokemons);
    const [pokemons, setPokemons] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setPokemons(pokemonsGlobal)
        setIsLoading(false);
    }, [pokemonsGlobal])

    useEffect(() => {
        setPokemons(filteredPokemons);
        setPage(1);
        setIsLoading(false);
    }, [filteredPokemons]);

    useEffect(() => {
        setPokemons(orderedPokemons);
        setPage(1);
        setIsLoading(false);
    }, [orderedPokemons]);

    console.log(pokemons)

    if (isLoading || !pokemons.length) {
        return (
            <div style={{width: "100%"}}>
                <div className={style.container}>
                    <img style={{width: "25%"}} src={loading} alt="loading"/>                    
                </div>
            </div>
        )
    }
    
    if(pokemons.length === 1){
        const pokemon = pokemons[0]
        return(
            <div>
                <Filters/>
                <div className={`${style.container} ${style.cards}`}>
                    <Card
                    id={pokemon.id}
                    name={pokemon.name}
                    image={pokemon.image}
                    types={pokemon.types}
                    key={pokemon.id}
                    />
                </div>
                <button onClick={() => window.location.reload()}>See all Pokemons</button>
            </div>
        )
    }
    
    if(typeof pokemons[0] === "string"){
        return(
            <div>              
                <Filters/>
                <button className={style.back_home} onClick={() => window.location.reload()}>Back To Home</button>
         <div className={style.container}>
         
          <p className={style.not_found_title}>Error 404: Pokemon Not Found</p>
          <img src={notFound} className={style.errorImage} alt="Error"/>
        </div>
          
          </div>
        )
    }
    
    const pageSize = 12;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const actualPage = pokemons.slice(startIndex, endIndex);
    const totalPages = Math.ceil(pokemons.length / pageSize);
    const ratioPages = [page - 5, page + 5];
    let pagination = [];

    if(pokemons.length > pageSize){
        for (let i = Math.max(1, ratioPages[0]); i < Math.min(ratioPages[1], totalPages + 1); i++) {
            if (page === i) {
              pagination.push(
                <button className={style.clicked} key={i} onClick={() => setPage(i)}>
                  {i}
                </button>
              );
            } else {
              pagination.push(
                <button key={i} onClick={() => setPage(i)}>
                  {i}
                </button>
              );
            }                    
        }    
        return(
            <div>
                <Filters/>
                <div className={`${style.container} ${style.cards}`}>
                    {actualPage?.map(pokemon => {
                        return <Card
                        id={pokemon?.id}
                        name={pokemon?.name}
                        image={pokemon?.image}
                        types={pokemon?.types}
                        key={pokemon?.id}
                        />})}
                </div>

    
                {actualPage.length < pageSize ? (
      <div className={style.pagination}><button onClick={() => setPage(page -1)}>Previous</button><span>Page {page} of {totalPages}</span></div>
      
    ) : page === 1 ? (
      
     <div className={style.pagination}><button onClick={() => setPage(page + 1)}>Next</button></div>
    ) : page < totalPages ? (
      <div className={style.pagination}>
        <span className={style.span_pagination}>Page {page} of {totalPages}</span><br />
        <button onClick={() => setPage(page -1)}>◀</button>
        {pagination}
        <button onClick={() => setPage(page + 1)}>▶</button>
        
      </div>
    ) : (
      <div className={style.pagination}><button onClick={() => setPage(page -1)}>Previous</button>
      <span>Page {page} of {totalPages}</span></div>
    )}
    
            </div>
        )
    }else{
        return(
            <div>
                 <Filters/>
                <div className={`${style.container} ${style.cards}`}>
                    {actualPage?.map(pokemon => {
                        return <Card
                        id={pokemon?.id}
                        name={pokemon?.name}
                        image={pokemon?.image}
                        types={pokemon?.types}
                        key={pokemon?.id}
                        />})}
                </div>
                </div>)
    }
    
    

}

export default CardsContainer;

