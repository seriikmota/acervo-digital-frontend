'use strict';

//user
export const displayedColumnsUser: string[] = ['id','name', 'email'];
export const columnNamesMappingUser = {
  id: 'Código',
  name: 'Nome',
  email: 'Email',
};

//Items
export const displayedColumnsItems: string[] = ['numberCode','name', 'period', 'location', 'taxonomy'];
export const columnNamesMappingItems = {
 //fazer o mapeamento das colunas
  numberCode: 'Código',
  name: 'Nome',
  period: 'Periodo',
  location: 'Localização',
  taxonomy: 'Taxonomia'
};

//log
  export const displayedColumnsLog: string[] = ['id', 'name', 'login', 'action', 'date'];
  export const columnNamesMappingLog = {
    id: 'Código',
    name: 'Nome',
    login: 'Login',
    action: 'Ação',
    date: 'Data',
  };

export const displayedColumnsDTO: string[] = ['id', 'title', 'subtitle', 'approval', 'publicationDate'];
export const columnNamesMappingDTO = {
  id: 'Código',
  title: 'Título',
  subtitle: 'Subtítulo',
  approval: 'Aprovação',
  publicationDate: 'Data de Publicação',
};
