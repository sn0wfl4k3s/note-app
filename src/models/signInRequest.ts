export interface SignInRequest {
    email: string
    accessKey: string
    grantType: 'password' | 'refresh_token'
}