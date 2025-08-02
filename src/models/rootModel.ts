import { Knex } from "knex";
import { db } from "../app/database";
import UserModel from "./userModel/user.model";
import { ParcelModel } from "./parcelModel/parcelModel";
import { LastServiceEntryModel } from "./lastServiceEntryModel/lasServiceEntryModel";


export default class Models {


   public UserModel(trx?: Knex.Transaction){
    return new UserModel(trx || db);
   }


   public ParcelModel(trx?: Knex.Transaction){
    return new ParcelModel(trx || db);
   }

   public LastServiceEntryModel(trx?: Knex.Transaction){
    return new LastServiceEntryModel(trx || db);
   }
}
