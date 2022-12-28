import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
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
    this.dataSource.sort = this.sort;
    console.log(this.dataSource)
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
      console.log(response)
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

}
