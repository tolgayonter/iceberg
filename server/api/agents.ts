export default defineEventHandler((event) => {
  const config = useRuntimeConfig();
  return $fetch(`${config.public.apiBase}/Agents`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${config.apiSecret}`,
    },
  });
});
