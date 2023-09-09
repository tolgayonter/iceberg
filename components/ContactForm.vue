<script setup lang="ts">
import { useAppointmentStore } from "~/stores/appointmentStore";

const store = useAppointmentStore();

const name = ref();
const surname = ref();
const email = ref();
const phone = ref();

const handleSubmit = () => {
  store.addContact({
    contact_name: name.value,
    contact_surname: surname.value,
    contact_email: email.value,
    contact_phone: phone.value,
  });

  handleReset();
};
const handleReset = () => {
  name.value = "";
  surname.value = "";
  email.value = "";
  phone.value = "";
};
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <v-text-field v-model="name" label="Name"></v-text-field>
    <v-text-field v-model="surname" label="Surname"></v-text-field>
    <v-text-field v-model="email" label="Email"></v-text-field>
    <v-text-field v-model="phone" label="Phone"></v-text-field>
    <v-btn class="me-4" type="submit"> Add </v-btn>
    <v-btn @click="handleReset"> Clear </v-btn>
  </form>

  <v-table>
    <thead>
      <tr>
        <th class="text-left">Name</th>
        <th class="text-left">Surname</th>
        <th class="text-left">Email</th>
        <th class="text-left">Phone</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in store.contact_name" :key="`contact-${index}`">
        <td>{{ store.contact_name[index] }}</td>
        <td>{{ store.contact_surname[index] }}</td>
        <td>{{ store.contact_email[index] }}</td>
        <td>{{ store.contact_phone[index] }}</td>
      </tr>
    </tbody>
  </v-table>
</template>
