<script setup lang="ts">
// import { Appointment } from "@/types/Appointment"; // FIXME: what's wrong with this? It suddenly stopped working.
import { Record } from "~/types/Record";
import { Appointment } from "~/types/Appointment";

type Response = {
  records: Record<Appointment>[];
};

const { data, pending, error } = useFetch<Response>("/api/appointments");

const headers = ref([
  {
    title: "Appointment Id",
    align: "start",
    sortable: false,
    key: "appointment_id",
  },
  { title: "Appointment Date", align: "end", key: "appointment_date" },
  { title: "Appointment Postcode", align: "end", key: "appointment_postcode" },
  { title: "Agent Id", align: "end", key: "agent_id" },
  { title: "Agent Name", align: "end", key: "agent_name" },
  { title: "Agent Surname", align: "end", key: "agent_surname" },
  { title: "Contact Id", align: "end", key: "contact_id" },
  { title: "Contact Name", align: "end", key: "contact_name" },
  { title: "Contact Surname", align: "end", key: "contact_surname" },
  { title: "Contact Email", align: "end", key: "contact_email" },
  { title: "Contact Phone", align: "end", key: "contact_phone" },
]);

const search = ref("");
const filterKeys = ["agent_name", "agent_surname"];
</script>

<template>
  <div>
    <v-card>
      <v-card-title>
        Appointments
        <v-spacer />
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        />
      </v-card-title>
      <v-data-table-virtual
        :headers="headers"
        :items="data?.records.map((r) => r.fields)"
        :search="search"
        :filter-keys="filterKeys"
        item-value="name"
        class="elevation-1"
      />
    </v-card>
  </div>
</template>
