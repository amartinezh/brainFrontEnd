import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Exercise } from 'src/app/interfaces/exercise';
import { DataService } from 'src/app/services/data.service';
import { Storage } from '@ionic/storage';
import { Adult } from '../../interfaces/adult';
import { Router } from '@angular/router';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Howl } from 'howler'
import { IonRange } from '@ionic/angular';

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
  activeTrack: string = null;
  player: Howl = null;
  isPlaying = false;
  progress = 0;
  mediaObservations: string[]=[];
  exerciseObservations: string[]=[];


  @ViewChild('range', { static: false }) range: IonRange;

  constructor( private dataService: DataService, private storage: Storage, public router: Router) { }

  ngOnInit() {
    // this.exercises = this.dataService.getExercises();
    this.getExercises().then((res) => {
      console.log(res);
      this.setSessionExercises(res.exercises);
      this.setSessionAdult(res.adult);
    });
    
  }

  segmentChanged(ev: any, i) {
    console.log('Segment changed', ev);
    console.log(ev.detail.value);
    console.log('Index'+i);
    console.log(this.mediaObservations);
    console.log(this.exerciseObservations);
    //this.results.push(ev.detail.value);
    //value=1 correcto; value=0 erroneo
    this.results.splice(i, 1, ev.detail.value);
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

  async onClick(){
    console.log(this.results);
    await this.storage.set('ExerciseObservations', this.exerciseObservations);
    await this.storage.set('WorkSessionResults', this.results);
    const session = await this.storage.get('workSession');

    await this.storage.set('workSession',{'id':session.id,'exercises':session.exercises,'adult':session.adult, 'user':session.user ,'date':session.date, 'results':this.results, 'exerciseObservations':this.exerciseObservations});
    this.router.navigateByUrl('/session-results');
  }

  drop(event: CdkDragDrop<string[]>, index: string) {
    moveItemInArray(this.eSession[index].media, event.previousIndex, event.currentIndex);
  }

  dropWords(event: CdkDragDrop<string[]>, index: string) {
    moveItemInArray(this.eSession[index].media  , event.previousIndex, event.currentIndex);
  }


  start(trackPath: string){
    if(this.player){
      this.player.stop();
    }
    this.player = new Howl({
      src: [trackPath],
      onplay: () => {
        this.isPlaying=true;
        this.activeTrack=trackPath;
        this.updateProgress();
      },
      onend: () => {
        this.isPlaying=false;
        this.activeTrack=null;
        this.player.stop();
      }
    });
    this.player.play();
  }

  togglePlayer(pause, index){
    this.isPlaying=!pause;
    if(this.player){
      if(pause){
        this.player.pause();
      }else {
        this.player.play();
      }
    } else {
      let tracknum = Math.floor(Math.random() * (this.eSession[index].media.length- 0)) + 0;
      this.start(this.eSession[index].media[tracknum]);
    }

  }

  seek(){
    let newValue = +this.range.value;
    let duration = this.player.duration();
    this.player.seek(duration * (newValue / 100));
  }

  updateProgress(){
    let seek = this.player.seek();
    this.progress = (seek / this.player.duration()) * 100 || 0;
    setTimeout(() => {
      this.updateProgress();
    }, 1000);
  }


}
