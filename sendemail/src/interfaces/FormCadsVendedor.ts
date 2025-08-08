export interface FormCadsVendedor {
    id?: number;
    nome: string;
    email: string;
}

export const initialFormCadsVendedorDefault: FormCadsVendedor = {
    id: 0,
    nome: '',
    email: ''
}