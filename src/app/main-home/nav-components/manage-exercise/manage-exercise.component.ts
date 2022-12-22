import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ExerciseComponent } from 'src/app/dialog/exercise/exercise.component';
import { CategoryService } from 'src/app/services/category.service';
import { ExerciseService } from 'src/app/services/exercise.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constans';

@Component({
  selector: 'app-manage-exercise',
  templateUrl: './manage-exercise.component.html',
  styleUrls: ['./manage-exercise.component.scss']
})
export class ManageExerciseComponent {

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  displayedColumns: any[] = ['name', 'description', 'category_name', 'video_url', 'sets', 'reps', 'rpe', 'tempo', 'edit'];
  dataSource: any
  responseMessage: any;

  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageSize = this.pageSizeOptions[0];
  pageEvent: PageEvent;


  constructor(private ngxService: NgxUiLoaderService,
    private dialog: MatDialog,
    private snackbarService: SnackbarService,
    private exerciseService: ExerciseService,
    private router: Router) {
    this.pageEvent = { pageIndex: 0, pageSize: 5, length: 0 };

  }


  ngOnInit(): void {
    this.ngxService.start()
    this.tableData()

  }


  openLink(link: string): void {
    window.open(link, '_blank');
  }

  tableData(): void {
    this.exerciseService.getExercises().subscribe((response: any) => {
      this.ngxService.stop()
      this.dataSource = new MatTableDataSource(response)
      this.dataSource.paginator = this.paginator;
      console.log(this.dataSource)


    }, (error: any) => {
      this.ngxService.stop()
      if (error.error?.message) {
        this.responseMessage = error.error?.message
      }
      else {
        this.responseMessage = GlobalConstants.genericError
      }
      this.snackbarService.openToast(this.responseMessage, GlobalConstants.error)
    })
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }

  handleAddAction(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: "Add"
    }
    dialogConfig.width = "1250px"
    const dialogRef = this.dialog.open(ExerciseComponent, dialogConfig)
    this.router.events.subscribe(() => {
      dialogRef.close()
    })
    const sub = dialogRef.componentInstance.onAddExercise.subscribe((response) => {
      this.tableData()
    })
  }
  handleEditAction(value: any): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: "Edit",
      values: value
    }
    console.log(dialogConfig.data)
    dialogConfig.width = "1250px"
    const dialogRef = this.dialog.open(ExerciseComponent, dialogConfig)
    this.router.events.subscribe(() => {
      dialogRef.close()
    })
    const sub = dialogRef.componentInstance.onEditExercise.subscribe((response) => {
      this.tableData()
    })
  }

  handleDeleteAction(element: any): void { }

  onChange(status: any, id: any): void { }
}
