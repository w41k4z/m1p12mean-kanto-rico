import { Component, OnInit } from '@angular/core';
import { FilterMatchMode } from 'primeng/api';
import { Service } from 'src/app/core/dto/service';
import { ServService } from 'src/app/core/services/api/service/serv.service';

@Component({
    selector: 'app-service-list',
    templateUrl: './service-list.component.html',
    styleUrls: ['./service-list.component.scss'],
})
export class ServiceListComponent implements OnInit {
    services: Service[] = [];
    loadingServices: boolean = true;
    totalRecords: number = 0;
    pageSize: number = 10;
    filters: any = {};
    nameFilterOptions = [
        { label: 'Contient', value: FilterMatchMode.CONTAINS },
        { label: 'Commence par', value: FilterMatchMode.STARTS_WITH },
    ];
    constructor(private servService: ServService) {}

    ngOnInit(): void {
        this.loadServices(0, this.pageSize);
    }

    private loadServices(page: number, size: number, filters?: any) {
        this.servService.getServices(page, size, filters).subscribe({
            next: (res) => {
                if (res.payload) {
                    this.services = res.payload.services.content;
                    this.totalRecords = res.payload.services.totalElements;
                }
            },
            complete: () => {
                this.loadingServices = false;
            },
        });
    }

    onPageChange(event: { first: number; rows: number }) {
        this.loadServices(event.first, event.rows, this.filters);
    }

    onFilterChange(event: any) {
        this.filters = event.filters;
        this.loadServices(0, this.pageSize, this.filters);
    }
}
