import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DevComponent } from './dev/dev.component';
import { MainComponent } from './main/main.component';
import { HomeComponent } from './home/home.component';
import { HomeChildComponent } from './home/home-child/home-child.component';

const routes: Routes = [
	{ component: HomeComponent, path: '' },
	{ component: HomeComponent, path: 'home', children: [{ component: HomeChildComponent, path: 'child/:id' }] },
	{ component: DevComponent, path: 'dev' },
	{ component: DevComponent, path: 'dev/:id' },
	{ component: MainComponent, path: 'main' },
	{ component: MainComponent, path: 'main/:id' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
