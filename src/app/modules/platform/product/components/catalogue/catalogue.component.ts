import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss']
})
export class CatalogueComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  fileChange(event): void {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file = fileList[0];

      console.log(file);

      // const formData = new FormData();
      // formData.append('file', file, file.name);
      //
      // const headers = new Headers();
      // // It is very important to leave the Content-Type empty
      // // do not use headers.append('Content-Type', 'multipart/form-data');
      // headers.append('Authorization', 'Bearer ' + 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9....');
      // const options = new RequestOptions({headers: headers});
      //
      // this.http.post('https://api.mysite.com/uploadfile', formData, options)
      //   .map(res => res.json())
      //   .catch(error => Observable.throw(error))
      //   .subscribe(
      //     data => console.log('success'),
      //     error => console.log(error)
      //   );
    }
  }

}
