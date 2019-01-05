import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productsRef: AngularFireList<any>;
  dbNodeName: string = '/products';

  constructor(private db: AngularFireDatabase) {
    this.productsRef = db.list(this.dbNodeName);
   }

  create(product) {
    return this.productsRef.push(product);
  }

  getAll(): Observable<any[]> {
    return this.productsRef.snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
  }

  get(id: string): Observable<any>{
    return this.db.object(this.dbNodeName + '/' + id).valueChanges();
  }

  update(id: string, newProduct: any){
    return this.db.object('/products/' + id).update(newProduct);
  }

  delete(id: string){
    return this.db.object(this.dbNodeName + '/' + id).remove();
  }
}
