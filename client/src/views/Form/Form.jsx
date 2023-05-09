import { useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import style from "./Form.module.css"
import { validate } from "./helpers";
import axios from "axios"
import { getAllTypes } from "../../redux/actions/actions";
import { NavLink } from "react-router-dom";
import Swal from 'sweetalert2'

const Form = () => {    

  const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getAllTypes());
    }, [dispatch])


    const types = useSelector(state => state.types)

    const [form, setForm] = useState({
        image:"",
        name: "",
        hp: 0,
        attack: 0,
        defense: 0,
        speed: 0,
        height: 0,
        weight: 0,
        types: []
    });

    const [errors, setErrors] = useState({
        image: "",
        name: "",
        hp: "",
        attack: "",
        defense: "",
        speed: "",
        height:"",
        weight:"",
        types: ""
    });

    const changeHandler = (event) => {
        const property = event.target.name;
        const value = event.target.value;

        setForm({
            ...form, 
            [property]: value
        });

        setErrors(validate({...form, [property]: value}))        
    };

  
    const changeHandlerTypes = (event) => {
        const value = event.target.value;    
       
        
         
        if(!form.types.includes(value)){
            setForm({
                ...form, 
                types: [...form.types, value]
            });
            setErrors(validate({...form, types: [...form.types, value]}));
            event.target.value = ""
        }else{
            setForm({
                ...form,
                types: [...form.types]
            })
            setErrors(validate({...form, types: [...form.types]}));
            event.target.value = ""            
        }       
        
    };
    

    const submitHandler = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("/pokemons", form)
            //alert("Pokemon successfuly created")
            Swal.fire({
                position: 'center',
                icon: 'success',
                imageUrl:'https://media.tenor.com/oOzhgAqsTv0AAAAC/charmander-pok%C3%A9mon.gif',
                imageWidth: 150,
                imageHeight: 150,
                title: 'Pokemon successfuly created',
                showConfirmButton: false,
                timer: 2500
              })               
            return response
        } catch (error) {
            //alert("incorrect form")
            Swal.fire({
                icon: 'error',
                title: 'Oops...',                
                imageUrl: 'https://media.tenor.com/Bigr7kCgp4oAAAAM/pikachu-pikachu-no-gif.gif',
                imageWidth: 150,
                imageHeight: 150,
                imageAlt: 'Custom image',              
                text: 'Something went wrong!'  
              })
              
        }
    }

    const onClose = (typeName) => {
        let filteredTypes = form.types.filter(type => type !== typeName);
        setForm({
            ...form,
            types: [...filteredTypes]
        })
        setErrors(validate({...form, types: [...filteredTypes]}))
    }

    const getTypeName = (typeId) => {
        let filteredTypes = types.filter(type => type.id === Number(typeId));
        let name = filteredTypes[0].name                 
        return name;
        
    }

    console.log(form)

    return(
        <div className={style.pokemon_card_container}>
        <div className={style.form}>
        <NavLink to="/home">
            <button className={style.backHome}>⏪ Back Home</button>
        </NavLink>        
        <form onSubmit={submitHandler}>
        <p className={style.formTitle}>Create Pokemon</p>
            <div>
                <label>Image: </label>
                <input placeholder="Image Url..." type="text" value={form?.image} onChange={changeHandler} name="image" className={errors?.image && style.error}/>
                <br/>
                <span className={style?.errorText}>{errors?.image}</span>
            </div>

            <div>
                <label>Name:</label>
                <input placeHolder="Pokemon Name..." type="text" value={form?.name} onChange={changeHandler} name="name" className={errors?.name && style.error}/>
                <br/>
                <span className={style.errorText}>{errors?.name}</span>
                
            </div>

            <div>
                <label>HP:</label>
                <input type="number" value={form?.hp} onChange={changeHandler} name="hp" className={errors.hp && style.error}/>
                <br/>
                <span className={style.errorText}>{errors?.hp}</span>
            </div>

            <div>
                <label>Attack: </label>
                <input type="number" value={form?.attack} onChange={changeHandler} name="attack" className={errors.attack && style.error}/>
                <br/>
                <span className={style.errorText}>{errors?.attack}</span>
            </div>

            <div>
                <label>Defense: </label>
                <input type="number" value={form?.defense} onChange={changeHandler} name="defense" className={errors.defense && style.error}/>
                <br/>
                <span className={style.errorText}>{errors?.defense}</span>
            </div>

            <div>
                <label>Speed: </label>
                <input type="number" value={form?.speed} onChange={changeHandler} name="speed" className={errors.speed && style.error}/>
                <br/>
                <span className={style.errorText}>{errors?.speed}</span>
            </div>

            <div>
                <label>Height: </label>
                <input type="number" value={form?.height} onChange={changeHandler} name="height" className={errors.height && style.error}/>
                <br/>
                <span className={style.errorText}>{errors?.height}</span>
            </div>

            <div>
                <label>Weight: </label>
                <input type="number" value={form?.weight} onChange={changeHandler} name="weight" className={errors.weight && style.error}/>
                <br/>
                <span className={style.errorText}>{errors?.weight}</span>
            </div>

            <div>
                <label>Types:</label>
                <select id="types" name="types" className={errors.types && style.error} onChange={changeHandlerTypes}>
        <option value="" name="" hidden>Select one to three types</option>
        {
            types?.map(type => (
                <option key={type?.id} name={type?.name} value={type?.id}>{type?.name}</option>
            ))
        }
    </select>
    <br/>
    <div className={style.typeRender}>
    {form?.types?.map((type, index) => (
    <div key={index}>
        <span className={style.typeSelected}><button type="button" className={style.closeButton} onClick={() => onClose(type)}>{getTypeName(type)} </button></span>
        </div>
    ))}
    </div>
        <span className={style.errorText}>{errors?.types}</span>
            </div>
            <br/>
            <button className={style.btnSubmit} type="submit">Create</button>
        </form>
        </div>
        </div>
        
    )
}

export default Form