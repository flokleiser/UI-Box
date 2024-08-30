import check1 from "../../assets/media/sounds/check1.mp3";

interface Audio {
    name: string;
    artist: string; 
    file: string;
}

const check1Sound: Audio = {
    name: "check1",
    artist: "Umru",
    file: check1
}

export {check1Sound}