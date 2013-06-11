var jsonObject;
var jsonObjectToday;
var jsonObjectWeek;
var jsonObjectMaand;
var data = [];
var region;
var tabGroup = Titanium.UI.createTabGroup();
Ti.include('facebook.js');
Ti.include('tableview.js');
Ti.include('detailwindow.js');
var xhr = Titanium.Network.createHTTPClient();
var xhrWeek = Titanium.Network.createHTTPClient();
var xhrMaand = Titanium.Network.createHTTPClient();
var my_lat;
var my_lng;	
var annotationObject = [];
var tabGroup = Titanium.UI.createTabGroup();
var myLoc;

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
	backgroundColor: "#2e3945",
	tabBarHidden:true,
	navBarHidden: true
});


var demoWindow = Titanium.UI.createWindow({
	backgroundColor: "#2e3945",
	tabBarHidden:true,
	navBarHidden: true
});

var overlayImage = Titanium.UI.createImageView({
	 image:'/images/overlay.jpg',
	 top:0,
	 left:0,
})

demoWindow.add(overlayImage);

overlayImage.addEventListener("click",function(e){
	runPartyGator();
})

var hometab = Titanium.UI.createTab({
	window:homeWindow,
	tabBarHidden:true,
	navBarHidden: true
})



var nextButton = Titanium.UI.createButton({
	top:0,
	backgroundImage:"images/next_periode.png",
	left:270,
	width:50,
	height:44
})

var prevButton = Titanium.UI.createButton({
	top:0,
	backgroundImage:"images/prev_periode.png",
	left:0,
	visible:false,
	width:50,
	height:44
})





tabGroup.addTab(hometab);

//mapview voor op het home screen
var mapView = Titanium.Map.createView({
	top:44,
	left:0,
	height:170,
	width:"100%",
	mapType: Titanium.Map.STANDARD_TYPE,
	userLocation:false
})



//top navigatie bar voor periode te changen
var topNavBar = Titanium.UI.createView({
	height:44,
	width:"100%",
	top:0,
	backgroundColor: "#ef4e4e"
})

var periodeLabel = Titanium.UI.createLabel({
	text:"TODAY",
	font: { fontSize: 18, font: "Helvetica Neue", fontWeight:"bold" },
	top: 7,
	height:30,
	width:"100%",
	color:"#ffffff",
	textAlign:"center"
})


topNavBar.add(periodeLabel);



homeWindow.add(topNavBar);
homeWindow.add(mapView);
homeWindow.add(prevButton);
homeWindow.add(nextButton);


function emptyAllEntrees(){
	tableView.data = data;
	annotationObject = [];
	mapView.removeAllAnnotations();	
	mapView.addAnnotation(myLoc);
}

nextButton.addEventListener("click",function(e){
	
	switch (periodeLabel.getText()) {
case 'TODAY':
	prevButton.setVisible(true);
    addAnnotationsToMap(jsonObjectWeek);
	periodeLabel.setText("THIS WEEK");
    break;
case 'THIS WEEK':
	nextButton.setVisible(false);
    addAnnotationsToMap(jsonObjectMaand);
	periodeLabel.setText("THIS MONTH");
    break;
default:
    
    break;
}
	
})


prevButton.addEventListener("click",function(e){
	
	switch (periodeLabel.getText()) {
case 'THIS WEEK':
	prevButton.setVisible(false);
    addAnnotationsToMap(jsonObjectToday);
	periodeLabel.setText("TODAY");
	
    break;
case 'THIS MONTH':
	nextButton.setVisible(true);
    addAnnotationsToMap(jsonObjectWeek);
	periodeLabel.setText("THIS WEEK");
	
    break;
default:
    break;
}
	
})


if(!Titanium.App.Properties.hasProperty("firstrun")){
	Titanium.App.Properties.setBool('firstrun',1);
	//alert("first run");
	demoWindow.open();
}else{
	//alert("not first run");
	runPartyGator();
}

function runPartyGator(){
tabGroup.open();
homeWindow.add(activityIndicator);
activityIndicator.show();
getLocation();
Ti.Gesture.addEventListener("shake",function(e){
	getEvents(7);
})		
}


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



