import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/dto/user';
import { UserService } from 'src/app/core/services/api/user/user.service';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
    users: User[] = [];
    loadingUsers: boolean = true;
    totalRecords: number = 0;

    constructor(private userService: UserService) {}

    ngOnInit(): void {
        this.userService.getUsers().subscribe((res) => {
            if (res.payload) {
                this.users = res.payload.users;
                this.loadingUsers = false;
                this.totalRecords = this.users.length;
            }
        });
    }
}
