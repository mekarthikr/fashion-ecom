import User from '../model/user';
import Role from '../model/role';
import Product from '../model/product';
import Stock from '../model/stock';
import Size from '../model/size'
import ProductCategory from '../model/product-category';
import * as status from '../constants/status-code';
import ProductType from '../model/product-type';

class BaseController {
    getRoleId = async (value, res) => {
        try {
            let role = await Role.findOne({ roleType: value })

            if (!role)
                throw "Role not available"
            return role._id.toString()
        }
        catch (err) {
            return res.status(status.NOT_FOUND).json({ error: err })
        }
    }

    getProductCategoryId = async (value, res) => {
        try {

            let productCategory = await ProductCategory.findOne({ category: value })

            if (!productCategory)
                throw "Product Category Not Available"

            return productCategory._id.toString()
        }
        catch (err) {
            return res.status(status.NOT_FOUND).json({ error: err })
        }
    }
    getCategorizedProduct = async (category) => {
        let productCategory = await ProductCategory.findOne({ productCategory: category });
        let products = await Product.find({ productCategoryId: productCategory._id })

        return products;
    }

    getProductTypeId = async (value, res) => {
        try {
            console.log("product type value : ", value)
            let productType = await ProductType.findOne({ productType: value })

            console.log("product type : ", productType)

            if (!productType)
                throw "Product Type not Available"

            return productType._id.toString()
        }
        catch (err) {
            return res.status(status.NOT_FOUND).json({ error: err })
        }
    }

    addStock = async (size, quantity, res) => {
        try {
            console.log("-------------------IN ADD STOCK----------------");
            let sizeId = await Size.findOne({ size: size })

            let productStock = new Stock({
                sizeId: sizeId._id,
                availableStock: quantity
            })

            await productStock.save()
            console.log("SIZE ID : ", productStock);

            return productStock._id.toString()
        }
        catch (err) {
            console.log("ERROR : ", err);
            return res.status(status.INTERNAL_SERVER_ERROR).json({ error: err })
        }
    }

    getProductId = async (value, res) => {
        try {
            let product = await Product.findOne({ skuId: value })

            if (!product)
                throw "Product not available"

            return product._id.toString()
        }
        catch (err) {
            return res.status(status.NOT_FOUND).json({ error: err })
        }
    }

}

export default BaseController