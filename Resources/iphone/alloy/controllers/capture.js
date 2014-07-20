function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "capture";
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.capture = Ti.UI.createView({
        id: "capture"
    });
    $.__views.capture && $.addTopLevelView($.__views.capture);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var ARchitectWindow = require("ARchitectWindow");
    var architectWindow = new ARchitectWindow(Alloy.Globals.WikitudeLicenseKey, "IrAndGeo");
    if (architectWindow.isDeviceSupported()) {
        architectWindow.loadArchitectWorldFromURL("ar/index.html");
        architectWindow.open();
    } else alert("not supported");
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;