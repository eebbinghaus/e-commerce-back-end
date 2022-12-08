const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

// find all categories
// be sure to include its associated Products
router.get("/", async (req, res) => {
  try {
    const productData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(productData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// find one category by its `id` value
// be sure to include its associated Products
router.get("/:id", async (req, res) => {
  try {
    const productData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    res.status(200).json(productData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// create a new category
router.post("/", async (req, res) => {
  try {
    const productData = await Category.create(req.body);
    res.status(200).json(productData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update a category by its `id` value
router.put("/:id", async (req, res) => {
  try {
    const productData = await Category.update(
      {
        category_name: req.body.category_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    return res.json(productData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// delete a category by its `id` value
router.delete("/:id", async (req, res) => {
  try {
    const productData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res.json(productData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
