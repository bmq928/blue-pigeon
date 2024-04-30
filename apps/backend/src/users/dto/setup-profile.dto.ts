import { IsEnum, IsOptional, IsString } from 'class-validator'
import {
  FavSport,
  FavSportPersonality,
  FavSportTeam,
  UserProfile,
} from '../entities/user-profile.entity'

export class SetupProfileDto implements Partial<UserProfile> {
  @IsString()
  @IsOptional()
  firstName?: string

  @IsString()
  @IsOptional()
  lastName?: string

  @IsEnum(FavSport)
  favSport: FavSport

  @IsEnum(FavSportPersonality)
  favSportPersonality: FavSportPersonality

  @IsEnum(FavSportTeam)
  favSportTeam?: FavSportTeam
}
