var data  = {
    games: [],
};
var vue_app = new Vue({
    el: '#app',
    data: data
});
var vue_wrap = new Vue({
	el:'#another-card',
	data:{ seen:true }
})
function onGamesData(games) {
    data.games = games
}
