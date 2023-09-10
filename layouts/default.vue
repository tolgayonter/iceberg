<template>
  <v-app>
    <!-- TODO: Figure out this ssr, vuetify relation. -->
    <v-no-ssr>
      <v-navigation-drawer class="bg-deep-purple" floating permanent>
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
    </v-no-ssr>
  </v-app>
</template>
