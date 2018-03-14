import { Injectable } from '@angular/core';

@Injectable()
export class PageService {

  constructor() { }
  getPages() {
    return [
      {
        "id": 1,
        "title": "test page#1",
        "content": "TEST PAGE CONTENT#1"
      },
      {
        "id": 2,
        "title": "test page#2",
        "content": "TEST PAGE CONTENT#2"
      },
      {
        "id": 3,
        "title": "test page#3",
        "content": "TEST PAGE CONTENT#3"
      }
    ];
  }
}
