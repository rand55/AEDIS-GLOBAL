export type Account = { id: string; email: string; fullName: string; role: "registrant" | "reviewer" | "admin" };
export type DocumentRecord = { id: string; category: string; originalName: string; mediaType: string; byteSize: number; sha256: string; scanStatus: string; createdAt: string };
export type Registration = {
  id: string; legalName: string; sector: string; organizationType: string; country: string;
  region: string; city: string; contactEmail: string; summary: string; status: string;
  version: number; publicId?: string | null; reviewerRecommendation?: "approve" | "changes_requested" | "reject" | null;
  reviewerId?: string | null; reviewedAt?: string | null; createdAt: string; updatedAt: string; documents: DocumentRecord[];
  ownerEmail?: string;
};
