import "../Header/Header.css"

interface AuthButtonProps {
    onClick: () => void
}

export const AuthButton = ({ onClick }: AuthButtonProps) => {

    return (
        <button className="header__auth-btn" type="button" onClick={onClick}>Войти</button>
    )
}