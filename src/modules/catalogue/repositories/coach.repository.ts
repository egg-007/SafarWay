import { CoachModel, type ICoach } from "../models/coach.model.js";

export class CoachRepository {
    async create(data: { registration: string; seatNumbers: number[] }): Promise<ICoach> {
        return await CoachModel.create(data);
    }

    async findById(id: string): Promise<ICoach | null> {
        return await CoachModel.findById(id);
    }

    async findByRegistration(registration: string): Promise<ICoach | null> {
        return await CoachModel.findOne({ registration });
    }

    async findAllActive(page: number = 1, limit: number = 20): Promise<{ coaches: ICoach[]; total: number }> {
        const skip = (page - 1) * limit;
        const [coaches, total] = await Promise.all([
            CoachModel.find({ isArchived: false }).skip(skip).limit(limit),
            CoachModel.countDocuments({ isArchived: false }),
        ]);
        return { coaches, total };
    }

    async update(id: string, data: Partial<ICoach>): Promise<ICoach | null> {
        return await CoachModel.findByIdAndUpdate(id, data, { new: true });
    }

    async archive(id: string): Promise<ICoach | null> {
        return await CoachModel.findByIdAndUpdate(id, { isArchived: true }, { new: true });
    }
}