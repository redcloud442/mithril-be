import prisma from "../../utils/prisma.js";

export const RankModelPost = async (memberId: string) => {
  const referralData = await prisma.company_referral_table.findUnique({
    where: {
      company_referral_member_id: memberId,
    },
    select: {
      company_referral_from_member_id: true,
    },
  });

  const fromMemberId = referralData?.company_referral_from_member_id;
  if (!fromMemberId) return 0;

  const { direct_referral_count } =
    await prisma.dashboard_earnings_summary.findUniqueOrThrow({
      where: { member_id: fromMemberId },
      select: { direct_referral_count: true },
    });

  const newRank = await prisma.company_rank_table.findFirst({
    where: {
      company_rank_requirement: { lte: direct_referral_count },
    },
    orderBy: {
      company_rank_requirement: "asc",
    },
    select: {
      company_rank_id: true,
      company_rank_name: true,
      company_rank_reward: true,
      company_rank_requirement: true,
    },
  });

  if (!newRank) return null;

  const currentRankMember = await prisma.company_rank_member_table.findFirst({
    where: {
      company_rank_member_member_id: memberId,
    },
    select: {
      company_rank_member_rank_id: true,
      company_rank_table: {
        select: {
          company_rank_requirement: true,
        },
      },
    },
  });

  const currentRequirement =
    currentRankMember?.company_rank_table?.company_rank_requirement ?? 0;

  if (currentRequirement >= newRank.company_rank_requirement) return null;

  await prisma.$transaction([
    prisma.company_earnings_table.update({
      where: { company_earnings_member_id: memberId },
      data: {
        company_referral_earnings: {
          increment: newRank.company_rank_reward || 0,
        },
        company_combined_earnings: {
          increment: newRank.company_rank_reward || 0,
        },
      },
    }),

    // Create rank transaction
    prisma.company_transaction_table.create({
      data: {
        company_transaction_member_id: memberId,
        company_transaction_type: "RANK",
        company_transaction_amount: newRank.company_rank_reward || 0,
        company_transaction_description: `Rank ${newRank.company_rank_name}`,
        company_transaction_details: `Rank ${newRank.company_rank_name}`,
      },
    }),

    prisma.company_rank_member_table.upsert({
      where: {
        company_rank_member_id: memberId,
      },
      update: {
        company_rank_member_rank_id: newRank.company_rank_id,
        company_rank_member_date_created: new Date(),
      },
      create: {
        company_rank_member_member_id: memberId,
        company_rank_member_rank_id: newRank.company_rank_id,
      },
    }),
  ]);

  return newRank;
};
