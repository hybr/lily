
export interface Field {
    name: string;
    value_type: string;
}

export interface Table {
    name: string;
    fields: Field[];
}