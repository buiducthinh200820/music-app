const song = document.getElementById("song");
const playBtn = document.querySelector(".player-inner");
const nextBtn = document.querySelector(".play-forward");
const prevBtn = document.querySelector(".play-back");
const durationTime = document.querySelector(".duration");
const remainingTime = document.querySelector(".remaining");
const rangeBar = document.querySelector(".range");
const musicName = document.querySelector(".music-name");
const musicThumbnail = document.querySelector(".music-thumb");
const musicImage = document.querySelector(".music-thumb img");
const playRepeat=document.querySelector(".play-repeat");
const volume=document.querySelector(".volume");


let isPlaying = true;
let indexSong = 0;
let isRepeat =false;
let timer;


const musics = [
  {
    id: 1,
    title: "Dance Monkey",
    file: "dancemonkey.mp3",
    image:
      "https://images.unsplash.com/photo-1547153760-18fc86324498?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  },
  {
    id: 2,
    title: "Fly Away",
    file: "flyaway.mp3",
    image:
      "https://images.unsplash.com/photo-1545132147-d037e6c54cfd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  },
  {
    id: 3,
    title: "Ngày Đầu Tiên",
    file: "ngay_dau_tien.mp3",
    image:
      "https://images.unsplash.com/photo-1606800052052-a08af7148866?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
  {
    id: 4,
    title: "Unstopable",
    file: "unstopable.mp3",
    image:
      "https://images.unsplash.com/photo-1512310604669-443f26c35f52?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=734&q=80",
  },
  {
    id: 5,
    title: "waiting for love ",
    file: "waitingforlove.mp3",
    image:
      "https://images.unsplash.com/photo-1516980907201-943c13a8d03c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
  

];

/**
 * 
 * Music
 * id: 1
 * title: Holo
 * file: holo.mp3
 * image: unsplash
 */
//next song 
nextBtn.addEventListener("click", function () {
  changeSong(1);
});
//prev song
prevBtn.addEventListener("click", function () {
  changeSong(-1);
});
//next, prev song
function changeSong(dir) {
  if (dir === 1) {
    // next song
    indexSong++;
    if (indexSong >= musics.length) {
      indexSong = 0;
    }
    isPlaying = true;
  } else if (dir === -1) {
    // prev song
    indexSong--;
    if (indexSong < 0) {
      indexSong = musics.length - 1;
    }
    isPlaying = true;
  }
  init(indexSong);
  
  playPause();
}
//repeat song
playRepeat.addEventListener("click",function(){
  if(isRepeat) 
  {
    isRepeat =false;
    playRepeat.removeAttribute("style")
  }
  else
    { 
      isRepeat =true;
      playRepeat.style.color ="#ffb86c"
    }
});

song.addEventListener("ended",handEnderSong);
function handEnderSong(){
  if(isRepeat){
    isPlaying=true;
    playPause();
  }else{
    changeSong(1);
  }
  
}
//chức năng play pause song
playBtn.addEventListener("click", playPause);
function playPause() {
  if (isPlaying) {
    musicThumbnail.classList.add("is-playing");
    song.play();
    playBtn.innerHTML = `<ion-icon name="pause-circle"></ion-icon>`;
    isPlaying = false;
    timer = setInterval(displayTimer, 500);
  } else {
    musicThumbnail.classList.remove("is-playing");
    song.pause();
    playBtn.innerHTML = `<ion-icon name="play"></ion-icon>`;
    isPlaying = true;
    clearInterval(timer);
  }
}
//chức năng cập nhập time
function displayTimer() {
  const { duration, currentTime } = song;
  //duratime: thời gian thực ,curentime :đã chaỵ được bao nhiêu s
  rangeBar.max = duration;
  rangeBar.value = currentTime;
  remainingTime.textContent = formatTimer(currentTime);
  if (!duration) {
    durationTime.textContent = "00:00";
  } else {
    durationTime.textContent = formatTimer(duration);
  }
}
//formast Time
function formatTimer(number) {
  const minutes = Math.floor(number / 60);
  const seconds = Math.floor(number - minutes * 60);
  return `${minutes < 10 ? "0" + minutes : minutes}:${
    seconds < 10 ? "0" + seconds : seconds
  }`;
}
//cập nhập theo time
rangeBar.addEventListener("change", handleChangeBar);
function handleChangeBar() {
  song.currentTime = rangeBar.value;
}
//cập nhập dữ liệu khi thay đổi bài 
function init(indexSong) {
  song.setAttribute("src", `./music/${musics[indexSong].file}`);
  musicImage.setAttribute("src", musics[indexSong].image);
  musicName.textContent = musics[indexSong].title;
}
displayTimer();
init(indexSong);
