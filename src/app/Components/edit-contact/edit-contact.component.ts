import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { iContact } from 'src/app/models/iContact';
import { iGroup } from 'src/app/models/iGroup';
import { ContactService } from 'src/app/Services/contact.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css'],
})
export class EditContactComponent implements OnInit {
  public loading: boolean = false;
  public contactId: string | null = null;
  public contact: iContact = {} as iContact;
  public errorMessage: string | null = null;
  public groups: iGroup[] = [] as iGroup[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private contactService: ContactService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.contactId = paramMap.get('contactId');
    });
    if (this.contactId) {
      this.loading = true;
      this.contactService.getContact(this.contactId).subscribe(
        (data: iContact) => {
          this.contact = data;
          this.loading = false;
          this.contactService.getAllGroups().subscribe((data: iGroup[]) => {
            this.groups = data;
          });
        },
        (error) => {
          this.errorMessage = error;
          this.loading = false;
        }
      );
    }
  }

  public editContact() {
    this.loading = true;
    if(this.contactId){
      this.contactService.updateContact(this.contact, this.contactId)
      .subscribe((data: iContact) => {
        this.contact = data;
        this.router.navigate([`/`]).then();
        this.loading = false;

    },
    (error) => {
     this.errorMessage = error;
     this.router.navigate([`/contacts/edit/${this.contact}`]).then();
    })
    
       
  };
  }
}
