import type {  Prisma, PrismaClient, Profile } from "../generated";

export interface IProfileRepository {
    list(
        skip: number,
        take: number,
        where: Prisma.ProfileWhereInput,
        orderBy: Prisma.ProfileOrderByWithRelationInput
    ): Promise<Profile[]>;
    countAll(where: Prisma.ProfileWhereInput): Promise<number>;
    findById(id: number): Promise<Profile | null>;
    create(data: Prisma.ProfileCreateInput): Promise<Profile>;
    update(id: number, data: Prisma.ProfileUpdateInput): Promise<Profile>;
    softDelete(id: number): Promise<Profile>
    findComplex(name: string): Promise<Profile[]>;
        getStats(): Promise<Prisma.GetProfileAggregateType<{
            _count: {
                id: true;
            };
            _min: {
                createdAt: true;
            };
            _max: {
                createdAt: true;
            };
        }>>
        getByCategoryStats(): Promise<(Prisma.PickEnumerable<Prisma.ProfileGroupByOutputType, "name"[]> & {
            _count: {
                id: number;
            };
        })[]>
}

export class ProfileRepository implements IProfileRepository {
    constructor(private prisma: PrismaClient) { }

    async list(
        skip: number,
        take: number,
        where: Prisma.ProfileWhereInput,
        orderBy: Prisma.ProfileOrderByWithRelationInput
    ): Promise<Profile[]> {
        return await this.prisma.profile.findMany({
            skip,
            take,
            where,
            orderBy,
            include: { 
                user: true,
             }
        })
    }

    async countAll(where: Prisma.ProfileWhereInput): Promise<number> {
        return await this.prisma.profile.count({ where })
    }

    async findById(id: number): Promise<Profile | null> {
        return await this.prisma.profile.findUnique({
            where: {
                id,
                deletedAt: null,
            },
            include: {
                user: true,
        
            }
        })
    }

    async create(data: Prisma.ProfileCreateInput): Promise<Profile> {
        return await this.prisma.profile.create({ data })
    }

    async update(id: number, data: Prisma.ProfileUpdateInput): Promise<Profile> {
        return await this.prisma.profile.update({
            where: {
                id,
                deletedAt: null,
            },
            data
        })
    }

    async softDelete(id: number): Promise<Profile> {
        return await this.prisma.profile.update({
            where: {
                id,
                deletedAt: null,
            },
            data: {
                deletedAt: new Date()
            }
        })
    }

    async findComplex(profilename: string) {
  return this.prisma.profile.findMany({
    where: {
      OR: [
        { name: profilename },
      ],
    },
  });
}

    async getStats() {
        return await this.prisma.profile.aggregate ({
            _count: { id: true },          
            _min: { createdAt: true },     
            _max: { createdAt: true }    
        })
    }

    async getByCategoryStats() {
        return await this.prisma.profile.groupBy ({
            by: ['name'],
            _count: { id: true },
        })
    }
}

