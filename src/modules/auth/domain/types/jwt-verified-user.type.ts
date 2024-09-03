export interface JwtVerifiedUserType {
  sub: number
  username: string
  iat: number
  exp: number
}