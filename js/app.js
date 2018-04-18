let cards = ['diamond', 'diamond', 'paper-plane-o', 'paper-plane-o', 'anchor', 'anchor', 'bolt', 'bolt', 'cube', 'cube', 'leaf', 'leaf', 'bicycle', 'bicycle', 'bomb', 'bomb'];
let opened = [];
let sCards = shuffle(cards);
let wait = 420;
let match = 0;
let moves = 0;
let stars3 = 14;
let stars2 = 18;
let stars1 = 22;
let rating = 0
let totalmatches = cards.length / 2;
let second = 0;
let nowTime;
let start = new Date;


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
 let currentIndex = array.length,
  temporaryValue, randomIndex;
 while (currentIndex !== 0) {
  randomIndex = Math.floor(Math.random() * currentIndex);
  currentIndex -= 1;
  temporaryValue = array[currentIndex];
  array[currentIndex] = array[randomIndex];
  array[randomIndex] = temporaryValue;
}
 return array;
}


//initiate game
function init() {
 match = 0;
 moves = 0;
 $('.moves').text(moves + ' Moves');
 let sCards = shuffle(cards);
 for (i = 0; i < sCards.length; i++) {
  $('.deck').append($('<li class="card"><i id="' + sCards[i] + '" class="fa fa-' + sCards[i] + '"></i></li>'))
  addCardListener();
  resetTimer(nowTime);
  second = 0;
  initTime();
 }
}

//This function listens for clicks, and decides if the cards match or dont match.
function addCardListener() {
 $('.deck').find('.card').on('click', function() {
  if ($(this).hasClass('show') || $(this).hasClass('match')) { return true; }
  let card = $(this).children().attr('class');
  $(this).addClass('open show');
  opened.push(card);;
  if (opened.length > 1) {
   if (card === opened[0]) {
    $('.deck').find('.open').addClass('match');
    setTimeout(function() {
     $('.deck').find('.open').removeClass('open show');
    }, wait);
    match++
    if (moves === 1) {
     $('.moves').text(moves + ' Move');
    } else {
     $('.moves').text(moves + ' Moves');
     console.log(moves);
    }
   } else {
    $('.deck').find('.open').addClass('notmatch');
    setTimeout(function() {
     $('.deck').find('.open').removeClass('open show');
     if (moves === 1) {
      $('.moves').text(moves + ' Move');
     } else {
      $('.moves').text(moves + ' Moves');
     }
    }, wait / 1.5);
   }
   opened = [];
   moves++
   ratings(moves);
   console.log(totalmatches);
   console.log(match);
   if (totalmatches === match) {
    endGame(moves, rating);
   }
  }
 })
}

//Uses the grading scale to decide how many stars a player will earn based on
//number of moves

function ratings(moves) {
 let rating = 3;
 if (moves > stars3 && moves < stars2) {
  $('.fa-star').eq(2).removeClass('fa-star').addClass('fa-star-o');
 }
 if (moves > stars2 && moves < stars1) {
  $('.fa-star').eq(1).removeClass('fa-star').addClass('fa-star-o');
  rating = 2;
 }
 if (moves > stars1) {
  $('.fa-star').eq(0).removeClass('fa-star').addClass('fa-star-o');
  rating = 1;
 }
 return {
  score: rating
 };
}

//This is the time function to tell how long the game has lasted
function initTime() {
 nowTime = setInterval(function() {
  $('.timer').text(Math.round((new Date - start) / 1000, 0) + " Seconds");
  second++;
 }, wait);
}


//Reset function resets the board, moves, and timer to 0 to start a new game.
function resetTimer(timer) {
 $('.restart').on('click', function() {
  for (i = 0; i < sCards.length; i++) {
   $('.card').remove();
   start = new Date;
   init();
  };

 });
}

//game Ending Modal
function endGame(moves, rating) {
  let endTime= Math.round((new Date - start) / 1000, 0);
  endMoves = moves-1;
  endRating = rating;
  console.log(endTime);
  console.log(endMoves);
  console.log(endRating);
}




init();
