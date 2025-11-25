export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false
  return !!sessionStorage.getItem("auth_token")
}

export function getAuthUser(): string | null {
  if (typeof window === "undefined") return null
  return sessionStorage.getItem("auth_user")
}

export function logout(): void {
  if (typeof window === "undefined") return
  sessionStorage.removeItem("auth_token")
  sessionStorage.removeItem("auth_user")
}
