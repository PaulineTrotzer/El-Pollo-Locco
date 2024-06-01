class MovableObject extends DrawableObject {
    speed = 0.15
    otherDirection = false;
    speedY = 0; // um von 0 zu starten (keine Bewegung von der Y-Achse)//
    acceleration = 2.5; //wie schnell objekt beschleunigt wird//
    energy = 100;
    lastHit = 0;
    startJump;
    jumpDuration = 700;
    timepassed;


    applyGravity() {
        setInterval(() => {         // kann nicht < 150 werden, wenn der speed nicht positiv ist//
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY; // es wird + gerechnet -> Y erhöht sich, Objekt, d.h fällt//
                this.speedY -= this.acceleration;// Wert wird in this.speedY gespeichert und in der nächsten Zeile von Y abgezogen (also Y --speedY = + neuer Y-Wert).
            }
        }, 1000 / 35);
    }



    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 150;// wenn Y wert kleiner als 150 ist, dann fliegt der C in der Luft - returns value//
        }
    }


    isOnTheGround(){
        return this.y >= 355;
    }

    isFalling() {
        return this.speedY < 0;
    }


    stopGravity() {
        return this.speedY = 0;
    }


    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.top > mo.y + mo.offset.bottom &&
            mo.x + mo.width - mo.offset.right > this.x + this.offset.left &&
            mo.y + mo.height - mo.offset.top > this.y + this.offset.bottom;
    }

    isNearby(mo) {
        return this.x + this.width - 0 > mo.x - 400 &&
            this.y + this.height - 0 > mo.y + 0 &&
            mo.x + mo.width - 0 > this.x + -400 &&
            mo.y + mo.height - 0 > this.y + 0;
    }


    isDead() {
        return this.energy <= 0;
    }


    hit(x) {
        this.energy -= x;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    isHurt() {
        this.timepassed = new Date().getTime() - this.lastHit; // Difference in ms
        this.timepassed = this.timepassed / 1000; // Difference in s
        return this.timepassed < 1;
    }


    playAnimation(images) {
        let i = this.currentImage % images.length; // let i = 6 % 6 => 1, Rest 0
        // i = 0, 1, 2, 3, 4, 5 //
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    playJumpAnimation(images) {
        let currentTime = new Date().getTime();
        let elapsedTime = currentTime - this.startJump;
        let progress = elapsedTime / this.jumpDuration;
        let index = Math.floor(progress * images.length) % images.length;
        let imagePath = images[index];
        this.img = this.imageCache[imagePath]; // Setze das Bild entsprechend des Fortschritts des Sprungs
    }


    moveLeft() {
        this.x -= this.speed;
    }



    setRandomX(startX, minDistance) {
        let minDisplacement = startX + minDistance;;
        let fullDisplacement = minDisplacement + Math.random() * 500; // Zufällige Erhöhung im Bereich von minDistance bis 2 * minDistance
        return startX + fullDisplacement
    }


}