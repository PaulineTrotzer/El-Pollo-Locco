class MovableObject extends DrawableObject {
    speed = 0.15
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;


    /**
     * determines a randomly generated x-coordinate
     * @param {integer} startX - preset x-coordinate of an object
     * @returns - new x-coordinate
     */
    setRandomX(startX) {
        let randomFactor = Math.floor(Math.random() * (7 - 2 + 1)) + 2;
        let randomDisplacement = randomFactor * 15;
        let newX = startX + randomDisplacement;
        return newX;
    }


    /**
     * applies gravity to an object when it is in the air
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 35);
    }


    /**
     * checks if the selected object belongs to the class ThrowableObject, or whether it is the character that is above the ground
     * @returns - boolean
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 150;
        }
    }


    /**
     * checks if the selected object is on the ground
     * @returns - boolean
     */
    isOnTheGround() {
        return this.y >= 355;
    }


    /**
     * checks wether the selected object is falling
     * @returns - boolean
     */
    isFalling() {
        return this.speedY < 0;
    }


    /**
     * stops the gravity
     */
    stopGravity() {
        this.speedY = 0;
    }


    /**
     * checks whether two objects collide by comparing their positions and dimensions (offsets, width, height)
     * @param {object} mo 
     * @returns - boolean
     */
    isColliding(mo) {
        let thisLeft = this.x + this.offset.left;
        let thisRight = this.x + this.width - this.offset.right;
        let thisTop = this.y + this.offset.top;
        let thisBottom = this.y + this.height - this.offset.bottom;

        let moLeft = mo.x + mo.offset.left;
        let moRight = mo.x + mo.width - mo.offset.right;
        let moTop = mo.y + mo.offset.top;
        let moBottom = mo.y + mo.height - mo.offset.bottom;

        return thisRight > moLeft &&
            thisBottom > moTop &&
            moRight > thisLeft &&
            moBottom > thisTop;
    }


    /**
     * checks if two objects are nearby each other
     * @param {object} mo 
     * @returns - boolean
     */
    isNearby(mo) {
        return this.x + this.width - 0 > mo.x - 400 &&
            this.y + this.height - 0 > mo.y + 0 &&
            mo.x + mo.width - 0 > this.x + -400 &&
            mo.y + mo.height - 0 > this.y + 0;
    }


    /**
     * checks if the selected object is dead
     * @returns - boolean
     */
    isDead() {
        return this.energy <= 0;
    }


    /**
     * This function reduces the energy of an object by the value x by saving the time of the hit
     * @param {integer} x - damage as number
     */
    hit(x) {
        this.energy -= x;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    /**
     * checks if the object was hit within the last second by calculating the time since the last hit 
     * @returns 
     */
    isHurt() {
        this.timepassed = new Date().getTime() - this.lastHit;
        this.timepassed = this.timepassed / 1000;
        return this.timepassed < 1;
    }


    /**
     * controls the animation of the jump process by calculating time and selecting the appropriate img
     * @param {array} images 
     */
    playJumpAnimation(images) {
        let currentTime = new Date().getTime();
        let elapsedTime = currentTime - this.startJump;
        let progress = elapsedTime / this.jumpDuration;
        let index = Math.floor(progress * images.length) % images.length;
        let imagePath = images[index];
        this.img = this.imageCache[imagePath];
    }


    /**
     *  moves the character on the x-axis to the left side
     */
    moveLeft() {
        this.x -= this.speed;
    }


}