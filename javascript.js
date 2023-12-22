//DOM Elements
const gameContainer=document.querySelector('.game-container');
const startButton=document.querySelector('.start-button');
const gridBoxes=document.getElementsByClassName('box');
const namePlayersDialog=document.querySelector('#name-players-dialog');
const cancelButton=document.querySelector('#cancel-button');
const submitNamesButton=document.querySelector('#enter-names-button');
const namePlayersForm=document.querySelector('.name-players-form');
const announcePlayerTurn=document.querySelector('#announce-turn');


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
        startButton.remove();


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
            announceTurn(player1);
        }




        activateEventListener(()=>{
            currentPlayer=whosTurn(round,player1,player2);

            if(currentPlayer===player1){
                announceTurn(player2);
            }
            else{
                announceTurn(player1);
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

                        console.log(`${winner.name} wins!`);
                        return `${winner.name} wins!`;
                    }


                }

                if (round==9&&checkWin==null){
                    console.log("It's a tie!");
                    return "It's a tie!";
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


//function that announces who's turn it is
function announceTurn(currentPlayer){
    let playerName=currentPlayer.name;
    announcePlayerTurn.textContent=`Your turn ${playerName}`
}
