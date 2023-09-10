<template>
  <div>
    <v-app-bar title="Home"></v-app-bar>
    <v-container fluid>
      <h1 class="text-h4 font-weight-light mb-6">
        Welcome to the Iceberg Estates Dashboard!
      </h1>

      <!-- Main Cards -->
      <v-row class="mb-8">
        <v-col cols="12" md="4" class="d-flex">
          <v-card class="flex-fill pa-6" color="blue lighten-4" elevation="10">
            <v-card-title class="justify-center">
              <v-icon class="mx-auto" size="50" color="blue darken-2"
                >mdi-home-city</v-icon
              >
            </v-card-title>
            <v-card-text class="text-center">
              <div class="text-h6 font-weight-medium mb-2">Office Address</div>
              Iceberg Estates, Main St.<br />
              Postal Code: cm27pj
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="4" class="d-flex">
          <v-card
            class="flex-fill pa-6"
            color="blue-grey lighten-4"
            elevation="10"
          >
            <v-card-title class="justify-center">
              <v-icon class="mx-auto" size="50" color="blue-grey darken-2"
                >mdi-information-outline</v-icon
              >
            </v-card-title>
            <v-card-text class="text-center">
              <div class="text-h6 font-weight-medium mb-2">About Us</div>
              At Iceberg Estates, we believe in making real estate transactions
              seamless and trustworthy. We have been serving our community since
              2005, building a legacy of trust and excellence.
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="4" class="d-flex">
          <v-card
            class="flex-fill pa-6"
            color="purple lighten-4"
            elevation="10"
          >
            <v-card-title class="justify-center">
              <v-icon class="mx-auto" size="50" color="purple darken-2"
                >mdi-phone-in-talk</v-icon
              >
            </v-card-title>
            <v-card-text class="text-center">
              <div class="text-h6 font-weight-medium mb-2">Contact Us</div>
              Email: info@icebergestates.com<br />
              Phone: (123) 456-7890
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-divider class="mb-8"></v-divider>

      <!-- Quick Tips Section -->
      <v-row class="mt-6">
        <v-col cols="12">
          <h2 class="text-h4 font-weight-light mb-4">Quick Tips</h2>
          <v-timeline dense>
            <v-timeline-item icon="mdi-calendar-clock" color="blue">
              <div class="text-h6 font-weight-medium mb-2">Plan Ahead</div>
              Ensure you always check the appointment details before heading
              out.
            </v-timeline-item>

            <v-timeline-item icon="mdi-map-check" color="green">
              <div class="text-h6 font-weight-medium mb-2">
                Use Maps Efficiently
              </div>
              Use the integrated map feature to quickly find client locations.
            </v-timeline-item>

            <v-timeline-item icon="mdi-account-search" color="orange">
              <div class="text-h6 font-weight-medium mb-2">Verify Details</div>
              Always verify client contact details before the meeting.
            </v-timeline-item>
          </v-timeline>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
