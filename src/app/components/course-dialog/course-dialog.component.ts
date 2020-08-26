import { Component, Inject } from '@angular/core';
import { GitHubUser } from '../../models/githubuser.model'
import { FormGroup, FormControl, FormControlName } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { ApiService } from '../../services/api.service';

import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { faSave } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.scss']
})
export class CourseDialogComponent {

  close_icon = faTimesCircle;
  save_icon = faSave;

  public gitHubUserForm: FormGroup;
  public gitHubUserModel: GitHubUser;
  public gitHubUserFields: Array <FormlyFieldConfig>;
  
  public user: {
    login: string,
    html_url: string,
    avatar_url: string,
  }

  profileForm = new FormGroup({
    login: new FormControl(''),
    html_url: new FormControl(''),
    avatar_url: new FormControl(''),
  });


  constructor(
    private api: ApiService,
    private dialogRef: MatDialogRef<CourseDialogComponent>,
        @Inject(MAT_DIALOG_DATA) data) {
        this.user = data;
    }

    save() {

        if (this.user['id']) {
          this.api.update_user(this.user).subscribe(
            res => {
              console.log(res)
              this.dialogRef.close();
            }
          )
        } else {
          this.api.save_user(this.user).subscribe(
            res => {
              console.log(res)
              this.dialogRef.close();
            }
          )
        }
  }

  close() {
      this.dialogRef.close();
  }
  
}
