var my_lat;
var my_lng;	

//checken of er internet is en het facebook login scherm tonen
function checkonline(){
	if(Titanium.Network.networkType != Titanium.Network.NETWORK_NONE)
	{ 
		//loginWindow.open();
		return true;
	 }else{
	 	var alertDialog = Titanium.UI.createAlertDialog({ title: 'Geen verbinding', message: 'Het lijkt erop dat u niet verbonden bent met een netwerk.', buttonNames: ['OK','Doh!'] }); alertDialog.show();
	 	return false;
	 }
}

//setup facebook login
Ti.Facebook.appid = '155274344550663';
Ti.Facebook.permissions = ['user_events,friends_events']; // Permissions your app needs
Ti.Facebook.addEventListener('login', function(e) {
    if (e.success) {
    	//als de user is ingelogd starten maken we de rest van de screens aan
        startPartyGator();     
    }
});
	
var mapView = Titanium.Map.createView({
	top:0,
	left:0,
	height:"100%",
	width:"100%",
	mapType: Titanium.Map.STANDARD_TYPE,
	userLocation:true
});

//start party gator user is ingelogd
function startPartyGator(){
	if(Titanium.Network.networkType != Titanium.Network.NETWORK_NONE)
	{ 
	 }else{
	 	var alertDialog = Titanium.UI.createAlertDialog({ title: 'Geen verbinding', message: 'Het lijkt erop dat u niet verbonden bent met een netwerk.', buttonNames: ['OK','Doh!'] }); alertDialog.show();
	 }
	mapWindow.open();
	getLocation();	
}

var loginWindow = Titanium.UI.createWindow({
	title:'login',
    backgroundImage:'./Default.png',
	barColor:"#3DD3A1",
    navBarHidden:true
});

var mapWindow = Titanium.UI.createWindow({  
    backgroundColor:'#fff',
    barColor:"#3DD3A1",
    navBarHidden:false
});

//facebook login button toevoegen aan het inlog window
loginWindow.add(Ti.Facebook.createLoginButton({
    top : 350,
    style : Ti.Facebook.BUTTON_STYLE_WIDE
}));

Ti.Geolocation.purpose ="We hebben uw huidige locatie nodig zodat we events in uw buurt kunnen zoeken.";
// Set Distance filter. This dictates how often an event fires based on the distance the device moves. This value is in meters.
Titanium.Geolocation.distanceFilter = 5;

//huidige locatie
function getLocation(){
	//Huidige locatie opvragen en op mapview zetten
	Titanium.Geolocation.getCurrentPosition(function(e){
	        var region={
	            latitude: e.coords.latitude,
	            longitude: e.coords.longitude,
	            animate:true,
	            latitudeDelta:0.1,
	            longitudeDelta:0.1, 
	        };
	        my_lat=e.coords.latitude;
	        my_lng=e.coords.longitude;
	        
	        var annotation = Titanium.Map.createAnnotation({
				latitude:my_lat,
				longitude:my_lng,
				title:"I'm here!",
				subtitle:"drag me around",
			})
		//mapView.selectAnnotation(annotation);
		mapView.setLocation(region);
	});
}

loginWindow.open();
mapWindow.add(mapView);
