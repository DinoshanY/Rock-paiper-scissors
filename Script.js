// Variables
let botpoint = 0;
let point = 0;
let Timer;
let bot;
let images;
let botimages;
let imageDir = "./Images/"
let imageDirbot = "./Images/"
let delayInSeconds = 1;

//starts the game
function start() {
    botpoint = 0;
    point = 0;
    game();
    document.getElementById("score").innerHTML = "";
    document.getElementById("count").innerHTML = "";
    document.getElementById("newRound").innerHTML = "";
    botimages = ['Rock.jpg', 'Paiper.jpg', 'Siscors.jpg'];
    images = ['Rock.jpg', 'Paiper.jpg', 'Siscors.jpg'];

}

//timer and game 
function game() {
    bot = Math.round(Math.random() * 2 + 1);
    console.log(bot);
    document.getElementById("Answer").innerHTML = ``;
    document.getElementById("time").innerHTML = `3`;
    document.getElementById("Bot-Pick").innerHTML = ``;
    document.getElementById("Tie").pause();
    document.getElementById("Lose").pause();
    document.getElementById("Win").pause();
    human = 0;
    botimages = ['Rock.jpg', 'Paiper.jpg', 'Siscors.jpg'];
    images = ['Rock.jpg', 'Paiper.jpg', 'Siscors.jpg'];
    roll();
    humanRoll();


    let timeleft = 3;
    Timer = setInterval(function() {
        if (timeleft <= 0) {
            clearInterval(Timer);
        }
        document.getElementById("progressBar").value = 3 - timeleft;
        timeleft--;

        if (timeleft == 2) {
            document.getElementById("time").innerHTML = `3`;
        }
        if (timeleft == 1) {
            document.getElementById("time").innerHTML = `2`;
        }
        if (timeleft == 0) {
            document.getElementById("time").innerHTML = `1`;
        }
        if (timeleft == -1) {
            document.getElementById("time").innerHTML = `View`;
        }

        if ((timeleft === 2 || timeleft === 1 || timeleft === 0) && human != 0) {
            document.getElementById("Answer").innerHTML = `Human Lose`;
            document.getElementById("Lose").play();
            document.getElementById("count").innerHTML += `O`;
            document.getElementById("time").innerHTML = `View`;
            random();
            stopper();
            human = 4;
            timeleft = -1;
            botpoint++;
            earlyLoop();
            return;
        }


        if (timeleft === -1 && human != 4) {
            random();
            if (timeleft === -1 && human != 0) {
                battle(human);
                return;
            }
            if (timeleft === -1 && human === 0) {
                if (human === 0) {
                    document.getElementById("Answer").innerHTML = `Human Lose`;
                    document.getElementById("Lose").play();
                    document.getElementById("count").innerHTML += `O`;
                    botpoint++;
                    stopper();
                    loop();
                }
            }
        }


    }, 1000);
}

//The bot choices
function random() {
    if (bot === 1) {
        document.getElementById("Bot-Pick").innerHTML = "Rock";
        botimages = ['Rock.jpg'];
        roll();
    }
    if (bot === 2) {
        document.getElementById("Bot-Pick").innerHTML = "paiper";
        botimages = ['Paiper.jpg'];
        roll();
    }
    if (bot === 3) {
        document.getElementById("Bot-Pick").innerHTML = "siccors";
        botimages = ['Siscors.jpg'];
        roll();

    }

}

//The user choices
function rock() {
    human = 1;
}

function paiper() {
    human = 2;
}

function siccors() {
    human = 3;
}

