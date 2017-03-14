# calendar-week
Weekly clandar

**date**: [Date() o timestamp de javascript] para la fecha inicial del calendario, si lo omites, arranca el calendario con fecha inicial de hoy

**title**: [True|False] para mostrar o no el título

**nav**: [True|False] para mostrar o no la navegación entre semanas

**firstDay**: [0=domingo|1=lunes] permite que elijas cual quieres que sea el primer día de la semana

**futureWeeks**: [int>0] permite establecer cuantas semanas en el futuro puedes navegar

**arrowPrev,arrowNext**: [string] para que elijas los iconos de navegación

**weekdayNames**: [Array] arreglo con los nombre de los días de la semana

**monthNames**: [Array] arreglo con los nombres de los meses

**onChooseDate**: [Object] callback que regresa la fecha elegida cuando le picas
