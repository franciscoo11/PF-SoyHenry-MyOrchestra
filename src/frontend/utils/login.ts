import axios from "axios";
import bcrypt from "bcryptjs";

export const verifyUser = async (email:string, password:string) => {
    const findUser = await axios.get(`/api/user?email=${email}`).then(res => res.data)
    if(!bcrypt.compareSync(password, findUser.password)) return false
    return findUser ? findUser : false
}