import { SeedService } from './seed.service';

let seedService: SeedService;

seedService.create().then(() => console.log('User admin created!'));
