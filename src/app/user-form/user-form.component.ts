import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

const Mode = {
  EDIT: 'edit',
  ADD: 'add'
} as const;

type ModeType = keyof typeof Mode;

@Component({
  selector: 'app-user-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent {

  mode?: ModeType;

  buttonLabel: string = 'Add User';
  users: User[] = [];
  userForm: FormGroup;
  userID?: number;

  constructor(private userService: UserService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {

    this.decideMode();
    
    this.userForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

  }

  // Decides mode and gets params
  decideMode() {
    this.route.paramMap.subscribe((params: any) => {
      const IDParam = params.get('id');
      if (IDParam != undefined) {
        this.mode = 'EDIT';
        this.userID = IDParam;
        this.buttonLabel = 'Save User';
      } else {
        this.mode = 'ADD';
        this.buttonLabel = 'Add User';
      }
      this.fillUserDetails();
    });
  }

  // Fill user details if needed
  fillUserDetails() {
    if (this.mode === 'EDIT' && this.userID) {
      this.userService.getAllUsers().subscribe(res => {
        this.users = res;
        const userToEdit = this.users.find(user => user.id == this.userID);
        if (userToEdit) {
          this.userForm.patchValue({
            id: userToEdit.id,
            name: userToEdit.name,
            email: userToEdit.email,
            password: userToEdit.password,
          });
        } else {
          console.warn('User not found!');
        }
      });
    }
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const newUser: User = this.userForm.value;
      if (this.mode == 'ADD')
        this.userService.createUser(newUser).subscribe();
      else
        this.userService.updateUser(newUser).subscribe();
      this.router.navigate(['/users']);
    }
  }

}
