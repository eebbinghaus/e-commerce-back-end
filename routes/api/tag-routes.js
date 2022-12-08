const router = require("express").Router();
// const { UPSERT } = require("sequelize/types/lib/query-types");
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint
// find all tags
// be sure to include its associated Product data
router.get("/", async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const productData = await Tag.findAll({
      include: [{ model: Product, through: ProductTag }],
    });
    res.status(200).json(productData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// find a single tag by its `id`
// be sure to include its associated Product data
router.get("/:id", async (req, res) => {
  try {
    const productData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag }],
    });
    // const productData = await Tag.findByPk({ where: req.params.id });
    res.status(200).json(productData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// create a new tag
router.post("/", async (req, res) => {
  try {
    const productData = await Tag.create(req.body);
    res.status(200).json(productData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update a tag's name by its `id` value
router.put("/:id", async (req, res) => {
  try {
    const productData = await Tag.update(
      {
        tag_name: req.body.tag_name,
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

// delete on tag by its `id` value
router.delete("/:id", async (req, res) => {
  try {
    const productData = await Tag.destroy({
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
