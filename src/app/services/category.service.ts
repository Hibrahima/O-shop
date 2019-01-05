import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  
  categoriesRef: AngularFireList<any>;
  dbNodeName: string = "/categories";

  constructor(db: AngularFireDatabase) {
    this.categoriesRef = db.list(this.dbNodeName);
   }

  getAll(): Observable<any[]> {
    return this.categoriesRef.snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
  }
}
