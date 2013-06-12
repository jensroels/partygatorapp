/**
 * @author Jens Roels
 */

var detailWindow = Titanium.UI.createWindow({
	backgroundColor:"#2e3945",
	navBarHidden: false,
	backgroundGradient:{},
	barImage:'images/barimage.png', 
	barColor: '#ef4e4e'
});

var scrollView = Titanium.UI.createScrollView({
	contentWidth: 320,
  contentHeight: 'auto',
  showVerticalScrollIndicator: true,
  showHorizontalScrollIndicator: false
})


var mapViewDetail = Titanium.Map.createView({
	top:0,
	left:0,
	height:230,
	width:"100%",
	mapType: Titanium.Map.STANDARD_TYPE,
	userLocation:false
})

var routeButton = Titanium.UI.createButton({
   width:44,
   height:44,
   backgroundImage:"/images/routebutton.png",
   backgroundSelectedImage:"/images/routebutton.png",
   top: 120,
   left:320
});

var mylocButtonDetail = Titanium.UI.createButton({
	width: 44,
	height: 44,
	backgroundImage:"/images/mylocButton.png",
	backgroundSelectedImage:"/images/mylocButton.png",
	top: 175,
	left: 320
});


var dateViewDetail = Titanium.UI.createView({
   	backgroundColor:"#3a4a58",
   	width:49,
   	height:"100%",
   	left:0
   })

 
   var dagDetail = Titanium.UI.createLabel({
   	font:{fontSize:20, fontWeight:"bold"},
   	top: 15,
   	left:12,
   	color:"#fff"
   })
   
   var maandDetail = Titanium.UI.createLabel({
   	color:"#ffffff",
   	top:45,
   	left:9,
   	font:{fontSize:15, fontWeight:"bold"}
   })
   
   
  
   var lineDetail = Titanium.UI.createView({
   	backgroundColor:"#ffffff",
   	width:33,
   	height:1,
   	left:7,
   	top: 41
   })
   
   
   var titleDetail = Titanium.UI.createLabel({
   	top:10,
   	color:'#ffffff',
   	width:262,
   	left:58,
   	font: { fontSize:14,fontWeight:'bold'},
   	textAlign:'left'
   })
   
   	var locationDetail = Titanium.UI.createLabel({
 	top:35,
 	left:72,
 	font:{fontSize:12, fontWeight:"bold"},
 	width:260,
 	textAlign:"left",
 	color:"#d0d1d3",
 	});
 	
 	var startuurDetail = Titanium.UI.createLabel({
   	color:'#d0d1d3',
   	font: { fontSize:12, fontWeight:'bold'},
   	width:212,
   	top:55,
   	left:72,
   	textAlign:'left'
   });
   
   var iconLocatieDetail = Ti.UI.createImageView({
  image:'/images/ico_locatie.png',
  top:35,
  left:55
});
   
  var iconTijdDetail = Ti.UI.createImageView({
  image:'/images/ico_tijd.png',
  top:55,
  left:55
});

   var rowDetail = Titanium.UI.createView({
   	height:80,
   	top:230,
   	left:0,
   	width:"100%",
   	backgroundColor:"#2e3945"
   })
   
   
   var descriptionLabel = Titanium.UI.createLabel({
   	color:"#ffffff",
   	text:"",
   	backgroundColor:"#2e3945",
   	top:320,
   	left: 5,
   	width:310
   })
   
   	
   rowDetail.add(titleDetail);
   rowDetail.add(iconLocatieDetail);
   rowDetail.add(locationDetail);
   rowDetail.add(iconTijdDetail);
   rowDetail.add(startuurDetail);
   rowDetail.add(dateViewDetail);
	
   
   dateViewDetail.add(maandDetail);
   dateViewDetail.add(dagDetail);
   dateViewDetail.add(lineDetail);
   
   rowDetail.add(dateViewDetail);
  scrollView.add(descriptionLabel);
   
   scrollView.add(rowDetail);


scrollView.add(mapViewDetail);

   scrollView.add(routeButton);
   scrollView.add(mylocButtonDetail);
   
   detailWindow.add(scrollView);
