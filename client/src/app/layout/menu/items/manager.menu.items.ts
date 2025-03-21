export default [
    {
        label: 'Pages',
        items: [
            {
                label: 'Accueil',
                icon: 'pi pi-fw pi-home',
                routerLink: ['/manager/'],
            },
        ],
    },
    {
        label: 'Gestions',
        items: [
            {
                label: 'Utilisateurs',
                icon: 'pi pi-fw pi-users',
                routerLink: ['/manager/users'],
            },
            {
                label: 'Services',
                icon: 'pi pi-shield',
                routerLink: ['/manager/services'],
            },
            {
                label: 'Prestations',
                icon: 'pi pi-wrench',
                routerLink: ['/manager/prestations'],
            },
        ],
    },
];
