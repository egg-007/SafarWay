import type {
  Model,
  UpdateQuery,
  HydratedDocument,
} from "mongoose";

export class BaseRepository<T> {
  constructor(protected readonly model: Model<T>) {}

  async findById(id: string): Promise<HydratedDocument<T> | null> {
    return this.model.findById(id).exec();
  }

  async findAll(): Promise<HydratedDocument<T>[]> {
    return this.model.find().exec();
  }

  async create(data: Partial<T>): Promise<HydratedDocument<T>> {
    return this.model.create(data);
  }

  async updateById(
    id: string,
    data: UpdateQuery<T>,
  ): Promise<HydratedDocument<T> | null> {
    return this.model.findByIdAndUpdate(id, data, {
      returnDocument: "after",
      runValidators: true,
    }).exec();
  }

  async deleteById(id: string): Promise<HydratedDocument<T> | null> {
    return this.model.findByIdAndDelete(id).exec();
  }
}