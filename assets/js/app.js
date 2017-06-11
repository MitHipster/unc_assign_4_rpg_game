/*jslint esversion: 6, browser: true*/
/*global window, console, $, jQuery, alert*/

const $heroes = $('.hero-container');
const $btn = $('#attack-btn');
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
      attackPower: 9,
      attackPwrInc: 9,
      counterPower: 20,
      team: 'blue'
    },
    ironMan: {
      healthPts: 170,
      attackPower: 10,
      attackPwrInc: 10,
      counterPower: 25,
      team: 'red'
    },
    falcon: {
      healthPts: 120,
      attackPower: 7,
      attackPwrInc: 7,
      counterPower: 15,
      team: 'blue'
    },
    blackWidow: {
      healthPts: 110,
      attackPower: 6,
      attackPwrInc: 6,
      counterPower: 20,
      team: 'red'
    }
  },
  messages: ["Click a hero to be your player.", "Select an opponent to battle from the other team.", "Press attack to battle your opponent."],
  button: ["Select", "Versus", "Attack"],
  fn: {
    attack: function (player, opponent) {
      $btn.on('click', function () {
        let p = rpg.characters[player];
        let o = rpg.characters[opponent];
        o.healthPts -= p.attackPower;
        p.healthPts -= o.counterPower;
        p.attackPower += p.attackPwrInc;
        rpg.fn.updateHp(player, p);
        rpg.fn.updateHp(opponent, o);
      });
    },
    setText: function (message, button) {
      $message.text(rpg.messages[message]);
      $btnText.text(rpg.button[button]);
    },
    updateHp: function (char, obj) {
      $('main').find(`[data-hero="${char}"] ${hpClass}`).text(obj.healthPts);
    }
  }
};

let setupGame = function () {
  $.each(rpg.characters, function(char, obj) {
    rpg.fn.updateHp(char, obj);
  });
  rpg.fn.setText(0, 0);
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
    rpg.fn.setText(1, 1);
  } else if (rpg.oppSelect === "" && $this.data("team") !== rpg.charTeam) {
    assign('oppSelect', 'oppTeam');
    charSide();
    rpg.fn.setText(2, 2);
    $btn.css('cursor', 'crosshair');
    rpg.fn.attack(rpg.charSelect, rpg.oppSelect);
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