function getEvents(periodeDagen){
	if(checkonline()){
	//annotations verwijderen als marker gedragged wordt
	/*for (i=annotationObject.length-1;i>=0;i--) {
        mapView.removeAnnotation(annotationObject[i]);
    }
    annotationObject = [];*/

	//xhr.open("GET","http://divergentminddesign.com/jens/php/index.php/home/get_events_titanium/"+my_lat+"/"+my_lng+"/0.005");
	activityIndicator.show();
	xhr.open("GET","http://party-gator.com/index.php/home/get_events_titanium/"+my_lat+"/"+my_lng+"/0.005/1");
	xhr.send();
	
	
	xhrWeek.open("GET","http://party-gator.com/index.php/home/get_events_titanium/"+my_lat+"/"+my_lng+"/0.005/7");
	xhrWeek.send();
	
	xhrMaand.open("GET","http://party-gator.com/index.php/home/get_events_titanium/"+my_lat+"/"+my_lng+"/0.005/30");
	xhrMaand.send();
	}
}


function addAnnotationsToMap(jsonObject){
	emptyAllEntrees();
	if(jsonObject.events.length<1){
		alert('leeg jongeyuuu');
		tableView.setVisible(false);
	}else{
		tableView.setVisible(true);
	for(var i = 0;i<jsonObject.events.length;i++){
   var title = jsonObject.events[i].name;
   annotationObject[i] = Titanium.Map.createAnnotation({
   	latitude:jsonObject.events[i].latitude,
   	longitude:jsonObject.events[i].longitude,
   	id:i,
   	rightButton: Titanium.UI.iPhone.SystemButton.DISCLOSURE,
   	title:title,
   	image: "images/pin_red.png",
   	animate:true
   })
   var desc;
   if(jsonObject.events[i].description.length<5){
   	desc = "There is no more information available";
   }else{
   	desc = jsonObject.events[i].description.substr(0,500).replace(/<br \/>/gi,'\n');
   }
   addRow(title, jsonObject.events[i].start_time.toString(),jsonObject.events[i].location,jsonObject.events[i].end_time,jsonObject.events[i].longitude,jsonObject.events[i].latitude,desc);
   
   }
   
   	//als er geklikt wordt op de annotations checken of het een pin is en dan scrollen naar de lijst
     mapView.addEventListener("click",function(e){
	if(e.clicksource=="pin"){;
	Ti.API.info(e.index);
	tableView.scrollToIndex( e.index-1, {animated:true,position:Ti.UI.iPhone.TableViewScrollPosition.TOP});
	}
})
}
activityIndicator.hide()
   //tableView.setData(data);
   mapView.addAnnotations(annotationObject);
   mapView.setLocation(region);
}

xhr.onload = function() {
   jsonObjectToday = JSON.parse(this.responseText);
   homeWindow.add(tableView);
  addAnnotationsToMap(jsonObjectToday);
 }
 
 xhrWeek.onload = function() {
  jsonObjectWeek = JSON.parse(this.responseText);
  //addAnnotationsToMap(jsonObjectWeek);
 }
 
  xhrMaand.onload = function() {
  jsonObjectMaand = JSON.parse(this.responseText);
  //addAnnotationsToMap(jsonObjectWeek);
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
		mapViewDetail.setLocation(region);
		
		myLoc  = Ti.Map.createAnnotation({
		    latitude: my_lat,
		    longitude: my_lng,
		    title:"Current location",
		    subtitle:'Drag me around, soon!',
		    animate:false,
		    image: "images/pin_zwart.png",
		    myId: 1,
		    draggable: true
		});
	    mapView.setLocation(region);

		//Onmogelijk te doen volgens mij via deze manier. De functie mag pas opgeroepen worden als de pointer wordt losgelaten en dat event bestaat niet via aan annotation

		//coordinaten opvangen bij slepen + events oproepen
		/*
		mapView.addEventListener("pinchangedragstate", function(e) {
 			Ti.API.info("New latitude: " + e.annotation.latitude);
  			Ti.API.info("New longitude: " + e.annotation.longitude);
  			my_lat=e.annotation.latitude;
  			my_lng=e.annotation.longitude;
  			getEvents();
		});
		*/
		getEvents(7);
});

}
