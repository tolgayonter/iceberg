import { Record } from "~/types/Record";
import { Contact } from "~/types/Contact";

type CreateContactPayload = Pick<
  Contact,
  "contact_name" | "contact_surname" | "contact_email" | "contact_phone"
>;

export const useContact = () => {
  const create = async (contact: CreateContactPayload) => {
    const response = await useFetch<Record<Contact>>(`/api/contacts`, {
      method: "POST",
      body: {
        fields: { ...contact },
      },
    });

    if (!response.data.value?.id) {
      throw new Error("Failed to create contact");
    }

    return response.data.value.id;
  };

  return { create };
};
