interface MessageQueue<T>
{
  put(item: T): Promise<void>;
  reserve(timeout: number): Promise<T | undefined>;
  delete(item: T): Promise<void>;
  size(): Promise<number>;
}
