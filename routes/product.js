const router = require("express").Router();
const productController = require('../controllers/productController');
const middleware = require("../controllers/MiddlewareController");

router.post("/", productController.product_create);
router.get("/", productController.product_all);
router.get("/:productId", middleware, productController.product_details);
router.put("/:productId", middleware, productController.product_update);
router.delete("/:productId", middleware, productController.product_delete);
//router.post("/", productController.job_scheduler);

module.exports = router;
