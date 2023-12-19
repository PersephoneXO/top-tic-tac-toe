//DOM Elements
const gameContainer=document.querySelector('.game-container');
const startButton=document.querySelector('.start-button');



//press button to start game
startButton.addEventListener('click',(e)=>{
    init.createGameboard();
    init.createPlayer1('Player 1','x');
    init.createPlayer2('Player 2','o');
    startButton.remove();
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
    const createPlayer1=(name,marker)=>{
        return {name,marker};
    };

    //create player2
    const createPlayer2=(name,marker)=>{
        return {name,marker};
    };

    return {createGameboard,createPlayer1,createPlayer2};
}());
