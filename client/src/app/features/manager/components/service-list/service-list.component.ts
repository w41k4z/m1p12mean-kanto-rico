import { Component, OnInit } from '@angular/core';
import { FilterMatchMode } from 'primeng/api';
import { Service } from 'src/app/core/dto/service';
import { ServService } from 'src/app/core/services/api/service/serv.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
    selector: 'app-service-list',
    templateUrl: './service-list.component.html',
    styleUrls: ['./service-list.component.scss'],
    providers: [MessageService],
})
export class ServiceListComponent implements OnInit {
    services: Service[] = [];
    loadingServices: boolean = true;
    newServiceName: string = '';
    dialogVisible: boolean = false;
    editDialogVisible: boolean = false;
    selectedService: Service | null = null;
    deleteDialogVisible: boolean = false;
    serviceToDelete: any = null;

    totalRecords: number = 0;
    pageSize: number = 10;
    filters: any = {};
    nameFilterOptions = [
        { label: 'Contient', value: FilterMatchMode.CONTAINS },
        { label: 'Commence par', value: FilterMatchMode.STARTS_WITH },
    ];
    constructor(
        private servService: ServService,
        private messageService: MessageService,
        private router: Router,
    ) { }

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

    openDialog() {
        this.newServiceName = '';
        this.dialogVisible = true;
    }
    submitService() {
        if (!this.newServiceName.trim()) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Error',
                detail: 'Service name is required',
            });
            return;
        }

        this.servService.createService(this.newServiceName).subscribe({
            next: () => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Service created successfully',
                });
                this.dialogVisible = false;
            },
            error: (err) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: err.error?.message || 'Failed to create service',
                });
            }
        });
    }

    showEditDialog(service: Service) {
        this.selectedService = service;
        this.editDialogVisible = true;
    }

    updateService() {
        if (!this.selectedService) return;

        this.servService.updateService(this.selectedService._id, {
            name: this.selectedService.name,
        }).subscribe({
            next: () => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Prestation updated successfully'
                });
                this.editDialogVisible = false;
                this.loadServices(0, this.pageSize);
            },
            error: (err) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: err.error?.message || 'Failed to update prestation'
                });
            }
        });
    }

    deleteService(service: any) {
        this.serviceToDelete = service;
        this.deleteDialogVisible = true;
    }

    confirmDelete() {
        if (this.serviceToDelete) {
            this.loadingServices = true;
            this.servService.deleteService(this.serviceToDelete._id)
                .subscribe({
                    next: () => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Succès',
                            detail: 'Service supprimé avec succès'
                        });
                        this.loadServices(0, this.pageSize);
                    },
                    error: (err) => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Erreur',
                            detail: 'Échec de la suppression'
                        });
                        this.loadingServices = false;
                    }
                });
        }
        this.deleteDialogVisible = false;
    }
    viewServiceDetails(serviceName: string) {
        const encodedName = encodeURIComponent(serviceName);
        this.router.navigate(['/manager/services', encodedName]);
    }

}
