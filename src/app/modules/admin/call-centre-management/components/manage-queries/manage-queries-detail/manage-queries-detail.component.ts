import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-manage-queries-detail',
  templateUrl: './manage-queries-detail.component.html',
  styleUrls: ['./manage-queries-detail.component.scss']
})
export class ManageQueriesDetailComponent implements OnInit {

  form: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

}
