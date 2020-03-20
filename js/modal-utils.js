function showModalChar(player) {
    document.getElementById('dialog-char-' + player).showModal();
}

var charDialog;

/* player : 'j1' ou 'j2'
    libChar : 'char1', 'char2'
*/
function createModalChar(game, player, libChar) {
    var idDialog = game + '-' + player + '-' + libChar;

    // si la modal existe déjà
    if (document.getElementById(idDialog)) {
        log('modal déjà construite')
        //        document.getElementById(idDialog).hidden = false;
        document.getElementById(idDialog).showModal();
    } else {
        charDialog = document.createElement('dialog');
        charDialog.id = idDialog;
        charDialog.classList.add('nes-dialog', 'is-dark', 'dialog-' + player);

        // Couleurs fond
        createFondColor(player, libChar);

        /* Dans un form */
        // Personnages & Costumes
        createCharacters(game, player, libChar);

        // Boutons
        var divMenu = document.createElement('div');
        var menu = document.createElement('menu');
        menu.classList.add('dialog-menu');

        var okBtn = document.createElement('button');
        okBtn.innerHTML = "OK";
        okBtn.classList.add('nes-btn', 'is-success', 'center');
        okBtn.addEventListener('click', function () {
            log('hop hop on ferme');
            // TODO recup la bonne dialog
            //            charDialog.close();
            document.getElementById(idDialog).close();
        });

        // -- on ajoute le tout
        menu.appendChild(okBtn);
        divMenu.appendChild(menu);
        charDialog.appendChild(divMenu);

        // TODO
        document.body.appendChild(charDialog);
        charDialog.showModal();
    }
}

function createFondColor(player, libChar) {
    var titreFond = document.createElement('p');

    var resetBtn = document.createElement('button');
    resetBtn.classList.add('nes-btn', 'is-warning', 'icons-only');
    resetBtn.addEventListener('click', function () {
        // TODO
        log('reset background ' + player + ', ' + libChar);
        // reset('j1')
    });

    var iconX = document.createElement('i');
    iconX.classList.add('nes-icon', 'close', 'is-small');

    var mainDiv = document.createElement('div');
    mainDiv.classList.add('panel-color');

    var formColor = document.createElement('form');
    formColor.id = 'form_background_color_' + player + '_' + libChar;
    formColor.setAttribute('name', 'form_background_color_' + player + '_' + libChar);

    // couleurs "primaires"
    var primaryColor = document.createElement('div');
    primaryColor.classList.add('primary-color');

    var color1 = createlabelColor('1', player, libChar);
    var color2 = createlabelColor('2', player, libChar);
    var color3 = createlabelColor('3', player, libChar);
    var color4 = createlabelColor('4', player, libChar);
    var color5 = createlabelColor('5', player, libChar);
    var color6 = createlabelColor('6', player, libChar);
    var color7 = createlabelColor('7', player, libChar);
    var color8 = createlabelColor('8', player, libChar);

    primaryColor.appendChild(color1);
    primaryColor.appendChild(color2);
    primaryColor.appendChild(color3);
    primaryColor.appendChild(color4);
    primaryColor.appendChild(color5);
    primaryColor.appendChild(color6);
    primaryColor.appendChild(color7);
    primaryColor.appendChild(color8);

    // Autres couleurs
    var otherColor = document.createElement('div');

    var color0 = createlabelColor('0', player, libChar);
    var color999 = createlabelColor('999', player, libChar);

    otherColor.appendChild(color0);
    otherColor.appendChild(color999);

    // Upload background
    var uploadDiv = document.createElement('div');
    uploadDiv.classList.add('select_logos');
    uploadDiv.id = 'select_bg_j1'; // TODO

    var choixImageLabel = document.createElement('label');
    choixImageLabel.setAttribute('for', 'bg1_file');
    choixImageLabel.classList.add('label-upload');

    var iconPJ = document.createElement('i');
    iconPJ.classList.add('material-icons');
    iconPJ.innerHTML = 'attachment';

    choixImageLabel.appendChild(iconPJ);
    choixImageLabel.appendChild(document.createTextNode(' Ou choisir une image ...'));

    var inputBGFile = document.createElement('input');
    inputBGFile.id = 'bg1_file'; // TODO
    inputBGFile.setAttribute('type', 'file');
    inputBGFile.addEventListener('change', function () {
        // TODO
        log('set custom background ' + player + ', ' + libChar);
        // setBackground('j1', 'bg1_file')
    });
    inputBGFile.setAttribute('accept', 'image/*');

    uploadDiv.appendChild(choixImageLabel);
    uploadDiv.appendChild(inputBGFile);

    // Choix background
    var choixDiv = document.createElement('div');

    // -- Extend
    var labelExtend = document.createElement('label');
    labelExtend.classList.add('choix-bg');

    var inputExtend = document.createElement('input');
    inputExtend.setAttribute('type', 'checkbox');
    inputExtend.classList.add('nes-checkbox');
    inputExtend.addEventListener('change', function () {
        // TODO
        log('toggle extend custom background ' + player + ', ' + libChar);
        // toggleBackgroundSize('j1')
    });

    var spanExtend = document.createElement('span');
    spanExtend.innerHTML = 'Etendre';

    // -- Repeat
    var labelRepeat = document.createElement('label');
    labelRepeat.classList.add('choix-bg');

    var inputRepeat = document.createElement('input');
    inputRepeat.setAttribute('type', 'checkbox');
    inputRepeat.classList.add('nes-checkbox');
    inputRepeat.addEventListener('change', function () {
        // TODO
        log('toggle repeat custom background ' + player + ', ' + libChar);
        // toggleRepeatBackground('j1')
    });
    inputRepeat.checked = true;

    var spanRepeat = document.createElement('span');
    spanRepeat.innerHTML = 'Répéter';

    // on ajoute le tout
    resetBtn.appendChild(iconX);
    resetBtn.appendChild(document.createTextNode(' Reset'));

    titreFond.appendChild(document.createTextNode('Couleur fond : '));
    titreFond.appendChild(resetBtn);

    labelExtend.appendChild(inputExtend)
    labelExtend.appendChild(spanExtend)
    choixDiv.appendChild(labelExtend);

    labelRepeat.appendChild(inputRepeat);
    labelRepeat.appendChild(spanRepeat);
    choixDiv.appendChild(labelRepeat);

    formColor.appendChild(primaryColor);
    formColor.appendChild(otherColor);
    formColor.appendChild(uploadDiv);
    formColor.appendChild(choixDiv);
    mainDiv.appendChild(formColor);

    charDialog.appendChild(titreFond);
    charDialog.appendChild(mainDiv);
}

