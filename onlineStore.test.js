const expect = require('chai').expect;
const assert = require('chai').assert;
const onlineStore = require('./onlineStore.js');


describe("onlineStore", () => {
    describe("isProductAvailable", () => {
        it("should throw error for invalid input", () => {
            expect(() => { onlineStore.isProductAvailable(10, "Meat") }).to.throw('Invalid input.')
            expect(() => { onlineStore.isProductAvailable("Meat", "meat") }).to.throw('Invalid input.')
            expect(() => { onlineStore.isProductAvailable(50, 50) }).to.throw('Invalid input.')
            expect(() => { onlineStore.isProductAvailable([], []) }).to.throw('Invalid input')
            expect(() => { onlineStore.isProductAvailable({}, {}) }).to.throw('Invalid input')
        })

        it("should return message based on availability of the product", () => {
            expect(onlineStore.isProductAvailable("Meat", 0)).to.equal("Sorry, Meat is currently out of stock.");
            expect(onlineStore.isProductAvailable("Meat", -5)).to.equal("Sorry, Meat is currently out of stock.");
            expect(onlineStore.isProductAvailable("Meat", 5)).to.equal("Great! Meat is available for purchase.");
        })
    })

    describe("canAffordProduct", () => {
        it("should return error for invalid input", () => {
            expect(() => { onlineStore.canAffordProduct("Meat", "meat") }).to.throw('Invalid input.')
            expect(() => { onlineStore.canAffordProduct([], []) }).to.throw('Invalid input.')
            expect(() => { onlineStore.canAffordProduct({}, {}) }).to.throw('Invalid input.')
            expect(() => { onlineStore.canAffordProduct(2, "") }).to.throw('Invalid input.')
            expect(() => { onlineStore.canAffordProduct("", 2) }).to.throw('Invalid input.')
        })

        it("should return appropriate message based on balance", () => {
            expect(onlineStore.canAffordProduct(30, 40)).to.equal("Product purchased. Your remaining balance is $10.")
            expect(onlineStore.canAffordProduct(20, 10)).to.equal("You don't have sufficient funds to buy this product.")
            expect(onlineStore.canAffordProduct(20, 20)).to.equal("Product purchased. Your remaining balance is $0.")
        })
    })

    describe("getRecommendedProducts", () => {
        it("should throw error for invalid input", () => {
            expect(() => { onlineStore.getRecommendedProducts("", 2) }).to.throw('Invalid input.')
            expect(() => { onlineStore.getRecommendedProducts(2, 2) }).to.throw('Invalid input.')
            expect(() => { onlineStore.getRecommendedProducts(2, "") }).to.throw('Invalid input.')
            expect(() => { onlineStore.getRecommendedProducts([], 2) }).to.throw('Invalid input.')
            expect(() => { onlineStore.getRecommendedProducts([], {}) }).to.throw('Invalid input.')
            expect(() => { onlineStore.getRecommendedProducts([], []) }).to.throw('Invalid input.')
            expect(() => { onlineStore.getRecommendedProducts({}, 2) }).to.throw('Invalid input.')
            expect(() => { onlineStore.getRecommendedProducts({}, "") }).to.throw('Invalid input.')
            expect(() => { onlineStore.getRecommendedProducts({}, []) }).to.throw('Invalid input.')
            expect(() => { onlineStore.getRecommendedProducts("", "") }).to.throw('Invalid input.')
            expect(() => { onlineStore.getRecommendedProducts("", {}) }).to.throw('Invalid input.')
            expect(() => { onlineStore.getRecommendedProducts("", []) }).to.throw('Invalid input.')
        })

        it("should add info to recommended products array", () => {
            expect(onlineStore.getRecommendedProducts([{name: "Camera", category: "Photography"}], "Photography")).to.equal("Recommended products in the Photography category: Camera")
            expect(onlineStore.getRecommendedProducts([{name: "Camera", category: "Photography"}], "Decoration")).to.equal("Sorry, we currently have no recommended products in the Decoration category.")
           
        })
    })

})

/*getRecommendedProducts(productList, category) {
      let recommendedProducts = [];
  
      if (!Array.isArray(productList) || typeof category !== "string") {
        throw new Error("Invalid input.");
      }
  
      productList.forEach((product) => {
        if (product.category === category) {
          recommendedProducts.push(product.name);
        }
      });
  
      if (recommendedProducts.length === 0) {
        return `Sorry, we currently have no recommended products in the ${category} category.`;
      } else {
        return `Recommended products in the ${category} category: ${recommendedProducts.join(", ")}`;
      }
    },
  };*/