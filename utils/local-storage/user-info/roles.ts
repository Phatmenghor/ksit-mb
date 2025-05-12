import { deleteCookie, getCookie, setCookie } from "cookies-next";

/**
 * Store user roles in a cookie.
 * @param roles Array of roles (e.g., ['admin', 'editor'])
 */
export function storeRoles(roles: string[]): void {
  if (typeof window === "undefined") return;
  setCookie("user-roles", JSON.stringify(roles));
}

/**
 * Get user roles from cookie.
 * @returns Array of roles
 */
export function getRoles(): string[] {
  const rolesStr = getCookie("user-roles");
  try {
    return rolesStr ? JSON.parse(rolesStr as string) : [];
  } catch {
    return [];
  }
}

/**
 * Check if user has a specific role.
 * @param role The role to check (e.g., 'admin')
 * @returns Boolean indicating whether the role is present
 */
export function hasRole(role: string): boolean {
  const roles = getRoles();
  return roles.includes(role);
}

/**
 * Remove stored user roles.
 */
export function clearRoles(): void {
  deleteCookie("user-roles");
}
