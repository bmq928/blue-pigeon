import { Type } from 'class-transformer'
import { IsEnum, IsInt, IsNumber, Max, Min } from 'class-validator'

/* eslint-disable @typescript-eslint/no-inferrable-types */
export enum SortEnum {
  ASC = 'asc',
  DESC = 'desc',
}

export class PaginatedQueryDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsNumber()
  page: number = 1

  @Type(() => Number)
  @IsInt()
  @Max(100)
  @Min(1)
  perPage: number = 10

  @IsEnum(SortEnum)
  sort: SortEnum = SortEnum.DESC

  @IsEnum(['createdAt', 'updatedAt'])
  sortBy: string = 'createdAt'
}

export class PageInfo extends PaginatedQueryDto {
  total: number
}

export abstract class PaginatedResponse<T> {
  pageInfo: PageInfo

  abstract data: T[]
}
