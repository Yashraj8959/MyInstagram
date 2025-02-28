const _config = {
    PORT: process.env.PORT || 3000,
    MONGO_URL: process.env.MONGO_URL ,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    IMAGEKIT_PUBLIC_KEY: process.env.IMAGEKIT_PUBLIC_KEY,
    IMAGEKIT_PRIVATE_KEY: process.env.IMAGEKIT_PRIVATE_KEY,
    IMAGEKIT_URL_ENDPOINT: process.env.IMAGEKIT_URL_ENDPOINT,
}


const config = Object.freeze(_config)

module.exports = config