import crypto from 'crypto';

export async function POST(request: Request) {
  const message = await request.json();
  console.log(request.headers.get('x-sign'));
  console.log(message);

  const xSign = request.headers.get('x-sign')

  if (xSign) {
    let pubKeyBase64 = process.env.PUBLIC_KEY!
    let xSignBase64 = xSign;

    let signatureBuf = Buffer.from(xSignBase64, 'base64');
    let publicKeyBuf = Buffer.from(pubKeyBase64, 'base64');

    let verify = crypto.createVerify('SHA256');

    let messageString = JSON.stringify(message);

    verify.write(messageString);
    verify.end();

    let result = verify.verify(publicKeyBuf, signatureBuf);
    console.log(result === true ? 'OK' : 'NOT OK');
  }
  return new Response('200 OK', {
    status: 200,
    headers: { 'X-Sign': process.env.X_SIGN! },
  });
}
