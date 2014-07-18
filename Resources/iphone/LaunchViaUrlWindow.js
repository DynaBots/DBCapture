function LaunchViaUrlWindow(WikitudeLicenseKey, windowTitle) {
    var self = null;
    self = Ti.UI.createWindow({
        navBarHidden: false,
        title: windowTitle,
        backgroundColor: "white",
        color: "black"
    });
    var view = Ti.UI.createView({
        height: "100%",
        layout: "vertical"
    });
    var buttonLaunch = Titanium.UI.createButton({
        title: "Launch World",
        top: 10,
        width: "70%",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER
    });
    buttonLaunch.addEventListener("click", function() {
        var url2launch = textField.value;
        if (-1 == url2launch.indexOf("://")) alert("Please enter valid url"); else {
            var ARchitectWindow = require("ARchitectWindow");
            new ARchitectWindow(WikitudeLicenseKey, url2launch).open();
        }
    });
    var textField = Ti.UI.createTextField({
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        top: 60,
        left: 10,
        right: 10,
        width: "90%",
        hintText: "http://",
        value: "http://",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER
    });
    var backButton = Ti.UI.createButton({
        title: "Back",
        left: 6,
        top: 6
    });
    backButton.addEventListener("click", function() {
        self.close();
    });
    view.add(backButton);
    view.add(textField);
    view.add(buttonLaunch);
    self.add(view);
    return self;
}

module.exports = LaunchViaUrlWindow;