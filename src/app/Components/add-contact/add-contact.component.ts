import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { iContact } from 'src/app/models/iContact';
import { iGroup } from 'src/app/models/iGroup';
import { ContactService } from 'src/app/Services/contact.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css'],
})
export class AddContactComponent implements OnInit {
  public loading: boolean = false;
  public contact: iContact = {} as iContact;
  public errorMessage: string | null = null;
  public contactId: string | null = null;
  public groups: iGroup[] = [] as iGroup[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private contactService: ContactService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.contactService.getAllGroups().subscribe(
      (data: iGroup[]) => {
        this.groups = data;
        this.loading = false;
      },
      (error) => {
        this.errorMessage = error;
        this.loading = false;
      }
    );
  }

  public createSubmit() {
    this.contactService.saveContact(this.contact).subscribe(
      (data: iContact) => {
        this.loading = true;
        this.contact = data;
        this.router.navigate(['/']).then();
        this.loading = false;
      },

      (error) => {
        this.errorMessage = error;
        this.router.navigate(['/contacts/add']).then();
      }
    );
  }
}
