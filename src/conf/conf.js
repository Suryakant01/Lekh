const conf = {
    appWriteURL: String(import.meta.env.VITE_APPWRITE_URL),
    appWriteProjectID: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appWriteDatabaseID: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appWriteStorageID: String(import.meta.env.VITE_APPWRITE_STORAGE_ID),
    appWriteCollectionID: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    tinyMCEApiKey: String(import.meta.env.VITE_TINYMCE_API_KEY),
}

export default conf;