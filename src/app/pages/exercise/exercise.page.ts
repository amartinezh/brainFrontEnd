import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Exercise } from 'src/app/interfaces/exercise';
import { DataService } from 'src/app/services/data.service';
import { Storage } from '@ionic/storage';
import { Adult } from '../../interfaces/adult';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.page.html',
  styleUrls: ['./exercise.page.scss'],
})
export class ExercisePage implements OnInit {

  exercises: Observable<Exercise[]>;
  aSession: Adult;
  eSession: Exercise[];
  eResults: {value: string, Excercise}[];
  results: string[]=[];

  constructor( private dataService: DataService, private storage: Storage, public router: Router) { }

  ngOnInit() {
    // this.exercises = this.dataService.getExercises();
    this.getExercises().then((res) => {
      console.log(res);
      this.setSessionExercises(res.exercises);
      this.setSessionAdult(res.adult);
    });
    
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
    console.log(ev.detail.value);
    this.results.push(ev.detail.value);
  }

  async getExercises() {
    return await this.storage.get('workSession');
  }

  setSessionExercises(exercises: Exercise[]){
    this.eSession = exercises;
    console.log("Los ejercicios han sido cargados correctamente: ", this.eSession);
  }

  setSessionAdult(adult: Adult){
    this.aSession = adult;
    console.log("El adulto ha sido cargado correctamente: ", this.aSession);
  }

  onClick(){
    console.log(this.results);
    this.router.navigateByUrl('/session-results');
  }

}