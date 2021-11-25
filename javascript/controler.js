import {Paipery, Rocky, Siccorsy, starty, Img, HumanImg, Newround, score, answer, lose, win, count, ties, botpicks, times} from "./model.js";

export const gameLoader = () => {

// Variables
let botpoint = 0;
let point = 0;
let Timer;
let bot;
let images;
let botimages;
let imageDir = ".././Images/"
let imageDirbot = ".././Images/"
let delayInSeconds = 1;
let human;
let botClear;
let clear;
let player;
let botObj;


//event liseners
starty.addEventListener("click", start);
Rocky.addEventListener("click", rock);
Paipery.addEventListener("click", paiper);
Siccorsy.addEventListener("click", siccors);

//starts the game
function start() {
    botpoint = 0;
    point = 0;
    game();
    score.innerHTML = "";
    count.innerHTML = "";
    Newround.innerHTML = "";
    botimages = ['Rock.jpg', 'Paiper.jpg', 'Siscors.jpg'];
    images = ['Rock.jpg', 'Paiper.jpg', 'Siscors.jpg'];

}

//timer and game 
function game() {
    bot = Math.round(Math.random() * 2 + 1);
    console.log(bot);
    answer.style.color = "black";
    answer.innerHTML = ``;
    times.innerHTML = `3`;
    botpicks.innerHTML = ``;
    ties.pause();
    lose.pause();
    win.pause();
    human = 0;
    botimages = ['Rock.jpg', 'Paiper.jpg', 'Siscors.jpg'];
    images = ['Rock.jpg', 'Paiper.jpg', 'Siscors.jpg'];
    humanImg.style.animation = "humanImg 4s"
    img.style.animation = "img 4s"
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
            times.innerHTML = `3`;
        }
        if (timeleft == 1) {
            times.innerHTML = `2`;
        }
        if (timeleft == 0) {
            times.innerHTML = `1`;
        }
        if (timeleft == -1) {
            times.innerHTML = `View`;
        }

        if ((timeleft === 2 || timeleft === 1 || timeleft === 0) && human != 0) {
            answer.style.color = "red";
            answer.innerHTML = `Human Lose`;
            lose.play();
            count.innerHTML += `O`;
            times.innerHTML = `View`;
            random();
            stopper();
            human = 4;
            timeleft = -1;
            botpoint++;
            earlyLoop();
            humanImg.style.animation = ""
            img.style.animation = ""
            return;
        }


        if (timeleft === -1 && human != 4) {
            humanImg.style.animation = ""
            img.style.animation = ""
            random();
            if (timeleft === -1 && human != 0) {
                battle(human);
                return;
            }
            if (timeleft === -1 && human === 0) {
                if (human === 0) {
                    humanImg.style.animation = ""
                    img.style.animation = ""
                    answer.style.color = "red";
                    answer.innerHTML = `Human Lose`;
                    lose.play();
                    count.innerHTML += `O`;
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
        botpicks.innerHTML = "Rock";
        botimages = ['Rock.jpg'];
        botObj = {
            input: "rock",
            weakness: "paper",
            strong: "siscors",
        }
        roll();
    }
    if (bot === 2) {
        botpicks.innerHTML = "paiper";
        botimages = ['Paiper.jpg'];
        botObj = {
            input: "paper",
            weakness: "siscors",
            strong: "rock",

        }
        roll();
    }
    if (bot === 3) {
        botpicks.innerHTML = "siccors";
        botimages = ['Siscors.jpg'];
        botObj = {
            input: "siscors",
            weakness: "rock",
            strong: "paper",

        }
        roll();

    }

}

//The user choices
function rock() {
    human = 1;
    player = {
        input: "rock",
        weakness: "paper",
        strong: "siscors",
        pic: 'Rock.jpg',
    }
}

function paiper() {
    human = 2;
    player = {
        input: "paper",
        weakness: "siscors",
        strong: "rock",
        pic: 'Paiper.jpg',
    }
}

function siccors() {
    human = 3;
    player = {
        input: "siscors",
        weakness: "rock",
        strong: "paper",
        pic: 'Siscors.jpg',
    }
}

//Decieds who wins or loses
function battle() {
    if (player.input === botObj.input) {
        answer.style.color = "black";
        answer.innerHTML = `Tie`;
        humanImg.style.animation = ""
        img.style.animation = ""
        ties.play();
        tie();
        setTimeout(function() {
            game();
        }, 2000);
    }
    if (player.input && (botObj.input === player.strong)) {
        answer.style.color = "green";
        answer.innerHTML = `Human Wins`;
        win.play();
        count.innerHTML += `X`;
        images = [player.pic];
        humanRoll();
        point++;
        loop();
    }
    if (player.input && (botObj.input === player.weakness)) {
        answer.style.color = "red";
        answer.innerHTML = `Human Lose`;
        lose.play();
        count.innerHTML += `O`;
        images = [player.pic];
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
        score.innerHTML = "Human wins the game";
        Newround.innerHTML = "To play again press play!";


    }
    if (botpoint === 2) {
        score.innerHTML = "Human Loses the game";
        Newround.innerHTML = "To play again press play!";

    }
}

//Counts points if you pick to early
function earlyLoop() {
    if (botpoint === 2) {
        score.innerHTML = "Human Loses the game";
        Newround.innerHTML = "To play again press play!";
        return;
    }
    setTimeout(function() {
        game();
    }, 2000);
}

//Images bot cycler
function roll() {
    let botrotator = Img;
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
    let rotator = HumanImg
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
};

