
(function () {
    // create an object to store the models for each view
    window.APP = {}
    var app;

    // this function is called by Cordova when the application is loaded by the device
	document.addEventListener('deviceready', function () {  
      
        // hide the splash screen as soon as the app is ready. otherwise
        // Cordova will wait 5 very long seconds to do it for you.
		navigator.splashscreen.hide();

        var authToken = window.localStorage.getItem("authToken");
        var initialView;
        
        if(authToken) {
            initialView = "today";
            APP.refreshData();
        } else {
            initialView = "login";
        }
        
        app = new kendo.mobile.Application(document.body, {
            // you can change the default transition (slide, zoom or fade)
            transition: 'slide',
            
            // comment out the following line to get a UI which matches the look
            // and feel of the operating system
            skin: 'flat',
            
            // the application needs to know which view to load first
            initial: 'views/'+initialView+'.html'
            //initial: 'views/today.html'
        });

    }, false);
    
    APP.refreshData = function() {
        APP.Engine.GetLessons().success(function(data) {
            APP.models.today.update(data.lessons);
            APP.models.tomorrow.update(data.lessons);
            APP.models.upcomings.update(data.lessons);
            APP.models.all.update(data.lessons);
            app.view().header.find(".last-updated SPAN").text(moment(data.lastCheck).fromNow());//.format('LT')            
        });
    }

}());