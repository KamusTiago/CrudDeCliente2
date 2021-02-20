import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';

/**
 * Generated class for the ProdutosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  items : ProdutoDTO[] = [];
  page: number = 0;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public produtoService: ProdutoService,
    public loadingCrtl: LoadingController) {
  }

  ionViewDidLoad() {
    this.carregarDados();
  }

  carregarDados(){
    let categoria_id = this.navParams.get('categoria_id');
    let loader = this.presentLoading(); //tela de carregamento antes da chamada de categorias
    this.produtoService.findByCategoria(categoria_id, this.page, 10)
    .subscribe(response => {
      let start = this.items.length;
      this.items = this.items.concat(response['content']);
      let end = this.items.length - 1;
      loader.dismiss(); //fechamento da tela de carregamento depois da chamada e antes das imagens
      console.log(this.page);
      console.log(this.items);
      this.loadImageUrls(start, end);
    },
    error =>{
      loader.dismiss();// fechamento da tela de carregamento caso aconteca algum erro de outrem
    });
  }

  loadImageUrls(start: number, end: number){
    for (var i = start; i <=end; i++){
      let item = this.items[i];
      this.produtoService.getSmallImageFromBucket(item.id)
      .subscribe(response =>{
        item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.id}-small.jpg`;
      }, 
      error => {});
    }
  }

  showDetails(produto_id: string){
    this.navCtrl.push('ProdutoDetailPage',{produto_id: produto_id});
  }

  //tela de carregamento
  presentLoading(){
    let loader = this.loadingCrtl.create({
      content: "Por favor aguarde...",
    });
    loader.present();
    return loader;
  }

  //tela de atualização
  doRefresh(refresher) {
    this.page = 0;
    this.items = [];
    this.carregarDados();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }

  //infinite scroll
  loadData(event) {
    this.page++;
    this.carregarDados();
    setTimeout(() => {
      event.complete();
    }, 500);
  }
}
