import { DocumentType, ModelType } from "@typegoose/typegoose/lib/types";
import { InjectModel } from "nestjs-typegoose";
import { CreateReviewDto } from "./dto/create-review.dto";
import { ReviewModel } from "./review.model";

export class ReviewService {

  constructor(@InjectModel(ReviewModel) private readonly reviewModel: ModelType<ReviewModel>) { }

  async create(dto: CreateReviewDto): Promise<DocumentType<ReviewModel>> {
    return this.reviewModel.create(dto);
  }

  async delete(id: string): Promise<DocumentType<ReviewModel> | null> {
    return this.reviewModel.findByIdAndDelete(id).exec();
  }

  async patch(id: string, dto: ReviewModel): Promise<DocumentType<ReviewModel> | null> {
    return this.reviewModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  async findByProductId(productId: string): Promise<DocumentType<ReviewModel>[] | null> {
    return this.reviewModel.find({ productId }).exec();
  }

  async deleteAllReviewByProductId(productId: string) {
    return this.reviewModel.deleteMany({ productId }).exec();
  }
}
