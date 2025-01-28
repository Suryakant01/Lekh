const conf = {
    appWriteURL: import.meta.env.VITE_APPWRITE_URL,
    appWriteProjectID: import.meta.env.VITE_APPWRITE_PROJECT_ID,
    appWriteDatabaseID: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    appWriteStorageID: import.meta.env.VITE_APPWRITE_STORAGE_ID,
    appWriteCollectionID: import.meta.env.VITE_APPWRITE_COLLECTION_ID,
    tinyMCEApiKey: import.meta.env.VITE_TINYMCE_API_KEY,
}

export default conf;