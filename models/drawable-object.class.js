class DrawableObject {
    y = 280;
    height = 150;
    width = 100;
    img;
    currentImage = 0;
    imageCache = []; 
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    };
    offset_displacement_x = 2;



    generateUniqueId() {
        return Date.now() + '_' + Math.random().toString(36).substr(2, 9); // Kombination aus Zeitstempel und Zufallszahl
    }


    setRandomX(startX) {
        let randomFactor = Math.floor(Math.random() * (7 - 2 + 1)) + 2;
        let randomDisplacement = randomFactor * 15; 
        let newX = startX + randomDisplacement; 
        return  newX;
    }


    draw(ctx) {
        try {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } catch (e) {
            console.warn('ERROR OCCURED', e);
            console.log('HERE IT IS', this.img.src);
        }

    }


    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }


    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof littleChicken || this instanceof Bottle) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }


    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


    loadImagetoCache(path) {
        let img = new Image();
        img.src = path;
        this.imageCache[path] = img;
    }


    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }


    showOneImage(image) {
        let path = image;
        this.img = this.imageCache[path];
    }


    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


}