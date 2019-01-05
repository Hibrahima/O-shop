import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  
  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
  dbNodeName: string = "/categories";

  constructor(db: AngularFireDatabase) {
    this.itemsRef = db.list(this.dbNodeName);
   }

  getAll(): Observable<any[]> {
    return this.itemsRef.snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
  }
}
