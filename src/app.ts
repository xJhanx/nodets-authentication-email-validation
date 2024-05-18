import { envs } from './config/envs';
import { DataBase } from './data';
import { AppRoutes } from './presentation/routes';
import { Server } from './presentation/server';


(async()=> {
  main();
})();


async function  main() {

  await DataBase.init({
    dataBaseUrl : envs.MONGO_URL,
    dataBaseName : envs.MONGO_DB_NAME
  });
  
  const server = new Server({
    port: envs.PORT,
    routes: AppRoutes.routes,
  });

  server.start();
}