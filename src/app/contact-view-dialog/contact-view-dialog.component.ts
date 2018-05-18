import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { ContactService } from '../contact.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ConfirmDeleteDialogComponent } from '../confirm-delete-dialog/confirm-delete-dialog.component';
import { IContact } from '../icontact';

@Component({
  selector: 'app-contact-view-dialog',
  templateUrl: './contact-view-dialog.component.html',
  styleUrls: ['./contact-view-dialog.component.css']
})
export class ContactViewDialogComponent implements OnInit {
  displayed: Boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<any>,
    private contactService: ContactService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }

  displayForm(): Boolean {
    return this.displayed = true;
  }

  openConfirmDeleteDialog(id: string): void {
    const dialogRef: MatDialogRef<ConfirmDeleteDialogComponent> = this.dialog.open(ConfirmDeleteDialogComponent, {
      id: 'add-dialog',
      width: '400px',
      data: {
        title: 'Confirmation',
        message: 'Are you sure you want to delete this contact?'
      }
    });
    dialogRef.afterClosed().subscribe((confirmation: Response) => {
      if (confirmation) {
        this.contactService
          .delete(id)
          // .pipe(map((response: any) => response.json()))
          .subscribe((response: Response) => {
            if (response.ok) {
              this.notify('Contact deleted');
              this.dialog.getDialogById('contact-dialog').close();
            }
          });
      }
    });
  }

  save(id: string, data: any): void {
    delete data._id;
    this.contactService
      .save(id, data)
      // .pipe(map((response: Response) => response.json()))
      .subscribe((response: Response) => {
        if (response.ok) {
          this.dialog.getDialogById('contact-dialog').close();
          this.notify(`${data.name} updated.`);
        }
      });
  }

  close() {
    this.dialogRef.close();
  }

  notify(message) {
    this.snackBar.open(message, 'Ok', { duration: 10000 });
  }

}
