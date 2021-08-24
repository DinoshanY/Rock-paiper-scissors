function start() {
    let timeleft = 3;
    let Timer = setInterval(function() {
        if (timeleft <= 0) {
            clearInterval(Timer);
        }
        document.getElementById("progressBar").value = 3 - timeleft;
        timeleft--;


        if ((timeleft === 1 || timeleft === 0) && human) {
            document.getElementById("Answer").innerHTML = `Human Lose`;
            timeleft = 0;
        }


        if (timeleft === -1) {
            if (timeleft === -1 && human) {
                random();
                battle(human);
            }
            if (timeleft === -1 || human) {
                random();
                if (human === null) {
                    console.log("Lose");
                    document.getElementById("Answer").innerHTML = `Human Lose`;
                }
            }
        }


    }, 1000);
}


let bot = Math.round(Math.random() * 2 + 1);
console.log(bot);
let human = null;


function random() {
    if (bot === 1) {
        document.getElementById("Bot-Pick").innerHTML = `Rock`;
    }
    if (bot === 2) {
        document.getElementById("Bot-Pick").innerHTML = `Paiper`;
    }
    if (bot === 3) {
        document.getElementById("Bot-Pick").innerHTML = `Siccors`;
    }

}



function rock() {
    human = 1;

}

function paiper() {
    human = 2;

}

function siccors() {
    human = 3;

}


function battle(human) {
    if (bot === human) {
        console.log("Tie");
        document.getElementById("Answer").innerHTML = `Tie`;
    }
    if (human === 2 && bot === 1) {
        console.log("Win");
        document.getElementById("Answer").innerHTML = `Human Wins`;
    }
    if (human === 3 && bot === 1) {
        console.log("Lose");
        document.getElementById("Answer").innerHTML = `Human Lose`;
    }
    if (human === 3 && bot === 2) {
        console.log("Win");
        document.getElementById("Answer").innerHTML = `Human Wins`;
    }
    if (human === 1 && bot === 2) {
        console.log("Lose");
        document.getElementById("Answer").innerHTML = `Human Lose`;
    }
    if (human === 1 && bot === 3) {
        console.log("Win");
        document.getElementById("Answer").innerHTML = `Human Wins`;
    }
    if (human === 2 && bot === 3) {
        console.log("Lose");
        document.getElementById("Answer").innerHTML = `Human Lose`;
    }
}