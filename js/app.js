/*
 * Create a list that holds all of your cards
 */
let cards = ['diamond', 'diamond', 'paper-plane-o', 'paper-plane-o', 'anchor', 'anchor', 'bolt', 'bolt', 'cube', 'cube', 'leaf', 'leaf', 'bicycle', 'bicycle', 'bomb', 'bomb'];
let opened = [];
let sCards = shuffle(cards);
let wait = 420;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function init() {
  var sCards = shuffle(cards);
  for (i=0; i < sCards.length; i++) {
    $('.deck').append($('<li class="card"><i id="'+sCards[i]+'" class="fa fa-' + sCards[i] + '"></i></li>'))

    addCardListener();
  }
}

function addCardListener() {
  $('.deck').find('.card').on('click', function() {
    if ($(this).hasClass('show') || $(this).hasClass('match')) {return true; }
    var card = $(this).children().attr('class');
    $(this).addClass('open show');
    opened.push(card);
    console.log(sCards);
    console.log(opened);
    if (opened.length > 1) {
      if (card === opened[0]) {
        $('.deck').find('.open').addClass('match');
        setTimeout(function () {
          $('.deck').find('.open').removeClass('open show');
        }, wait);
        match++
      }else {
        $('.deck').find('.open').addClass('notmatch');
        setTimeout(function () {
          $('.deck').find('.open').removeClass('open show');
        }, wait / 1.5);
      }
        opened = []
      }

  })
}


init();
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
