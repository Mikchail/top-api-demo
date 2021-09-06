import { Type } from "class-transformer";
import { IsArray, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { TopLevelCategory } from "../top-page.model";



export class HhDateDto {
  @IsNumber()
  count: number;

  @IsNumber()
  juniorSalary: number;

  @IsNumber()
  middleSalary: number;

  @IsNumber()
  seniorSalary: number;
}

export class TopPageAdvantageDto {
  
  @IsString()
  title: string;

  @IsString()
  description: string;
}

export class CreateTopPageDto {

  @IsEnum(TopLevelCategory)
  firstCategory: TopLevelCategory;

  @IsString()
  secondCategory: string;

  @IsString()
  alias: string;

  @IsString()
  title: string;

  @IsString()
  category: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => HhDateDto)
  hh?: HhDateDto;

  @IsArray()
  @ValidateNested()
  @Type(() => TopPageAdvantageDto)
  advantages: TopPageAdvantageDto[];

  @IsString()
  seoText: string;

  @IsString()
  tagsTitle: string;

  @IsArray()
  @IsString({ each: true })
  tags: string[];
}

// const obg =  {
//   "firstCategory": "Services",
//   "secondCategory": "secondCategory",
//   "alias": "alias",
//   "title": "Product 1",
//   "category": "category 1",
//   "hh": {
//     "count": 123,
//     "juniorSalary": 1,
//     "middleSalary": 2,
//     "seniorSalary": 3
//   },
//   "advantages": [
//     {
//       "title": "cool",
//       "description": "description"
//     }
//   ],
//   "seoText": "seoText",
//   "tagsTitle": "tagsTitle",
//   "tags": ["tech", "sock"],
// }