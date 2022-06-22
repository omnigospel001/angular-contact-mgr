import { Component, OnInit } from '@angular/core';
import { iContact } from 'src/app/models/iContact';
import { ContactService } from 'src/app/Services/contact.service';

@Component({
  selector: 'app-contact-manager',
  templateUrl: './contact-manager.component.html',
  styleUrls: ['./contact-manager.component.css'],
})
export class ContactManagerComponent implements OnInit {
  public loading: boolean = false;
  public contacts: iContact[] = [];
  public errorMessage: string | null = null;

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.getAllContactsFromServer();
  }

  public getAllContactsFromServer() {
    this.loading = true;
    this.contactService.getAllContacts().subscribe(
      (data: iContact[]) => {
        this.contacts = data;
        this.loading = false;
      },
      (error) => {
        this.errorMessage = error;
        this.loading = false;
      }
    );
  }

  public deleteContact(contactId: string | undefined) {
    if (contactId) {
      this.contactService.deleteContact(contactId).subscribe(
        (data: {}) => {
          this.getAllContactsFromServer();
        },
        (errror) => {
          this.errorMessage = errror;
        }
      );
    }
  }
}