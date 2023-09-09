<script setup lang="ts">
import { Loader } from "@googlemaps/js-api-loader";
import { useAppointmentStore } from "~/stores/appointmentStore";

const getPostcodeResponse = await useFetch<{
  result: { latitude: number; longitude: number };
}>("https://api.postcodes.io/postcodes/cm27pj");

// FIXME: Better structure this? LatLngLiteral?
const currPos = computed(() => ({
  lat: getPostcodeResponse.data.value?.result.latitude,
  lng: getPostcodeResponse.data.value?.result.longitude,
}));

const otherPos = ref(null);

const store = useAppointmentStore();

watch(otherPos, async (v) => {
  if (v) {
    const { data } = await useFetch<{
      result: { postcode: string }[];
    }>(
      `https://api.postcodes.io/postcodes?lon=${v.lng.toFixed(
        2
      )}&lat=${v.lat.toFixed(2)}`
    );

    store.setPostcode(
      data.value?.result
        ? data.value.result[0].postcode.trim().replace(/\s+/g, "").toLowerCase()
        : ""
    );
  }
});

let map = ref<google.maps.Map>();
const loader = new Loader({ apiKey: useRuntimeConfig().public.mapsApiSecret });
const mapDiv = ref<HTMLElement>();
let clickListener = null;
onMounted(async () => {
  await loader.load();
  const { Map } = (await google.maps.importLibrary(
    "maps"
  )) as google.maps.MapsLibrary;
  map.value = new Map(mapDiv.value as HTMLElement, {
    center: currPos.value,
    zoom: 8,
  });
  clickListener = map.value.addListener(
    "click",
    ({ latLng: { lat, lng } }) => (otherPos.value = { lat: lat(), lng: lng() })
  );
});

onUnmounted(async () => {
  if (clickListener) clickListener.remove();
});

let line = null;
watch([map, currPos, otherPos], () => {
  if (line) line.setMap(null);
  if (map.value && otherPos.value != null) {
    line = new google.maps.Polyline({
      path: [currPos.value, otherPos.value],
      map: map.value,
    });
  }
});

const haversineDistance = (pos1, pos2) => {
  const R = 3958.8; // Radius of the Earth in miles
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
};

const distance = computed(() =>
  otherPos.value === null ? 0 : haversineDistance(currPos.value, otherPos.value)
);
</script>

<template>
  <div class="text-center mx-auto">
    <h4>Your Position</h4>
    Latitude: {{ currPos.lat.toFixed(2) }}, Longitude:
    {{ currPos.lng.toFixed(2) }}
    <h4>Clicked Position</h4>
    <span v-if="otherPos"
      >Latitude: {{ otherPos.lat.toFixed(2) }}, Longitude:
      {{ otherPos.lng.toFixed(2) }}</span
    >
    <span v-else>Click the map to select position.</span>
    <h4>Distance</h4>
    {{ distance.toFixed(2) }} miles
    <h4>Nearest Postcode</h4>
    {{ store.appointment_postcode || "nope" }}
    <div ref="mapDiv" style="width: 100%; height: 80vh" />
  </div>
</template>
