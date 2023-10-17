/* Platforma de streaming pentru care lucrezi începe să aibă din ce în ce mai mulți utilizatori!
Din cauza asta, serialele populare încep să fie din ce în ce mai vizionate, iar serverele nu mai pot face față!
Implementează un mecanism de caching în metoda playVideo care să folosească conceptul de closures pentru a 
    stoca în memorie numărul de pixeli din fiecare cadru 

La primul apel pentru un anumit cadru, vei apela metoda getFrameFromDatabase pentru a extrage numărul din baza de date
    însă, la următorul apel pentru același cadru, trebuie să returnezi numpărul de pixeli încărcat anterior
    fără a mai apela metoda getFrameFromDatabase încă o dată
*/
const playVideo = () => {

};

const getFrameFromDatabase = (frame) => {
    return Math.floor(Math.random() * frame * 10000);
}

const MediaPlayer = playVideo();
console.log(MediaPlayer(2));
console.log(MediaPlayer(4));
console.log(MediaPlayer(2));
