function set_screen_size(iframe_id) {
    var a = parent.document.getElementById(iframe_id);
    //console.log(a);
    var bd = document.getElementsByTagName('body')[0];
    // console.log(bd[0].style.height);
    var height = parseInt(bd.style.height);
    // console.log(document.getElementsByTagName('body')[0].height);
    a.style.height = `${height + 30}px`;
}
//# sourceMappingURL=screen_size.js.map