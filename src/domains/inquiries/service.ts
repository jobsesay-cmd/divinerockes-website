import { QuoteStatus, type Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';

type ListQuotesParams = {
  query?: string;
  includeArchived?: boolean;
  page?: number;
  pageSize?: number;
};

type ListInquiriesParams = {
  query?: string;
  includeArchived?: boolean;
  page?: number;
  pageSize?: number;
};

const transitions: Record<QuoteStatus, QuoteStatus[]> = {
  NEW: [QuoteStatus.REVIEWED],
  REVIEWED: [QuoteStatus.NEW, QuoteStatus.QUOTED],
  QUOTED: [QuoteStatus.REVIEWED, QuoteStatus.APPROVED],
  APPROVED: [QuoteStatus.QUOTED],
};

export async function createInquiry(payload: Prisma.InquiryCreateInput) {
  return prisma.inquiry.create({ data: payload });
}

export async function createQuote(payload: {
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  serviceType: string;
  budgetMin?: Prisma.Decimal | number | string | null;
  budgetMax?: Prisma.Decimal | number | string | null;
  timeline?: string | null;
  requirements: string;
}) {
  const existingClient = await prisma.client.findFirst({
    where: { email: payload.email },
  });

  const client = existingClient
    ? await prisma.client.update({
        where: { id: existingClient.id },
        data: {
          name: payload.name,
          phone: payload.phone ?? null,
          company: payload.company ?? null,
        },
      })
    : await prisma.client.create({
        data: {
          name: payload.name,
          email: payload.email,
          phone: payload.phone ?? null,
          company: payload.company ?? null,
        },
      });

  return prisma.quoteRequest.create({
    data: {
      clientId: client.id,
      serviceType: payload.serviceType,
      budgetMin: payload.budgetMin ?? null,
      budgetMax: payload.budgetMax ?? null,
      timeline: payload.timeline ?? null,
      requirements: payload.requirements,
      status: QuoteStatus.NEW,
    },
  });
}

export async function listQuotes({ query, includeArchived = false, page = 1, pageSize = 20 }: ListQuotesParams = {}) {
  const trimmedQuery = query?.trim();
  const where: Prisma.QuoteRequestWhereInput = {
    ...(includeArchived ? {} : { deletedAt: null }),
    ...(trimmedQuery
      ? {
          OR: [
            { client: { name: { contains: trimmedQuery, mode: 'insensitive' } } },
            { client: { email: { contains: trimmedQuery, mode: 'insensitive' } } },
            { serviceType: { contains: trimmedQuery, mode: 'insensitive' } },
          ],
        }
      : {}),
  };

  const safePage = Math.max(1, page);
  const safePageSize = Math.min(100, Math.max(1, pageSize));

  const [total, items] = await Promise.all([
    prisma.quoteRequest.count({ where }),
    prisma.quoteRequest.findMany({
      where,
      include: { client: true },
      orderBy: { createdAt: 'desc' },
      skip: (safePage - 1) * safePageSize,
      take: safePageSize,
    }),
  ]);

  return { total, items, page: safePage, pageSize: safePageSize };
}

export async function getQuoteById(id: string, includeArchived = true) {
  return prisma.quoteRequest.findFirst({
    where: {
      id,
      ...(includeArchived ? {} : { deletedAt: null }),
    },
    include: { client: true },
  });
}

export async function updateQuoteStatus(id: string, status: QuoteStatus) {
  const existing = await prisma.quoteRequest.findUniqueOrThrow({ where: { id } });
  if (!transitions[existing.status].includes(status)) {
    throw new Error(`Invalid transition from ${existing.status} to ${status}`);
  }
  return prisma.quoteRequest.update({ where: { id }, data: { status } });
}

export async function archiveQuote(id: string) {
  return prisma.quoteRequest.update({
    where: { id },
    data: { deletedAt: new Date() },
  });
}

export async function restoreQuote(id: string) {
  return prisma.quoteRequest.update({
    where: { id },
    data: { deletedAt: null },
  });
}

// ---- Submissions (Inquiry model) exports needed by existing pages/routes ----

export async function listInquiries({ query, includeArchived = false, page = 1, pageSize = 20 }: ListInquiriesParams = {}) {
  const trimmedQuery = query?.trim();
  const where: Prisma.InquiryWhereInput = {
    ...(includeArchived ? {} : { deletedAt: null }),
    ...(trimmedQuery
      ? {
          OR: [
            { name: { contains: trimmedQuery, mode: 'insensitive' } },
            { email: { contains: trimmedQuery, mode: 'insensitive' } },
            { subject: { contains: trimmedQuery, mode: 'insensitive' } },
            { message: { contains: trimmedQuery, mode: 'insensitive' } },
          ],
        }
      : {}),
  };

  const safePage = Math.max(1, page);
  const safePageSize = Math.min(100, Math.max(1, pageSize));

  const [total, items] = await Promise.all([
    prisma.inquiry.count({ where }),
    prisma.inquiry.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (safePage - 1) * safePageSize,
      take: safePageSize,
    }),
  ]);

  return { total, items, page: safePage, pageSize: safePageSize };
}

export async function getInquiryById(id: string, includeArchived = true) {
  return prisma.inquiry.findFirst({
    where: {
      id,
      ...(includeArchived ? {} : { deletedAt: null }),
    },
  });
}

export async function archiveInquiry(id: string) {
  return prisma.inquiry.update({
    where: { id },
    data: { deletedAt: new Date() },
  });
}

export async function restoreInquiry(id: string) {
  return prisma.inquiry.update({
    where: { id },
    data: { deletedAt: null },
  });
}