import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-call-centre-management',
  templateUrl: './call-centre-management.component.html',
  styleUrls: ['./call-centre-management.component.scss']
})
export class CallCentreManagementComponent implements OnInit {

  constructor() { }
  menus: any = [
    { name: 'Manage queries', link: 'manage-queries' },
    { name: 'Manage complaints', link: 'manage-complaints' },
    { name: 'View details', link: 'view-details' },
  ];
  clicked: number;
  ngOnInit(): void {
  }

}
