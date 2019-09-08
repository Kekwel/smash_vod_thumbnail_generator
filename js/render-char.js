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

    // TODO reset stocks lorsque l'on change de jeu

    $.each(chars, function (i, row) {
        $.each(row, function (j, perso) {
            if (perso == 'reserved')
                document.getElementById('stocks-' + player).append(createStockReserved())
            else
                document.getElementById('stocks-' + player).append(createStockIcon(game, perso, player));
        });
    });
}


function setStockColor(game, player, name) {
    var i;
    for (i = 0; i < 8; i++) {
        var divColor = document.querySelector('#' + player + '-0' + i);
        var src = 'img/stock/' + game + '/';
        // TODO recup indice ligne

        //        if (name.includes('mii')) {
        //            src += name + '_00_0.png';
        //        } else {
        src += name + '_0' + i + '_0.png';
        //        }

        // TODO test si src existe
        divColor.dataset.char = name;
        divColor.src = src;
    }
}

function setImgChar(game, player, idColor, name) {
    var src = 'img/char/' + game + '/';
    var stockname = name + '_';

    //    if (name.includes('mii')) {
    //        // TODO autre mii ?
    //        stockname = name + '_00';
    //    } else {
    stockname = stockname + idColor;
    //    }

    // TODO indice ligne (le '_0')
    src = src + stockname;
    document.getElementById("char-" + player).src = src + '_0.png';
}

function createStockIcon(game, charName, player) {
    var file = charName;
    file += '_00';

    var img = document.createElement('img');
    var imgSrc = 'img/stock/' + game + '/' + file + '_0.png';

    img.src = imgSrc;
    img.id = charName;
    img.classList.add('stocks');
    img.classList.add(player);

    return img;
}
