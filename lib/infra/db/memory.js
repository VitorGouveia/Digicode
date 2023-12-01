export const client = {}

export const start = async () => {
  console.log("MemoryDB Start sucessfully");
};

export const stop = async () => {
  await client.close();
};
