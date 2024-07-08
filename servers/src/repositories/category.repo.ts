import DataConnect from "../utils/DataConnect";

const CategoryRepo = {
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

  // CREATE PROCEDURE delete_category
};

export default CategoryRepo;
