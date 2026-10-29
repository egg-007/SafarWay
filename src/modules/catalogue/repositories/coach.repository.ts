import type { HydratedDocument } from "mongoose";
import { BaseRepository } from "../../../shared/base.repository.js";
import { CoachModel, type ICoach } from "../models/coach.model.js";

export class CoachRepository extends BaseRepository<ICoach> {
  constructor() {
    super(CoachModel);
  }

  async findByRegistration(registration: string): Promise<HydratedDocument<ICoach> | null> {
    return this.model.findOne({ registration }).exec();
  }

  async findAllActive(page: number = 1, limit: number = 20): Promise<{ coaches: HydratedDocument<ICoach>[]; total: number }> {
    const skip = (page - 1) * limit;
    const [coaches, total] = await Promise.all([
      this.model.find({ isArchived: false }).skip(skip).limit(limit).exec(),
      this.model.countDocuments({ isArchived: false }).exec(),
    ]);
    return { coaches, total };
  }

  async archive(id: string): Promise<HydratedDocument<ICoach> | null> {
    return this.updateById(id, { isArchived: true });
  }
}