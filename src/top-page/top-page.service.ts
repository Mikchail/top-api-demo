import { BadRequestException, Injectable } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { FindTopPageDto } from './dto/find-top-page.dto';
import { TopLevelCategory, TopPageModel } from './top-page.model';

@Injectable()
export class TopPageService {

  constructor(@InjectModel(TopPageModel) private readonly topPageModel: ModelType<TopPageModel>) { }

  async createTopPage(dto: CreateTopPageDto) {
    return this.topPageModel.create(dto)
  }

  async findById(id: string) {
    return this.topPageModel.findById(id).exec()
  }

  async deleteById(id: string) {
    return this.topPageModel.findByIdAndDelete(id).exec();
  }

  async updateById(id: string, dto: TopPageModel) {
    return this.topPageModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  async findByCategory(firstCategory: TopLevelCategory) {
    return this.topPageModel.aggregate()
      .match({
        firstCategory
      })
      .group({
        _id: {
          secondCategory: "$secondCategory"
        },
        pages: {
          $push: {
            alias: "$alias",
            title: "$title"
          }
        }
      })
      .exec();
  }

  async findBytextSearch(text: string) {
    return this.topPageModel.find({
      $text: {
        $search: text,
        $caseSensitive: false
      }
    }).exec();
  }
}