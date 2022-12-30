import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ExerciseService } from 'src/app/services/exercise.service';
import { PlansService } from 'src/app/services/plans.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constans';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {
        showError: true
      }
    }
  ]
})
export class PlansComponent implements OnInit {

  onAddPlan = new EventEmitter();

  planUserForm: any = FormGroup;

  planInfoForm: any = FormGroup

  dialogAction: any = 'Add'

  action: any = 'Add'

  responseMessage: any

  workouts: any[] = []

  worstLift: any

  exercises: any[] = []

  genders: any[] = [{ code: "F", name: "Female" },
  { code: "M", name: "Male" }]

  tested: any[] = [{ code: "Yes", name: "Yes" },
  { code: "", name: "No" }]

  equipment: any[] = ['Raw', 'Wraps']

  value: number = 100 / 3


  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any,
    private formBuilder: FormBuilder,
    private planService: PlansService,
    private dialogRef: MatDialogRef<PlansComponent>,
    private snackbarService: SnackbarService,
    private exerciseService: ExerciseService) {

  }
  ngOnInit(): void {
    this.planInfoForm = this.formBuilder.group({
      planName: [null, [Validators.required]],
      planDescription: [null, [Validators.required]],

    })


    this.planUserForm = this.formBuilder.group({
      sex: [null, [Validators.required]],
      age: [null, [Validators.required]],
      equipment: [null, [Validators.required]],
      weight: [null, [Validators.required]],
      squat: [null, [Validators.required]],
      bench: [null, [Validators.required]],
      deadlift: [null, [Validators.required]],
      tested: [null, [Validators.required]],


    })

  }

  handleSubmit(): void {
    console.log(this.planUserForm.value)
    console.log(this.planInfoForm.value)


    // this.add()

  }


  createWorkout(): void {
    this.workouts = [{
      name: "Monday",
      description: "A full-body workout",
      exerciseIds: [1, 2, 3, 4, 5, 6]
    },
    {
      name: "Tuesday",
      description: "A lower body workout",
      exerciseIds: [7, 8, 9, 10]
    },
    {
      name: "Thursday",
      description: "An upper body workout",
      exerciseIds: [11, 12, 13, 14]
    },
    {
      name: "Friday",
      description: "A core workout",
      exerciseIds: [15, 16, 17, 18]
    }]
  }

  defaultValue(): void {
    this.value = 100 / 3
  }
  addValue(): void {
    this.value += 100 / 3
    const data = {
      sex: this.planUserForm.value.sex,
      age: this.planUserForm.value.age,
      equipment: this.planUserForm.value.equipment,
      weight: this.planUserForm.value.weight,
      squat: this.planUserForm.value.squat,
      bench: this.planUserForm.value.bench,
      deadlift: this.planUserForm.value.deadlift,
      tested: this.planUserForm.value.tested
    }

    this.planService.getWorstLift(data).subscribe((response: any) => {
      this.worstLift = response
      console.log(response)
    })

    this.exerciseService.getExercises().subscribe((response: any) => {
      this.exercises = response
      console.log(response)
    })
  }

  minusValue(): void {
    this.value -= 100 / 3
    console.log(this.planInfoForm.value)
  }


  add(): void {



    const data = {
      planName: this.planInfoForm.value.planName,
      planDescription: this.planInfoForm.value.planName,
      workouts: this.workouts
      // {
      //   name: "Workout 1",
      //   description: "A full-body workout",
      //   exerciseIds: [1, 2, 3, 4, 5, 6]
      // },
      // {
      //   name: "Workout 2",
      //   description: "A lower body workout",
      //   exerciseIds: [7, 8, 9, 10]
      // },
      // {
      //   name: "Workout 3",
      //   description: "An upper body workout",
      //   exerciseIds: [11, 12, 13, 14]
      // },
      // {
      //   name: "Workout 4",
      //   description: "A core workout",
      //   exerciseIds: [15, 16, 17, 18]
      // }
      ,
      sex: this.planUserForm.value.sex,
      age: this.planUserForm.value.age,
      equipment: this.planUserForm.value.equipment,
      weight: this.planUserForm.value.weight,
      squat: this.planUserForm.value.squat,
      bench: this.planUserForm.value.bench,
      deadlift: this.planUserForm.value.deadlift,
      tested: this.planUserForm.value.tested
    };



    this.planService.addPlan(data).subscribe((response: any) => {
      this.dialogRef.close();
      this.onAddPlan.emit();
      this.responseMessage = response.message;
      this.snackbarService.openToast(this.responseMessage, 'success')
    }, (error: any) => {

      this.dialogRef.close()
      if (error.error?.message) {
        console.log(this.responseMessage)
        this.responseMessage = error.error?.message
      } else {
        this.responseMessage = GlobalConstants.genericError
      }
      this.snackbarService.openToast(this.responseMessage, GlobalConstants.error)
    })
  }

}
