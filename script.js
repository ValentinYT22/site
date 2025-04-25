const songs = [
    { id: 'audio1', title: 'Germanusu', image: 'Euyt.jpg', audio: 'Germanusu.mp3' },
    { id: 'audio2', title: 'Fara reguli', image: 'Euyt.jpg', audio: 'Fara reguli.mp3' },
    { id: 'audio3', title: 'CulorideGri', image: 'Euyt.jpg', audio: 'CulorideGri.mp3' },
    { id: 'audio4', title: 'Dincolo de Linia Fină', image: 'Euyt.jpg', audio: 'Dincolo de Linia Fină.mp3' },
    { id: 'audio5', title: 'Ecouri din Tăcere', image: 'Euyt.jpg', audio: 'Ecouri din Tăcere oficial.mp3' },
    { id: 'audio6', title: 'Azi, nu mâine', image: 'Euyt.jpg', audio: 'Azi, nu mâine.mp3' },
    { id: 'audio7', title: 'Eu', image: 'Euyt.jpg', audio: 'Eu.mp3' },
    { id: 'audio8', title: 'Pe Marginea Haosului', image: 'Euyt.jpg', audio: 'Pe Marginea Haosului.mp3' },
    { id: 'audio9', title: 'Fara Harta', image: 'Euyt.jpg', audio: 'Fara Harta.mp3' },
    { id: 'audio10', title: 'Schimbare de perspectivă', image: 'Euyt.jpg', audio: 'Schimbare de perspectivă v1.mp3' },
    { id: 'audio11', title: 'Stele Pe Cer', image: 'Euyt.jpg', audio: 'Stele Pe Cer 2000.mp3' },
    { id: 'audio12', title: 'Vise de Cristal', image: 'Euyt.jpg', audio: 'Vise de Cristal.mp3' },
    { id: 'audio13', title: 'Sub Stelele Noastre', image: 'Euyt.jpg', audio: 'Sub Stelele Noastre 2000.mp3' },
    { id: 'audio14', title: 'Umdre si lumina', image: 'Euyt.jpg', audio: 'Umdre si lumina v3.mp3' },
    { id: 'audio15', title: 'Sotto lo Stesso Cielo', image: 'Euyt.jpg', audio: 'Sotto lo Stesso Cielo.mp3' },
    { id: 'audio16', title: 'Adevăr pe mute', image: 'Euyt.jpg', audio: 'Adevăr pe mute.mp3' },
    { id: 'audio17', title: 'Alegeri și Risc', image: 'Euyt.jpg', audio: 'Alegeri și Risc.mp3' },
    { id: 'audio18', title: 'E O Stea', image: 'Euyt.jpg', audio: 'E O Stea.mp3' },
    { id: 'audio19', title: 'Inima Pustie', image: 'Euyt.jpg', audio: 'Inima Pustie.mp3' },
    { id: 'audio20', title: 'Steaua Mea', image: 'Euyt.jpg', audio: 'Steaua Mea.mp3' },
    { id: 'audio21', title: 'Stele pe cer2', image: 'Euyt.jpg', audio: 'Stele pe cer.mp3' },
    { id: 'audio22', title: 'Suflet dezarmat', image: 'Euyt.jpg', audio: 'Suflet dezarmat.mp3' },
    { id: 'audio23', title: 'Real în 4K', image: 'Euyt.jpg', audio: 'Real în 4K.mp3' },
    { id: 'audio24', title: 'Pe cont propriu', image: 'Euyt.jpg', audio: 'Pe cont propriu v2.mp3' },
    { id: 'audio25', title: 'Nedrept', image: 'Euyt.jpg', audio: 'Nedrept.mp3' },
    { id: 'audio26', title: 'Multe', image: 'Euyt.jpg', audio: 'Multe.mp3' },
    { id: 'audio27', title: 'Internet', image: 'Euyt.jpg', audio: 'IDK.mp3' },
    { id: 'audio28', title: 'Contra curentului', image: 'Euyt.jpg', audio: 'Contra curentului.mp3' },
    { id: 'audio29', title: 'Contraste', image: 'Euyt.jpg', audio: 'Contraste.mp3' },
    { id: 'audio30', title: 'Iubire sau doar chin', image: 'Euyt.jpg', audio: 'Iubire sau doar chin.mp3' },
    { id: 'audio31', title: 'Simt vibe-ul rau', image: 'Euyt.jpg', audio: 'Simt vibe-ul rau.mp3' },
    { id: 'audio32', title: 'Mișcă talia', image: 'Euyt.jpg', audio: 'Mișcă talia.mp3' },
    { id: 'audio33', title: 'Între oglinzi', image: 'Euyt.jpg', audio: 'Între oglinzi.mp3' },
    { id: 'audio34', title: 'Valentin', image: 'Euyt.jpg', audio: 'Valentin.mp3' },
    { id: 'audio35', title: 'Iubirea mea', image: 'Euyt.jpg', audio: 'Iubirea mea.mp3' },
    { id: 'audio36', title: 'Eu Contra Lumii', image: 'Euyt.jpg', audio: 'Eu Contra Lumii oficial.mp3' },
    { id: 'audio37', title: 'Mai Mult', image: 'Euyt.jpg', audio: 'Mai Mult.mp3' },
    { id: 'audio38', title: 'Dragoste pentru Valentin', image: 'Euyt.jpg', audio: 'Dragoste pentru Valentin.mp3' },
    { id: 'audio39', title: 'Dragostea ca Otravă', image: 'Euyt.jpg', audio: 'Dragostea ca Otravă.mp3' },
    { id: 'audio40', title: 'Dualitate', image: 'Euyt.jpg', audio: 'Dualitate.mp3' },
    { id: 'audio41', title: 'Iluzii Sparte', image: 'Euyt.jpg', audio: 'Iluzii Sparte.mp3' },
    { id: 'audio42', title: 'În Oglindă', image: 'Euyt.jpg', audio: 'In oglindaF.mp3' },
    { id: 'audio43', title: 'Pe buze tu', image: 'Euyt.jpg', audio: 'Pe buze tu.mp3' },
    { id: 'audio44', title: 'Spuneai ca ma iubesti', image: 'Euyt.jpg', audio: 'Osky2.mp3' },
    { id: 'audio45', title: 'doar noi doi', image: 'Euyt.jpg', audio: 'Te-am găsit când lumea părea.mp3' },
    { id: 'audio46', title: 'Ți-ai bătut joc de un înger', image: 'Euyt.jpg', audio: 'Ți-ai bătut joc de un înger.mp3' },
    { id: 'audio47', title: 'Sterge naiba lacrima', image: 'Euyt.jpg', audio: 'sterge naiba lacrima4.mp3' },
    { id: 'audio48', title: 'Blestem pentru o mincinoasă', image: 'Euyt.jpg', audio: 'Blestem pentru o mincinoasă.mp3' }
];

