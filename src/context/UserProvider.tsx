import { useEffect, useState, type ReactNode } from "react"
import type { User } from "../types/user"
import { UserContext } from "./UserContext"
import { fetchUserProfile, logoutUser } from "../api/user"


export const UserProvider = ({ children }: { children: ReactNode }) => {
   const [ user, setUser ] = useState<User | null>(null)

   const fetchProfile = async () => {
      try {
         const profile = await fetchUserProfile()
         setUser(profile)
      } catch (err) {
         setUser(null)
         console.error(err)
      }
   }

   const logout = async () => {
      try {
         await logoutUser()
         setUser(null)
      } catch (err) {
         console.error(err)
      }
   }

   useEffect(() => {
      fetchProfile()
   }, [])


   return (
      <UserContext.Provider value={{ user, setUser, fetchProfile, logout}}>
         {children}
      </UserContext.Provider>
   )
}