var jsonObject;
var data = [];
var tabGroup = Titanium.UI.createTabGroup();
Ti.include('facebook.js');
var xhr = Titanium.Network.createHTTPClient();
var my_lat;
var my_lng;	

//het home screen 
var homeWindow = Titanium.UI.createWindow({
	backgroundColor: "#ffffff"
});

//mapview voor op het home screen
var mapView = Titanium.Map.createView({
	top:50,
	left:0,
	height:170,
	width:"100%",
	mapType: Titanium.Map.STANDARD_TYPE,
	userLocation:true,
})


var tableView = Titanium.UI.createTableView({
	top:220,
	data:data
})

//top navigatie bar voor periode te changen
var topNavBar = Titanium.UI.createView({
	height:50,
	width:"100%",
	top:0,
	backgroundColor: "#ef4e4e"
})

var periodeLabel = Titanium.UI.createLabel({
	text:"TODAY",
	font: { fontSize: 18, font: "Helvetica Neue", fontWeight:"bold" },
	top: 10,
	height:30,
	width:"100%",
	color:"#ffffff",
	textAlign:"center"
})


topNavBar.add(periodeLabel);

getLocation();	

homeWindow.add(topNavBar);
homeWindow.add(mapView);
homeWindow.add(tableView);
homeWindow.open();

//checken of er internet is en het facebook login scherm tonen
function checkonline(){
	if(Titanium.Network.networkType != Titanium.Network.NETWORK_NONE)
	{ 
		//loginWindow.open();
		return true;
	 }else{
	 	var alertDialog = Titanium.UI.createAlertDialog({ title: 'Geen verbinding', message: 'Het lijkt erop dat u niet verbonden bent met een netwerk.', buttonNames: ['OK'] }); alertDialog.show();
	 	return false;
	 }
}



function getEvents(){
	xhr.open("GET","http://divergentminddesign.com/jens/php/index.php/home/get_events_titanium/"+my_lat+"/"+my_lng+"/0.005");
	xhr.send();
}


xhr.onload = function() {
   jsonObject = JSON.parse(this.responseText);
   var annotationObject = [];
   for(var i = 0;i<jsonObject.events.length;i++){
   	
   var title = jsonObject.events[i].name;
   annotationObject[i] = Titanium.Map.createAnnotation({
   	latitude:jsonObject.events[i].latitude,
   	longitude:jsonObject.events[i].longitude,
   	id:i,
   	rightButton: Titanium.UI.iPhone.SystemButton.DISCLOSURE,
   	title:title,
   	animate:true
   })
   addRow(title);
   }
   tableView.setData(data);
   mapView.addAnnotations(annotationObject);
 }
 
 
//een rij toevoegen aan de array voor de tableview
function addRow(titel){
	var title= Titanium.UI.createLabel({
   	text:titel,
   	top:5,
   	color:'#ffffff',
   	width:'300',
   	left:65,
   	font: { fontSize:16,fontWeight:'bold'},
   	textAlign:'left'
   })
   
   
    var row = Titanium.UI.createTableViewRow({
   	height:60,
   	backgroundColor:"#2e3945",
   	classname:"tableRow"
   })
   
   row.add(title);
   data.push(row);
}


function getLocation(){
Ti.Geolocation.purpose = "Recieve User Location";
// Set Distance filter. This dictates how often an event fires based on the distance the device moves. This value is in meters.
Titanium.Geolocation.distanceFilter = 5;
//set the mapview with the current location
//Get the current position and set it to the mapview
// vie latitude delte en longitute delta het zoom gehalte instellen hoe groter het getal hoe verder uit gezoemt
Titanium.Geolocation.getCurrentPosition(function(e){
        var region={
            latitude: e.coords.latitude,
            longitude: e.coords.longitude,
            animate:true,
            latitudeDelta:0.01,
            longitudeDelta:0.01, 
        };
        my_lat=e.coords.latitude;
        my_lng=e.coords.longitude;
		mapView.setLocation(region);
		getEvents();
});

}
