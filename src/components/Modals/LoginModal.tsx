import { zodResolver } from "@hookform/resolvers/zod";
import logo from "../../assets/logo-black.png"
import EmailIcon from "../../assets/svg/email-icon.svg?react"
import PasswordIcon from "../../assets/svg/password-icon.svg?react"
import ModalCloseIcon from "../../assets/svg/modal-close-icon.svg?react"
import { useForm } from "react-hook-form";
import { loginSchema, type LoginFormData } from "../../validation/loginSchema";
import "./modal.css"
import "../../index.css"
import { useUser } from "../../hooks/useUser";
import { loginUser } from "../../api/user";

interface LoginModalProps {
   onClose: () => void
   onSwitch: () => void
}

export const LoginModal = ({ onClose, onSwitch }: LoginModalProps) => {

  const { fetchProfile } = useUser()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      const result = await loginUser(data.email, data.password)
      if(result === true) {
        await fetchProfile()
        reset()
        onClose()
      }
      
    } catch (err) {
      console.error (err)
    }
  }

  return (
    <div className="modal modal--login">
      <button className="modal__close-btn" onClick={onClose}><ModalCloseIcon /></button>
      <img className="modal__logo" src={logo} alt="Логотип VK Маруся" width={132} height={29} />
      <form onSubmit={handleSubmit(onSubmit)} action="POST">
        <div className="modal__custom-input">
          <input className={`modal__input ${errors.email ? "modal__input--error" : ""}`} type="email" placeholder="Электронная почта" {...register("email")} />
          <span className="modal__input-icon">
            <EmailIcon />
          </span>
          {errors.email && <p className="modal__error">{errors.email.message}</p>}
        </div>
        <div className="modal__custom-input">
          <input className={`modal__input ${errors.password ? "modal__input--error" : ""}`} type="password" placeholder="Пароль" {...register("password")} />
          <span className="modal__input-icon">
            <PasswordIcon />
          </span>
          {errors.password && <p className="modal__error">{errors.password.message}</p>}
        </div>
        <button className="btn btn--blue" type="submit">Войти</button>
      </form>
      <button className="modal__btn btn" onClick={onSwitch}>Зарегистрироваться</button>
    </div>
  )
}
