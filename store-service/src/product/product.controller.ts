import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags,ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: [CreateProductDto] })
  findAll() {
    return this.productService.findAll();
  }

  @Get('/getbyid/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch('/change/:id')

  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Get('search/:query')

  @ApiBearerAuth()
  search(@Param('query') query: string) {
    return this.productService.search(query);
  }

  @Delete('/delete/:id')

  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
