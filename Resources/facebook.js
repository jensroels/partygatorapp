//setup facebook login
Ti.Facebook.appid = '155274344550663';
Ti.Facebook.permissions = ['user_events,friends_events']; // Permissions your app needs
Ti.Facebook.addEventListener('login', function(e) {
    if (e.success) {
    	//als de user is ingelogd starten maken we de rest van de screens aan
        alert('Logged in');     
    }
});
	

var loginWindow = Titanium.UI.createWindow({
	title:'login',
    backgroundImage:'./Default.png',
	barColor:"#3DD3A1",
    navBarHidden:true
})

//facebook login button toevoegen aan het inlog window
loginWindow.add(Ti.Facebook.createLoginButton({
    top : 350,
    style : Ti.Facebook.BUTTON_STYLE_WIDE
}));
