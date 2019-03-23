var data  = {
    games: [],
    seen: null,
    search: '',
};
var vue_app = new Vue({
    el: '#app',
    data: data,
    methods: {
        gameClicked: function(game) {
			if(data.seen == game.id) {
				data.seen = null
			} else {
				data.seen = game.id; 
				setTimeout(function() {
					setupCanvas(game);
				}, 0);
			}
        }
    }
});

var GAP_WIDTH = 1080 / 80;
var CIRCLE_DIAMETER = (1080 - 13 * GAP_WIDTH) / 13;
var VERTICAL_GAP_HEIGHT = CIRCLE_DIAMETER / 7;

function circle(ctx, x, y) {
	ctx.beginPath();
	ctx.arc(x + CIRCLE_DIAMETER / 2, y + CIRCLE_DIAMETER / 2, CIRCLE_DIAMETER / 2, 0, 2 * Math.PI);
	ctx.fill();
}

function setupCanvas(game) {
	var cnv = document.getElementsByClassName('canvas-picker')[0];
	var ctx = cnv.getContext('2d');
	for(var i = 0; i <= /* or < ??? */ 24; i += 2) {
		circle(ctx, 
			i/2 * (CIRCLE_DIAMETER + GAP_WIDTH) + GAP_WIDTH/2,
			VERTICAL_GAP_HEIGHT/2);
	}
}

function onGamesData(games) {
    data.games = games;
}
