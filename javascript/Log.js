import { Paipery, Rocky, Siccorsy, starty, Img, HumanImg, Newround, score, answer, lose, win, count, ties, botpicks, times } from "./export.js";

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
let user1;
let user2;


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
        user2 = {
            input: "rock",
            weakness: "paper",
            strong: "siscors",
        }
        roll();
    }
    if (bot === 2) {
        botpicks.innerHTML = "paiper";
        botimages = ['Paiper.jpg'];
        user2 = {
            input: "paper",
            weakness: "siscors",
            strong: "rock",

        }
        roll();
    }
    if (bot === 3) {
        botpicks.innerHTML = "siccors";
        botimages = ['Siscors.jpg'];
        user2 = {
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
    user1 = {
        input: "rock",
        weakness: "paper",
        strong: "siscors",
        pic: 'Rock.jpg',
    }
}

function paiper() {
    human = 2;
    user1 = {
        input: "paper",
        weakness: "siscors",
        strong: "rock",
        pic: 'Paiper.jpg',
    }
}

function siccors() {
    human = 3;
    user1 = {
        input: "siscors",
        weakness: "rock",
        strong: "paper",
        pic: 'Siscors.jpg',
    }
}

//Decieds who wins or loses
function battle() {
    if (user1.input === user2.input) {
        answer.style.color = "black";
        answer.innerHTML = `Tie`;
        ties.play();
        tie();
        setTimeout(function() {
            game();
        }, 2000);
    }
    if (user1.input && (user2.input === user1.strong)) {
        answer.style.color = "green";
        answer.innerHTML = `Human Wins`;
        win.play();
        count.innerHTML += `X`;
        images = [user1.pic];
        humanRoll();
        point++;
        loop();
    }
    if (user1.input && (user2.input === user1.weakness)) {
        answer.style.color = "red";
        answer.innerHTML = `Human Lose`;
        lose.play();
        count.innerHTML += `O`;
        images = [user1.pic];
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