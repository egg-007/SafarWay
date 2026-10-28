import { Schema, model } from "mongoose";
import { z } from "zod";

export interface ICoach {
  registration: string;
  seatNumbers: number[];
  isArchived: boolean;
}

const coachSchema = new Schema<ICoach>(
  {
    registration: { type: String, required: true, unique: true, trim: true },
    seatNumbers: { type: [Number], required: true },
    isArchived: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const CoachModel = model<ICoach>("Coach", coachSchema);

export const createCoachSchema = z.object({
  registration: z.string().trim().min(1, "Immatriculation requise"),
  seatNumbers: z.array(z.number().int().positive()).min(1, "Au moins un siège"),
});

export const updateCoachSchema = z.object({
  registration: z.string().trim().min(1).optional(),
  seatNumbers: z.array(z.number().int().positive()).min(1).optional(),
});