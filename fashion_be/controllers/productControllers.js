import Product from '../model/product'
import ProductCategory from '../model/product-category'
import ProductType from '../model/product-type'
import Size from '../model/size'
import Stock from '../model/stock'
import * as status from '../constants/status-code'
import { getFileStream, uploadFile } from '../middleware/s3'
import fs, { stat } from 'fs'
import util from 'util'
import BaseController from './baseController';
import { io } from '../utils/socket-connection'
// import product from '../model/product'
import pkg from 'mongoose';

const { Schema, model } = pkg;

const baseController = new BaseController()

class productController {

    getAllProduct = async (req, res) => {
        console.log(req.body)
        try {
            console.log(req.body)
            const { retailerId } = req.body
            const date = new Date();
            let products
            console.log(req.query)
            if (retailerId) {
                products = await Product.find({ retailerId: retailerId }).sort({productName:"asc"})
                // console.log("came here")
                return res.status(status.SUCCESS).json({ products })
            }
            if(req.body.search)  //seperate controller
            {
                products = await Product.find({$text: { $search: req.body.search }})
                return res.status(status.SUCCESS).json({ products })

            }
            else {
                products = await Product.find({ availableDate: { $lte: date }, status: true })
                return res.status(status.SUCCESS).json({ products })

            }
        }
        catch (err) {
            console.log("Error : ", err);
            return res.status(status.NOT_FOUND).json({ error: err })
        }
    }

    getProduct = async (req, res, next) => {
        try {
            console.log(req.body.retailerId)
            const products = await Product.find({ retailerId: req.body.retailerId })

            if (!products)
                throw "No products found"

            return res.status(status.SUCCESS).json({ products })
        }
        catch (err) {
            return res.status(status.NOT_FOUND).json({ error: err })
        }
    }

    productCategory = async (req, res) => {
        try {
            let category = req.query.category
            if (!category) {
                let products = await Product.find({ _id: { $nin: await Product.distinct('skuIds') } }).populate([{ path: 'skuIds', populate: { path: 'stockId', populate: { path: 'sizeId' } } }, { path: 'stockId', populate: { path: 'sizeId' } }])
                if (products.length <= 0)
                    throw "No Products available"

                return res.status(status.SUCCESS).json({ products })
            }
            else {
                const products = await baseController.getCategorizedProduct(category);
                if (!products) {
                    throw "No products available at given category"
                }
                return res.status(status.SUCCESS).json({ products })
            }
        }
        catch (err) {
            return res.status(status.NOT_FOUND).json({ error: err })
        }
    }

    viewProduct = async (req, res, next) => {

        try {
            const category = req.query.category;

            console.log("category : ", category)

            if (!category) {
                let products = await Product.find();
                if (products.length <= 0)
                    throw "Products not available"
                return res.status(status.SUCCESS).json({ products })
            }
            else {
                const products = await baseController.getCategorizedProduct(category);
                if (!products) {
                    throw "No products available at given category"
                }
                return res.status(status.SUCCESS).json({ products })
            }
        }
        catch (err) {
            return res.status(status.NOT_FOUND).json({ error: err })
        }
    }


    addProduct = async (req, res, next) => {
        try {

            const { productName, productImageUrl, category, variation, availableDate, skuId, retailerId } = req.body;
            let product = new Product({
                productName,
                productImage: productImageUrl,
                category,
                variation,
                availableDate,
                skuId,
                retailerId,
                status: true
            })
            const count =await  Product.find({skuId:skuId}).count()
            // console.log(count)
            if(count)
            {
                console.log("found")
                io.emit("addProductError",{"message":"Entered Sku Id is Already Inserted"})
                throw {status:status.CONFLICT,message:"already available"}
            }
            else
            {
                console.log("not found",skuId)
                product=await product.save()
            }
            io.emit("addProductSuccess",{"message":"Product Added Successfully"})
            return res.status(status.CREATED).json({ message: "Product Added Successfully", product: product })
        }
        catch (err) {
            console.log("Error : ", err)
            return res.status(err.status || status.INTERNAL_SERVER_ERROR).json({ error: err.message })
        }
    }

