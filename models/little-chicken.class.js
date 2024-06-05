class littleChicken extends MovableObject {
    y = 360;
    width = 80;
    height = 60;
    id;
    x = 500;
    IMAGE_DEAD = ['img/3_enemies_chicken/chicken_small/2_dead/dead.png'];
    isNowDead = false;
    offset = {
        top: 0,
        bottom: 0,
        left: 20,
        right: 20
    }
    animateMoveLeft;
    animateWalkingInterval;
    acceleration = 2.5;
    speedY = 20;
    groundLevel = 360;


    constructor(startX) {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(LITTLE_CHICKEN_WALKING);
        this.loadImagetoCache(this.IMAGE_DEAD);
        this.id = this.generateUniqueId();
        this.x = this.setRandomX(startX);
        this.speed = 1.75;
        this.moveThroughWorld();
        this.hoppingChickenMovement();
    }


    /**
     * moves little chicken through the world
     */
    moveThroughWorld() {
        this.animateMoveLeft = setInterval(() => this.moveLeft(), 1000 / 60);
        this.animateWalkingInterval = setInterval(() => this.playAnimation(LITTLE_CHICKEN_WALKING), 100);
    }


    /**
     * animates a hopping chicken
     */
    hoppingChickenMovement() {
        setInterval(() => {
            this.applyGravity()
            if (this.isOvertheGround() && !this.isNowDead) {
                this.letChickenJump();
            }
        }, 1000 / 20);
    }


    /**
     * checks if little chicken is over the ground
     * @returns - boolean
     */
    isOvertheGround() {
        return this.y >= this.groundLevel;
    }



    /**
     * applies gravity to the jump
     */
    applyGravity() {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
    }


    /**
     * moves the little chicken up in the air by giving it speed
     */
    letChickenJump() {
        this.y = this.groundLevel;
        this.speedY = 15;
    }


    /**
     * shows the dying chicken
     */
    dies() {
        this.stopMoving();
        this.animateDead();
        this.playSoundofDeath()
    }


    /**
     * clears the moving intervals and makes the chicken stop
     */
    stopMoving() {
        clearInterval(this.animateMoveLeft);
        clearInterval(this.animateWalkingInterval);
    }


    /**
     * shows the picture of the dead chicken and indicates that it has died
     */
    animateDead() {
        if (!this.isNowDead) {
            this.isNowDead = true;
            this.showOneImage(this.IMAGE_DEAD);
        }
    }


    /**
     * plays the sound of death
     */
    playSoundofDeath() {
        sounds.playSound(sounds.lilChickKilled);
    }


}



