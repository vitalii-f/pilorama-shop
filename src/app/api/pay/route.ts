export async function POST(request: Request) {
  const message = await request.json();
  console.log(request.headers.get('x-sign'));
  console.log(message);

  return new Response('200 OK', {
    status: 200,
    headers: { 'X-Sign': process.env.X_SIGN! },
  });
}
