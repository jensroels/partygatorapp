var jsonObject;
var data = [];
var tabGroup = Titanium.UI.createTabGroup();
Ti.include('facebook.js');
var xhr = Titanium.Network.createHTTPClient();
var my_lat;
var my_lng;	
var annotationObject = [];

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
	backgroundColor:"#2e3945",
	separatorColor:'#575f67',
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
   addRow(title, jsonObject.events[i].start_time.toString(),jsonObject.events[i].location);
   }
   tableView.setData(data);
   mapView.addAnnotations(annotationObject);
 }
 
 
//een rij toevoegen aan de array voor de tableview
function addRow(titel,startdatum, location){
	Ti.API.info(startdatum);
	
	var title= Titanium.UI.createLabel({
   	text:titel.substr(0,22).toUpperCase(),
   	top:10,
   	color:'#ffffff',
   	width:240,
   	left:58,
   	font: { fontSize:15,fontWeight:'bold'},
   	textAlign:'left'
   })
   
   var dateView = Titanium.UI.createView({
   	backgroundColor:"#3a4a58",
   	width:49,
   	height:"100%",
   	left:0
   })
   
   var dag = Titanium.UI.createLabel({
   	text:startdatum.substr(8,2),
   	font:{fontSize:20, fontWeight:"bold"},
   	top: 15,
   	left:12,
   	color:"#fff"
   })
   
   var maand = Titanium.UI.createLabel({
   	text:month[parseInt(startdatum.substr(5,2), 10)],
   	color:"#ffffff",
   	top:45,
   	left:9,
   	font:{fontSize:15, fontWeight:"bold"}
   })
   
   var line = Titanium.UI.createView({
   	backgroundColor:"#ffffff",
   	width:33,
   	height:1,
   	left:7,
   	top: 41
   })
   
   	var location = Titanium.UI.createLabel({
 	top:35,
 	left:72,
 	font:{fontSize:12, fontWeight:"bold"},
 	width:230,
 	textAlign:"left",
 	color:"#d0d1d3",
 	text:location.toUpperCase().substr(0,28)	
 	});
 	
 	var startuur= Titanium.UI.createLabel({
   	text:startdatum.substr(11,5),
   	color:'#d0d1d3',
   	font: { fontSize:12, fontWeight:'bold'},
   	width:212,
   	top:55,
   	left:72,
   	textAlign:'left'
   });
   
   var iconLocatie = Ti.UI.createImageView({
  image:'/images/ico_locatie.png',
  top:35,
  left:55
});
   
  var iconTijd = Ti.UI.createImageView({
  image:'/images/ico_tijd.png',
  top:55,
  left:55
});
   
   dateView.add(maand);
   dateView.add(dag);
   dateView.add(line);
   
    var row = Titanium.UI.createTableViewRow({
   	height:80,
   	classname:"tableRow"
   })
   
   
   row.add(title);
   row.add(iconLocatie);
   row.add(location);
   row.add(iconTijd);
   row.add(startuur);
   row.add(dateView);
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
