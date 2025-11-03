// src/models/product.js

// PASSO 1: Criamos a "classe" (o molde)
class Product {

  // PASSO 2: O "constructor" é como preencher a fichinha
  constructor(id, name, description, price, categoryId, imageUrl) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.categoryId = categoryId;
    this.imageUrl = imageUrl;

    // PASSO 3: O construtor preenche algumas coisas sozinho
    this.available = true;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  // PASSO 4: Função útil para trabalhar com o produto
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      price: this.price,
      categoryId: this.categoryId,
      imageUrl: this.imageUrl,
      available: this.available,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  // Função para mudar informações do produto
  update(newData) {
    if (newData.name) this.name = newData.name;
    if (newData.description) this.description = newData.description;
    if (newData.price) this.price = newData.price;
    if (newData.categoryId) this.categoryId = newData.categoryId;
    if (newData.imageUrl) this.imageUrl = newData.imageUrl;
    if (newData.available !== undefined) this.available = newData.available;

    this.updatedAt = new Date();
  }

  // Função para mostrar o preço bonitinho
  getFormattedPrice() {
    return `R$ ${this.price.toFixed(2).replace('.', ',')}`;
  }

  // Função para ver se o produto está disponível
  isAvailable() {
    return this.available === true;
  }
}

// PASSO 5: Deixa outros arquivos usarem esta "fichinha"
module.exports = Product;