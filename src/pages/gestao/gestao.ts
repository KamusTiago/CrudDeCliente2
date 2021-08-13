import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the GestaoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gestao',
  templateUrl: 'gestao.html',
})
export class GestaoPage {

  formGroup: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController) {
  

  this.formGroup = this.formBuilder.group({
    idPedido: ['Insira aqui o Id do pedido', [Validators.required]],
    email: ['Insira aqui o e-mail do cliente',[Validators.required, Validators.email]]
  });
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad GestaoPage');
  }

}
