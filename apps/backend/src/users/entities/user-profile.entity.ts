import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

export type UserProfileDocument = UserProfile & Document

export enum FavSport {
  Football = 'Football',
  Cricket = 'Cricket',
  Hockey = 'Hockey',
  Tennis = 'Tennis',
  Volleyball = 'Volleyball',
  TableTennis = 'Table Tennis',
  Basketball = 'Basketball',
  Baseball = 'Baseball',
  Rugby = 'Rugby',
  Golf = 'Golf',
}

export enum FavSportTeam {
  ManchesterUnited = 'Manchester United',
  LiverpoolFC = 'Liverpool FC',
  PortlandTrailBlazers = 'Portland Trail Blazers',
  NewYorkRangers = 'NewYork Rangers',
  ChicagoBlackhawks = 'Chicago Blackhawks',
  PhiladelphiaEagles = 'Philadelphia Eagles',
  TexasRangers = 'Texas Rangers',
  ChelseaFC = 'Chelsea FC',
  SanFranciscoGiants = 'San Francisco Giants',
  DallasMavericks = 'Dallas Mavericks',
  AtlantaBraves = 'Atlanta Braves',
  NewEnglandPatriots = 'New England Patriots',
  BayernMunich = 'Bayern Munich',
  ChicagoBulls = 'Chicago Bulls',
}

export enum FavSportPersonality {
  Messi = 'Messi',
  Ronaldo = 'Ronaldo',
  RogerFederer = 'Roger Federer',
  SerenaWiliams = 'Serena Wiliams',
  MichaelJordan = 'Michael Jordan',
  LebronJames = 'Lebron James',
  JohnCena = 'John Cena',
  Pele = 'Pele',
  Neymar = 'Neymar',
  MagicJohnson = 'Magic Johnson',
}

@Schema({ _id: false, timestamps: true })
export class UserProfile {
  @Prop()
  firstName: string

  @Prop()
  lastName: string

  @Prop({ enum: FavSport })
  favSport?: FavSport

  @Prop({ enum: FavSportPersonality })
  favSportPersonality?: FavSportPersonality

  @Prop({ enum: FavSportTeam })
  favSportTeam?: FavSportTeam

  @Prop()
  createdAt?: Date

  @Prop()
  updatedAt?: Date
}

export const UserProfileSchema = SchemaFactory.createForClass(UserProfile)
