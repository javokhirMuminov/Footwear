import Errors from "../libs/Errors";
import { Product, ProductInput, ProductUpdateInput } from "../libs/types/product";
import ProductModel from "../schema/Product.model";
import { HttpCode } from "../libs/Errors";
import { Message } from "../libs/Errors";
import { shapeIntoMongooseOnjectId } from "../libs/config";


class ProductService {
  private readonly productModel;

  constructor() {
    this.productModel = ProductModel;
  }

  /**SPA */



  /**SSR */
  public async createNewProducts(input: ProductInput): Promise<Product> {
    try {
      return await this.productModel.create(input);
    } catch (err) {
      console.error("Error, model: createNewProduct", err);

      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
    }
  }



  public async updateChosenProduct(id: string, input: ProductUpdateInput): Promise<Product> {
    //stringni => ObjectId
    id = shapeIntoMongooseOnjectId(id);
    const result = await this.productModel.findByIdAndUpdate(
      {_id: id},
      input,
      {new: true}
    ).exec();
    if(!result ) throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATE_FAILED);

    return result;
  }
}

export default ProductService;