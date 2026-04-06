import { useNavigate } from "react-router-dom"
import { useUser } from "../../hooks/useUser"
import { logoutUser } from "../../api/user"

export const LogOutButton = () => {
   const { setUser } = useUser()
   const navigate = useNavigate()

   const handleLogOut = async () => {
      try {
         const success = await logoutUser()
         if(success) {
            setUser(null)
            navigate("/")
         }
      } catch (err) {
         console.error(err)
      }
   }

   return (
      <button className="btn btn--blue btn--big" onClick={handleLogOut}>Выйти из аккаунта</button>
   )
}