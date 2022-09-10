let iaMove;

window.onload = function(){
    let rockImg = document.getElementById('rock');
    let paperImg = document.getElementById('paper');
    let scissorsImg = document.getElementById('scissors');
    start();

    // selects rock, paper or scissors when user clicks on img and make other options disappear
    rockImg.addEventListener('click', play);
    paperImg.addEventListener('click', play);
    scissorsImg.addEventListener('click', play);

    let buttonRetry = document.getElementById('retry');
    buttonRetry.addEventListener('click', start);
}

let moves = ['rock', 'paper', 'scissors'];

function start(){
    let IAImg = document.getElementById('iaImg');
    //set variables for the game
    let iaMove = moves[Math.floor(Math.random() * 3)];
    let message = document.getElementById('message');
    IAImg.dataset.move = iaMove;

    //image IA invisible + user options visible + result message invisible
    IAImg.src = iaMove + '.png';
    let containerImg = document.getElementById('player-moves-container');
    for (let image of containerImg.children) {
        image.classList.remove('hidden');
    }
    IAImg.classList.add('hidden');
    message.classList.add('hidden');
    removeResultClass(message);
}

//e pour event
function play(e){
    let img = e.target;
    let userMove = img.id;
    let IAImg = document.getElementById('iaImg');
    let message = document.getElementById('message');
    IAImg.classList.remove('hidden');
    let containerImg = document.getElementById('player-moves-container');
    for (let image of containerImg.children) {
        if (image !== img) {
            image.classList.add('hidden');
        }
    }
    let result = compareMoves(userMove);
    message.innerText = result;
    let stampClass = '';
    switch (result) {
        case 'Gagné !':
            stampClass = "win";
            break;
        case 'Perdu !':
            stampClass = "lose";
            break;
        case 'Match nul':
            stampClass = "draw";
            break;
    }
    message.classList.add(stampClass);
    message.classList.remove('hidden');
    let buttonRetry = document.getElementById('retry');
    buttonRetry.classList.remove('hidden');
    
}

//set function for the game
function compareMoves(userMove){
    let IAImg = document.getElementById('iaImg');
    let iaMove = IAImg.dataset.move;
    if (iaMove === userMove){
        return 'Match nul' ;
    } else if ((userMove === 'rock' && iaMove === 'scissors')
        || (userMove === 'paper' && iaMove === 'rock')
        || (userMove === 'scissors' && iaMove === 'paper')) {
        return 'Gagné !' ;
    } else {
        return 'Perdu !' ;
    }
}

function removeResultClass(message) {
    for (let cssClass of message.classList) {
        if (cssClass === "draw"
        || cssClass === "win"
        || cssClass === "lose") {
            message.classList.remove(cssClass);
        }
    }
}