import { Router } from "express";
import multer from "multer";
import ProductController from "../controllers/productControllers";

const router = Router()
const upload = multer({ dest: 'Picture' })
const product = new ProductController()


router.get('/image/:key', product.getImage)
router.get('/product-size', product.getProductSize)
router.get('/product-category', product.getProductCategory)
router.get('/product-type', product.getProductType)
router.post('/uploadImage',upload.single('image-upload'), product.postImages)

router.put('/:productid', product.editProduct)
router.get('/:id',product.individualProduct)
router.post('/', product.getAllProduct)
router.post('/add-product', product.addProduct)
router.post('/filter',product.getFilteredProducts)
// router.post('/filter/', product.getFilteredProducts)


export default router