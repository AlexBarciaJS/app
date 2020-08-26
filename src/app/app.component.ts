import { Component } from '@angular/core';

import { MatDialog,  MatDialogConfig} from "@angular/material/dialog"

import { CourseDialogComponent } from "./components/course-dialog/course-dialog.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angulartest';
  constructor(private dialog: MatDialog) {}

    openDialog() {

        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;

        this.dialog.open(CourseDialogComponent, dialogConfig);
    }
}

