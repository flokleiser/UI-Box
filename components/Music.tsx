import check1 from "../media/sounds/check1.mp3";
import didITellYou from "../media/sounds/didITellYou.mp3";

interface Audio {
    name: string;
    artist: string; 
    file: string;
}

const music: Audio[] = [
    {
        name: "check1",
        artist: "Umru",
        file: check1
    },
    {
        name: "did I Tell You",
        artist: "Kettema",
        file: didITellYou
    }
]

export {music}