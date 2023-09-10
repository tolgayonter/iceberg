<template>
  <v-app>
    <!-- TODO: Figure out this ssr, vuetify relation. -->
    <v-no-ssr>
      <v-navigation-drawer
        class="bg-blue-grey-darken-4"
        expand-on-hover
        rail
        permanent
      >
        <v-list>
          <v-list-item
            prepend-avatar="https://randomuser.me/api/portraits/men/42.jpg"
            title="Admin"
          ></v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list nav density="compact">
          <v-list-item
            prepend-icon="mdi-view-dashboard"
            title="Home"
            subtitle="This is your Dashboard"
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
