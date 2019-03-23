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
var CIRCLE_DIAMETER = (1080 - 14 * GAP_WIDTH) / 14;
var VERTICAL_GAP_HEIGHT = CIRCLE_DIAMETER / 7;

var circles = [];

function circle(ctx, x, y, hour, day) {
	ctx.beginPath();
	ctx.arc(x + CIRCLE_DIAMETER / 2, y + CIRCLE_DIAMETER / 2, CIRCLE_DIAMETER / 2, 0, 2 * Math.PI);
	ctx.fill();
	
	circles.push([x + CIRCLE_DIAMETER / 2, y + CIRCLE_DIAMETER / 2, hour, day]);
}
function text(ctx, text, x, y) {
    ctx.fillStyle = '#000000';
    ctx.font = "20px Arial";
	ctx.fillText(text, x + CIRCLE_DIAMETER / 2, y + CIRCLE_DIAMETER / 2);
}


var colors = {
	selected: '#00838f',
	selectedGap: '#b0bec5',
}

var days = ["Pon.","Wt.","Śrd.","Czw.","Pt.","Sob.","Ndz."];

var canvasState;
function onClick(column, row) {
    console.log(column, row);
}

function setupCanvas(game) {
    circles = [];
    canvasState = { selectionStep: 0 };

	var cnv = document.getElementsByClassName('canvas-picker')[0];
	cnv.height = 7*(CIRCLE_DIAMETER+VERTICAL_GAP_HEIGHT);
	var ctx = cnv.getContext('2d');
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	for(var j = 0; j<7;j++){
		text(ctx,days[((new Date().getDay())+j-1)%7], GAP_WIDTH/2,
				(1/2+j)*VERTICAL_GAP_HEIGHT+j*CIRCLE_DIAMETER);
		for(var i = 0; i <= /* or < ??? */ 24; i += 2) {
			ctx.fillStyle = colors.selected;
			circle(ctx, 
				(i/2+1) * (CIRCLE_DIAMETER + GAP_WIDTH) + GAP_WIDTH/2,
				(1/2+j)*VERTICAL_GAP_HEIGHT+j*CIRCLE_DIAMETER, i/2, j);
			text(ctx, i + ':00',
				(i/2+1) * (CIRCLE_DIAMETER + GAP_WIDTH) + GAP_WIDTH/2,
				(1/2+j)*VERTICAL_GAP_HEIGHT+j*CIRCLE_DIAMETER);
		}
	}
	cnv.addEventListener('click',function(event) {
        var b = cnv.getBoundingClientRect();
        var scale = cnv.width / parseFloat(b.width);
        var xClick = (event.clientX - b.left) * scale;
        var yClick = (event.clientY - b.top) * scale;
        function compareDist(a, b) {
            return (Math.pow(a[0]-xClick,2)+Math.pow(a[1]-yClick,2))-(Math.pow(b[0]-xClick,2)+Math.pow(b[1]-yClick,2))
        }
		circles.sort(compareDist);
		onClick(circles[0][2], circles[0][3]);
    });
}

function onGamesData(games) {
    data.games = games;
}
