const mongoose = require("mongoose");
const Product = require("../model/Product");
const { ObjectId } = require("mongodb");

exports.fetchAllProduct = async (req, res) => {
  let query = Product.find({});
  let totalProductsQuery = Product.find({});


  if (req.query._sort && req.query._order) {
    //http://localhost:3003/products?_sort=rating&_order=asc
    query = query.sort({ [req.query._sort]: req.query._order });  
    totalProductsQuery = totalProductsQuery.sort({ [req.query._sort]: req.query._order });  

  }
  if (req.query._page && req.query._limit) {
    //http://localhost:3003/products?_page=2&_limit=10
    query = query
      .skip(req.query._limit * (req.query._page - 1))
      .limit(req.query._limit);
  }

  if (req.query.filter_price_gte && req.query.filter_price_lte) {
    //products?filter.price.gte=200& filter.price.lte=1000
    query = query.find({
      price: {
        $gte: req.query.filter_price_gte,
        $lte: req.query.filter_price_lte,
      },
    });
    totalProductsQuery.find({
      price: {
        $gte: req.query.filter_price_gte,
        $lte: req.query.filter_price_lte,
      },
    });
  }

  if (req.query.size) {
    let sizes = req.query.size;

    if (!Array.isArray(sizes)) {
      sizes = [sizes];
    }

    sizes = sizes.map((size) => parseInt(size));

    query.find({
      size: {
        $elemMatch: {
          value: { $in: sizes },
          inStock: true,
        },
      },
    });
    totalProductsQuery.find({
      size: {
        $elemMatch: {
          value: { $in: sizes },
          inStock: true,
        },
      },
    });
  }

  if (req.query.color) {
    let colors = req.query.color;
    if (!Array.isArray(colors)) {
      colors = [colors];
    }

    query.find({
      color: { $in: colors },
    });
    totalProductsQuery.find({
      color: { $in: colors },
    });
  }

  if (req.query.category) {
    let category = req.query.category;
    query.find({ category: { $eq: category } });
    totalProductsQuery.find({ category: { $eq: category } });

  }

  const totalDocs = await totalProductsQuery.count().exec();


  try {
    const data = await query.exec();
    res.set('X-Total-Count', totalDocs);
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.fetchProductsById = async (req, res) => {
  const { id } = req.params;
  // let query = Product.find({});

  // if (ObjectId.isValid(id)) {
  //   query = query.findById(id);
  // } else {
  //   query = query.find({ category: { $eq: id } });
  // }

  // try {
  //   const data = await query.exec();
  //   console.log(data);
  //   res.status(200).json(data);
  // } catch (err) {
  //   res.status(400).json(err);
  // }
  try {
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.createProduct = async (req, res) => {
  // this product we have to get from API body
  const product = new Product(req.body);
  try {
    const doc = await product.save();
    res.status(201).json(doc);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndUpdate(id, {...req.body,modifiedAt:new Date()}, {
      new: true,
    });
    res.status(200).json(product);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};
