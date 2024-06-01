class littleChicken extends MovableObject {
    y = 360;
    width = 80;
    height = 60;
    id;
    IMAGE_DEAD = ['img/3_enemies_chicken/chicken_small/2_dead/dead.png'];
    isNowDead = false;
    offset = {
        top: 0,
        bottom: 0,
        left: 10,
        right: 10
    }
    animateMoveLeft;
    animateWalkingInterval;
    acceleration = 2.5;
    speedY = 20;
    groundLevel = 360;
    hoppingChickenInterval;

    constructor(startX) {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(LITTLE_CHICKEN_WALKING);
        this.loadImagetoCache(this.IMAGE_DEAD);
        this.id = this.generateUniqueId();
        this.x = this.setRandomX(startX);
        this.speed = 1.75;
        this.animate();
        this.hoppingChickenMovement();
    }


    setRandomX(startX) {
        let randomFactor = Math.floor(Math.random() * (7 - 2 + 1)) + 2;//zufällige Zahl zwischen 2 und 7//
        let randomDisplacement = randomFactor * 15 + startX
        this.offset_displacement_x++;
        return randomDisplacement;
    }



    hoppingChickenMovement() {
        this.hoppingChickenInterval = setInterval(() => {
            this.applyGravity()
            if (this.y >= this.groundLevel && !this.isNowDead) {
                this.letChickenJump();
            }
        }, 1000 / 20);
    }


    applyGravity() {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
    }


    letChickenJump() {
        this.y = this.groundLevel;
        this.speedY = 15;
    }


    animate() {
        this.animateMoveLeft = setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
        this.animateWalkingInterval = setInterval(() => {
            this.playAnimation(LITTLE_CHICKEN_WALKING);
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
        sounds.playSound(sounds.lilChickKilled);
    }


}



