/*!
 * NetPlanning
 * Antonino Parisi <tabman83@gmail.com>
 *
 * File name:	login.js
 * Created:		9/2/2014 19.01
 * Description:	Model for Login view
 */

(function (global) {
    var APP = global.APP = global.APP || {};
    
    var ViewModel = kendo.data.ObservableObject.extend({
        isLoggedIn: false,
        username: "",
        password: "",
        login: function() {
            APP.Engine.Login("R3775","NLCGL").success(function(data) {
                var authToken = data.authToken;
                window.localStorage.setItem("authToken", authToken);
            })
        }
    });
    
    APP.models = APP.models || {};
    APP.models.login = new ViewModel();    
})(window);