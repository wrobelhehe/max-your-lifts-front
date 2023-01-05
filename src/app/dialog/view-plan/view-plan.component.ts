import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { PlansService } from 'src/app/services/plans.service';

@Component({
  selector: 'app-view-plan',
  templateUrl: './view-plan.component.html',
  styleUrls: ['./view-plan.component.scss']
})




export class ViewPlanComponent implements OnInit {

  displayedColumns: string[] = [
    'plan_name',
    'plan_description',
    'weight',
    'squat',
    'bench',
    'deadlift',

  ];


  displayedColumns2: string[] = [

    'workout_name',
    'name',
    'description',
    'reps',
    'sets',
    'rpe',
    'tempo',
    'video_url'


  ];
  data: any

  dataSource: any

  workoutDataSource: any

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any,

    private dialogRef: MatDialogRef<ViewPlanComponent>, private planService: PlansService) {

  }
  openLink(link: string): void {
    window.open(link, '_blank');
  }

  ngOnInit(): void {
    this.data = this.dialogData.data
    this.viewPlan(this.data.plan_id)

  }

  viewPlan(id: any): void {
    this.planService.generatePlan(id).subscribe((response: any) => {
      this.dataSource = new MatTableDataSource([response])
      this.workoutDataSource = new MatTableDataSource(response.workouts)
      console.log(this.workoutDataSource)
      console.log(this.dataSource)

    })
  }
}


