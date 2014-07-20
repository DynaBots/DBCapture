var ARchitectWindow = require('ARchitectWindow');

var architectWindow = new ARchitectWindow(Alloy.Globals.WikitudeLicenseKey, "IrAndGeo");
if (architectWindow.isDeviceSupported()) {
    architectWindow.loadArchitectWorldFromURL("ar/index.html");
    architectWindow.open();
} else {
    alert('not supported');
}
