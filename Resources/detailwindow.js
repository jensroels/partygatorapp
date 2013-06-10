/**
 * @author Jens Roels
 */

var detailWindow = Titanium.UI.createWindow({
	backgroundColor: "#ffffff",
	navBarHidden: false,
	barColor: '#ef4e4e'
});


var testLabel = Titanium.UI.createLabel({
	text:"blablabbla",
	color:"#000000"
})


var mapViewDetail = Titanium.Map.createView({
	top:50,
	left:0,
	height:200,
	width:"100%",
	mapType: Titanium.Map.STANDARD_TYPE,
	userLocation:true,
})


detailWindow.add(testLabel);
detailWindow.add(mapViewDetail);



