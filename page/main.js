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
    ctx.font = "20px Arial";
	ctx.fillText(text, x + CIRCLE_DIAMETER / 2, y + CIRCLE_DIAMETER / 2);
}


var colors = {
	selectedEnd: {
        bg: '#00838f',
        text: '#fefefe',
    },
	selectedGap: {
        bg: '#b0bec5',
        text: '#050505',
    },
    selectedMiddle: {
        bg: '#29b6f6',
        text: '#050505',
    },
    free: {
        bg: '#f5f5f5',
        text: '#050505',
    },
}

var days = ["Pon.","Wt.","Śrd.","Czw.","Pt.","Sob.","Ndz."];

var state;
function onClick(row, column) {
    console.log(column, row);
    var id = getId(column, row);
    if(id < state.selectionStart) {
        state.selectionStart = id;
    } else if(id > state.selectionEnd) {
        state.selectionEnd = id;
    } else if(Math.abs(id - state.selectionEnd) < Math.abs(id - state.selectionStart)) {
        state.selectionEnd = id;
    } else if(Math.abs(id - state.selectionEnd) > Math.abs(id - state.selectionStart)) {
        state.selectionStart = id;
    } else {
        state[Math.random() > 0.5 ? 'selectionStart' : 'selectionEnd'] = id;
    }

    setupCanvas(state.game, state);
}

function getColors(id) {
    if(id == state.selectionStart || id == state.selectionEnd) {
        return colors.selectedEnd;
    } else if(id > state.selectionStart && id < state.selectionEnd) {
        return colors.selectedMiddle;
    } else {
        return colors.free;
    }
}

function getColorsBetween(id1, id2) {
    if(state.selectionStart <= id1 && state.selectionEnd >= id2)
        return colors.selectedGap;
    else return colors.free;
}

function getId(y, x) {
    return 13 * y + x;
}

function setupCanvas(game, _state) {
    circles = [];
    state = _state || { selectionStep: false, selectionStart: getId(1,1), selectionEnd: getId(2,2), game: game };

	var cnv = document.getElementsByClassName('canvas-picker')[0];
	cnv.height = 7*(CIRCLE_DIAMETER+VERTICAL_GAP_HEIGHT);
	var ctx = cnv.getContext('2d');
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	for(var j = 0; j<7;j++){
		text(ctx,days[((new Date().getDay())+j+6)%7], GAP_WIDTH/2,
				(1/2+j)*VERTICAL_GAP_HEIGHT+j*CIRCLE_DIAMETER);
		for(var i = 0; i <= /* or < ??? */ 24; i += 2) {
		    var curColors = getColors(getId(j, i/2));
		    var curColorsBetween = getColorsBetween(getId(j, i/2), getId(j, i/2) + 1);
			ctx.fillStyle = curColors.bg;
			circle(ctx, 
				(i/2+1) * (CIRCLE_DIAMETER + GAP_WIDTH) + GAP_WIDTH/2,
				(1/2+j)*VERTICAL_GAP_HEIGHT+j*CIRCLE_DIAMETER, i/2, j);
			ctx.fillStyle = curColors.text;
			text(ctx, i + ':00',
				(i/2+1) * (CIRCLE_DIAMETER + GAP_WIDTH) + GAP_WIDTH/2,
				(1/2+j)*VERTICAL_GAP_HEIGHT+j*CIRCLE_DIAMETER);


			// for next text() above this loop
			ctx.fillStyle = curColorsBetween.text;
		}
	}
	cnv.onclick = function(event) {
        var b = cnv.getBoundingClientRect();
        var scale = cnv.width / parseFloat(b.width);
        var xClick = (event.clientX - b.left) * scale;
        var yClick = (event.clientY - b.top) * scale;
        function compareDist(a, b) {
            return (Math.pow(a[0]-xClick,2)+Math.pow(a[1]-yClick,2))-(Math.pow(b[0]-xClick,2)+Math.pow(b[1]-yClick,2))
        }
		circles.sort(compareDist);
		onClick(circles[0][2], circles[0][3]);
    };
}

function onGamesData(games) {
    data.games = games;
}
