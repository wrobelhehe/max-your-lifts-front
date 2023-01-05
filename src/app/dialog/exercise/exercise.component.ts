import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/category.service';
import { ExerciseService } from 'src/app/services/exercise.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constans';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {
        showError: true
      }
    }
  ]
})
export class ExerciseComponent implements OnInit {
  displayedColumns: any[] = ['name', 'description', 'category_id', 'video_url', 'sets', 'reps', 'rpe', 'tempo'];




  onAddExercise = new EventEmitter();

  onEditExercise = new EventEmitter();

  exerciseForm: any = FormGroup;

  exerciseDetailsForm: any = FormGroup

  summaryForm: any = FormGroup

  dialogAction: any = 'Add'

  action: any = 'Add'

  responseMessage: any

  categories: any[] = []

  value: number = 100 / 3

  selectedValue: any[] = []


  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private exerciseService: ExerciseService,
    private dialogRef: MatDialogRef<ExerciseComponent>,
    private snackbarService: SnackbarService) {

  }

  ngOnInit(): void {

    this.exerciseForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],
      category_id: [[], [Validators.required]],
      video_url: [null, [Validators.required]],


    })
    this.exerciseDetailsForm = this.formBuilder.group({
      sets: [null, [Validators.required]],
      reps: [null, [Validators.required]],
      rpe: [null, [Validators.required]],
      tempo: [null, [Validators.required, Validators.pattern(GlobalConstants.tempoRegex)]],

    })

    this.summaryForm = this.formBuilder.group({
      summary: [null, [Validators.required]]
    })



    if (this.dialogData.action === "Edit") {
      this.dialogAction = "Edit"
      this.action = "Update"
      this.exerciseService.getById(this.dialogData.values.id).subscribe((response) => {
        const arg1 = {
          name: this.dialogData.values.name,
          description: this.dialogData.values.description,
          category_id: response.category_id,
          video_url: this.dialogData.values.video_url
        }
        const arg2 = {
          sets: this.dialogData.values.sets,
          reps: this.dialogData.values.reps,

          rpe: this.dialogData.values.rpe,

          tempo: this.dialogData.values.tempo,
        }
        this.exerciseForm.patchValue(arg1)
        this.exerciseDetailsForm.patchValue(arg2)
      })

    }
    this.getCategories()




  }

  defaultValue(): void {
    this.value = 100 / 3
  }
  addValue(): void {
    this.value += 100 / 3
  }

  minusValue(): void {
    this.value -= 100 / 3
  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe((response: any) => {
      this.categories = response
    }, (error: any) => {
      if (error.error?.message) {
        this.responseMessage = error.error?.message
      } else {
        this.responseMessage = GlobalConstants.genericError
      }
      this.snackbarService.openToast(this.responseMessage, GlobalConstants.error)
    })
  }



  handleSubmit(): void {
    if (this.dialogAction === "Edit") {
      this.edit()
    } else {
      this.add()
    }
  }

  getArray(form1: any, form2: any) {


    const dataSource = []
    const obj = Object.assign({}, form1, form2)
    dataSource.push(obj)
    return dataSource
  }

  openLink(link: string): void {
    window.open(link, '_blank');
  }

  add(): void {


    var formData = this.exerciseForm.value;
    var detailsFormData = this.exerciseDetailsForm.value
    var data = {
      name: formData.name,
      description: formData.description,
      category_id: formData.category_id,

      video_url: formData.video_url,

      sets: detailsFormData.sets,

      reps: detailsFormData.reps,

      rpe: detailsFormData.rpe,

      tempo: detailsFormData.tempo,


    }



    this.exerciseService.addExercise(data).subscribe((response: any) => {
      this.dialogRef.close();
      this.onAddExercise.emit();
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
  }

  edit(): void {



    var formData = this.exerciseForm.value;
    var detailsFormData = this.exerciseDetailsForm.value

    var data = {
      id: this.dialogData.values.id,
      name: formData.name,
      description: formData.description,
      category_id: formData.category_id,

      video_url: formData.video_url,

      sets: detailsFormData.sets,

      reps: detailsFormData.reps,

      rpe: detailsFormData.rpe,

      tempo: detailsFormData.tempo,


    }


    this.exerciseService.updateExercise(data).subscribe((response: any) => {
      this.dialogRef.close();
      this.onEditExercise.emit();
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
  }



}
