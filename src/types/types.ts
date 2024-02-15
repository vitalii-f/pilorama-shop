import { Database } from './supabase';

export type DatabaseTables = Database['public']['Tables'];
export type Tables = keyof DatabaseTables;

export type TableType = {
  [key in keyof DatabaseTables]: DatabaseTables[key]['Row'];
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
      required?: string[]
      properties: {
        [key in keyof TableType]: {
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


export interface FetchedData {
  collection: Tables;
  fields: string[];
  types: string[];
}

export interface ResponseCollectionData {
  collection: Tables
  fields: {
      name: keyof TableType;
      isRequired: boolean | undefined;
      isSelect: boolean;
      isMultipleSelect: boolean;
      selectItems: {
        id: number
        name: string
        value: string
      }[] | undefined;
      type: string;
  }[];
}[]

export enum ImageFormat {
  'image/jpeg' = 'jpg',
  'image/png' = 'png',
  'image/x-icon' = 'ico',
}