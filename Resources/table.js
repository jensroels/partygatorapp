var tableView = Titanium.UI.createTableView({
	top:220,
	backgroundColor:"#2e3945",
	separatorColor:'#575f67',
	data:data
})


function addRow(titel,startdatum, location, einddatum){
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
   
   var detailButton = Titanium.UI.createButton({
   width:50,
   backgroundImage:"/images/detailbutton.png",
   height:"100%",
   text:"",
   left:270
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
 	text:location.toUpperCase().substr(0,28)	
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
   tableView.appendRow(row);
   //data.push(row);
   
   
   row.addEventListener('click', function(event){
		//mapView.selectAnnotation(e.annotationObject);
		mapView.selectAnnotation(annotationObject[event.index]);
   });
}