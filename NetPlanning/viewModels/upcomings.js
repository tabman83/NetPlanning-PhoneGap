/*!
 * NetPlanning
 * Antonino Parisi <tabman83@gmail.com>
 *
 * File name:	upcomings.js
 * Created:		9/4/2014 17.30
 * Description:	Model for Upcoming lessons view
 */

(function (global) {
    var APP = global.APP = global.APP || {};
    
    var ViewModel = kendo.data.ObservableObject.extend({
        
        ds: [],
        isEmpty: true,
        
        update: function(lessons) {
            var ds = [];
            var count = 0;
        	var now = moment();
            
            $.each( lessons, function(i, dataEl) {
                
                var lesson = {
                    name: dataEl.name,
                    img: dataEl.kind+'.png',
                    time: moment(dataEl.begin)
                };
                
            	if( lesson.time.diff(now, 'minutes') > -30 ) {
        			ds.push(lesson);
        			count++;
                }
    
				if(count==5) return false;
            });
            this.set("ds", ds);
            var isEmpty = ds.length == 0;
            this.set("isEmpty", isEmpty);
        },
        
        init: function () {
            kendo.data.ObservableObject.fn.init.apply(this, []);
        }
    });
    
    APP.models = APP.models || {};
    APP.models.upcomings = new ViewModel();    
})(window);