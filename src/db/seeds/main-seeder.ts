import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager, runSeeder } from "typeorm-extension";
import { AdminSeeder } from "./admin-seeder";

export class MainSedeer implements Seeder {
    
    async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
        await runSeeder(dataSource, AdminSeeder);
        // await runSeeder(dataSource, CardsSeed);
        // //quando eu for criar as cartas
    }

}