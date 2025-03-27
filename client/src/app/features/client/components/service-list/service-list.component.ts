import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Prestation } from 'src/app/core/dto/prestation';
import { Service } from 'src/app/core/dto/service';
import { PrestationService } from 'src/app/core/services/api/prestation/prestation.service';
import { ServService } from 'src/app/core/services/api/service/serv.service';

@Component({
    selector: 'app-service-list',
    templateUrl: './service-list.component.html',
    styleUrls: ['./service-list.component.scss'],
    providers: [MessageService],
})
export class ServiceListComponent implements OnInit {
    services: Service[] = [];
    prestations: Prestation[] = [];

    selectedService: Service | null = null;
    customServiceDialogVisible: boolean = false;
    customService: Service = new Service('', '', []);

    totalRecords: number = 0;
    currentPage: number = 0;
    pageSize: number = 10;

    loading: boolean = true;

    constructor(
        private messageService: MessageService,
        private serviceService: ServService,
        private prestationService: PrestationService
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

    onPageChange(event: {first: number, rows: number}) {
        this.fetchServices(event.first, event.rows);
    }

    selectService(service: Service) {
        this.selectedService = service;
        console.log(service);
        console.log({
            name: service.name,
            prestations: service.prestations.map((prestation) => {
                return {
                id: prestation._id,
                name: prestation.name}
            }),
        });
    }

    openCustomServiceDialog() {
        this.customServiceDialogVisible = true;
    }

    submitCustomService() {
        if (
            !this.customService.name ||
            this.customService.prestations.length === 0
        ) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Erreur',
                detail: 'Veuillez remplir tous les champs.',
            });
            return;
        }

        const customServiceData = {
            name: this.customService.name,
            prestations: this.customService.prestations.map((p) => p._id),
        };

        console.log('Service personnalisé soumis:', customServiceData);
        this.messageService.add({
            severity: 'success',
            summary: 'Succès',
            detail: 'Service personnalisé créé avec succès.',
        });

        this.customServiceDialogVisible = false;
        this.customService = new Service('', '', []);
    }
}
