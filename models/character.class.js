class Character extends MovableObject {
    height = 280;
    width = 140;
    x = 100;
    y = 150;
    speed = 10;
    waitingTime = 0;
    camera_offset_end = 200;
    offset = {
        top: 0,
        bottom: 20,
        left: 30,
        right: 30
    };
    idleInterval;
    hasJumped = false;
    world;
    deathCheck = false;
    deathInterval;
    moveInterval;
    playAnimationsInterval;
    controlIdleInterval;
    stopIdleInterval;
    world;
    camera_x;



    constructor() {
        super().loadImage('img/2_character_pepe/1_idle/idle/I-10.png');
        this.loadCharacterImages();
        this.applyGravity();
        this.moveCharacter();
        this.playAnimations();
        this.controlIdle();
        this.stopIdle();
        this.checkDeath();
    }

    loadCharacterImages() {
        this.loadImages(IMAGES_IDLE_SHORT);
        this.loadImages(IMAGES_IDLE_LONGTERM);
        this.loadImages(IMAGES_WALKING);
        this.loadImages(IMAGES_JUMPING);
        this.loadImages(IMAGES_HURT);
        this.loadImages(IMAGES_DEAD);
    }


    checkDeath() {
        this.deathInterval = setInterval(() => {
            if (this.isDead() && !this.deathCheck) {
                sounds.playSound(sounds.characterKilled);
                this.deathChecktrue = true;
                if (this.deathChecktrue && gameStillrunning) {
                    setTimeout(() => {
                        this.showEndScreen();
                    }, 600);
                }
            }
        }, 10);

    }


    showEndScreen() {
        sounds.playSound(sounds.playerLost);
        stopGame();
        showEndScreenFail();
    }


    moveCharacter() {
        this.moveInterval = setInterval(() => {
            if (this.isMovingRight()) {
                this.moveRight();
            }
            if (this.isMovingLeft()) {
                this.moveLeft();
            }
            if (this.isJumping() && !this.isAboveGround() && !this.hasJumped) {
                this.jump();
                this.stopSnoring();
                this.hasJumped = true;
            }
            if (this.isInactive && this.hasJumped) {
                this.resetJumping();
            }
            this.cameraMovementCheck();
        }, 1000 / 60);
    }


    resetJumping() {
        if (!this.isJumping() && this.hasJumped) {
            this.hasJumped = false;
        }
    }


    playAnimations() {
        this.playAnimationsInterval = setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(IMAGES_DEAD);
            } else if (this.isHurt()) {
                this.playAnimation(IMAGES_HURT);
                sounds.playSound(sounds.isHurt_sound);
            } else if (this.isAboveGround()) {
                this.playJumpAnimation(IMAGES_JUMPING, this.startJump);
            } else {
                if (keyboard.RIGHT || keyboard.LEFT) {
                    this.playAnimation(IMAGES_WALKING, 0);
                }
            }
        }, 1000 / 20);
    }


    controlIdle() {
        this.controlIdleInterval = setInterval(() => {
            this.startIdleAnimation();
        }, 700);
    }


    stopIdle() {
        this.stopIdleInterval = setInterval(() => {
            this.stopIdleAnimation();
        }, 35);
    }


    startIdleAnimation() {
        if (this.isInactive()) {
            this.animateIdle();
        }
    }


    stopIdleAnimation() {
        if (this.isActive()) {
            this.stopSnoring();
        }
    }


    animateIdle() {
        if (this.isWaitingshortTime()) {
            this.playAnimation(IMAGES_IDLE_SHORT);
            this.countWaitingTime();
        } else if (this.waitingTime >= 20) {
            this.playAnimation(IMAGES_IDLE_LONGTERM);
            this.playSnoringSound();
        }
    }


    isInactive() {
        return (
            !keyboard.D &&
            !keyboard.SPACE &&
            !keyboard.LEFT &&
            !keyboard.RIGHT &&
            !keyboard.UP &&
            !keyboard.DOWN
        );
    }

    isActive() {
        return (
            keyboard.D ||
            keyboard.SPACE ||
            keyboard.LEFT ||
            keyboard.RIGHT ||
            keyboard.UP ||
            keyboard.DOWN
        );
    }



    checkDamage(enemy) {
        if ((enemy instanceof littleChicken || enemy instanceof Chicken) &&
            this.isAboveGround() && this.isFalling() && !this.isDead()) {
            enemy.dies();
        }
        else if (enemy instanceof Endboss || !enemy.isNowDead) {
            this.losesEnergy();
        }
    }


    losesEnergy() {
        this.hit(13);
        this.world.healthbar.setHealthPercentage(this.energy);
    }


    isWaitingshortTime() {
        return this.waitingTime < 20;
    }


    countWaitingTime() {
        return this.waitingTime++;
    }


    playSnoringSound() {
        sounds.playSound(sounds.snoring_sound);
    }


    resetWaitingTime() {
        return this.waitingTime = 0;
    }


    isJumping() {
        return keyboard.SPACE;
    }


    jump() {
        this.controlJumpingSound();
        this.startJump = new Date().getTime();
        this.speedY = 30;
    }


    controlJumpingSound() {
        sounds.jumping_sound.currentTime = 0;
        sounds.playSound(sounds.jumping_sound);
    }


    isMovingLeft() {
        return keyboard.LEFT && this.x > 0;
    }


    moveLeft() {
        this.x -= this.speed;
        this.otherDirection = true;
        this.playWalkingSound();
    }


    isMovingRight() {
        return keyboard.RIGHT && this.x < this.world.level.level_end_x;
    }


    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
        this.playWalkingSound();
    }


    playWalkingSound() {
        sounds.playSound(sounds.walking_sound);
    }


    stopSnoring() {
        this.resetWaitingTime();
        sounds.snoring_sound.pause();
    }


    cameraMovementCheck() {
        if (this.levelIsnotOver) {
            this.followCharacterwithCamera();
        }
    }



    levelIsnotOver() {
        return this.x + this.camera_offset_end < 11500;
    }


    followCharacterwithCamera() {
        this.world.camera_x = -this.x + 100;
    }

}