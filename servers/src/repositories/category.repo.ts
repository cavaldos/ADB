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
}

export default CategoryRepo;