    updateProduct = async (req, res, next) => {
        try {
            const { productName, productImageUrl, oldPrice, newPrice } = req.body;
            let productId = req.params.id;

            if (productId.length !== 24)
                throw "Invalid Object Id"

            if (! await Product.findById(productId))
                throw "No Product Available With this Given Product Id"

            let product = await Product.findByIdAndUpdate(productId, {
                productName,
                productImageUrl,
                oldPrice,
                newPrice
            })

            await product.save()

            return res.status(status.SUCCESS).json({ message: "Product Updated Successfully" })
        }
        catch (err) {
            return res.status(status.INTERNAL_SERVER_ERROR).json({ error: err })
        }
    }

    //post image to S3 bucket
    postImages = async (req, res) => {
        const unLinkFile = util.promisify(fs.unlink)
        const file = req.file
        const fileData = await uploadFile(file)
        await unLinkFile(file.path)
        await res.send(fileData.Location)
    }

    //get image from S3 bucket
    getImage = async (req, res) => {
        console.log("In get img");
        const key = req.params.key
        const readStream = getFileStream(key)
        await readStream.pipe(res)
    }

    //get product Size
    getProductSize = async (req, res, next) => {
        try {
            let productSize = await Size.find()

            if (!productSize)
                throw "Product Size not available"

            return res.status(status.SUCCESS).json({ productSize })
        }
        catch (err) {
            return res.status(status.NOT_FOUND).json({ error: err })
        }
    }

    //get product category
    getProductCategory = async (req, res, next) => {
        try {
            let productCategory = await ProductCategory.find()

            if (!productCategory)
                throw "Product category not found"

            return res.status(status.SUCCESS).json({ productCategory })
        }
        catch (err) {
            return res.status(status.NOT_FOUND).json({ error: err })
        }
    }

    getProductType = async (req, res, next) => {
        try {
            let productType = await ProductType.find()

            if (!productType)
                throw "Product Type not found"

            return res.status(status.SUCCESS).json({ productType })
        }
        catch (err) {
            return res.status(status.NOT_FOUND).json({ error: err })
        }
    }

    deleteProductCategory = async (req, res) => {
        try {
            let categoryId = req.params.categoryId
            console.log(categoryId);
            let category = await ProductCategory.findByIdAndDelete(categoryId)
            console.log("nuscsc");
            if (!category)
                throw "Unable to delete this product"
            return res.status(status.SUCCESS).json({ message: "Category deleted successfully" })
        }
        catch (err) {
            return res.status(status.INTERNAL_SERVER_ERROR).json({ error: err })
        }
    }

    addProductCategory = async (req, res) => {
        try {
            console.log("vvnsdjvdh", req.body);
            const { category } = req.body

            if (await ProductCategory.findOne({ category: category })) {
                throw "This category has already been added"
            }
            let newCategory = new ProductCategory({
                category,
            })
            await newCategory.save()
            return res.status(status.CREATED).json({ message: "Category Added Successfully" })
        }
        catch (err) {
            console.log("error : ", err)
            return res.status(status.INTERNAL_SERVER_ERROR).json({ error: err })
        }
    }

    individualProduct = async (req, res) => {
        try {
            console.log("came")
            const productId = req.params.id
            console.log(productId)
            const getProduct = await Product.findById(productId)
            console.log(getProduct)

            if (!getProduct) {
                throw "Product Not Found"
            }
            console.log("new product", getProduct)
            return res.status(status.CREATED).json({ getProduct })

        }
        catch (err) {
            console.log("error : ", err)
            return res.status(status.INTERNAL_SERVER_ERROR).json({ error: err })
        }
    }

    getSimpleProduct = async (req, res, next) => {
        try {
            const { retailerId } = req.body

            console.log("Retailer Id : ", req.body)

            const simpleProductId = await ProductType.findOne({ productType: "simple" })
            const simpleProduct = await Product.find({ _id: { $nin: await Product.distinct('skuIds') }, productTypeId: simpleProductId._id, retailerId: retailerId })

            if (!simpleProduct)
                throw "Product Not Found"
            console.log(simpleProduct)
            return res.status(status.SUCCESS).json({ simpleProduct })
        }
        catch (err) {
            return res.status(status.NOT_FOUND).json({ error: err })
        }
    }

    inventoryManagement = async (req, res, next) => {
        try {
            const { retailerId } = req.body

            console.log("Retailer Id : ", req.body)

            const simpleProductId = await ProductType.findOne({ productType: "simple" })
            const simpleProduct = await Product.find({ productTypeId: simpleProductId._id, retailerId: retailerId }).populate([{ path: 'stockId', populate: { path: 'sizeId' } }, { path: 'productCategoryId' }])

            if (!simpleProduct)
                throw "Product Not Found"
            console.log(simpleProduct)
            return res.status(status.SUCCESS).json({ simpleProduct })
        }
        catch (err) {
            return res.status(status.NOT_FOUND).json({ error: err })
        }
    }

