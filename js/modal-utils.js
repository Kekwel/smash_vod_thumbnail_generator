function showModalChar(player) {
    document.getElementById('dialog-char-' + player).showModal();
}

var charDialog;
var bordureContainer;

var colorHex1 = '#d41619, #f66e25';
var colorHex2 = '#0049b9, #0086ea';
var colorHex3 = '#e39802, #ffc603';
var colorHex4 = '#038223, #1cc13e';
var colorHex5 = '#a24a11, #ff6e36';
var colorHex6 = '#0cb7b0, #63c7e3';
var colorHex7 = '#df2c87, #b17084';
var colorHex8 = '#552ead, #726eba';
var colorHex0 = '#00ff00, #00ff00';
var colorHex999 = 'black, black';

var colorToLibelle = {
    '#d41619, #f66e25': '1',
    '#0049b9, #0086ea': '2',
    '#e39802, #ffc603': '3',
    '#038223, #1cc13e': '4',
    '#a24a11, #ff6e36': '5',
    '#0cb7b0, #63c7e3': '6',
    '#df2c87, #b17084': '7',
    '#552ead, #726eba': '8',
    '#00ff00, #00ff00': '0',
    'black, black': '999',
}

function createModal(idDialog, player) {
    // -- pour bordure containter
    bordure = document.createElement('div');
    bordure.classList.add('bordure-container');

    charDialog = document.createElement('div');
    charDialog.id = idDialog;
    charDialog.classList.add('nes-container', 'is-dark', 'with-title', 'dialog-' + player);

    var title = document.createElement('p');
    title.classList.add('title-container');
    title.appendChild(document.createTextNode(player));

    bordure.appendChild(title);

    charDialog.appendChild(bordure);
    return charDialog;
}

function showModal(idDialog) {
    log('modal déjà construite');
    var x = document.getElementById(idDialog);
    if (x.style.display === 'none') {
        x.style.display = 'block';
    } else {
        x.style.display = 'none';
    }
}

/* player : 'j1' ou 'j2'
    libChar : 'char1', 'char2'
*/
function createModalChar(game, player, libChar) {
    var idDialog = game + '-' + player + '-' + libChar;

    // si la modal existe déjà
    if (document.getElementById(idDialog)) {
        showModal(idDialog);
    } else {
        charDialog = createModal(idDialog, player);
        document.body.appendChild(charDialog);

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
            document.getElementById(idDialog).style.display = 'none';
        });

        // -- on ajoute le tout
        menu.appendChild(okBtn);
        divMenu.appendChild(menu);
        bordure.appendChild(divMenu);
    }
}

