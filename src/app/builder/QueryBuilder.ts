import { Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search() {
    if (this?.query?.search) {
      this.modelQuery = this.modelQuery.find({
        $or: [
          { title: { $regex: this?.query?.search, $options: 'i' } },
          { content: { $regex: this?.query?.search, $options: 'i' } },
        ],
      });
    }
    return this;
  }

  filter() {
    if (this?.query?.filter) {
      this.modelQuery = this.modelQuery.find({
        author: this?.query?.filter,
      });
    }

    return this;
  }

  sort() {
    let order = '-';
    if (this?.query?.sortOrder) {
      order = this?.query?.sortOrder === 'asc' ? '+' : '-';
    }
    let sortBy = 'createdAt';
    if (this?.query?.sortBy) {
      sortBy = this?.query?.sortBy as string;
    }
    const sort = `${order}${sortBy}`;
    this.modelQuery = this.modelQuery.sort(sort as string);

    return this;
  }
}

export default QueryBuilder;
