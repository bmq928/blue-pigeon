import { Exclude, Type, TypeHelpOptions } from 'class-transformer'
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
  createdAt: Date
  updatedAt: Date
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

  // @Transform(({ value }) =>
  //   value.map((i) =>
  //     i instanceof SchemaTypes.Types.ObjectId
  //       ? { ...value, __type: 'ObjectId' }
  //       : { ...value, __type: 'UserResponse' },
  //   ),
  // )
  // @Type(() => UserResponse, {
  //   discriminator: {
  //     property: '__type',
  //     subTypes: [
  //       { value: UserResponse, name: 'UserResponse' },
  //       { value: String, name: 'ObjectId' },
  //     ],
  //   },
  //   keepDiscriminatorProperty: false,
  // })
  @Type(({ object, property }: TypeHelpOptions) =>
    object[property]?.[0]?.createdAt ? UserResponse : String,
  )
  friends?: UserResponse[] | string[]

  friendRequests: string[]
}

export class UserAuthTokenResponse {
  accessToken: string
}

export class UserRegisterResponse {
  message: string
}
