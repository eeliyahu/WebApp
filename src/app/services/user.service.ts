import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private usersUrl = 'api/users';
  private usersSubject = new BehaviorSubject<User[]>([]);
  users$ = this.usersSubject.asObservable();
  

  constructor(private http: HttpClient) { }

  // *************************
  //       Read Functions
  // *************************

  /** GET: get all users from the database */
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl).pipe(
      tap(users => {
        this.usersSubject.next(users);
        console.log(`All users fetched successfully`, users);
      }),
      catchError(this.handleError<User[]>('getAllUsers'))
    );
  }
  
  /** GET: get specific user by id */
  getUserByID(id: number): Observable<User> {
    return this.http.get<User>(this.usersUrl + '/' + id).pipe(
      tap(user => {
        console.log(`User ID=${user.id} fetched successfully`, user);
      }),
      catchError(this.handleError<User>('getUserByID'))
    );
  }


  // *************************
  //       Save Functions
  // *************************
  

  /** POST: add a new hero to the server */
  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.usersUrl, user, this.httpOptions).pipe
      (
        tap(newUser => {
          const currentUsers = this.usersSubject.value;
          this.usersSubject.next([...currentUsers, newUser]);
          console.log(`User ID=${newUser.id} created successfully`, newUser)
        }),
        catchError(this.handleError<User>('createUser'))
      );
  }

  /** PUT: update the hero on the server */
  updateUser(user: User): Observable<User> {
    return this.http.put<User>(this.usersUrl + "/" + user.id, user, this.httpOptions).pipe(
      tap(updatedUser => {
        const currentUsers = this.usersSubject.value;
        // Find and update the user in the local list
        const index = currentUsers.findIndex(u => u.id === updatedUser.id);
        if (index !== -1) {
          currentUsers[index] = updatedUser;
          this.usersSubject.next([...currentUsers]);
        }
        console.log(`User ID=${updatedUser.id} updated successfully.`, updatedUser);
      }),
      catchError(this.handleError<User>('updateUser'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteUserById(id: number): Observable<User> {
    return this.http.delete<User>(this.usersUrl + "/" + id).pipe(
      tap(_ => {
        const currentUsers = this.usersSubject.value;
        // Filter out the deleted user
        const updatedUsers = currentUsers.filter(user => user.id !== id);
        this.usersSubject.next(updatedUsers);
        console.log(`User ID=${id} deleted successfully.`);
      }),
      catchError(this.handleError<User>('deleteUser'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T); // Let the app keep running by returning an empty result.
    };
  }

}
