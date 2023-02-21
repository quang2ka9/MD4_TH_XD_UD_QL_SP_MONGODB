import {Router} from "express";
const productRouters = Router();
import {Product} from "../schemas/product.model";
import multer from "multer";
const upload = multer()

productRouters.get('/create', (req, res)=>{
    res.render("createProduct");
});

productRouters.post('/create', upload.none(), async (req, res)=>{
    try {
        const productNew = new Product(req.body);
        const product = await productNew.save();
        if(product){
            res.render("success");
        }else {
            res.render("error");
        }
    }catch (err){
        res.render("error");
    }
});

productRouters.get('/list', async (req, res)=>{
    try {
        const products = await Product.find();
        res.render("listProduct", {products: products});
    }catch {
        res.render("error");
    }
});

export default productRouters;