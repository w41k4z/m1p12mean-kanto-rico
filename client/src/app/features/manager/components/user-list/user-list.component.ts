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
    pageSize: number = 1;

    constructor(private userService: UserService) {}

    ngOnInit(): void {
        this.loadUsers(0, this.pageSize);
    }

    private loadUsers(page: number, size: number) {
        this.userService.getUsers(page, size).subscribe({
            next: (res) => {
                if (res.payload) {
                    this.users = res.payload.users.content;
                    this.totalRecords = res.payload.users.totalElements;
                }
            },
            complete: () => {
                this.loadingUsers = false;
            },
        });
    }

    onPageChange(event: { first: number; rows: number }) {
        this.loadUsers(event.first, event.rows);
    }
}
