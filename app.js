let userScore=0;
let compScore=0;
let round=0;

const choices=document.querySelectorAll(".choice");
const msg=document.querySelector("#msg");

const userScorePara=document.querySelector("#user-score");
const compScorePara=document.querySelector("#comp-score");
const roundDisplay=document.getElementById("round-number");
const userProgress=document.getElementById("user-progress");
const compProgress=document.getElementById("comp-progress");
const clickSound=new Audio("sharp-pop.mp3");
const winSound=new Audio("game-success-notification.wav");
const loseSound=new Audio("playful-failure-310480.mp3");
loseSound.load();//preload the sound
const resetBtn=document.getElementById("reset-btn");
const finalResultDisplay=document.getElementById("final-result");

const genCompChoice =()=>{
    const options=["rock","paper","scissor"];
    const randomIdx =Math.floor(Math.random()*3);
    return options[randomIdx];
}

const drawGame=()=>{
    msg.innerText="Game was a draw, Play again!";
    msg.style.backgroundColor="#081b31";
}

//Render 5 round blocks for each side
for(let i=0;i<5;i++){
    const u=document.createElement("div");
    const c=document.createElement("div");
    userProgress.appendChild(u);
    compProgress.appendChild(c);
}

//Show winner
const showWinner=(userWin,userChoice,compChoice)=>{
    if(userWin){
        userScore++;
        userScorePara.innerText= userScore;
        userScorePara.offsetHeight;//force UI to update immediately
        console.log("You Win!");
        userProgress.children[userScore-1].classList.add("active");
        msg.innerText=`You Win!, Your ${userChoice} beats ${compChoice}`;
        msg.style.backgroundColor="green";
    }else{
        compScore++;
        compScorePara.innerText=compScore;
        compScorePara.offsetHeight;//force UI to update immediately
        compProgress.children[compScore-1].classList.add("active");
        msg.innerText=`You Lost! ${compChoice} beats your ${userChoice} `;
        msg.style.backgroundColor="red";
        
    }
}
//playGame
const playGame=(userChoice)=>{
    if(round>=5 || userScore===5 ||compScore ===5)return;
    //Generate computer choice
    const compChoice=genCompChoice();

    if(userChoice===compChoice){
        //DRAW GAME
        drawGame();
    }else{
        let userWin=true;
        if(userChoice==="rock"){
            //scissor,paper
            userWin = compChoice==="paper"? false :true;
        }else if(userChoice ==="paper"){
            //rock,scissor
            userWin =compChoice ==="scissor" ?false: true;
        }else if(userChoice==="scissor"){
            //rock,paper
            userWin = compChoice==="rock" ?false:true;
        }
        showWinner(userWin,userChoice,compChoice);
    }
//always increment round after each move 
roundDisplay.innerText=`Round:${round+1}/5`;
round++;
 


    //check if game ended, and show result
    if (round>=5 || userScore===5 ||compScore===5){
        setTimeout(() => {
            finalResultDisplay.classList.add("show");

            if(userScore>compScore){
                winSound.currentTime=0;
                winSound.play();
                finalResultDisplay.innerHTML =`<i class="fa-solid fa-trophy"></i> Yeah, You won the match!`;
               } else if(compScore>userScore){
                loseSound.currentTime=0;
                loseSound.play();
                finalResultDisplay.innerHTML=`<i class="fa-solid fa-robot"></i> Computer won the match!`;
               } else {
                finalResultDisplay.innerHTML=`<i class="fa-solid fa-handshake"></i> Match Draw`;
               }
               //showing the reset button
               resetBtn.classList.remove("hidden");
        }, 300);
        return;
    }
    
};
  

//click-choice
choices.forEach((choice) => {
    console.log(choice);
    choice.addEventListener("click",()=>{
        clickSound.currentTime=0;//reset to start if clicked quickly
        clickSound.play();//play the sound
        const userChoice=choice.getAttribute("id");
        playGame(userChoice);
    })
});

// BACKGROUND MUSIC SETUP
const music=document.getElementById("bg-music");
const musicBtn=document.getElementById("music-btn");

let isPlaying=false;

musicBtn.addEventListener("click",()=>{
    if(isPlaying){
        music.pause();
        musicBtn.innerHTML='<i class="fa-solid fa-volume-xmark"></i> Music Off';
    }else{
        music.play();
        musicBtn.innerHTML='<i class="fa-solid fa-volume-off"></i> Music On';
    }
    isPlaying=!isPlaying;
});
//resetGame
const resetGame= () =>{
    userScore=0;
    compScore=0;
    round=0;

    userScorePara.innerText=0;
    compScorePara.innerText=0;
    roundDisplay.innerText=`Round:${round+1}/5`;

    msg.innerText="play your move";
    msg.style.backgroundColor="#081b31";

    //clear progress indicators
    [...userProgress.children].forEach(dot => dot.classList.remove("active"));
    [...compProgress.children].forEach(dot => dot.classList.remove("active"));

    finalResultDisplay.innerText="";
    finalResultDisplay.classList.remove("show");

}
resetBtn.addEventListener("click",()=>{
    resetGame();
    resetBtn.classList.add("hidden");//hide again after resetting
})