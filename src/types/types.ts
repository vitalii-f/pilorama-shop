import { Database, TablesUpdate } from './supabase';

export type DatabaseTables = Database['public']['Tables'];
export type Tables = keyof DatabaseTables;


export type TableRowType = {
  [key in Tables]: DatabaseTables[key]['Row'];
}[keyof DatabaseTables];

export type TableInsertType = {
  [key in keyof DatabaseTables]: DatabaseTables[key]['Insert'];
}[keyof DatabaseTables];

export type TableUpdateType = {
  [key in keyof DatabaseTables]: DatabaseTables[key]['Update'];
}[keyof DatabaseTables];

export interface CollectionsData {
  definitions: {
    [key in keyof DatabaseTables]: {
      required?: string[];
      properties: {
        [key in keyof TableRowType]: {
          description: string;
          format: string;
          type: string;
        };
      };
    };
  };
}

export enum FieldFormat {
  bigint = 'number',
  text = 'text',
  array = 'multiple select',
  select = 'select',
  string = 'text',
  'timestamp with time zone' = 'date',
}

export enum CollectionFieldType {
  number = 'number',
  text = 'text',
  select_multiple = 'select_multiple',
  select = 'select',
  date = 'date',
  img_multiple = 'file_multiple',
  img = 'file',
  markdown = 'markdown'
}

export interface FetchedData {
  collection: Tables;
  fields: string[];
  types: string[];
}

export interface ResponseCollectionData {
  collection: Tables;
  fields: {
    name: keyof TableRowType;
    isRequired: boolean | undefined;
    isSelect: boolean;
    isMultipleSelect: boolean;
    selectItems:
      | {
          id: number;
          name: string;
          value: string;
        }[]
      | undefined;
    type: string;
  }[];
}
[];

export enum ImageFormat {
  'image/jpeg' = 'jpg',
  'image/png' = 'png',
  'image/x-icon' = 'ico',
}

export interface SelectProps {
  id: number;
  name: string;
  value: string;
}

export interface CollectionInputProps {
  name: string;
  type: CollectionFieldType;
  isRequired: boolean;
  isBlocked: boolean;
  isMultiple: boolean;
  selectItems: SelectProps[];
}

export interface MiltipleImagesProps {
  [key: string]: Array<FileList | string>;
}