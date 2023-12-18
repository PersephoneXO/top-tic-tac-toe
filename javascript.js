//DOM Elements
const gameContainer=document.querySelector('.game-container');
const startButton=document.querySelector('.start-button');



//press button to start game
startButton.addEventListener('click',(e)=>{
    createGameboard();
    startButton.remove();
});


function createGameboard(){
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
