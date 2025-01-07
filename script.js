function playAudio(audioId, imageId) {
    const audio = document.getElementById(audioId);
    const image = document.getElementById(imageId);

    if (audio.paused) {
        audio.play();
        image.classList.add("rotating"); // Începe animația de rotație
    } else {
        audio.pause();
        image.classList.remove("rotating"); // Oprește animația de rotație
    }

    // Resetează animația când piesa se termină
    audio.addEventListener('ended', () => {
        image.classList.remove("rotating"); // Oprește rotația la final
    });
}