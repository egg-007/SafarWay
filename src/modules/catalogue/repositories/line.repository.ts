import type { HydratedDocument } from "mongoose";
import { BaseRepository } from "../../../shared/base.repository.js";
import { LineModel, type ILine } from "../models/line.model.js";

export class LineRepository extends BaseRepository<ILine> {
  constructor() {
    super(LineModel);
  }

  async findByCode(code: string): Promise<HydratedDocument<ILine> | null> {
    return this.model.findOne({ code }).exec();
  }

  async findAllActive(page: number = 1, limit: number = 20): Promise<{ lines: HydratedDocument<ILine>[]; total: number }> {
    const skip = (page - 1) * limit;
    const [lines, total] = await Promise.all([
      this.model.find({ isArchived: false }).skip(skip).limit(limit).exec(),
      this.model.countDocuments({ isArchived: false }).exec(),
    ]);
    return { lines, total };
  }

  async archive(id: string): Promise<HydratedDocument<ILine> | null> {
    return this.updateById(id, { isArchived: true });
  }
}