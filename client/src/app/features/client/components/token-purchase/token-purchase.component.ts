import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { TokenService } from 'src/app/core/services/api/token/token.service';

@Component({
    selector: 'app-token-purchase',
    templateUrl: './token-purchase.component.html',
    styleUrls: ['./token-purchase.component.scss'],
    providers: [MessageService],
})
export class TokenPurchaseComponent implements OnInit {
    availableToken: number = 0;

    tokenAmount: number = 0;

    confirmDialogVisible: boolean = false;

    constructor(
        private tokenService: TokenService,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        this.tokenService.getUserAvailableTokens().subscribe((res) => {
            if (res.payload) {
                this.availableToken = res.payload.tokens;
            }
        });
    }

    openConfirmDialog() {
        this.confirmDialogVisible = true;
    }

    closeConfirmDialog() {
        this.confirmDialogVisible = false;
    }

    purchaseToken() {
        if (this.tokenAmount > 0) {
            const description = `Achat de jetons.`;
            this.tokenService
                .createTransaction(description, this.tokenAmount)
                .subscribe({
                    next: () => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Succès',
                            detail: 'Votre achat a été effectué avec succès.',
                            life: 2000,
                        });
                        this.availableToken += this.tokenAmount;
                        this.tokenAmount = 0;
                    },
                    error: (error) => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Erreur',
                            detail: 'Une erreur est survenue. Veuillez réessayer.',
                            life: 2000,
                        });
                    },
                });
        }
        this.closeConfirmDialog();
    }
}
