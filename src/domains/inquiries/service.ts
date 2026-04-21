import { QuoteStatus } from '@prisma/client';
import { prisma } from '@/lib/prisma';

export async function createInquiry(payload: any) {
  return prisma.inquiry.create({ data: payload });
}

export async function createQuote(payload: any) {
  const client = await prisma.client.upsert({
    where: { email: payload.email },
    update: { name: payload.name, phone: payload.phone, company: payload.company },
    create: { name: payload.name, email: payload.email, phone: payload.phone, company: payload.company },
  });

  return prisma.quoteRequest.create({
    data: {
      clientId: client.id,
      serviceType: payload.serviceType,
      budgetMin: payload.budgetMin,
      budgetMax: payload.budgetMax,
      timeline: payload.timeline,
      requirements: payload.requirements,
      status: QuoteStatus.NEW,
    },
  });
}

const transitions: Record<QuoteStatus, QuoteStatus[]> = {
  NEW: ['REVIEWED'],
  REVIEWED: ['QUOTED'],
  QUOTED: ['APPROVED'],
  APPROVED: [],
};

export async function updateQuoteStatus(id: string, status: QuoteStatus) {
  const existing = await prisma.quoteRequest.findUniqueOrThrow({ where: { id } });
  if (!transitions[existing.status].includes(status)) {
    throw new Error(`Invalid transition from ${existing.status} to ${status}`);
  }
  return prisma.quoteRequest.update({ where: { id }, data: { status } });
}
