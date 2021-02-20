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

  items : ProdutoDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public produtoService: ProdutoService,
    public loadingCrtl: LoadingController) {
  }

  ionViewDidLoad() {
    let categoria_id = this.navParams.get('categoria_id');
    let loader = this.presentLoading(); //tela de carregamento antes da chamada de categorias
    this.produtoService.findByCategoria(categoria_id)
    .subscribe(response => {
      this.items = response['content'];
      loader.dismiss(); //fechamento da tela de carregamento depois da chamada e antes das imagens
      this.loadImageUrls();
    },
    error =>{
      loader.dismiss();// fechamento da tela de carregamento caso aconteca algum erro de outrem
    });
  }

  loadImageUrls(){
    for (var i = 0; i < this.items.length; i++){
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
}
