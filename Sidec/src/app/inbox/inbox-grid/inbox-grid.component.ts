import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inbox-grid',
  templateUrl: './inbox-grid.component.html',
  styleUrls: ['./inbox-grid.component.css']
})
export class InboxGridComponent implements OnInit {

  // rows = [];
  // loadingIndicator: boolean = true;
  // reorderable: boolean = true;

  // columns = [
  //   { prop: 'name' },
  //   { name: 'Gender' },
  //   { name: 'Company' }
  // ];

  // constructor() {
  //   this.fetch((data) => {
  //     this.rows = data;
  //     setTimeout(() => { this.loadingIndicator = false; }, 1500);
  //   });
  // }

  // fetch(cb) {
  //   const req = new XMLHttpRequest();
  //   req.open('GET', 'assets/data/company.json');

  //   req.onload = () => {
  //     cb(JSON.parse(req.response));
  //   };

  //   req.send();
  // }

  rows = [];
  joke = 'knock knock';
  currentIndex = 0;

  constructor() {
    this.fetch((data) => {
      this.rows = data.splice(0, 5);
    });
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/company.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

  pesquisa(rows, currentIndex) {
    alert(currentIndex)
    
  }

  onSelect({ rows, currentIndex }) {

  }

  ngOnInit() {
  }

}
