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
    yellOut = false;


    constructor() {
        super().loadImage(ENDBOSS_WALKING[0]);
        this.loadImages(ENDBOSS_WALKING);
        this.loadImages(ENDBOSS_EYECONTACT);
        this.loadImages(ENDBOSS_ATTACK);
        this.loadImages(ENDBOSS_HURT);
        this.loadImages(ENDBOSS_DEAD);
        this.loadImagetoCache('img/5_background/second_half_background.png');
        this.startWalking();
        this.checkDeath();
    }


    startWalking() {
        this.walkingInterval = setInterval(() => {
            this.playAnimation(ENDBOSS_WALKING);
            this.moveLeft();
        }, 800);
    }


    stopWalking() {
        clearInterval(this.walkingInterval);
    }


    alertAnimation() {
        this.playAnimation(ENDBOSS_EYECONTACT);
        if (!this.hasScreamed) {
            this.startScreaming();
        }
        this.stopWalking();
        setTimeout(() => {
            this.attackAnimation();
        }, 500);
    }


    startScreaming() {
        sounds.playSound(sounds.introScreaming);
        this.hasScreamed = true;
    }


    attackAnimation() {
        this.playAnimation(ENDBOSS_ATTACK);
        this.startWalking();
        this.startFlapping();
        setTimeout(() => {
            this.stopFlapping();
            this.speed = 18;
        }, 1300);
    }


    startFlapping() {
        sounds.playSound(sounds.flappingWings);
    }


    stopFlapping() {
        sounds.flappingWings.pause();
    }


    makeCrying() {
        if (!this.hasCried)
            this.animateCrying();
        setTimeout(() => {
            this.hasCried = true;
        }, 300);
        if (this.hasCried) {
            this.stopCrying();
        }
        setTimeout(() => {
            this.hasCried = false;
        }, 300);
    }

    animateCrying() {
        this.playAnimation(ENDBOSS_HURT);
        sounds.playSound(sounds.endbossCrying);
    }


    stopCrying() {
        sounds.endbossCrying.pause();
    }


    checkDeath() {
        this.deathInterval = setInterval(() => {
            if (this.isDead() && !this.yellOut &&!this.deathCheck) {
                this.lastActionsEdboss();
                if (!this.yellOut) {
                    setTimeout(() => {
                        this.lastSoundEndboss();
                        this.yellOut = true;
                    }, 150);
                }
                if (!this.deathCheck && gameStillrunning) {
                    setTimeout(() => {
                        this.showEndScreen();
                        this.deathCheck = true;
                    }, 1500);
                }
            }
        }, 230);
    }


    showEndScreen() {
        this.winningSoundPlayer();
        stopGame();
        showEndScreenWin();
    }


    lastActionsEdboss() {
        sounds.endbossCrying.pause();
        this.playAnimation(ENDBOSS_DEAD);
    }

    lastSoundEndboss() {
        if (!audioMute) {
            sounds.endbosswasKilled.play();
        }
    }

    winningSoundPlayer() {
        if (!audioMute) {
            sounds.playerWins.play();
        }
    }


}


