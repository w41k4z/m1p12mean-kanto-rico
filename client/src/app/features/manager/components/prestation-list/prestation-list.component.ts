import { Component, OnInit } from '@angular/core';
import { FilterMatchMode, MessageService } from 'primeng/api';
import { Prestation } from 'src/app/core/dto/prestation';
import { PrestationService } from 'src/app/core/services/api/prestation/prestation.service';

@Component({
    selector: 'app-prestation-list',
    templateUrl: './prestation-list.component.html',
    styleUrls: ['./prestation-list.component.scss'],
    providers: [MessageService],
})
export class PrestationListComponent implements OnInit {
    prestations: Prestation[] = [];
    newPrestation: Prestation = new Prestation('', '', 0);
    loadingPrestations: boolean = true;
    dialogVisible: boolean = false;
    totalRecords: number = 0;
    pageSize: number = 10;
    filters: any = {};
    sortField: string = 'price';
    sortOrder: number = 1;

    nameFilterOptions = [
        { label: 'Contient', value: FilterMatchMode.CONTAINS },
        { label: 'Commence par', value: FilterMatchMode.STARTS_WITH },
    ];

    constructor(
        private prestationService: PrestationService,
        private messageService: MessageService,
        
    ) {}
    priceError: string | null = null; 


    ngOnInit(): void {
        this.loadPrestations(0, this.pageSize, this.sortField, this.sortOrder);
    }

    private loadPrestations(page: number, size: number,sortField?: string, sortOrder?: number,filters?: any) {
        this.loadingPrestations = true;
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
        this.loadPrestations(event.first, event.rows, this.sortField, this.sortOrder, this.filters);
    }

    onFilterChange(event: any) {
        this.filters = event.filters;
        this.loadPrestations(0, this.pageSize,this.sortField, this.sortOrder, this.filters);
    }

    onSortChange(event: {field: string, order: number}) {
        this.sortField = event.field;
        this.sortOrder = event.order;
        this.loadPrestations(0, this.pageSize, this.sortField, this.sortOrder);
    }
    

    createNewPrestation() {
        this.newPrestation = new Prestation('', '', 0);
        this.dialogVisible = true;
    }

    submitPrestation() {
        this.priceError = null;
        if (isNaN(Number(this.newPrestation.price))) {
            this.priceError = 'Price must be a number';
            return;
        }
        const price = Number(this.newPrestation.price);
        if (!this.newPrestation.name.trim() || price <= 0) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Error',
                detail: 'Service name is required',
            });
            return;
        }
        const prestationData = {
            name: this.newPrestation.name,
            price: price
        };
        this.prestationService.createPrestation(prestationData).subscribe({
            next: () => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Prestation created successfully',
                });
                this.dialogVisible = false;
            },
            error: (err) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: err.error?.message || 'Failed to create prestation',
                });
            }
        });
    }
    validatePrice() {
        if (isNaN(Number(this.newPrestation.price))) {
          this.priceError = 'Price must be a number';
        } else {
          this.priceError = null;
        }
    }
}
