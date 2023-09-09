import { defineStore } from "pinia";
import { Appointment } from "~/types/Appointment";
import { Contact } from "~/types/Contact";

const createInitialState = (): Appointment => ({
  appointment_date: "",
  appointment_postcode: "",

  contact_id: [],
  contact_name: [],
  contact_surname: [],
  contact_email: [],
  contact_phone: [],

  agent_id: [],
  agent_name: [],
  agent_surname: [],
});

// This is kind of like formStore, isn't it?
export const useAppointmentStore = defineStore({
  id: "appointment",
  state: () => createInitialState(),
  actions: {
    setPostcode(newPostcode: string) {
      this.appointment_postcode = newPostcode;
    },
    setAppointment(newAppointment: Appointment) {
      this.$state = newAppointment;
    },
    addContact(newContact: Contact) {
      this.contact_name.push(newContact.contact_name);
      this.contact_surname.push(newContact.contact_surname);
      this.contact_email.push(newContact.contact_email);
      this.contact_phone.push(newContact.contact_phone);
    },
    reset() {
      this.$state = createInitialState();
    },
  },
});
