import { Block } from '../types/block';

export interface Page {
    title: string;
    stub: string;
    blocks: Block[];
    menu: Menu,
    _id?: string;
}

export interface Menu {
    location: string,
    level: string,
    shop?: string,
    category?: string,
}

export interface PageResponse {
    data: Page
}


export interface MultiplePageResponse {
    data: Page[]
}