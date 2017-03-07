var pieces = {
    	NONE :          {name: "None",          code: " "}, 
    	TEAM_KING :    {name: "Black King",    code: "\u265A"}, 
    	TEAM_QUEEN :   {name: "Black Queen",   code: "\u265B"}, 
    	TEAM_ROOK :    {name: "Black Rook",    code: "\u265C"}, 
    	TEAM_BISHOP :  {name: "Black Bishop",  code: "\u265D"}, 
    	TEAM_KNIGHT :  {name: "Black Knight",  code: "\u265E"}, 
    	TEAM_POWN :    {name: "Black Pown",    code: "\u265F"}, 
    }; 

var arrTeam = [
  [
    pieces.TEAM_ROOK,
    pieces.TEAM_KNIGHT,
    pieces.TEAM_BISHOP,
    pieces.TEAM_QUEEN,
    pieces.TEAM_KING,
    pieces.TEAM_BISHOP,
    pieces.TEAM_KNIGHT,
    pieces.TEAM_ROOK
  ],
  [pieces.TEAM_POWN]
];



var start = function(e){
}
var moving = function(dx,dy){
  let curX = parseInt(this.data('chessX')) + dx; 
  let curY = parseInt(this.data('chessY')) + dy;
  if(curX -16 < 0 || curX + 14 >= 800 || (curY - 45) < 0 || curY >= (n * rwidth) ){
      return;
  }
  this.attr({
    x : curX,
    y : curY
  });
}
var stop = function(){
  var curX = (Math.floor(this.attr('x')/100) * 100) + spaceX;
  var curY = (Math.floor(this.attr('y')/100) * 100) + spaceY;
  this.animate({
    'x' : curX,
    'y' : curY
  },300);;
  this.attr({
    'x' : curX,
    'y' : curY
  });
  this.data('chessX',this.attr('x'));
  this.data('chessY',this.attr('y'));
}

var s = Snap("#mysvg");
var rwidth = rheight = 100;
var y = 0;
var n = 8;
var start = 0;
var end = n - 1;
var spaceX = rwidth/2;
var spaceY = rheight/2 + 15;
// Draw chess table
for(var i = 0 ; i < n;i++){
  var x = 0;
  for(var j = 0; j < n;j++){
    var r = s.rect(x,y,rwidth,rheight);
    r.mouseover(function(){
      this.attr({
        'stroke' : 'white',
        'strokeWidth' : 2
      });
    }).mouseout(function(){
      this.attr({
          'stroke' : 'none'
      });
    });
    //add chess
    var chess = s.text(x + spaceX,y + spaceY,pieces.NONE.code);
    chess.attr({
          'font-size' : '60px',
          'text-anchor' : 'middle',
          'cursor' : 'move'
        });
    chess.data('chessX',chess.attr('x'));
    chess.data('chessY',chess.attr('y'));
    
    if(i === start){
      chess.attr({
        'text' : arrTeam[0][j].code,
        'fill' : 'white',
        'stroke' : 'black',
        'strokeWidth' : 1
      });
    }
    else if(i === start + 1){
        chess.attr({
          'text' : arrTeam[1][0].code,
          'fill' : 'white',
          'stroke' : 'black',
          'strokeWidth' : 1.5
        });
    }
    else if(i === end){
       chess.attr({
        'text' : arrTeam[0][j].code,
          'fill' : 'black',
          'stroke' : 'white',
      });       

    }else if (i === end - 1){
        chess.attr({
          'text' : arrTeam[1][0].code,
          'fill' : 'black',
          'stroke' : 'white'
        });
    }
    var title = Snap.parse(`<title> ${arrTeam[0][j].name} </title>`);
    chess.append(title);
    //re-setup z-index of element
    chess.mousedown(function(e){
      s.append(e.target);
    });
    
    chess.drag(moving,start,stop);
    //fill color chess table
    if((i % 2 == 0 && j % 2 == 0) || (i % 2 != 0 && j % 2 != 0)){
        r.attr({
          fill: "#dcdee2"
        }); 
      }
      x += rwidth;
  }
  y += rheight; 
}

