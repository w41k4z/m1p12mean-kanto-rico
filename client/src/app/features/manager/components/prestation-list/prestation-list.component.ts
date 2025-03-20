import { Component, OnInit } from '@angular/core';
import { FilterMatchMode } from 'primeng/api';
import { Prestation } from 'src/app/core/dto/prestation';
import { PrestationService } from 'src/app/core/services/api/prestation/prestation.service';

@Component({
    selector: 'app-prestation-list',
    templateUrl: './prestation-list.component.html',
    styleUrls: ['./prestation-list.component.scss'],
})
export class PrestationListComponent implements OnInit {
    prestations: Prestation[] = [];
    loadingPrestations: boolean = true;
    totalRecords: number = 0;
    pageSize: number = 10;
    filters: any = {};
    nameFilterOptions = [
        { label: 'Contient', value: FilterMatchMode.CONTAINS },
        { label: 'Commence par', value: FilterMatchMode.STARTS_WITH },
    ];
    constructor(private prestationService: PrestationService) {}

    ngOnInit(): void {
        this.loadPrestations(0, this.pageSize);
    }

    private loadPrestations(page: number, size: number, filters?: any) {
        this.prestationService.getPrestations(page, size, filters).subscribe({
            next: (res) => {
                if (res.payload) {
                    this.prestations = res.payload.prestations.content;
                    this.totalRecords = res.payload.prestations.totalElements;
                }
            },
            complete: () => {
                this.loadingPrestations = false;
            },
        });
    }

    onPageChange(event: { first: number; rows: number }) {
        this.loadPrestations(event.first, event.rows, this.filters);
    }

    onFilterChange(event: any) {
        this.filters = event.filters;
        this.loadPrestations(0, this.pageSize, this.filters);
    }
}
