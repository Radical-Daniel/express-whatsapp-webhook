const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
const axios = require('axios');

const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
const WHATSAPP_PHONE_NUMBER_ID = process.env.PHONE_ID;

app.post('/whatsapp-webhook', async (req, res) => {
    console.log("we here");
   const {
        phone,
        template_name,
        parameters
    } = req.body;
    var params = [];
    if (template_name === "bid_rec") {
    params = [
                                { type: "text", text: parameters.bid_amount },
                                { type: "text", text: parameters.listing_name },
                                { type: "text", text: parameters.bidder_name },
                                { type: "text", text: parameters.original_price },
                                { type: "text", text: parameters.checkin },
                                { type: "text", text: parameters.checkout }
                            ];
    }
    else if (template_name === "bid_acc") {
        params = [ {type: "text", text: parameters.listing_name },
                  {type: "text", text: parameters.book_before },
            ];
    }
    else {
        params = [ {type: "text", text: parameters.listing_name },
                  {type: "text", text: parameters.guest_name },
                  {type: "text", text: parameters.checkin },
                  {type: "text", text: parameters.checkout },
                  ];
    }
    try {
        const response = await axios.post(
            `https://graph.facebook.com/v19.0/${WHATSAPP_PHONE_NUMBER_ID}/messages`,
            
            
            {
                messaging_product: 'whatsapp',
                to: phone,
                type: 'template',
                template: { 
                    name: template_name,
                    language: {
                         "code": "en"
                    },
                    components: [
                        {
                            type: "body",
                            parameters: params
                        }
                    ]
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
