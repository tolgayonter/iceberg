export default defineEventHandler((event) => {
  const config = useRuntimeConfig();
  return $fetch(`${config.public.apiBase}/Appointments`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${config.apiSecret}`,
    },
  });
});
