//axios import buraya gelecek
import axios from 'axios';
var benimIP = 


// ------------ değiştirmeyin --------------
// licensed to Ergineer 2022
require("babel-core/register");
require("babel-polyfill");
async function ipAdresimiAl(){
	await axios({
		method: 'get',
		url: 'https://apis.ergineer.com/ipadresim',
	})
	.then(function (response) {
		return response.data
	})
	.then(function (a) {
		benimIP=a
	});
}				
// ------------ değiştirmeyin --------------


/*
	ADIM 1: axios kullanarak, aşağıdaki URL'ye GET sorgusu atacağız
    (tag içindeki yere kendi ipnizi yazarak URL'yi oluşturun):
    https://apis.ergineer.com/ipgeoapi/<ipniz>
	
	NOT: Bilgisayarın IP adresini öğrenmek için: https://apis.ergineer.com/ipadresim 
	ADIM 5'e gelene kadar fonksiyonunuzu test etmek için ip nizi URL'ye manuel olarak ekleyebilirsiniz.
*/

const getData = async function () {
	await ipAdresimiAl();
	axios.get("https://apis.ergineer.com/ipgeoapi/"+benimIP)
	.then (function(response) {
		return (response.data);
	})

	.then (function(ipDatasi){
		document.querySelector("div.cards").appendChild(cardMaker(ipDatasi));
	}) 
}

getData();

/*
	ADIM 2: Geri döndürülen verileri inceleyin, bu sizin ip bilgileriniz! Bileşen fonksiyonunuzu geliştirmek içindeki bu veri yapısını
	iyice anlamanız gerekmektedir.


	{
    "sorgu": "176.232.58.121",
    "durum": "OK",
    "kıta": "Asia",
    "ülke": "Turkey",
    "ülkeKodu": "TR",
    "ülkebayrağı": "https://apis.ergineer.com/ulkebayraklari/TR",
    "bölge": "07",
    "bölgeAdı": "Antalya",
    "şehir": "Antalya",
    "zip": "07070",
    "enlem": 36.8709,
    "boylam": 30.5229,
    "saatdilimi": "Europe/Istanbul",
    "parabirimi": "TRY",
    "isp": "Superonline Iletisim Hizmetleri",
    "organizasyon": "Tellcom Broadband Network Statement",
    "as": "AS34984 Superonline Iletisim Hizmetleri A.S."
}

*/


/*
	ADIM 3: Argümanı sadece 1 nesne kabül eden bir fonksiyon oluşturun.
    DOM metotlarını ve özelliklerini kullanarak, şunları gerçekleştirin:
	
	<div class="card">
		<img src={ülke bayrağı url} />
		<div class="card-info">
			<h3 class="ip">{ip adresi}</h3>
			<p class="ulke">{ülke bilgisi (ülke kodu)}</p>
			<p>Enlem: {enlem} Boylam: {boylam}</p>
			<p>Şehir: {şehir}</p>
			<p>Saat dilimi: {saat dilimi}</p>
			<p>Para birimi: {para birimi}</p>
			<p>ISP: {isp}</p>
		</div>
    </div>
*/

function cardMaker (data) {

	const divCard = document.createElement("div");
	divCard.classList.add("card");

	const imgBayrak = document.createElement("img");
	imgBayrak.src = data["ülkebayrağı"];
	divCard.appendChild(imgBayrak);

	const infoCard = document.createElement("div");
	infoCard.classList.add("card-info");
	divCard.appendChild(infoCard);

	const ipAdres = document.createElement("h3");
	ipAdres.classList.add("ip");
	ipAdres.textContent = data["sorgu"];
	infoCard.appendChild(ipAdres);

	const ulke = document.createElement("p");
	ulke.classList.add("ulke");
	ulke.textContent = data["ülke"] + " " + "(" + data["ülkeKodu"] + ")";
	infoCard.appendChild(ulke);

	const konum = document.createElement("p");
	konum.textContent = `Enlem: ${data["enlem"]} Boylam: ${data["boylam"]}`;
	infoCard.appendChild(konum);

	const sehir = document.createElement("p");
	sehir.textContent = `Şehir: ${data["şehir"]}`;
	infoCard.appendChild(sehir);

	const saat = document.createElement("p");
	saat.textContent = `Saat Dilimi: ${data["saatdilimi"]}`;
	infoCard.appendChild(saat);

	const para = document.createElement("p");
	para.textContent = `Para birimi: ${data["parabirimi"]}`;
	infoCard.appendChild(para);

	const isp = document.createElement("p");
	isp.textContent = `ISP: ${data["isp"]}`;
	infoCard.appendChild(isp);

	return divCard;
}

/*
	ADIM 4: API'den alınan verileri kullanarak ADIM 3'te verilen yapıda bir kart oluşturun ve 
	bu kartı DOM olarak .cards elementinin içine ekleyin. 
*/

/*
	ADIM 5: Manuel olarak eklediğiniz IP adresini dinamiğe dönüştürün. 
	Sayfanın en üstünde ---değiştirmeyin--- etiketleri arasında yer alan asenkron ipAdresimiAl() fonksiyonuna 
	sorgu atarak bilgisayarınız IP adresini dinamik olarak aldıracaksınız. Bu fonksiyon asenkron olarak çağırıldığında `benimIP` değişkenine 
	bilgisayarınızın IP adresini atayacaktır. 
	Örnek dinamik URL kullanımı: var url = "https://apis.ergineer.com/ipgeoapi/"+benimIP; 
*/



//kodlar buraya gelecek