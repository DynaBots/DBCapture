var _isAndroid = void 0;

exports.isAndroid = function() {
    void 0 === _isAndroid && (_isAndroid = "android" == Ti.Platform.osname);
    return _isAndroid;
};