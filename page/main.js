var data  = {
    games: [],
};
var vue_app = new Vue({
    el: '#app',
    data: data
});
function onGamesData(games) {
    data.games = games
}
