import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, NavParams } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { Exercise } from '../../interfaces/exercise';

@Component({
  selector: 'app-exercise-detail',
  templateUrl: './exercise-detail.page.html',
  styleUrls: ['./exercise-detail.page.scss'],
})
export class ExerciseDetailPage implements OnInit {

  exercise: Exercise;

  constructor(private dataService: DataService, 
              private route: ActivatedRoute) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.dataService.getExercises().subscribe((data: Exercise[]) => {
      const id = this.route.snapshot.paramMap.get('id');
      if (data) {
        for (const exercise of data) {
          if (exercise && exercise.id === id) {
            this.exercise = exercise;
            break;
          }
        }
      }
    });
  }

}
