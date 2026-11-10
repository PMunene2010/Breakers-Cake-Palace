
  # Breakers Cake Palace

  This is a code bundle for Breakers Cake Palace. The original project is available at https://www.figma.com/design/gVeDW9mismO58gMA2BRtGs/Breakers-Cake-Palace.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

  ## Order email setup

  Order submissions are delivered to `breakers.cakepalace@gmail.com` through
  EmailJS. Before email delivery works, configure an EmailJS email service and
  template:

  1. Set the template recipient to `breakers.cakepalace@gmail.com`.
  2. Use the template variables `customer_name`, `customer_phone`, `occasion`,
     `event_date`, and `order_details`. A suggested subject is
     `Cake order enquiry - {{occasion}}`.
  3. Copy `.env.example` to `.env.local` and fill in the EmailJS service ID,
     template ID, and public key for local development.
  4. For GitHub Pages, add repository Actions secrets named
     `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, and
     `VITE_EMAILJS_PUBLIC_KEY`, then rerun the deploy workflow.

  The EmailJS public key is intended for browser use. Do not put private email
  provider credentials in this frontend project. If email delivery fails, the
  order form offers a WhatsApp link containing the submitted order details.
  