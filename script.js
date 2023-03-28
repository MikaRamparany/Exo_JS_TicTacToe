const tictactoe=document.querySelectorAll('.carre');
const statusTxt=document.querySelector('#status');
const btnRestart=document.querySelector('#restart');

let x="<img src='images/X.png'>";
let o="<img src='images/O.png'>";

const win = [
[0,1,2],
[0,4,8],
[0,4,6],
[1,4,7],
[2,4,6],
[2,5,8],
[3,4,5],
[6,7,8]     ]

let options=["","","","","","","","",""];
let currentPlayer=x;
let player="X";
let running=false;
init();

function init(){
    tictactoe.forEach(carre=>carre.addEventListener('click',carreClick));
    btnRestart.addEventListener('click',restartGame);
    statusTxt.textContent=`${player} Your Turn`;
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
      statusTxt.textContent=`${player} Your Turn`;
  }

  function checkWinner(){
    let isWon=false;
    for(let i=0;i<win.length;i++){
      const condition=win[i]; //[0,1,2]
      const carre1=options[condition[0]]; //x
      const carre2=options[condition[1]]; //''
      const carre3=options[condition[2]]; //''
      if(carre1=="" || carre2=="" || carre3==""){
        continue;
      }
      if(carre1==carre2 && carre2==carre3){
        isWon=true;
        stictactoe[condition[0]].classList.add('win');
        tictactoe[condition[1]].classList.add('win');
        tictactoe[condition[2]].classList.add('win');
      }
    }
  
    if(isWon){
      statusTxt.textContent=`${player} Won !`;
      running=false;
    }else if(!options.includes("")){
      statusTxt.textContent=`Game Draw !`;
      running=false;
    }else{
      changePlayer();
    }
  
  }
  
  function restartGame(){
    options=["","","","","","","","",""];
    currentPlayer=x;
    player="X";
    running=true;
    statusTxt.textContent=`${player} Your Turn`;
  
    tictactoe.forEach(carre=>{
        carre.innerHTML="";
        carre.classList.remove('win');
    });
  }