import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/domain/user';

@Component({
  selector: 'app-dialog-edit',
  templateUrl: './dialog-edit.component.html',
  styleUrls: ['./dialog-edit.component.scss']
})
export class DialogEditComponent {

  public user: User;

  constructor(
    private dialogRef: MatDialogRef<DialogEditComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { user: User }
  ) {
    this.user = this.data.user;
  }

  public onUserChange(user: User): void {
    if (user?.id) {
      this.dialogRef.close();
    }
  }

}
