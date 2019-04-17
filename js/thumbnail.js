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
}

init("j1");
init("j2");

function changeName(tag, inputId) {
    document.getElementById(inputId).innerHTML = tag;
}

function setStockColor(player, name) {
    for (var i = 0; i < 8; i++)(function (i) {
        var divColor = document.querySelector('#' + player + '-0' + i);
        if (name.includes('mii')) {
            // TODO
            divColor.src = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D';
        } else {
            divColor.dataset.char = name;
            divColor.src = 'img/char/' + name + '/stock_' + name + '_0' + i + '.png';
        }
    })(i);
}

function setImgChar(player, idColor, name) {
    var stockName = name + '_' + idColor;
    document.getElementById("char-" + player).src = 'img/char/' + name + '/' + stockName + '.png';
}

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
