/*!
 * NetPlanning
 * Antonino Parisi <tabman83@gmail.com>
 *
 * File name:	tomorrow.js
 * Created:		9/3/2014 18.57
 * Description:	Model for Tomorrow view
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
                var tomorrow = moment().startOf('day').add('days', 1);
                var isTomorrow = tomorrow.isSame(lesson.time, 'day');
                
                if( isTomorrow ) {      
                    var midDay = tomorrow.hour(12).second(1);
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
    APP.models.tomorrow = new ViewModel();    
})(window);