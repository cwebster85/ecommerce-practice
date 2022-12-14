import Product from "../../models/product";
import { initMongoose } from "../../lib/mongoose";

// export async function findAllProducts() {
//    return Product.find().exec();
// }

// export default async function handle(req, res) {
//    await initMongoose();
//    res.json( await findAllProducts() );
// }

export default async function handle(req, res) {
   await initMongoose();
   res.json( await Product.find().exec() );
}