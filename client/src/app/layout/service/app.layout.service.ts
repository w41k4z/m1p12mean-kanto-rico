import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface AppConfig {
    inputStyle: string;
    colorScheme: string;
    theme: string;
    ripple: boolean;
    menuMode: string;
    scale: number;
}

interface LayoutState {
    staticMenuDesktopInactive: boolean;
    overlayMenuActive: boolean;
    profileSidebarVisible: boolean;
    configSidebarVisible: boolean;
    staticMenuMobileActive: boolean;
    menuHoverActive: boolean;
}

@Injectable({
    providedIn: 'root',
})
export class LayoutService {
    config: AppConfig;

    state: LayoutState = {
        staticMenuDesktopInactive: false,
        overlayMenuActive: false,
        profileSidebarVisible: false,
        configSidebarVisible: false,
        staticMenuMobileActive: false,
        menuHoverActive: false,
    };

    private configUpdate = new Subject<AppConfig>();

    private overlayOpen = new Subject<any>();

    configUpdate$ = this.configUpdate.asObservable();

    overlayOpen$ = this.overlayOpen.asObservable();

    constructor() {
        const storageColorScheme = localStorage.getItem('colorScheme');
        const storageTheme = localStorage.getItem('theme');
        this.config = {
            ripple: true,
            inputStyle: 'outlined',
            menuMode: 'static',
            colorScheme: storageColorScheme || 'light',
            theme: storageTheme || 'mdc-light-deeppurple',
            scale: 14,
        };
        const themeLink = document.getElementById(
            'theme-css'
        ) as HTMLLinkElement;
        if (themeLink) {
            themeLink.href = `assets/layout/styles/theme/${this.config.theme}/theme.css`;
        } else {
            // Create new theme link if it does not exist
            const newLink = document.createElement('link');
            newLink.id = 'theme-css';
            newLink.rel = 'stylesheet';
            newLink.type = 'text/css';
            newLink.href = `assets/layout/styles/theme/${this.config.theme}/theme.css`;

            document.head.appendChild(newLink);
        }
    }

    onMenuToggle() {
        if (this.isOverlay()) {
            this.state.overlayMenuActive = !this.state.overlayMenuActive;
            if (this.state.overlayMenuActive) {
                this.overlayOpen.next(null);
            }
        }

        if (this.isDesktop()) {
            this.state.staticMenuDesktopInactive =
                !this.state.staticMenuDesktopInactive;
        } else {
            this.state.staticMenuMobileActive =
                !this.state.staticMenuMobileActive;

            if (this.state.staticMenuMobileActive) {
                this.overlayOpen.next(null);
            }
        }
    }

    onOverlaySubmenuOpen() {
        this.overlayOpen.next(null);
    }

    showProfileSidebar() {
        this.state.profileSidebarVisible = !this.state.profileSidebarVisible;
        if (this.state.profileSidebarVisible) {
            this.overlayOpen.next(null);
        }
    }

    showConfigSidebar() {
        this.state.configSidebarVisible = true;
    }

    isOverlay() {
        return this.config.menuMode === 'overlay';
    }

    isDesktop() {
        return window.innerWidth > 991;
    }

    isMobile() {
        return !this.isDesktop();
    }

    onConfigUpdate() {
        this.configUpdate.next(this.config);
    }

    isDarkTheme(): boolean {
        return this.config.colorScheme === 'dark';
    }

    private changeTheme(newTheme: string, newMode: string) {
        const themeLink = <HTMLLinkElement>document.getElementById('theme-css');
        const newHref = themeLink
            .getAttribute('href')!
            .replace(this.config.theme, newTheme);
        this.replaceThemeLink(newHref, () => {
            this.config.theme = newTheme;
            this.config.colorScheme = newMode;
            localStorage.setItem('theme', newTheme);
            localStorage.setItem('colorScheme', newMode);
            this.onConfigUpdate();
        });
    }

    toggleDarkMode() {
        const newMode = this.isDarkTheme() ? 'light' : 'dark';
        const previousMode = this.isDarkTheme() ? 'dark' : 'light';
        const newTheme = this.config.theme.replace(previousMode, newMode);
        this.changeTheme(newTheme, newMode);
    }

    private replaceThemeLink(href: string, onComplete: Function) {
        const id = 'theme-css';
        const themeLink = <HTMLLinkElement>document.getElementById('theme-css');
        const cloneLinkElement = <HTMLLinkElement>themeLink.cloneNode(true);

        cloneLinkElement.setAttribute('href', href);
        cloneLinkElement.setAttribute('id', id + '-clone');

        themeLink.parentNode!.insertBefore(
            cloneLinkElement,
            themeLink.nextSibling
        );

        cloneLinkElement.addEventListener('load', () => {
            themeLink.remove();
            cloneLinkElement.setAttribute('id', id);
            onComplete();
        });
    }
}
