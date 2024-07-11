import DataConnect from "../utils/DataConnect";
import GenDiscountCode from "../utils/GenCode";
const CategoryRepo = {
  //1. Get all categories
  async getAllCategory() {
    try {
      const query = `SELECT * FROM Category;`;
      return await DataConnect.execute(query);
    } catch (error: any) {
      throw new Error(`Error fetching categories: ${error.message}`);
    }
  },
  async getCategoryById(id: number) {
    try {
      const query = `SELECT * FROM Category WHERE CategoryID = @id;`;
      return await DataConnect.executeWithParams(query, { id });
    } catch (error: any) {
      throw new Error(`Error fetching category: ${error.message}`);
    }
  },
  // 2. create category
  async createCategory(
    name: string,
    description: string,
    parentCategoryID?: any
  ) {
    try {
      //const query = `EXEC create_category @CategoryName = @name, @CategoryDescription = @description, @ParentCategoryID = @parentCategoryID;`;
      const proc = "create_category";
      const params = {
        CategoryName: name,
        CategoryDescription: description,
        ParentCategoryID: parentCategoryID || null,
      };

      return await DataConnect.executeProcedure(proc, params);
    } catch (error: any) {
      throw new Error(`Error creating category: ${error.message}`);
    }
  },
  //   CREATE PROCEDURE update_category
  //     @CategoryID integer,
  //     @Name varchar(20) = NULL,
  //     @CategoryDescription nvarchar(500) = NULL,
  //     @ParentCategoryID integer
  // AS
  // 3. update category
  async updateCategory(
    CategoryID: number,
    CategoryName: string,
    CategoryDescription: string,
    ParentCategoryID: number
  ) {
    try {
      const proc = "update_category";
      const params = {
        CategoryID,
        CategoryName,
        CategoryDescription,
        ParentCategoryID,
      };
      return await DataConnect.executeProcedure(proc, params);
    } catch (error: any) {
      throw new Error(`Error updating category: ${error.message}`);
    }
  },
  //4. delete_category
  async deleteCategory(categoryID: number) {
    try {
      const proc = "delete_category";
      const params = {
        CategoryID: categoryID,
      };
      return await DataConnect.executeProcedure(proc, params);
    } catch (error: any) {
      throw new Error(`Error deleting category: ${error.message}`);
    }
  },

  //5. create Discount
  async createDiscount(
    percentage: number,
    quantity: number,
    courseID: number,
    expiryDate: string
  ) {
    const code = GenDiscountCode();
    try {
      const proc = "create_discount";
      const params = {
        Code: code,
        Percentage: percentage,
        Quantity: quantity,
        CourseID: courseID,
        ExpiryDate: expiryDate,
      };
      return await DataConnect.executeProcedure(proc, params);
    } catch (error: any) {
      throw new Error(`Error creating discount: ${error.message}`);
    }
  },

  //6. update discount
  async updateDiscount(
    discountID: number,
    percentage: number,
    quantity: number,
    expiryDate: string
  ) {
    try {
      const proc = "update_discount";
      const params = {
        DiscountID: discountID,
        Percentage: percentage,
        Quantity: quantity,
        ExpiryDate: expiryDate,
      };
      return await DataConnect.executeProcedure(proc, params);
    } catch (error: any) {
      throw new Error(`Error updating discount: ${error.message}`);
    }
  },
  //7. delete discount
  async deleteDiscount(discountID: number) {
    try {
      const proc = "delete_discount";
      const params = {
        DiscountID: discountID,
      };
      return await DataConnect.executeProcedure(proc, params);
    } catch (error: any) {
      throw new Error(`Error deleting discount: ${error.message}`);
    }
  },
};

export default CategoryRepo;
