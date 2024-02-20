import React from 'react';

const testFetch = async () => {
    'use server'
  let message = {
        "invoiceId": "p2_9ZgpZVsl3",
        "status": "created",
        "failureReason": "string",
        "amount": 4200,
        "ccy": 980,
        "finalAmount": 4200,
        "createdDate": "2019-08-24T14:15:22Z",
        "modifiedDate": "2019-08-24T14:15:22Z",
        "reference": "84d0070ee4e44667b31371d8f8813947",
        "cancelList": [
          {
            "status": "processing",
            "amount": 4200,
            "ccy": 980,
            "createdDate": "2019-08-24T14:15:22Z",
            "modifiedDate": "2019-08-24T14:15:22Z",
            "approvalCode": "662476",
            "rrn": "060189181768",
            "extRef": "635ace02599849e981b2cd7a65f417fe"
          }
        ]
      };

  await fetch('http://localhost:3000/api/pay', {
    method: 'POST',
    headers: {
      'x-sign':
        'MEUCIQDK4+xdOfL6zql9XsFoDyoNL3Dqa0XBOgMhEqnYxIGXgwIgXVjeWHpb6EQt3LqEXIgUp5f9MZmIqjGBoxBd8cDVA0o=',
    },
    body: JSON.stringify(message),
  });
};

const TestPage = async () => {

  return (
    <form action={testFetch}>
      <button type='submit' style={{width: '500px', height: '300px'}}>TestPage</button>
    </form>
  );
};

export default TestPage;
