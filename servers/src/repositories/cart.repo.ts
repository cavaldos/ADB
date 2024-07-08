import DataConnect from "../utils/DataConnect";

const CartRepo = {
  // 40. Add to Cart
  async addToCart(studentID: number, courseID: number) {
    try {
      const proc = "add_to_cart";
      const params = {
        StudentID: studentID,
        CourseID: courseID,
      };
      return await DataConnect.executeProcedure(proc, params);
    } catch (error: any) {
      throw new Error(`Error adding to cart: ${error.message}`);
    }
  },

  // 41. Update Cart
  async updateCart(cartID: number, cartStatus: string) {
    try {
      const proc = "update_cart";
      const params = {
        CartID: cartID,
        CartStatus: cartStatus,
      };
      return await DataConnect.executeProcedure(proc, params);
    } catch (error: any) {
      throw new Error(`Error updating cart: ${error.message}`);
    }
  },

  // 42. Remove Cart Detail
  async removeCartDetail(cartID: number, courseID: number) {
    try {
      const proc = "remove_cart_detail";
      const params = {
        CartID: cartID,
        CourseID: courseID,
      };
      return await DataConnect.executeProcedure(proc, params);
    } catch (error: any) {
      throw new Error(`Error removing cart detail: ${error.message}`);
    }
  },
};

export default CartRepo;
