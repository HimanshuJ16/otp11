const express = require('express');
const cors = require('cors');
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cookieParser = require('cookie-parser');

// Initialize Firebase app (replace with your project credentials)
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: "otp-login-74ebf",
    privateKey: (process.env.PRIVATE_KEY || '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCe3kyqumEo++/N\nosUItq/PnasmAeuU9jYDslkWih8yotkshuKYQtRJHvjMei9mXU51ugBQvtAAq1jC\nD5WrAJzXnbT4rm2vQG9qH6ylI5u3vU/AyEUZm19xFeyxy0eXIUgQ1l8rdzdU+MdK\nHyCvlllgjU8oK28UZG0D4yxrBy0TwWjqb0W1QInSR2TZTiwAzr0dB+swJmVfHE9P\nyBUVF9GJ6j3h+kUz32RAMKw2RNLN8W1Op60+FYnnUkOnrWHB++3d62+6nmm/Qaym\nX69hhjEfKz4W8YlJD8ZPG2cSLOWiyW7/RzxMIuzsG7GxRAf8pCIGS3m4KZms5bd6\ncEp79IJvAgMBAAECggEAN4JvAVx8JGjbIlvUQrYqef2aVn5nRTY+K05+yFxciEHU\nZjV/KTp4mFAFGNU8iKTjjEkAYTY60XENY0k0v3pIUyJcoGO6GXkHNOp6VX06pJm2\nKyMO2eKrF4VUnc7sZccQOindOP+/yqXeZGy57AA5nH3jgaKjflmUqb4PwBnSy0rE\n4Jcfo0+FXCEhBz7oPJMbWT7wSZxmwwTvStkNjgDgoFkWCHXxVhbO/4/FvWvnJxRD\nNm1cPOXnP+hrMvPvAr+fYNpSKKKY/tN0OpNX/nDuRJkz452eqyEc3l7dAKSgvuVf\n4q4/GPGr97mhOdbpyxVNslrCO3HyRW6iX2rMn/A7eQKBgQDWPvGWVTXoYe2L9o8U\nAvFvequlD9ZxFEDgaRk/Qvgg91AJO9dHsFp9KqmnuVn2owM6A4zKAQNf+wN1vmnc\nzVoY5oxpnVwxUOhfu+CELMtQgiDqVjxtcH+07QMzeIcUNXL21v5gZ2QbaAWq/oPv\nnUYm672IRofP/8ONWL9iTDSlEwKBgQC91Hx8fgXzOJT/D0OZaWKkcHaHV2iUHxTe\nwTSPbDTVmMP31mBpspsPPJ/xyyq7wimYC/fD6/v4gv08wIYpMpT/EwKltrYq3ZSB\nsbiAkGcoPBju8BSieP3OYP2ihI5b7KYdYQTsZ1BMcQ1DD/xvapccWCMsDkzFSimC\n/0GUraqEtQKBgGnSz1u1HRp6fG4czBFTXtP0oKG4T/Cs01rFLt5Lguotnk/hSfW0\nCw42K3SYHfKwFCDsrfb9RyB6iPv4oKualv0jq4ljW61UTGM1FrHSul462G1HSTO5\nVKsWQvWCfB4kRHPeP+l4SD8tQ1dxvdN2OLdyy7xrMhwwNfQ0ONwhzgMXAoGAYk4u\n5X2R8UHlDy1FcaX8unGvQCmI8+Qgt7bQVFHSDqddHPS82x/uYvafUeVHzRIg3iec\neK61vx1+rT56e81BEdMzdMPpFMvJA10Y0iN1+IUe2GYmGXmU3pKl5srEumAUKnS6\nyv45vExzdL5LmRtXBAu0szT4ltbwJnGv8aH6A10CgYB2q1rNJKdOpEby+fv59DCU\nhtmnkiU/uO8tAVH87g0gzKLrP/+1V9WuGRazJuSICsVf6EUFI7u9gkjDtKsRxOs2\nU6dNEI/swakY2DNwuMzC6ciXpHoFFsuja7uOqZur5wp0SS3TsgC8rUmrlJ3Fghtj\nTzEnLWZJd1Tgm5CYm7tqfg==\n-----END PRIVATE KEY-----\n').replace(/\\n/g, '\n'),
    clientEmail: "firebase-adminsdk-jroft@otp-login-74ebf.iam.gserviceaccount.com",
    firebaseUrl: "https://accounts.google.com/o/oauth2/auth"
  })
});

const app = express();
app.use(cors({ origin: true })); // Adjust origin as needed
app.use(express.json());
app.use(express.static('public'));
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// Middleware to verify Firebase ID token for protected routes
const verifyToken = async(req, res, next) => {
  try {
    const idToken = req.cookies.firebaseToken;
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.redirect('/signup');
  }
};

// Protected route example
// app.get('/protected-data', verifyToken, (req, res) => {
//   // Access user data from req.user
//   const uid = req.user.uid;
//   // Simulate fetching protected data based on user ID
//   const protectedData = `Protected data for user ${uid}`;
//   res.json({ message: protectedData });
// });

app.get('/', (req, res) => res.render('home'));
app.get('/quiz', verifyToken, (req, res) => res.render('quiz'));
app.get('/demat-account', (req, res) => res.render('demat-account'));
app.get('/merchandise-store', (req, res) => res.render('merchandise-store'));
app.get('/technical-analysis-courses', (req, res) => res.render('technical-analysis-courses'));
app.get('/advisory-services', (req, res) => res.render('advisory-services'));
app.get('/terms', (req, res) => res.render('terms'));
app.get('/about-us', (req, res) => res.render('about-us'));
app.get('/e-books', (req, res) => res.render('e-books'));
app.get('/blogs', (req, res) => res.render('blogs'));
app.get('/careers', (req, res) => res.render('careers'));
app.get('/faqs', (req, res) => res.render('faqs'));
app.get('/pdf', verifyToken, (req, res) => res.render('pdf'));
app.get('/signup', (req, res) => res.render('signup'));
app.get('/logout', (req, res) => {
  res.clearCookie('firebaseToken');
  res.redirect('/');
});

app.listen(3000, () => console.log('Server listening on port 3000'));

exports.app = functions.https.onRequest(app);
