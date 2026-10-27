import mongoose from "mongoose";

export default class Database {
  private url: string;
  constructor() {
    const url = process.env.MONGO_URI;
    if (!url) {
      throw new Error("the mongo url not fund");
    }
    this.url = url;
  }
  async connect(): Promise<void> {
    mongoose.connect(this.url);
    console.log("the database are connect")
  }
}