function createFondColor(player, libChar) {
    var titreFond = document.createElement('p');

    var resetBtn = document.createElement('button');
    resetBtn.classList.add('nes-btn', 'is-warning', 'icons-only');
    resetBtn.addEventListener('click', function () {
        log('reset background ' + player + ', ' + libChar);
        resetBG(player, libChar);
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

    var color1 = createlabelColor(colorHex1, player, libChar);
    var color2 = createlabelColor(colorHex2, player, libChar);
    var color3 = createlabelColor(colorHex3, player, libChar);
    var color4 = createlabelColor(colorHex4, player, libChar);
    var color5 = createlabelColor(colorHex5, player, libChar);
    var color6 = createlabelColor(colorHex6, player, libChar);
    var color7 = createlabelColor(colorHex7, player, libChar);
    var color8 = createlabelColor(colorHex8, player, libChar);
    var color0 = createlabelColor(colorHex0, player, libChar);
    var color999 = createlabelColor(colorHex999, player, libChar);

    // Autres couleurs
    var otherColor = document.createElement('div');
    otherColor.style.padding = '0.25em';

    var mainBGColor = document.createElement('input');
    mainBGColor.id = 'color_bg_' + player + '_' + libChar;
    mainBGColor.name = 'mainBG';
    mainBGColor.setAttribute('type', 'color');
    mainBGColor.addEventListener('input', function () {
        log('set custom color ' + this.value + ' background ' + player + ', ' + libChar);
        var scndVal = secondBGColor.value;
        var rightLeft = (player == 'j1' ? 'right' : 'left');
        log(rightLeft)

        var bg = document.getElementById('div-' + player + '-' + libChar);

        bg.style.backgroundImage = 'linear-gradient(to bottom ' + rightLeft + ', ' + this.value + ', ' + scndVal + ')';

    });
    var labelMainBGColor = document.createElement('label');
    var txtMainBGColor = document.createTextNode("Principale");
    labelMainBGColor.setAttribute('for', mainBGColor.id);
    labelMainBGColor.style.color = 'black';
    labelMainBGColor.style.padding = '0.5em';
    labelMainBGColor.style.fontSize = 'small';
    labelMainBGColor.appendChild(txtMainBGColor);

    var secondBGColor = document.createElement('input');
    secondBGColor.id = 'color2_bg_' + player + '_' + libChar;
    secondBGColor.name = 'mainBG';
    secondBGColor.setAttribute('type', 'color');
    secondBGColor.addEventListener('input', function () {
        log('set 2nd custom color ' + this.value + ' background ' + player + ', ' + libChar);
        var mainVal = mainBGColor.value;
        var rightLeft = (player == 'j1' ? 'right' : 'left');

        var bg = document.getElementById('div-' + player + '-' + libChar);
        log('linear-gradient(to bottom right, ' + mainVal + ', ' + this.val + ')')
        bg.style.backgroundImage = 'linear-gradient(to bottom ' + rightLeft + ', ' + mainVal + ', ' + this.value + ')';
    });
    var labelSecondBGColor = document.createElement('label');
    var txtSecondBGColor = document.createTextNode("Secondaire");
    labelSecondBGColor.setAttribute('for', secondBGColor.id);
    labelSecondBGColor.style.color = 'black';
    labelSecondBGColor.style.padding = '0.5em';
    labelSecondBGColor.style.fontSize = 'small';
    labelSecondBGColor.appendChild(txtSecondBGColor);

    primaryColor.appendChild(color1);
    primaryColor.appendChild(color2);
    primaryColor.appendChild(color3);
    primaryColor.appendChild(color4);
    primaryColor.appendChild(color5);
    primaryColor.appendChild(color6);
    primaryColor.appendChild(color7);
    primaryColor.appendChild(color8);
    primaryColor.appendChild(color0);
    primaryColor.appendChild(color999);

    otherColor.appendChild(mainBGColor);
    otherColor.appendChild(labelMainBGColor);
    otherColor.appendChild(secondBGColor);
    otherColor.appendChild(labelSecondBGColor);
    // --

    // Upload background
    var uploadDiv = document.createElement('div');
    uploadDiv.classList.add('select_logos');
    uploadDiv.id = 'select_bg_' + player + '_' + libChar + '_file'; // TODO

    var choixImageLabel = document.createElement('label');
    choixImageLabel.setAttribute('for', 'bg_' + player + '_' + libChar + '_file');
    choixImageLabel.classList.add('label-upload');

    var iconPJ = document.createElement('i');
    iconPJ.classList.add('material-icons');
    iconPJ.innerHTML = 'attachment';

    choixImageLabel.appendChild(iconPJ);
    choixImageLabel.appendChild(document.createTextNode(' Ou choisir une image ...'));

    var inputBGFile = document.createElement('input');
    inputBGFile.id = 'bg_' + player + '_' + libChar + '_file';
    inputBGFile.setAttribute('type', 'file');
    inputBGFile.addEventListener('change', function () {
        log('set custom background ' + player + ', ' + libChar);
        setBackground(player, libChar, 'bg_' + player + '_' + libChar + '_file')
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
        log('toggle extend custom background ' + player + ', ' + libChar);
        toggleBackgroundSize(player, libChar);
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
        log('toggle repeat custom background ' + player + ', ' + libChar);
        toggleRepeatBackground(player, libChar);
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

    bordure.appendChild(titreFond);
    bordure.appendChild(mainDiv);
}

function createlabelColor(numColor, player, libChar) {
    var colorLabel = document.createElement('label');
    colorLabel.id = 'label_' + numColor;
    colorLabel.style.backgroundImage = 'linear-gradient(to bottom right, ' + numColor + ')';
    colorLabel.style.width = '100%';
    colorLabel.style.height = '2em';
    colorLabel.style.textAlign = 'center';
    // TODO
    //    colorLabel.classList.add('background-' + player + '-' + numColor);

    var choix = document.createElement('input');
    choix.classList.add('nes-radio', 'is-dark');
    choix.setAttribute('type', 'radio');
    choix.setAttribute('name', 'background_color');
    choix.setAttribute('value', numColor);
    // TODO checked seulement celui par defaut
    // TODO taille
    choix.checked = true;

    var libelle = document.createElement('span');
    libelle.innerHTML = colorToLibelle[numColor];

    colorLabel.appendChild(choix);
    colorLabel.appendChild(libelle);

    // TODO listener
    choix.addEventListener('click', function () {
        // this.value = numero de la couleur
        var nbColor = this.value;
        var rightLeft = (player == 'j1' ? 'right' : 'left');

        log('choix couleur numero ' + nbColor + ', pour ' + player + ', ' + libChar);

        // recup les background du joueur concerné, pour modif la couleur de fond
        var divBG = document.getElementById('div-' + player + '-' + libChar);

        divBG.style.backgroundImage = 'linear-gradient(to bottom ' + rightLeft + ', ' + numColor + ')';

        // modifie couleur input
        var mainColor = document.getElementById('color_bg_' + player + '_' + libChar);
        mainColor.value = nbColor.split(', ')[0];
        var scndColor = document.getElementById('color2_bg_' + player + '_' + libChar);
        scndColor.value = nbColor.split(', ')[1];
    });

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
    plusBtn.id = 'plus-' + player + '-' + libChar;
    var iconAdd = document.createElement('i');
    iconAdd.classList.add('material-icons');
    iconAdd.innerHTML = 'add';

    var moinsBtn = document.createElement('button');
    moinsBtn.classList.add('nes-btn', 'is-error', 'icons-only');
    var iconRemove = document.createElement('i');
    iconRemove.classList.add('material-icons');
    iconRemove.innerHTML = 'remove';

    // - si modal char 2 !
    if (libChar == 'char2') {
        // on affiche aps le bouton '+' si c'est le 2eme perso
        plusBtn.style.display = 'none';
    }

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

    var inputCustom = document.createElement('input');
    inputCustom.id = 'custom_' + player + '_' + libChar + '_file';
    inputCustom.setAttribute('type', 'file');
    inputCustom.style.display = 'none';
    inputCustom.setAttribute('accept', 'image/*');
    var customChar = document.createElement('button');
    customChar.classList.add('nes-btn', 'is-success', 'icons-only')
    customChar.id = 'custom-' + player + '-' + libChar
    var iconCustom = document.createElement('i');
    iconCustom.classList.add('material-icons');
    iconCustom.innerHTML = 'build';

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
        plusBtn.disabled = true;
        moinsBtn.classList.remove('is-disabled');
        moinsBtn.disabled = false;
    });

    moinsBtn.addEventListener('click', function () {
        log('enleve char');

        // - char1
        document.getElementById('div-' + player + '-char1').classList.remove('duo-haut');
        document.getElementById('div-' + player + '-char1').classList.add('solo');

        // - char2
        document.getElementById('div-' + player + '-char2').remove();

        moinsBtn.classList.add('is-disabled');
        moinsBtn.disabled = true;
        plusBtn.classList.remove('is-disabled');
        plusBtn.disabled = false;
        // -- on desactive aussi le bouton du char 1
        document.getElementById('plus-' + player + '-char1').classList.remove('is-disabled');
        document.getElementById('plus-' + player + '-char1').disabled = false;
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

    inputCustom.addEventListener('change', function () {
        log('import custom char ' + player + ', ' + libChar);
        setCustomChar(player, libChar);
    });
    customChar.addEventListener('click', function () {
        log('custom char ' + player + ', ' + libChar);
        document.getElementById('custom_' + player + '_' + libChar + '_file').click();
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
    colorDiv.id = 'color-char-' + game + '-' + player + '-' + libChar;

    // -- on ajoute le tout
    plusBtn.appendChild(iconAdd);
    moinsBtn.appendChild(iconRemove);
    reverseBtn.appendChild(iconReverse);
    reverseBtn.appendChild(document.createTextNode(' Retourner'));
    reverseAllBtn.appendChild(iconReverseAll);
    reverseAllBtn.appendChild(document.createTextNode(' Tout'));

    customChar.appendChild(iconCustom);

    divBtn.appendChild(reverseAllBtn);
    divBtn.appendChild(plusBtn);
    divBtn.appendChild(moinsBtn);
    divBtn.appendChild(reverseBtn);
    divBtn.appendChild(inputCustom);
    divBtn.appendChild(customChar);

    bordure.appendChild(titre);
    bordure.appendChild(divBtn);
    bordure.appendChild(stockDiv);
    bordure.appendChild(titreCostume);
    bordure.appendChild(colorDiv);

    // select par defaut 
    var char = document.getElementById(libChar + '-' + player);
    var charName = char.src.split('_')[0].split('/').last();
    charName = charName ? charName : 'mario';

    if (player == 'j1') {
        var sprites = getSprites(game, charName);
        initStocksColor(game, charName, player, libChar, sprites);
    } else {
        var sprites = getSprites(game, charName);
        initStocksColor(game, charName, player, libChar, sprites);
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

    var randChar = randomCharName(game);
    var imgDiv = document.createElement('img');
    imgDiv.id = 'char2-' + player;
    imgDiv.src = 'img/char/' + game + '/' + randChar + '_00_0.png';

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
