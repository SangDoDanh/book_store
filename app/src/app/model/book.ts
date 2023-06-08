import { Type } from "./type";

export interface Book {

        id?: number;
        title?: string;
        quantity?: number;
        price?: number;
        description?: string;
        image?: string;
        type?: Type;
}
