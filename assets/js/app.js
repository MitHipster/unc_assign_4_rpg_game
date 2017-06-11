/*jslint esversion: 6, browser: true*/
/*global window, console, $, jQuery, alert*/

const $heroes = $('.hero-container');
const $btnText = $('#attack-btn span');
const $message = $('#message');
const hpClass = ".hp-value";

let rpg = {
  charSelect: "",
  charTeam: "",
  oppSelect: "",
  oppTeam: "",
  characters: {
    captainAmerica: {
      healthPts: 150,
      attackPower: 5,
      counterPower: 20,
      team: 'blue'
    },
    ironMan: {
      healthPts: 170,
      attackPower: 6,
      counterPower: 25,
      team: 'red'
    },
    falcon: {
      healthPts: 120,
      attackPower: 3,
      counterPower: 15,
      team: 'blue'
    },
    blackWidow: {
      healthPts: 110,
      attackPower: 4,
      counterPower: 20,
      team: 'red'
    }
  },
  messageIndex: 0,
  messages: ["Click a hero to be your player.", "Select an opponent to battle from the other team.", "Press attack to battle your opponent."],
  btnText: ["Select", "Versus", "Attack"]
};

let setupGame = function () {
  $.each(rpg.characters, function(character, obj) {
    $('main').find(`[data-hero="${character}"] ${hpClass}`).text(obj.healthPts);
  });
  $message.text(rpg.messages[0]);
  rpg.charSelect = "";
  rpg.oppSelect = "";
};

$heroes.click( function() {
  let $this = $(this);
  let charSide = function () {
    if ($this.data("team") === 'blue') {
      animateChar($this, 'left');
    } else {
      animateChar($this, 'right');
    }
  };
  let assign = function (hero, team) {
    rpg[hero] = $this.data("hero");
    rpg[team] =  $this.data("team");
  };
  if (rpg.charSelect === "") {
    assign('charSelect', 'charTeam');
    charSide();
    $message.text(rpg.messages[1]);
    $btnText.text(rpg.btnText[1]);
  } else if (rpg.oppSelect === "" && $this.data("team") !== rpg.charTeam) {
    assign('oppSelect', 'oppTeam');
    charSide();
    $message.text(rpg.messages[2]);
    $btnText.text(rpg.btnText[2]).css('cursor', 'pointer').prop('disabled', false);
  }
});

let animateChar = function (element, side) {
  let topPos = '28%';
  let sidePos = '24%';
  element.animate({
    top: topPos,
    [side]: sidePos
  }, 'slow').css('bottom', 'auto');
};

setupGame();