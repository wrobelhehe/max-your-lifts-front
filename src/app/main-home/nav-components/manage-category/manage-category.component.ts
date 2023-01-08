import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatTab } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CategoryComponent } from 'src/app/dialog/category/category.component';
import { CategoryService } from 'src/app/services/category.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constans';

@Component({
  selector: 'app-manage-category',
  templateUrl: './manage-category.component.html',
  styleUrls: ['./manage-category.component.scss']
})
export class ManageCategoryComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  displayedColumns: string[] = ['name', 'edit'];
  dataSource: any;
  responseMessage: any;


  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageSize = this.pageSizeOptions[0];
  pageEvent: PageEvent;


  constructor(private ngxService: NgxUiLoaderService,
    private _liveAnnouncer: LiveAnnouncer,

    private dialog: MatDialog,
    private snackbarService: SnackbarService,
    private categoryService: CategoryService,
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

  tableData(): void {
    this.categoryService.getCategories().subscribe((response: any) => {
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

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }


  handleAddAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: "Add"
    }
    dialogConfig.width = "650px"
    const dialogRef = this.dialog.open(CategoryComponent, dialogConfig)
    this.router.events.subscribe(() => {
      dialogRef.close()
    })
    const sub = dialogRef.componentInstance.onAddCategory.subscribe((response) => {
      this.tableData()
    })
  }

  handleEditAction(value: any) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: "Edit",
      values: value
    }
    dialogConfig.width = "650px"
    const dialogRef = this.dialog.open(CategoryComponent, dialogConfig)
    this.router.events.subscribe(() => {
      dialogRef.close()
    })
    const sub = dialogRef.componentInstance.onEditCategory.subscribe((response) => {
      this.tableData()
    })
  }

}
