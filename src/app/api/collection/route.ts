import {
  CollectionsData,
  TableInsertType,
  TableRowType,
  TableUpdateType,
  Tables,
} from '@/types/types';
import { createClient } from '@/utils/supabase/client';
import { NextResponse } from 'next/server';

interface DataProps {
  collection: Tables;
  data: {
    [k: string]: FormDataEntryValue;
  };
}

export async function GET(request: Request) {
  const supabase = createClient();
  const { searchParams } = new URL(request.url);
  const collection = searchParams.get('collection') as Tables;
  try {
    const { data, error } = await supabase.from('').select();
    if (!data || error) throw new Error(error.message);

    const collectionsData = data as unknown as CollectionsData;

    const typesKeys = Object.keys(
      collectionsData.definitions[collection].properties
    ) as Array<keyof TableRowType>;

    const res = {
      collection: collection,
      fields: Object.keys(collectionsData.definitions[collection].properties),
      types: typesKeys.map(
        (propertyName) =>
          collectionsData.definitions[collection].properties[propertyName]
            .format
      ),
    };

    return NextResponse.json(res);
  } catch (error) {
    throw new Error(error as string);
  }
}

export async function POST(request: Request) {
  const supabase = createClient();
  const formData: DataProps = await request.json();
  try {
    const { data, error } = await supabase
      .from(formData.collection)
      .insert(formData.data as unknown as TableInsertType)
      .select();
    if (error) throw new Error(error.message);

    return NextResponse.json(data);
  } catch (error) {
    throw new Error(error as string);
  }
}

interface DataDeleteProps {
  collection: Tables;
  id: number;
}

export async function DELETE(request: Request) {
  const supabase = createClient();
  const requestData: DataDeleteProps = await request.json();
  try {
    const { data, error } = await supabase
      .from(requestData.collection)
      .delete()
      .eq('id', requestData.id)
      .select();
    if (error) throw new Error(error.message);

    return NextResponse.json(data);
  } catch (error) {
    throw new Error(error as string);
  }
}

interface PutProps {
  collection: Tables;
  id: number;
  data: {
    [k: string]: FormDataEntryValue;
  };
}

export async function PUT(request: Request) {
  const supabase = createClient();
  const requestData: PutProps = await request.json();
  try {
    const { data, error } = await supabase
      .from(requestData.collection)
      .update(requestData.data as unknown as TableUpdateType)
      .eq('id', requestData.id)
      .select();
    if (error) throw new Error(error.message);
    return NextResponse.json(data);
  } catch (error) {
    throw new Error(error as string);
  }
}
