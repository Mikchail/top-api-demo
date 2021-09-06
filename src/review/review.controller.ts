import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { IdValidationPipe } from 'src/pipes/id-validation.pipe';
import { CreateReviewDto } from './dto/create-review.dto';
import { REVIEW_NOT_FOUND } from './review.constants';
import { ReviewModel } from './review.model';
import { ReviewService } from './review.service';

@Controller('review')
export class ReviewController {

  constructor(private readonly reviewService: ReviewService) { }


  @UsePipes(new ValidationPipe())
  @Post('create')
  async create(@Body() dto: CreateReviewDto) {
    try {
      return this.reviewService.create(dto);

    } catch (error) {
      console.log(error);

    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id', IdValidationPipe) id: string) {
    const deletedDoc = this.reviewService.delete(id);
    if (!deletedDoc) {
      throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND)
    }
    return deletedDoc
  }

  @Patch(':id')
  async patch(@Param('id', IdValidationPipe) id: string, @Body() dto: ReviewModel) {
    return this.reviewService.patch(id, dto);
  }

 
  @Get('byProduct/:productId')
  async getByProduct(@Param('productId', IdValidationPipe) productId: string) {
    return this.reviewService.findByProductId(productId);
  }

  @Delete('byProduct/:productId')
  async deleteAllReviewByProductId(@Param('productId', IdValidationPipe) productId: string) {
    return this.reviewService.deleteAllReviewByProductId(productId);
  }

}
