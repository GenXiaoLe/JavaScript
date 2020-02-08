(function () {
    var viewport = function (width) {
        var densitydpi = width / window.screen.width * window.devicePixelRatio * 160;
        document.write('<meta name="viewport" content="width=' + width + ', user-scalable=no, target-densitydpi=' + densitydpi.toFixed(0) + '" />');
    };
    viewport(750);
})();
