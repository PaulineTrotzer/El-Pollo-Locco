class World extends DrawableObject {
    level;
    canvas;
    ctx;
    sounds;
    keyboard;
    camera_x;
    character;
    healthbar;
    coinBar;
    bottleBar;
    endbossBar;
    amountOfCoins;
    amountOfBottles;
    throwableObjects = [];
    isThrowingBottle;
    currentBottleHit;
    endboss_entered;
    timeTofight;
    endboss;


    constructor(canvas, sounds, keyboard) {
        super();
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.sounds = sounds;
        this.keyboard = keyboard;
        this.startWorld();
    }


    /**
     * performs basic functions after creating the world class to start the world
     */
    startWorld() {
        this.setWorldStates();
        this.implementingObjects();
        this.findEndboss();
        this.setWorld();
        this.draw();
        this.controlGame();
    }


    /**
     * puts essential variables of the world into certain states, numerical ratios, declares them
     */
    setWorldStates() {
        this.level = level1;
        this.camera_x = 0;
        this.amountOfCoins = 0;
        this.amountOfBottles = 0;
        this.isThrowingBottle = false;
        this.currentBottleHit = false;
        this.endboss_entered = false;
        this.timeTofight = false;
    }


    /**
     * implements important base objects via creation of new classes
     */
    implementingObjects() {
        this.character = new Character();
        this.healthbar = new Healthbar();
        this.coinBar = new CoinBar();
        this.bottleBar = new BottleBar();
        this.endbossBar = new endbossHealthBar();
    }


    /**
     * the final boss is filtered from the enemy array
     */
    findEndboss() {
        this.endboss = this.level.enemies.find(enemy => enemy instanceof Endboss);
    }


    /**
     * it assigns the current world instance (`this`) to the `world` property of various game components. 
     */
    setWorld() {
        this.character.world = this;
        this.bottleBar.world = this;
        this.coinBar.world = this;
        this.endbossBar.world = this;
    }


    /**
     * this function starts several intervals that continuously perform various checks to control the basic logic of the world.
     */
    controlGame() {
        setInterval(() => {
            this.checkItemCollisions();
            this.checkForThrow();
            this.checkBackgroundMusic();
        }, 5);
        setInterval(() => this.checkLivingBeingCollisions(), 50);
        setInterval(() => this.behaviourAnimationBoss(), 450);
        setInterval(() => this.lookForDeadEnemies(), 900);
    }


    /**
     * 
    This function checks all types of collisions between living beings
     */
    checkLivingBeingCollisions() {
        this.checkEndbossCollision();
        this.checkGroundCollisions()
    }


    /**
     * decides on the animation of the final boss's behavior
     */
    behaviourAnimationBoss() {
        if (this.character.isNearby(this.endboss) && !this.endboss_entered) {
            this.animateIntroEndboss(this.endboss);
        } else
            if (this.endboss_entered && this.endboss.isHurt()) {
                this.endboss.animateEndbossInjuries();
            }
    }


    /**
     * controls the intro animation of the final boss
     * @param {object} endboss 
     */
    animateIntroEndboss(endboss) {
        this.timeTofight = true;
        keyboard.letCharacterStop();
        this.endboss.alertAnimation();
        setTimeout(() => {
            this.endbossAnimationfinished(endboss);
        }, 6000);
    }


    /**
     * ends the animation of the final boss
     */
    endbossAnimationfinished() {
        this.endboss_entered = true;
        keyboard.letCharacterStart();
    }


    /**
     * this function checks whether the endboss collides with a character or a bottle and calculates damage accordingly
     */
    checkEndbossCollision() {
        if (this.endboss_entered) {
            if (this.endboss.isColliding(this.character)) {
                if (this.character.isAboveGround() && this.character.isFalling() && !this.character.isDead()) {
                    this.endbossLosingEnergy(2);
                }
            }
            this.throwableObjects.forEach(bottle => {
                if (this.endboss.isColliding(bottle) && !this.currentBottleHit) {
                    this.endbossLosingEnergy(11);
                    this.bottleMovement(bottle);
                    this.finishAttackPepe();
                }
            });
        }
    }


    /**
     * animates the final boss when injured and controls its life bar
     * @param {integer} damage - damage points suffered by the final boss
     */
    endbossLosingEnergy(damage) {
        this.endboss.hit(damage);
        this.endbossBar.setHealthPercentage(this.endboss.energy);
        this.endboss.animateEndbossInjuries();
    }


    /**
     * controls the movement of the flying bottle through the world
     * @param {object} bottle - one bottle from bottle array
     */
    bottleMovement(bottle) {
        bottle.stopGravity();
        bottle.stopFlyingBottle();
        bottle.isSplashing();
    }


    /**
     * indicates when the character has finished his throw
     */
    finishAttackPepe() {
        this.currentBottleHit = true;
    }


    /**
     * 
     */
    checkForThrow() {
        if (!this.isThrowingBottle && this.enoughBottlesToThrow()) {
            this.setsTimingFactorsThrow();
            this.createThrowableObject();
            this.decreaseAmountOfBottles();
        } else if (this.character.noThrowingAction()) {
            this.isThrowingBottle = false;
        }
    }


    /**
     * controls the timing of the throw by giving flags
     */
    setsTimingFactorsThrow() {
        this.isThrowingBottle = true;
        this.currentBottleHit = false;
    }


    /**
     * creates a throwable object and adds it to the corresponding array
     */
    createThrowableObject() {
        let bottle = new ThrowableObject(this.character.x + 20, this.character.y + 100);
        this.throwableObjects.push(bottle);
    }


    /**
     * checks wether there are enough bottles to throwe
     * @returns -boolean
     */
    enoughBottlesToThrow() {
        return keyboard.D && this.amountOfBottles > 0;
    }


    /**
     * reduces the number of existing bottles and updates the bottle display
     */
    decreaseAmountOfBottles() {
        this.amountOfBottles -= 10;
        if (this.amountOfBottles <= 0) {
            this.amountOfBottles = 0;
        }
        this.bottleBar.setPercentage(this.amountOfBottles);
    }


    /**
     * this function checks which creature collides with the character and carries out further steps accordingly
     */
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


    /**
     * searches for dead enemies and makes them disappear after a while
     */
    lookForDeadEnemies() {
        this.level.enemies.forEach(enemy => {
            if (this.character.isColliding(enemy) && enemy.isNowDead) {
                this.letDisappear(this.level.enemies, enemy.id);
            }
        });
    }


    /**
     * checks the collisions of the character with two types of items and executes further steps accordingly
     */
    checkItemCollisions() {
        this.level.bottles.forEach(bottle => {
            if (this.character.isColliding(bottle)) {
                this.increaseAmountofBottles();
                this.letDisappear(this.level.bottles, bottle.id);
                this.sounds.playSound(this.sounds.bottlePickup_sound);
                this.bottleBar.setPercentage(this.amountOfBottles);
            }
        });
        this.level.coins.forEach(coin => {
            if (this.character.isColliding(coin)) {
                this.increaseCoinStatus();
                this.letDisappear(this.level.coins, coin.id);
                this.sounds.playSound(this.sounds.coinPickup_sound);
                this.coinBar.setPercentage(this.amountOfCoins);
            }
        });
    }


    /**
     * increases amount of coins
     */
    increaseCoinStatus() {
        this.amountOfCoins += 1.25;
        if (this.amountOfCoins >= 100) {
            this.amountOfCoins = 100;
        }
    }


    /**
     * increases amount of bottles
     */
    increaseAmountofBottles() {
        this.amountOfBottles += 10;
        if (this.amountOfBottles >= 100) {
            this.amountOfBottles = 100;
        }
    }


    /**
     * redraws the entire content of the game scene by adding various objects like on the map. 
     * the context is emptied and the context for drawing is moved (to the right), at the end the context is moved back to the left (redrawing)
     */
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


    /**
     * implements all statusbars within the world
     */
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


    /**
     * checks if the background music is turned on 
     */
    checkBackgroundMusic() {
        this.sounds.playSound(this.sounds.background_music);
    }

} 