import check1 from "../../assets/media/sounds/check1.mp3";

interface Audio {
    name: string;
    artist: string; 
}

export default function check1Sound(name: string, artist: string) {
    const check1audio: any = new Audio(check1);
    check1audio.play();
    check1audio.name = check1;
    check1audio.artist = umru;
    return (audio, name, artist)
}