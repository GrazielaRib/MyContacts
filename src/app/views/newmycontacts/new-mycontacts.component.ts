import { MycontactsService } from './../../services/mycontacts.service';
import { Mycontacts } from '../../models/mycontacts';
import { UploadService } from '../../services/upload.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-contacts',
  templateUrl:'./new-mycontacts.component.html',
  styleUrls:['./new-mycontacts.component.css']
})
export class NewContactsComponent implements OnInit {

  public formMycontacts!: FormGroup;

  public isLoadUpload: boolean = false;
  private fotoUrl: string = "";
  mycontactsService: any;

  constructor(
    fb: FormBuilder,
    private notification: NotificationService,
    private MycontactsService: MycontactsService,
    private router: Router,
    private uploadService: UploadService
  ) {
    this.formMycontacts = fb.group({
      nome: ["", [Validators.required]],
      endereco: ["", [Validators.required]],
      cidade: ["", [Validators.required]],
      estado: ["", [Validators.required]],
      pessoa: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      telefone: ["", [Validators.required]],
      grupo: ["", [Validators.required]],
      descricao: ["", [Validators.required]],
      data: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  public createmycontacts(): void {
    if(this.formMycontacts.valid) {
      const mycontacts: Mycontacts  = this.formMycontacts.value;
      mycontacts.fotoUrl = this.fotoUrl;
      this.mycontactsService.createMycontacts(mycontacts).subscribe((response: any) => {
        this.notification.showMessage("Cadastrado com sucesso.");
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
        this.fotoUrl = fotoUrl;
      })
    });
  }
}
