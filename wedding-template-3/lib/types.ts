export interface RSVPFormData {
  name: string;
  email: string;
  attending: "yes" | "no";
  guests: "1" | "2" | "3" | "4";
  meal: "meat" | "fish" | "vegetarian";
  song: string;
  message: string;
}

export type FormStatus = "idle" | "submitting" | "success" | "error";

export interface CountdownTime {
  days: string;
  hours: string;
  mins: string;
  secs: string;
}
