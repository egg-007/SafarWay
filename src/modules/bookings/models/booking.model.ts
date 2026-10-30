
import mongoose, { Schema, Types } from "mongoose";
import  { BookingStatus, CancelReason } from "../doman/type.js";



export interface IBooking {
  departureId: Types.ObjectId;
  passengerId: Types.ObjectId;

  passengerName: string;
  seatNumber: number;
  priceCents: number;

  ticketCode: string;

  status: BookingStatus;
  occupiesSeat: boolean;

  cancelReason?: CancelReason;
  boardedAt?: Date;

  createdAt?: Date;
  updatedAt?: Date;
}

const bookingSchema = new Schema<IBooking>(
  {
    departureId: {
      type: Schema.Types.ObjectId,
      ref: "Departure",
      required: true,
      immutable: true,
    },

    passengerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      immutable: true,
    },

    passengerName: {
      type: String,
      required: true,
      trim: true,
      immutable: true,
    },

    seatNumber: {
      type: Number,
      required: true,
      min: 1,
      validate: {
        validator: Number.isInteger,
        message: "Seat number must be an integer",
      },
      immutable: true,
    },

    priceCents: {
      type: Number,
      required: true,
      min: 0,
      validate: {
        validator: Number.isInteger,
        message: "Price must be an integer",
      },
      immutable: true,
    },

    ticketCode: {
      type: String,
      required: true,
      trim: true,
      immutable: true,
    },

    status: {
      type: String,
      enum: Object.values(BookingStatus),
      default: BookingStatus.CONFIRMED,
      required: true,
    },

    occupiesSeat: {
      type: Boolean,
      default: true,
      required: true,
    },

    cancelReason: {
      type: String,
      enum: Object.values(CancelReason),
    },

    boardedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

bookingSchema.index(
  { ticketCode: 1 },
  { unique: true, name: "unique_ticket_code" },
);

bookingSchema.index(
  { departureId: 1, seatNumber: 1 },
  {
    unique: true,
    partialFilterExpression: {
      occupiesSeat: true,
    },
    name: "unique_occupied_seat",
  },
);

// One active booking per passenger in a departure
bookingSchema.index(
  { departureId: 1, passengerId: 1 },
  {
    unique: true,
    partialFilterExpression: {
      occupiesSeat: true,
    },
    name: "unique_passenger_booking",
  },
);

export const Booking = mongoose.model<IBooking>(
  "Booking",
  bookingSchema,
);
