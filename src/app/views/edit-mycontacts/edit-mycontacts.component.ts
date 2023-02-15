import { Mycontacts } from 'src/app/models/mycontacts';
import { MycontactsService } from './../../services/mycontacts.service';
import { UploadService } from './../../services/upload.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from './../../services/notification.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator, NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-mycontacts',
  templateUrl:'./edit-mycontacts.component.html',
  styleUrls:['./edit-mycontacts.component.css']
})
export class EditMycontactsComponent implements OnInit {

  public mycontacts!: Mycontacts;

  public isLoadUpload: boolean = false;

  constructor(
    private notification: NotificationService,
    private mycontactsService: MycontactsService,
    private router: Router,
    private route: ActivatedRoute,
    private uploadService: UploadService
  ) { }

  ngOnInit(): void {
    this.initilizeFields();
  }

  private initilizeFields(): void {
    const id = this.route.snapshot.params["id"];
    this.mycontactsService.findById(id).subscribe(mycontacts => {
      this. mycontacts = mycontacts;
    });
  }

  public updateMycontacts(form: NgForm): void {
    if(form.valid) {
      this.mycontactsService.updateMycontacts(this.mycontacts).subscribe(response => {
        this.notification.showMessage("Atualizado com sucesso.");
        this.router.navigate(["/dashboard"]);
      });
    }
    else {
      this.notification.showMessage("Dados inválidos.");
    }
  }

  public uploadFile(event: any): void {
    this.isLoadUpload = true;
    const file: File = event.target.files[0];
    this.uploadService.uploadFoto(file).subscribe(uploadResult  => {
      this.isLoadUpload = false;
      const storageReference = uploadResult.ref;
      const promiseFileUrl = storageReference.getDownloadURL();
      promiseFileUrl.then((fotoUrl: string) => {
        this.mycontacts.fotoUrl = fotoUrl;
      })
    });
  }
}
