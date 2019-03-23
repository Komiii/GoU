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

function setupCanvas(game) {
	console.log(game);
	var cnv = document.getElementsByClassName('canvas-picker')[0];
	var ctx = cnv.getContex("2d");
	ctx.beginPath();
}

function onGamesData(games) {
    data.games = games;
}
