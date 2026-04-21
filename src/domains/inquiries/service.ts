import { QuoteStatus } from '@prisma/client';
import { prisma } from '@/lib/prisma';

export async function createInquiry(payload: any) {
  return prisma.inquiry.create({ data: payload });
}

export async function createQuote(payload: any) {
  const existingClient = await prisma.client.findFirst({ where: { email: payload.email } });
  const client = existingClient
    ? await prisma.client.update({
        where: { id: existingClient.id },
        data: { name: payload.name, phone: payload.phone, company: payload.company },
      })
    : await prisma.client.create({
        data: { name: payload.name, email: payload.email, phone: payload.phone, company: payload.company },
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
