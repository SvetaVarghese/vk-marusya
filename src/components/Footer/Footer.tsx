import VkIcon from "../../assets/svg/vk-icon.svg?react"
import TelegramIcon from "../../assets/svg/tg-icon.svg?react"
import OdnoklassnikiIcon from "../../assets/svg/ok-icon.svg?react"
import YoutubeIcon from "../../assets/svg/yt-icon.svg?react"
import "./Footer.css"

export const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
            <ul className="footer__socials">
                <li className="footer__socials-link">
                    <a className="footer__link" 
                       href="https://vk.com/svetikussmaximus"
                       aria-label="Ссылка на страницу Вконтакте"
                       target="_blank"
                       rel="noopener noreferrer">
                        <VkIcon />
                    </a>
                </li>
                <li className="footer__socials-link">
                    <a className="footer__link"
                       href="#" 
                       aria-label="Ссылка на Youtube-канал"
                       target="_blank"
                       rel="noopener noreferrer">
                        <YoutubeIcon />
                    </a>
                </li>
                <li className="footer__socials-link">
                    <a className="footer__link"
                       href="#" 
                       aria-label="Ссылка на Одноклассники"
                       target="_blank"
                       rel="noopener noreferrer">
                        <OdnoklassnikiIcon />
                    </a>
                </li>
                <li className="footer__socials-link">
                    <a className="footer__link"
                       href="https://t.me/svet_lo14"
                       aria-label="Ссылка на Телеграм-канал"
                       target="_blank"
                       rel="noopener noreferrer">
                        <TelegramIcon />
                    </a>
                </li>
            </ul>
            </div>
        </footer>
    )
}