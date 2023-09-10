<script setup lang="ts">
import { Record } from "~/types/Record";
import { Appointment } from "~/types/Appointment";
import { useAppointmentStore } from "~/stores/appointmentStore";

const route = useRoute();
const router = useRouter();

const { data } = await useFetch<Record<Appointment>>(
  `/api/appointments/${route.params.id}`
);

const store = useAppointmentStore();

store.setAppointment(data.value?.fields as Appointment);

const { create: createContact } = useContact();
const { edit: editAppointment } = useAppointment();

// TODO: Right now it only adds just the new Contacts.
const handleEdit = async () => {
  try {
    const contactIds: string[] = [];

    for (let i = 0; i < store.contact_name.length; i++) {
      if (!store.contact_id[i]) {
        const contactId = await createContact({
          contact_name: store.contact_name[i] as string,
          contact_surname: store.contact_surname[i] as string,
          contact_email: store.contact_email[i] as string,
          contact_phone: store.contact_phone[i] as string,
        });
        contactIds.push(contactId);
      }
    }

    // FIXME: Get rid of `as string`.
    await editAppointment(route.params.id as string, {
      appointment_date: store.appointment_date,
      appointment_postcode: store.appointment_postcode,
      contact_id: [...store.contact_id, ...contactIds], // Is this OK?
      agent_id: store.agent_id,
    });

    router.push("/appointments");
  } catch (error: any) {
    console.error(error.message);
  }
};
</script>

<template>
  <div>
    <v-app-bar :title="`Edit Appointment: ${route.params.id}`"></v-app-bar>
    <AppointmentForm :handle-submit="handleEdit" />
  </div>
</template>
