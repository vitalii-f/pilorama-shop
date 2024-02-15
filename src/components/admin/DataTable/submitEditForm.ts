'use server';

const submitForm = async (
  formData: FormData,
  collection: string,
  id: number | string
) => {
  const form = Object.fromEntries(formData.entries());
  for (const key in form) {
    if (key.includes('$ACTION')) {
      delete form[key];
    }
  }

  const request = await fetch('http://localhost:3000/api/collection', {
    method: 'PUT',
    body: JSON.stringify({ collection, data: form, id }),
  });

  if (request) {
    // redirect(`/admin/collections/${params.slug}`)
  }
};

export default submitForm;
