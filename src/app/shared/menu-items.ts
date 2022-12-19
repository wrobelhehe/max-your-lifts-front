import { Injectable } from "@angular/core";

export interface Menu {
    state: string;
    name: string;
    icon: string;
    role: string;
}

const MENUITEMS = [
    { state: 'plans', name: 'Plans', icon: 'assignment', role: '' },
    { state: 'category', name: 'Manage Categories', icon: 'category', role: 'admin' },
    { state: 'exercise', name: 'Manage Exercises', icon: 'fitness_center', role: 'admin' },



]

@Injectable()
export class MenuItems {
    getMenuItem(): Menu[] {
        return MENUITEMS
    }
}