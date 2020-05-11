import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DevComponent } from './dev/dev.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
	{ component: DevComponent, path: '' },
	{ component: DevComponent, path: 'dev' },
	{ component: MainComponent, path: 'main' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
