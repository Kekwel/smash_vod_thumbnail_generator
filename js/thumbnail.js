window.onload = function () {
    // TODO init grid perso ?
}

function init(player) {
    document.getElementById(player).oninput = function () {
        changeName(this.value, "name-" + player);
    };
    document.getElementById(player).onclick = function () {
        this.setSelectionRange(0, this.value.length)
    };

    // listener sur stock icons
    var characters = document.getElementsByClassName('stocks ' + player);
    for (var i = 0; i < characters.length; i++)(function (i) {
        characters[i].onclick = function () {
            // delete la classe sur les autres divs
            removeClasse('stocks ' + player, 'selected')
            // toggle classe pour garder border actif
            this.classList.toggle('selected')

            var divColor = document.querySelector('#' + player + '-00');
            // delete la classe sur les autres
            removeClasse('color-stocks ' + player, 'selected')
            // toggle classe pour garder border actif
            if (divColor) divColor.classList.toggle('selected')

            // on met la 1ere couleur par defaut
            setImgChar(player, '00', characters[i].id);
            // on modifie les icones couleurs du perso
            setStockColor(player, characters[i].id);
        };
    })(i);

    // ninja JS pour garder la valeur de i
    for (var i = 0; i < 8; i++)(function (i) {
        var divColor = document.querySelector('#' + player + '-0' + i);
        divColor.onclick = function () {
            // delete la classe sur les autres
            removeClasse('color-stocks ' + player, 'selected')
            // toggle classe pour garder border actif
            divColor.classList.toggle('selected')
            // met la couleur du perso sélectionné dans le thumbnail
            setImgChar(player, '0' + i, divColor.dataset.char);
        };
    })(i);

    /* reverse img */
    document.getElementById('reverse-' + player).onclick = function () {
        document.getElementById("char-" + player).classList.toggle('reverse');
    };

    /* listener changement de phase */
    setPhaseListener('form_type_phase', 'type_phase', 'phase');
    setPhaseListener('form_select_phase', 'phase', 'phase2');
}

init("j1");
init("j2");

function previewFile(logo, idInput) {
    var preview = document.getElementById(logo).getElementsByTagName('img')[0];
    //    var file = document.querySelector('input[type=file]').files[0]; //sames as here
    var file = document.getElementById(idInput).files[0]; //sames as here
    var reader = new FileReader();

    reader.onloadend = function () {
        preview.src = reader.result;
    }

    if (file) {
        reader.readAsDataURL(file); //reads the data as a URL
    } else {
        preview.src = "";
    }
}

function setPhaseListener(nameForm, nameElem, idPhase) {
    var radios = document.forms[nameForm].elements[nameElem];
    for (var i = 0, max = radios.length; i < max; i++) {
        radios[i].onclick = function () {
            if ('Round' == this.value)
                var nbRound = document.getElementById('nb_round').value;
            document.getElementById(idPhase).getElementsByTagName('span')[0].innerHTML = this.value + (nbRound ? ' ' + nbRound : '');
        }
    }

    // evenement sur l'input du nb de round
    if ('phase2' == idPhase) {
        document.getElementById('nb_round').oninput = function () {
            document.getElementById(idPhase).getElementsByTagName('span')[0].innerHTML = 'Round ' + (this.value ? this.value : '');
        }
    }
}

function changeName(tag, inputId) {
    document.getElementById(inputId).innerHTML = tag;
}

function setStockColor(player, name) {
    for (var i = 0; i < 8; i++)(function (i) {
        var divColor = document.querySelector('#' + player + '-0' + i);
        // TODO param dans string
        var src = 'img/char/';
        if (name.includes('mii')) {
            if (i < 1) {
                divColor.dataset.char = name;
                src += 'mii/stock_' + name + '.png';
            } else {
                // TODO enlever hover
                src = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D';
            }
        } else {
            divColor.dataset.char = name;
            src += name + '/stock_' + name + '_0' + i + '.png';
        }
        divColor.src = src;
    })(i);
}

function setImgChar(player, idColor, name) {
    var stockname = name + '_';
    var src = 'img/char/';
    if (name.includes('mii')) {
        stockName = name + '_00';
        src += 'mii/';
    } else
        src += name + '/';

    stockName = stockname + idColor;
    document.getElementById("char-" + player).src = src + stockName + '.png';
}

// --- UTILS ---

function removeClasse(className, classToRemove) {
    var elems = document.getElementsByClassName(className);
    [].forEach.call(elems, function (el) {
        el.classList.remove(classToRemove);
    });
}

//Et quand init devient trop grosse, tu peux faire un : 
//function init(name){
//  nom(name);
//  couleur(name);
//  autre(name);
//}