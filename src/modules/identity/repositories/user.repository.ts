import { BaseRepository } from "../../../shared/base.repository.js";
import { User } from "../models/user.model.js";
import type { Iuser } from "../models/user.model.js";
export class UserRepository  extends BaseRepository<Iuser> {
constructor(){
    super(User)
}
async findByEmail(email:string){
    return  User.findOne({email});   
}
}