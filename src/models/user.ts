import { PrismaClient, User } from '@prisma/client';
import { Model } from './model';


class UserModel implements Model<any, User> {
  constructor(private readonly client: PrismaClient['user']) {}

  async create(data: any): Promise<User>
  {
    return this.client.create({ data });
  }

  async findOne(where: any): Promise<User | null>
  {
    return this.client.findUnique({ where });
  }

  async delete(where: any): Promise<User>
  {
    return this.client.delete({ where });
  }

  async update(where: any, data: any): Promise<User>
  {
    return this.client.update({ where, data });
  }
}


export
{
  UserModel,
};
