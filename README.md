# Express WhatsApp Webhook

A minimal Express.js webhook handler to receive WhatsApp message requests from a WordPress site.

## Usage

1. Deploy this repo to [Render](https://render.com).
2. Set your webhook endpoint in WordPress to:
   `https://your-app.onrender.com/whatsapp-webhook`
3. Integrate WhatsApp API inside `/whatsapp-webhook` route.

## Customize

- Add authentication or IP filtering.
- Use Twilio or Meta WhatsApp Business Cloud API to send messages.

