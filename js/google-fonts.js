// https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBK9DgEY5MY3DNBps6r9vYbKeJ7fXW6HmA  
// https://fonts.googleapis.com/css?family='

var APIkey = 'key=AIzaSyBK9DgEY5MY3DNBps6r9vYbKeJ7fXW6HmA';
var APIurl = 'https://www.googleapis.com/webfonts/v1/webfonts';

var googleUrl = 'https://fonts.googleapis.com/css?family=';

function addFont(family, custom) {
    var opt = document.createElement('option');
    opt.appendChild(document.createTextNode(family));
    if (custom)
        opt.setAttribute('data-custom', custom)
    opt.value = family;
    document.getElementById('font_select').appendChild(opt);
}

function SetFonts(fonts) {
    for (var i = 0; i < fonts.items.length; i++) {
        addFont(fonts.items[i].family)
        //        $('#font_select')
        //            .append($("<option></option>")
        //                .attr("value", fonts.items[i].family)
        //                .text(fonts.items[i].family));
    }
}
var script = document.createElement('script');
script.src = 'https://www.googleapis.com/webfonts/v1/webfonts?' + APIkey + '&callback=SetFonts';
document.body.appendChild(script);

const fetchFonts = (url) => {
    // the 'fetch' equivalent has caching issues
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let results = xhr.responseText;
            let fonts = JSON.parse(results);

            for (var i = 0, max = fonts.items.length; i < max; i++) {
                //                console.log(fonts.items[i].family)

                var opt = document.createElement('option');
                opt.appendChild(document.createTextNode(fonts.items[i].family));
                opt.value = 'val';
                document.getElementById('font_select').appendChild(opt);

                //                loadFont(fonts.items[i].family);
            }
        }
    };
    xhr.send();
}

// TODO preparer url ? ' ' en '+'
const loadFont = (fontname, custom) => {
    //    // the 'fetch ' equivalent has caching issues
    //    var xhr = new XMLHttpRequest();
    //    xhr.open('GET', googleUrl + fontname, true);
    //    xhr.onreadystatechange = () => {
    //        if (xhr.readyState == 4 && xhr.status == 200) {
    //            let css = xhr.responseText;
    //            css = css.replace(/}/g, 'font-display: swap; }');
    //
    //            const head = document.getElementsByTagName('head')[0];
    //            const style = document.createElement('style');
    //            style.appendChild(document.createTextNode(css));
    //            head.appendChild(style);
    //        }
    //    };
    //    xhr.send();
    log('yo')
    if (!custom) {
        WebFont.load({
            google: {
                families: [fontname]
            }
        });
    }
}

function loadCustomFont() {
    for (var font in customFonts) {
        var fontName = font
        var fontLink = 'fonts/' + customFonts[font] + '.ttf'
        var bitterFontFace = new FontFace(fontName, 'url(' + fontLink + ')');
        document.fonts.add(bitterFontFace);

        addFont(fontName, true)
    }
}
