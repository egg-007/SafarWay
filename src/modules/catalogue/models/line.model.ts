import { Schema, model, Types } from "mongoose";
import { z } from "zod";

export interface ILine {
  code: string;
  label: string;
  stopIds: Types.ObjectId[];
  isArchived: boolean;
}

const lineSchema = new Schema<ILine>(
  {
    code: { type: String, required: true, unique: true, trim: true },
    label: { type: String, required: true, trim: true },
    stopIds: [{ type: Schema.Types.ObjectId, ref: "Stop", required: true }],
    isArchived: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const LineModel = model<ILine>("Line", lineSchema);

export const createLineSchema = z.object({
  code: z.string().trim().min(1, "Code de ligne requis"),
  label: z.string().trim().min(1, "Libellé requis"),
  stopIds: z.array(z.string()).min(2, "Au moins 2 arrêts sont requis (départ et arrivée)"),
});

export const updateLineSchema = z.object({
  code: z.string().trim().min(1).optional(),
  label: z.string().trim().min(1).optional(),
  stopIds: z.array(z.string()).min(2).optional(),
});