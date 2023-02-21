interface Model<T, U>
{
  create(data: T): Promise<U>;
  findOne(data: T): Promise<U | null>;
  delete(data: T): Promise<U>;
  update(where: T, data: T): Promise<U>;
}


export
{
  Model,
};
