import {ApolloClient, gql, InMemoryCache} from "@apollo/client";

export const client = new ApolloClient({
    uri:"http://localhost:4000/graphql",
    cache: new InMemoryCache()
})

export const CREATE_USER = gql`
    mutation AddUser($name:String!,$nickname:String!, $email:String!, $password:String!,$isCreate:Boolean=true) {
        createUser(name:$name,nickname:$nickname ,email:$email, password:$password,isCreate:$isCreate){
            isCreate
        }
    }
`
export const AUTH_LOGIN = gql`
    mutation authLogin($password:String!,$email:String!){
        authLogin(password:$password,email:$email){
            token
        }
    }
`
