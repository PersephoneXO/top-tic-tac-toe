//DOM Elements
const gameContainer=document.querySelector('.game-container');
const startButton=document.querySelector('.start-button');
const gridBoxes=document.getElementsByClassName('box');
const namePlayersDialog=document.querySelector('#name-players-dialog');
const cancelButton=document.querySelector('#cancel-button');
const submitNamesButton=document.querySelector('#enter-names-button');
const namePlayersForm=document.querySelector('.name-players-form');
const announceElement=document.querySelector('#announcement');
const resetContainer=document.querySelector('.reset-container');
const startButtonContainer=document.querySelector('.start-button-container');



//event listeners

//create an event listener for the game container that can get the index of which box was clicked
let targetBox;
function activateEventListener(callback){
    function clickHandler(e){
        if(e.target.tagName.toLowerCase()==='div'){
            targetBox=Array.from(gameContainer.children).indexOf(e.target);
            callback();
        };
    };

    gameContainer.addEventListener('click',clickHandler);
};

//press button to open the dialog
startButton.addEventListener('click',(e)=>{
    namePlayersDialog.showModal();
});


//close modal on x button
cancelButton.addEventListener('click',(e)=>{
    namePlayersDialog.close();
});


//restart game on button click
resetContainer.addEventListener('click',(e)=>{
    if(e.target.id=='restart-button'){

    gameContainer.innerHTML='';
    announceElement.textContent='';
    document.querySelector('#restart-button').remove();
    startButton.style.display='block';
    return startButtonContainer;
    }
});


//submit player names and start the game
namePlayersForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    let player1Name=document.querySelector('#player1-name').value;
    let player2Name=document.querySelector('#player2-name').value;

    if(player1Name.length<1||player2Name.length<1){
        alert('Please fill out players names');
    }
    else{
        let player1=init.createPlayer(player1Name,'x');
        let player2=init.createPlayer(player2Name,'o');

        namePlayersDialog.close();
        namePlayersForm.reset();
        startButton.style.display='none';


        gameFlow(player1,player2);
    }
});



//initialize game
const init=(function(){
    //create gameboard function
    const createGameboard=()=>{
        gameContainer.textContent="";

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



function gameFlow(player1,player2){

    init.createGameboard();

    let currentGameboard=[[],[],[],[],[],[],[],[],[]];
    let round=0;
    let currentPlayer;
    let checkWin=null;
    let winner;

        if(round==0){
            announcements.announceTurn(player1);
        }




        activateEventListener(()=>{
            currentPlayer=whosTurn(round,player1,player2);

            if(currentPlayer===player1){
                announcements.announceTurn(player2);
            }
            else{
                announcements.announceTurn(player1);
            }

            round++;



            if(checkWin==null&&round<=9){

                if(currentGameboard[Number(targetBox)].length===0){

                    playTurn(currentPlayer,targetBox,currentGameboard);
                    checkWin=checkForWin(currentGameboard);
                    if(checkWin!==null){
                        if(checkWin==='x'){
                            winner=player1;
                            player1.win=true;
                        }
                        else{
                            winner=player2;
                            player2.win=true;
                        }

                        return announcements.announceWinner(winner);
                    }


                }

                if (round==9&&checkWin==null){
                    return announcements.announceTie();
                }

            }

    });

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


//check if the turn played resulted in a win
function checkForWin(currentGameboard){
    const winningCombos=[
        [0,1,2],[3,4,5],[6,7,8], //horizontal combos
        [0,3,6],[1,4,7],[2,5,8], //vertical combos
        [0,4,8],[6,4,2]          //diagonal combos
    ]

    for(const combo of winningCombos){
        const [a,b,c]=combo;
        if(currentGameboard[a].length>0 &&
            currentGameboard[a][0]===currentGameboard[b][0] &&
            currentGameboard[b][0]===currentGameboard[c][0]){
                return currentGameboard[a][0]==='x' ? 'x' : 'o';
            }
    }

    return null;
}



//announcement object
const announcements=(function(){
    //function that announces who's turn it is
    const announceTurn=(currentPlayer)=>{
        let playerName=currentPlayer.name;
        announceElement.textContent=`Your turn ${playerName}`

    }
    //function that announces the winner of the game
    const announceWinner=(winner)=>{
        announceElement.textContent=`${winner.name} wins!`;
        createResetButton();
    }

    const announceTie=()=>{
        announceElement.textContent=`It's a tie!`
        createResetButton();
    }

    return {announceTurn,announceWinner,announceTie};

}());



//function that creates the reset button on game end
function createResetButton(){
    let button=document.createElement('button');
    button.textContent=`Restart Game`;
    button.id='restart-button';
    resetContainer.appendChild(button);
    return resetContainer;
}
