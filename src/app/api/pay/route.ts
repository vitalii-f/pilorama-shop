import { createClient } from '@/utils/supabase/server';
import crypto from 'crypto';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const message = await request.json();
  const xSign = request.headers.get('x-sign');

  if (xSign) {
    let pubKeyBase64 = process.env.PUBLIC_KEY!;
    let xSignBase64 = xSign;

    let signatureBuf = Buffer.from(xSignBase64, 'base64');
    let publicKeyBuf = Buffer.from(pubKeyBase64, 'base64');

    let verify = crypto.createVerify('SHA256');

    let messageString = JSON.stringify(message);

    verify.write(messageString);
    verify.end();

    let result = verify.verify(publicKeyBuf, signatureBuf);

    if (result === true) {
      const cookieStore = cookies();
      const supabase = createClient(cookieStore);

      const { data: purchaseData } = await supabase
        .from('purchase')
        .update({ status: message.status })
        .eq('invoiceId', message.invoiceId)
        .select('*');

      if (message.status === 'success' && purchaseData) {
        for (const gameId of purchaseData[0].product_id) {
          await supabase.from('user_library').insert({
            game_id: gameId,
            price: purchaseData[0].total_price,
            user_id: purchaseData[0].user_id,
          });
        }

        await supabase
          .from('cart')
          .delete()
          .eq('user_id', purchaseData[0].user_id);
      }

      return new Response('200 OK', {
        status: 200,
        headers: { 'X-Sign': process.env.X_SIGN! },
      });
    } else {
      return new Response('403', {
        status: 403,
      });
    }
  }
  return new Response('400 bad request', {
    status: 400,
  });
}
