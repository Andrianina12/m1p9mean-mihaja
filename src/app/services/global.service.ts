import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class GlobalService {

  public user: any;
  panier: Panier = new Panier();
  public url = "https://m1p9mean-mihaja-back.herokuapp.com/";
  public config;
  constructor(private http: HttpClient) { 
    this.config = {
        "image_resto": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAdYAAAHSCAYAAABRi+pMAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAADovSURBVHhe7d33+xxlvf/x71/hb6KAyKUeFILgUQwIhE6ooSWhlySE0EkCoSM9BOklBEjovYQSCE2qwuHYkCaIIsWEokeP5yh4nC+vhXu4d/Keuvfuzs48ua7HBXz2ntnd2d15zV3mvv/fn/7rL9E/PvpoBR/Jxx9HH8s//xme2zcAtIF1HsTo+eSzVDYqI63sVKZ2gtX/51//93/R3//21+h///svAAAghbJSmen/s0KwfvzRP8yNAQCATdnp/ukK1n9+UrW1NgAAANn+758fd7K0K1itggAAoIC//fWTJP3X58H6T5qAAQDoibK0E6wf/vm/oo/+/j9mIQAAUIyyVJnaCVZGAQMA0BtlaRysVgEAAFAOwQoAQECdYP3gT382HwQAAOUoUwlWAAACIVgBAAioE6zvf/gn80EAAFCOMpVgBQAgkE6wvvfBh+aDAACgHGUqwQoAQCAEKwAAARGsAAAE1AnW5e9/YD4IAADKUaYSrAAABEKwAgAQEMEKAEBABCsAAAERrAAABNQJ1mXvvW8+CAAAylGmEqwAAARCsAIAEBDBCgBAQAQrAAABEawAAAREsAIAEBDBCgBAQAQrAAABEawAAAREsAIAEBDBCgBAQAQrAAABEawAAAREsAIAEBDBCgBAQAQrAAABEawAAAREsAIAEBDBCgBAQAQrAAABEawAAAREsAIAEBDBCgBAQAQrAAABEawAAAREsAIAEBDBCgBAQAQrAAABEawAAAREsAIAEBDBCgBAQAQrAAABEawAAAREsAIAEBDBCgBAQAQrAAABEawAAAREsAIAEBDBCgBAQAQrAAABEawAAAREsAIAEBDBCgBAQAQrAAABEawAAAREsAIAEBDBCgBAQAQrAAABEawAAAREsAIAEBDBCgBAQAQrAAABEazAkLz5xuvRa6+8HH343jLzcQCjiWAFhuDmG2+IvvCFL8S2GT8+uu6aRWZZAKOFYAWGYMsttugKVme11VaLZh51ZPSLnz1vbgeg/ghWYMB+/atfmKGatOkmm0RXLZgffbCcpmJglBCswIAdc/TsODz33GP36LFHHoqmTZ0SfelLK3UFq/PlL30pmnHQQdHTTz5u7g9AvRCswICtssoqcWg+uOT++O/vLXs3WjD/8miTceO6gtU3duzY6OILL4iWvfNW1z4B1AfBCgyQP2hprbXWNMuI+liPnj0rWn311buC1bf/fvtGDy990NwewPAQrMAAbb/dtnEwnn3WmWaZpNtuuTmaMGHHrlD1fXvttaO5Z58V/eF3vzW3BzBYBCswIL95+aWuQPz9b18zy6V547VXozPPOD1ae8yYrv34Jk2cGN1z953m9gAGg2AFBuSE446NA3DypElmmaIeevCBTlPwF7/4xa5gddZYY43olJNOjF5/9RVzewD9Q7ACA+L3l95/z2KzTFnL3307uvzSS6INN/xBV7D6dtxh++iWm25cYVsA/UGwAgNw5+23xkH3jW98wyzTq5/9x7PRkUccHn3lK1/pClZHwa5bfV745c/N7QGEQbACA7DTThPigDv9tFPNMiHddMP10Q7bb9cVrL4tNt88WrTwKuYpBvqAYAX6TIOU/FArO2ipF+pjPfWUk6M11/xW12twVll55ejQQw6Ofvr0U+b2AMojWIE+0yAiF2S77rKLWWYQltx7T2emJz9YfeuvPza64vLLOv221vYAiiFYgT5act+9XeE1Y/r0oQfXu2+9GV14/nmdWZz81+abOuWAzmt/5aVfm/sAkI5gBfrkP597tmv+369//eudf+sWGQXXM089YW43SM8+83R0yMEzOk3C7nVaNEuUlrbTnMan/fCU6JqFV0ePPry0c2+utV+gzQhWoA80mYNG/7pgUjPrB+8ti373+m86waT7TN3fr75qQS1WsNF6sNtuMz5+zWWMGbNWZ9vp06Z1Bmddu2hhZ7rFP72/3HwuoMkIViAwBagC04WOAtYasLT4rjuiCTvu0CnTWcFm+vToZ//x3ArlBk1L1ek1qanY1bKr0oIDs2YeFb384gvmcwFNRLACgWlCBhcsCsy8sNTI3ROPPy4OMa3DqlthrLKDoLDXa/H/9uILv+ysxKPQ1WCsKQfsH2215Zapo40tmu9YFxP+foEmIliBgFQ788PkvsV3m+XS+M2x6vfU/n758/80y/aDapZ67rL32mqQ0yMPLe1cEGy91VadfXzta1+Lj4Pvm99cIzpn7tnRW79/w9wXMOoIViCQ+Zdd2hUg+n+rXBEKKs2StNpqq3X2pdrhDddda5YNafas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",
        "image_plat": "data:image/png;base64,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",
        "frais": 4000,
        "pourcentage": 0.1
    }
  }

  login(user): Observable<any> {
    return this.http.post(this.url + "login", user);
  }

  formOption (use_authorization = false, token = null) {
    const options = {
      headers: new HttpHeaders()
      .set('Authorization',  `Bearer ${token}`)
      .set('Content-Type' , 'application/json')
    };
    return options;
  }

  isLogged() {
    if(localStorage.getItem('token') == null) return false;
    return true;
  }

}

export class Panier {
  plats: Panierplats[]
  total:number
  constructor() {
    this.plats = [];
    this.total = 0;
    this.benefice_resto = 0;
  }
  date: string
  numero: string
  adresse: string
  nom: string
  restaurant: string
  etat: string;
  benefice_resto: number;
  benefice_ekaly: number;
}

export class Panierplats {
  nom: string;
  quantite: number;
  prix: number;
  montant: number;
}
