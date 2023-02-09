import { Mycontacts } from 'src/app/models/mycontacts';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
mycontacts: any;

  constructor(@Inject(MAT_DIALOG_DATA) public Mycontacts: Mycontacts) { }

  ngOnInit(): void {
  }

}
