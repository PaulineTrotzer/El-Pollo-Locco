let canvas;
let worldInstance;
let sounds = new Sounds();
let keyboard = new Keyboard();
let letsPlaySound = new Audio('audio/lets-go.mp3');
let audioMute = true;
let previousGamedeleted = false;
let gameStillrunning = true;
const loadingScreen = document.getElementById('game-loading-ct');
const startScreen = document.getElementById('startscreen-container');
const turnDeviceImg = document.getElementById('turn-device-overlay');



/**
 * implements an eventlistener for the function checkWindowWidth
 */
function implementTurnDevice() {
    window.addEventListener('resize', checkWindowWidth);
    checkWindowWidth();
}


/**
 * hides the display to let the user see a loading screen
 */
function hideBeginningScreen() {
    loadingScreen.classList.remove('d-none');
    setTimeout(() => {
        startScreen.classList.add('d-none');
    }, 5);
}


/**
 * animates loading screen
 */
function gameLoading() {
    const loadingText = document.getElementById('loading-text');
    const spans = loadingText.querySelectorAll('span');

    spans.forEach((span, spanIndex) => {
        span.style.animationDelay = `${spanIndex * 0.5}s`;
        span.classList.add('animate-text');
    });
}

/**
 * shows the loading screen and restarts the game 
 */
async function restartGame() {
    hideBeginningScreen();
    gameLoading();
    hideEndscreenOverlay();
    await level1init();
    worldInstance.startWorld();
    gameIsReLoaded();
}


/**
 * ends the reloading process
 */
function gameIsReLoaded() {
    setTimeout(() => {
        hideLoadingScreen();
        gameStillrunning = true;
    }, 3000);
}


/**
 * creates a new world class and inserts it into the canvas
 */
function startLevel() {
    canvas = document.getElementById('canvas');
    worldInstance = new World(canvas, sounds, keyboard);
}


/**
 * checks the screen width and decides on further action
 */
function checkWindowWidth() {
    if (window.innerWidth <= 1024) {
        showResponsiveBtns();
    } else if (window.innerWidth >= 1024) {
        hideResponsiveBtns();
    }
    if (window.innerWidth < 575) {
        deviceInfo('turnDevicepls');
    } else {
        deviceInfo('noDeviceChange');
    }
}


/**
 * If the condition is met, a message appears about the need for a higher screen width
 * @param {string} command - indicates which case is present
 */
function deviceInfo(command) {
    if (command === 'turnDevicepls') {
        turnDeviceImg.classList.add('d-flex');
    } else if (command === 'noDeviceChange') {
        turnDeviceImg.classList.remove('d-flex');
    }
}


/**
 * the function starts the game with a sound and displays the world
 */
function letsPlay() {
    hideBeginningScreen();
    gameLoading();
    checkLetsPlaysound();
    setTimeout(() => {
        startLevel();
        hideLoadingScreen();
    }, 3000);
}


/**
 * checks whether the sound is muted, if not an audio file is played.
 */
function checkLetsPlaysound() {
    if (!audioMute) {
        letsPlaySound.play();
    }
}


/**
 * this function changes an icon depending on whether the user switches the sound on or off. 
 * Finally, the new audio status is switched and saved.
 */
function toggleAudio() {
    let audioIcon = document.getElementById('audio-icon');
    if (!audioMute) {
        audioIcon.setAttribute('src', 'assets/icons/audio-remove.svg');
    } else {
        audioIcon.setAttribute('src', 'assets/icons/audio-add.svg');
    }
    audioMute = !audioMute;
}


/**
 * stops the game and resets essential variables
 */
async function stopGame() {
    await clearAllIntervalsAndTimeouts();
    gameStillrunning = false;
    keyboard.stopInput = false;
}


/**
 * deletes all intervals and timeouts of the world class and the corresponding classes
 */
async function clearAllIntervalsAndTimeouts() {
    for (let i = 1; i < 9999; i++) {
        window.clearInterval(i);
    }
    for (let i = 1; i < 9999; i++) {
        window.clearTimeout(i);
    }
}


/* SETTINGS */

/**
 * the function checks which method is supported by the browser (requestFullscreen, msRequestFullscreen, webkitRequestFullscreen)
 *  and calls the corresponding method on the element to set it into fullscreen.
 * @param {*} element - the HTML element that is to switch to full screen mode.
 */
function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    }
}

/**
 * switches between the two states ‘full screen mode’ and ‘leave full screen mode’
 */
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

/**
 * takes the element out of fullscreen mode
 */
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
    exitFullscreen();
}

/**
 * makes the start screen disappear
 */
function hideStartScreen() {
    startScreen.classList.add('d-none');
}

/**
 * makes the loading screen disappear
 */
function hideLoadingScreen() {
    loadingScreen.classList.add('d-none');
}

/**
 * shows responsive buttons for devices with smaller screen width.
 */
function showResponsiveBtns() {
    document.getElementById('responsive-button-set').classList.add('d-flex');
}

/**
 * makes the responsive buttons disappear
 */
function hideResponsiveBtns() {
    document.getElementById('responsive-button-set').classList.remove('d-flex');
}
/*<---------------------------------------------------------------------------->*/




/* INSTRUCTIONS */

/**
 * shows the screen with gaming instructions 
 */
function showInstructions() {
    document.getElementById('instruction-container').classList.remove('d-none');
}

/**
 * the function checks whether the element body or h1-plus-content triggered the event.
If this is the case, the instructions are closed.
 * @param {HTMLElement} event - event target to which the logic is to be applied
 */
function closeInstructions(event) {
    if (event.target.id === 'body' || event.target.id === 'h1-plus-content') {
        hideInstructions();
    }
}

/**
 * makes the instructions disappear
 */
function hideInstructions() {
    document.getElementById('instruction-container').classList.add('d-none');
}
/*<---------------------------------------------------------------------------->*/




/**
 * shows the final screen in case of winning the game
 */
function showEndScreenWin() {
    document.getElementById('game-finished-container').classList.remove('d-none');
    document.getElementById('game-over-img').classList.remove('d-none');
    document.getElementById('game-over-lost-img').classList.add('d-none');
}


/**
 * shows the final screen in case of losing the game
 */
function showEndScreenFail() {
    document.getElementById('game-finished-container').classList.remove('d-none');
    document.getElementById('game-over-lost-img').classList.remove('d-none');
}


/**
 * makes the end screen overlay disappear
 */
function hideEndscreenOverlay() {
    document.getElementById('game-finished-container').classList.add('d-none');
}


/**
 * the user leaves the game and the page is reloaded
 */
function quitEndscreen() {
    location.reload();
}


/**
 * opens the privacy information
 */
function openPrivacy() {
    window.open('privacy.html', '_blank');
}


/**
 * opens the imprint information
 */
function openImprint() {
    window.open('imprint.html', '_blank');
}

