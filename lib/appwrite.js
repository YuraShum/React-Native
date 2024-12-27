import { Client, Account, ID, Avatars, Databases, Query } from 'react-native-appwrite';
import { config } from '@/config';

const { endpoint,
    platform,
    projectId,
    storageId,
    databaseId,
    userCollectionId,
    videoCollectionId } = config

export const appwriteConfig = {
    endpoint,
    platform,
    projectId,
    storageId,
    databaseId,
    userCollectionId,
    videoCollectionId,
}

const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.platform)
    ;

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client)

export const createUser = async (email, password, username) => {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        )
        if (!newAccount) throw Error

        const avatarUrl = avatars.getInitials(username)

        await signIn(email, password)

        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email: email,
                username: username,
                avatar: avatarUrl,
            }
        )

        return newUser
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

export const signIn = async (email, password) => {
    try {
        const session = await account.createEmailPasswordSession(email, password)
        return session
    } catch (error) {
        throw new Error(error)
    }
}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get()

        if (!currentAccount) {
            throw Error;
        }

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal("accountId", currentAccount.$id)]
        )

        if (!currentUser) throw Error;

        return currentAccount.listDocuments[0]

    } catch (error) {
        console.log(error)
    }
}


export const getAllPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId
        )

        return posts.documents
    } catch (error) {
        throw new Error(error)
    }
}