const youtubeVideos = [
    { title: 'Imparatia Gheti', embedId: 'csWXCLusRkI' },
    { title: 'Ce s-a intamplat cu noi', embedId: 'cBZ0vtGBs8g' },
    { title: 'Iubirea Toxica', embedId: 'mzgZI19Oj_A' },
    { title: 'Umbre Pe Beat', embedId: 'p97z3bDusOY' },
    { title: 'Baby,tu esti toxica', embedId: 'v16JuylUbxw' },
    { title: 'Din Mii', embedId: 'o8tgRX2xSZs' }
];

let currentlyPlaying = null;
let currentVolume = 1.0;

function createSongCard(song) {
    return `
        <div class="song-card" id="card-${song.id}">
            <img src="${song.image}" alt="${song.title}" id="image${song.id.replace('audio', '')}">
            <div class="song-title">${song.title}</div>
            <div class="audio-controls">
                <button onclick="playAudio('${song.id}', 'image${song.id.replace('audio', '')}')" class="play-button">
                    Play
                </button>
                <div class="volume-control">
                    <input type="range" 
                           min="0" 
                           max="1" 
                           step="0.1" 
                           value="${currentVolume}"
                           class="volume-slider"
                           oninput="adjustVolume('${song.id}', this.value)"
                           title="Volume">
                </div>
                <div class="progress-container">
                    <div class="progress-bar" id="progress-${song.id}"></div>
                </div>
                <div class="time-display">
                    <span id="current-${song.id}">0:00</span> / 
                    <span id="duration-${song.id}">0:00</span>
                </div>
            </div>
            <audio id="${song.id}" src="${song.audio}" 
                onloadedmetadata="setDuration('${song.id}')"
                ontimeupdate="updateProgress('${song.id}')"></audio>
        </div>
    `;
}

