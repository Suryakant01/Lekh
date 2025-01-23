import { Client, Storage, ID, } from 'appwrite'
import conf from '../../conf/conf'

class StorageService {
    client = new Client();
    storage;

    constructor() {
        this.client(conf.appWriteURL,
            conf.appWriteProjectID,
        )
        this.storage = new Storage(this.client)
    }

    uploadFile = async (file) => {
        try {
            await this.storage.createFile(conf.appWriteStorageID, ID.unique(), file)
            return true;
        } catch (error) {
            console.log("AppWrite Error :: upload file Storage Error", error);
            return false
        } 
    }

    deleteFile = async (fileId) => {
        try {
            await this.storage.deleteFile(conf.appWriteStorageID, fileId)
            return true
        } catch (error) {
            console.log("AppWrite Error :: delete file Storage Error", error);
            return false
        }
    }

    getFilePreview = async(fileId) => {
        try {
            await this.storage.getFilePreview(conf.appWriteStorageID, fileId)
        } catch (error) {
            console.log("AppWrite Error :: preview file Storage Error", error);
        }
    }
    
}

const storageService = new StorageService();

export default storageService