import style from "./NotFound.module.css"
import { NavLink } from "react-router-dom"
import notFound from "../../images/404/404.gif"


const NotFound = () => {
    return(
        <div className={style.bigDiv}>
            <div className={style.container}>
          <p className={style.not_found_title}>Error 404: Page Not Found</p>
          <img src={notFound} className={style.not_found_img} alt="Error"/>
        </div>
          <NavLink to="/home"><button>Back Home</button></NavLink>
        </div>
    )
}

export default NotFound