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

    const status = new Date(date) > new Date();

    return {
      id: r.id,
      date,
      postcode,
      agents,
      contacts,
      status,
    };
  });
});

const headers = ref([
  { title: "Status", align: "center", key: "status" },
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
    <v-container class="table-container pa-0 mt-5">
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search by Agent"
        single-line
        hide-details
      />

      <!-- @vue-ignore -->
      <v-data-table-virtual
        :headers="headers"
        :items="items"
        :search="search"
        :filter-keys="filterKeys"
        :loading="pending"
        :sort-by="sortBy"
      >
        <!-- status -->
        <template #item.status="{ item }">
          <v-icon v-if="item.columns.status" color="green" title="Active"
            >mdi-record-circle</v-icon
          >
          <v-icon v-else color="red" title="Inactive">mdi-power-off</v-icon>
        </template>

        <!-- date -->
        <template #item.date="{ item }">
          <span v-if="item.columns.date">{{
            formatDate(item.columns.date)
          }}</span>
        </template>

        <!-- agents -->
        <template #item.agents="{ item }">
          <div v-for="agent in item.columns.agents" class="agent-wrapper">
            <v-icon small color="blue-grey-darken-4" class="mr-1"
              >mdi-account</v-icon
            >
            <span v-if="agent" class="agent-name">{{ agent }}</span>
          </div>
        </template>

        <!-- contacts -->
        <template #item.contacts="{ item }">
          <div v-for="contact in item.columns.contacts" class="contact-wrapper">
            <div v-if="contact">
              <div class="contact-name">
                <v-icon small color="blue-grey-darken-4" class="mr-1"
                  >mdi-account</v-icon
                >
                {{ contact.split(" ")[0] }} {{ contact.split(" ")[1] }}
              </div>
              <div class="contact-details">
                <v-icon small color="gray" class="mr-1">mdi-email</v-icon>
                {{ contact.split(" ")[2] }}
                <v-icon small color="gray" class="ml-2 mr-1">mdi-phone</v-icon>
                {{ contact.split(" ")[3] }}
              </div>
            </div>
          </div>
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
    </v-container>
  </div>
</template>

<style lang="scss">
.table-container {
  width: 95%;
}

.agent-wrapper,
.contact-wrapper {
  margin-bottom: 8px;
}

.agent-name {
  font-weight: 600;
  font-size: 0.9em;
}

.contact-name {
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 0.9em;
  margin-bottom: 4px;
}

.contact-details {
  display: flex;
  align-items: center;
  font-size: 0.8em;
  color: gray;
}

v-icon {
  vertical-align: middle;
}
</style>
