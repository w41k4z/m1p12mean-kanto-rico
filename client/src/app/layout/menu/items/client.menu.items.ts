export default [
    {
        label: 'Pages',
        items: [
            {
                label: 'Accueil',
                icon: 'pi pi-fw pi-home',
                routerLink: ['/client/'],
            },
            {
                label: 'Services',
                icon: 'pi pi-fw pi-briefcase',
                routerLink: ['/client/services'],
            },
        ],
    },
    {
        label: 'Jetons',
        items: [
            {
                label: 'Transaction',
                icon: 'pi pi-fw pi-history',
                routerLink: ['/client/token-transactions'],
            },
        ],
    },
];
