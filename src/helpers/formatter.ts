import {
  CollectionsData,
  ResponseCollectionData,
  TableType,
  Tables,
} from '@/types/types';

export const formatCollectionsData = (
  data: CollectionsData[]
): ResponseCollectionData[] => {
  const collectionsData = data as unknown as CollectionsData;
  const collectionsName = Object.keys(collectionsData.definitions) as Tables[];

  const res = collectionsName.map((collectionName) => {
    const fieldsList = Object.keys(
      collectionsData.definitions[collectionName].properties
    ) as Array<keyof TableType>;
    const fields = fieldsList.map((field) => {
      const isRequired =
        collectionsData.definitions[collectionName].required?.includes(field);

      const isSelect: boolean | undefined =
        collectionsData.definitions[collectionName].properties[
          field
        ].description?.includes('Foreign Key')

      const isMultipleSelect: boolean | undefined = collectionsData.definitions[collectionName].properties[
        field
      ].type?.includes('array');

      const fieldType = isSelect
        ? 'select'
        : collectionsData.definitions[collectionName].properties[field].format;

      return {
        name: field,
        isRequired,
        isSelect,
        isMultipleSelect,
        selectItems: undefined,
        type: fieldType,
      };
    });

    return {
      collection: collectionName,
      fields,
    };
  });

  return res;
};
