import DataConnect from "../utils/DataConnect";


const InvoiceRepo = {
    //1. create invoice
    async createInvoice(
        invoiceID: number,
        invoiceDate: string,
        invoiceTotal: number,
        invoiceStatus: string,
        userID: number
    ) {
        try {
            const proc = "create_invoice";
            const params = {
                InvoiceID: invoiceID,
                InvoiceDate: invoiceDate,
                InvoiceTotal: invoiceTotal,
                InvoiceStatus: invoiceStatus,
                UserID: userID,
            };
            return await DataConnect.executeProcedure(proc, params);
        } catch (error: any) {
            throw new Error(`Error creating invoice: ${error.message}`);
        }
    },

    //3. add invoice Detail
    async addInvoiceDetail(
        invoiceID: number,
        courseID: number,
        coursePrice: number
    ) {
        try {
            const proc = "add_invoice_detail";
            const params = {
                InvoiceID: invoiceID,
                CourseID: courseID,
                CoursePrice: coursePrice,
            };
            return await DataConnect.executeProcedure(proc, params);
        } catch (error: any) {
            throw new Error(`Error adding invoice detail: ${error.message}`);
        }
    },

}
export  default InvoiceRepo;