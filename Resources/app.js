var jsonObject;
var data = [];
var region;
var tabGroup = Titanium.UI.createTabGroup();
Ti.include('facebook.js');
Ti.include('tableview.js');
Ti.include('detailwindow.js');
var xhr = Titanium.Network.createHTTPClient();
var my_lat;
var my_lng;	
var annotationObject = [];
var tabGroup = Titanium.UI.createTabGroup();

var month=new Array();
month[0]="JAN";
month[1]="FEB";
month[2]="MAR";
month[3]="APR";
month[4]="MAY";
month[5]="JUN";
month[6]="JUL";
month[7]="AUG";
month[8]="SEP";
month[9]="OCT";
month[10]="NOV";
month[11]="DEC";


//het home screen 
var homeWindow = Titanium.UI.createWindow({
	backgroundColor: "#ffffff",
	tabBarHidden:true,
	navBarHidden: true
});

var hometab = Titanium.UI.createTab({
	window:homeWindow,
	tabBarHidden:true,
	navBarHidden: true
})

tabGroup.addTab(hometab);

//mapview voor op het home screen
var mapView = Titanium.Map.createView({
	top:44,
	left:0,
	height:170,
	width:"100%",
	mapType: Titanium.Map.STANDARD_TYPE,
	userLocation:true,
})



//top navigatie bar voor periode te changen
var topNavBar = Titanium.UI.createView({
	height:44,
	width:"100%",
	top:0,
	backgroundColor: "#ef4e4e"
})

var periodeLabel = Titanium.UI.createLabel({
	text:"PARTYGATOR",
	font: { fontSize: 18, font: "Helvetica Neue", fontWeight:"bold" },
	top: 7,
	height:30,
	width:"100%",
	color:"#ffffff",
	textAlign:"center"
})


topNavBar.add(periodeLabel);

getLocation();	

homeWindow.add(topNavBar);
homeWindow.add(mapView);
//homeWindow.open();
tabGroup.open();
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
	if(checkonline()){
	xhr.open("GET","http://divergentminddesign.com/jens/php/index.php/home/get_events_titanium/"+my_lat+"/"+my_lng+"/0.005");
	xhr.send();
	}
}


xhr.onload = function() {
   jsonObject = JSON.parse(this.responseText);
   homeWindow.add(tableView);
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
   addRow(title, jsonObject.events[i].start_time.toString(),jsonObject.events[i].location,jsonObject.events[i].end_time,jsonObject.events[i].longitude,jsonObject.events[i].latitude);
   }
   //tableView.setData(data);
   mapView.addAnnotations(annotationObject);
   
 }


function getLocation(){
Ti.Geolocation.purpose = "Recieve User Location";
// Set Distance filter. This dictates how often an event fires based on the distance the device moves. This value is in meters.
Titanium.Geolocation.distanceFilter = 5;
//set the mapview with the current location
//Get the current position and set it to the mapview
// vie latitude delte en longitute delta het zoom gehalte instellen hoe groter het getal hoe verder uit gezoemt
Titanium.Geolocation.getCurrentPosition(function(e){
       region={
            latitude: e.coords.latitude,
            longitude: e.coords.longitude,
            animate:true,
            latitudeDelta:0.01,
            longitudeDelta:0.01, 
        };
        my_lat=e.coords.latitude;
        my_lng=e.coords.longitude;
		mapView.setLocation(region);
		mapViewDetail.setLocation(region);
		getEvents();
});

}
