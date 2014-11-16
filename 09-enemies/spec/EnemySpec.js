

describe("09 - Enemies", function() {

    var canvas, ctx;

    beforeEach(function() { 
        loadFixtures('index.html');

        canvas = $('#game')[0];
        expect(canvas).toExist();

        ctx = canvas.getContext('2d');
        expect(ctx).toBeDefined();

        SpriteSheet.map = enemy_ship: { sx: 116, sy: 0, w: 42, h: 43, frames: 1 };
        e = new Enemy({ 
          x: 0,   
          y: -50, 
          sprite: 'enemy_ship', 
          health: 10, 
          E: 100 
        });
        e.board = new GameBoard(); 
        e.board.remove = function(obj) {};
    }); 

    it("Enemy position", function() { 
       dt = 2;
       x = 0;
       y = -50;

       expect(e.x).toBe(x);
       expect(e.y).toBe(y);
       e.step(dt); 
       
       x += e.vx*dt;
       y += e.vy*dt;
       expect(e.x).toBe(x); 
       expect(e.y).toBe(y);
    });

    it("Method enemy step", function() {  
        spyOn(e.board, 'remove');
        e.step(0.02); // En el tablero
        expect(e.board.remove).not.toHaveBeenCalled();
        e.step(200); // Fuera del tablero
        expect(e.board.remove).toHaveBeenCalled();
    });

    it("Method enemy draw", function() {  
        SpriteSheet = { 
          draw: function(ctx, sprite, x, y) {}
        };

        spyOn(SpriteSheet, 'draw');
        e.draw(ctx);
        expect(SpriteSheet.draw).toHaveBeenCalled();
    });

});




/*

  Requisitos:

  El objetivo de este prototipo es a�adir al juego naves enemigas. Las
  naves se a�adir�n al tablero de juegos (objeto GameBoard) al igual
  que el resto de los elementos del juego (nave del jugador y
  misiles).

  Cada nave enemiga debe tener un patr�n de movimiento que exhibir�
  desde que entra por la parte superior del canvas hasta que
  desaparece por la parte inferior. En este prototipo las naves
  enemigos no interaccionan con el resto de los elementos del juego:
  los disparos de la nave del jugador no les afectan. La nave del
  jugador tampoco se ve afectada por la colisi�n con una nave enemiga.


  Especificaci�n:

  1. El patr�n de movimiento lo dictan las ecuaciones que se
     utilizar�n para calcular las componentes vx e vy de su velocidad.
     Los par�metros de las ecuaciones que definen vx e vy determinan
     el patr�n de comportamiento:

     vx = A + B * sin (C * t + D) 
     vy = E + F * sin (G * t + H)

     siendo t la edad de un enemigo, calculada como el tiempo que ha
     pasado desde que se cre� la nave.

     A: componente constante de la velocidad horizontal
     B: fuerza de la velocidad horizontal sinusoidal
     C: periodo de la velocidad horizontal sinusoidal
     D: desplazamiento en el tiempo de la velocidad horizontal
        sinusoidal

     E: componente constante de la velocidad vertical
     F: fuerza de la velocidad vertical sinusoidal
     G: periodo de la velocidad vertical sinusoidal
     H: desplazamiento en el tiempo de la velocidad vertical
        sinusoidal

     Todos estos par�metros tendr�n un valor por defecto de 0
     (definido en la variable baseParameters en el constructor), que
     puede ser substituido por otro valor cuando se crea la nave.


  2. Se crear� un nuevo constructor/clase Enemy. Los enemigos se
     diferenciar�n s�lo en su posici�n inicial, en el sprite que
     utilizan y en el patr�n de movimiento (par�metros A..H de la
     velocidad), pero todos ser�n de la misma clase: Enemy.

     Para definir diferentes tipos de enemigos se pasar� al
     constructor una plantilla con valores para las propiedades (x, y,
     sprite, A..H).

     Para poder definir f�cilmente enemigos parecidos creados a partir
     de una misma plantilla, se pasar� un segundo argumento al
     constructor con valores alternativos para algunas de las
     propiedades de la plantilla.

*/

