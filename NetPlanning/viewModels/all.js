/*!
 * NetPlanning
 * Antonino Parisi <tabman83@gmail.com>
 *
 * File name:	all.js
 * Created:		9/4/2014 19.20
 * Description:	Model for All lessons view
 */

(function (global) {
    var APP = global.APP = global.APP || {};
    
    var ViewModel = kendo.data.ObservableObject.extend({
        
        ds: [],
        isEmpty: true,
        
        update: function(lessons) {
            var ds = [];
            
            $.each( lessons, function(i, dataEl) {
                var lesson = {
                    name: dataEl.name,
                    img: dataEl.kind+'.png',
                    sortableTime: moment(dataEl.begin).unix(),
                    time: moment(dataEl.begin),
                    day: moment(dataEl.begin).startOf('day').valueOf()
                };
                ds.push(lesson);
            });
            
            var groupedData = new kendo.data.DataSource({
                data: ds,
                group: { field: "day" },
                sort: { field: "sortableTime", dir: "asc" },
            });   
            this.set("ds", groupedData);
            var isEmpty = false;
            this.set("isEmpty", isEmpty);
        },
        
        init: function () {
            kendo.data.ObservableObject.fn.init.apply(this, []);
        }
    });
    
    APP.models = APP.models || {};
    APP.models.all = new ViewModel();    
})(window);