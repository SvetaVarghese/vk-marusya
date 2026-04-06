import adventureImg from "../assets/adventureImg.jpg"
import animationImg from "../assets/animationImg.webp"
import comedyImg from "../assets/comedyImg.jpg"
import crimeImg from "../assets/crimeImg.webp"
import detectiveImg from "../assets/detectiveImg.jpg"
import documentaryImg from "../assets/documentaryImg.webp"
import dramaImg from "../assets/dramaImg.jpg"
import familyImg from "../assets/familyImg.jpg"
import fantasyImg from "../assets/fantasyImg.jpg"
import historyImg from "../assets/historyImg.jpg"
import horrorImg from "../assets/horrorImg.webp"
import musicImg from "../assets/musicImg.jpg"
import mysteryImg from "../assets/mysteryImg.webp"
import romanceImg from "../assets/romanceImg.webp"
import scifiImg from "../assets/scifiImg.webp"
import standupImg from "../assets/stand-upImg.jpg"
import thrillerImg from "../assets/thrillerImg.jpg"
import warImg from "../assets/warImg.jpg"
import westernImg from "../assets/westernImg.jpg"
import tvmovieImg from "../assets/tv-movieImg.webp"
import actionImg from "../assets/actionImg.webp"

const knownGenres = [
    "history", "horror", "scifi", "stand-up", "fantasy", "drama", "mystery",
    "family", "comedy", "romance", "music", "crime", "tv-movie", "documentary",
    "action", "thriller", "western", "animation", "war", "adventure"
];

export type KnownGenres = typeof knownGenres[number]

export const genreImages: Record<KnownGenres, string> = {
    adventure: adventureImg,
    comedy: comedyImg,
    animation: animationImg,
    family: familyImg,
    crime: crimeImg,
    history: historyImg,
    detective: detectiveImg,
    documentary: documentaryImg,
    western: westernImg,
    "tv-movie": tvmovieImg,
    war: warImg,
    scifi: scifiImg,
    thriller: thrillerImg,
    mystery: mysteryImg,
    romance: romanceImg,
    "stand-up": standupImg,
    music: musicImg,
    drama: dramaImg,
    horror: horrorImg,
    fantasy: fantasyImg,
    action: actionImg
}

export const splitGenres = (genres: string[]): string[] => {
    return genres.flatMap(g => {
        if (knownGenres.includes(g.toLowerCase() as KnownGenres)) return [g]
        return knownGenres.filter(kg => g.toLowerCase().includes(kg))
    })
}

