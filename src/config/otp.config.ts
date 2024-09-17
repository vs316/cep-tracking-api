import otpGenerator from 'otp-generator';

const sendOTP = async (req, res) => {
  const { username, mobile, name } = req.body;
  try {
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
    });

    // Save OTP to database (implementation not shown)
    await saveOTPToDatabase(username, otp);

    await sendVerificationMessage({ name, otp }, mobile);

    res.json({ success: true, message: 'OTP sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to send OTP' });
  }
};

const RESEND_TIMEOUT = 60000; // 1 minute
let lastSentTime = 0;

const resendOTP = async (req, res) => {
  const { username, mobile, name } = req.body;
  const currentTime = Date.now();

  if (currentTime - lastSentTime < RESEND_TIMEOUT) {
    return res
      .status(429)
      .json({ message: 'Please wait before requesting a new OTP' });
  }

  try {
    await sendOTP(req, res);
    lastSentTime = currentTime;
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to resend OTP' });
  }
};
