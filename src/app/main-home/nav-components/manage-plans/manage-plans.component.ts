import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ConfirmComponent } from 'src/app/dialog/confirm/confirm.component';
import { PlansComponent } from 'src/app/dialog/plans/plans.component';
import { ViewPlanComponent } from 'src/app/dialog/view-plan/view-plan.component';
import { ExerciseService } from 'src/app/services/exercise.service';
import { PlansService } from 'src/app/services/plans.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constans';

@Component({
  selector: 'app-manage-plans',
  templateUrl: './manage-plans.component.html',
  styleUrls: ['./manage-plans.component.scss']
})
export class ManagePlansComponent implements AfterViewInit, OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;



  displayedColumns: any[] = ['plan_name', 'plan_description', 'squat', 'bench', 'deadlift', 'edit'];
  dataSource: any
  responseMessage: any;


  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageSize = this.pageSizeOptions[0];
  pageEvent: PageEvent;

  allPlans: any


  constructor(private ngxService: NgxUiLoaderService,
    private _liveAnnouncer: LiveAnnouncer,
    private dialog: MatDialog,
    private snackbarService: SnackbarService,
    private planService: PlansService,
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

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }


  tableData(): void {
    const dialogConfig = new MatDialogConfig();

    this.planService.getPlans().subscribe((response: any) => {
      this.ngxService.stop()
      this.dataSource = new MatTableDataSource(response)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;



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

  handleAddAction(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: "Add"
    }
    dialogConfig.width = "1050px"
    const dialogRef = this.dialog.open(PlansComponent, dialogConfig)
    this.router.events.subscribe(() => {
      dialogRef.close()
    })
    const sub = dialogRef.componentInstance.onAddPlan.subscribe((response) => {
      this.tableData()
    })
  }

  handleDeleteAction(element: any): void {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.data = {
      message: 'delete plan: ' + element.plan_name
    }
    const dialogRef = this.dialog.open(ConfirmComponent, dialogConfig)
    const sub = dialogRef.componentInstance.onEmitStatusChange.subscribe((response) => {
      this.ngxService.start()
      console.log(element)
      this.deletePlan(element.plan_id)
      dialogRef.close()
    })
  }

  deletePlan(id: any): void {
    this.planService.deletePlan(id).subscribe((response: any) => {
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





  handleViewAction(element: any): void {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.data = {
      data: element
    }
    const dialogRef = this.dialog.open(ViewPlanComponent, dialogConfig)

    this.router.events.subscribe(() => {
      dialogRef.close()
    })
  }



}
