<script setup lang="ts">
import { Loader } from "@googlemaps/js-api-loader";
import { useAppointmentStore } from "~/stores/appointmentStore";
import { useMapStore } from "~/stores/mapStore";
import { Position } from "~/types/Position";

const store = useAppointmentStore();
const mapStore = useMapStore();

await mapStore.fetchPostcodeResponse();

const target = ref<Position | null>(null);

watchEffect(async () => {
  if (target.value) {
    const { data } = await useFetch<{
      result: { postcode: string }[];
    }>(
      `https://api.postcodes.io/postcodes?lon=${target.value.lng.toFixed(
        2
      )}&lat=${target.value.lat.toFixed(2)}`
    );
    store.setPostcode(
      data.value?.result ? formatPostcode(data.value.result[0].postcode) : ""
    );
  }
});

let map = ref<google.maps.Map>();
const loader = new Loader({ apiKey: useRuntimeConfig().public.mapsApiSecret });
const mapDiv = ref<HTMLElement>();
let clickListener: any = null;
onMounted(async () => {
  await loader.load();
  const { Map } = (await google.maps.importLibrary(
    "maps"
  )) as google.maps.MapsLibrary;
  map.value = new Map(mapDiv.value as HTMLElement, {
    center: mapStore.currPos,
    zoom: 8,
  });
  clickListener = map.value.addListener(
    "click",
    ({ latLng: { lat, lng } }: { latLng: { lat: any; lng: any } }) =>
      (target.value = { lat: lat(), lng: lng() })
  );
});

onUnmounted(async () => {
  if (clickListener) clickListener.remove();
  mapStore.reset();
});

let line: any = null;
watchEffect(() => {
  if (line) line.setMap(null);
  if (map.value && target.value && mapStore.currPos !== null) {
    line = new google.maps.Polyline({
      path: [mapStore.currPos, target.value],
      map: map.value,
    });
  }
});

watchEffect(() => {
  if (store.appointment_postcode && mapStore.currPos && target.value) {
    mapStore.calculateDistance(target.value);
  }
});
</script>

<template>
  <div class="text-center mx-auto">
    <div ref="mapDiv" style="width: 100%; height: 61vh" />
  </div>
</template>
