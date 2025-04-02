import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Prestation } from 'src/app/core/dto/prestation';
import { Service } from 'src/app/core/dto/service';
import { PrestationService } from 'src/app/core/services/api/prestation/prestation.service';
import { ServService } from 'src/app/core/services/api/service/serv.service';
import { TaskService } from 'src/app/core/services/api/task/task.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
    selector: 'app-service-list',
    templateUrl: './service-list.component.html',
    styleUrls: ['./service-list.component.scss'],
    providers: [MessageService],
})
export class ServiceListComponent implements OnInit {
    services: Service[] = [];
    prestations: Prestation[] = [];
    totalRecords: number = 0;
    currentPage: number = 0;
    pageSize: number = 10;
    loading: boolean = true;

    selectedService: Service = new Service('', '', '',[]);
    customServiceDialogVisible: boolean = false;

    selectionConfirmationDialogVisible: boolean = false;

    constructor(
        private messageService: MessageService,
        private serviceService: ServService,
        private prestationService: PrestationService,
        private taskService: TaskService,
        private authService: AuthService
    ) {}

    ngOnInit(): void {
        this.fetchServices(0, this.pageSize);
        this.fetchPrestations();
    }

    fetchServices(page: number, size: number) {
        this.loading = true;
        this.serviceService
            .getServicesWithPrestations(page, size, {})
            .subscribe({
                next: (res) => {
                    if (res.payload) {
                        this.services = res.payload.services.content;
                        this.currentPage = res.payload.services.page;
                        this.totalRecords = res.payload.services.totalElements;
                    }
                },
                complete: () => {
                    this.loading = false;
                },
            });
    }

    fetchPrestations() {
        this.prestationService.getPrestations(0, 100, {}).subscribe({
            next: (res) => {
                if (res.payload) {
                    this.prestations = res.payload.prestations.content;
                }
            },
        });
    }

    onPageChange(event: { first: number; rows: number }) {
        this.fetchServices(event.first, event.rows);
    }

    selectService(service: Service) {
        this.selectedService = service;
        console.log({
            name: service.name,
            prestations: service.prestations.map((prestation) => {
                return {
                    id: prestation._id,
                    name: prestation.name,
                
                };
            }),
        });
        this.openSelectionConfirmationDialog();
    }

    openCustomServiceDialog() {
        this.customServiceDialogVisible = true;
        this.selectedService = new Service('', '','', []);
    }

    submitService() {
        if (
            !this.selectedService.name ||
            this.selectedService.prestations.length === 0
        ) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Erreur',
                detail: 'Veuillez remplir tous les champs.',
                life: 2000,
            });
            return;
        }

        const clientId = this.authService.getUserId();
        if (clientId) {
            this.taskService
                .createTask(
                    clientId,
                    this.selectedService.prestations.map((prestation) => {
                        return { id: prestation._id, name: prestation.name };
                    })
                )
                .subscribe({
                    next: () => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Succès',
                            detail: 'Votre service a été planifié avec succès.',
                            life: 2000,
                        });
                        this.customServiceDialogVisible = false;
                        this.selectionConfirmationDialogVisible = false;
                        this.selectedService = new Service('', '','', []);
                    },
                    error: (error) => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Erreur',
                            detail: 'Une erreur est survenue. Veuillez réessayer.',
                            life: 2000,
                        });
                        this.customServiceDialogVisible = false;
                        this.selectionConfirmationDialogVisible = false;
                        this.selectedService = new Service('', '','',[]);
                    },
                });
        }
    }

    openSelectionConfirmationDialog() {
        this.selectionConfirmationDialogVisible = true;
    }

    closeSelectionConfirmationDialog() {
        this.selectionConfirmationDialogVisible = false;
    }
}
