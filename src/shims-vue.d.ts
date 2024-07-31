/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
declare module 'pocketbase' {
  export default class PocketBase {
    authStore: any;
    constructor(baseURL: string);
    collection(name: string): CollectionService;
    // Diğer PocketBase sınıfı üyeleri buraya ekleyin
  }

  export class CollectionService {
    getFullList(): Promise<any>;
    create(data: any): Promise<any>;
    update(id: string, data: any): Promise<any>;
    delete(id: string): Promise<void>;
    authWithPassword(email: string, password: string): Promise<any>;
    // Diğer CollectionService sınıfı üyeleri buraya ekleyin
  }
}