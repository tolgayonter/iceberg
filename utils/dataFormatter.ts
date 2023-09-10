// These tasks are simple rn, but in future they might get complex.
// So for this, we decoupled the logic in here.

export const formatDate = (dateString: string) => {
  const dateOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  return new Date(dateString).toLocaleDateString("en-GB", dateOptions);
};

export const formatPostcode = (postcode: string) => {
  return postcode.trim().replace(/\s+/g, "").toLowerCase();
};
