import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SidecDomains } from './services/esri/sidec-domains.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})


export class AppComponent implements OnInit{

  title = 'SIDEC';
  
  constructor(private router: Router) {
    
   }

  ngOnInit() {
    if (!SidecDomains.initialized) {
      this.router.navigate(['']);
    }
  }
}
