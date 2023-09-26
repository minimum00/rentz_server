const { auth } = require('../firebaseConfig');
const { sendPasswordResetEmail, getUserByEmail } = require('firebase/auth');

const ResetPassword = async (req, res) => {
  try {
    const { email } = req.body;

  

    await sendPasswordResetEmail(auth, email);

    return res.status(200).json({ message: 'Password reset email sent successfully' });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Something went wrong' });

  }
};

module.exports = ResetPassword;
