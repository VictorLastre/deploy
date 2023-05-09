import styles from "./Filters.module.css";
import { useEffect, useState } from "react";
import { clearOrder, filterAll, getAllTypes, orderByName, orderByAttack } from "../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";

const Filters = () => {

    const [filters, setFilters] = useState({
        type: "all",
        source: "all",
        nameSort: "",
        attackSort: "",
    })

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllTypes())
    }, [dispatch]);


    const types = useSelector(state => state.types);


    const changeHandlerFilter = (event) => {
        const property = event.target.name;
        const value = event.target.value;

        setFilters({
            ...filters,
            [property]: value,
        });    

        if(property === "type"){
            dispatch(filterAll(value, filters.source))
        } if(property === "source"){
            dispatch(filterAll(filters.type, value))
        }
    }

    const changeHandlerNameSort = (event) => {
        const property = event.target.name;
        const value = event.target.value;

        setFilters({
            ...filters,
            [property]: value,
            attackSort: ""
        });
        dispatch(orderByName(value))
    };

    const changeHandlerAttackSort = (event) => {
        const property = event.target.name;
        const value = event.target.value;

        setFilters({
            ...filters,
            [property]: value,
            nameSort: ""
        });
        dispatch(orderByAttack(value))
    }

    const resetFilters = () => {
        setFilters({
            type: "all",
            source: "all",
            nameSort: "",
            attackSort: "",
        });

        dispatch(clearOrder())
        dispatch(filterAll("all", "all"));
    }

return(
<div className={styles.filtersContainer}>
    <div>
    <label htmlFor="types">Filter by Type:</label>
    <select id="types" name="type" value={filters.type} onChange={changeHandlerFilter}>
        <option value="all" name="all">All</option>
        {
            types?.map((type, index) => (
                <option key={index} name={type.name} value={type.name}> ▶ {type.name}</option>
            ))
        }
    </select>
    </div>

    <div>
    <label htmlFor="source">Filter by:</label>
    <select id="source" name="source" value={filters.source} onChange={changeHandlerFilter}>
        <option name="all" value="all">All</option>
        <option name="dbPokemons" value="dbPokemons"> 📥 Data Base</option>
        <option name="apiPokemons" value="apiPokemons"> 💾 API</option>
    </select>
    </div>

    <div>
    <label htmlFor="nameSort">Sort by Name:</label>
    <select id="nameSort" name="nameSort" value={filters.nameSort} onChange={changeHandlerNameSort}>
        <option value="" hidden>Select a sort type</option>
        <option name="aToZ" value="aToZ"> 🔽 A - Z</option>
        <option name="zToA" value="zToA"> 🔼 Z - A</option>
    </select>
    </div>

    <div>
    <label htmlFor="attackSort">Sort by Attack:</label>
    <select id="attackSort" name="attackSort" value={filters.attackSort} onChange={changeHandlerAttackSort}>
        <option value="" hidden>Select a sort type</option>
        <option name="ascending" value="ascending"> 🔼 Ascending Order</option>
        <option name="descending" value="descending"> 🔽 Descending Order</option>
    </select>
    </div>

    <button className={styles.resetButton} onClick={resetFilters}> 🚫 Reset filters</button>
</div>
)
}

export default Filters;