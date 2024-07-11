import DataConnect from "../utils/DataConnect";

const InvoiceRepo = {
  //1. create invoice
  async createInvoice(studentID: number, transferID: number) {
    try {
      const proc = "create_invoice";
      const params = {
        StudentID: studentID,
        TransferID: transferID,
      };
      return await DataConnect.executeProcedure(proc, params);
    } catch (error: any) {
      throw new Error(`Error creating invoice: ${error.message}`);
    }
  },

  //2. add invoice Detail
  async addInvoiceDetail(
    invoiceID: number,
    discountCode: string,
    courseID: number
  ) {
    try {
      const proc = "add_invoice_detail";
      const params = {
        InvoiceID: invoiceID,
        DiscountCode: discountCode,
        CourseID: courseID,
      };
      return await DataConnect.executeProcedure(proc, params);
    } catch (error: any) {
      throw new Error(`Error adding invoice detail: ${error.message}`);
    }
  },
  //3. Update total amount
  async updateTotalAmount(invoiceID: number) {
    try {
      const proc = "update_total_amount";
      const params = {
        InvoiceID: invoiceID,
      };
      return await DataConnect.executeProcedure(proc, params);
    } catch (error: any) {
      throw new Error(`Error updating total amount: ${error.message}`);
    }
  },
};
export default InvoiceRepo;
