import { Request, Response } from 'express';
import knex from '../database';
import {Product} from '../types/Product';

class ProductController {
  static async index(req: Request, res: Response) {
    try {
      const products: Product = await knex.select('*').from('products');
      return res.status(200).json(products);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
}
export default ProductController;
