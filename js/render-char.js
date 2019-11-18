var N64 = 'n64';
var MELEE = 'melee';
var BRAWL = 'brawl';
var PM = 'PM';
var WIIU = 'wiiu';
var ULT = 'ult';

function createStocksGrid(game, player) {
    var chars;
    switch (game) {
        case N64:
            chars = n64;
            break;
        case MELEE:
            chars = melee;
            break;
        case BRAWL:
            chars = brawl;
            break;
        case PM:
            chars = pm;
            break;
        case WIIU:
            chars = wiiu;
            break;
        case ULT:
            chars = ult;
            break;
        default:
    }

    var stocksId = document.getElementById('stocks-' + player);
    // -- reset stocks lorsque l'on change de jeu
    while (stocksId.firstChild) {
        stocksId.removeChild(stocksId.firstChild);
    }

    $.each(chars, function (i, row) {
        var rowHTML = createRow(game, player, row);
        stocksId.append(rowHTML)
    });

    // listener sur stock icons
    var stocks = document.getElementsByClassName('stocks ' + player);
    for (var i = 0; i < stocks.length; i++)(function (i) {
        stocks[i].onclick = function () {
            var divColor = document.querySelector('#' + player + '-00');

            // delete la classe sur les autres divs
            removeClasse('stocks ' + player, 'selected');
            // toggle classe pour garder border actif
            this.classList.toggle('selected')

            // on met la 1ere couleur par defaut
            setImgChar(game, player, '00', '0', stocks[i].id);
            // on modifie les icones couleurs du perso
            setStockColor(game, player, stocks[i].id);
        };
    })(i);

    // init stock color
    var stocksColor = document.getElementById('color-char-' + player);
    while (stocksColor.firstChild) {
        stocksColor.removeChild(stocksColor.firstChild);
    }

    // TODO a revoir
    // select par defaut DK vs Mario 
    var rand = Math.floor(Math.random() * 5)
    var rand2 = Math.floor(Math.random() * 5)
    if (player == 'j1') {
        setImgChar(game, player, pad(rand, 2), '0', 'donkey');
        parseStocksJSON(game, 'donkey', player)
    } else {
        setImgChar(game, player, pad(rand2, 2), '0', 'mario');
        parseStocksJSON(game, 'mario', player)
    }
}

function createRow(game, player, persos) {
    var rowHTML = document.createElement('div');
    rowHTML.classList.add('row');

    $.each(persos, function (j, perso) {
        var infos = perso.split('_');
        perso = infos[0];

        if (perso == 'reserved')
            rowHTML.append(createStockReserved())
        else
            rowHTML.append(createStockIcon(game, perso, player));
    });

    return rowHTML;
}

function setStockColor(game, player, name) {
    parseStocksJSON(game, name, player)
}

function setImgChar(game, player, idColor, idRow, name) {
    var src = 'img/char/' + game + '/';
    var stockname = name;

    stockname = stockname + '_' + idColor + '_' + idRow;

    src = src + stockname;
    document.getElementById("char-" + player).src = src + '.png';
}

function createStockIcon(game, charName, player) {
    //    console.log(game + ', ' + charName + ', ' + player)
    var file = charName;
    file += '_00';

    var img = document.createElement('img');
    var imgSrc = 'img/stock/' + game + '/' + file + '_0.png';

    //    img.setAttribute('data-nbRow', nbRow);
    img.src = imgSrc;
    img.id = charName;
    img.classList.add('stocks');
    img.classList.add(player);

    return img;
}

function createStockColor(game, charName, player, idColor) {
    var file = charName + '_' + idColor + '_0.png';

    var img = document.createElement('img');
    var imgSrc = 'img/stock/' + game + '/' + file;

    img.setAttribute('data-char', charName);
    img.src = imgSrc;
    img.id = player + idColor;
    img.classList.add('color-stocks');
    img.classList.add(player);
    return img;
    //    <img class="color-stocks j1" data-char="link" id="j1-00" src="img/stock/ult/link_00_0.png">
    //    <img class="color-stocks j1" data-char="link" id="j1-01" src="img/stock/ult/link_01_0.png">
    //    <img class="color-stocks j1 selected" data-char="link" id="j1-02" src="img/stock/ult/link_02_0.png">
    //    <img class="color-stocks j1" data-char="link" id="j1-03" src="img/stock/ult/link_03_0.png">
    //    <img class="color-stocks j1" data-char="link" id="j1-04" src="img/stock/ult/link_04_0.png">
    //    <img class="color-stocks j1" data-char="link" id="j1-05" src="img/stock/ult/link_05_0.png">
    //    <img class="color-stocks j1" data-char="link" id="j1-06" src="img/stock/ult/link_06_0.png">
    //    <img class="color-stocks j1" data-char="link" id="j1-07" src="img/stock/ult/link_07_0.png">
}
