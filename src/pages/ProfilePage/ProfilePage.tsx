import "../../index.css"
import "./ProfilePage.css"
import 'react-tabs/style/react-tabs.css';
import UserIcon from "../../assets/svg/user-icon.svg?react";
import LikeIcon from "../../assets/svg/like-icon.svg?react";
import DeleteIcon from "../../assets/svg/modal-close-icon.svg?react";
import EmailIcon from "../../assets/svg/email-icon.svg?react"
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useEffect, useState } from "react";
import type { Movie } from "../../types/movie";
import { MovieCard } from "../../components/MovieCard/MovieCard";
import { useUser } from "../../hooks/useUser";
import { getFavoriteMovies } from "../../api/movies";
import { deleteFromFavorites } from "../../api/user";
import { LogOutButton } from "../../components/LogOutButton/LogOutButton";
import { useMediaQuery } from "react-responsive";


export const ProfilePage = () => {

   const [ favorites, setFavorites ] = useState<Movie[]>([])
   const { user, fetchProfile, setUser } = useUser()

   const isMobile = useMediaQuery({query: "(max-width: 620px)"})

   useEffect(() => {
      const loadFavorites = async () => {
         try {
            if(!user) await fetchProfile()

            const data = await getFavoriteMovies()
            setFavorites(data)
         } catch (err) {
            console.error(err)
         }
      }

      loadFavorites()
   }, [])

   const handleRemove = async (id: number) => {
      try {
         const updatedUser = await deleteFromFavorites(id)
         setUser(updatedUser)
         setFavorites(prev => prev.filter(movie => movie.id !== id))
         fetchProfile()
      } catch(err) {
         console.error(err)
      }
   }

   return (
      <div className="profile-page section-offset">
         <div className="container">
            <h1 className="profile-page__title main-title">Мой аккаунт</h1>
               <Tabs>
                  <TabList  className="profile-page__tab-list">
                     <Tab 
                        className="profile-page__tab"
                        selectedClassName="profile-page__tab--selected"
                     >
                        <LikeIcon />
                        {isMobile ? "Избранное" : "Избранные фильмы"}
                     </Tab>
                     <Tab 
                        className="profile-page__tab"
                        selectedClassName="profile-page__tab--selected"
                     >
                        <UserIcon />
                        {isMobile ? "Настройки" : "Настройки аккаунта"}
                     </Tab>
                  </TabList>

                  {/* Избранные фильмы */}
                  <TabPanel className="profile-page__tab-content">
                     <ul className="profile-page__list">
                        {favorites?.map(movie => (
                           <li className="profile-page__list-item" key={movie.id}>
                              <button className="profile-page__delete-btn" type="button" onClick={() => handleRemove(movie.id)}>
                                 <DeleteIcon />
                              </button>
                              <MovieCard movie={movie} />
                           </li>
                        ))}
                     </ul>
                  </TabPanel>

                  {/* Настройка аккаунта */}
                  <TabPanel className="profile-page__tab-content profile-page__tab-content--user">
                     {user ? (
                        <>
                           <div className="profile-page__info">
                              <span className="profile-page__info-icon">
                                 {user.name && user.surname
                                    ? `${user.name[0].toUpperCase()}${user.surname[0].toUpperCase()}` : ""}
                              </span>
                              <div className="profile-page__info-wrap">
                                 <span className="profile-page__info-title">Имя Фамилия</span>
                                 <span className="profile-page__info-value">{user.name} {user.surname}</span>
                              </div>
                           </div>
                           <div className="profile-page__info">
                              <span className="profile-page__info-icon"><EmailIcon /></span>
                              <div className="profile-page__info-wrap">
                                 <span className="profile-page__info-title">Электронная почта</span>
                                 <span className="profile-page__info-value">{user.email}</span>
                              </div>
                           </div>
                           <LogOutButton />
                        </>
                     ) : (
                        <p>Не удалось загрузить информацию о пользователе</p>
                     )}
                  </TabPanel>
               </Tabs>
         </div>
      </div>
   )
}