<script setup lang="ts">
import { Record } from "~/types/Record";
import { Agent } from "~/types/Agent";
import { Appointment } from "~/types/Appointment";
import { Contact } from "~/types/Contact";
import { useAppointmentStore } from "~/stores/appointmentStore";

const store = useAppointmentStore();

const appointmentPostcode = computed(() => store.formattedPostcode);

const appointmentDate = ref();
const contactName = ref();
const contactSurname = ref();
const contactEmail = ref();
const contactPhone = ref();
const agent = ref();

const rules = [
  (value: string) => {
    if (value) return true;
    return "You must enter a value.";
  },
];

const getAgentsResponse = useFetch<{ records: Record<Agent>[] }>("/api/agents");

const onSubmit = async () => {
  // TODO: do not create a contact, if create appointment fails.
  //  but how?
  const createContactResponse = await useFetch<Record<Contact>>(
    "/api/contacts",
    {
      method: "POST",
      body: {
        fields: {
          contact_name: contactName,
          contact_surname: contactSurname,
          contact_email: contactEmail,
          contact_phone: contactPhone,
          // Appointments: [],
        },
      },
    }
  );

  useFetch<Record<Appointment>>("/api/appointments", {
    method: "POST",
    body: {
      fields: {
        appointment_date: appointmentDate,
        appointment_postcode: appointmentPostcode,
        contact_id: [createContactResponse.data.value?.id],
        agent_id: [agent.value],
      },
    },
  });

  reset();
};

const form = ref();

const validate = async () => {
  const { valid } = await form.value.validate();
  if (valid) alert("Form is valid.");
};

const reset = () => {
  form.value.reset();
  appointmentDate.value = ""; // FIXME: Date's manual resetting is not great.
};

const resetValidation = () => {
  form.value.resetValidation();
};
</script>

<template>
  <v-sheet width="500" class="text-center mx-auto">
    <h1>Create New Appointment</h1>
    <v-form ref="form" @submit.prevent="onSubmit">
      <v-text-field
        v-model="appointmentPostcode"
        :rules="rules"
        label="Appointment Postcode"
        disabled
      ></v-text-field>
      <vue-datepicker
        v-model="appointmentDate"
        label="Appointment Date"
        class="mb-5"
      ></vue-datepicker>
      <v-text-field
        v-model="contactName"
        :rules="rules"
        label="Contact Name"
      ></v-text-field>
      <v-text-field
        v-model="contactSurname"
        :rules="rules"
        label="Contact Surname"
      ></v-text-field>
      <v-text-field
        v-model="contactEmail"
        :rules="rules"
        label="Contact Email"
      ></v-text-field>
      <v-text-field
        v-model="contactPhone"
        :rules="rules"
        label="Contact Phone"
      ></v-text-field>

      <v-select
        v-model="agent"
        :items="getAgentsResponse.data.value?.records"
        :item-title="`fields.agent_name`"
        :item-value="`id`"
        label="Agent"
      >
      </v-select>

      <v-btn type="submit" block class="mt-2">Submit</v-btn>

      <div class="d-flex flex-column">
        <v-btn color="success" class="mt-4" block @click="validate">
          Validate
        </v-btn>
        <v-btn color="error" class="mt-4" block @click="reset">
          Reset Form
        </v-btn>
        <v-btn color="warning" class="mt-4" block @click="resetValidation">
          Reset Validation
        </v-btn>
      </div>
    </v-form>
  </v-sheet>
</template>
