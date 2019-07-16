import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import { Subscription } from 'rxjs';
import { exists } from 'fs';

@Component({
  selector: 'app-posts-list-item',
  templateUrl: './posts-list-item.component.html',
  styleUrls: ['./posts-list-item.component.scss']
})
export class PostsListItemComponent implements OnInit, OnDestroy {

  posts;
  postsSubscription: Subscription;
  constructor(private postsService: PostsService) { }

  ngOnInit() {
    this.postsSubscription = this.postsService.postsSubject.subscribe(
      (posts) => {
        this.posts = posts;
      }
    );
    this.postsService.emitPosts();
  }

  loveUp(id: number){
    this.posts[id].loveIts += 1;
    return this.posts[id].loveIts;
  }

  loveDown(id: number){
    this.posts[id].loveIts -= 1;
    return this.posts[id].loveIts;
  }

  getColor() {
    if (this.posts.loveIts > 0) {
      return 'green';
    } else if (this.posts.loveIts < 0) {
      return 'red';
    }
  }

  deletePost(post){
    this.postsService.removePosts(post);
  }

  ngOnDestroy(){
    this.postsSubscription.unsubscribe();
  }
}
