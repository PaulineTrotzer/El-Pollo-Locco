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
        bottom: 0,
        left: 20,
        right: 20
    };
    startJump;
    jumpDuration = 700;
    timepassed;
    idleInterval;
    hasJumped = false;
    deathAlreadychecked = false;
    deathInterval;


    constructor() {
        super().loadImage('img/2_character_pepe/1_idle/idle/I-10.png');
        this.loadCharacterImages();
        this.applyGravity();
        this.moveCharacter();
        this.playAnimations();
        this.runIdle();
        this.checkDeath();
    }


    /**
     * loads all character images
     */
    loadCharacterImages() {
        this.loadImages(IMAGES_IDLE_SHORT);
        this.loadImages(IMAGES_IDLE_LONGTERM);
        this.loadImages(IMAGES_WALKING);
        this.loadImages(IMAGES_JUMPING);
        this.loadImages(IMAGES_HURT);
        this.loadImages(IMAGES_DEAD);
    }


    /**
     * checks whether the character has died and carries out further steps if feedback is positive
     */
    checkDeath() {
        this.deathInterval = setInterval(() => {
            if (this.isDead() && this.deathWasNotAlreadyConfirmed()) {
                sounds.playSound(sounds.characterKilled);
                this.deathWasAlreadyConfirmed();
                if (this.deathWasAlreadyConfirmed && gameStillrunning) {
                    setTimeout(() => {
                        this.showEndScreenAnimation();
                    }, 600);
                }
            }
        }, 10);
    }


    /**
     * checks whether the logic for the characters death has already been executed
     * @returns - boolean
     */
    deathWasNotAlreadyConfirmed() {
        return !this.deathAlreadychecked
    }


    /**
     * sends confirmation that the function has already been purchased
     */
    deathWasAlreadyConfirmed() {
        this.deathAlreadychecked = true;
    }


    /**
     * displays the end screen and animates the game end accordingly
     */
    showEndScreenAnimation() {
        sounds.playSound(sounds.playerLost);
        stopGame();
        showEndScreenFail();
    }


    /**
     * controls the character's movements
     */
    moveCharacter() {
        setInterval(() => {
            if (this.isMovingRight()) {
                this.moveRight();
            }
            if (this.isMovingLeft()) {
                this.moveLeft();
            }
            if (this.isJumping() && !this.isAboveGround() && !this.hasJumped) {
                this.jump();
                this.stopSnoring();
                this.resetWaitingTime();
                this.hasJumped = true;
            }
            if (this.isInactive && this.hasJumped) {
                this.resetJumping();
            }
            this.cameraMovementCheck();
        }, 1000 / 60);
    }


    /**
     * resets the flag for jumping
     */
    resetJumping() {
        if (!this.isJumping() && this.hasJumped) {
            this.hasJumped = false;
        }
    }


    /**
     * plays the characters animations according to its movement
     */
    playAnimations() {
        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(IMAGES_DEAD);
            } else if (this.isHurt()) {
                this.playAnimation(IMAGES_HURT);
                sounds.playSound(sounds.isHurt_sound);
            } else if (this.isAboveGround()) {
                this.playJumpAnimation(IMAGES_JUMPING, this.startJump);
            } else {
                if (this.isMovingRight() || this.isMovingLeft()) {
                    this.playAnimation(IMAGES_WALKING, 0);
                }
            }
        }, 1000 / 20);
    }


    /**
     * runs the checkIdle animation 
     */
    runIdle() {
        setInterval(() => this.proofIfCharacterIsInactive(), 700);
        setInterval(() => this.stopIdleAnimations(), 35);
    }



    /**
     * checks whether the character is inactive and calls an animation in this case
     */
    proofIfCharacterIsInactive() {
        if (this.isInactive()) {
            this.animateIdle();
        } else if (!this.isInactive) {
            this.stopIdleAnimations();
        }
    }


    /**
     * decides whether the character waits long or short and calls up animations/sounds accordingly
     */
    animateIdle() {
        if (this.isWaitingshortTime()) {
            this.playAnimation(IMAGES_IDLE_SHORT);
            this.countWaitingTime();
        } else if (this.isWaitingLongTerm()) {
            this.playAnimation(IMAGES_IDLE_LONGTERM);
            this.playSnoringSound();
        }
    }


    /**
     * condition checks whether character waits long time
     * @returns - boolean
     */
    isWaitingLongTerm() {
        return this.waitingTime >= 15;
    }


    /**
     * stops the idle animation and the snoring
     */
    stopIdleAnimations() {
        if (!this.isInactive()) {
            this.stopSnoring();
            this.resetWaitingTime();
        }
    }


    /**
     * condition checks whether character is acting
     * @returns - boolean 
     */
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


    /**
     * checks whether the character or the enemy suffers damage in a collision
     * @param {element} enemy - single enemy from array 'enemies'
     */
    checkDamage(enemy) {
        if ((enemy instanceof littleChicken || enemy instanceof Chicken) &&
            this.characterFallsBackToTheGround() && !this.isDead()) {
            enemy.dies();
        }
        else if (enemy instanceof Endboss || !enemy.isNowDead) {
            this.losesEnergy(13);
        }
    }


    /**
     * checks whether the character falls down
     * @returns - boolean
     */
    characterFallsBackToTheGround() {
        return this.isAboveGround() && this.isFalling();
    }


    /**
     * 
     */
    losesEnergy(damage) {
        this.hit(damage);
        this.world.healthbar.setHealthPercentage(this.energy);
    }


    /**
     * checks wether character is waiting short time
     * @returns - boolean
     */
    isWaitingshortTime() {
        return this.waitingTime < 15;
    }


    /**
     *  this function increases the waiting time
     */
    countWaitingTime() {
        this.waitingTime++;
    }


    /**
     * this function plays the snoring sound
     */
    playSnoringSound() {
        sounds.playSound(sounds.snoring_sound);
    }


    /**
     * resets the waiting time of the character
     */
    resetWaitingTime() {
        this.waitingTime = 0;
    }


    /**
     * checks wether character is jumping
     * @returns - boolean
     */
    isJumping() {
        return keyboard.SPACE;
    }


    /**
     * executes the jumping process
     */
    jump() {
        this.controlJumpingSound();
        this.startJump = new Date().getTime();
        this.speedY = 30;
    }


    /**
     * controls the jumping sound
     */
    controlJumpingSound() {
        sounds.jumping_sound.currentTime = 0;
        sounds.playSound(sounds.jumping_sound);
    }


    /**
     * checks wether character is moving left side
     * @returns - boolean
     */
    isMovingLeft() {
        return keyboard.LEFT && this.x > 0;
    }


    /**
     * moves the character on the x-axis to the left side
     */
    moveLeft() {
        this.x -= this.speed;
        this.otherDirection = true;
        this.playWalkingSound();
    }

    /**
     * checks wether character is moving left side
     * @returns - boolean
     */
    isMovingRight() {
        return keyboard.RIGHT && this.x < this.world.level.level_end_x;
    }


    /**
     * moves the character on the x-axis to the right side
     */
    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
        this.playWalkingSound();
    }


    /**
     * plays the characters walking sound
     */
    playWalkingSound() {
        sounds.playSound(sounds.walking_sound);
    }


    /**
     * stops the characters snoring sound
     */
    stopSnoring() {
        sounds.snoring_sound.pause();
    }


    /**
     * checks whether the character is still walking through the level and executes further logic
     */
    cameraMovementCheck() {
        if (this.levelIsnotOver) {
            this.followCharacterwithCamera();
        }
    }


    /**
     * condition wether character is still walking through the level
     * @returns - boolean
     */
    levelIsnotOver() {
        return this.x + this.camera_offset_end < 11500;
    }


    /**
     * checks wether the character wants to throw
     * @returns - boolean
     */
    noThrowingAction() {
        return !keyboard.D;
    }

    
    /**
     * lets the camera move with the character
     */
    followCharacterwithCamera() {
        this.world.camera_x = -this.x + 100;
    }

}