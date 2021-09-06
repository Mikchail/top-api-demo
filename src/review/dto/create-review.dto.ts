import { IsNumber, IsString, Max, Min } from "class-validator";

export class CreateReviewDto {
  @IsString()
  name: string;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @Max(5)
  @Min(1)
  @IsNumber()
  rating: number;

  @IsString()
  productId: string;
}
// 613477f31f07a2bddc9368c2


const createObj = {
  "name": "просто отзыв",
  "title": "gear hulk",
  "description": "it's cool I like it",
  "rating": 5,
  "productId": "613477f31f07a2bddc9368c2"
}