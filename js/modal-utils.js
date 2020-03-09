function showModalChar(player) {
    document.getElementById('dialog-char-' + player).showModal();
}

function createModalChar() {
    var charDialog = document.createElement('dialog');
    charDialog.classList.add('nes-dialog', 'is-dark');
    document.body.appendChild(charDialog);

    // Couleurs fond
    var titreFond = document.createElement('p');
    titreFond.appendChild(document.createTextNode('Couleur fond : '));

    var resetBtn = document.createElement('button');
    resetBtn.classList.add('nes-btn', 'is-warning', 'icons-only');
    resetBtn.addEventListener('click', function () {
        // TODO
        log('reset background J?');
        // reset('j1')
    });

    var iconX = document.createElement('i');
    iconX.classList.add('nes-icon', 'close', 'is-small');

    resetBtn.appendChild(iconX);
    resetBtn.appendChild(document.createTextNode(' Reset'));

    titreFond.appendChild(resetBtn);
    charDialog.appendChild(titreFond);

    var fondDiv = createFondColor();
    charDialog.appendChild(fondDiv);

    /* Dans un form */
    // Personnages

    // Costume

    // Boutons
    var menu = document.createElement('menu');
    menu.classList.add('dialog-menu');

    var okBtn = document.createElement('button');
    okBtn.innerHTML = "OK";
    okBtn.classList.add('nes-btn', 'is-success', 'center');

    menu.appendChild(okBtn);
    charDialog.appendChild(menu);

    // TODO
    charDialog.showModal();
}

function createFondColor() {
    var mainDiv = document.createElement('div');
    mainDiv.classList.add('panel-color');

    var formColor = document.createElement('form');
    formColor.id = 'form_background_color_j1'; // TODO parametre
    formColor.setAttribute('name', 'form_background_color_j1'); // TODO parametre

    // couleurs "primaires"
    var primaryColor = document.createElement('div');
    primaryColor.classList.add('primary-color');

    var color1 = createlabelColor('1');
    var color2 = createlabelColor('2');
    var color3 = createlabelColor('3');
    var color4 = createlabelColor('4');
    var color5 = createlabelColor('5');
    var color6 = createlabelColor('6');
    var color7 = createlabelColor('7');
    var color8 = createlabelColor('8');

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

    var color0 = createlabelColor('0');
    var color999 = createlabelColor('999');

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
        log('set custom background J?');
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
        log('toggle extend custom background J?');
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
        log('toggle repeat custom background J?');
        // toggleRepeatBackground('j1')
    });
    inputRepeat.checked = true;

    var spanRepeat = document.createElement('span');
    spanRepeat.innerHTML = 'Répéter';

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

    return mainDiv;
}

function createlabelColor(numColor) {
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

    return colorLabel;
}

/** 
<dialog class="nes-dialog is-dark" id="dialog-char-j1">
    <div class="panel-color">
        <form id="form_background_color_j1" name="form_background_color_j1">
            <div>
                <label class="choix-bg">
                    <input type="checkbox" class="nes-checkbox" onchange="toggleBackgroundSize('j1')" />
                    <span>Etendre</span>
                </label>
                <label class="choix-bg">
                    <input type="checkbox" class="nes-checkbox" onchange="toggleRepeatBackground('j1')" checked />
                    <span>Répéter</span>
                </label>
            </div>
        </form>
    </div>
    <form method="dialog">
        <p>Personnage Joueur 1 : </p>
        <div class="center margin-auto">
            <button class="nes-btn is-primary icons-only" type="button" id="reverse-j1"><i class="material-icons">compare_arrows</i> Retourner</button>
        </div>
        <div class="panel-color select-char" id="stocks-j1"></div>
        <span class="center margin-auto nes-text">Costume</span>
        <div class="panel-color select-color" id="color-char-j1"></div>
        <menu class="dialog-menu">
            <button class="nes-btn is-success center">OK</button>
        </menu>
    </form>
</dialog>

*/
