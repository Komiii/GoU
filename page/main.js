var data  = {
    games: [],
    seen: null,
    search: '',
};
var vue_app = new Vue({
    el: '#app',
    data: data
});

function onGamesData(games) {
    data.games = games;
}
