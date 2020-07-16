function playerToJson(player) {
    // Infos persos
    var tag = document.getElementById('name-' + player).innerHTML;
    var games = document.getElementById('game_select');
    var game = games.value;
    // TODO ajouter attribute ? ou decouper src
    var char = document.getElementById('char1-' + player).src;
    var costume = "00";
    var costumeRow = "0";
    // TODO recup secondary
    // Infos BG
    var bg = document.getElementById('div-' + player + 'char1');
    // TODO recup numero bg
    // TODO pic ?
    // TODO recup si extend / repeat via class

    // TODO save en local ?
    //    var playerJson = '{"tag":"' + tag + '"}'
    var playerJson = {
        tag: tag,
        game: game,
        char: char,
        costume: costume,
        costumeRow: costumeRow
    };
    localStorage[player] = JSON.stringify(playerJson);
}
