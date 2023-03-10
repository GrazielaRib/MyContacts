import { Router } from '@angular/router';
import { NotificationService } from './../../services/notification.service';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

@Component({
  selector: 'toolbar-basic-example',
  templateUrl: 'toolbar-basic-example.html',
  styleUrls: ['toolbar-basic-example.css'],
})


export class HeaderComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private notification: NotificationService,
    private router: Router
  ) { }



  ngOnInit(): void {
  }

  public logout(): void {
    this.authService.logout().subscribe(response => {
      this.notification.showMessage("Até mais!");
      this.router.navigate(["/login"]);
    });
  }
}
