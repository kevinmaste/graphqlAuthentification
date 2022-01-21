import graphql, {
    GraphQLString,
    GraphQLObjectType,
    GraphQLID,
    GraphQLSchema,
    GraphQLList,
    GraphQLBoolean, GraphQLNonNull,
} from 'graphql'
import {UserModel} from "../Model/userModel.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
/*------------------------------------------------------------Always define the type of variable with graphql----------------------------------------------------------------------------------*/
//create object type with graphql
/**@UserType it's the type of my object that a gonna put in my schema*/
const UserType = new GraphQLObjectType({
    name:"User",
    fields:()=>(
        {
            id:{type:GraphQLID},
            name:{type:GraphQLString},
            nickname:{type:GraphQLString},
            password:{type:GraphQLString},
            email:{type:GraphQLString},
            isCreate:{type:GraphQLBoolean}
        }
    )
})

const LoginType = new GraphQLObjectType({
    name:"LoginType",
    fields:()=>({
        token:{type:GraphQLString}
    })
})

/**@RootType it's for managing all type that was create
 * we going to use here the resolve , it's like we gonna treat the data
 * so we need the type and args (args of the current type , that you create before)
 why we put in the args ; and id . it's about the search , so we will have something like
users(id:ID){ what you want to take} , in our case it's will important when the users is connect and we just need his element*/
const RootType = new GraphQLObjectType({
    name:"Root",
    fields: {
        user:{
            type:UserType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args) {
                //after we gonna use that  #when the db will be
                return UserModel.findById(args.id);
            }
        },
        users:{
            type:new GraphQLList(UserType),
            resolve(parent,args) {
                //return all user , we did that because we will have a lot of users
                return UserModel.find({})
            }
        },
        verifyToken:{
            type:UserType,
            args:{token:{type:GraphQLString}},
            async resolve(parent,args) {
                const decode=jwt.verify(args.token,process.env.SECRET_KEY)
                const user = await UserModel.findOne({_id: decode.id})
                console.log("user : ",user)
                return{
                    ...user.data
                }
            }
        }
        }
})
/** @Mutation changing the data etcc.. its there we gonna do the crud for example*/
const Mutation = new GraphQLObjectType({
    name:'Mutation',
    fields:{
        createUser:{
            type:UserType,
            args:{
                name:{type:new GraphQLNonNull(GraphQLString)},
                nickname:{type:new GraphQLNonNull(GraphQLString)},
                password:{type:new GraphQLNonNull(GraphQLString)},
                email:{type:new GraphQLNonNull(GraphQLString)},
                isCreate:{type:GraphQLBoolean}
            },
            async resolve(parent,args){
            //send the data to the database with Mongodb
                const existingEmail =await UserModel.exists({email:args.email})
                console.log("email exists",existingEmail)
                if(!existingEmail){
                    console.log("the user is in creation....")
                    let passwordHash =await bcrypt.hash(args.password,10)
                    const  User = new UserModel({name:args.name,nickname:args.nickname,password:passwordHash,email:args.email,isCreate:args.isCreate})
                    return User.save()
                }
                throw new Error("Sorry the user already exists")
            }
        },
        authLogin:{
            type:LoginType,
            args:{
                password:{type:GraphQLString},
                email:{type:GraphQLString}
            },
            async resolve(parent,args){
                try {
                    let loginVerified = await UserModel.findOne({email: args.email})
                    console.log("data of login verify: ", loginVerified)

                    if (!loginVerified) {
                        console.log("user or password incorrect")
                        throw new Error("Email is incorrect")
                    }
                    const passwordVerify = await bcrypt.compare(args.password, loginVerified.password)
                    if (!passwordVerify) throw new Error("Password is incorrect")
                    return {
                        token: jwt.sign({
                            name:loginVerified.name, nickname: loginVerified.nickname,email: loginVerified.email, id:loginVerified._id
                        }, process.env.SECRET_KEY, {expiresIn: "2d"})
                    }
                }catch (e) {
                    throw e
                }


            }
        }
    }
})

export const schema = new GraphQLSchema({
    query:RootType,
    mutation:Mutation
})




