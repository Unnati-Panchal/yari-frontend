import { MatDateFormats } from '@angular/material/core';

export const MatDateFormat: MatDateFormats = {
    parse: {
        dateInput: 'YYYY-MM-DD'
    },
    display: {
        dateInput: 'YYYY-MM-DD',
        monthYearLabel: 'MM YYYY',
        dateA11yLabel: 'DD.MM.YYYY',
        monthYearA11yLabel: 'MM YYYY'
    }
};
