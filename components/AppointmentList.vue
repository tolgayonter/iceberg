<script setup lang="ts">
import { Record } from "~/types/Record";
import { Appointment } from "~/types/Appointment";
import { formatDate, formatPostcode } from "~/utils/dataFormatter";

const { data, pending } = useFetch<{ records: Record<Appointment>[] }>(
  "/api/appointments"
);

const items = ref<any[]>([]);

watchEffect(() => {
  if (!data.value?.records) return [];

  items.value = data.value.records.map((r) => {
    if (!r.fields) return [];

    const date = r.fields.appointment_date || "";
    const postcode = r.fields.appointment_postcode
      ? formatPostcode(r.fields.appointment_postcode)
      : "";

    const agents = (r.fields.agent_name || []).map((name, index) => {
      const surname = r.fields?.agent_surname[index] || "";
      return `${name} ${surname}`.trim();
    });

    const contacts = (r.fields.contact_name || []).map((name, index) => {
      const surname = r.fields?.contact_surname[index] || "";
      const email = r.fields?.contact_email[index] || "";
      const phone = r.fields?.contact_phone[index] || "";
      return `${name} ${surname} ${email} ${phone}`.trim();
    });

    return {
      id: r.id,
      date,
      postcode,
      agents,
      contacts,
    };
  });
});

const headers = ref([
  { title: "Date", align: "start", key: "date" },
  { title: "Postcode", align: "start", key: "postcode" },
  { title: "Agent(s)", align: "start", key: "agents", sortable: false },
  { title: "Contact(s)", align: "start", key: "contacts", sortable: false },
  { title: "Actions", key: "id", sortable: false },
]);
const search = ref("");
const filterKeys = ["agents"];
const sortBy = [{ key: "date", order: "desc" }];

// edit item
const router = useRouter();
const editItem = (id: string) => {
  router.push(`/edit-appointment/${id}`);
};

// delete item
const { delete_: deleteAppointment } = useAppointment();
const deleteItem = async (id: string, index: number) => {
  await deleteAppointment(id);
  items.value.splice(index, 1);
};
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

      <!-- @vue-ignore -->
      <v-data-table-virtual
        :headers="headers"
        :items="items"
        :search="search"
        :filter-keys="filterKeys"
        :loading="pending"
        :sort-by="sortBy"
      >
        <!-- date -->
        <template #item.date="{ item }">
          <span v-if="item.columns.date">{{
            formatDate(item.columns.date)
          }}</span>
        </template>

        <!-- agents -->
        <template #item.agents="{ item }">
          <p v-for="agent in item.columns.agents">
            <span v-if="agent">{{ agent }}</span>
          </p>
        </template>

        <!-- contacts -->
        <template #item.contacts="{ item }">
          <p v-for="contact in item.columns.contacts">
            <span v-if="contact">{{ contact }}</span>
          </p>
        </template>

        <!-- actions -->
        <template #item.id="{ item, index }">
          <v-icon
            v-if="item.columns.id"
            size="small"
            class="me-2"
            @click="editItem(item.columns.id)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            v-if="item.columns.id"
            size="small"
            @click="deleteItem(item.columns.id, index)"
          >
            mdi-delete
          </v-icon>
        </template>
      </v-data-table-virtual>
    </v-card>
  </div>
</template>
