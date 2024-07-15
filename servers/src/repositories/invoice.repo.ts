import DataConnect from "../utils/DataConnect";
import _ from "lodash";
const InvoiceRepo = {
  //1. create invoice
  async createInvoice(studentID: number, courseID: number) {
    try {
      const proc = "create_invoice";
      const params = {
        StudentID: studentID,
        CourseID: courseID,
      };
      return await DataConnect.executeProcedure(proc, params);
    } catch (error: any) {
      throw new Error(`Error creating invoice: ${error.message}`);
    }
  },

  //2. add invoice Detail
  async applyDiscountCode(discountCode: string, invoiceDetailID: number) {
    try {
      const proc = "apply_discount";
      const params = {
        DiscountCode: discountCode,
        InvoiceDetailID: invoiceDetailID,
      };
      return await DataConnect.executeProcedure(proc, params);
    } catch (error: any) {
      throw new Error(`Error adding invoice detail: ${error.message}`);
    }
  },
  //3. delete_invoice_detail
  async deleteInvoiceDetail(invoiceDetailID: number) {
    try {
      const proc = "delete_invoice_detail";
      const params = {
        InvoiceDetailID: invoiceDetailID,
      };
      return await DataConnect.executeProcedure(proc, params);
    } catch (error: any) {
      throw new Error(`Error updating total amount: ${error.message}`);
    }
  },
  //4. select all invoice details by studentID
  async getInvoiceDetails(invoiceID: number) {
    try {
      const query = `SELECT ivd.InvoiceDetailID, ivd.Price, ivd.DiscountPrice,ivd.CourseID,c.[Image],c.Title,c.Subtitle,c.[Description],d.[Percentage]
                      FROM InvoiceDetail ivd
                      JOIN Invoice iv ON iv.InvoiceID = ivd.InvoiceID
                      LEFT JOIN [Discount] d ON ivd.DiscountID = d.DiscountID
                      JOIN [Course] c ON ivd.CourseID = c.CourseID 
                      where iv.InvoiceID = @invoiceID;`;
      return await DataConnect.executeWithParams(query, { invoiceID });
    } catch (error: any) {
      throw new Error(`Error fetching invoice details: ${error.message}`);
    }
  },
  //get Invoice by studentID
  async getALlInvoiceByStudentID(studentID: number) {
    try {
      const query = `select iv.InvoiceID,iv.InvoiceDate,iv.TotalAmount, iv.TransferID, iv.[Status],
                      t.TransactionTime,t.TransferDescription,
                      u.UserName,u.Address,u.FullName,u.Email,u.Phone
                      from Invoice iv 
                      join Student s on iv.StudentID = s.StudentID
                      join [User] u on s.UserID = u.UserID
                      LEFT JOIN Transfer t ON iv.TransferID = t.TransferID
                      where s.StudentID = @studentID;`;
      const reslut = await DataConnect.executeWithParams(query, { studentID });
      const data = _.groupBy(reslut, "Status");
      return data;
    } catch (error: any) {
      throw new Error(`Error fetching invoice: ${error.message}`);
    }
  },
};
export default InvoiceRepo;
