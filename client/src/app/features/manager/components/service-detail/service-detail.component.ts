import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServPrestationService } from 'src/app/core/services/api/serviceprestation/servprestation.service';
import { ApiResponse } from 'src/app/core/dto/response/api.response';
import { Prestation } from 'src/app/core/dto/prestation';
import { Table } from 'primeng/table';
import { PrestationService } from 'src/app/core/services/api/prestation/prestation.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  providers: [MessageService],
})
export class ServiceDetailsComponent implements OnInit {
  servicePrestations: Prestation[] = [];
  prestations: Prestation[] = [];
  serviceName: string = '';
  totalRecords: number = 0;
  loading: boolean = true;
  pageSize: number = 10;
  filters: any = {};
  sortField: string = 'price';
  sortOrder: number = 1;
  selectedPrestation: Prestation | null = null;
  prestationDialog: boolean = false;
  submitted: boolean = false;
  loadingPrestations: boolean = true;
  saving = false;
  errorMessage: string | null = null;
  deleteDialogVisible: boolean = false;
  servicePrestationToDelete: any = null;




  constructor(
    private route: ActivatedRoute,
    private prestationService: PrestationService,
    private servPrestationService: ServPrestationService,
    private messageService: MessageService,

  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.serviceName = decodeURIComponent(params['serviceName']);
      console.log('Service Name:', this.serviceName);

      if (!this.serviceName) {
        console.error('No service name found in route parameters');
        return;
      }

      this.loadPrestations(0, this.pageSize, this.sortField, this.sortOrder);
    });
  }

  loadPrestations(page: number, size: number, sortField?: string, sortOrder?: number, filters?: any) {
    this.loading = true;
    this.servPrestationService.getPrestationsByService(this.serviceName).subscribe({
      next: (res: ApiResponse<any>) => {
        this.servicePrestations = res.payload?.prestations?.content || [];
        this.totalRecords = res.payload?.prestations?.totalElements || 0;
        this.loading = false;
      },
      error: (err) => {
        console.error('API Error:', err);
        this.servicePrestations = [];
        this.totalRecords = 0;
        this.loading = false;
      }
    });
  }

  private loadAllPrestations() {
    this.loadingPrestations = true;
    this.prestationService.getPrestations(0, 100, {}).subscribe({
      next: (res: ApiResponse<any>) => {
        if (res.payload && res.payload.prestations && res.payload.prestations.content) {
          this.prestations = res.payload.prestations.content;
          console.log('Loaded prestations:', this.prestations);
        } else {
          console.warn('Unexpected API response structure:', res);
          this.prestations = [];
        }
      },
      error: (err) => {
        console.error('Error loading all prestations:', err);
        this.prestations = [];
      },
      complete: () => {
        this.loadingPrestations = false;
      }
    });
  }

  goBack() {
    window.history.back();
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  openNew() {
    this.prestationDialog = true;
    this.loadAllPrestations();
  }

  hideDialog() {
    this.prestationDialog = false;
    this.submitted = false;
  }

  savePrestation() {
    if (!this.selectedPrestation) {
      this.errorMessage = 'Please select a prestation';
      return;
    }

    this.saving = true;
    this.errorMessage = null;

    this.servPrestationService.createServicePrestation({
      service: this.serviceName,
      prestation: this.selectedPrestation._id
    }).subscribe({
      next: (response: ApiResponse<any>) => {
        this.saving = false;
        console.log('Prestation added successfully', response);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: response.message || 'Prestation added successfully'
        });
        this.loadPrestations(0, this.pageSize, this.sortField, this.sortOrder);
        this.hideDialog();
      },
      error: (error) => {
        this.saving = false;
        console.error('Error adding prestation', error);

        if (error.error?.message === 'This prestation already exists in the service') {
          this.errorMessage = error.error.message;
        } else if (error.error?.message.includes('Supprime')) {
          this.messageService.add({
            severity: 'info',
            summary: 'Reactivated',
            detail: 'Previously removed prestation was reactivated'
          });
          this.loadPrestations(0, this.pageSize, this.sortField, this.sortOrder);
          this.hideDialog();
        } else {
          this.errorMessage = 'Failed to add prestation';
        }
      }
    });
  }

  confirmDeleteServicePrestation(prestation: any) {
    this.servicePrestationToDelete = prestation;
    this.deleteDialogVisible = true;
  }

  deleteServicePrestation() {
    if (!this.servicePrestationToDelete) {
      return;
    }

    this.loading = true;
    this.servPrestationService.deleteServicePrestation(
      this.serviceName,
      this.servicePrestationToDelete._id
    ).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Prestation removed from service successfully'
        });
        this.loadPrestations(0, this.pageSize);
        this.deleteDialogVisible = false;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to remove prestation from service'
        });
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

}