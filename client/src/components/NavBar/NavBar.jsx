import { NavLink } from "react-router-dom";
import style from "./NavBar.module.css";
import SearchBar from "../SearchBar/SearchBar";
import logo from "../../images/Logo/logo.gif"

const NavBar = () => {
    const signOut = () =>{
        console.log('signout');
    }

    return(
        <div className={style.mainContainer}>
            <nav className={style.navbar}>
                <div className={style.logo}><NavLink to="/home"><img src={logo} alt="logo"></img></NavLink></div>
                <div className={style.navLinks}>
                    
                    <NavLink to="/create">
                        <button className={style.link}>Create Pokemon</button>
                    </NavLink>                   
                    
                    <NavLink onClick={signOut} to="/" >
                        <button className={style.link}>SIGN OUT</button>
                    </NavLink>
                    
                    <SearchBar/>
                </div>
            </nav>
        </div>
    )
}

export default NavBar