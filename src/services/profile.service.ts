import type { Prisma, Profile} from "../generated"
import type { IProfileRepository } from "../repository/profile.repository"

interface FindAllParams {
  page: number
  limit: number
  search?: {
    name?: string,
    gender?: string,
    address?: string,
    profile_picture_url?: string
  }
  sortBy?: string
  sortOrder?: "asc" | "desc"
}

export interface ProfileListRespone{
    profile:Profile[], 
    total: number, 
    totalPages: number, 
    currentPage: number 
}
export interface IProfileService {
  getAll(params: FindAllParams) : Promise <ProfileListRespone>
  getProfileById (id: string): Promise<Profile | null>;
  createProfile(data: {name: string, gender: string, address: string, profile_picture_url: string,  userId: number }): Promise<Profile> 
  updateProfile(id: string, data: Partial<Profile>) : Promise <Profile>
  deleteProfile(id: string) : Promise<Profile>
  exec(): Promise<{ overview: any, byCategory: any}>
}

export class ProfileService implements IProfileService { 
    constructor (private profileRepo: IProfileRepository) {}

       async getAll (params: FindAllParams) : Promise<ProfileListRespone>  {
    const { page, limit, search, sortBy, sortOrder} = params

    const skip = (page - 1 ) * limit
    
    const whereClause : Prisma.ProfileWhereInput = {
      deletedAt : null
    }

    if (search?.name){whereClause.name = { contains: search.name, mode: "insensitive"}}
    if (search?.gender){whereClause.gender = { contains: search.gender, mode: "insensitive"}}

    const sortCriteria :  Prisma.ProfileOrderByWithRelationInput = sortBy ? { [sortBy] : sortOrder || "desc" } : {createdAt: "desc"}

    const profile = await this.profileRepo.list(skip, limit, whereClause, sortCriteria)
    
    const total = await this.profileRepo.countAll(whereClause)


    return { 
      profile,
      total, 
      totalPages: Math.ceil( total/limit), 
      currentPage: page }
}


  async getProfileById (id: string): Promise<Profile | null>{  
const numId = parseInt (id)


const profile = await this.profileRepo.findById(numId)
    if (!profile) {
     throw new Error ('Profile tidak ditemukan')
    }

return profile
}


    async createProfile(data: {name: string, gender: string, address: string, profile_picture_url: string, userId: number }): Promise<Profile> {
    return await this.profileRepo.create({
        ...data,
        user: { connect: { id: data.userId } }
    });
}


    async updateProfile  (id: string, data : Partial<Profile>) : Promise<Profile>  {
  await this.getProfileById(id)

  const numId = parseInt(id)

  return await this.profileRepo.update(numId, data)
}

    async deleteProfile  (id: string)  {
const numId = parseInt (id)

    return await this.profileRepo.softDelete(numId)
}

    async exec() {
    const stats = await this.profileRepo.getStats()
    const CategoryStats = await this.profileRepo.getByCategoryStats()

    return {
      overview: stats,
      byCategory: CategoryStats
    }
  }
}