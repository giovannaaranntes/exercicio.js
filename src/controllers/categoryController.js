// src/models/CategoryController.js
const path = require('path');
const FileHelper = require('../utils/fileHelper');
const Category = require('./Category');

class CategoryController {
  constructor() {
    this.datapath = path.join(__dirname, '..', '..', 'data', 'categories.json');
    this.fileHelper = FileHelper;
  }

  // Criar nova categoria
  async createCategory(data) {
    try {
      const existingCategories = await this.getAllCategories();
      const existingCategory = existingCategories.find(
        (c) => c.name.toLowerCase() === data.name.toLowerCase()
      );

      if (existingCategory) {
        throw new Error(`Categoria "${data.name}" já existe!`);
      }

      const newCategory = new Category(
        existingCategories.length + 1,
        data.name,
        data.description,
        data.icon
      );

      existingCategories.push(newCategory);
      await this.fileHelper.writeJSON(this.datapath, existingCategories);

      console.log(`✅ Categoria "${newCategory.name}" criada com sucesso!`);
      return { success: true, category: newCategory };
    } catch (error) {
      console.error('❌ Erro ao criar categoria:', error.message);
      throw error;
    }
  }

  // Listar todas as categorias
  async getAllCategories() {
    try {
      const categories = await this.fileHelper.readJSON(this.datapath);
      return categories || [];
    } catch (error) {
      console.log('📦 Arquivo de categorias não encontrado, criando novo...');
      return [];
    }
  }

  // Buscar categoria por ID
  async getCategoryById(id) {
    try {
      const categories = await this.getAllCategories();
      const category = categories.find((c) => c.id === id);

      if (!category) {
        throw new Error(`Categoria com ID ${id} não encontrada!`);
      }

      return { success: true, category };
    } catch (error) {
      console.error('❌ Erro ao buscar categoria:', error.message);
      throw error;
    }
  }

  // Deletar categoria
  async deleteCategory(id) {
    try {
      const categories = await this.getAllCategories();
      const categoryIndex = categories.findIndex((c) => c.id === id);

      if (categoryIndex === -1) {
        throw new Error(`Categoria com ID ${id} não encontrada!`);
      }

      const [deletedCategory] = categories.splice(categoryIndex, 1);
      await this.fileHelper.writeJSON(this.datapath, categories);

      console.log(`✅ Categoria "${deletedCategory.name}" deletada!`);
      return { success: true, deletedCategory };
    } catch (error) {
      console.error('❌ Erro ao deletar categoria:', error.message);
      throw error;
    }
  }
}

module.exports = CategoryController;