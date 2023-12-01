import { client } from "./db/memory.js";

export const repository = {
  create: async (collection, document) => {
    const doc = await db.collection(collection).insertOne(document);

    return doc.insertedId.toString();
  },
  list: async (collection, { query, pagination }) => {
    const doc = await db
      .collection(collection)
      .find(query)
      .skip((pagination.page - 1) * pagination.size)
      .limit(pagination.size)
      .toArray();

    return doc.map(transformId);
  },
  retrieve: async (collection, id) => {
    const doc = await db.collection(collection).findOne({
      _id: new ObjectId(id),
    });

    if (!doc) {
      return null;
    }

    return transformId(doc);
  },
  update: async (collection, id, update) => {
    await db.collection(collection).updateOne(
      {
        _id: new ObjectId(id),
      },
      {
        $set: update,
      }
    );
  },
  delete: async (collection, id) => {
    await db.collection(collection).deleteOne({
      _id: new ObjectId(id),
    });
  },
};
