let canvas = document.getElementById("snake");//criar elemento que irá rodar o jogo
let context = canvas.getContext("2d");  //desenho o que vai acontecer dentro do canvas
let box = 32; //tamanho de cada quadrado é 32px
let snake = [];//criar cobrinha como lista, já que ela vai ser uma série de coordenadas, que quando pintadas, criam os quadradinhos
snake[0] = {
        x: 8 * box,
        y: 8 * box
}
//direção à direita
let direction = "right";
//comida da cobrinha
//Math.random retorna um numero aleatorio ate um
/*Math.floor retira a virgula tem pois do zero ate aonde a gente
setou - nesse caso foi setado 16 e o tamanho do nosso canvas*/
let food = {
  x: Math.floor(Math.random() * 15 + 1) * box,
  y: Math.floor(Math.random() * 15 + 1) * box
}

//função que cria plano de fundo do jogo
function criarBG(){
  context.fillStyle = "lightgreen"; //cor de fundo verde
  context.fillRect(0,0,16 * box, 16 * box); //vai desenhar o retangulo do jogo
}

function criarCobrinha(){
  for(i=0; i < snake.length; i++){
      context.fillStyle = "green";
      context.fillRect(snake[i].x, snake[i].y, box,box);
  }
}

/*função que cria a comida da cobra. E la no começo do código
vamos declarar o elemento (let food)*/
function drawFood(){
  //cor da comida
  context.fillStyle = "red";
  //Passando as posições para quando for desenhar
  context.fillRect(food.x, food.y, box, box);
}


/* o addEventListner vai pegar o keydown que é o evento de clique dos
   botões de teclado e vai chamar a função update*/
 document.addEventListener('keydown', update);

 function update (event){
  //se o botao for o 37 e a direção nao for right entao muda para left
  if(event.keyCode == 37 && direction != "right") direction = "left";
  if(event.keyCode == 38 && direction != "down") direction = "up";
  if(event.keyCode == 39 && direction != "left") direction = "right";
  if(event.keyCode == 40 && direction != "up") direction = "down";
  //
 }


//colocando as funções acima dentro da função iniciarJogo
function iniciarJogo(){
  /*se a posição 0 (cabeça) se choccar com a posição 1 (corpo) ela vai
  parar o nosso jogo e acionar a funçao de alert que vai definir o fim
  do jogo*/
  for(i=1; i<snake.length; i++){
    if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
        clearInterval(jogo);
        alert('###FiM dO jOgO :(###')
    }
  }

  //Vamos fazer com que a cobrinha atravesse aparede - plano cartesiano:
  /*Se o valor de snake na posição zero que é a cabeça dela ao iniciar na condição
  de x for maior que 15 vezes o tamanho do nosso box que é o tamanho do
  nosso canvas e a direção for a direita ela saira da tela, daí ela receberá
  zero e aparecerá novamente no lado esquerdo */
   if(snake[0].x > 15 * box && direction == "right") snake[0].x=0;
   if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
   if(snake[0].y > 15 * box && direction == "down") snake[0].y=0;
   if(snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

   criarBG();
   criarCobrinha();
   drawFood();

   //criando um ponto de partida criando um ponto X e outro Y
   let snakeX = snake[0].x;
   let snakeY = snake[0].y;
   //as coordenadas da cobrinha = aumanetando ou dininuindo os quadros
   //direção right vai acrescentar um quadrado
   if(direction == "right") snakeX += box;
   //direção right vai diminuir um quadrado
   if(direction == "left") snakeX -= box;
   //direção up vai diminuir um quadrado
   if(direction == "up") snakeY -= box;
   //direção down vai acrescentar um quadrado
   if(direction == "down") snakeY += box;

   /*caso a posição do snakeX seja diferente da food.x e a snakeY
   seja diferente da food.y ela vai retirar o ultimo elemento da
   cobrinha, do contrário ela vai continuar aumentando e a gente
   vai passar de novo a função de gerar aleatoria a comida, ou seja
   quando a cobrinha passar pela comida ela vai aparecer aleatoriamente
   em outro local do canvas*/
   if(snakeX != food.x || snakeY != food.y){
     snake.pop();
   }else{food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box
   }

   //O primeiro elemento/cabeça quando incia o jogo
   let newHead = {
        x: snakeX,
        y: snakeY
   }
   snake.unshift(newHead);
}

//para a cada 100 mili segundos para inciar o jogo, renovando o jogo sem travar
let jogo = setInterval(iniciarJogo, 100);
