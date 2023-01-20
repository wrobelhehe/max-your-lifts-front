import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ConfirmComponent } from 'src/app/dialog/confirm/confirm.component';
import { ExerciseComponent } from 'src/app/dialog/exercise/exercise.component';
import { VideoPlayerComponent } from 'src/app/dialog/video-player/video-player.component';
import { CategoryService } from 'src/app/services/category.service';
import { ExerciseService } from 'src/app/services/exercise.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constans';

@Component({
  selector: 'app-manage-exercise',
  templateUrl: './manage-exercise.component.html',
  styleUrls: ['./manage-exercise.component.scss']
})
export class ManageExerciseComponent implements AfterViewInit {

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: any[] = ['name', 'description', 'category_name', 'video_url', 'sets', 'reps', 'rpe', 'tempo', 'edit'];
  dataSource: any
  responseMessage: any;

  isExpanded = false;

  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageSize = this.pageSizeOptions[0];
  pageEvent: PageEvent;

  allCategories: any


  constructor(private ngxService: NgxUiLoaderService,
    private _liveAnnouncer: LiveAnnouncer,
    private dialog: MatDialog,
    private snackbarService: SnackbarService,
    private exerciseService: ExerciseService,
    private router: Router) {
    this.pageEvent = { pageIndex: 0, pageSize: 5, length: 0 };
    this.sort = new MatSort();

  }


  ngOnInit(): void {
    this.ngxService.start()
    this.tableData()


  }
  ngAfterViewInit() {
    // this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }



  openLink(link: string): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      link: link
    }

    this.dialog.open(VideoPlayerComponent, dialogConfig)

  }

  tableData(): void {
    this.exerciseService.getExercises().subscribe((response: any) => {
      this.ngxService.stop()
      this.dataSource = new MatTableDataSource(response)

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
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

  handleVideoEditor(): void {
    this.dialog.open(VideoPlayerComponent)
  }



  handleAddAction(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: "Add"
    }
    dialogConfig.width = "1050px"
    const dialogRef = this.dialog.open(ExerciseComponent, dialogConfig)
    this.router.events.subscribe(() => {
      dialogRef.close()
    })
    const sub = dialogRef.componentInstance.onAddExercise.subscribe((response) => {
      this.tableData()
    })
  }
  handleEditAction(value: any): void {
    const id = value.id

    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: "Edit",
      values: value,



    }
    console.log(dialogConfig.data)
    dialogConfig.width = "1050px"
    const dialogRef = this.dialog.open(ExerciseComponent, dialogConfig)
    this.router.events.subscribe(() => {
      dialogRef.close()
    })
    const sub = dialogRef.componentInstance.onEditExercise.subscribe((response) => {
      this.tableData()
    })
  }

  handleDeleteAction(element: any): void {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.data = {
      message: 'delete ' + element.name + " exercise"
    }
    const dialogRef = this.dialog.open(ConfirmComponent, dialogConfig)
    const sub = dialogRef.componentInstance.onEmitStatusChange.subscribe((response) => {
      this.ngxService.start()
      this.deleteExercise(element.id)
      dialogRef.close()
    })
  }

  deleteExercise(id: any): void {
    this.exerciseService.deleteExercise(id).subscribe((response: any) => {
      this.ngxService.stop()
      this.tableData()
      this.responseMessage = response?.message;
      this.snackbarService.openToast(this.responseMessage, "success")
    }, (error: any) => {
      this.ngxService.stop()
      if (error.error?.message) {
        this.responseMessage = error.error?.message
      } else {
        this.responseMessage = GlobalConstants.genericError
      }
      this.snackbarService.openToast(this.responseMessage, GlobalConstants.error)
    })
  }

  statusChange(status: any, id: any): void {
    var data = {
      status: status.toString(),
      id: id
    }
    this.exerciseService.updateStatus(data).subscribe((response: any) => {
      this.ngxService.stop()
      this.responseMessage = response?.message;
      this.snackbarService.openToast(this.responseMessage, "success")
    }, (error: any) => {
      this.ngxService.stop()
      if (error.error?.message) {
        this.responseMessage = error.error?.message
      } else {
        this.responseMessage = GlobalConstants.genericError
      }
      this.snackbarService.openToast(this.responseMessage, GlobalConstants.error)
    })
  }
}