function createlabelColor(numColor, player, libChar) {
    var colorLabel = document.createElement('label');
    colorLabel.classList.add('background-j1-' + numColor);

    var choix = document.createElement('input');
    choix.classList.add('nes-radio', 'is-dark');
    choix.setAttribute('type', 'radio');
    choix.setAttribute('name', 'background_color')
    choix.setAttribute('value', numColor);
    // TODO checked seulement celui par defaut
    choix.checked = true;

    var libelle = document.createElement('span');
    libelle.innerHTML = numColor; // TODO libellé

    colorLabel.appendChild(choix);
    colorLabel.appendChild(libelle);

    // TODO listener
    choix.addEventListener('click', function () {
        // this.value = numero de la couleur
        var nbColor = this.value;
        log('choix couleur numero ' + nbColor + ', pour ' + player + ', ' + libChar);
        // recup les background du joueur concerné, pour modif la couleur de fond
        var divBG = document.getElementById('div-' + player + '-' + libChar);
        var newBGClass = 'background-' + player + '-' + nbColor;

        var tmp = divBG.className;
        tmp = tmp.replace(/background-j[1-2]-\d+/, newBGClass);
        //        divBG.className = 'character background-' + player + '-' + nbColor;
        divBG.className = tmp;
    });
    //    var radios = document.forms['form_background_color_' + player].elements['background_color'];
    //    for (var k = 0, max = radios.length; k < max; k++) {
    //        radios[k].onclick = function () {
    //            // this.value = numero de la couleur
    //            var nbColor = this.value;
    //            // delete la classe sur les autres
    //            var elems = document.querySelectorAll('div[class^="character background-' + player + '-"]');
    //            [].forEach.call(elems, function (el) {
    //                el.className = 'character background-' + player + '-' + nbColor;
    //            });
    //        }
    //    }

    return colorLabel;
}

