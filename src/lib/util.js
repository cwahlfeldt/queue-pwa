//
// utilities
import queryString from 'query-string';

const twilioRequestUrl = 'https://api.twilio.com/2010-04-01/Accounts/'+ process.env.TWILIO_ACCOUNT_SID + '/Messages.json';
const twilioAuth = 'Basic ' + btoa(process.env.TWILIO_ACCOUNT_SID + ':' + process.env.TWILIO_AUTH_TOKEN)
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER
console.log(twilioPhoneNumber, twilioRequestUrl, twilioAuth)
console.log(process.env)

export const twilio = async (phone, message) => {
  const query = queryString.stringify({
    To: phone,
    From: twilioPhoneNumber,
    Body: message,
  })

  return fetch(twilioRequestUrl, {
    headers: {
      Authorization: twilioAuth,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    method: 'POST',
    body: query,
  }).then(response => response)
    .catch(err => {console.error(err)})
}
