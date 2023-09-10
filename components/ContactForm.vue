<script setup lang="ts">
import { useField, useForm } from "vee-validate";
import { useAppointmentStore } from "~/stores/appointmentStore";

const store = useAppointmentStore();

const { handleSubmit, handleReset } = useForm({
  validationSchema: {
    name(value: string) {
      if (value?.length >= 1) return true;
      return "Name needs to be at least 1 character.";
    },
    surname(value: string) {
      if (value?.length >= 1) return true;
      return "Surname needs to be at least 1 character.";
    },
    email(value: string) {
      if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true;
      return "Must be a valid e-mail.";
    },
    phone(value: string) {
      if (value?.length > 9 && /[0-9-]+/.test(value)) return true;
      return "Phone number needs to be at least 10 digits.";
    },
  },
});

const name = useField("name");
const surname = useField("surname");
const email = useField("email");
const phone = useField("phone");

const submit = handleSubmit((values) => {
  store.addContact({
    contact_name: values.name,
    contact_surname: values.surname,
    contact_email: values.email,
    contact_phone: values.phone,
  });
  handleReset();
});
</script>

<template>
  <v-card class="contact-card">
    <v-card-title class="mb-5">Add Contact(s)</v-card-title>
    <v-card-text>
      <form @submit.prevent="submit">
        <v-row class="text-fields-row">
          <v-col class="field-col" cols="3">
            <v-text-field
              v-model="name.value.value"
              label="Name"
              counter
              :error-messages="name.errorMessage.value"
            ></v-text-field>
          </v-col>
          <v-col class="field-col" cols="3">
            <v-text-field
              v-model="surname.value.value"
              label="Surname"
              counter
              :error-messages="surname.errorMessage.value"
            ></v-text-field>
          </v-col>
          <v-col class="field-col" cols="3">
            <v-text-field
              v-model="email.value.value"
              label="Email"
              :error-messages="email.errorMessage.value"
            ></v-text-field>
          </v-col>
          <v-col class="field-col" cols="3">
            <v-text-field
              v-model="phone.value.value"
              label="Phone"
              :counter="10"
              :error-messages="phone.errorMessage.value"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row justify="end" class="action-buttons">
          <v-btn type="submit" class="bg-green">
            <v-icon left>mdi-plus</v-icon>
            Add
          </v-btn>
          <v-btn class="me-4" @click="handleReset">
            <v-icon left>mdi-delete</v-icon>
            Clear
          </v-btn>
        </v-row>
      </form>

      <ContactTable />
    </v-card-text>
  </v-card>
</template>

<style scoped>
.contact-card {
  padding: 20px;
}

.field-col {
  padding: 0;
}

.action-buttons {
  gap: 20px;
}
</style>
