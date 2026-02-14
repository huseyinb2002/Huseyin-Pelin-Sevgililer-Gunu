# Bizim Hikayemiz — Sevgililer Günü Web Sitesi (Çizgi Roman)

Kız arkadaşın için hazırlanan, birlikte geçen zamanı **çizgi roman** tarzında, kitap sayfası çevirir gibi anlatan bir web hikayesi. Comic versiyonu fotoğraflar, **bizim şarkılarımız** çalma listesi ve uzun bir **comic galeri** içerir.

## Ne var?

- **Kapak:** "Bizim Hikayemiz" çizgi roman tarzı başlık ve **Kitabı Aç** (tıklayınca müzik başlar)
- **Sayfa çevirme:** **‹** / **›** veya klavye ok tuşlarıyla sayfa çevirme animasyonu
- **5 bölümlük hikaye:** Her sayfada **comic panel** çerçevesinde fotoğraf + konuşma balonu cümlesi
- **Bizim Şarkılarımız:** Birden fazla favori şarkı; her birine tıklayıp çalabilirsin (playlist)
- **Bizim Çizgi Romanımız:** Uzun bir galeri — istediğin kadar comic fotoğrafı ekleyebilirsin
- **Mini oyun:** Kartlardan birini seç, mesajı aç
- **Kapanış:** Teşekkür sayfası
- **Müzik:** Sağ üstte arka plan şarkısını aç/kapat

## Fotoğrafları nasıl eklersin?

1. **Gemini ile karikatürize et:** Fotoğraflarını Gemini’de karikatür/çizim tarzına dönüştür.
2. **Bu klasöre koy:** `sevgililer-gunu/photos/` klasörüne aşağıdaki isimlerle kaydet:
   - `01-ilk-karsilasma.jpg` — İlk karşılaşma
   - `02-ilk-bulusma.jpg` — İlk buluşma
   - `03-ilk-tatil.jpg` — İlk tatil / gezi
   - `04-sevdigim-ani.jpg` — En sevdiğin anı
   - `05-bugun-yarin.jpg` — Bugün ve yarın

3. **Format:** JPG veya PNG. PNG kullanırsan `index.html` içinde ilgili bölümün `<img src="photos/...">` satırında `.jpg` yerine `.png` yaz.

İsimler yukarıdaki gibi olmalı ki sitede doğru yerde görünsün.

Fotoğraf eklemezsen sayfada gri placeholder kutuları görünür; metinler "Fotoğrafını buraya ekle" gibi bir uyarı gösterir.

## Metinleri nasıl değiştirirsin?

`index.html` dosyasını aç. Her bölümde:

- `class="chapter-title"` → Bölüm başlığı (örn. "İlk Karşılaşma")
- `class="chapter-text"` içindeki `<p>` → O bölümün hikaye cümlesi

Bunları kendi hikayene göre düzenle.

## Mini oyundaki mesajları değiştirmek

`index.html` içinde `class="card"` olan butonlarda `data-message="..."` değerleri var. Bunları kendi yazdığın kısa mesajlarla değiştirebilirsin.

## Arka plan şarkısı nasıl eklenir?

1. Şarkı dosyanı **MP3** (veya OGG) olarak hazırla.
2. `sevgililer-gunu/music/` klasörüne **sarki.mp3** adıyla koy. (OGG kullanırsan `sarki.ogg` da ekleyebilirsin; tarayıcı otomatik seçer.)
3. Sayfada "Kitabı Aç"a tıklayınca müzik başlar (tarayıcı izin verirse). Sağ üstteki 🔇/🔊 butonuyla istediğin zaman açıp kapatabilirsin.

Şarkı eklemezsen müzik butonu yine görünür; tıklayınca ses çalmaz.

### Playlist (Bizim Şarkılarımız) sayfası

- `index.html` içinde `.playlist-item` bloklarını kopyalayıp yapıştırarak yeni şarkı ekle.
- Her öğede: `data-src="music/dosya.mp3"` ve içindeki `track-title` metnini şarkı adı yap.
- Şarkı dosyalarını `music/` klasörüne koy (örn. `sarki2.mp3`, `sarki3.mp3`).

## Comic galeri (uzun fotoğraf listesi)

- Comic versiyonu fotoğraflarını `photos/` klasörüne ekle (örn. `comic-06.jpg`, `comic-07.jpg` …).
- `script.js` dosyasının en üstündeki **galleryPhotos** dizisini düzenle: her fotoğrafın yolunu ekle.
- İstediğin kadar fotoğraf ekleyebilirsin; galeri otomatik grid’de gösterilir.

Örnek:
```js
const galleryPhotos = [
  'photos/01-ilk-karsilasma.jpg',
  'photos/comic-06.jpg',
  'photos/comic-07.jpg'
  // ... daha fazla
];
```

## Siteyi nasıl açarım?

- `index.html` dosyasına çift tıkla (tarayıcıda açılır), veya
- Bir sunucu kullan: örn. `npx serve .` veya VS Code "Live Server" eklentisi ile `sevgililer-gunu` klasörünü açıp çalıştır.

---

Sevgililer Günü’nüz kutlu olsun.
