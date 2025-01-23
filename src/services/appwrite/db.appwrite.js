import { Client, Databases, Query, } from 'appwrite';
import conf from '../conf/conf';

class DBService {
    client = new Client();
    databases;

    constructor() {
        this.client
            .setEndpoint(conf.appWriteURL)
            .setProject(conf.appWriteProjectID)

        this.databases = new Databases(this.client)
    }

    createPost = async ({ slug, title, content, status, userID, featuredImg }) => {
        try {
            await this.databases.createDocument(conf.appWriteDatabaseID, conf.appWriteCollectionID, slug,
                {
                    title,
                    content,
                    status,
                    userID,
                    featuredImg,

                }
            )
        } catch (error) {
            console.log("AppWrite Error :: create post DB Error", error);
        }

    }

    getPost = async (slug) => {
        try {
            await this.databases.getDocument(conf.appWriteDatabaseID, conf.appWriteCollectionID, slug)
            return true
        } catch (error) {
            console.log("AppWrite Error :: get post DB Error", error);
            return false;
        }

    }

    getAllPosts = async () => {
        try {
            await this.databases.listDocuments(conf.appWriteDatabaseID, conf.appWriteCollectionID, 
                [
                    Query.equal('status', 'active')
                ]
            )
        } catch (error) {
            console.log("AppWrite Error :: delete post DB Error", error);
        }
    }

    updatePost = async ({ slug, title, content, status, featuredImg }) => {
        try {
            await this.databases.updateDocument(conf.appWriteDatabaseID, conf.appWriteCollectionID, slug,
                {
                    title,
                    content,
                    featuredImg,
                    status,
                }
            )
        } catch (error) {
            console.log("AppWrite Error :: update post DB Error", error);
        }
    }

    deletePost = async (slug) => {
        try {
            await this.databases.deleteDocument(conf.appWriteDatabaseID, conf.appWriteCollectionID, slug)
        } catch (error) {
            console.log("AppWrite Error :: delete post DB Error", error);
        }
        
    }
    

}

const dbService = new DBService();

export default dbService;