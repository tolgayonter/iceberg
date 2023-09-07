export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event);
  return $fetch(`${config.public.apiBase}/Appointments`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiSecret}`,
    },
    body: body,
  });
});
