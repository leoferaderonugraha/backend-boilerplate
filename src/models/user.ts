import { PrismaClient, User } from '@prisma/client';
import { Model } from './model';


class UserModel implements Model<any, User> {
  constructor(private readonly client: PrismaClient) {}

  async create(data: any): Promise<User>
  {
    return this.client.user.create({ data });
  }

  async findOne(where: any): Promise<User | null>
  {
    return this.client.user.findUnique({ where });
  }

  async delete(where: any): Promise<User>
  {
    return this.client.user.delete({ where });
  }

  async update(where: any, data: any): Promise<User>
  {
    return this.client.user.update({ where, data });
  }
}


export
{
  UserModel,
};
