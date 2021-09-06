import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { IdValidationPipe } from 'src/pipes/id-validation.pipe';
import { CreateProductDto } from './dto/create-product.dto';
import { FindProductDto } from './dto/find-product.dto';
import { ProductModel } from './product.model';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {

  constructor(private readonly productService: ProductService) { }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() dto: CreateProductDto) {
    return this.productService.createProduct(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async get(@Param('id', IdValidationPipe) id: string) {
    const product = await this.productService.findById(id);
    if (!product) {
      throw new NotFoundException("нету продукта")
    }
    return product;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id', IdValidationPipe) id: string) {
    const product = await this.productService.deleteById(id);
    if (!product) {
      throw new NotFoundException("нету продукта")
    }
    return product;
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async patch(@Param('id', IdValidationPipe) id: string, @Body() dto: ProductModel) {
    const product = await this.productService.updateById(id, dto);
    if (!product) {
      throw new NotFoundException("нету продукта")
    }
    return product;
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post("find")
  async find(@Body() dto: FindProductDto) {
    return this.productService.findWithReview(dto);
  }

}
