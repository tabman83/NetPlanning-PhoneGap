/*!
 * NetPlanning
 * Antonino Parisi <tabman83@gmail.com>
 *
 * File name:	engine.js
 * Created:		9/2/2014 20.17
 * Description:	Engine
 */

(function (global) {
    var APP = global.APP = global.APP || {};
    
    var Engine = {};
    
    Engine._config = {
        serverUrl: "http://netplanning.thenino.net:50000",
        apiVersion: "v1",
        secret: "sVkJsK41#>P_GN?:y)]FPL~r?MV3`0x-!N{4J.X4`Xu87M-<.T:+??;el@yKU_73"
    }
    
    Engine._callApi = function(methodName, data) {
        var authToken = window.localStorage.getItem("authToken");
        var data = JSON.stringify(data || {});
        var signature = CryptoJS.HmacMD5(data, this._config.secret);
        return $.ajax({
            type : "POST",
            url : this._config.serverUrl+'/'+this._config.apiVersion+'/'+methodName,
            contentType: "application/json; charset=utf-8",
            data: data,
            dataType: "json",
            headers : { 
                Authorization : authToken,
                Signature : signature
            }
        });
    }
    
    Engine.Login = function(username, password) {
        var data = {
            username: username,
            password: password
        }
        return this._callApi('login', data);
    }
    
    
    APP.Engine = Engine;
})(window);