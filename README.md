# Calendar week
Weekly clandar vanilla javascript widget

## Basic usage example

```HTML
  ...
  <div id="calendar"></div>
  ...
```

``` javascript
  $("#calendar").cwCalendar();
```


| Option           | Description                                    | Values                     | Default      |
|------------------|------------------------------------------------|----------------------------|--------------|
| **date**         | `Date()` object or javascript timestamp        | `Date()`                   | `new Date()` |
| **title**        | Show calendar title                            | Boolean                    | True         |
| **nav**          | Show week navigation arrows                    | Boolean                    | True         |
| **firstDay**     | Day to start the week (Sunday or Monday)       | Sunday = 0 <br> Monday = 1 | 0            |
| **futureWeeks**  | Number of weeks to show in the future          | Int > 0                    | 12           | 
| **arrowPrev**    | Icon for navigation to previous weeks          | Fontawesome or HTML icon   | `&lt`        |
| **arrowNext**    | Icon for navigation to next weeks              | Fontawesome or HTML icon   | `&gt`        |
| **weekdayNames** | Weekday names                                  | Array                      | Domingo <br> Lunes <br> Martes <br> Miércoles <br> Jueves <br> Viernes <br> Sábado |
| **monthNames**   | Month names                                    | Array                      | Enero <br> Febrero <br> Marzo <br> Abril <br> Mayo <br> Junio <br> Julio <br> Agosto <br> Septiembre <br> Octubre <br> Noviembre <br> Diciembre |
| **onChooseDate** | Date select callback                           | Function                   | Not set      |