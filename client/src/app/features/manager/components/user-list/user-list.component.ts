import { Component, OnInit } from '@angular/core';
import { FilterMatchMode } from 'primeng/api';
import { Privileges } from 'src/app/core/config/privileges';
import { User } from 'src/app/core/dto/user';
import { UserService } from 'src/app/core/services/api/user/user.service';
import { FormControl, Validators } from '@angular/forms';
import { Role } from 'src/app/core/dto/role';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
    users: User[] = [];
    cols: any[] = [
        { field: 'lastName', header: 'Nom' },
        { field: 'firstName', header: 'Prénom' },
        { field: 'username', header: 'Identifiant' },
        { field: 'role.name', header: 'Type' },
    ];
    loadingUsers: boolean = true;
    totalRecords: number = 0;
    pageSize: number = 10;
    filters: any = {};
    lastNameFilterOptions = [
        { label: 'Contient', value: FilterMatchMode.CONTAINS },
        { label: 'Commence par', value: FilterMatchMode.STARTS_WITH },
    ];
    firstNameFilterOptions = [
        { label: 'Contient', value: FilterMatchMode.CONTAINS },
        { label: 'Commence par', value: FilterMatchMode.STARTS_WITH },
    ];

    userDialog: boolean = false;
    userObject: {
        lastName?: string;
        firstName?: string;
        username?: string;
        password?: string;
        role?: string;
    } = {};
    submitted: boolean = false;
    roles = [Privileges.CLIENT, Privileges.MANAGER, Privileges.MECHANIC];

    constructor(private userService: UserService) {}

    ngOnInit(): void {
        this.loadUsers(0, this.pageSize);
    }

    private loadUsers(page: number, size: number, filters?: any) {
        this.userService.getUsers(page, size, filters).subscribe({
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
        this.loadUsers(event.first, event.rows, this.filters);
    }

    onFilterChange(event: any) {
        this.filters = event.filters;
        this.loadUsers(0, this.pageSize, this.filters);
    }

    openUserDialog() {
        this.userDialog = true;
    }

    hideUserDialog() {
        this.userDialog = false;
    }

    saveUser() {
        this.submitted = true;
        if (this.isUserObjectValid()) {
            this.userService.createUser(this.userObject).subscribe(() => {
                this.users.unshift(
                    new User(
                        '',
                        this.userObject.lastName || '',
                        this.userObject.firstName || '',
                        this.userObject.username || '',
                        new Role('', this.userObject.role || '')
                    )
                );
                this.submitted = false;
                this.userObject = {};
                this.userDialog = false;
            });
        }
    }

    private isUserObjectValid() {
        let isValid = true;
        if (!this.userObject.lastName) {
            isValid = false;
        }
        if (!this.userObject.firstName) {
            isValid = false;
        }
        if (
            !this.userObject.username ||
            !this.isValidEmail(this.userObject.username)
        ) {
            isValid = false;
        }
        if (!this.userObject.password) {
            isValid = false;
        }
        if (!this.userObject.role) {
            isValid = false;
        }
        return isValid;
    }

    isValidEmail(email?: string) {
        return Validators.email(new FormControl(email)) === null;
    }
}
