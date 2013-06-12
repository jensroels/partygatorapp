
/**
 * @author Jens Roels
 */
var tableView = Titanium.UI.createTableView({
	top:214,
	backgroundColor:"#2e3945",
	height:250,
	separatorColor:'#575f67',
	data:data
})


var activityIndicator = Ti.UI.createActivityIndicator({
  color: '#ef4e4e',
  font: {fontFamily:'Helvetica Neue', fontSize:26, fontWeight:'bold'},
  style:Ti.UI.iPhone.ActivityIndicatorStyle.BIG,
  top:280,
  left:130,
  height:50,
  width:50
});




function addRow(titel,startdatum, locatie, einddatum, long, lat, description){
	//Ti.API.info(startdatum);
	
	
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
   
   var detailButton = Titanium.UI.createButton({
   width:38,
   backgroundImage:"/images/detailbutton.png",
   backgroundSelectedImage:"/images/detailbutton.png",
   height:"100%",
   left:282
   });
   
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
 	text:locatie.toUpperCase().substr(0,28)	
 	});
 	
 	var startuur= Titanium.UI.createLabel({
   	text:startdatum.substr(11,5)+' - '+einddatum.substr(11,5),
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
   row.add(detailButton);
   
      detailButton.addEventListener('click', function(event){
		//mapView.selectAnnotation(e.annotationObject);
		//alert("test detail");
		openDetailWindow(titel,startdatum, locatie, einddatum, long, lat, description);
		
   });
   
  tableView.appendRow(row);
  //data.push(row);
   
   
   row.addEventListener('click', function(event){
		//mapView.selectAnnotation(e.annotationObject);
		//Ti.API.info(event.index);
		mapView.selectAnnotation(annotationObject[event.index]);
   });
}


//deze functie gaat het detail view openen
// met de variabele die worden door gegeven wordt de inhoud vaangepast naar de juiste informatie
function openDetailWindow(titel,startdatum, locatie, einddatum, long, lat, description){
	Ti.API.info(description);
var marker = Ti.Map.createAnnotation({
        latitude: lat,
        longitude: long,
        title: titel,
        pincolor:Titanium.Map.ANNOTATION_RED,
        animate:true,
        image: "images/pin_red.png",
        myid: 'event' // Custom property to uniquely identify this annotation.
    });
    mapViewDetail.addAnnotation(marker);	
	mapViewDetail.selectAnnotation(marker);
	mapViewDetail.addAnnotation(myLoc);

   detailRegion={
            latitude: lat,
            longitude: long,
            animate:true,
            latitudeDelta:0.01,
            longitudeDelta:0.01, 
        };
        mapViewDetail.setLocation(detailRegion);
        titleDetail.setText(titel.substr(0,28).toUpperCase());
        detailWindow.setTitle(titel.substr(0,28).toUpperCase());
locationDetail.setText(locatie.toUpperCase().substr(0,30));
startuurDetail.setText(startdatum.substr(11,5)+' - '+einddatum.substr(11,5));
dagDetail.setText(startdatum.substr(8,2));
maandDetail.setText(month[parseInt(startdatum.substr(5,2), 10)]);
descriptionLabel.setText("");
descriptionLabel.setText(description);
descriptionLabel.setHeight("auto");
hometab.open(detailWindow,{animated:true});
routeButton.setLeft(360);
mylocButtonDetail.setLeft(360);

routeButton.animate({
	left:278, 
	duration:500, 
	curve:Titanium.UI.ANIMATION_CURVE_EASE_IN_OUT
});

mylocButtonDetail.animate({
	left:278, 
	duration:600, 
	curve:Titanium.UI.ANIMATION_CURVE_EASE_IN_OUT
});

   routeButton.addEventListener('click',function(){
		var eventlat = lat; // dit is de destination 
		var eventlng = long;
		var str = 'http://maps.apple.com/?daddr='+ eventlat + ',' + eventlng +'&saddr='+my_lat+ ',' +my_lng;		 
		//Ti.API.info("string for--->"+str);		 
		Ti.Platform.openURL(str);
   });
   
      mylocButtonDetail.addEventListener('click', function(event){
		mapViewDetail.selectAnnotation(myLoc);
		mapViewDetail.setLocation(region);
   });

}