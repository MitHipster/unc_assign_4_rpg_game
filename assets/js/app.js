/*jslint esversion: 6, browser: true*/
/*global window, console, $, jQuery, alert*/

const $heroes = $('.hero-container');
const $btn = $('#attack-btn');
const $btnText = $('#attack-btn span');
const $message = $('#message');
const hpValue = '.hp-value';
const hpWidth = 180;

let rpg = {
  charSelect: "",
  charTeam: "",
  oppSelect: "",
  oppTeam: "",
  winCnt: 0,
  characters: {
    captainAmerica: {
      healthPts: 150,
      healthPtsMax: 150,
      attackPower: 9,
      attackPwrInc: 9,
      counterPower: 20,
      team: 'blue'
    },
    ironMan: {
      healthPts: 170,
      healthPtsMax: 170,
      attackPower: 10,
      attackPwrInc: 10,
      counterPower: 25,
      team: 'red'
    },
    scarletWitch: {
      healthPts: 150,
      healthPtsMax: 150,
      attackPower: 9,
      attackPwrInc: 9,
      counterPower: 20,
      team: 'blue'
    },
    vision: {
      healthPts: 170,
      healthPtsMax: 170,
      attackPower: 10,
      attackPwrInc: 10,
      counterPower: 25,
      team: 'red'
    },
    falcon: {
      healthPts: 120,
      healthPtsMax: 120,
      attackPower: 7,
      attackPwrInc: 7,
      counterPower: 15,
      team: 'blue'
    },
    blackWidow: {
      healthPts: 110,
      healthPtsMax: 110,
      attackPower: 6,
      attackPwrInc: 6,
      counterPower: 20,
      team: 'red'
    }
  },
  messages: [
    "Select a hero to be your player.",
    "Pick an opponent to battle from the opposing team.",
    "Press attack to battle your opponent.",
    "You won the battle. Pick a new opponent from the opposing team.",
    "You lost the battle. Refresh the page to play again.",
    "Congratulations. You have defeated all your opponents."
  ],
  button: ["Select", "Versus", "Attack", "Defeat", "Victory"],
  fn: {
    attackEvent: function () {
      $btn.on('click', function () {
        rpg.fn.updateBattle(rpg.charSelect, rpg.oppSelect);
      });
    },
    setText: function (message, button) {
      $message.text(rpg.messages[message]);
      $btnText.text(rpg.button[button]);
    },
    updateHp: function (char, obj) {
      let width = (obj.healthPts / obj.healthPtsMax) * hpWidth;
      $(`[data-hero="${char}"].active`).find(hpValue).css('width', width + 'px');
    },
    updateBattle: function (player, opponent) {
      let p = rpg.characters[player];
      let o = rpg.characters[opponent];
      if ((o.healthPts - p.attackPower) <= 0) {
        o.healthPts = 0;
        rpg.fn.updateHp(opponent, o);
        rpg.fn.wonBattle();
        removeHero(opponent);
        return false;
      } else {
        o.healthPts -= p.attackPower;
        if ((p.healthPts - o.counterPower) <= 0) {
          p.healthPts = 0;
          rpg.fn.updateHp(player, p);
          rpg.fn.lostBattle();
          removeHero(player);
          return false;
        } else {
          p.healthPts -= o.counterPower;
          p.attackPower += p.attackPwrInc;
        }
      }
      rpg.fn.updateHp(player, p);
      rpg.fn.updateHp(opponent, o);
    },
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
    lostBattle: function () {
      $btn.off().css('cursor', 'default');
      rpg.fn.setText(4, 3);
    }
  }
};

let setupGame = function () {
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
    $this.addClass('active');
  };
  if (rpg.charSelect === "") {
    charSide();
    assign('charSelect', 'charTeam');
    rpg.fn.setText(1, 1);
  } else if (rpg.oppSelect === "" && $this.data("team") !== rpg.charTeam) {
    charSide();
    assign('oppSelect', 'oppTeam');
    $btn.css('cursor', 'crosshair');
    rpg.fn.setText(2, 2);
    rpg.fn.attackEvent();
  }
});

let animateChar = function (element, side) {
  let topPos = '31.5%';
  let sidePos = '24%';
  element.animate({
    top: topPos,
    [side]: sidePos
  }, 'slow').css({
    'bottom': 'auto',
    'z-index': '10'
  });
};

let removeHero = function (hero) {
  $('main').find(`[data-hero="${hero}"]`).fadeOut('slow');
};

setupGame();