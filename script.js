let videoElement = document.getElementById('video');
let button = document.getElementById('Start-button');
let Led = document.getElementById('led-red');
let switchStatus = document.getElementById('switch-status');

let Mode = false;

async function selectMedia() {
    try {
        const media = await navigator.mediaDevices.getDisplayMedia();
        videoElement.srcObject = media;

        videoElement.onloadedmetadata = () => {
            videoElement.play();
            button.disabled = false; // enable button only after video is ready
        };

        Mode = true;
        ModeStatus();

    } catch (error) {
        console.log('Error! select Media ', error);
    }
}

button.addEventListener('click', async () => {
    try {
        if (videoElement.readyState >= 1) {
            await videoElement.requestPictureInPicture();
        } else {
            // Wait until metadata is loaded
            videoElement.addEventListener('loadedmetadata', async () => {
                await videoElement.requestPictureInPicture();
            }, { once: true });
        }

        Led.id = 'led-red-on';
        switchStatus.innerText = 'ON';

    } catch (error) {
        console.error('Failed to enter PiP:', error);
    }
});

selectMedia();
