import { Type } from "class-transformer";
import { IsArray, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";

export class ProductCharacteristicDto {

  @IsString()
  name: string;
  @IsString()
  value: string;
}


export class CreateProductDto {
  @IsString()
  image: string;
  
  @IsString()
  title: string;
  
  @IsNumber()
  price: number;
  
  @IsNumber()
  @IsOptional()
  oldPrice?: number;
  
  @IsString()
  description: string;
  
  @IsString()
  advantages: string;
  
  @IsString()
  disAdvatages: string;
  
  @IsArray()
  @IsString({ each: true })
  categories: string[];
  
  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @IsArray()
  @ValidateNested()
  @Type(() => ProductCharacteristicDto)
  characteristics: ProductCharacteristicDto[];
}


// const obg =  {
//   "image": "2.png",
//   "title": "Product 1",
//   "price": "200",
//   "oldPrice": "20",
//   "description": "Cool product",
//   "advantages": "free smoke",
//   "disAdvatages": "cost",
//   "categories": ["tech", "sock"],
//   "tags": "pop",
//   "characteristics": [
//     {
//       "name": "qulity",
//       "value": "5",
//     },
//     {
//       "name": "nike",
//       "value": "just",
//     }
//   ]
// }