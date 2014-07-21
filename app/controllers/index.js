// function doClick(e) {
	// var view = Alloy.createController("capture").getView();
	// $.index.open(view);
// }

$.index.open();

var capture = Alloy.createController("capture").getView();
$.index.open(capture);
