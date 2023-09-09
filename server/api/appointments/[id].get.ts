import { defineEventHandler } from "#imports";

export default defineEventHandler((event) => {
  const config = useRuntimeConfig();
  const id = getRouterParam(event, "id");

  return $fetch(`${config.public.apiBase}/Appointments/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${config.apiSecret}`,
    },
  });
});
