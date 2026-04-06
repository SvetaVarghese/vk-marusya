import { LoginModal } from "./LoginModal"
import { RegisterModal } from "./RegisterModal"
import { SuccessModal } from "./SuccessModal"
import "./modal.css"
import "../../index.css"

export type ModalType = "login" | "register" | "success" | null

interface ModalManagerProps {
   activeModal: ModalType | null
   setActiveModal: (modal: ModalType | null) => void
}


export const ModalManager = ({ activeModal, setActiveModal }: ModalManagerProps) => {

   if (!activeModal) return null

   const handleOverlayClick = () => setActiveModal(null)
   const handleStopPropagation = (e:React.MouseEvent) => e.stopPropagation()

   return (
      <div className="modal-overlay" onClick={handleOverlayClick}>
         <div className="modal-content" onClick={handleStopPropagation}>
            {activeModal === "login" && (
               <LoginModal onClose={() => setActiveModal(null)} 
                           onSwitch={() => setActiveModal("register")}/>
            )}

            {activeModal === "register" && (
               <RegisterModal onClose={() => setActiveModal(null)} 
                              onSwitch={() => setActiveModal("login")}
                              onSuccess={() => setActiveModal("success")}
               />
            )}

            {activeModal === "success" && (
               <SuccessModal onClose={() => setActiveModal(null)}
                             onSwitch={() => setActiveModal("login")}               
               />
            )}
         </div>
      </div>
   )
}