import * as z from "zod";

export const DockSchema = z.object({
  name: z.string().min(1, { message: "Dock is required" }),
  lat: z.number(),
  lng: z.number(),
});
