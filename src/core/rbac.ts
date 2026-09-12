export const ROLES = ["SUPER_ADMIN", "ADMIN", "MANAGER", "STAFF", "CLIENT", "SUPPORT", "SALES", "READ_ONLY"] as const;
export type Role = (typeof ROLES)[number];

const matrix: Record<string, Record<string, string[]>> = {
  "pos.products": { ADMIN: ["c", "r", "u", "d", "x"], MANAGER: ["c", "r", "u", "x"], STAFF: ["c", "r", "u"], CLIENT: ["r", "c"], READ_ONLY: ["r"] },
  "pos.sales": { ADMIN: ["c", "r", "u", "d", "x"], MANAGER: ["c", "r", "u", "x"], STAFF: ["c", "r", "u"], CLIENT: ["r", "c"], READ_ONLY: ["r"] },
  "admin.tenants": { SUPER_ADMIN: ["c", "r", "u", "d", "x"] },
};

export function can(role: Role, resource: string, action: string): boolean {
  const row = matrix[resource];
  if (!row) return false;
  const allowed = row[role] ?? [];
  const code = ({ create: "c", read: "r", update: "u", delete: "d", export: "x" } as any)[action];
  return allowed.includes(code) || role === "SUPER_ADMIN";
}