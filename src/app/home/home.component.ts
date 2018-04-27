import {Component, OnInit} from '@angular/core';
import {Post} from '../post';
import {PostService} from '../post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  posts: Array<Post>;

  constructor(private _postService: PostService) {
  }

  ngOnInit() {
    this._postService.getPosts().subscribe(res => this.posts = res);
  }

}
