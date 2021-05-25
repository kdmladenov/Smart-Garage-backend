import UsersData from '../models/UsersData';
import errors from '../common/service-errors.js';
import { InvoiceData } from '../models/InvoicesData';
import { VisitsData } from '../models/VisitsData';
import rolesEnum from '../common/roles.enum.js';

const getById = (invoicesData: InvoiceData) => async (invoiceId: number, loggedUserId: number, role: string) => {
  const existingInvoice = await invoicesData.getBy('invoice_id', invoiceId);

  if (!existingInvoice) {
    return {
      error: errors.RECORD_NOT_FOUND,
      result: null,
    };
  }

  if (existingInvoice.userId !== loggedUserId && role !== rolesEnum.employee) {
    return {
      error: errors.OPERATION_NOT_PERMITTED,
      result: null,
    };
  }

  return {
    error: null,
    result: existingInvoice,
  };
};

const getAllInvoices = (invoicesData: InvoiceData, usersData: UsersData, visitsData: VisitsData) => async (
  userId: number,
  visitId: number,
  dateRangeLow: string,
  dateRangeHigh: string,
  loggedUserId: number,
  role: string,
) => {
  if (userId !== loggedUserId && role !== rolesEnum.employee) {
    return {
      error: errors.OPERATION_NOT_PERMITTED,
      result: null,
    };
  }

  if (userId) {
    const existingUser = await usersData.getBy('user_id', userId);
    if (!existingUser) {
      return {
        error: errors.RECORD_NOT_FOUND,
        result: null,
      };
    }
  }
  if (visitId) {
    const existingVisit = await visitsData.getVisitBy('visit_id', visitId);
    if (!existingVisit) {
      return {
        error: errors.RECORD_NOT_FOUND,
        result: null,
      };
    }
  }

  const invoices = await invoicesData.getAll(userId, visitId, dateRangeLow, dateRangeHigh);

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
