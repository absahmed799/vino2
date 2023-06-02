import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
@Component({
    selector: 'app-success-dialog',
    template: `
    <h2 mat-dialog-title>Success</h2>
    <mat-dialog-content>
      {{ data.message }}
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button [mat-dialog-close]="true">OK</button>
    </mat-dialog-actions>
  `,
})
export class SuccessDialogComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string }) { }
}