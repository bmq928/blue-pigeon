import { Exclude } from 'class-transformer'
import { UserCredential } from './entities'
import { UserProfile } from './entities/user-profile.entity'
import { User } from './entities/user.entity'

export class UserCredentialResponse implements UserCredential {
  @Exclude()
  password: string
  email: string
  createdAt: Date
  updatedAt: Date
}

export class UserResponse implements User {
  _id: string
  credential: UserCredentialResponse
  profile: UserProfile
}

export class UserAuthTokenResponse {
  accessToken: string
}

export class UserRegisterResponse {
  message: string
}