//Decieds who wins or loses
function battle(human) {
    if (bot === human) {

        document.getElementById("Answer").innerHTML = `Tie`;
        document.getElementById("Tie").play();
        tie();
        setTimeout(function() {
            game();
        }, 2000);
    }
    if (human === 2 && bot === 1) {

        document.getElementById("Answer").innerHTML = `Human Wins`;
        document.getElementById("Win").play();
        document.getElementById("count").innerHTML += `X`;
        images = ['Paiper.jpg'];
        humanRoll();
        point++;
        loop();
    }
    if (human === 3 && bot === 1) {

        document.getElementById("Answer").innerHTML = `Human Lose`;
        document.getElementById("Lose").play();
        document.getElementById("count").innerHTML += `O`;
        images = ['Siscors.jpg'];
        humanRoll();
        botpoint++;
        loop();
    }
    if (human === 3 && bot === 2) {

        document.getElementById("Answer").innerHTML = `Human Wins`;
        document.getElementById("Win").play();
        document.getElementById("count").innerHTML += `X`;
        images = ['Siscors.jpg'];
        humanRoll();
        point++;
        loop();
    }
    if (human === 1 && bot === 2) {

        document.getElementById("Answer").innerHTML = `Human Lose`;
        document.getElementById("Lose").play();
        document.getElementById("count").innerHTML += `O`;
        images = ['Rock.jpg'];
        humanRoll();
        botpoint++;
        loop();
    }
    if (human === 1 && bot === 3) {

        document.getElementById("Answer").innerHTML = `Human Wins`;
        document.getElementById("Win").play();
        document.getElementById("count").innerHTML += `X`;
        images = ['Rock.jpg'];
        humanRoll();
        point++;
        loop();
    }
    if (human === 2 && bot === 3) {

        document.getElementById("Answer").innerHTML = `Human Lose`;
        document.getElementById("Lose").play();
        document.getElementById("count").innerHTML += `O`;
        images = ['Paiper.jpg'];
        humanRoll();
        botpoint++;
        loop();
    }
}

//count points
function loop() {
    if (point === 1 && botpoint === 0 || point === 0 && botpoint === 1 || point === 1 && botpoint === 1) {
        setTimeout(function() {
            game();
        }, 2000);
    }
    if (point === 2) {
        document.getElementById("score").innerHTML = "Human wins the game";
        document.getElementById("newRound").innerHTML = "To play again press play!";


    }
    if (botpoint === 2) {
        document.getElementById("score").innerHTML = "Human Loses the game";
        document.getElementById("newRound").innerHTML = "To play again press play!";

    }
}

//Counts points if you pick to early
function earlyLoop() {
    if (botpoint === 2) {
        document.getElementById("score").innerHTML = "Human Loses the game";
        document.getElementById("newRound").innerHTML = "To play again press play!";
        return;
    }
    setTimeout(function() {
        game();
    }, 2000);
}

//Images bot cycler
function roll() {
    let botrotator = document.getElementById('img');
    if (botimages.length === 3) {
        let num = 0;
        let changeImage = function() {
            let len = botimages.length;
            botrotator.src = imageDirbot + botimages[num++];
            if (num == len) {
                num = 0;
            }
        };
        botClear = setInterval(changeImage, delayInSeconds * 250);
    } else {
        clearInterval(botClear)
        botrotator.src = imageDirbot + botimages[0];
    }
};

//Images human cycler
function humanRoll() {
    let rotator = document.getElementById('humanImg');
    if (images.length === 3) {
        let num = 0;
        let changeImage = function() {
            let len = images.length;
            rotator.src = imageDir + images[num++];
            if (num == len) {
                num = 0;
            }
        };
        clear = setInterval(changeImage, delayInSeconds * 250);
    } else {
        clearInterval(clear)
        rotator.src = imageDir + images[0];
    }
};

//If user picks to early or to late it changes the images to the correct loss
function stopper() {
    if (bot === 1) {
        images = ['Siscors.jpg'];
        humanRoll();
    }
    if (bot === 2) {
        images = ['Rock.jpg'];
        humanRoll();
    }
    if (bot === 3) {
        images = ['Paiper.jpg'];
        humanRoll();
    }
}

//both images are the same
function tie() {
    if (bot === 1) {
        images = ['Rock.jpg'];
        humanRoll();
    }
    if (bot === 2) {
        images = ['Paiper.jpg'];
        humanRoll();
    }
    if (bot === 3) {
        images = ['Siscors.jpg'];
        humanRoll();
    }
}