import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';
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

  userData: any

  workoutData: any = {
    name: '',
    description: '',
    exercise: []
  }

  allData: any


  squatExercises: any[] = []
  benchExercises: any[] = []
  deadliftExercises: any[] = []
  rowExercises: any[] = []
  exercisesWorkout: any[] = []
  worstExercises: any[] = []
  restExercises: any[] = []



  exercises: any[] = []

  categories: any[] = []

  genders: any[] = [{ code: "F", name: "Female" },
  { code: "M", name: "Male" }]

  tested: any[] = [{ code: "Yes", name: "Yes" },
  { code: " ", name: "No" }]

  equipment: any[] = ['Raw', 'Wraps']

  value: number = 100 / 3
  worstLift: any

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any,
    private formBuilder: FormBuilder,
    private planService: PlansService,
    private dialogRef: MatDialogRef<PlansComponent>,
    private categoryService: CategoryService,
    private snackbarService: SnackbarService,
    private exerciseService: ExerciseService) {
    this.exerciseService.getExercises().subscribe((response: any) => {
      this.exercises = response;
      this.restExercises = response.filter((exercise: any) => {
        return exercise.category_id != 1 && exercise.category_id != 2 && exercise.category_id != 3 && exercise.category_id != 4;
      });
    });
    this.exerciseService.getByCategory(1).subscribe((response: any) => {
      this.benchExercises = response
    })
    this.exerciseService.getByCategory(2).subscribe((response: any) => {
      this.squatExercises = response

    })

    this.exerciseService.getByCategory(3).subscribe((response: any) => {
      this.deadliftExercises = response

    })

    this.exerciseService.getByCategory(4).subscribe((response: any) => {
      this.rowExercises = response

    })



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

  handleSubmit(worstLift: number) {
    this.exerciseService.getByCategory(worstLift).subscribe((response: any) => {
      this.worstExercises = response
      this.workouts = this.selectRandomObjects(this.squatExercises, this.benchExercises, this.deadliftExercises, this.rowExercises, this.worstExercises, this.restExercises)

      const data = {
        planName: this.planInfoForm.value.planName,
        planDescription: this.planInfoForm.value.planName,
        workouts: this.workouts

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
          this.responseMessage = error.error?.message
        } else {
          this.responseMessage = GlobalConstants.genericError
        }
        this.snackbarService.openToast(this.responseMessage, GlobalConstants.error)
      })

    })


  }

  private selectRandomObjects(array1: any[], array2: any[], array3: any[], array4: any[], array5: any[], array6: any[]) {
    const workouts = [];  // array to store the workout objects

    // create copies of the input arrays to avoid mutating the original arrays
    const array1Copy = [...array1];
    const array2Copy = [...array2];
    const array3Copy = [...array3];
    const array4Copy = [...array4];
    const array5Copy = [...array5];
    const array6Copy = [...array6];

    const arrays = [array1Copy, array2Copy, array3Copy, array4Copy, array5Copy, array6Copy];  // array of the copy arrays

    for (let i = 0; i < 4; i++) {  // loop 4 times to create 4 workouts
      const output: any[] = [];  // create a new output array for each iteration

      for (const array of arrays) {  // iterate through the arrays
        if (array.length > 0) {
          let object;
          do {
            // select a random object from the array
            const index = Math.floor(Math.random() * array.length);
            object = array[index];
          } while (output.includes(object.id));  // make sure the object has not been added to the output array
          output.push(object.id);  // add the object's ID to the output array
          array.splice(array.indexOf(object), 1);  // remove the object from the array
        }
      }

      workouts.push({  // add a new workout object to the workouts array
        name: `Workout ${i + 1}`,  // give the workout a name
        description: `This is workout number ${i + 1}`,  // give the workout a description
        exerciseIds: output  // set the exerciseIds to the output array
      });
    }

    return workouts;  // return the array of workout objects
  }

  defaultValue(): void {
    this.value = 100 / 3
  }
  addValue(): void {
    this.value += 100 / 3
    this.userData = {
      sex: this.planUserForm.value.sex,
      age: this.planUserForm.value.age,
      equipment: this.planUserForm.value.equipment,
      weight: this.planUserForm.value.weight,
      squat: this.planUserForm.value.squat,
      bench: this.planUserForm.value.bench,
      deadlift: this.planUserForm.value.deadlift,
      tested: this.planUserForm.value.tested
    }

    this.planService.getWorstLift(this.userData).subscribe((response: any) => {
      this.worstLift = response.worstLift

    })

  }

  minusValue(): void {
    this.value -= 100 / 3
  }





}
