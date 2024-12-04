import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PagesComponent } from './pages/pages.component';
import { PopularComponent } from './popular/popular.component';
import { TrendingComponent } from './trending/trending.component';
import { SearchpageComponent } from './searchpage/searchpage.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { TvDetailsComponent } from './tv-details/tv-details.component';

const routes: Routes = [{
  path: '',
  component: HomeComponent
},{
  path:'trending',
  component: TrendingComponent
},
{
  path:'popular',
  component: PopularComponent
},
{
  path:'movie/:category',
  component:PagesComponent
},
{
  path:'tv/:category',
  component:PagesComponent
},
{
  path:'search',
  component: SearchpageComponent
},
{
  path:'movies/:id',
  component:MovieDetailsComponent

},
{
  path:'tvs/:id',
  component:TvDetailsComponent

},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
