import { defineStore } from "pinia";
import { Position } from "~/types/Position";

const BASE_POSTCODE = "cm27pj";

export const useMapStore = defineStore({
  id: "map",
  state: () => ({
    currPos: null as Position | null,
    distance: 0,
  }),
  actions: {
    async fetchPostcodeResponse() {
      if (this.currPos) return; // prevent refetching
      const { data } = await useFetch<{
        result: {
          latitude: number;
          longitude: number;
        };
      }>(`https://api.postcodes.io/postcodes/${BASE_POSTCODE}`);
      if (data.value) {
        this.currPos = {
          lat: data.value?.result.latitude,
          lng: data.value?.result.longitude,
        };
      }
    },

    calculateDistance(target: Position) {
      this.distance = this.haversineDistance(this.currPos, target);
    },

    haversineDistance(pos1: Position | null, pos2: Position | null) {
      if (!pos1 || !pos2) return 0;
      const R = 6371; // Radius of the Earth in kilometers
      const rlat1 = pos1.lat * (Math.PI / 180); // Convert degrees to radians
      const rlat2 = pos2.lat * (Math.PI / 180); // Convert degrees to radians
      const difflat = rlat2 - rlat1; // Radian difference (latitudes)
      const difflon = (pos2.lng - pos1.lng) * (Math.PI / 180); // Radian difference (longitudes)

      const d =
        2 *
        R *
        Math.asin(
          Math.sqrt(
            Math.sin(difflat / 2) * Math.sin(difflat / 2) +
              Math.cos(rlat1) *
                Math.cos(rlat2) *
                Math.sin(difflon / 2) *
                Math.sin(difflon / 2)
          )
        );
      return d;
    },

    reset() {
      this.distance = 0;
    },
  },
});
