import { zodResolver } from "@hookform/resolvers/zod";
import ModalCloseIcon from "../../assets/svg/modal-close-icon.svg?react"
import logo from "../../assets/logo-black.png"
import EmailIcon from "../../assets/svg/email-icon.svg?react"
import PasswordIcon from "../../assets/svg/password-icon.svg?react"
import UserIcon from "../../assets/svg/user-icon.svg?react"
import { useForm } from "react-hook-form";
import { registerSchema, type RegisterFormData } from "../../validation/registerSchema";
import "./modal.css"
import "../../index.css"
import { useUser } from "../../hooks/useUser";
import { registerUser } from "../../api/user";

interface RegisterModalProps {
   onClose: () => void
   onSwitch: () => void
   onSuccess: () => void
}

export const RegisterModal = ({ onClose, onSwitch, onSuccess }: RegisterModalProps) => {

  const { setUser } = useUser()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema)
  })

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const registeredUser = await registerUser({
        email: data.email,
        password: data.password,
        name: data.name,
        surname: data.surname
      })

      console.log("Регистрация успешна", registeredUser);
      setUser(registeredUser)
      console.log("Registered user:", registeredUser);

      reset()
      onSuccess()
    } catch (err) {
      console.error("Ошибка регистрации", err)
    }
  }

 return (
   <div className="modal modal--register">
    <button className="modal__close-btn" onClick={onClose}><ModalCloseIcon /></button>
    <img className="modal__logo" src={logo} alt="Логотип VK Маруся" width={132} height={29} />
    <h2 className="modal__title">Регистрация</h2>
    <form onSubmit={handleSubmit(onSubmit)} action="POST">
      <div className="modal__custom-input">
        <input className={`modal__input ${errors.email ? "modal__input--error" : ""}`} type="email" placeholder="Электронная почта" {...register("email")} />
        <span className="modal__input-icon">
          <EmailIcon />
        </span>
        {errors.email && <p className="modal__error">{errors.email.message}</p>}
      </div>
      <div className="modal__custom-input">
        <input className={`modal__input ${errors.name ? "modal__input--error" : ""}`} type="text" placeholder="Имя" {...register("name")}/>
        <span className="modal__input-icon">
          <UserIcon />
        </span>
        {errors.name && <p className="modal__error">{errors.name.message}</p>}
      </div>
      <div className="modal__custom-input">
        <input className={`modal__input ${errors.surname ? "modal__input--error" : ""}`} type="text" placeholder="Фамилия" {...register("surname")}/>
        <span className="modal__input-icon">
          <UserIcon />
        </span>
        {errors.surname && <p className="modal__error">{errors.surname.message}</p>}
      </div>
      <div className="modal__custom-input">
        <input className={`modal__input ${errors.password ? "modal__input--error" : ""}`} type="password" placeholder="Пароль" {...register("password")} />
        {errors.password && <p className="modal__error">{errors.password.message}</p>}
        <span className="modal__input-icon">
          <PasswordIcon />
        </span>
      </div>
      <div className="modal__custom-input">
        <input className={`modal__input ${errors.confirmPassword ? "modal__input--error" : ""}`} type="password" placeholder="Подтвердите пароль" {...register("confirmPassword")} />
        <span className="modal__input-icon">
          <PasswordIcon />
        </span>
        {errors.confirmPassword && <p className="modal__error">{errors.confirmPassword.message}</p>}
      </div>
      <button className="btn btn--blue" type="submit">Создать аккаунт</button>
    </form>
    <button className="modal__btn btn" onClick={onSwitch}>У меня есть пароль</button>
   </div>
 )
}