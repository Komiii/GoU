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
	console.log(document.getElementsByClassName('canvas-picker'));
}

function onGamesData(games) {
    data.games = games;
}
