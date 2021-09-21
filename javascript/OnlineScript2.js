let user1 = {};
let user2 = {};
let max = 0;

function start() {
    user1 = {};
    user2 = {};
    point = 0;
    point2 = 0;
    document.getElementById("user1Point").innerHTML = "";
    document.getElementById("user2Point").innerHTML = "";
    game();
}

function game() {
    document.getElementById("Answer").innerHTML = ``;
    document.getElementById("time").innerHTML = `3`;
    document.getElementById("Bot-Pick").innerHTML = ``;
    user1 = {};
    user2 = {};
    max = 0;
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

        if ((timeleft === 2 || timeleft === 1 || timeleft === 0) && Object.keys(user1).length != 0 || Object.keys(user2).length != 0) {
            if (Object.keys(user1).length != 0) {
                document.getElementById("Answer").innerHTML = `user1 Lose`;
                document.getElementById("user1Point").innerHTML += "O";
                document.getElementById("user2Point").innerHTML += "X";
                document.getElementById("time").innerHTML = `View`;
                max = 4;
                timeleft = -1;
                point2++;
                earlyLoop();
                return;
            }
            if (Object.keys(user2).length != 0) {
                document.getElementById("Answer").innerHTML = `user2 Lose`;
                document.getElementById("user1Point").innerHTML += "X";
                document.getElementById("user2Point").innerHTML += "O";
                document.getElementById("time").innerHTML = `View`;
                max = 4;
                timeleft = -1;
                point++;
                earlyLoop();
                return;
            }
        }


        if (timeleft == -1 && max != 4) {
            document.getElementById("time").innerHTML = `View`;

            if (Object.keys(user1).length != 0 && Object.keys(user2).length != 0) { // both pick something
                test();
                return;
            }
            if (Object.keys(user1).length === 0 && Object.keys(user2).length != 0) { //user 2 picks something
                document.getElementById("user1Point").innerHTML += "O";
                document.getElementById("user2Point").innerHTML += "X";
                point2++;
                loop();
                return;
            }
            if (Object.keys(user1).length != 0 && Object.keys(user2).length === 0) { //user 1 picks something
                document.getElementById("user1Point").innerHTML += "X";
                document.getElementById("user2Point").innerHTML += "O";
                point++;
                loop();
                return;
            }
            if (Object.keys(user1).length === 0 && Object.keys(user2).length === 0) { //both pick nothing
                document.getElementById("user1Point").innerHTML += "O";
                document.getElementById("user2Point").innerHTML += "O";
                loop();
                return;
            }

        }
    }, 1000);
};





function test() {
    if (user1.input && (user2.input === user1.weakness)) {
        document.getElementById("user1Point").innerHTML += "O";
        document.getElementById("user2Point").innerHTML += "X";
        point2++;
        game();
        return;
    }
    if (user1.input === user2.input) {
        setTimeout(function() {
            game();
            return;
        }, 2000);
    }
    if (user1.input && (user2.input === user1.strong)) {
        document.getElementById("user1Point").innerHTML += "X";
        document.getElementById("user2Point").innerHTML += "O";
        point++;
        game();
        return;
    }
};


//count points
function loop() {
    if (point === 1 && point2 === 0 || point === 0 && point2 === 1 || point === 1 && point2 === 1) {
        setTimeout(function() {
            game();
        }, 2000);
    }
    if (point === 2) {
        document.getElementById("score").innerHTML = "user1 wins the game";
        document.getElementById("score2").innerHTML = "user2 loses the game";
        document.getElementById("newRound").innerHTML = "To play again press play!";


    }
    if (point2 === 2) {
        document.getElementById("score").innerHTML = "user1 Loses the game";
        document.getElementById("score").innerHTML = "user2 wins the game";
        document.getElementById("newRound").innerHTML = "To play again press play!";

    }
}

//Counts points if you pick to early
function earlyLoop() {
    if (point2 === 2) {
        document.getElementById("score").innerHTML = "user1 Loses the game";
        document.getElementById("score").innerHTML = "user2 wins the game";
        document.getElementById("newRound").innerHTML = "To play again press play!";
        return;
    }
    if (point === 2) {
        document.getElementById("score").innerHTML = "user2 Loses the game";
        document.getElementById("score").innerHTML = "user1 wins the game";
        document.getElementById("newRound").innerHTML = "To play again press play!";
        return;
    }
    setTimeout(function() {
        game();
    }, 2000);
}
















































//The first user choices
function rock() {
    user1 = {
        input: "rock",
        weakness: "paper",
        strong: "siscors",

    }
}

function paiper() {
    user1 = {
        input: "paper",
        weakness: "siscors",
        strong: "rock",

    }
}

function siccors() {
    user1 = {
        input: "siscors",
        weakness: "rock",
        strong: "paper",

    }
}

//The secound user choices
function rock2() {
    user2 = {
        input: "rock",
        weakness: "paper",
        strong: "siscors",

    }
}

function paiper2() {
    user2 = {
        input: "paper",
        weakness: "siscors",
        strong: "rock",

    }
}

function siccors2() {
    user2 = {
        input: "siscors",
        weakness: "rock",
        strong: "paper",

    }
}