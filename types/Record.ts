// TODO: Can I live without Records?
// export type Records<T> = {
//   records: Record<T>;
// };

// TODO: Mention that,
// T could be Appointment, Agent, or Contact.

export type Record<T> = {
  id?: string;
  createdTime?: string;
  deleted?: boolean;
  fields?: T;
};
