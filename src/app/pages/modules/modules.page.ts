import { Component, OnInit } from '@angular/core';
import { Exercise } from 'src/app/interfaces/exercise';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-modules',
  templateUrl: './modules.page.html',
  styleUrls: ['./modules.page.scss'],
})
export class ModulesPage implements OnInit {

  exercises: Observable<Exercise[]>;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.exercises = this.dataService.getExercises();
    console.log(this.exercises);
  }

}
