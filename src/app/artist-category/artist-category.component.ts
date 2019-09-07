
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Artist } from './artist';
import { ArtistCategoryService } from './artist-category.service';

@Component({
  selector: 'artist-category',
  templateUrl: './artist-category.component.html',
  styleUrls: ['./artist-category.component.css']
})
export class ArtistCategoryComponent implements OnInit {
  allArtist: Artist[];
  statusCode: number;
  requestProcessing = false;
  artistIdToUpdate = null;
  processValidation = false;
   //Create form
   artistCategoryForm = new FormGroup({
    category_name: new FormControl('', Validators.required)   
  });
  constructor(private artistCategoryService :ArtistCategoryService) { }

  ngOnInit(): void {
    this.getAllArtist();
  }
    //Fetch all articles
 
    getAllArtist() {
      this.artistCategoryService.getAllArtist()
      .subscribe(
              data => this.allArtist = data,
              errorCode => this.statusCode = errorCode);
              
    }
//Handle create and update article
      onArticleFormSubmit() {
        this.processValidation = true;
        if (this.artistCategoryForm.invalid) {
            return; //Validation failed, exit from method.
        }
              //Form is valid, now perform create or update
          this.preProcessConfigurations();
          let article = this.artistCategoryForm.value;
          if (this.artistIdToUpdate === null) {
          //Generate article id then create article
              
                  this.artistCategoryService.createArtist(article)
                          .subscribe(successCode => {
                                  this.statusCode = successCode;
                                  this.getAllArtist();  
                                  this.backToCreateArtist();
                              },
                              errorCode => this.statusCode = errorCode
                          );
                        
            } else {
            //Handle update article
            article.id = this.artistIdToUpdate;        
            this.artistCategoryService.updateArtist(article)
            .subscribe(successCode => {
                this.statusCode = successCode;
                        this.getAllArtist();  
                          this.backToCreateArtist();
                    },
                errorCode => this.statusCode = errorCode);  
      }
}
  //Load article by id to edit
    loadArtistToEdit(articleId: string) {
      this.preProcessConfigurations();
      this.artistCategoryService.getArtistById(articleId)
        .subscribe(article => {
                console.log(article,'poiuytre');
            this.artistIdToUpdate = article.cat_id;
                        this.artistCategoryForm.setValue({  category_name: article.category_name });
                        this.processValidation = true;
                        this.requestProcessing = false;
            },
            errorCode => this.statusCode = errorCode);
    }
  //Delete article
    deleteArtist(articleId: string) {
      this.preProcessConfigurations();
      this.artistCategoryService.deleteArtistById(articleId)
      .subscribe(successCode => {
        //this.statusCode = successCode;
                    //Expecting success code 204 from server
                    this.statusCode = 204;
                this.getAllArtist();  
                this.backToCreateArtist();
            },
        errorCode => this.statusCode = errorCode);
    }
    //Perform preliminary processing configurations
    preProcessConfigurations() {
      this.statusCode = null;
      this.requestProcessing = true;
    }
    //Go back from update to create
    backToCreateArtist() {
      this.artistIdToUpdate = null;
      this.artistCategoryForm.reset(); 
      this.processValidation = false;
    }
}
