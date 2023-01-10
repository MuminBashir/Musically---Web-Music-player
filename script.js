console.log("Welcome to my playlist");
let songIndex = 1;
let audioElement = new Audio("songPath/song1.mp3");
let progressBar = document.getElementById("progressBar");
let masterPlay = document.getElementById("masterPlay");
let next = document.getElementById("next");
let previous = document.getElementById("previous");
let songinfo = document.getElementById("songinfo");
let gif = document.getElementById("gif");
let songitems = document.getElementsByClassName("songitems");
let songitemplay = document.getElementsByClassName("songitemplay");
let flag = [0, 0, 0, 0, 0];

let songs = [
    { songName: "Kahani Suno - 2.0", songCover: "songCover/cover1.jpg", songPath: "songPath/song1.mp3" },
    { songName: "Love Story", songCover: "songCover/cover2.jpg", songPath: "songPath/song2.mp3" },
    { songName: "See You Again", songCover: "songCover/cover3.jpg", songPath: "songPath/song3.mp3" },
    { songName: "The Thousand Nights", songCover: "songCover/cover4.jpg", songPath: "songPath/song4.mp3" },
    { songName: "Toh Fir Aao", songCover: "songCover/cover5.jpg", songPath: "songPath/song5.mp3" }
]

//set all songs
Array.from(songitems).forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].songCover;
    element.getElementsByClassName("songName")[0].innerHTML = songs[i].songName;
});

// play/pause
masterPlay.addEventListener("click", () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
        gif.style.opacity = "1";
        songitemplay[songIndex - 1].classList.remove("fa-play-circle")
        songitemplay[songIndex - 1].classList.add("fa-pause-circle");
    }

    else {
        audioElement.pause();
        masterPlay.classList.remove("fa-pause-circle");
        masterPlay.classList.add("fa-play-circle");
        gif.style.opacity = "0";
        songitemplay[songIndex - 1].classList.remove("fa-pause-circle")
        songitemplay[songIndex - 1].classList.add("fa-play-circle");
    }
});

//progress bar update
audioElement.addEventListener("timeupdate", () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    progressBar.value = progress;
    if (progress == 100) {
        progressBar.value = 0;
        audioElement.pause();
        masterPlay.classList.remove("fa-pause-circle");
        masterPlay.classList.add("fa-play-circle");
        gif.style.opacity = "0";
    }
});

progressBar.addEventListener("change", () => {
    audioElement.currentTime = ((progressBar.value / 100) * audioElement.duration);
});

// song individual play

let pauseAll = () => {
    Array.from(songitemplay).forEach((element) => {
        element.classList.remove("fa-pause-circle");
        element.classList.add("fa-play-circle");
    });
}
Array.from(songitemplay).forEach((element) => {
    element.addEventListener("click", (e, i) => {
        if (flag[i] == 0) {
            flag[i] = 1;
            songIndex = parseInt(element.id)
            pauseAll();
            e.target.classList.remove("fa-play-circle");
            e.target.classList.add("fa-pause-circle");
            audioElement.pause();
            audioElement.src = `songPath/song${songIndex}.mp3`;
            audioElement.currentTime = 0;
            audioElement.play();
            masterPlay.classList.remove("fa-play-circle");
            masterPlay.classList.add("fa-pause-circle");
            songinfo.innerHTML = songs[songIndex - 1].songName;
            gif.style.opacity = "1";
        }
        else {
            flag[i] = 0;
            audioElement.pause();
            masterPlay.classList.remove("fa-pause-circle");
            masterPlay.classList.add("fa-play-circle");
            e.target.classList.remove("fa-pause-circle");
            e.target.classList.add("fa-play-circle");
            gif.style.opacity = "0";
        }
    });
});

previous.addEventListener("click", () => {
    if (songIndex == 1) {
        songIndex = 5;
    }
    else {
        songIndex--;
    }
    audioElement.pause();
    audioElement.src = `songPath/song${songIndex}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
    pauseAll();
    songinfo.innerHTML = songs[songIndex - 1].songName;
    gif.style.opacity = "1";
    songitemplay[songIndex - 1].classList.remove("fa-play-circle")
    songitemplay[songIndex - 1].classList.add("fa-pause-circle");
});

next.addEventListener("click", () => {
    if (songIndex == 5) {
        songIndex = 1;
    }
    else {
        songIndex++;
    }
    audioElement.pause();
    audioElement.src = `songPath/song${songIndex}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
    pauseAll();
    songinfo.innerHTML = songs[songIndex - 1].songName;
    gif.style.opacity = "1";
    songitemplay[songIndex - 1].classList.remove("fa-play-circle")
    songitemplay[songIndex - 1].classList.add("fa-pause-circle");
});