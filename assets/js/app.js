/*jslint esversion: 6, browser: true*/
/*global window, console, $, jQuery, alert*/

const $heroes = $('.hero-container'); // Figure element that holds a hero
const $btn = $('#attack-btn'); // Button used to attack opponent
const $btnText = $('#attack-btn span');
const $message = $('#message'); // Element that displays messages as the game is played
const hpValue = '.hp-value'; // Element that holds heroes health meter
const hpWidth = 180; // Width health meter

// Role-playing game object
let rpg = {
  charSelect: "",
  charTeam: "",
  oppSelect: "",
  oppTeam: "",
  winCnt: 0,
  characters: {
    captainAmerica: {
      healthPts: 155,
      healthPtsMax: 155,
      attackPower: 10,
      attackPwrInc: 10,
      counterPower: 22,
      team: 'blue'
    },
    ironMan: {
      healthPts: 155,
      healthPtsMax: 155,
      attackPower: 10,
      attackPwrInc: 10,
      counterPower: 22,
      team: 'red'
    },
    scarletWitch: {
      healthPts: 150,
      healthPtsMax: 150,
      attackPower: 9,
      attackPwrInc: 9,
      counterPower: 18,
      team: 'blue'
    },
    vision: {
      healthPts: 140,
      healthPtsMax: 140,
      attackPower: 10,
      attackPwrInc: 10,
      counterPower: 16,
      team: 'red'
    },
    falcon: {
      healthPts: 140,
      healthPtsMax: 140,
      attackPower: 10,
      attackPwrInc: 10,
      counterPower: 16,
      team: 'blue'
    },
    blackWidow: {
      healthPts: 150,
      healthPtsMax: 150,
      attackPower: 9,
      attackPwrInc: 9,
      counterPower: 18,
      team: 'red'
    }
  },
  messages: [
    "Select a hero to be your player.",
    "Pick an opponent to battle from the opposing team.",
    "Press attack to battle your opponent.",
    "You won the battle. Pick a new opponent from the opposing team.",
    "You lost the battle. Refresh the page to play again.",
    "Congratulations! You have defeated all your opponents."
  ],
  button: ["Select", "Versus", "Attack", "Defeat", "Victory"],
  fn: {
    // Function that initializes click event
    attackEvent: function () {
      $btn.on('click', function () {
        // Call updateBattle function and pass in heroes selected 
        rpg.fn.updateBattle(rpg.charSelect, rpg.oppSelect);
      });
    },
    // Function to update text in message container and on button
    setText: function (message, button) {
      $message.text(rpg.messages[message]);
      $btnText.text(rpg.button[button]);
    },
    // Function to update health meter after attack button is clicked
    updateHp: function (char, obj) {
      // Calculate the width on the meter
      let width = Math.floor((obj.healthPts / obj.healthPtsMax) * hpWidth);
      // Update meter width
      $(`[data-hero="${char}"].active`).find(hpValue).css('width', width + 'px');
    },
    // Function to calculate the health points remaining of the heroes selected 
    updateBattle: function (player, opponent) {
      let p = rpg.characters[player];
      let o = rpg.characters[opponent];
      // If opponent's HP is less than or equal to zero, set to zero, call wonBattle function and remove character
      if ((o.healthPts - p.attackPower) <= 0) {
        o.healthPts = 0;
        rpg.fn.updateHp(opponent, o);
        rpg.fn.wonBattle();
        removeHero(opponent);
        // Return false to stop function
        return false;
      // Else if player's HP is less than or equal to zero, set to zero, call lostBattle function and remove character
      } else {
        // Update opponent's HP before checking next condition
        o.healthPts -= p.attackPower;
        rpg.fn.updateHp(opponent, o);
        if ((p.healthPts - o.counterPower) <= 0) {
          p.healthPts = 0;
          rpg.fn.updateHp(player, p);
          rpg.fn.lostBattle();
          removeHero(player);
          // Return false to stop function
          return false;
        // If neither of the above conditions are met, update player's HP and increase player's attack power
        } else {
          p.healthPts -= o.counterPower;
          p.attackPower += p.attackPwrInc;
        }
      }
      // Function calls to update each heroes' health meter
      rpg.fn.updateHp(player, p);
      rpg.fn.updateHp(opponent, o);
    },
    // Function to turn off attack click event, update win count, clear stored opponent values and update message and button text depending on whether or not all opponents have been defeated 
    wonBattle: function () {
      $btn.off().css('cursor', 'default');
      rpg.winCnt++;
      rpg.oppSelect = "";
      rpg.oppTeam = "";
      if (rpg.winCnt === 3) {
        rpg.fn.setText(5, 4);
      } else {
        rpg.fn.setText(3, 1);
      }
    },
    // Function to turn off attack click event and update message and button text, stating player had lost the game
    lostBattle: function () {
      $btn.off().css('cursor', 'default');
      rpg.fn.setText(4, 3);
    },
    // Function to reset game if player chooses to play again
    setupGame: function () {
      // Reset message and button text
      rpg.fn.setText(0, 0);
      // Remove heroes stored as player and opponent
      rpg.charSelect = "";
      rpg.oppSelect = "";
    }
  }
};

// Click function the event that handles player and opponent selections based on game progress
$heroes.click( function() {
  let $this = $(this);
  let charSide = function () {
    // Call function to position heroes selected based on team
    if ($this.data("team") === 'blue') {
      animateChar($this, 'left');
    } else {
      animateChar($this, 'right');
    }
  };
  // Nested function to update player and opponent within the game object
  let assign = function (hero, team) {
    rpg[hero] = $this.data("hero");
    rpg[team] =  $this.data("team");
    // Add active class to heroes selected for displaying health meter
    $this.addClass('active');
  };
  // Add hero as player's character if one has not been selected yet
  if (rpg.charSelect === "") {
    charSide();
    assign('charSelect', 'charTeam');
    // Update message and button text, notifying player to selet an opponent 
    rpg.fn.setText(1, 1);
  // Else, add hero as opponent if player has selected a hero, but only if from the opposing team
  } else if (rpg.oppSelect === "" && $this.data("team") !== rpg.charTeam) {
    charSide();
    assign('oppSelect', 'oppTeam');
    $btn.css('cursor', 'crosshair');
    // Update message and button text, notifying player to press the attack button to do battle
    rpg.fn.setText(2, 2);
    // Call attackEvent to bind click event for attack function
    rpg.fn.attackEvent();
  }
});

// Function to slide the heroes to the center of the screen to faceoff
let animateChar = function (element, side) {
  let topPos = '31.5%';
  let sidePos = '24%';
  element.animate({
    top: topPos,
    [side]: sidePos
  }, 'slow').css({
    'bottom': 'auto',
    // To make sure the selected hero is in the forefront
    'z-index': '10'
  });
};

// Function to fade out whichever hero losses the battle
let removeHero = function (hero) {
  $('main').find(`[data-hero="${hero}"]`).fadeOut('slow');
};

// Call setupGame function to initialize the next game
rpg.fn.setupGame();

// Start trailer music when window is done loading
$(window).on("load", function () {
  $('#trailer').get(0).play();
});