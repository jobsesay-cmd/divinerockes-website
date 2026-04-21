import { z } from 'zod';

export const reportExportSchema = z.object({
  reportType: z.enum(['inquiries', 'quotes', 'projects', 'news', 'audit_logs']),
  format: z.enum(['csv', 'json']),
  dateFrom: z.coerce.date().optional(),
  dateTo: z.coerce.date().optional(),
});
