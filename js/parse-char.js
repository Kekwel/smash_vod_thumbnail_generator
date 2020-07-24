function randomCharName(game) {
    // char random
    var chars = getCharsGame(game);
    var randRow;
    while (typeof randRow === 'undefined') {
        randRow = chars[Math.floor(Math.random() * Object.keys(chars).length)];
    }
    var randChar = randRow[Math.floor(Math.random() * Object.keys(randRow).length)];

    // si 'reserved'
    while (randChar === 'reserved' || randChar === 'random') {
        randChar = randRow[Math.floor(Math.random() * Object.keys(randRow).length)];
    }

    return randChar;
}

function resetChar() {
    var games = document.getElementById('game_select');
    var game = games.value;

    randomChar(game, 'j1', 'char1');
    randomChar(game, 'j2', 'char1');

    if (document.getElementById('versus').style.display == 'none')
        document.getElementById('versus-visible').click();

    if (document.getElementById('phase').style.display == 'none')
        document.getElementById('phase_visible').click();
}

function randomChar(game, player, libChar) {
    var randChar = randomCharName(game);
    // color random
    var rand = Math.floor(Math.random() * 4);

    var pngChar = getPngChar(game, player, pad(rand, 2), '0', randChar);
    replaceImgChar(pngChar, libChar + '-' + player);

    randomBG(player, libChar);

    // CAS PARTICULIER
    if (game !== 'ult') {
        // reversed si J2
        if (player === 'j2') {
            document.getElementById('char1-j2').classList.add('reverse');
        }
    }
}

function randomBG(player, libChar) {
    var rand = Math.floor(Math.random() * 8) + 1;

    var bg = document.getElementById('div-' + player + '-' + libChar);
    for (var i = 0; i <= bg.classList.length; i++) {
        if (bg.classList[i] && bg.classList[i].startsWith('background')) {
            bg.classList.remove(bg.classList[i]);
        }
    }

    var newBg = 'background-' + player + '-' + rand;
    bg.classList.add(newBg);
}

function getSprites(game, charName) {
    // on recupere la variable dans sprites.json
    log('load ' + game + '_' + charName)
    var sprites = window[game + '_' + charName];
    return sprites;
}

function initStocksColor(game, charName, player, libChar, sprites) {
    var divColor = document.getElementById('color-char-' + game + '-' + player + '-' + libChar);

    while (divColor.firstChild) {
        divColor.removeChild(divColor.firstChild);
    }

    if (sprites) {
        for (var i = 0; i < sprites.length; i++)(function (i) {
            // créer la ligne
            var nbStock = sprites[i].length;
            var rowColor = createRowColor(game, player);
            divColor.append(rowColor);

            // rempli la ligne
            for (j = 0; j < nbStock; j++)(function (j) {
                var imgDiv = fetchStockIcon(game, charName, player, j, i);
                rowColor.append(imgDiv);

                // -- listener
                imgDiv.addEventListener('click', function () {
                    // -- SELECTED
                    removeClassByAttr('type', 'costume', 'selected');
                    imgDiv.classList.toggle('selected');

                    // -- set image CHAR
                    var pngChar = getPngChar(game, player, pad(j, 2), i, charName);
                    replaceImgChar(pngChar, libChar + '-' + player)

                    log('set char to ' + player + ', ' + libChar);
                });
            })(j);
        })(i);

        // init 1ere stock selected
        divColor.firstChild.firstChild.classList.add('selected')
    }
}

function parseStocksJSON(game, charName, player) {
    // on recupere la variable dans sprites.json
    var sprites = window[game + '_' + charName];
    var nbRows = sprites.length
    var stocksColor = document.getElementById('color-char-' + player);

    while (stocksColor.firstChild) {
        stocksColor.removeChild(stocksColor.firstChild);
    }

    for (var i = 0; i < nbRows; i++)(function (i) {
        var nbStock = sprites[i].length
        var rowColor = createRowColor(game, player)
        stocksColor.append(rowColor)

        for (j = 0; j < nbStock; j++)(function (j) {
            var imgDiv = fetchStockIcon(game, charName, player, j, i)
            rowColor.append(imgDiv)

            var classSelected = game + '-stock ' + player
            imgDiv.onclick = function () {
                // delete la classe sur les autres
                removeClasse(classSelected, 'selected')

                // toggle classe pour garder border actif
                imgDiv.classList.toggle('selected')

                // recup jeu
                var game = document.getElementById('game_select').value

                // met la couleur du perso sélectionné dans le thumbnail
                setImgChar(game, player, pad(j, 2), i, charName)
            };
        })(j);
    })(i);

    // init 1ere stock selected
    // TODO a revoir
    stocksColor.firstChild.firstChild.classList.add('selected')
}

function createRowColor(game, player) {
    var rowsHTML = document.createElement('div');
    rowsHTML.classList.add('rows-color');
    return rowsHTML;
}

function fetchStockIcon(game, charName, player, indStock, indRow) {
    var file = charName + '.png';
    indStock = pad(indStock, 2)

    var imgDiv = document.createElement('div');
    var imgSrc = 'img/stock/' + game + '/' + file;

    imgDiv.setAttribute('type', 'costume');
    imgDiv.style.backgroundImage = 'url(' + imgSrc + ')'
    //    imgDiv.style.backgroundRepeat = 'no-repeat'
    //    imgDiv.classList.add(charName)
    // charname_00_indRow
    var classPerso = game + '-stock_' + indStock + '_' + indRow
    imgDiv.classList.add(classPerso, game + '-stock')

    imgDiv.id = charName;
    imgDiv.classList.add(player);

    return imgDiv;
}


/* UTILS */
function pad(num, size) {
    var s = "000000000" + num;
    return s.substr(s.length - size);
}
