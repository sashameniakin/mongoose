import connectDB from "../_db/connect-db";
import { Product } from "../_db/models/Product";

async function handler(req, res) {
  switch (req.method) {
    case "GET":
      try {
        const filter = req.query;
        console.log(filter);
        const los = JSON.parse(filter.category);
        const products = await Product.find({ category: los });
        res.status(200).json(products);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }

      break;
    case "POST":
      try {
        /*  const product = new Product(body); */
        const newProduct = new Product({
          name: req.body.name,
          category: req.body.category,
          detail: req.body.detail,
        });
        await newProduct.save();
        res.status(200).json();
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;

    default:
      return res.status(400).json({ error: "method not supported" });
  }
}

export default connectDB(handler);
