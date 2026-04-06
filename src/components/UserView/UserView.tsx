import { Link } from "react-router-dom"
import "./UserView.css"

interface UserViewProps { name: string }

export const UserView = ({ name }:UserViewProps ) => {

   return (
      <div className="user-view">
         <Link to="/account" className="user-view__link">{name}</Link>
      </div>
   )
}