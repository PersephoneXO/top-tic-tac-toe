//DOM Elements
const gameContainer=document.querySelector('.game-container');
const startButton=document.querySelector('.start-button');
const gridBoxes=document.getElementsByClassName('box');


//event listeners

//create an event listener for the game container that can get the index of which box was clicked
let targetBox;
function activateEventListener(callback){
    function clickHandler(e){
        if(e.target.tagName.toLowerCase()==='div'){
            targetBox=Array.from(gameContainer.children).indexOf(e.target);
            callback();
            gameContainer.removeEventListener('click',clickHandler);
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
        activateEventListener(()=>{
            currentPlayer=whosTurn(round,player1,player2);
            round++;

            if(currentGameboard[Number(targetBox)]&& currentGameboard[Number(targetBox)].length===0){
                playTurn(currentPlayer,targetBox,currentGameboard);

            }


    });
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
function whosTurn(round,player1,player2){
    if(round%2==0){
        return player1;
    }
    else{return player2}

};
