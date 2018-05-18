import { Component, OnInit } from '@angular/core';
import { IContact } from '../icontact';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { MatTable, MatDialog, MatDialogRef } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { ContactService } from '../contact.service';
import { ContactViewDialogComponent } from '../contact-view-dialog/contact-view-dialog.component';
import { ContactAddComponent } from '../contact-add/contact-add.component';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  displayedColumns: String[] = ['name', 'company', 'address', 'view'];
  dataSource: DataSource<any> = new ContactDataSource(this.contactService);
  private contacts: IContact[];

  constructor(private contactService: ContactService, private dialog: MatDialog) {
    this.contactService.list()
      .pipe(map(response => response.json()))
      .subscribe(response => this.contacts = response);
  }

  ngOnInit() {
  }

  openDialog(id: string): void {
    this.contactService.view(id)
      .pipe(map((response: Response) => response.json()))
      .subscribe((response: Promise<Response>) => {
        const dialogRef: MatDialogRef<ContactViewDialogComponent> = this.dialog.open(ContactViewDialogComponent, {
          id: 'contact-dialog',
          width: '400px',
          data: response
        });
        dialogRef.afterClosed().subscribe(() => this.dataSource = new ContactDataSource(this.contactService));
      });
  }

  openAddDialog(): void {
    const dialogRef: MatDialogRef<ContactAddComponent> = this.dialog.open(ContactAddComponent, {
      id: 'add-dialog',
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(() => this.dataSource = new ContactDataSource(this.contactService));
  }

}

export class ContactDataSource extends DataSource<any> {
  constructor(private contactService: ContactService) {
    super();
  }
  connect(): Observable<any> {
    return this.contactService.list()
      .pipe(
        map((response: any) => response.json()),
        catchError((error: Error) => Observable.throw(error))
      );
  }

  disconnect() { }
}
