class ThrowableObject extends MovableObject {
    speedY = 30;
    flyingBottleInterval;
    isSplashingInterval;
    currentImageIndex = 0;
    offset = {
        top: 80,
        bottom: 80,
        left: 60,
        right: 60
    };
    id;

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png')
        this.loadImages(BOTTLE_ROTATING);
        this.loadImages(BOTTLE_SPLASH);
        this.x = x;
        this.y = y;
        this.width = 60;
        this.height = 70;
        this.id = this.generateUniqueId();
        this.applyGravity();
        this.throw();
    }


    /**
     * shows a flying bottle 
     */
    throw() {
        this.flyingBottleInterval = setInterval(() => {
            this.moveBottleForward();
            this.playAnimation(BOTTLE_ROTATING)
        }, 50);
    }


    /**
     * checks wether the animation is over
     * @returns - boolean
     */
    AnimationisOver() {
        return !this.currentImage % BOTTLE_SPLASH.length;
    }


    isSplashing() {
        this.isSplashingInterval = setInterval(() => {
            this.playAnimation(BOTTLE_SPLASH);
            this.currentImageIndex++;
            if (this.AnimationisOver()) {
                this.stopFlyingBottle();
            }
        }, 48);
    }


    /**
     * stops the flying animation
     */
    stopFlyingBottle() {
        clearInterval(this.flyingBottleInterval);
    }


    /**
     * this function is responsible for the forward movement of the bottle
     */
    moveBottleForward() {
        this.x += 20;
        if (this.isOnTheGround()) {
            this.bottleOnGroundSplash();
        }
    }


    /**
     * this function causes the bottle to shatter on the floor
     */
    bottleOnGroundSplash() {
        this.stopGravity();
        this.stopFlyingBottle();
        this.isSplashing();
    }

}
