import { TDB } from "../../app/database";
import Schema from "../../utils/miscellaneous/schema";
import { IRegisterUser, IGetProfile } from "../../utils/types/user.types";

export default class UserModel extends Schema {
  private db: TDB;

  constructor(db: TDB) {
    super();
    this.db = db;
  }

  //register user
  public async registerUser(paylaod: IRegisterUser) {
    return await this.db("users")
      .withSchema(this.DBO_SCHEMA)
      .insert(paylaod, "id");
  }

  //profile
  public async getProfileDetails(query: IGetProfile) {
    return await this.db("users")
      .withSchema(this.DBO_SCHEMA)
      .select("*")
      .where((qb) => {
        if (query.id) {
          qb.where("id", query.id);
        }
        if (query.email) {
          qb.orWhere("email", query.email);
        }
        if (query.phone) {
          qb.orWhere("phone", query.phone);
        }

        if (query.role) {
          qb.orWhere("role", query.role);
        }
      });
  }

  public async getAgentUserList(query: { role: string }) {
    return await this.db("users as u")
      .withSchema(this.DBO_SCHEMA)
      .leftJoin("parcels as p", "u.id", "p.agent_id")
      .select("u.id", "u.name", "u.photo", "u.phone")
      .count("p.id as parcels")
      .where("u.role", query.role)
      .groupBy("u.id", "u.name", "u.photo");
  }

  public async getAllUserList(query: { role?: string , filter?: string}) {
    return await this.db("users as u")
      .withSchema(this.DBO_SCHEMA)
      .select("u.id", "u.name", "u.photo", "u.role", "u.email", "u.phone")
      .where((qb) => {
        if (query.role) {
          qb.where("u.role", query.role);
        }

        if(query.filter) {
          qb.where("u.name", "like", `%${query.filter}%`);
        }
      }).orderBy("u.id", "desc");
  }

  public async updateUserRole(payload: { user_id: number; role: string }) {
    return await this.db("users")
      .withSchema(this.DBO_SCHEMA)
      .where("id", payload.user_id)
      .update({ role: payload.role });
  }
}