    updateInventry = async (req, res, next) => {
        try {
            console.log("came", req)
            const { stock } = req.body
            const stockId = req.params.stockId
            console.log(req.body, stockId)

            if (!await Stock.findById(stockId))
                throw "Unable to found"

            let stocks = await Stock.findByIdAndUpdate(stockId, {
                availableStock: stock
            })

            await stocks.save()

            return res.status(status.SUCCESS).json({ message: "stock updated successfully" })
        }
        catch (err) {
            // console.log("error : ", err)
            return res.status(status.NOT_FOUND).json({ error: err })
        }
    }

    editProduct = async (req, res, next) => {
        // console.log(req)
        const productId = req.params.productid
        try {
            
            if (req.body.product) {
                console.log(req.body.product)
                const updateProduct = await Product.findByIdAndUpdate(productId, req.body.product, {
                    new: true
                })
                await updateProduct.save()
                return res.status(status.UPDATE_SUCCESS).json({ message: "Product updated successfully" })
            }
            if (req.body.variation) {
                console.log(req.body.variation)
                const updateProduct = await Product.findByIdAndUpdate(productId, req.body, {
                    new: true
                })
                await updateProduct.save()
                return res.status(status.UPDATE_SUCCESS).json({ message: "Product updated successfully" })
            }
            else {
                const product = await Product.findById(productId, { status: 1 })
                console.log(product)
                const productStatus = await Product.findByIdAndUpdate(productId, { status: !product.status })
                console.log(productStatus)
                await productStatus.save()
                return res.status(status.UPDATE_SUCCESS).json({ message: "Product status updated" })
            }
        }
        catch (err) {
            return res.status(status.NOT_FOUND).json({ error: err })
        }
    }

    getFilteredProducts = async (req, res, next) => {
        try {
            const { retailerId } = req.body                 
            const { outofstock } = req.query
            let products
            if (retailerId) {
                 if  (req.query)
                {
                    let filter={}
                    if(req.query.category && req.query.category !=="all") filter.category=req.query.category
                    if(req.query.search) filter["productName"] = { $regex: req.query.search,$options:"i" }

                    const sortby=req.query.sortby
                    const orderby=req.query.orderby

                    products = await Product.aggregate([
                        { 
                            $match: {...filter,"retailerId":pkg.Types.ObjectId(retailerId)}
                        },
                        {
                            $sort:{
                                [sortby]:Number(orderby)
                                // 'productName':1
                            }
                        }
                        // ,
                        // { '$facet'    : {
                        //     pagination: [ {$addFields:{totalPages:  }}, { $addFields: { currentpage: req.query.page } } ],
                        //     products: [ { $skip: (Number(req.query.page) - Number(req.query.limit)) > 0 ? (Number(req.query.page) - Number(req.query.limit)) : 1 }, { $limit: Number(req.query.limit) } ]
                        // }}    
                    ])
//
                    // console.log(products)

                    if(outofstock==="true")
                    {
                        products = products.filter((product)=>{
                            const availability=product.variation.some((data)=>{
                                const value = data.variation.some((data)=>{
                                    return data.stock !== "0"
                                })
                                return value
                            })
                            if(!availability)
                                return product
                        })
                    }
                    const totalPages= Math.ceil(products.length / req.query.limit ||1)
                    // if(totalPages <= req.query.page )
                    // {

                    // // }
                    console.log( "req", Number(req.query.page),totalPages)
                    console.log( "req limit",((req.query.page)-1) * req.query.limit )
                    

                    const skipFrom= totalPages < Number(req.query.page) ? 1  : ((req.query.page)-1) * req.query.limit  ;
                    console.log("skip from",skipFrom)
                    const skipTo=(skipFrom+Number(req.query.limit))
                    const data= products.slice(skipFrom,skipTo)
                    console.log(skipFrom,skipTo)

                    return res.status(status.SUCCESS).json({pagination:{"currentPage":Number( skipFrom === 1 ? totalPages : req.query.page),"totalPages":totalPages },products:data})
                }
            }
        }
        catch (err) {
            console.log("Error : ", err);
            return res.status(status.NOT_FOUND).json({ error: err })
        }
    }
}

export default productController