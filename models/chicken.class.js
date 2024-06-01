class Chicken extends MovableObject {
    y = 360;
    width = 80;
    height = 60;
    id;
    IMAGE_DEAD = ['img/3_enemies_chicken/chicken_normal/2_dead/dead.png'];
    isNowDead = false;
    offset = {
        top: 0,
        bottom: 0,
        left: 10,
        right: 10
    }
    animateMoveLeft;
    animateWalkingInterval;

    constructor(startX) {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(CHICKEN_WALKING);
        this.loadImagetoCache(this.IMAGE_DEAD);
        this.id = this.generateUniqueId();
        this.x = this.setRandomX(startX);
        this.speed = 2.75;
        this.moveThroughWorld();
        this.animate();
    }


    moveThroughWorld(){
        this.animateMoveLeft = setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }


    animate() {
        this.animateWalkingInterval = setInterval(() => {
            this.playAnimation(CHICKEN_WALKING, 0);
        }, 100);
    }



    dies() {
        this.stopMoving();
        this.animateDead();
        this.playSoundofDeath()
    }


    stopMoving() {
        clearInterval(this.animateMoveLeft);
        clearInterval(this.animateWalkingInterval);
    }


    animateDead() {
        if (!this.isNowDead) {
            this.isNowDead = true;
            this.showOneImage(this.IMAGE_DEAD);
        }
    }

    playSoundofDeath() {
        sounds.playSound(sounds.bigChickKilled);
    }



}