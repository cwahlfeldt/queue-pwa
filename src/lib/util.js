//
// utilities
import queryString from 'query-string';

export const twilio = (phone, message) => {
  const query = queryString.stringify({
    To: phone,
    From: 2175744130,
    Body: message,
  })

  return fetch(`https://api.twilio.com/2010-04-01/Accounts/ACed9217511cdba64e20d03e2ac31c45eb/Messages.json`, {
    headers: {
      Authorization: 'Basic QUNlZDkyMTc1MTFjZGJhNjRlMjBkMDNlMmFjMzFjNDVlYjpmM2ZmOTYwYjJmYjEzNDA2ZWRhMjQ4YzFlM2NiYzU2NA==',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    method: 'POST',
    body: query,
  })
    .then(response => response)
    .catch(err => {console.error(err)})
}
