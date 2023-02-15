import { Mycontacts } from './../../models/mycontacts';
import { DetailsComponent } from './../../components/details/details.component';
import { NotificationService } from './../../services/notification.service';
import { MycontactsService } from './../../services/mycontacts.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  displayedColumns = ['foto', 'nome', 'endereco', 'cidade', 'estado', 'email', 'telefone', 'grupo', 'descricao', 'data', 'excluir', 'editar', 'detalhes'];
  dataSource: Mycontacts[] = [];

  constructor(
    private mycontactsService: MycontactsService,
    private notification: NotificationService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.initializeTable();
  }

  private initializeTable(): void {
    this.mycontactsService.findAll().subscribe(mycontacts => {
      this.dataSource = mycontacts;
    });
  }

  public deleteMycontacts(id: string): void {
    this.mycontactsService.deleteMycontacts(id).subscribe(response => {
      this.notification.showMessage("Apagado.");
      this.initializeTable();
    });
  }

  public openDetails(mycontacts: Mycontacts): void {
    this.dialog.open(DetailsComponent, {
      width: "400px",
      data: mycontacts
    });
  }
}
