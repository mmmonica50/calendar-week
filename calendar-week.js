'use strict';

if('undefined'==typeof jQuery){
    throw new Error('Calendar Week requieres jQuery');
}

(function($){
    $.fn.cwCalendar = function(options){

        let opts = $.extend({}, $.fn.cwCalendar.defaults, options);

        let d;
        if(Date.parse(opts.date)){
            d = opts.date
        }else{
            d = new Date(opts.date);
        }

        let $calendarContainer, calendarNav, calendarTitle;
        let weekCount = 1;
        let fullweek = d._weekArray(opts.firstDay);
        let INITIAL_DAY = fullweek[0][1];
        let INITIAL_MONTH = fullweek[0][2];
        let INITIAL_WEEK = d._getWeek();

        $calendarContainer = $(`<div class="cw-calendar"></div>`);

        if(opts.title){
            calendarTitle = $(`<p class="cw-calendar--title">${opts.monthNames[d.getMonth()]} ${d.getFullYear()}</p>`);
            $(calendarTitle).appendTo($calendarContainer);
        }

        if(opts.nav){
            let leftArrow = `<a href="#">${opts.arrowPrev}</a>`;
            let rightArrow = `<a href="#">${opts.arrowNext}</a>`;
            calendarNav = $(`<div class="cw-calendar__nav"><span class="cw-calendar--arrow cw-calendar--arrow-prev">${leftArrow}</span><span class="cw-calendar--arrow cw-calendar--arrow-next">${rightArrow}</span></div>`);
            $(calendarNav).appendTo($calendarContainer);
        }

        $calendarContainer.find(".cw-calendar--arrow-prev").click(function(e) {
            e.preventDefault();
            if(weekCount > 0){
                weekCount--;
                _changeWeeks(weekCount);
            }
        });

        $calendarContainer.find(".cw-calendar--arrow-next").click(function(e) {
           e.preventDefault();
           if(weekCount <= opts.futureWeeks){
               weekCount++;
               _changeWeeks(weekCount);
           }
        });

        $($calendarContainer).append(_renderCalendar(fullweek));

        return this.each(function(){
            $(this).html($($calendarContainer));
            $('.cw-calendar__body').find('a').on('click', _onChooseDate);
        });

        function _onChooseDate(){
            let date = $(this).data();
            opts.onChooseDate.call(date);
            return false;
        }

        function _renderCalendar(weekDays = [], updateTitle = false) {
            let calendarHeader, calendarDays, calendarBodyHtml;

            calendarHeader = `<thead><tr>`;

            if(opts.firstDay == 0){
                for(let i=0;i<=opts.weekdayNames.length-1;i++){
                    calendarHeader += `<th>${opts.weekdayNames[i]}</th>`;
                }
            }else{
                for(let i=1;i<=opts.weekdayNames.length-1;i++){
                    calendarHeader += `<th>${opts.weekdayNames[i]}</th>`;
                }
                calendarHeader += `<th>${opts.weekdayNames[0]}</th>`;
            }

            calendarHeader += `</tr></thead>`;

            calendarDays = `<tbody><tr>`;

            opts.firstDay == 1 ? weekDays.splice(0, 1) : null;
            weekDays.map((myDay) => {
                if(myDay[2] <= INITIAL_MONTH){
                    if(myDay[1] <= new Date().getDate()){
                        calendarDays += `<td class="disabled"><span>${myDay[1]}</span></td>`;
                    }else{
                        calendarDays += `<td><a href="#" data-date="${myDay[3]}-${("0" + (myDay[2] + 1)).slice(-2)}-${myDay[1]}"><span>${myDay[1]}</span></a></td>`;
                    }
                }else{
                    calendarDays += `<td><a href="#" data-date="${myDay[3]}-${("0" + (myDay[2] + 1)).slice(-2)}-${myDay[1]}"><span>${myDay[1]}</span></a></td>`;
                }
            });

            calendarDays += `</tr></tbody>`;

            calendarBodyHtml = $(`<table class="cw-calendar__body">${calendarHeader} ${calendarDays}</table>`);

            if(updateTitle === true){
                $('.cw-calendar').find('.cw-calendar--title').text(`${opts.monthNames[weekDays[0][2]]} ${weekDays[0][3]}`);
            }

            return $(calendarBodyHtml);
        }

        function _changeWeeks(count) {
            $calendarContainer.find('table').remove();
            let newWeek = new Date().setDate(fullweek[0][1] + (7 * (count)));
            newWeek = new Date(newWeek)._weekArray(opts.firstDay);
            $calendarContainer.append(_renderCalendar(newWeek, true));
        }
    };

    Date.prototype._getWeek = function() {
        this.setHours(0,0,0,0);
        this.setDate(this.getDate() + 4 - (this.getDay()||7));
        let yearStart = new Date(this.getFullYear(),0,1);
        let weekNo = Math.ceil(( ( (this - yearStart) / 86400000) + 1)/7);
        return [this.getFullYear(), weekNo+1];
    };

    Date.prototype._weekArray = function(firstDay) {
        let firstweekdate = this.setDate(this.getDate() - (7+(this.getDay() - 7)));
        let start = new Date(firstweekdate);
        let week = [];

        if(firstDay == 0) {
            for (let i = 0; i < 7; i++) {
                let day = [start.getDay(), start.getDate(), start.getMonth(), start.getFullYear()];
                start.setDate(start.getDate() + 1);
                week.push(day);
            }
        }else{
            for (let i = -1; i < 7; i++) {
                let day = [start.getDay(), start.getDate(), start.getMonth(), start.getFullYear()];
                start.setDate(start.getDate() + 1);
                week.push(day);
            }
        }
        return week;
    };

    $.fn.cwCalendar.defaults = {
        date: new Date(),
        title: true,
        nav: true,
        firstDay: 0,
        futureWeeks: 12,
        arrowPrev: `&lt;`,
        arrowNext: `&gt;`,
        weekdayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        onChooseDate: function(){}
    };

})(jQuery);