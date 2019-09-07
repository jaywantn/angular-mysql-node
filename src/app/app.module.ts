
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule  } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ArticleComponent } from './article/article.component';
import { ArticleService } from './article.service';
import { ArtistCategoryComponent } from './artist-category/artist-category.component';
import { ArtistCategoryService } from './artist-category/artist-category.service';
@NgModule({
  declarations: [
    AppComponent,
    ArticleComponent,
    ArtistCategoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule ,
    ReactiveFormsModule
  ],
  providers: [ArticleService, ArtistCategoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
