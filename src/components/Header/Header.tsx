import "./Header.css"
import "../../index.css"
import logo from "../../assets/logo.png"
import GenresMenuIcon from "../../assets/svg/menu-icon.svg?react"
import UserIcon from "../../assets/svg/user-icon.svg?react"
import { Link, useNavigate} from "react-router-dom"
import { Search } from "../Search/Search"
import { useState } from "react"
import { AuthButton } from "../AuthButton/AuthButton"
import { ModalManager, type ModalType } from "../Modals/ModalManager"
import { UserView } from "../UserView/UserView"
import { useUser } from "../../hooks/useUser"
import { useMediaQuery } from "react-responsive"


export const Header = () => {

    const [ activeModal, setActiveModal ] = useState<ModalType | null>(null)
    const { user } = useUser()
    const navigate = useNavigate()

    const isMobile = useMediaQuery({query: "(max-width: 767px)"})

    const handleProfileClick = () => {
        if (user) {
            navigate("/account")
        } else {
            setActiveModal("login")
        }
    }

    return (
        <header className="header">
            <div className="container">
                <div className="header__content">
                    <Link to="/"><img className="header__logo" src={logo} alt="Логотип VK Маруся" width={143} height={32} /></Link>

                    {isMobile ? (
                        <div className="header__wrap">
                            <Link to="/genres" aria-label="Меню жанров"><GenresMenuIcon /></Link>
                            <Search placeholder="Поиск" isMobile={true} />
                            <button className="header__btn" aria-label="Перейти в профиль" onClick={handleProfileClick}><UserIcon /></button>
                        </div>
                    ) : 
                    (
                    <div className="header__wrap">
                        <div className="header__center">
                            <Link to="/" className="header__link">Главная</Link>
                            <Link to="/genres" className="header__link">Жанры</Link>
                            <Search placeholder="Поиск" />
                        </div>
                        {user ? (
                            <UserView name={user.name}/>
                        ) : (
                            <AuthButton onClick={() => setActiveModal("login")}/>
                        )}
                    </div>
                    )}
                    <ModalManager activeModal={activeModal} setActiveModal={setActiveModal} />
                </div>
            </div>
        </header>
    )
}