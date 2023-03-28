const tictactoe=document.querySelectorAll('.carre');
const statusTxt=document.querySelector('#status');
const btnRestart=document.querySelector('#restart');

let x="<img src='images/X.png'>";
let o="<img src='images/O.png'>";

const win = [
[0,1,2],
[0,3,6],
[0,4,8],
[0,4,6],
[1,4,7],
[2,4,6],
[2,5,8],
[3,4,5],
[6,7,8]     ]

let scoreX = 0; // ont été ajouté pour être utilisé dans la fonction checkWinner et mettre à jour les scores
let scoreO = 0;


let options=["","","","","","","","",""];
let currentPlayer=x;
let player="X";
let running=false;
init();

function init(){
    tictactoe.forEach(carre=>carre.addEventListener('click',carreClick));
    btnRestart.addEventListener('click',restartGame);
    statusTxt.textContent=`${player} , start`;
    running=true;
  }

  function carreClick(){
    const index=this.dataset.index;
    if(options[index]!="" || !running){
      return;
    }
    updatecarre(this,index);
    checkWinner();
  }

  function updatecarre(carre,index){
    options[index]=player;
    carre.innerHTML=currentPlayer;
  }
  
  function changePlayer(){
      player=(player=='X') ? "O" :"X";
      currentPlayer=(currentPlayer==x) ? o :x;
      statusTxt.textContent=`${player} , it's your turn ☝🏽`;
  }

  function checkWinner(){
    let isWon=false;
    for(let i=0;i<win.length;i++){
      const condition=win[i]; //[0,1,2]etc.
      const carre1=options[condition[0]]; //x
      const carre2=options[condition[1]]; //''
      const carre3=options[condition[2]]; //''
      if(carre1=="" || carre2=="" || carre3==""){
        continue;
      }
      if(carre1==carre2 && carre2==carre3){
        isWon=true;
        tictactoe[condition[0]].classList.add('win');
        tictactoe[condition[1]].classList.add('win');
        tictactoe[condition[2]].classList.add('win');

        if (player == 'X') {
            scoreX++;
            document.querySelector('#scoreX').textContent = scoreX;
        } else {
            scoreO++;
            document.querySelector('#scoreO').textContent = scoreO;
        }
        break; // ajout de break ici pour sortir immédiatement de la boucle, car si il n'y avait pas le break, et que le joueur lié à currentplayer  gagnait sur la win [2,4,6], il aurait eu 2points..
    }
}

if(isWon){
    statusTxt.textContent=`${player} Won 🎉`;
    running=false;
} else if(!options.includes("")){
    statusTxt.textContent=`Game Draw 🥵`;
    running=false;
} else {
    changePlayer();
}
}
  
  function restartGame(){
    options=["","","","","","","","",""];
    player=x;
    player="X";
    running=true;
    statusTxt.textContent=`${player} , it's your turn ☝🏽`;
  
    tictactoe.forEach(carre=>{
        carre.innerHTML="";
        carre.classList.remove('win');
    });
  }