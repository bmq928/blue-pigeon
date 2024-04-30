import { Exclude } from 'class-transformer'
import { UserCredential } from './entities'
import { UserProfile } from './entities/user-profile.entity'
import { User } from './entities/user.entity'

export class UserCredentialResponse implements UserCredential {
  email: string

  @Exclude()
  password: string

  createdAt: Date

  updatedAt: Date
}

export class UserResponse implements User {
  _id: string
  credential: UserCredentialResponse
  profile?: UserProfile
}

export class UserAuthTokenResponse {
  accessToken: string
}
