import DataConnect from "../utils/DataConnect";
import _ from "lodash";
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
  // 43. Select Cart
  async selectCart(cartID: number) {
    try {
      const query = `SELECT ca.CartID,cd.CartDetailID,co.CourseID,co.Title,co.Subtitle, u.UserName as [InstructorName],
                      co.Price,co.[Image],co.CreateTime,co.[Status] from CartDetail cd
                      JOIN Cart ca on ca.CartID = cd.CartID
                      join [Course] co on co.CourseID = cd.CourseID
                      JOIN [Instructor] i on co.InstructorID = i.InstructorID
                      JOIN [Student] s on s.StudentID = ca.StudentID
                      join [User] u on u.UserID = i.UserID 
                      where s.StudentID = @cartID`;
      const params = {
        cartID,
      };
      const data = await DataConnect.executeWithParams(query, params);

      const groupedData = _.chain(data)
        .groupBy("CartID")
        .map((value, key) => ({
          CartID: parseInt(key),
          CartStatus: value[0].CartStatus,
          Details: value.map((detail) => ({
            CartDetailID: detail.CartDetailID,
            CourseID: detail.CourseID,
            Title: detail.Title,
            Subtitle: detail.Subtitle,
            InstructorName: detail.InstructorName,
            Price: detail.Price,
            Image: detail.Image,
            CreateTime: detail.CreateTime,
            Status: detail.Status,
          })),
        }))
        .value();
      return groupedData.length > 0 ? groupedData[0] : null;
    } catch (error: any) {
      throw new Error(`Error selecting cart: ${error.message}`);
    }
  },
};

export default CartRepo;
