//
// utilities
import queryString from 'query-string';

export const twilio = (phone, message) => {
  const query = queryString.stringify({
    To: phone,
    From: 2175744130,
    Body: message,
  })

  const authToken = process.env.TWILIO_AUTH_TOKEN
  const accountSid = process.env.TWILIO_ACCOUNT_SID
  const encodedAuth = btoa(`${accountSid}:${authToken}`)

  return fetch(`https://api.twilio.com/2010-04-01/Accounts/${authToken}/Messages.json`, {
    headers: {
      Authorization: `Basic ${encodedAuth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    method: 'POST',
    body: query,
  }).then(response => response)
    .catch(err => {console.error(err)})
}