function createYoutubeVideo(video) {
    return `
        <li class="video-item">
            <h3>${video.title}</h3>
            <div class="thumbnail">
                <iframe src="https://www.youtube.com/embed/${video.embedId}" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen></iframe>
            </div>
        </li>
    `;
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

window.setDuration = function(audioId) {
    const audio = document.getElementById(audioId);
    const durationElement = document.getElementById(`duration-${audioId}`);
    durationElement.textContent = formatTime(audio.duration);
};

window.updateProgress = function(audioId) {
    const audio = document.getElementById(audioId);
    const progressBar = document.getElementById(`progress-${audioId}`);
    const currentTimeElement = document.getElementById(`current-${audioId}`);
    
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = `${progress}%`;
    currentTimeElement.textContent = formatTime(audio.currentTime);
};

window.adjustVolume = function(audioId, value) {
    const audio = document.getElementById(audioId);
    audio.volume = value;
    currentVolume = value;
    
    // Update all other volume sliders to maintain consistency
    document.querySelectorAll('.volume-slider').forEach(slider => {
        slider.value = value;
    });
};

window.playAudio = function(audioId, imageId) {
    const audio = document.getElementById(audioId);
    const image = document.getElementById(imageId);
    const button = document.querySelector(`#card-${audioId} .play-button`);
    
    if (currentlyPlaying && currentlyPlaying !== audio) {
        currentlyPlaying.pause();
        const currentImage = document.getElementById(`image${currentlyPlaying.id.replace('audio', '')}`);
        const currentButton = document.querySelector(`#card-${currentlyPlaying.id} .play-button`);
        currentImage.classList.remove("rotating");
        currentButton.textContent = "Play";
    }

    if (audio.paused) {
        audio.play();
        image.classList.add("rotating");
        button.textContent = "Pause";
        currentlyPlaying = audio;
        audio.volume = currentVolume;
    } else {
        audio.pause();
        image.classList.remove("rotating");
        button.textContent = "Play";
        currentlyPlaying = null;
    }

    audio.addEventListener('ended', () => {
        image.classList.remove("rotating");
        button.textContent = "Play";
        currentlyPlaying = null;
    });
};

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (!currentlyPlaying) return;

    switch(e.code) {
        case 'Space':
            e.preventDefault();
            const button = document.querySelector(`#card-${currentlyPlaying.id} .play-button`);
            button.click();
            break;
        case 'ArrowUp':
            e.preventDefault();
            currentVolume = Math.min(1, currentVolume + 0.1);
            adjustVolume(currentlyPlaying.id, currentVolume);
            break;
        case 'ArrowDown':
            e.preventDefault();
            currentVolume = Math.max(0, currentVolume - 0.1);
            adjustVolume(currentlyPlaying.id, currentVolume);
            break;
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const musicList = document.getElementById('music-list');
    const videoList = document.querySelector('.video-list');

    musicList.innerHTML = songs.map(createSongCard).join('');
    videoList.innerHTML = youtubeVideos.map(createYoutubeVideo).join('');
});