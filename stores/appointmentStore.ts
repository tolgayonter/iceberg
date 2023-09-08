import { defineStore } from "pinia";

export const useAppointmentStore = defineStore({
  id: "appointment",
  state: () => ({
    postcode: "",
  }),
  getters: {
    formattedPostcode: (state) => {
      return state.postcode.trim().replace(/\s+/g, "").toLowerCase();
    },
  },
  actions: {
    setPostcode(newPostcode: string) {
      this.postcode = newPostcode;
    },
  },
});
