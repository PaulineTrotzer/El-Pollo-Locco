class Endboss extends MovableObject {
    height = 450;
    width = 300;
    x = 11500;
    y = 10;
    speed = 0;
    offset = {
        top: 5,
        bottom: 5,
        left: 25,
        right: 25
    };
    isNowDead = false;
    walkingInterval;
    hasScreamed = false;
    flappingInterval;
    endbossIsCryingInterval;
    hasCried = false;
    deathInterval;


    constructor() {
        super().loadImage(ENDBOSS_WALKING[0]);
        this.loadImages(ENDBOSS_WALKING);
        this.loadImages(ENDBOSS_EYECONTACT);
        this.loadImages(ENDBOSS_ATTACK);
        this.loadImages(ENDBOSS_HURT);
        this.loadImages(ENDBOSS_DEAD);
        this.loadImagetoCache('img/5_background/second_half_background.png');
        this.startWalking();
        this.runDeathAnimation();
    }


    /**
     * shows endboss walking
     */
    startWalking() {
        this.walkingInterval = setInterval(() => {
            this.playAnimation(ENDBOSS_WALKING);
            this.moveLeft();
        }, 800);
    }


    /**
     * stops endboss walking animation
     */
    stopWalkingAnimation() {
        clearInterval(this.walkingInterval);
    }


    /**
     * shows the alert animation and leads to the next animation
     */
    alertAnimation() {
        this.playAnimation(ENDBOSS_EYECONTACT);
        this.proofScreamingBehaviour();
        this.stopWalkingAnimation();
        setTimeout(() => {
            this.attackAnimation();
        }, 500);
    }


    /**
     * proofs if endboss has screamed already
     */
    proofScreamingBehaviour() {
        if (!this.hasScreamed) {
            this.startScreaming();
        }
    }


    /**
     * plays the screaming sound of the endboss and sets the flag to - already screamed.
     */
    startScreaming() {
        sounds.playSound(sounds.introScreaming);
        this.hasScreamed = true;
    }


    /**
     * shows the attack animation of the endboss and finishes it as he begins to run
     */
    attackAnimation() {
        this.playAnimation(ENDBOSS_ATTACK);
        this.startWalking();
        this.startFlappingSound();
        setTimeout(() => {
            this.stopFlapping();
            this.beginsToRun();
        }, 1300);
    }


    /**
     * lets the endboss run
     */
    beginsToRun() {
        this.speed = 40;
    }


    /**
     * plays the flapping sound
     */
    startFlappingSound() {
        sounds.playSound(sounds.flappingWings);
    }


    /**
     * stops the flapping sound
     */
    stopFlapping() {
        sounds.flappingWings.pause();
    }


    /**
     * animates the endboss if he was hurt
     */
    animateEndbossInjuries() {
        if (!this.hasCried)
            this.showCryingAnimation();
        setTimeout(() => {
            this.hasCried = true;
        }, 300);
        this.endbossDamageIsOver();
        setTimeout(() => {
            this.resetStatusofDamage();
        }, 300);
    }


    /**
     * stops endboss crying episode
     */
    endbossDamageIsOver() {
        if (this.hasCried) {
            this.stopCrying();
        }
    }


    /**
     * resets the status for the next attack from character
     */
    resetStatusofDamage() {
        this.hasCried = false;
    }


    /**
     * shows the endboss hurt animation and plays sound of crying
     */
    showCryingAnimation() {
        this.playAnimation(ENDBOSS_HURT);
        sounds.playSound(sounds.endbossCrying);
    }


    /**
     * stops sound of crying
     */
    stopCrying() {
        sounds.endbossCrying.pause();
    }


    /**
     * proofs if Endboss is Dead
     */
    runDeathAnimation() {
        setInterval(() => {
            this.checkDeathAnimation();
            this.checkForDeathTimeOuts();
        }, 200);
    }


    /**
     * plays the death animation if endboss is dead
     */
    checkDeathAnimation() {
        if (this.isDead()) {
            this.playAnimation(ENDBOSS_DEAD);
        }
    }


    /**
     * goes into controlTimeouts if the endboss is dead.
     */
    checkForDeathTimeOuts() {
        if (this.isDead()) {
            this.controlTimeOuts();
        }
    }


    /**
     * controls the timing and sounds of the death animation
     */
    controlTimeOuts() {
        setTimeout(() => {
            this.lastSoundEndboss();
        }, 550);
        if (gameStillrunning) {
            setTimeout(() => {
                this.showWinningScreen();
            }, 2200);
        }
    }


    /**
     * shows a winning screen and plays a connected sound
     */
    showWinningScreen() {
        this.winningSoundPlayer();
        stopGame();
        showEndScreenWin();
    }


    /**
     * plays a painful sound which comes from the endboss if audio is not muted
     */
    lastSoundEndboss() {
        if (!audioMute) {
            sounds.endbosswasKilled.play();
        }
    }


    /**
     * plays a 'winning' sound if audio is not muted
     */
    winningSoundPlayer() {
        if (!audioMute) {
            sounds.playerWins.play();
        }
    }
}


