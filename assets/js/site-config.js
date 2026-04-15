window.BITBYTES_CONFIG = {
  webhooks: {
    contact: "https://hook.us2.make.com/t4xvitutoqatbmic4ubmklgykotide6e",
    onboarding: "https://hook.us2.make.com/jht32w8hdv5sm11or9s94k21t6pcnu4g",
    booking: "#ADD_BOOKING_WEBHOOK"
  },
  stripe: {
    setupOneTime: "https://buy.stripe.com/cNi6oA8FddAD6LQgJg83C01",
    monthly: "https://buy.stripe.com/cNi6oA8FddAD6LQgJg83C01",
    sixMonth: "https://buy.stripe.com/dRmfZabRpgMP6LQct083C02",
    twelveMonth: "https://buy.stripe.com/cNi3co1cL68b8TYfFc83C03"
  },
  booking: {
    defaultClientId: "bb-demo-spa",
    clients: {
      "bb-demo-spa": {
        businessName: "Demo Glow Studio",
        category: "Med spa",
        heroTitle: "Book your appointment online",
        heroCopy: "Choose your service, tell us your preferred time, and we will confirm your booking with the next steps.",
        confirmationCopy: "We usually confirm bookings within business hours. You will receive follow-up based on the business rules saved for this client.",
        accentLabel: "Luxury booking flow",
        services: [
          "Consultation",
          "Facial",
          "Botox appointment",
          "Chemical peel",
          "Follow-up visit"
        ],
        businessHours: "Mon-Fri 9am-6pm, Sat 10am-4pm",
        serviceAreas: "Menlo Park, Palo Alto, Redwood City",
        contactMethod: "both",
        requireCustomerPhone: true,
        requireCustomerEmail: true,
        reminderTiming: "24 hours before",
        intakeFields: [
          { label: "Preferred date", name: "preferred_date", type: "date", required: true },
          { label: "Preferred time", name: "preferred_time", type: "select", required: true, options: ["Morning", "Midday", "Afternoon", "Evening"] },
          { label: "Treatment goals or concerns", name: "customer_notes", type: "textarea", required: false, placeholder: "Tell us anything that helps us prepare for your appointment." }
        ]
      },
      "bb-demo-barber": {
        businessName: "Northside Cuts",
        category: "Barbershop",
        heroTitle: "Book your cut in seconds",
        heroCopy: "Pick a service, choose when you want to come in, and we will handle confirmations and reminders automatically.",
        confirmationCopy: "This demo is using the same booking engine with barber-specific services and intake questions.",
        accentLabel: "Fast booking flow",
        services: [
          "Haircut",
          "Haircut and beard",
          "Beard trim",
          "Kids cut",
          "Lineup"
        ],
        businessHours: "Tue-Sat 10am-7pm",
        serviceAreas: "East Palo Alto and nearby",
        contactMethod: "text",
        requireCustomerPhone: true,
        requireCustomerEmail: false,
        reminderTiming: "2 hours before",
        intakeFields: [
          { label: "Preferred date", name: "preferred_date", type: "date", required: true },
          { label: "Preferred barber", name: "preferred_barber", type: "text", required: false, placeholder: "Optional" },
          { label: "Style notes", name: "customer_notes", type: "textarea", required: false, placeholder: "Any details for the barber?" }
        ]
      },
      "bb-demo-detail": {
        businessName: "Gloss Boss Detail",
        category: "Auto detailing",
        heroTitle: "Request your detail appointment",
        heroCopy: "Customers can submit their vehicle details, preferred timing, and service request from one clean form.",
        confirmationCopy: "The business gets the booking request and the customer receives follow-up automatically.",
        accentLabel: "Mobile service booking",
        services: [
          "Interior detail",
          "Exterior wash and wax",
          "Full detail",
          "Paint correction",
          "Ceramic coating consult"
        ],
        businessHours: "Mon-Sat 8am-6pm",
        serviceAreas: "San Mateo County",
        contactMethod: "email",
        requireCustomerPhone: true,
        requireCustomerEmail: true,
        reminderTiming: "the evening before",
        intakeFields: [
          { label: "Preferred date", name: "preferred_date", type: "date", required: true },
          { label: "Vehicle type", name: "vehicle_type", type: "text", required: true, placeholder: "Sedan, SUV, truck, etc." },
          { label: "Address or service location", name: "service_location", type: "text", required: true, placeholder: "Where should the detail happen?" },
          { label: "Vehicle notes", name: "customer_notes", type: "textarea", required: false, placeholder: "Optional notes about the vehicle or job." }
        ]
      }
    }
  }
};
