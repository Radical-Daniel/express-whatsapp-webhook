const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
const axios = require('axios');

const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
const WHATSAPP_PHONE_NUMBER_ID = process.env.PHONE_ID;

app.post('/whatsapp-webhook', async (req, res) => {
    const { phone, message } = req.body;
    console.log("we here");

    try {
        const response = await axios.post(
            `https://graph.facebook.com/v19.0/${WHATSAPP_PHONE_NUMBER_ID}/messages`,
            
            
            {
                messaging_product: 'whatsapp',
                to: phone,
                type: 'template',
                template: { 
                    name: "bid_test",
                    language: {
                         "code": "en"
                    },
                    components: [{
                        "type": "body",
                         "parameters": [
          {
            "type": "text",
            "text": message,
          }
        ] },],
            },
            },
            {
                headers: {
                    'Authorization': `Bearer ${WHATSAPP_TOKEN}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        console.log('WhatsApp message sent:', response.data);
        res.status(200).json({ success: true, sent: response.data });
    } catch (error) {
        console.error('WhatsApp send error:', error.response?.data || error.message);
        res.status(500).json({ success: false, error: error.response?.data || error.message });
    }
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
