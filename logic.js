var totalMoves=0;
var totalWins=0;
function returnIndex (moves,level){
  var result=moves-(((level-1)*level)/2);
  return result;
}
console.log('kya bala');
function playCorrespondingAudioAndAnimation(color){
  var audio=new Audio('sounds/'+color+'.mp3')
  audio.play();
  $('.'+color).addClass('pressed');
  setTimeout(function (){
    $('.'+color).removeClass('pressed');
  },100)
}
function setLevelHeading(level){
  $('#level-title').text('Level '+level);
}
function fadeinfadeout(colorName){
    var colorClass='.'+colorName;
    $(colorClass).fadeOut(100).fadeIn(100);
    var audio=new Audio('sounds/'+colorName+'.mp3')
    audio.play();
}
//randomly generate a 50 color sequence
function generateSequence() {
  var arr = [];
  for (var t = 0; t < 50; t++) {
    var rand = Math.floor((Math.random() * 4) + 1);
    switch (rand) {
      case 1:
        arr.push('green');
        break;
      case 2:
        arr.push('red');
        break;
      case 3:
        arr.push('yellow');
        break;
      case 4:
        arr.push('blue');
        break;
      default:
    }
  }
  console.log(arr);
  return arr;
}
function generateSubSeqen(sequence,level){
  var subArr=[];
  for(var t=0;t<level;t++){
    subArr.push(sequence[t]);
  }
  return subArr;
}
function manager(colorClicked,gameLevel,level){
  var t=returnIndex(totalMoves,level);
  console.log('color suposed right:'+gameLevel[t]);
    if(colorClicked===gameLevel[t]){
      console.log('answer was right');
      playCorrespondingAudioAndAnimation(colorClicked);
      totalWins++;
      totalMoves++;
      return 1;
    }else{
      playCorrespondingAudioAndAnimation('wrong');
      $('body').addClass('game-over');
      setTimeout(function todo (){
        $('body').removeClass('game-over');
      },100)
      console.log('answer was wrong');
        $('#level-title').text('press any key to try again');
      totalMoves=0;
      totalWins=0;
      $('.btn').off();
      return 0;
    //  level=1;//uselesss as no pass by refernce //two psbl soln // global level var OR make function in onClick to check if returned 0;
    }

  console.log('value of subsequence counter:'+t);
}
//starts game on any key press
$(document).on('keydown', function() {
    var level = 1;
    var mainSequence=generateSequence();
    fadeinfadeout(mainSequence[0]);
    setLevelHeading(level);
  //  var sequence = generateSequence();
    $('.btn').on('click',function(event){
        gameLevel=generateSubSeqen(mainSequence,level);
        console.log('color i clicked:'+this.classList[1]);
         var k=manager(this.classList[1],gameLevel,level,totalMoves);
         if(k===0){
           level=1;
         }
         console.log('total moves:'+totalMoves);
         if((totalWins===(level*(level+1)/2))){
           console.log('level completed');
           level++;
           setLevelHeading(level);
           setTimeout(function d (){
             fadeinfadeout(mainSequence[level-1]);
           },500);

         }
      }
      );
});
