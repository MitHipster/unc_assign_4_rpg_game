/*jslint esversion: 6, browser: true*/
/*global window, console, $, jQuery, alert*/

let rpg = {
  charSelect: false,
  oppSelect: false,
  character: {
    captAmerica: {
      healthPts: 150,
      attackPower: 5,
      counterPower: 20,
      team: 'blue'
    },
    falcon: {
      healthPts: 120,
      attackPower: 3,
      counterPower: 15,
      team: 'blue'
    },
    ironMan: {
      healthPts: 170,
      attackPower: 6,
      counterPower: 25,
      team: 'red'
    },
    blackWidow: {
      healthPts: 110,
      attackPower: 4,
      counterPower: 20,
      team: 'red'
    }
  }
};

$('.hero-container').click( function() {
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