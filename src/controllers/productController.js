// src/models/ProductController.js
const path = require('path');
const Product = require('../models/product');
const FileHelper = require('../utils/fileHelper');

class ProductController {
  constructor() {
    this.datapath = path.join(__dirname, '..', '..', 'data', 'products.json');
  }

  // Criar um novo produtoS
  async createProduct(data) {
    try {
      const allProducts = await this.getAllProducts();
      const newProduct = new Product(
        allProducts.length + 1,
        data.name,
        data.description,
        data.price,
        data.categoryId,
        data.imageUrl
      );

      allProducts.push(newProduct);
      await FileHelper.writeJSON(this.datapath, allProducts);

      return { success: true, product: newProduct.toJSON() };
    } catch (error) {
      return { success: false, error: 'Erro ao criar produto', message: error.message };
    }
  }

  // Listar todos os produtos
  async getAllProducts() {
    try {
      const products = await FileHelper.readJSON(this.datapath);
      return products || [];
    } catch (error) {
      console.error('Erro ao buscar produtos, retornando array vazio...');
      return [];
    }
  }

  // Buscar produto por ID
  async getProductById(id) {
    try {
      const products = await this.getAllProducts();
      const productFound = products.find(p => p.id === id);

      if (!productFound) {
        throw new Error(`Produto com ID ${id} não encontrado.`);
      }

      return { success: true, product: productFound };
    } catch (error) {
      return { success: false, error: 'Erro ao buscar produto', message: error.message };
    }
  }

  // Atualizar produto
  async updateProduct(id, data) {
    try {
      const products = await this.getAllProducts();
      const productIndex = products.findIndex(p => p.id === id);

      if (productIndex === -1) {
        throw new Error(`Produto com ID ${id} não encontrado.`);
      }

      const productToUpdate = new Product(
        products[productIndex].id,
        products[productIndex].name,
        products[productIndex].description,
        products[productIndex].price,
        products[productIndex].categoryId,
        products[productIndex].imageUrl
      );

      productToUpdate.update(data);
      products[productIndex] = productToUpdate;

      await FileHelper.writeJSON(this.datapath, products);
      return { success: true, product: productToUpdate.toJSON() };
    } catch (error) {
      return { success: false, error: 'Erro ao atualizar produto', message: error.message };
    }
  }

  // Deletar produto
  async deleteProduct(id) {
    try {
      const products = await this.getAllProducts();
      const productIndex = products.findIndex(p => p.id === id);

      if (productIndex === -1) {
        throw new Error(`Produto com ID ${id} não encontrado.`);
      }

      const [deletedProduct] = products.splice(productIndex, 1);
      await FileHelper.writeJSON(this.datapath, products);

      return { success: true, deletedProduct: deletedProduct.toJSON() };
    } catch (error) {
      return { success: false, error: 'Erro ao deletar produto', message: error.message };
    }
  }

  // Buscar produto por categoria
  async getProductsByCategory(categoryId) {
    try {
      const products = await this.getAllProducts();
      const filteredProducts = products.filter(p => p.categoryId === categoryId);
      return { success: true, products: filteredProducts };
    } catch (error) {
      return { success: false, error: 'Erro ao buscar produtos por categoria', message: error.message };
    }
  }
}

module.exports = ProductController;