var N64 = 'n64';
var MELEE = 'melee';
var BRAWL = 'brawl';
var PM = 'PM';
var PPLUS = 'pplus';
var WIIU = 'wiiu';
var ULT = 'ult';
// ---
var ROA = 'roa';

function getCharsGame(game) {
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
        case PPLUS:
            chars = pplus;
            break;
        case WIIU:
            chars = wiiu;
            break;
        case ULT:
            chars = ult;
            break;
        case ROA:
            chars = roa;
            break;
        default:
    }
    return chars;
}

function createStockGrid(game, player, libChar) {
    log('Création grid stock ' + game + ', ' + player + ', ' + libChar)
    var chars = getCharsGame(game);

    var stockDiv = document.createElement('div');
    stockDiv.classList.add('panel-color', 'select-char');
    stockDiv.id = 'stocks-' + player + '-' + libChar;

    $.each(chars, function (i, row) {
        var rowHTML = createRow(game, player, row, libChar);

        var stocks = rowHTML.children;
        for (var i = 0; i < stocks.length; i++) {
            var stock = stocks[i];

            stock.addEventListener('click', function (e) {
                var stockCrt = e.target || e.srcElement;
                var charName = stockCrt.id;

                // -- SELECTED
                removeClassByAttr('type', 'stock', 'selected');
                stockCrt.classList.toggle('selected');

                // -- set image CHAR
                var pngChar = getPngChar(game, player, '00', '0', charName);
                replaceImgChar(pngChar, libChar + '-' + player)

                // -- set image COSTUMES
                var sprites = getSprites(game, charName)
                initStocksColor(game, charName, player, libChar, sprites);
            });
        }
        stockDiv.append(rowHTML);
    });

    // listener sur stock icons
    //    var stocks = document.getElementsByClassName('stocks ' + player);
    //    for (var i = 0; i < stocks.length; i++)(function (i) {
    //        stocks[i].onclick = function () {
    //            var divColor = document.querySelector('#' + player + '-00');
    //
    //            // on met la 1ere couleur par defaut
    //            setImgChar(game, player, '00', '0', stocks[i].id);
    //            // on modifie les icones couleurs du perso
    //            setStockColor(game, player, stocks[i].id);
    //        };
    //    })(i);

    return stockDiv;
}

function createStocksGrid(game, player) {
    var chars = getCharsGame(game);

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

function createRow(game, player, persos, libChar) {
    var rowHTML = document.createElement('div');
    rowHTML.classList.add('row');

    $.each(persos, function (j, perso) {
        var infos = perso.split('_');
        perso = infos[0];

        if (perso == 'reserved')
            rowHTML.append(createStockReserved())
        else
            rowHTML.append(createStockIcon(game, perso, player, libChar));
    });

    return rowHTML;
}

function setStockColor(game, player, name) {
    parseStocksJSON(game, name, player)
}

function getPngChar(game, player, idColor, idRow, name) {
    var src = 'img/char/' + game + '/';
    var stockname = name;

    stockname = stockname + '_' + idColor + '_' + idRow;

    src = src + stockname;

    return src + '.png';
}

function setImgChar(game, player, idColor, idRow, name) {
    var src = 'img/char/' + game + '/';
    var stockname = name;

    stockname = stockname + '_' + idColor + '_' + idRow;

    src = src + stockname;

    document.getElementById("char-" + player).src = src + '.png';
}

function createStockIcon(game, charName, player, libChar) {
    //    console.log(game + ', ' + charName + ', ' + player)
    var file = charName;
    file += '_00';

    var img = document.createElement('img');
    var imgSrc = 'img/stock/' + game + '/' + file + '_0.png';

    //    img.setAttribute('data-nbRow', nbRow);
    img.setAttribute('type', 'stock');
    img.setAttribute('player', player);
    img.setAttribute('libChar', libChar);
    img.src = imgSrc;
    img.id = charName;
    img.classList.add('stocks', player);

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
