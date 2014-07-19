function doClick(e) {
    alert($.label.text);
}

$.index.open();

var ARchitectWindow = require('ARchitectWindow');

var architectWindow = new ARchitectWindow(Alloy.Globals.WikitudeLicenseKey, "IrAndGeo");
if (architectWindow.isDeviceSupported()) {
    architectWindow.loadArchitectWorldFromURL("ar/index.html");
    architectWindow.open();
} else {
    alert('not supported');
}

setTimeout(function() {
	architectWindow.close();
}, 5000);
