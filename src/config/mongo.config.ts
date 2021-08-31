import { ConfigService } from "@nestjs/config";

export const getMongoConfig = async (configService: ConfigService) => {
  console.log( getMongoString(configService));
  
  return {
    uri: getMongoString(configService),
    ...getMongoOptions()
  }
};

const getMongoOptions = () => {
  return {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true
  }
}

const getMongoString = (configService: ConfigService) => {
  return 'mongodb://' + 
  configService.get('MONGO_LOGIN') +
  ':' + 
  configService.get('MONGO_PASSWORD') +
  '@' +
  configService.get('MONGO_HOST') +
  ':' + 
  configService.get('MONGO_PORT') +
  '/' + 
  configService.get('MONGO_AUTHDATABASE');
}
