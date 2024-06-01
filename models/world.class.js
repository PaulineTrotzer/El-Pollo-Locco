class World extends DrawableObject {
    level;
    canvas;
    ctx;
    sounds;
    keyboard;
    camera_x;//
    character;//
    healthbar;// 
    coinBar;//
    bottleBar;//
    endbossBar;//
    amountOfCoins;//
    amountOfBottles;//
    throwableObjects;//
    isThrowingBottle;//
    currentBottleHit;//
    endboss_entered;//
    timeTofight;//


    endboss;
    checkItemsandMusicInterval;
    checkEnemyCollisionsInterval;
    animateEndbossInterval;
    lookForDeadEnemiesInterval;
    intervalIds = [];


    constructor(canvas, sounds, keyboard) {
        super();
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.sounds = sounds;
        this.keyboard = keyboard;
        this.startWorld();
       // this.pushAll();
    }


    startWorld() {
        this.level = level1;
        this.character = new Character(this.world, this.camera_x);
        this.healthbar = new Healthbar();
        this.coinBar = new CoinBar();
        this.bottleBar = new BottleBar();
        this.endbossBar = new endbossHealthBar();
        this.camera_x = 0;
        this.amountOfCoins = 0;
        this.amountOfBottles = 0;
        this.throwableObjects = [];
        this.isThrowingBottle = false;
        this.currentBottleHit = false;
        this.endboss_entered = false;
        this.timeTofight = false;
        this.findEndboss();
        this.setWorld();
        this.draw();
        this.controlGame();
    }



    /* Test für Reload Funktion - Intervalle Clearen*/
    clearAll() {
        this.intervalIds.forEach(id => {
            clearInterval(id)
        });
        console.log('after clearing', this.intervalIds);
    }


    pushAll() {
        this.level.bottles.forEach(bottle => {
            this.intervalIds.push(bottle.animationOfBottles);
        });
        this.intervalIds.push(this.character.deathInterval);
        this.intervalIds.push(this.character.moveInterval);
        this.intervalIds.push(this.character.playAnimationsInterval);
        this.intervalIds.push(this.character.controlIdleInterval);
        this.intervalIds.push(this.character.stopIdleInterval);
        this.level.enemies.forEach(enemy => {
            if (enemy instanceof Chicken) {
                this.intervalIds.push(enemy.animateMoveLeft);
                this.intervalIds.push(enemy.animateWalkingInterval);
            }
        });
        this.level.clouds.forEach(cloud => {
            this.intervalIds.push(cloud.cloudInterval);
        });
        this.level.coins.forEach(coin => {
            this.intervalIds.push(coin.coinAnimation);
        });

        this.intervalIds.push(this.endboss.deathInterval);
        this.intervalIds.push(this.endboss.walkingInterval);
        this.level.enemies.forEach(enemy => {
            if (enemy instanceof littleChicken) {
                this.intervalIds.push(enemy.animateMoveLeft);
                this.intervalIds.push(enemy.hoppingChickenInterval);
                this.intervalIds.push(enemy.animateWalkingInterval);
            }
        });
        this.intervalIds.push(this.checkItemsandMusicInterval);
        this.intervalIds.push(this.checkEnemyCollisionsInterval);
        this.intervalIds.push(this.lookForDeadEnemiesInterval);
        console.log(this.intervalIds);
    }
    /* Ende Test Reload */


    findEndboss() {
        this.endboss = this.level.enemies.find(enemy => enemy instanceof Endboss);
    }



    setWorld() {
        this.character.world = this;
        this.bottleBar.world = this;
        this.coinBar.world = this;
        this.endbossBar.world = this;
    }



    controlGame() {
        this.checkItemsandMusicInterval = setInterval(() => {
            this.checkItemCollisions();
            this.checkForThrow();
            this.checkBackgroundMusic();
        }, 10);
        this.checkEnemyCollisionsInterval = setInterval(() => {
            this.checkEnemyCollisions();
        }, 50);
        this.animateEndbossInterval = setInterval(() => {
            this.animateEndboss();
        }, 450);
        this.lookForDeadEnemiesInterval = setInterval(() => {
            this.lookForDeadEnemies();
        }, 900);
    }



    checkEnemyCollisions() {
        this.checkEndbossDamage();
        this.checkGroundCollisions()
    }



    animateEndboss() {
        if (this.character.isNearby(this.endboss) && !this.endboss_entered) {
            this.animateIntroEndboss(this.endboss);
        } else
            if (this.endboss_entered && this.endboss.isHurt()) {
                this.endboss.makeCrying();
            }
    }


    animateIntroEndboss(endboss) {
        this.timeTofight = true;
        keyboard.letCharacterStop();
        this.endboss.alertAnimation();
        setTimeout(() => {
            this.endbossAnimationfinished(endboss);
        }, 6000);
    }


    endbossAnimationfinished() {
        this.endboss_entered = true;
        keyboard.letCharacterStart();
    }


    checkEndbossDamage() {
        if (this.endboss_entered) {
            if (this.endboss.isColliding(this.character)) {
                if (this.character.isAboveGround() && this.character.isFalling() && !this.character.isDead()) {
                    this.endbossLosingEnergy(3);
                }
            }
            this.throwableObjects.forEach(bottle => {
                if (this.endboss.isColliding(bottle) && !this.currentBottleHit) {
                    this.endbossLosingEnergy(10);
                    this.bottleMovement(bottle);
                    this.finishAttackPepe();
                }
            });
        }
    }



    endbossLosingEnergy(damage) {
        this.endboss.hit(damage);
        this.endbossBar.setHealthPercentage(this.endboss.energy);
        this.endboss.makeCrying();
    }



    bottleMovement(bottle) {
        bottle.stopGravity();
        bottle.stopFlyingBottle();
        bottle.isSplashing();
    }


    finishAttackPepe() {
        this.currentBottleHit = true;
    }


    lookForDeadEnemies() {
        this.level.enemies.forEach(enemy => {
            if (this.character.isColliding(enemy) && enemy.isNowDead) {
                this.letDisappear(this.level.enemies, enemy.id);
            }
        });
    }


    checkForThrow() {
        if (!this.isThrowingBottle && this.enoughBottlesToThrow()) {
            this.isThrowingBottle = true;
            this.currentBottleHit = false;
            this.createThrowableObject();
            this.decreaseAmountOfBottles();
        } else if (!keyboard.D) {
            this.isThrowingBottle = false;
        }
    }


    createThrowableObject() {
        let bottle = new ThrowableObject(this.character.x + 20, this.character.y + 100);
        this.throwableObjects.push(bottle);
    }


    enoughBottlesToThrow() {
        return keyboard.D && this.amountOfBottles > 0;
    }


    decreaseAmountOfBottles() {
        this.amountOfBottles -= 10;
        if (this.amountOfBottles <= 0) {
            this.amountOfBottles = 0;
        }
        this.bottleBar.setBottlePercentage(this.amountOfBottles);
    }


    checkGroundCollisions() {
        this.level.enemies.forEach(enemy => {
            if (this.character.isColliding(enemy)) {
                if (enemy instanceof Chicken || enemy instanceof littleChicken) {
                    this.character.stopSnoring();
                    this.character.checkDamage(enemy);
                } else if (enemy instanceof Endboss && !this.character.isAboveGround()) {
                    this.character.stopSnoring();
                    this.character.checkDamage(enemy);
                }
            }
        });
    }



    checkItemCollisions() {
        this.level.bottles.forEach(bottle => {
            if (this.character.isColliding(bottle)) {
                this.increaseAmountofBottles();
                this.letDisappear(this.level.bottles, bottle.id);
                this.sounds.playSound(this.sounds.bottlePickup_sound);
                this.bottleBar.increaseBottleBar(this.amountOfBottles);
            }
            this.level.coins.forEach(coin => {

                if (this.character.isColliding(coin)) {
                    this.increaseCoinStatus();
                    coin.letDisappear(this.level.coins, coin.id);
                    this.sounds.playSound(this.sounds.coinPickup_sound);
                    this.coinBar.setCoinPercentage(this.amountOfCoins);
                }
            });
        });
    }


    increaseCoinStatus() {
        this.amountOfCoins += 1.3;
        if (this.amountOfCoins >= 100) {
            this.amountOfCoins = 100;
        }
    }


    letDisappear(bottleArray, bottleID) {
        const collidingBottle = this.findCollidingObject(bottleArray, bottleID);
        this.removeFromArray(bottleArray, collidingBottle);
    }


    findCollidingObject(bottleArray, bottleID) {
        for (let i = 0; i < bottleArray.length; i++) {
            if (bottleArray[i].id == bottleID) {
                return i;
            }
        }
    }


    removeFromArray(bottleArray, collidingBottle) {
        bottleArray.splice(collidingBottle, 1);
    }


    increaseAmountofBottles() {
        this.amountOfBottles += 10;
        if (this.amountOfBottles >= 100) {
            this.amountOfBottles = 100;
        } else {
            return
        }
    }


    draw() {
        this.clearContent();
        this.stickPlayerView('right');

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addToMap(this.character);

        this.implementStatusBars();

        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);

        this.stickPlayerView('left');
        requestAnimationFrame(this.reDraw.bind(this));
    }


    reDraw() {
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }


    implementStatusBars() {
        this.stickStatusBars('left');
        this.addToMap(this.bottleBar);
        this.addToMap(this.healthbar);
        this.addToMap(this.coinBar);
        if (this.timeTofight) {
            this.addToMap(this.endbossBar);
        }
        this.stickStatusBars('right');
    }


    clearContent() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }


    stickPlayerView(direction) {
        if (direction == 'right') {
            this.ctx.translate(this.camera_x, 0);
        } else if (direction === 'left') {
            this.ctx.translate(-this.camera_x, 0);
        }

    }


    stickStatusBars(direction) {
        if (direction == 'left') {
            this.ctx.translate(-this.camera_x, 0);
        } else if (direction === 'right') {
            this.ctx.translate(this.camera_x, 0);
        }
    }


    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }


    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }


    checkBackgroundMusic() {
        this.sounds.playSound(this.sounds.background_music);
    }
} 