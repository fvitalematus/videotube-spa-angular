import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  public page_title: string;
  public user: User;
  public identity;
  public token: string;
  public status: string;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.page_title = "Identificate";
    this.user = new User(1, '', '', '', '', 'ROLE_USER', '');
  }

  ngOnInit(): void {
  }

  onSubmit(form) {
    this._userService.signup(this.user).subscribe(
      response => {
        if (!response.status || response.status != 'error') {
          this.status = 'success';
          this.identity = response;

          // Sacar TOKEN
          this._userService.signup(this.user, true).subscribe(
            response => {
              if (!response.status || response.status != 'error') {
                this.token = response;

                console.log(this.identity);
                console.log(this.token);

                localStorage.setItem('token', this.token);
                localStorage.setItem('identity', JSON.stringify(this.identity));

                this._router.navigate(['/inicio']);

              } else {
                this.status = 'error';
              }
            },
            error => {
              this.status = 'error';
              console.log(error);
            }
          );

        } else {
          this.status = 'error';
        }
      },
      error => {
        this.status = 'error';
        console.log(error);
      }
    );
  }

}
