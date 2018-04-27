import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from '../post';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  posts: Array<Post>;
  postForm: FormGroup;

  constructor(private _postService: PostService, fb: FormBuilder, private router: Router) {

    this.postForm = fb.group({
      'title' : [null, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(75)])],
      'url' : [null, Validators.required],
      'description' : [null, Validators.compose([Validators.required, Validators.minLength(30), Validators.maxLength(500)])]
    });

  }

  ngOnInit() {
    this._postService.getPosts()
      .subscribe(res => this.posts = res);
  }

  addPost(post: Post) {
    this._postService.insertPost(post)
      .subscribe(newPost => {
        this.posts.push(newPost);
        this.router.navigateByUrl('/');
      });
  }

}
