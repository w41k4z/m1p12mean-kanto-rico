import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicePrestation } from 'src/app/core/dto/serviceprestation';
import { ServPrestationService } from 'src/app/core/services/api/serviceprestation/servprestation.service';
import { ApiResponse } from 'src/app/core/dto/response/api.response';

@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html'
})
export class ServiceDetailsComponent implements OnInit {
  servicePrestations: ServicePrestation[] = [];
  serviceName: string = '';
  totalRecords: number = 0;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private servPrestationService: ServPrestationService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
        this.serviceName = decodeURIComponent(params['serviceName']);
        console.log('Service Name:', this.serviceName);
        
        if (!this.serviceName) {
            console.error('No service name found in route parameters');
            return;
        }
        
        this.loadPrestations();
    });
}

  loadPrestations() {
    this.loading = true;
    this.servPrestationService.getPrestationsByService(this.serviceName).subscribe({
      next: (res: ApiResponse<any>) => {
        this.servicePrestations = res.payload?.content || [];
        this.totalRecords = res.payload?.totalElements || 0;
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

  goBack() {
    window.history.back();
  }
}