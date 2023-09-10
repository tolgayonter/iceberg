export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const query = getQuery(event);
  return $fetch(`${config.public.apiBase}/Appointments`, {
    method: "DELETE",
    query: query,
    headers: {
      Authorization: `Bearer ${config.apiSecret}`,
    },
  });
});
