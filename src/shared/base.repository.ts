import type { Model, UpdateQuery, HydratedDocument } from "mongoose";

export class BaseRepository<T> {
  constructor(protected readonly model: Model<T>) {
    this.model = model;
  }

  async findById(id: string): Promise<HydratedDocument<T> | null> {
    return this.model.findById(id);
  }

  async findAll(): Promise<HydratedDocument<T>[]> {
    return this.model.find();
  }

  async create(data: Partial<T>): Promise<HydratedDocument<T>> {
    return this.model.create(data);
  }

  async updateById(
    id: string,
    data: UpdateQuery<T>,
  ): Promise<HydratedDocument<T> | null> {
    return this.model.findByIdAndUpdate(id, data);
  }

  async deleteById(id: string): Promise<HydratedDocument<T> | null> {
    return this.model.findByIdAndDelete(id);
  }
}
