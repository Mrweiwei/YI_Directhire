import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import{SeekremessagePage} from '../seekremessage/seekremessage';
import { Http } from '@angular/http';
/**
 * Generated class for the SeekmessagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-seekmessage',
  templateUrl: 'seekmessage.html',
})
export class SeekmessagePage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http) {
  }
  info=[];
  ionViewDidLoad() {
    console.log('ionViewDidLoad SeekmessagePage');
    this.http.get('http://127.0.0.1:3000/user/getMessage_recruit/getarticle').subscribe(data=>{
      var message = JSON.parse(data['_body']);
      console.log(message);
      for(var i=0;i<message.length;i++){
        this.info[i] = message[i];
      }
    });
  }
  list=[{title:'马云',icon:'assets/imgs/18.jpg',ig:'五星级酒店不能去抢麻辣烫的生意，要有自己的定位。',time:'10:11'},
  {title:'马化腾',icon:'assets/imgs/19.jpg',ig:'再小的网店，做的都是全中国的生意。',time:'11:11'},
  {title:'雷军',icon:'assets/imgs/20.jpg',ig:'买家不是职业采购，买家的判断来源于生活经验，而不是工程师学历。',time:'12:41'},
  {title:'刘强东',icon:'assets/imgs/21.jpg',ig:'页面漂亮的目的不是让买家爽心悦目，是为了让消费者信任你。',time:'13:01'},
  {title:'张朝阳',icon:'assets/imgs/22.jpg',ig:'每一单都要咨询客服才能成交，你得多失败啊。',time:'18:35'}];
  goto(item){
    this.navCtrl.push('SeekremessagePage',{all:item});
  }
}
