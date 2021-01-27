let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let cont = 0;
let iniciar = true;
let reiniciar = false;
let snake = [];
snake[0] = {
  x: 8 * box,
  y: 8 * box
}
//gera números aleatorios
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

let direction = "right";
let cor = ["green", "red", "yellow", "black", "white"];
let food = {
  x: Math.floor(Math.random() * 15 +1) * box,
  y: Math.floor(Math.random() * 15 +1) * box,
  //defino uma cor aleatória para a comida
  cor: cor[getRandomIntInclusive(0,cor.length-1)]
}
//define o plano de fundo
function criarBG(){
  context.fillStyle = "lightgrey";
  context.fillRect(0,0, 16 * box, 16 * box);
}

function criarCobrinha(){
  if(iniciar){
    for(i = 0; i < snake.length; i++){
      context.fillStyle = "blue";
      context.fillRect(snake[i].x, snake[i].y, box, box);
    }
  }
}
//gera a comida com cores diversas
function criarComida(){
  if(iniciar){
  context.fillStyle = food.cor;
  context.fillRect(food.x, food.y, box, box);
  }
}
//escuta as teclas digitadas
document.addEventListener('keydown', update);

//permite o movimento a partir das setinhas
function update (event){
  if(event.keyCode == 37 && direction != "right") direction ="left";
  if(event.keyCode == 38 && direction != "down") direction ="up";
  if(event.keyCode == 39 && direction != "left") direction ="right";
  if(event.keyCode == 40 && direction != "up") direction ="down";
}

function iniciarJogo(){

    //lógica para aparecer do outro lado caso passe da borda
  if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
  if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
  if(snake[0].y > (15 * box) && direction == "down") snake[0].y = 0;
  if(snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;
//Faz o jogo parar quando a cobrinha toca nela mesmo
 for(i = 1; i < snake.length; i++){
   if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
     clearInterval(jogo);
     alert(`Cara você perdeu! Essa gulosa comeu ${cont} frutinhas.`);
     document.getElementById("button").innerHTML="Reiniciar";
     reiniciar = true;
   }
 }
 
  criarBG();
  criarCobrinha();
  criarComida();
 
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;
 
  if(direction == "right") snakeX += box;
  if(direction == "left")  snakeX -= box;
  if(direction == "up") snakeY -= box;
  if(direction == "down") snakeY += box;

  if(snakeX != food.x || snakeY != food.y){
    snake.pop();
  }else{
    food.x = Math.floor(Math.random() * 15 +1) * box;
    food.y = Math.floor(Math.random() * 15 +1) * box;
    food.cor = cor[getRandomIntInclusive(0,cor.length-1)];
    cont++;
  }

  let newHead = {
    x:snakeX,
    y:snakeY
  }

  snake.unshift(newHead);
  }

let jogo = setInterval(iniciarJogo, 99);

function botaoIniciar(){
    if (reiniciar){
        window.location.reload();
        //document.getElementById("button").innerHTML="Parar";
        //setInterval(iniciarJogo, 99);
    }
    if(iniciar){        
        iniciar = false;
        document.getElementById("button").innerHTML="Continuar";
    } else{
        iniciar=true;
        document.getElementById("button").innerHTML="Pausar";
        reiniciar=false
    }
}
