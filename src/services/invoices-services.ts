import errors from "../common/service-errors";
import { InvoiceData } from "../models/InvocesData";

const getById = (invoicesData: InvoiceData) => async (invoiceId: number) => {
  const existingInvoice = await invoicesData.getBy('invoice_id', invoiceId);

  if (!existingInvoice) {
    return {
      error: errors.RECORD_NOT_FOUND,
      result: null,
    };
  }

  return {
    error: null,
    result: existingInvoice,
  };
};

const getAllInvoices = (invoicesData: InvoiceData) => async (userId: number, visitId: number, dateRangeLow: string, dateRangeHigh: string) => {
  const invoices = invoicesData.getBy(userId, visitId, dateRangeLow, dateRangeHigh);

  return {
    error: null,
    result: invoices,
  };
};

const createInvoice = (invoicesData: InvoiceData) => async (visitId: number) => {
  const existingInvoice = await invoicesData.getBy('visit_id', visitId);

  if (existingInvoice) {
    return {
      error: errors.DUPLICATE_RECORD,
      result: null,
    };
  }

  const invoice = await invoicesData.create(visitId);

  return {
    error: null,
    result: invoice,
  };
};

export default {
  getById,
  getAllInvoices,
  createInvoice,
};
