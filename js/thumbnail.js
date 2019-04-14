document.getElementById("j1").oninput = function () {
    changeName(this.value, "name-j1");
};
document.getElementById("j2").oninput = function () {
    changeName(this.value, "name-j2");
};
document.getElementById("j1").onclick = function () {
    this.setSelectionRange(0, this.value.length)
};
document.getElementById("j2").onclick = function () {
    this.setSelectionRange(0, this.value.length)
};

function changeName(tag, inputId) {
    document.getElementById(inputId).innerHTML = tag;
}
