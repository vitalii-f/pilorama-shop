'use server';

import { TableUpdateType } from "@/types/types";

export const deleteRequest = async (id: number | string, collection: string) => {
  return await fetch('http://localhost:3000/api/collection', {
    method: 'DELETE',
    body: JSON.stringify({ id, collection }),
  });
};

export const updateRequest = async (id: number, collection: string, data: TableUpdateType) => {
  return await fetch('http://localhost:3000/api/collection', {
    method: 'PUT',
    body: JSON.stringify({ id, collection, data }),
  });
}

export const getRequest = async (collection: string) => {
  const res = await fetch(`http://localhost:3000/api/collection?collection=${collection}`, {
    method: 'GET',
  });
  return await res.json()
}
