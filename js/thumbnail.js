/*jslint browser: true */
/*global window */
/*eslint-env browser*/

window.onload = function () {
    $('#font_select').select2({
        closeOnSelect: true
    });
    $('#font_select').on('select2:select', function (e) {
        var fontname;
        var custom = e.params.data.element.dataset.custom;

        if (e.params.data.text)
            fontname = e.params.data.text;
        else
            fontname = e.params.data;
        previewAndLoadFont(fontname, custom);
    });


    init("j1");
    init("j2");
    initOther();
}

function previewAndLoadFont(fontname, custom) {
    var isCustom = (custom === 'true');
    if (!isCustom)
        loadFont(fontname);

    fontname = '"' + fontname + '"';
    // change font of banner + VS + phases
    document.getElementById('name-j1').style.fontFamily = fontname;
    document.getElementById('name-j2').style.fontFamily = fontname;
    document.getElementById('versus').style.fontFamily = fontname;
    document.getElementById('phase').style.fontFamily = fontname;
    document.getElementById('phase2').style.fontFamily = fontname;

    document.getElementById('j1').style.fontFamily = fontname;
    document.getElementById('j2').style.fontFamily = fontname;
    document.getElementById('type_phase').style.fontFamily = fontname;
    document.getElementById('select_phase').style.fontFamily = fontname;
    //        document.getElementById('custom_phase ').style.fontFamily = fontname;
    //        document.getElementById('custom_phase2').style.fontFamily = fontname;
    document.getElementById('label_font').innerHTML = fontname;
    document.getElementById('label_font').style.fontFamily = fontname;
}

function init(player) {
    // -- test
    var banner = document.getElementById('banner-' + player);
    var char1 = document.getElementById('char1-' + player);
    var char2 = document.getElementById('char2-' + player);
    var games = document.getElementById('game_select');
    var game = games.value;

    banner.onclick = function () {
        document.getElementById('dialog-tag-' + player).style.display = 'block';
        document.getElementById(player).click();
    };

    if (char1) {
        char1.onclick = function () {
            createModalChar(game, player, 'char1');
        };
    }
    if (char2) {
        char2.onclick = function () {
            createModalChar(game, player, 'char2');
        };
    }
    // --

    // -- init grid perso
    // fait lors de la création de la modal

    document.getElementById(player).oninput = function () {
        changeName(this.value, "name-" + player);
    };
    document.getElementById(player).onclick = function () {
        this.focus();
        this.setSelectionRange(0, this.value.length)
    };
    document.getElementById('bold-' + player).onchange = function () {
        log(player + ' en gras ? ' + this.checked);
        if (this.checked)
            document.getElementById('name-' + player).style.fontWeight = 'bold';
        else
            document.getElementById('name-' + player).style.fontWeight = 'normal';
    };

    /* rotate tag */
    document.getElementById('rotate-left-' + player).onclick = function () {
        document.getElementById("banner-" + player).classList.remove('rotate-tag-right');
        document.getElementById("banner-" + player).classList.add('rotate-tag-left');
    }
    document.getElementById('rotate-center-' + player).onclick = function () {
        document.getElementById("banner-" + player).classList.remove('rotate-tag-right');
        document.getElementById("banner-" + player).classList.remove('rotate-tag-left');
    }
    document.getElementById('rotate-right-' + player).onclick = function () {
        document.getElementById("banner-" + player).classList.remove('rotate-tag-left');
        document.getElementById("banner-" + player).classList.add('rotate-tag-right');
    }
}

