import { Component, OnInit } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from '../models/Post.mode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {

  postGroup: FormGroup;

  constructor(private postsService: PostsService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(){
    this.postGroup = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    })
  }

  savePost(){
    const title = this.postGroup.get('title').value;
    const content = this.postGroup.get('content').value;
    const newPost = new Post(title, content);
    newPost.loveIts = 0;
    newPost.created_at = new Date();
    this.postsService.createPosts(newPost);
    this.router.navigate(['/posts'])
  }
}
