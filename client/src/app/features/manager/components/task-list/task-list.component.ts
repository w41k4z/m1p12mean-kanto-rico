import { Component, OnInit } from '@angular/core';
import { FilterMatchMode } from 'primeng/api';
import { Task } from 'src/app/core/dto/task';
import { TaskService } from 'src/app/core/services/api/task/task.service';

@Component({
    selector: 'app-task-list',
    templateUrl: './task-list.component.html',
    styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
    tasks: Task[] = [];
    loadingTasks: boolean = true;
    totalRecords: number = 0;
    pageSize: number = 10;
    filters: any = {};
    idtaskFilterOptions = [
        { label: 'Contient', value: FilterMatchMode.CONTAINS },
        { label: 'Commence par', value: FilterMatchMode.STARTS_WITH },
    ];
    clientFilterOptions = [
        { label: 'Contient', value: FilterMatchMode.CONTAINS },
        { label: 'Commence par', value: FilterMatchMode.STARTS_WITH },
    ];
    constructor(private taskService: TaskService) {}

    ngOnInit(): void {
        this.loadTasks(0, this.pageSize);
    }

    private loadTasks(page: number, size: number, filters?: any) {
        this.taskService.getTasks(page, size, filters).subscribe({
            next: (res) => {
                if (res.payload) {
                    this.tasks = res.payload.tasks.content;
                    this.totalRecords = res.payload.tasks.totalElements;
                }
            },
            complete: () => {
                this.loadingTasks = false;
            },
        });
    }

    onPageChange(event: { first: number; rows: number }) {
        this.loadTasks(event.first, event.rows, this.filters);
    }

    onFilterChange(event: any) {
        this.filters = event.filters;
        this.loadTasks(0, this.pageSize, this.filters);
    }
}
