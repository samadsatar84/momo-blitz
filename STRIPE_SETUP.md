# STRIPE PAYMENT GATEWAY SETUP

## Quick Start Guide

### 1. Create a Stripe Account
- Visit: https://dashboard.stripe.com/register
- Sign up and verify your email
- Complete your business details

### 2. Get Your API Keys
- Go to: https://dashboard.stripe.com/apikeys
- Copy your **Publishable Key** (starts with `pk_`)
- Copy your **Secret Key** (starts with `sk_`) - Save securely!

### 3. Update Your Frontend Configuration

#### In `src/pages/Checkout.jsx`, replace:
```javascript
const stripePromise = loadStripe("pk_test_1234567890abcdef");
```

With your actual **Publishable Key**:
```javascript
const stripePromise = loadStripe("pk_live_YOUR_ACTUAL_KEY");
```

### 4. Environment Variables Setup

Create a `.env` file in the root directory:
```
REACT_APP_STRIPE_PUBLIC_KEY=pk_test_YOUR_KEY_HERE
REACT_APP_API_URL=http://localhost:5000/api
```

Then update `src/pages/Checkout.jsx`:
```javascript
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
```

### 5. Backend Integration (Node.js/Express Example)

**Install Stripe on backend:**
```bash
npm install stripe
```

**Create payment endpoint:**
```javascript
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

app.post('/api/payments', async (req, res) => {
  const { paymentMethodId, amount, currency } = req.body;
  
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // in cents
      currency: currency || 'pkr',
      payment_method: paymentMethodId,
      confirm: true,
    });
    
    res.json({ success: true, paymentIntent });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
```

## Payment Methods Implemented

✅ **Credit/Debit Card** - Via Stripe  
✅ **Cash on Delivery (COD)**  
✅ **Mobile Payment** - JazzCash & Easypaisa  

## Test Card Numbers (Stripe Sandbox)

| Card Type | Number | CVC | Date |
|-----------|--------|-----|------|
| Visa | 4242 4242 4242 4242 | Any | Future date |
| MasterCard | 5555 5555 5555 4444 | Any | Future date |
| Amex | 3782 822463 10005 | Any 4 digits | Future date |

## Security Features

🔒 PCI DSS Compliant  
🔒 Encrypted Transmission  
🔒 Tokenized Card Data  
🔒 No Direct Card Storage  

## Testing

1. Add items to cart
2. Go to checkout
3. Select "Debit/Credit Card" option
4. Use test card numbers above
5. Enter any future expiry date and CVC

## Production Checklist

- [ ] Switch to live Stripe keys
- [ ] Enable webhook listeners
- [ ] Set up email confirmations
- [ ] Configure order receipt emails
- [ ] Test with real transactions
- [ ] Set up fraud detection
- [ ] Configure refund policies

## Support

Stripe Documentation: https://stripe.com/docs  
Dashboard: https://dashboard.stripe.com  
Support: https://support.stripe.com
