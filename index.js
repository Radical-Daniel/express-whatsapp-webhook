const axios = require('axios');

const WHATSAPP_TOKEN = 'EAAYk7KurZBLQBOyLVIEYJELH15R3yvR57anu8eFyQeZBgfUrOaxsvasykZBeCPXxJFiDTeSj2YxQG3vPSg724UPYPO5f5WdZCYr13XmZA3x2gmxIlfdJdXWKKGl7zxy91JoenUJZCgS0DEsp6zsYV9Fo4oYqENNmU4zODfZBUIvp1IgEjaGMtdyTZBJSUslMFh82moo1shVsMDAwne3xO9UZACFt3xRx9XcL4ZCSZA5XP9R';
const WHATSAPP_PHONE_NUMBER_ID = '632146033315960';

app.post('/whatsapp-webhook', async (req, res) => {
    const { phone, message } = req.body;

    try {
        const response = await axios.post(
            `https://graph.facebook.com/v19.0/${632146033315960}/messages`,
            {
                messaging_product: 'whatsapp',
                to: phone,
                type: 'text',
                text: { body: message },
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
