import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {PostsService} from '../services/posts.service';
import {CategoriesService} from '../services/categories.service';
import {Category} from '../category';
import {CompaniesService} from '../services/companies.service';
import {Company} from '../company';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
  urls = [];
  files: any[];
  categories: Category[];
  companies: Company[];
  selectedCategory: any;
  selectedCompany: any;

  constructor(private postsService: PostsService,
              private categoriesService: CategoriesService,
              private companiesService: CompaniesService
  ) {
  }

  ngOnInit() {
    console.log(localStorage.getItem('currentUser'));
    this.categoriesService.getCategories().subscribe(res => {
        this.categories = res;
        this.selectedCategory = res[0].id;
      }
    );
    this.companiesService.getCompanies().subscribe(res => {
        this.companies = res;
        this.selectedCompany = res[0].id;
      }
    );
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      this.files = event.target.files;
    }
  }

  upload() {
    if (this.files && this.files[0]) {
      const formData = new FormData();
      for (const file of this.files) {
        formData.append('uploadFiles[]', file, file.name);
      }

      formData.append('category', this.selectedCategory);
      formData.append('company', this.selectedCompany);

      this.postsService.addPost(formData).subscribe(
        res => console.log(res),
        e => {
          console.log(e);
          alert('Error, check console');
        }
      );


      //   for () {
      //     formData.append();
      //   }
    } else {
      alert('Missing files');
    }
  }

}
