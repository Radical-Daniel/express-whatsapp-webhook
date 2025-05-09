const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/whatsapp-webhook', (req, res) => {
  const { phone, message } = req.body;

  console.log('📩 Incoming message request:');
  console.log('To:', phone);
  console.log('Message:', message);

  // TODO: Integrate with WhatsApp API here (e.g., Twilio, Meta's API)

  res.status(200).json({ status: 'success', info: 'Message received' });
});

app.get('/', (req, res) => {
  res.send('Webhook is live 🎉');
});

app.listen(PORT, () => {
  console.log(`✅ Webhook server running on port ${PORT}`);
});
