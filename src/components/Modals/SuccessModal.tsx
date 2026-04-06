import ModalCloseIcon from "../../assets/svg/modal-close-icon.svg?react"
import logo from "../../assets/logo-black.png"

interface SuccessModalProps {
   onClose: () => void
   onSwitch: () => void
}

export const SuccessModal = ({ onClose, onSwitch }: SuccessModalProps) => {
   return (
      <div className="modal modal--success">
         <button className="modal__close-btn" onClick={onClose}><ModalCloseIcon /></button>
         <img className="modal__logo" src={logo} alt="Логотип VK Маруся" width={132} height={29} />
         <h2 className="modal__title">Регистрация завершена</h2>
         <p className="modal__text">Используйте вашу электронную почту для входа</p>
         <button className="btn btn--blue" type="submit" onClick={onSwitch}>Войти</button>
      </div>
   )
}