<script setup lang="ts">
import { useAppointmentStore } from "~/stores/appointmentStore";

const store = useAppointmentStore();
</script>

<template>
  <div>
    <v-table>
      <tbody>
        <tr
          v-for="(item, index) in store.contact_name"
          :key="`contact-${index}`"
        >
          <td>{{ store.contact_name[index] }}</td>
          <td>{{ store.contact_surname[index] }}</td>
          <td>{{ store.contact_email[index] }}</td>
          <td>{{ store.contact_phone[index] }}</td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>
