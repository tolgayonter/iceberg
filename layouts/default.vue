<template>
  <div>
    <v-layout>
      <v-navigation-drawer floating permanent>
        <v-list nav>
          <v-list-item
            prepend-icon="mdi-view-dashboard"
            title="Home"
            value="home"
            to="/"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-view-list"
            title="Appointments"
            value="appointments"
            to="/appointments"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-shape-rectangle-plus"
            title="Create Appointment"
            value="createAppointment"
            to="/create-appointment"
          ></v-list-item>
        </v-list>
      </v-navigation-drawer>

      <!-- TODO: Is there a way to lazy-load slot? -->
      <v-main>
        <slot />
      </v-main>
    </v-layout>
  </div>
</template>
