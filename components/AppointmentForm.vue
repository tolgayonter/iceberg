<script setup lang="ts">
import { Record } from "~/types/Record";
import { Agent } from "~/types/Agent";
import { useAppointmentStore } from "~/stores/appointmentStore";

const store = useAppointmentStore();

defineProps({
  handleSubmit: {
    type: Function,
    required: true,
  },
});

const { data: agentsData } = useFetch<{ records: Record<Agent>[] }>(
  "/api/agents"
);

onUnmounted(() => {
  store.reset();
});
</script>

<template>
  <div>
    <v-container fluid class="form-container pa-0 mt-5">
      <!-- @vue-ignore -->
      <v-form @submit.prevent="handleSubmit">
        <v-row>
          <v-col cols="12" md="4">
            <DateAddressPicker />

            <v-select
              v-model="store.agent_id"
              :items="agentsData?.records"
              :item-title="`fields.agent_name`"
              :item-value="`id`"
              label="Select Agent(s)"
              multiple
              class="mt-5"
            ></v-select>
          </v-col>

          <v-col cols="12" md="8">
            <AppointmentMap />
          </v-col>
        </v-row>

        <ContactForm class="mt-5" />

        <v-row class="fixed-submit">
          <v-col class="text-center">
            <v-btn type="submit" class="bg-green">Submit</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-container>
  </div>
</template>

<style lang="scss" scoped>
.form-container {
  height: 100%;
  width: 95%;
  margin-bottom: $footerHeight;
}

.fixed-submit {
  position: fixed;
  bottom: 0;
  right: 0;
  left: $drawerWidth;
  height: $footerHeight;
  align-items: center;
  background-color: #fff; /* adjust to match your design */
  box-shadow: 0px -2px 5px rgba(0, 0, 0, 0.1); /* subtle shadow for depth */
}
</style>
