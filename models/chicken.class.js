class Chicken extends MovableObject {
    y = 360;
    width = 80;
    height = 60;
    id;
    IMAGE_DEAD = ['img/3_enemies_chicken/chicken_normal/2_dead/dead.png'];
    isNowDead = false;
    offset = {
        top: 10,
        bottom: 0,
        left: 20,
        right: 20
    }
    animateMoveLeft;
    animateWalkingInterval;


    constructor(startX) {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(CHICKEN_WALKING);
        this.loadImagetoCache(this.IMAGE_DEAD);
        this.id = this.generateUniqueId();
        this.x = this.setRandomX(startX)
        this.speed = 1.75;
        this.moveThroughWorld();
        this.animateMoving();
    }


    /**
     * moves the chicken through the world
     */
    moveThroughWorld() {
        this.animateMoveLeft = setInterval(() => this.moveLeft(), 1000 / 60);
    }


    moveLeft() {
        this.x -= this.speed;
    }


    /**
     * animates the movements through the world
     */
    animateMoving() {
        this.animateWalkingInterval = setInterval(() => this.playAnimation(CHICKEN_WALKING, 0), 100);
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
     * ends the movement of the chicken
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
        sounds.playSound(sounds.bigChickKilled);
    }
}