class DrawableObject {
    y = 280;
    height = 150;
    width = 100;
    img;
    currentImage = 0;
    imageCache = [];


    /**
     * generates unique id for item elements
     * @returns - timestamp + random alphanumeric string
     */
    generateUniqueId() {
        return Date.now() + '_' + Math.random().toString(36).substr(2, 9); // Kombination aus Zeitstempel und Zufallszahl
    }


    /**
     * this function creates a randomly generated x coordinate
     * @param {coordinate} startX 
     * @returns - new (generated) coordinate
     */
    setRandomX(startX) {
        let randomFactor = Math.floor(Math.random() * (7 - 2 + 1)) + 2;
        let randomDisplacement = randomFactor * 15;
        let newX = startX + randomDisplacement;
        return newX;
    }


    /**
     * The draw function draws the image (this.img) onto the canvas rendering context (ctx) at pos. (this.x, this.y), (this.width), (this.height)
     * @param {reference to HTML5 Element} ctx 
     */
    draw(ctx) {
        try {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } catch (e) {
            console.warn('ERROR OCCURED', e);
            console.log('HERE IT IS', this.img.src);
        }
    }


    /**
     * this function uses `requestAnimationFrame` to call the `draw` method asynchronously and ensure that it is drawn in the next frame of the browser
     */
    reDraw() {
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }


    /**
     * adds multiple objects to the map (world)
     * @param {array} objects 
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }


    /**
     * adds a single object to the map and draws it, taking into account whether the object's image needs to be mirrored.
     * @param {object} mo 
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }


    /**
     * lets the character turn to the right (setting ctx)
     * @param {object} mo - a movable object
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }


    /**
     * lets the character turn to the left (setting ctx)
     * @param {object} mo - a movable object
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }


    /**
     * auxiliary function:draws a frame around the object if the object is an instance of a certain class.
     * @param {reference to HTML5 Element} ctx 
     */
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof littleChicken || this instanceof Bottle) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }


    /**
     * loads an image from a specified path and assigns it to the img property of the object.
     * @param {path} path 
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


    /**
     *  loads an image from a specified path and stores it in the object's imageCache.
     * @param {path} path 
     */
    loadImagetoCache(path) {
        let img = new Image();
        img.src = path;
        this.imageCache[path] = img;
    }


    /**
     * loads a list of images from the specified paths and saves them in the object's imageCache. 
     * @param {paths} imagePaths 
     */
    loadImages(imagePaths) {
        imagePaths.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }


    /**
     * displays a single image by loading the corresponding image from the object's imageCache.
     * @param {path} image 
     */
    showOneImage(image) {
        let path = image;
        this.img = this.imageCache[path];
    }


    /**
     * allows animating an object by iterating through a list of image paths.
     * @param {array} images 
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    /**
    * This function controls the determination of the colliding bottle and then passes it to the following function (removeFromArray).
    * @param {array}  - array with all existing bottles
    * @param {id} - individual ID in connection to array
    */
    letDisappear(array, id) {
        const collidingObject = this.findCollidingObject(array, id);
        this.removeFromArray(array, collidingObject);
    }


    /**
     * iterates through the an array and searches for the element with the matching id (colliding ID)
     * @param {array} 
     * @param {id} 
     * @returns - index of colliding object
     */
    findCollidingObject(array, id) {
        for (let i = 0; i < array.length; i++) {
            if (array[i].id == id) {
                return i;
            }
        }
    }


    /**
     * deletes the colliding object from the existing array of existing objects
     * @param  {array} 
     * @param {id} 
     */
    removeFromArray(array, collidingObject) {
        array.splice(collidingObject, 1);
    }


    /**
     * this function moves the context horizontally based on the excited direction passed in the variable direction.
     * @param {string} direction - left or right
     */
    stickPlayerView(direction) {
        if (direction == 'right') {
            this.ctx.translate(this.camera_x, 0);
        } else if (direction === 'left') {
            this.ctx.translate(-this.camera_x, 0);
        }
    }


    /**
     * sticking the status bars by manipulating the drawing ctx
     * @param {string} direction - left or right
     */
    stickStatusBars(direction) {
        if (direction == 'left') {
            this.ctx.translate(-this.camera_x, 0);
        } else if (direction === 'right') {
            this.ctx.translate(this.camera_x, 0);
        }
    }


    /**
     * clears existing conent to draw new conditions for the world
     */
    clearContent() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

}