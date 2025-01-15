import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-list',
  imports: [RouterOutlet, CommonModule, RouterLink],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {

  users: User[] = [];
  currentRoute: string = '';

  constructor(private userService: UserService, private router: Router) {

    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
    });

    this.userService.users$.subscribe(users => {
      this.users = users;
    });
  
    this.userService.getAllUsers().subscribe();

  }

  openUserDetail(userID: number) {
    this.router.navigate(['/users/' + userID]);
  }

  deleteUser(event: MouseEvent, userID: number) {
    event.stopPropagation();
    this.userService.deleteUserById(userID).subscribe();
  }
  editUser(event: MouseEvent, userID: number) {
    event.stopPropagation();
    this.router.navigate(['/users/edit/' + userID]);
  }

}
