<script setup lang="ts">
import { Record } from "~/types/Record";
import { Agent } from "~/types/Agent";
import { useAppointmentStore } from "~/stores/appointmentStore";

const store = useAppointmentStore();

const rules = [
  (value: string) => {
    if (value) return true;
    return "You must enter a value.";
  },
];

// turn into composable
const { data: agentsData } = useFetch<{ records: Record<Agent>[] }>(
  "/api/agents"
);

const props = defineProps({
  handleSubmit: {
    type: Function,
    required: true,
  },
});

onUnmounted(() => {
  store.reset();
});
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="5">
        <v-sheet class="text-center">
          <slot name="header">
            <h1>Create New Appointment</h1>
          </slot>

          <!-- FIXME: Fix the type error on @submit -->
          <v-form @submit.prevent="handleSubmit">
            <v-text-field
              v-model="store.appointment_postcode"
              :rules="rules"
              label="Appointment Postcode"
              disabled
            ></v-text-field>
            <vue-datepicker
              v-model="store.appointment_date"
              label="Appointment Date"
              class="mb-5"
            ></vue-datepicker>

            <ContactForm />

            <v-select
              v-model="store.agent_id"
              :items="agentsData?.records"
              :item-title="`fields.agent_name`"
              :item-value="`id`"
              label="Agent"
              multiple
            >
            </v-select>

            <v-btn type="submit" block class="mt-2">Submit</v-btn>
          </v-form>
        </v-sheet>
      </v-col>
      <v-col>
        <h1>Store Data</h1>
        <pre>{{ store }}</pre>
      </v-col>
    </v-row>
  </v-container>
</template>
