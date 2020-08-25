/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var score,roundscore,activeplayer,gameOn,state=0,count;
initializeAll();
//annonymous function
document.querySelector('.btn-roll').addEventListener('click', function(){
    
      if(gameOn){
        var dice;
        dice = Math.floor(Math.random()*6)+1; //generating the dice randomly
        //console.log("count:"+count);
        //console.log("dice value:"+dice);
        state=1;
        if(count>3 && dice!==1){
           
           dice = 0;
           //console.log("count three dice:"+dice);
           document.querySelector('.dice').style.display='block';
           document.querySelector('.dice').src='dice-1.png';
           nextplayer();
        }
        else if(count<2 && dice === 1){
            //dice = Math.floor(Math.random()*6)+1;
            console.log("new dice:"+dice);
            dice = 2;
            document.querySelector('.dice').style.display='block';
            document.querySelector('.dice').src = 'dice-' + dice + '.png';
            count++;
        }
        else{
            //dice = Math.floor(Math.random()*6)+1; //generating the dice randomly
            //showing the dice
            var diceDOM = document.querySelector('.dice');
            diceDOM.style.display = 'block';
            diceDOM.src = 'dice-' + dice + '.png';
            //updating current score if not 1
            if(dice !== 1){
            roundScore+=dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
            count++;
            }
            //if 1
            else{
                
                nextplayer();
                
            }
        }
      }
});
//hold button

    document.querySelector('.btn-hold').addEventListener('click', function(){
        if(gameOn && state===1){
            //updating main score
        score[activePlayer] += roundScore; 
        document.querySelector('#score-' + activePlayer).textContent = score[activePlayer];
        //checking win or not
        if(score[activePlayer]>=30){
            document.getElementById('name-' + activePlayer).textContent = 'Winner';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gameOn = false;
            state=0;
        }
        else{
            //handing over the next player
             nextplayer();
        }
        }
    });

//new game button
document.querySelector('.btn-new').addEventListener('click',initializeAll);
//initialize
function initializeAll(){
    count=0;
    gameOn = true;
    score=[0,0];
    roundScore=0;
    activePlayer=0;
    document.querySelector('.dice').style.display = 'none';
    document.getElementById('score-0').textContent='0';
    document.getElementById('score-1').textContent='0';
    document.getElementById('current-0').textContent='0';
    document.getElementById('current-1').textContent='0';
    document.getElementById('name-0').textContent='PLAYER 1';
    document.getElementById('name-1').textContent='PLAYER 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}
//nextplayer function
function nextplayer(){
    count=0;
    activePlayer === 0 ? activePlayer=1 : activePlayer=0;
    roundScore = 0;
    //reset the current score of both player
    document.getElementById('current-0').textContent='0';
    document.getElementById('current-1').textContent='0';
    //change the active button
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    //making the dice invisible for toggling
    document.querySelector('.dice').style.display = 'none';
}
