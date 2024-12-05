import { Component } from '@angular/core';
import { MoviesService } from '../movies.service';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrl: './nav.component.css',
    standalone: false
})
export class NavComponent {


  
ngOnInit() {

  console.log("Nigit On");
}


 Button()
{
  console.log("Button pressed");
}

}
