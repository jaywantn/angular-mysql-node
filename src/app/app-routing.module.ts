import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 
import { ArticleComponent } from './article/article.component';
import { ArtistCategoryComponent } from './artist-category/artist-category.component';

const routes: Routes = [
  {
    path: "",
    component: ArticleComponent,
    pathMatch: 'full',
  },  
  {
    path: "artist",
    component: ArtistCategoryComponent 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
