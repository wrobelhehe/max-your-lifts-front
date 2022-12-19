import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
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
  displayedColumns: string[] = ['name', 'edit'];
  dataSource: any;
  responseMessage: any;
  constructor(private ngxService: NgxUiLoaderService,
    private dialog: MatDialog,
    private snackbarService: SnackbarService,
    private categoryService: CategoryService,
    private router: Router) { }


  ngOnInit(): void {
    this.ngxService.start()
    this.tableData()
  }

  table: any[] = []
  tableData(): void {
    this.categoryService.getCategories().subscribe((response: any) => {
      this.ngxService.stop()
      this.dataSource = new MatTableDataSource(response)
      this.table = response
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
