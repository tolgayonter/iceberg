export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const id = getRouterParam(event, "id");
  const body = await readBody(event);
  return $fetch(`${config.public.apiBase}/Appointments/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${config.apiSecret}`,
    },
    body: body,
  });
});
