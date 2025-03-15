export default [
    {
        label: 'Home',
        items: [
            {
                label: 'Dashboard',
                icon: 'pi pi-fw pi-home',
                routerLink: ['/template/'],
            },
        ],
    },
    {
        label: 'UI Components',
        items: [
            {
                label: 'Form Layout',
                icon: 'pi pi-fw pi-id-card',
                routerLink: ['/template/uikit/formlayout'],
            },
            {
                label: 'Input',
                icon: 'pi pi-fw pi-check-square',
                routerLink: ['/template/uikit/input'],
            },
            {
                label: 'Float Label',
                icon: 'pi pi-fw pi-bookmark',
                routerLink: ['/template/uikit/floatlabel'],
            },
            {
                label: 'Invalid State',
                icon: 'pi pi-fw pi-exclamation-circle',
                routerLink: ['/template/uikit/invalidstate'],
            },
            {
                label: 'Button',
                icon: 'pi pi-fw pi-mobile',
                routerLink: ['/template/uikit/button'],
                class: 'rotated-icon',
            },
            {
                label: 'Table',
                icon: 'pi pi-fw pi-table',
                routerLink: ['/template/uikit/table'],
            },
            {
                label: 'List',
                icon: 'pi pi-fw pi-list',
                routerLink: ['/template/uikit/list'],
            },
            {
                label: 'Tree',
                icon: 'pi pi-fw pi-share-alt',
                routerLink: ['/template/uikit/tree'],
            },
            {
                label: 'Panel',
                icon: 'pi pi-fw pi-tablet',
                routerLink: ['/template/uikit/panel'],
            },
            {
                label: 'Overlay',
                icon: 'pi pi-fw pi-clone',
                routerLink: ['/template/uikit/overlay'],
            },
            {
                label: 'Media',
                icon: 'pi pi-fw pi-image',
                routerLink: ['/template/uikit/media'],
            },
            {
                label: 'Menu',
                icon: 'pi pi-fw pi-bars',
                routerLink: ['/template/uikit/menu'],
                preventExact: true,
            },
            {
                label: 'Message',
                icon: 'pi pi-fw pi-comment',
                routerLink: ['/template/uikit/message'],
            },
            {
                label: 'File',
                icon: 'pi pi-fw pi-file',
                routerLink: ['/template/uikit/file'],
            },
            {
                label: 'Chart',
                icon: 'pi pi-fw pi-chart-bar',
                routerLink: ['/template/uikit/charts'],
            },
            {
                label: 'Misc',
                icon: 'pi pi-fw pi-circle',
                routerLink: ['/template/uikit/misc'],
            },
            {
                label: 'MyDashBoard',
                icon: 'pi pi-fw pi-id-card',
                routerLink: ['/template/mydashboard'],
            },
        ],
    },
    {
        label: 'Prime Blocks',
        items: [
            {
                label: 'Free Blocks',
                icon: 'pi pi-fw pi-eye',
                routerLink: ['/template/blocks'],
                badge: 'NEW',
            },
            {
                label: 'All Blocks',
                icon: 'pi pi-fw pi-globe',
                url: ['https://www.primefaces.org/primeblocks-ng'],
                target: '_blank',
            },
        ],
    },
    {
        label: 'Utilities',
        items: [
            {
                label: 'PrimeIcons',
                icon: 'pi pi-fw pi-prime',
                routerLink: ['/template/utilities/icons'],
            },
            {
                label: 'PrimeFlex',
                icon: 'pi pi-fw pi-desktop',
                url: ['https://www.primefaces.org/primeflex/'],
                target: '_blank',
            },
        ],
    },
    {
        label: 'Pages',
        icon: 'pi pi-fw pi-briefcase',
        routerLink: ['/template/pages'],
        items: [
            {
                label: 'Landing',
                icon: 'pi pi-fw pi-globe',
                routerLink: ['/template/landing'],
            },
            {
                label: 'Auth',
                icon: 'pi pi-fw pi-user',
                items: [
                    {
                        label: 'Login',
                        icon: 'pi pi-fw pi-sign-in',
                        routerLink: ['/template/auth/login'],
                    },
                    {
                        label: 'Error',
                        icon: 'pi pi-fw pi-times-circle',
                        routerLink: ['/template/auth/error'],
                    },
                    {
                        label: 'Access Denied',
                        icon: 'pi pi-fw pi-lock',
                        routerLink: ['/template/auth/access'],
                    },
                ],
            },
            {
                label: 'Crud',
                icon: 'pi pi-fw pi-pencil',
                routerLink: ['/template/pages/crud'],
            },
            {
                label: 'Timeline',
                icon: 'pi pi-fw pi-calendar',
                routerLink: ['/template/pages/timeline'],
            },
            {
                label: 'Not Found',
                icon: 'pi pi-fw pi-exclamation-circle',
                routerLink: ['/template/pages/notfound'],
            },
            {
                label: 'Empty',
                icon: 'pi pi-fw pi-circle-off',
                routerLink: ['/template/pages/empty'],
            },
        ],
    },
    {
        label: 'Hierarchy',
        items: [
            {
                label: 'Submenu 1',
                icon: 'pi pi-fw pi-bookmark',
                items: [
                    {
                        label: 'Submenu 1.1',
                        icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {
                                label: 'Submenu 1.1.1',
                                icon: 'pi pi-fw pi-bookmark',
                            },
                            {
                                label: 'Submenu 1.1.2',
                                icon: 'pi pi-fw pi-bookmark',
                            },
                            {
                                label: 'Submenu 1.1.3',
                                icon: 'pi pi-fw pi-bookmark',
                            },
                        ],
                    },
                    {
                        label: 'Submenu 1.2',
                        icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {
                                label: 'Submenu 1.2.1',
                                icon: 'pi pi-fw pi-bookmark',
                            },
                        ],
                    },
                ],
            },
            {
                label: 'Submenu 2',
                icon: 'pi pi-fw pi-bookmark',
                items: [
                    {
                        label: 'Submenu 2.1',
                        icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {
                                label: 'Submenu 2.1.1',
                                icon: 'pi pi-fw pi-bookmark',
                            },
                            {
                                label: 'Submenu 2.1.2',
                                icon: 'pi pi-fw pi-bookmark',
                            },
                        ],
                    },
                    {
                        label: 'Submenu 2.2',
                        icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {
                                label: 'Submenu 2.2.1',
                                icon: 'pi pi-fw pi-bookmark',
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        label: 'Get Started',
        items: [
            {
                label: 'Documentation',
                icon: 'pi pi-fw pi-question',
                routerLink: ['/template/documentation'],
            },
            {
                label: 'View Source',
                icon: 'pi pi-fw pi-search',
                url: ['https://github.com/primefaces/sakai-ng'],
                target: '_blank',
            },
        ],
    },
];
