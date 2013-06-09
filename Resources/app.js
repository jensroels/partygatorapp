var jsonObject;
var tabGroup = Titanium.UI.createTabGroup();
Ti.include('facebook.js');


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




if(checkonline()){
	loginWindow.open();
}

if(isUserLoggedInFacebook())
{
	alert("user is ingelogd in facebook");
}
