import { Exclude, Type, TypeHelpOptions } from 'class-transformer'
import { PaginatedResponse } from '../common/dto/paginated.dto'
import { UserCredential } from './entities'
import {
  FavSport,
  FavSportPersonality,
  FavSportTeam,
  UserProfile,
} from './entities/user-profile.entity'
import { User } from './entities/user.entity'

export class UserCredentialResponse implements UserCredential {
  @Exclude()
  password: string
  email: string
}

export class UserProfileResponse implements UserProfile {
  firstName: string
  lastName: string
  favSport?: FavSport
  favSportPersonality?: FavSportPersonality
  favSportTeam?: FavSportTeam
  createdAt?: Date
  updatedAt?: Date
}

export class UserResponse implements User {
  _id: string

  @Type(() => UserCredentialResponse)
  credential: UserCredentialResponse

  @Type(() => UserProfileResponse)
  profile: UserProfile

  @Type(({ object, property }: TypeHelpOptions) =>
    object[property]?.[0]?.createdAt ? UserResponse : String,
  )
  friends?: UserResponse[] | string[]

  friendRequests: string[]
}

export class UsersPaginatedResponse extends PaginatedResponse<UserResponse> {
  @Type(() => UserResponse)
  data: UserResponse[]
}

export class UserAuthTokenResponse {
  accessToken: string
}

export class UserRegisterResponse {
  message: string
}
