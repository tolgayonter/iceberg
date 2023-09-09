export type Appointment = {
  appointment_id?: number;
  appointment_date: string; // ISO 8601 formatted date
  appointment_postcode: string;
  contact_id: string[];
  contact_name: (number | string | boolean | object)[];
  agent_id: string[];
  agent_name: (number | string | boolean | object)[];
  agent_surname: (number | string | boolean | object)[];
  contact_surname: (number | string | boolean | object)[];
  contact_email: (number | string | boolean | object)[];
  contact_phone: (number | string | boolean | object)[];
};
