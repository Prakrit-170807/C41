class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('GameMode');
    gameStateRef.on("value",function(data){
       GameMode = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      GameMode: state
    });
  }

  async start(){
    if(GameMode === 0){
      player = new Player();
      var playerCountRef = await database.ref('Players').once("value");
      if(playerCountRef.exists()){
        Players = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
    car1 = createSprite(700,height-100)
    car2 = createSprite(1000,-100)
    car3 = createSprite(500,0)
    car4 = createSprite(700,0)
    Cars = [car1,car2,car3,car4]

    car1.addImage(car1_)
    car2.addImage(car2_)
    car3.addImage(car3_)
    car4.addImage(car4_)

    car1.scale=0.3
    car2.scale=0.3
    car3.scale=0.3
    car4.scale=0.3

  }

  play(){
    form.hide();
    textSize(30);
    Player.getPlayerInfo();

    if(allPlayers !== undefined){
      image(track_,200,-height*6.8,1200,height*8)
      var Index = 0
      var x=300
      var y
      // var display_position = 130;
      for(var plr in allPlayers){
        Index=Index+1
        x+=200
        y=windowHeight-allPlayers[plr].distance
        Cars[Index-1].x=x
        Cars[Index-1].y=y
        if (Index==player.index){
          Cars[Index-1].shapeColor="red"
          camera.x=windowWidth/2
          camera.y=Cars[Index-1].y
          stroke('#1D1D1D')
          fill('#FFD05A')
          ellipse(x,y,80,80)
          if(Cars[Index-1].y==-4696){
            GameMode=2
          }
        } 
      }
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=50
      player.update();
    }
    if(keyIsDown(DOWN_ARROW) && player.index !== null){
      player.distance -=50
      player.update();
    }
    drawSprites()
 }

  end(){
    background(0)
    var end_greet = createElement('h2')
    end_greet.html("YOU HAVE FINISHED THE RACE")
    end_greet.position(width/2-200,50)

    
  }

}
