let canvas;
let worldInstance;
let sounds = new Sounds();
let keyboard = new Keyboard();
let audioMute = true;
let previousGamedeleted = false;
let gameStillrunning = true;


const loadingElement = document.getElementById('game-loading-ct');

function stopIntervals() {
    worldInstance.clearAll();
}


function hideStartScreen() {
    document.getElementById('startscreen-container').classList.add('d-none');
}


async function gameLoading() {
    loadingElement.classList.remove('d-none')
    const loadingText = document.getElementById('loading-text');
    const letters = loadingText.textContent.split('');
    loadingText.innerHTML = letters.map((letter, index) =>
        `<span class="animate-text" style="animation-delay: ${index * 0.1}s">${letter} </span>`).join(' ');
}


async function restartGame() {
    hideFinishContainer();
    //   gameLoading();
    await level1init();
    //  startLevel();
    worldInstance.startWorld();
    gameIsLoaded();
    gameStillrunning = true;
}


function gameIsLoaded() {
    setTimeout(() => {
        hideLoadingScreen();
    }, 1500);
}


function startLevel() {
    gameLoading();
    canvas = document.getElementById('canvas');
    worldInstance = new World(canvas, sounds, keyboard);
    isLoading = false;
}



function hideLoadingScreen() {
    loadingElement.classList.add('d-none');
}


function checkWindowWidth() {
    let element = document.getElementById('turn-device-overlay');
    if (window.innerWidth < 575) {
        element.classList.remove('d-none');
        hideGameEndoptions();
    } else {
        element.classList.add('d-none');
        showGameEndoptions();
    }
}

function turnDevice() {
    window.addEventListener('resize', checkWindowWidth);
    checkWindowWidth();
}



async function letsPlay() {
    let letsPlaySound = new Audio('audio/lets-go.mp3');
    if (!audioMute) {
        letsPlaySound.play();
    }
    if (window.innerWidth <= 1024) {
        document.getElementById('responsive-button-set').classList.remove('d-none');
    }
    startLevel();
    if (!isLoading) {
        hideLoadingScreen();
    }
}




function toggleAudio() {
    let audioIcon = document.getElementById('audio-icon');
    if (!audioMute) {
        audioIcon.setAttribute('src', 'icons/audio-icons/audio-remove.svg');
    } else {
        audioIcon.setAttribute('src', 'icons/audio-icons/audio-add.svg');
    }
    audioMute = !audioMute;
}



async function stopGame() {
    worldInstance.clearAll();
    for (let i = 1; i < 9999; i++) {
        window.clearTimeout(i);
    }
    // clearAllIntervalsAndTimeouts();
    gameStillrunning = false;
}



async function clearAllIntervalsAndTimeouts() {
    for (let i = 1; i < 9999; i++) {
        window.clearInterval(i);
    }
}


/* Settings */
function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    }
}


function toggleFullScreen() {
    let fullscreen = document.getElementById('content');
    if (!document.fullscreenElement) {
        enterFullscreen(fullscreen);
        document.body.classList.add('fullscreen-mode');
    } else if (document.exitFullscreen) {
        document.body.classList.remove('fullscreen-mode');
        document.exitFullscreen();
    }
}

function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
    exitFullscreen();
}
/* end of settings */


/* Instruction - container */
function showInstructions() {
    document.getElementById('instruction-container').classList.remove('d-none');
}


function closeInstructions(event) {
    if (event.target.id === 'body' || event.target.id === 'h1-plus-content') {
        document.getElementById('instruction-container').classList.add('d-none');
    }
}

function backToPlayScreen() {
    document.getElementById('instruction-container').classList.add('d-none')
}

/*  <<<<<< ----------------->>>>>>>>>>*/



function showEndScreenWin() {
    document.getElementById('game-finished-container').classList.remove('d-none');
    document.getElementById('game-over-img').classList.remove('d-none');
}



function showEndScreenFail() {
    document.getElementById('game-finished-container').classList.remove('d-none');
    document.getElementById('game-over-lost-img').classList.remove('d-none');
}


function showGameEndoptions() {
    document.getElementById('restart-btn').classList.remove('d-none');
    document.getElementById('quit-btn').classList.remove('d-none');
}

function hideGameEndoptions() {
    document.getElementById('restart-btn').classList.add('d-none');
    document.getElementById('quit-btn').classList.add('d-none');
}

function hideFinishContainer() {
    document.getElementById('game-finished-container').classList.add('d-none');
}


function quitEndscreen() {
    location.reload();
}

function openPrivacy() {
    window.open('privacy.html', '_blank');
}

function openImprint() {
    window.open('imprint.html', '_blank');
}