function initOther() {
    // lors changement jeu, changement stock icons
    var games = document.getElementById('game_select');
    games.onchange = function () {
        var game = this.value;

        // -- set image CHAR
        var pngCharJ1 = getPngChar(game, 'j1', '00', '0', 'fox');
        replaceImgChar(pngCharJ1, 'char1-j1');
        var pngCharJ2 = getPngChar(game, 'j2', '00', '0', 'marth');
        replaceImgChar(pngCharJ2, 'char1-j2');

        document.getElementById('char1-j1').onclick = function () {
            createModalChar(game, 'j1', 'char1');
        };
        document.getElementById('char1-j2').onclick = function () {
            createModalChar(game, 'j2', 'char1');
        };

        // enlever div si 2 persos affiché
        if (document.getElementById('div-j1-char2')) {
            document.getElementById('div-j1-char1').classList.remove('duo-haut');
            document.getElementById('div-j1-char1').classList.add('solo');
            document.getElementById('div-j1-char2').remove();
        }
        if (document.getElementById('div-j2-char2')) {
            document.getElementById('div-j2-char1').classList.remove('duo-haut');
            document.getElementById('div-j2-char1').classList.add('solo');
            document.getElementById('div-j2-char2').remove();
        }
    }

    document.getElementById('nb_round').onclick = function () {
        this.setSelectionRange(0, this.value.length)
    };

    /* rotate phase */
    document.getElementById('rotate-left-phase').onclick = function () {
        document.getElementById("phase").classList.remove('rotate-phase-right');
        document.getElementById("phase").classList.add('rotate-phase-left');
    }
    document.getElementById('rotate-center-phase').onclick = function () {
        document.getElementById("phase").classList.remove('rotate-phase-right');
        document.getElementById("phase").classList.remove('rotate-phase-left');
    }
    document.getElementById('rotate-right-phase').onclick = function () {
        document.getElementById("phase").classList.remove('rotate-phase-left');
        document.getElementById("phase").classList.add('rotate-phase-right');
    }
    document.getElementById('rotate-left-phase2').onclick = function () {
        document.getElementById("phase2").classList.remove('rotate-phase-right');
        document.getElementById("phase2").classList.add('rotate-phase-left');
    }
    document.getElementById('rotate-center-phase2').onclick = function () {
        document.getElementById("phase2").classList.remove('rotate-phase-right');
        document.getElementById("phase2").classList.remove('rotate-phase-left');
    }
    document.getElementById('rotate-right-phase2').onclick = function () {
        document.getElementById("phase2").classList.remove('rotate-phase-left');
        document.getElementById("phase2").classList.add('rotate-phase-right');
    }

    /* bold */
    document.getElementById('bold-phase').onchange = function () {
        log('phase en gras ? ' + this.checked);
        if (this.checked)
            document.getElementById('phase').style.fontWeight = 'bold';
        else
            document.getElementById('phase').style.fontWeight = 'normal';
    };
    document.getElementById('bold-phase2').onchange = function () {
        log('phase2 en gras ? ' + this.checked);
        if (this.checked)
            document.getElementById('phase2').style.fontWeight = 'bold';
        else
            document.getElementById('phase2').style.fontWeight = 'normal';
    };

    /* listener changement de phase */
    document.getElementById('phase_visible').onclick = function () {
        if (!this.checked) {
            document.getElementById('phase_visible').getElementsByClassName('material-icons')[0].innerHTML = 'visibility';
            document.getElementById('phase_visible').getElementsByTagName('span')[0].innerHTML = 'Visible';

            document.getElementById('phase').style.display = 'none';
            document.getElementById('phase2').style.display = 'none';
            this.checked = true;
        } else {
            document.getElementById('phase_visible').getElementsByClassName('material-icons')[0].innerHTML = 'visibility_off'
            document.getElementById('phase_visible').getElementsByTagName('span')[0].innerHTML = 'Invisible';

            document.getElementById('phase').style.display = '';
            document.getElementById('phase2').style.display = '';
            this.checked = false;
        }
    }
    setPhaseListener('form_type_phase', 'type_phase', 'phase');
    setPhaseListener('form_select_phase', 'phase', 'phase2');

    /* img vide */
    var emptyimg = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D';
    document.getElementById('logo_haut').getElementsByTagName('img')[0].src = emptyimg;
    document.getElementById('logo_bas').getElementsByTagName('img')[0].src = emptyimg;

    /* init custom fonts */
    log('load custom font')
    loadCustomFont()

    /* btn download image */
    document.getElementById('download').onclick = function () {
        var node = document.getElementById('thumbnail');

        // on enleve le margin pour ne pas qu'il soit pris en compte
        node.style.margin = '';
        domtoimage.toPng(node)
            .then(function (dataUrl) {
                var player1 = document.getElementById('j1').value;
                var player2 = document.getElementById('j2').value;
                var filename = player1 + '_vs_' + player2 + '.png';

                var link = document.createElement('a');
                link.download = filename;
                link.href = dataUrl;
                simulateClick(link);

                // on remet le margin
                node.style.margin = 'auto';
            })
            .catch(function (error) {
                console.error('oops, something went wrong!', error);
            });
    }
}

