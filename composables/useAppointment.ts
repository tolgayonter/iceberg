import { Record } from "~/types/Record";
import { Appointment } from "~/types/Appointment";

type AppointmentPayload = Pick<
  Appointment,
  "appointment_date" | "appointment_postcode"
> & {
  contact_id: string[];
  agent_id: string[];
};

export const useAppointment = () => {
  const create = async (appointment: AppointmentPayload) => {
    await useFetch<Record<Appointment>>("/api/appointments", {
      method: "POST",
      body: {
        fields: { ...appointment },
      },
    });
  };

  const edit = async (id: string, appointment: AppointmentPayload) => {
    await useFetch<Record<Appointment>>(`/api/appointments/${id}`, {
      method: "PUT",
      body: {
        fields: { ...appointment },
      },
    });
  };

  return { create, edit };
};
