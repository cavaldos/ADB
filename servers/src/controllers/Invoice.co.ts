import { Request, Response } from "express";

const InvoiceController = {
  async createInvoice(req: Request, res: Response) {
    try {
      const { name, price, description } = req.body;
      console.log(name, price, description);
      return res.status(201).json("invoice created");
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  },
  async getAllInvoices(req: Request, res: Response) {
    try {
      console.log("getInvoices");
      const id = req.query.id;
      console.log(id);
      return res.status(200).json("getInvoices");
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  },
  async getInvoice(req: Request, res: Response) {
    try {
      const { id } = req.params;
      console.log(id);
      return res.status(200).json("invoice");
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  },
  async updateInvoice(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, price, description } = req.body;
      console.log(id, name, price, description);
      return res.status(200).json("invoice");
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  },
  async deleteInvoice(req: Request, res: Response) {
    try {
      const { id } = req.params;
      console.log(id);
      return res.status(204).json("");
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  },
  async getInvoiceByCustomerID(req: Request, res: Response) {
    try {
      const { id } = req.params;
      console.log(id);
      return res.status(200).json("invoice");
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  },
  async confirmInvoice(req: Request, res: Response) {
    try {
      const { id } = req.params;
      console.log(id);
      return res.status(200).json("invoice confirmed");
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  },
  async updateInvoiceStatus(req: Request, res: Response) {
    try {
      const { id } = req.params;
      console.log(id);
      return res.status(200).json("invoice status updated");
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
    },
    async addInvoiceDetail(req: Request, res: Response) {
        try {
            const { id } = req.params;
            console.log(id);
            return res.status(200).json("invoice detail added");
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }
    ,
    async updateInvoiceDetail(req: Request, res: Response) {
        try {
            const { id } = req.params;
            console.log(id);
            return res.status(200).json("invoice detail updated");
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }
};


export default InvoiceController;