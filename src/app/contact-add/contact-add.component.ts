import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { ContactService } from '../contact.service';
import { map } from 'rxjs/operators';
import { IContact } from '../icontact';

@Component({
  selector: 'app-contact-add',
  templateUrl: './contact-add.component.html',
  styleUrls: ['./contact-add.component.css']
})
export class ContactAddComponent implements OnInit {

  data: Object = {};
  constructor(private dialogRef: MatDialogRef<any>,
    private contactService: ContactService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  save(contact: IContact): void {
    this.contactService.add(contact).subscribe((response: Response) => {
      if (response.ok) {
        this.dialog.getDialogById('add-dialog').close();
        this.notify(`${contact.name} added`);
      }
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  notify(message: string): void {
    this.snackBar.open(message, 'Ok', { duration: 10000 });
  }

}
