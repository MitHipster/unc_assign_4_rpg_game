/*jslint esversion: 6, browser: true*/
/*global window, console, $, jQuery, alert*/

const $heroes = $('.hero-container');
const hpClass = ".hp-value";

let rpg = {
  charSelect: false,
  oppSelect: false,
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
  instructIndex: 0,
  instructSet: ["Click on a hero to be your player."]
};

let setupGame = function () {
  $.each(rpg.characters, function(character, obj) {
    console.log($('main').find(`[data-hero="${character}"] ${hpClass}`).text(obj.healthPts + "pts"));
  });
};

$heroes.click( function() {
  if ($(this).hasClass('team-blue')) {
    animateChar($(this), 'left');
  } else {
    animateChar($(this), 'right');
  }
});

let animateChar = function (element, side) {
  let pos = '25%';
  element.animate({
    top: pos,
    [side]: pos
  }, 'slow').css('bottom', 'auto');
};

setupGame();