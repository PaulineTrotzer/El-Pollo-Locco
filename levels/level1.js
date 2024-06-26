let level1;
level1init();

/**
 * various auxiliary functions are called to create following game objects
 * a new Level instance is assigned to the level1 variable (and all initialised objects).
 */
async function level1init() {
    const enemies = createEnemies();
    const clouds = createClouds();
    const bottles = createBottles();
    const coins = createCoins();
    const backgroundObjects = createBackgroundObjects();
    level1 = new Level(enemies, clouds, bottles, coins, backgroundObjects);
}


/**
 * creates all enemies
 * @returns - an array with all enemies
 */
function createEnemies() {
    return [new Chicken(2500), new Chicken(3500), new Chicken(3900), new Chicken(4250), new Chicken(4500),
    new Chicken(5550), new Chicken(6000), new Chicken(6500), new Chicken(7000), new Chicken(7500),
    new Chicken(7800), new Chicken(8000), new Chicken(8250), new Chicken(8500), new Chicken(8900),
    new Chicken(9000), new Chicken(9550), new Chicken(10000), new Chicken(11000),
    new Chicken(12000), new Chicken(13000), new Chicken(14500), new Chicken(97500),
    new littleChicken(4000), new littleChicken(5000), new littleChicken(6000), new littleChicken(7000),
    new littleChicken(8000), new littleChicken(9400), new littleChicken(9800), new littleChicken(10200),
    new littleChicken(10700), new littleChicken(10000), new littleChicken(11000), new littleChicken(11300),
    new littleChicken(11650), new littleChicken(11700), new littleChicken(12000), new littleChicken(12250),
    new littleChicken(12500), new littleChicken(12700),
    new littleChicken(12800), new littleChicken(12900), new littleChicken(13000), new littleChicken(13700),
    new littleChicken(14000), new littleChicken(14400),
    new Endboss(11500),
    ];
}


/**
 * creates all Clouds
 * @returns - an array with all clouds
 */
function createClouds() {
    return [
        new Cloud(200, 5), new Cloud(600, 5), new Cloud(1000, 3),
        new Cloud(1400, 1), new Cloud(2000, 1), new Cloud(2500, 1),
        new Cloud(2900, 1), new Cloud(3500, 1),
        new Cloud(4000, 1), new Cloud(4400, 1),
        new Cloud(4800, 1), new Cloud(5300, 1),
        new Cloud(6000, 1), new Cloud(6500, 1),
        new Cloud(7000, 1), new Cloud(7400, 1)
    ];
}


/**
 * creates all Bottles
 * @returns - an array with all bottles
 */
function createBottles() {
    return [new Bottle(500), new Bottle(1000),
    new Bottle(1800), new Bottle(3000), new Bottle(5000), new Bottle(6000),
    new Bottle(7500), new Bottle(8000), new Bottle(9000), new Bottle(9500)
    ];
}


/**
 * creates all Coins
 * @returns - an array with all coins
 */
function createCoins() {
    return [
        new Coin(450, 91), new Coin(800, 57),
        new Coin(1000, 150), new Coin(1150, 210), new Coin(1300, 200),
        new Coin(1500, 25), new Coin(1600, 120), new Coin(1850, 168),
        new Coin(1900, 270), new Coin(1950, 274), new Coin(2250, 90),
        new Coin(2300, 106), new Coin(2550, 300), new Coin(2700, 77),
        new Coin(2900, 250), new Coin(3000, 192), new Coin(3150, 140),
        new Coin(3200, 75), new Coin(3500, 160), new Coin(3550, 36),
        new Coin(3900, 211), new Coin(4000, 215), new Coin(4350, 188),
        new Coin(4650, 53), new Coin(4750, 52), new Coin(4850, 250),
        new Coin(5100, 286), new Coin(5200, 180), new Coin(5250, 123),
        new Coin(5450, 111), new Coin(5550, 90), new Coin(5800, 214),
        new Coin(5900, 230), new Coin(5950, 290), new Coin(6150, 267),
        new Coin(6250, 70), new Coin(6500, 23), new Coin(6600, 200),
        new Coin(6750, 186), new Coin(6850, 172), new Coin(6950, 160),
        new Coin(7200, 298), new Coin(7300, 110), new Coin(7350, 88),
        new Coin(7550, 104), new Coin(7650, 80), new Coin(7900, 61),
        new Coin(8000, 50), new Coin(8150, 275), new Coin(8250, 245),
        new Coin(8350, 210), new Coin(8600, 131), new Coin(8700, 100),
        new Coin(8950, 285), new Coin(9050, 198), new Coin(9050, 220),
        new Coin(9200, 72), new Coin(9375, 185), new Coin(9600, 211),
        new Coin(9650, 198), new Coin(9700, 245), new Coin(10000, 121),
        new Coin(10200, 198), new Coin(10700, 245), new Coin(10900, 121)
    ];
}


/**
 * creates all background objects
 * @returns - an array with all background objects
 */
function createBackgroundObjects() {
    return [
        new BackgroundObject('img/5_background/layers/air.png', -719),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', -719),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', -719),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', -719),
        new BackgroundObject('img/5_background/layers/air.png', 0),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 0),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 0),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 0),

        new BackgroundObject('img/5_background/layers/air.png', 719),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719),
        new BackgroundObject('img/5_background/layers/air.png', 719 * 2),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 2),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 2),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 2),

        new BackgroundObject('img/5_background/layers/air.png', 719 * 3),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 3),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 3),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 3),
        new BackgroundObject('img/5_background/layers/air.png', 719 * 4),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 4),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 4),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 4),

        new BackgroundObject('img/5_background/layers/air.png', 719 * 5),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 5),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 5),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 5),
        new BackgroundObject('img/5_background/layers/air.png', 719 * 6),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 6),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 6),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 6),

        new BackgroundObject('img/5_background/layers/air.png', 719 * 7),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 7),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 7),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 7),
        new BackgroundObject('img/5_background/layers/air.png', 719 * 8),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 8),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 8),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 8),

        new BackgroundObject('img/5_background/layers/air.png', 719 * 9),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 9),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 9),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 9),
        new BackgroundObject('img/5_background/layers/air.png', 719 * 10),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 10),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 10),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 10),

        new BackgroundObject('img/5_background/layers/air.png', 719 * 11),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 11),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 11),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 11),
        new BackgroundObject('img/5_background/layers/air.png', 719 * 12),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 12),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 12),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 12),

        new BackgroundObject('img/5_background/layers/air.png', 719 * 13),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 13),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 13),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 13),
        new BackgroundObject('img/5_background/layers/air.png', 719 * 14),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 14),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 14),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 14),

        new BackgroundObject('img/5_background/layers/air.png', 719 * 15),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 15),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 15),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 15),
        new BackgroundObject('img/5_background/layers/air.png', 719 * 16),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 16),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 16),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 16),
    ];
}




