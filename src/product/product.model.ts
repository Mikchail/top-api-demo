import { prop } from "@typegoose/typegoose";
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

export class ProductCharacteristic {
  @prop()
  name: string;

  @prop()
  value: string;
}


export interface ProductModel extends Base {}
export class ProductModel extends TimeStamps {
  @prop()
  image: string;

  @prop()
  title: string;

  @prop()
  price: number;

  @prop()
  oldPrice: number;

  @prop()
  calculatedRating: number;

  @prop()
  description: string;

  @prop()
  advantages: string;

  @prop()
  disAdvatages: string;

  @prop({type: () => [String]})
  categories: string[];

  @prop({type: () => [String]})
  tags: string;

  @prop({type: () => [String], _id: false}) // TODO
  characteristics: ProductCharacteristic[];
}
