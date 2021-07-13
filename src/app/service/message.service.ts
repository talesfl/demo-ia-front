import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class MessageService {

    constructor(private matSnackBack: MatSnackBar) { }

    public showMessage(msg: string): void {
        this.matSnackBack.open(msg, 'Close', {
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            duration: 2300
        });
    }
}
