import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormGroup, FormControl, FormControlName } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { GitHubUser } from '../../models/githubuser.model'

import { MatDialog,  MatDialogConfig} from "@angular/material/dialog"

import { CourseDialogComponent } from "../../components/course-dialog/course-dialog.component";

import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faRedo } from '@fortawesome/free-solid-svg-icons';
import { faUserTimes } from '@fortawesome/free-solid-svg-icons';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { faDatabase } from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  reload_icon = faRedo;
  search_icon = faSearch;
  user_delete_icon = faUserTimes;
  user_plus_icon = faUserPlus;
  user_edit_icon = faUserEdit;
  save_icon = faSave;
  database_icon = faDatabase;

  public users;
  public new_user;

  // public name: string;
  name: FormControl;
  public gitHubUserForm: FormGroup;
  public gitHubUserModel: GitHubUser;
  public gitHubUserFields: Array <FormlyFieldConfig>;

  public is_in_db: boolean;
  
  constructor(private api: ApiService, private dialog: MatDialog) { 

    this.is_in_db = false;
    this.new_user = { 
      login: '', 
      avatar_url: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png', 
      html_url: '', 
      repos_url: '', 
    }
    this.name = new FormControl('');
    this.gitHubUserForm = new FormGroup({});
    this.gitHubUserModel = new GitHubUser();
    this.gitHubUserFields = [
      {
        key: 'name',
        type: 'input',
        templateOptions: {
          type: 'text',
          label: 'GitHub User',
          placeholder: 'github username',
          required: true
        }
      }
    ]

  }

  ngOnInit(): void {
    this.get_users()
  }

  public get_github_users = () => {
    this.api.search_users(this.name.value).subscribe(
      res => {
        this.is_in_db = false;
        this.users = res['items'];
        console.log(res['items']) 
      }
    )
  }

  public get_users = () => {
    this.api.get_users().subscribe(
      res => {
        this.is_in_db = true;
        this.users = res;
        this.users.sort(function(a, b){
          let sortOrder = 1;
          if(sortOrder == -1){
            return b['login'].localeCompare(a['login']);
          }else{
            return a['login'].localeCompare(b['login']);
          } 
        })
        console.log(this.users); 
      }
    )
  }

  public delete_user = (id) => {
    this.api.delete_user(id).subscribe(
      res => this.get_users()
    )
  }

  public save_users = () => {
      this.api.save_users(this.users).subscribe(
        res => this.get_users()
      )
  }

  openDialog(user) {

      const dialogConfig = new MatDialogConfig();

      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      
      dialogConfig.data = user

      this.dialog.open(CourseDialogComponent, dialogConfig);
  }

}
