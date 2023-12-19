//DOM Elements
const gameContainer=document.querySelector('.game-container');
const startButton=document.querySelector('.start-button');
const gridBoxes=document.getElementsByClassName('box');


//event listeners

//create an event listener for the game container that can get the index of which box was clicked
let targetBox;
function activateEventListener(){
    function clickHandler(e){
        if(e.target.tagName.toLowerCase()==='div'){
            targetBox=Array.from(gameContainer.children).indexOf(e.target);
            console.log(targetBox);
        };
    };

    gameContainer.addEventListener('click',clickHandler);
};


//press button to start game
startButton.addEventListener('click',(e)=>{
    startButton.remove();
    gameFlow();
});


//initialize game
const init=(function(){
    //create gameboard function
    const createGameboard=()=>{
        gameContainer.innerHTML="";

        //initialize each box in the gameboard
        for(let i=0;i<9;i++){
            let box=document.createElement('div');
            box.classList.add('box');
            box.id=i;
            gameContainer.appendChild(box);
        }
        return gameContainer;
    };

    //create player1
    const createPlayer=(name,marker)=>{
        const win=false;
        return {name,marker,win};
    };

    return {createGameboard,createPlayer};
}());



function gameFlow(){
    init.createGameboard();

    let player1=init.createPlayer('Player 1','x');
    let player2=init.createPlayer('Player 2','o');

    let currentGameboard=[[],[],[],[],[],[],[],[]];
    let round=0;
    let currentPlayer;

   // while(player1.win==false&&player2.win==false){
        whosTurn(round,player1,player2,currentPlayer);
        activateEventListener();



   // }
};


//play turn function
function playTurn(currentPlayer,targetBox,currentGameboard){
    let marker=currentPlayer.marker;
    let newMark=document.createElement('p');
    newMark.textContent=marker;
    newMark.classList.add('input-marker');
    let boxDiv=document.getElementById(`${targetBox}`);
    boxDiv.appendChild(newMark);
    currentGameboard[targetBox].push(marker);
    return currentGameboard;
};


//determine turn function
function whosTurn(round,player1,player2,currentPlayer){
    if(round%2==0){
        currentPlayer=player1;
    }
    else{currentPlayer=player2}
    round++;
    return currentPlayer;
};
