<script setup lang="ts">
import { useAppointmentStore } from "~/stores/appointmentStore";

const store = useAppointmentStore();

const { create: createContact } = useContact();
const { create: createAppointment } = useAppointment();

const handleCreate = async () => {
  try {
    const contactIds: string[] = [];

    // Assuming that the contact_name, contact_surname, etc. arrays have the same length.
    for (let i = 0; i < store.contact_name.length; i++) {
      const contactId = await createContact({
        contact_name: store.contact_name[i] as string,
        contact_surname: store.contact_surname[i] as string,
        contact_email: store.contact_email[i] as string,
        contact_phone: store.contact_phone[i] as string,
      });
      contactIds.push(contactId);
    }

    await createAppointment({
      appointment_date: store.appointment_date,
      appointment_postcode: store.appointment_postcode,
      contact_id: contactIds,
      agent_id: store.agent_id,
    });

    store.reset();
  } catch (error: any) {
    // Optionally, reset the form or navigate to a different page or show a success message
    // Display the error to the user using a notification system or a dialog.
    console.error(error.message);
  }
};
</script>

<template>
  <div>
    <v-app-bar title="Create New Appointment"></v-app-bar>
    <AppointmentForm :handle-submit="handleCreate" />
  </div>
</template>
