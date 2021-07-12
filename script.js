let videoElement =  document.getElementById('video');
let button = document.getElementById('Start-button');
let Led = document.getElementById('led-red');
let switchStatus = document.getElementById('switch-status');

async function selectMedia() {
    try {
        const Media = await navigator.mediaDevices.getDisplayMedia();
        videoElement.srcObject = Media;
        videoElement.onloadedmetadata = () => {
            videoElement.play();
        }
        Mode = true; 
        ModeStatus();  
    } catch (error) {
        console.log('Error! select Media ')
    }
}   

button.addEventListener('click',  async () => {
    await videoElement.requestPictureInPicture();
    button.disabled = false;
    Led.id = ('led-red-on');
    switchStatus.innerText = 'ON';
});

selectMedia();
