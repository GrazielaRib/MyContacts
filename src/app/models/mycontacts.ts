export interface Mycontacts {
grupo: any;
endereco: any;
telefone: any;
  createMycontacts(mycontacts: Mycontacts): unknown;
  id?: string;
  nome: string;
  cidade: string;
  estado: string;
  email: string;
  descricao: string;
  data: Date;
  fotoUrl?: string;

}