function createCharacters(game, player, libChar) {
    var numJoueur = player.substring(1);

    var titre = document.createElement('p');
    titre.appendChild(document.createTextNode('Personnage Joueur ' + numJoueur + ' : '));

    // -- Bouton +, - et reverse
    var divBtn = document.createElement('div');
    divBtn.classList.add('center', 'margin-auto');

    var plusBtn = document.createElement('button');
    plusBtn.classList.add('nes-btn', 'is-success', 'icons-only');
    var iconAdd = document.createElement('i');
    iconAdd.classList.add('material-icons');
    iconAdd.innerHTML = 'add';

    var moinsBtn = document.createElement('button');
    moinsBtn.classList.add('nes-btn', 'is-error', 'icons-only', 'is-disabled');
    var iconRemove = document.createElement('i');
    iconRemove.classList.add('material-icons');
    iconRemove.innerHTML = 'remove';

    var reverseBtn = document.createElement('button');
    reverseBtn.classList.add('nes-btn', 'is-primary', 'icons-only');
    reverseBtn.id = 'reverse-' + player + '-' + libChar;
    var iconReverse = document.createElement('i');
    iconReverse.classList.add('material-icons');
    iconReverse.innerHTML = 'compare_arrows';

    var reverseAllBtn = document.createElement('button');
    reverseAllBtn.classList.add('nes-btn', 'is-warning', 'icons-only');
    reverseAllBtn.id = 'reverse-all-' + player + '-' + libChar;
    var iconReverseAll = document.createElement('i');
    iconReverseAll.classList.add('material-icons');
    iconReverseAll.innerHTML = 'compare_arrows';

    // -- listener btn
    plusBtn.addEventListener('click', function () {
        log('ajout char');

        // - char1
        document.getElementById('div-' + player + '-char1').classList.remove('solo');
        document.getElementById('div-' + player + '-char1').classList.add('duo-haut');

        var newDivChar = createDivChar(game, player);
        // - on met en reverse si char1 est en reverse
        if (document.getElementById('div-' + player + '-char1').classList.contains('reverse'))
            newDivChar.classList.add('reverse');

        document.getElementById('thumbnail').appendChild(newDivChar);

        plusBtn.classList.add('is-disabled');
        moinsBtn.classList.remove('is-disabled');
    });

    moinsBtn.addEventListener('click', function () {
        log('enleve char');

        // - char1
        document.getElementById('div-' + player + '-char1').classList.remove('duo-haut');
        document.getElementById('div-' + player + '-char1').classList.add('solo');

        // - char2
        document.getElementById('div-' + player + '-char2').remove();

        moinsBtn.classList.add('is-disabled');
        plusBtn.classList.remove('is-disabled');
    });

    reverseBtn.addEventListener('click', function () {
        log('reverse char ' + player + ', ' + libChar);
        document.getElementById(libChar + "-" + player).classList.toggle('reverse');
    });

    reverseAllBtn.addEventListener('click', function () {
        log('reverse all char ' + player);
        document.getElementById('div-' + player + '-char1').classList.toggle('reverse');
        if (document.getElementById('div-' + player + '-char2'))
            document.getElementById('div-' + player + '-char2').classList.toggle('reverse');
    });

    // -- Characters !
    // init perso > render-char.js
    var stockDiv = createStockGrid(game, player, libChar);

    // -- Costumes
    var titreCostume = document.createElement('span');
    titreCostume.classList.add('centre', 'margin-auto', 'nes-text');
    titreCostume.innerHTML = 'Costume';

    var colorDiv = document.createElement('div');
    colorDiv.classList.add('panel-color', 'select-color');
    colorDiv.id = 'color-char-' + player + '-' + libChar;

    // -- on ajoute le tout
    plusBtn.appendChild(iconAdd);
    moinsBtn.appendChild(iconRemove);
    reverseBtn.appendChild(iconReverse);
    reverseBtn.appendChild(document.createTextNode(' Retourner'));
    reverseAllBtn.appendChild(iconReverseAll);
    reverseAllBtn.appendChild(document.createTextNode(' Tout'))

    divBtn.appendChild(reverseAllBtn);
    divBtn.appendChild(plusBtn);
    divBtn.appendChild(moinsBtn);
    divBtn.appendChild(reverseBtn);

    charDialog.appendChild(titre);
    charDialog.appendChild(divBtn);
    charDialog.appendChild(stockDiv);
    charDialog.appendChild(titreCostume);
    charDialog.appendChild(colorDiv);

    // TODO init perso
    // TODO a revoir
    // select par defaut 
    var rand = Math.floor(Math.random() * 5)
    var rand2 = Math.floor(Math.random() * 5)
    if (player == 'j1') {
        //        var pngChar = getPngChar(game, player, pad(rand, 2), '0', 'donkey');
        //        replaceImgChar(pngChar, libChar + '-' + player)

        var sprites = getSprites(game, 'donkey');
        var stocksColor = document.getElementById('color-char-' + player + '-' + libChar);
        initStocksColor(game, 'donkey', player, libChar, colorDiv, sprites);
    } else {
        //        var pngChar = getPngChar(game, player, pad(rand, 2), '0', 'mario');
        //        replaceImgChar(pngChar, libChar + '-' + player);

        var sprites = getSprites(game, 'mario');
        var stocksColor = document.getElementById('color-char-' + player + '-' + libChar);
        initStocksColor(game, 'mario', player, libChar, colorDiv, sprites);
    }
}

function replaceImgChar(pngChar, idChar) {
    document.getElementById(idChar).src = pngChar;
}

function createDivChar(game, player) {
    var mainDiv = document.createElement('div');
    // TODO couleur background
    mainDiv.classList.add('character', 'background-' + player + '-1', 'duo-bas');
    mainDiv.id = 'div-' + player + '-char2';

    var imgDiv = document.createElement('img');
    imgDiv.id = 'char2-' + player;
    imgDiv.src = 'img/char/' + game + '/mario_00_0.png';

    mainDiv.onclick = function () {
        createModalChar(game, player, 'char2');
    };

    mainDiv.appendChild(imgDiv);

    /*
<div class="character background-j1-1 duo-bas" id="div-j1-char2">
                <img id="char2-j1" class="" src="img/char/ult/donkey_00_0.png">
            </div>
    */
    return mainDiv;
}
