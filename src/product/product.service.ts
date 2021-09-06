import { Injectable } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { CreateProductDto } from './dto/create-product.dto';
import { FindProductDto } from './dto/find-product.dto';
import { ProductModel } from './product.model';

@Injectable()
export class ProductService {
  constructor(@InjectModel(ProductModel) private readonly productModel: ModelType<ProductModel>) {

  }

  async createProduct(dto: CreateProductDto) {
    return this.productModel.create(dto);
  }

  async deleteById(id: string) {
    return this.productModel.findByIdAndDelete(id).exec();
  }

  async updateById(id: string, dto: ProductModel) { // TODO dto must be -> CreateProductDto
    return this.productModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  async findById(id: string) {
    return this.productModel.findById(id);
  }

  async findWithReview(dto: FindProductDto) {
    return this.productModel.aggregate([
      {
        $match: {
          categories: dto.category,
        },

      },
      {
        $sort: {
          _id: 1,
        }
      },
      {
        $limit: dto.limit,
      },
      {
        $lookup: {
          from: 'Review',
          localField: '_id',
          foreignField: 'productId',
          as: 'reviews'
        }
      },
      {
        $addFields: {
          reviewCount: { $size: '$reviews' },
          reviewAvg: { $avg: '$reviews.rating' },
          reviews: { 
            $function: {
              body: `function (review){
                review.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))
                return review;
              }`,
              args: ["$reviews"],
              lang: "js"
            }
          }
        }
      }
    ]).exec();
  }

}