function showHelp(param) {
    console.log('help_' + param);
    // TODO
    if ('font' == param) {
        console.log("pouet")
    }
}

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
    var radios = document.getElementsByName(nameElem);
    //    var radios = document.forms[nameForm].elements[nameElem];
    for (var i = 0, max = radios.length; i < max; i++) {
        radios[i].onclick = function () {
            if ('round' == this.id)
                var nbRound = document.getElementById('nb_round').value;
            else if (('custom_' + idPhase) == this.id)
                var nbRound = document.getElementById('custom_phase_' + idPhase).value;
            document.getElementById(idPhase).getElementsByTagName('span')[0].innerHTML = this.value + (nbRound ? ' ' + nbRound : '');

            // si on appuie sur "Grand", met automatiquement "Finals"
            if ('grand' == this.id) {
                document.getElementById('final').checked = true;
                document.getElementById('phase2').getElementsByTagName('span')[0].innerHTML = document.getElementById('final').value;
            }
        }
    }

    // evenement sur l'input du nb de round
    document.getElementById('custom_' + idPhase).oninput = function () {
        document.getElementById(idPhase).getElementsByTagName('span')[0].innerHTML = this.value ? this.value : '';
    }
    if ('phase2' == idPhase) {
        document.getElementById('nb_round').oninput = function () {
            document.getElementById(idPhase).getElementsByTagName('span')[0].innerHTML = 'Round ' + (this.value ? this.value : '');
        }
    }

    // -- open dialog on click
    document.getElementById(idPhase).onclick = function () {
        document.getElementById('dialog-phases').style.display = 'block';
    };
}

function changeName(tag, inputId) {
    document.getElementById(inputId).innerHTML = tag;
}

function resetBG(player) {
    var bgplayer = document.getElementById('div-' + player)
    bgplayer.style.backgroundImage = ""
}

function setBackground(player, bgfile) {
    var bgplayer = document.getElementById('div-' + player)

    var file = document.getElementById(bgfile).files[0]; //sames as here
    var reader = new FileReader();

    reader.onloadend = function () {
        bgplayer.style.backgroundImage = 'url(' + reader.result + ')';
    }

    if (file) {
        reader.readAsDataURL(file); //reads the data as a URL
    } else {
        bgplayer.style.backgroundImage = "";
    }
}

function toggleBackgroundSize(player) {
    var bgplayer = document.getElementById('div-' + player)
    bgplayer.classList.toggle('bg-etendu')
}

function toggleRepeatBackground(player) {
    var bgplayer = document.getElementById('div-' + player)
    bgplayer.classList.toggle('bg-no-repeat')
}

function setTagFont(player) {
    var fontsize = document.getElementById('fontsize-' + player).value
    document.getElementById('name-' + player).style.fontSize = fontsize + "px"
}

function setPhaseFont(phase) {
    var fontsize = document.getElementById('fontsize-' + phase).value
    document.getElementById(phase + '-text').style.fontSize = fontsize + "px";
}

// --- UTILS ---
function createStockReserved() {
    var divReserved = document.createElement('div');
    divReserved.classList.add('reserved');
    return divReserved;
}

function removeClasse(className, classToRemove) {
    var elems = document.getElementsByClassName(className);
    [].forEach.call(elems, function (el) {
        el.classList.remove(classToRemove);
    });
}

function removeClassByAttr(attrName, value, classToRemove) {
    var elems = document.querySelectorAll('[' + attrName + '="' + value + '"]');
    [].forEach.call(elems, function (el) {
        el.classList.remove(classToRemove);
    });
}

function log(val) {
    console.log(val)
}

/**
 * Simulate a click event.
 * @public
 * @param {Element} elem  the element to simulate a click on
 */
var simulateClick = function (elem) {
    // Create our event (with options)
    var evt = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window
    });
    // If cancelled, don't dispatch our event
    var canceled = !elem.dispatchEvent(evt);
};

//Et quand init devient trop grosse, tu peux faire un : 
//function init(name){
//  nom(name);
//  couleur(name);
//  autre(name);
//}
