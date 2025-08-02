import { TDB } from "../../app/database";
import Schema from "../../utils/miscellaneous/schema";

export class LastServiceEntryModel extends Schema {
  private db: TDB;

  constructor(db: TDB) {
    super();
    this.db = db;
  }

   //get last entry
public async getLastTrackingId(): Promise<string | null> {
  const data = await this.db("last_service_entry")
    .withSchema(this.DBO_SCHEMA)
    .select("last_tracking_id")
    .limit(1);

  return data?.[0]?.last_tracking_id || null;
}

  //increment
  public async incrementLastRefId() {
    await this.db("last_service_entry")
      .withSchema(this.DBO_SCHEMA)
      .increment("last_tracking_id");
  }
}
