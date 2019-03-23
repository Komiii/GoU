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

var circles = [];
var xClick;
var yClick;

function circle(ctx, x, y, hour, day) {
	ctx.beginPath();
	ctx.arc(x + CIRCLE_DIAMETER / 2, y + CIRCLE_DIAMETER / 2, CIRCLE_DIAMETER / 2, 0, 2 * Math.PI);
	ctx.fill();
	
	circles.push([x + CIRCLE_DIAMETER / 2, y + CIRCLE_DIAMETER / 2, hour, day]);
}
function text(ctx, text, x, y) {
    ctx.fillStyle = '#fefefe';
    ctx.font = "20px Arial";
	ctx.fillText(text, x + CIRCLE_DIAMETER / 2, y + CIRCLE_DIAMETER / 2);
}


var colors = {
	selected: '#00838f',
	selectedGap: '#b0bec5',
}

function compareDist(a,b){
	return (Math.pow(a[0]-xClick,2)+Math.pow(a[1]-yClick,2))-(Math.pow(b[0]-xClick,2)+Math.pow(b[1]-yClick,2))
}


function setupCanvas(game) {
	var cnv = document.getElementsByClassName('canvas-picker')[0];
	var ctx = cnv.getContext('2d');
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	for(var i = 0; i <= /* or < ??? */ 24; i += 2) {
		ctx.fillStyle = colors.selected;
		circle(ctx, 
			i/2 * (CIRCLE_DIAMETER + GAP_WIDTH) + GAP_WIDTH/2,
			VERTICAL_GAP_HEIGHT/2, i/2, 0); //DODAĆ DZIEŃ
		text(ctx, i + ':00',
			i/2 * (CIRCLE_DIAMETER + GAP_WIDTH) + GAP_WIDTH/2,
			VERTICAL_GAP_HEIGHT/2);
	}
	cnv.addEventListener('click',function(event) {
		xClick=event.pageX;
		yClick=event.pageY;
		circles.sort(compareDist);
		console.log(circles[0]);
		console.log(xClick,yClick);
    });
}

function onGamesData(games) {
    data.games = games;
}
