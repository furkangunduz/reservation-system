import { Logger, NotFoundException } from '@nestjs/common';
import { FilterQuery, Model, Types, UpdateQuery } from 'mongoose';
import { AbstractDocument } from './abstract.schema';

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
  protected abstract readonly logger: Logger;
  constructor(private readonly model: Model<TDocument>) {}

  async create(document: Omit<TDocument, '_id'>): Promise<TDocument> {
    const createdDocument = await this.model.create({
      ...document,
      _id: new Types.ObjectId(),
    });

    const savedDocument: TDocument = (
      await createdDocument.save()
    ).toJSON() as unknown as TDocument;

    return savedDocument;
  }

  async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
    const document = await this.model.find(filterQuery).lean<TDocument>(true);

    if (!document) {
      throw new NotFoundException(
        `Document Not Found with Given Query: ${JSON.stringify(filterQuery)}`,
      );
    }

    return document;
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<TDocument>,
    update: UpdateQuery<TDocument>,
  ): Promise<TDocument> {
    const document = await this.model
      .findOneAndUpdate(filterQuery, update, { new: true })
      .lean<TDocument>(true);

    if (!document) {
      throw new NotFoundException(
        `Document Not Found with Given Query: ${JSON.stringify(filterQuery)}`,
      );
    }

    return document;
  }

  async find(filterQuery: FilterQuery<TDocument>): Promise<TDocument[]> {
    const document = await this.model.find(filterQuery).lean<TDocument[]>(true);

    if (!document) {
      throw new NotFoundException(
        `Document Not Found with Given Query: ${JSON.stringify(filterQuery)}`,
      );
    }

    return document;
  }

  async findOneAndDelete(
    filterQuery: FilterQuery<TDocument>,
  ): Promise<TDocument> {
    const document = await this.model
      .findOneAndDelete(filterQuery)
      .lean<TDocument>(true);

    if (!document) {
      throw new NotFoundException(
        `Document Not Found with Given Query: ${JSON.stringify(filterQuery)}`,
      );
    }

    return document;
  }
}
