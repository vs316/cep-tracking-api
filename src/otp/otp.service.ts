import { CourierClient } from '@trycourier/courier';

const courier = new CourierClient({
  authorizationToken: process.env.COURIER_TOKEN,
});
const sendVerificationMessage = (params, mobileNumber) => {
  return courier.send({
    message: {
      to: {
        data: params,
        phone_number: mobileNumber,
      },
      content: {
        title: 'Verification Code',
        body: 'Hi {{name}},\nYour verification code is {{otp}}.',
      },
      routing: {
        method: 'single',
        channels: ['sms'],
      },
    },
  });
};
