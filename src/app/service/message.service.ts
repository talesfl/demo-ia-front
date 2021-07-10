import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class MessageService {

    constructor(private matSnackBack: MatSnackBar) { }

    public showMessage(msg: string): void {
        this.matSnackBack.open(msg, 'Fechar', {
            horizontalPosition: 'right',
            verticalPosition: 'top',
            duration: 2000
        });
    }
}
