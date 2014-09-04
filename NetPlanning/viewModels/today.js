/*!
 * NetPlanning
 * Antonino Parisi <tabman83@gmail.com>
 *
 * File name:	today.js
 * Created:		9/2/2014 19.01
 * Description:	Model for Today view
 */

(function (global) {
    var APP = global.APP = global.APP || {};
    
    var ViewModel = kendo.data.ObservableObject.extend({
        
        dsMorning: [],
        dsAfternoon: [],
        isEmpty: true,
        
        update: function(lessons) {
            var dsMorning = [];
            var dsAfternoon = [];
            
            $.each( lessons, function(i, dataEl) {
                
                var lesson = {
                    name: dataEl.name,
                    img: dataEl.kind+'.png',
                    time: moment(dataEl.begin)
                };
                var today = moment().startOf('day');
                var isToday = today.isSame(lesson.time, 'day');
                
                if( isToday ) {          
                    var midDay = today.hour(12).second(1);
                    if( lesson.time.isBefore(midDay) ) {
                        dsMorning.push(lesson);
                    } else {
                        dsAfternoon.push(lesson);
                    }                            
                }                        
            });
            this.set("dsMorning", dsMorning);
            this.set("dsAfternoon", dsAfternoon);
            
            var isEmpty = dsMorning.length+dsAfternoon.length == 0;
            this.set("isEmpty", isEmpty);
        },
        
        init: function () {
            kendo.data.ObservableObject.fn.init.apply(this, []);
        }
    });
    
    APP.models = APP.models || {};
    APP.models.today = new ViewModel();    
})(window);