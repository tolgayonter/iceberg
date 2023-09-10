<script setup lang="ts">
import { ref, computed } from "vue";
import { useAppointmentStore } from "~/stores/appointmentStore";
import { useMapStore } from "~/stores/mapStore";

const store = useAppointmentStore();
const mapStore = useMapStore();

const TRAVEL_SPEED = 50; // km/h

const computeTravelTime = computed(() => {
  return mapStore.distance / TRAVEL_SPEED;
});

const computeLeaveTime = () => {
  const appointmentTime = new Date(store.appointment_date).getTime();
  return new Date(
    appointmentTime - computeTravelTime.value * 60 * 60 * 1000
  ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const computeReturnTime = () => {
  const appointmentTime = new Date(store.appointment_date).getTime();
  return new Date(
    appointmentTime + (1 + computeTravelTime.value) * 60 * 60 * 1000
  ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};
</script>

<template>
  <div>
    <v-card elevation="-1" height="53vh">
      <v-card-title>Schedule Your Appointment</v-card-title>

      <!-- Date Picker Section -->
      <v-card-subtitle>Choose Your Appointment Date</v-card-subtitle>
      <v-card-text>
        <vue-datepicker
          v-model="store.appointment_date"
          class="mb-2"
        ></vue-datepicker>
      </v-card-text>

      <!-- Address Picker Guidance -->
      <v-card-text class="guidance-text">
        <v-text-field disabled>{{
          store.appointment_postcode || "Location not specified"
        }}</v-text-field>
      </v-card-text>

      <v-card-text v-if="!store.appointment_postcode" class="guidance-message">
        <v-icon small color="warning">mdi-alert-circle-outline</v-icon>
        Please select a location by clicking on the map. Ensure that the
        location you pick has an associated postcode and is within England.
      </v-card-text>

      <!-- Departure and Return Times -->
      <v-card-text
        v-if="
          mapStore.distance &&
          store.appointment_date &&
          store.appointment_postcode
        "
        class="travel-times"
      >
        <div class="travel-speed">
          <v-icon color="info">mdi-speedometer</v-icon>
          Based on a travel speed of <strong>50 km/h</strong>:
        </div>
        <ul class="time-list">
          <li>
            <v-icon color="success">mdi-clock-time-four-outline</v-icon>
            Leave by: <strong>{{ computeLeaveTime() }}</strong>
          </li>
          <li>
            <v-icon color="success">mdi-clock-alert-outline</v-icon>
            Return by: <strong>{{ computeReturnTime() }}</strong>
          </li>
        </ul>
      </v-card-text>
    </v-card>
  </div>
</template>

<style lang="scss">
.guidance-text,
.guidance-message {
  display: flex;
  align-items: center;
  gap: 12px;

  & > v-text-field {
    flex-grow: 1;
  }
}

.guidance-message {
  gap: 8px;
  font-style: italic;
}

.travel-times {
  .travel-speed {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 12px;
  }

  .time-list {
    display: flex;
    flex-direction: column;
    gap: 8px;

    li {
      display: flex;
      align-items: center;
      gap: 10px;
    }
  }
}
</style>
