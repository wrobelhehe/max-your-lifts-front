import { Injectable } from "@angular/core";

export interface Menu {
    state: string;
    name: string;
    icon: string;
    role: string;
}

const MENUITEMS = [
    { state: 'plans', name: 'Plans', icon: 'assignment', role: '' },
    { state: 'category', name: 'Manage Category', icon: 'category', role: 'admin' },


]

@Injectable()
export class MenuItems {
    getMenuItem(): Menu[] {
        return MENUITEMS
    }
}