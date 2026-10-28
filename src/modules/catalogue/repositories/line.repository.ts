import { LineModel, type ILine } from "../models/line.model.js";

export class LineRepository {
    async create(data: { code: string; label: string; stopIds: any[] }): Promise<ILine> {
        return await LineModel.create(data);
    }

    async findById(id: string): Promise<ILine | null> {
        return await LineModel.findById(id);
    }

    async findByCode(code: string): Promise<ILine | null> {
        return await LineModel.findOne({ code });
    }

    async findAllActive(page: number = 1, limit: number = 20): Promise<{ lines: ILine[]; total: number }> {
        const skip = (page - 1) * limit;
        const [lines, total] = await Promise.all([
            LineModel.find({ isArchived: false }).skip(skip).limit(limit),
            LineModel.countDocuments({ isArchived: false }),
        ]);
        return { lines, total };
    }

    async update(id: string, data: Partial<ILine>): Promise<ILine | null> {
        return await LineModel.findByIdAndUpdate(id, data, { new: true });
    }

    async archive(id: string): Promise<ILine | null> {
        return await LineModel.findByIdAndUpdate(id, { isArchived: true }, { new: true });
    }
}