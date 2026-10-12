💰 Zero-Database Telegram Expense Tracker Bot

Bot Telegram simpel, ringan, dan cepat untuk mencatat serta memantau akumulasi pengeluaran harian tanpa butuh database eksternal. Dibuat menggunakan **Google Apps Script (GAS)** dengan memanfaatkan **`PropertiesService`** sebagai media penyimpanan data *state* pengguna.

---

✨ Fitur Utama

* Zero External Database:** Tidak memerlukan Google Sheets, MySQL, atau Firebase. Semua akumulasi data tersimpan langsung di dalam internal memory script (`PropertiesService`).
* Multi-User Switching:** Mendukung pencatatan untuk beberapa profil/nama (misal: `/ganti Harley`, `/ganti Budi`). Data tiap user tersimpan terpisah.
* Auto Multi-Line Math Summing:** Menggunakan metode array reduction (`reduce`) sehingga bisa menerima input banyak transaksi sekaligus dalam satu pesan (misal: `kopi 6000` + `susu 5000` otomatis dijumlahkan jadi `11000`).
* Format Number Tolerant:** Otomatis membersihkan titik format ribuan (misal: `5.000` dibaca `5000`).
* **Perintah Cepat:**
  * `/ganti <nama>` : Pindah sesi pencatatan ke user lain.
  * `/user` : Cek user aktif dan total akumulasi pengeluaran saat ini.
  * `/reset` : Mengosongkan/reset total pengeluaran user yang sedang aktif kembali ke Rp 0.


## 🛠️ Tech Stack

* **Language:** JavaScript (Google Apps Script / GAS)
* **Platform:** Telegram Bot API
* **Storage:** GAS `PropertiesService` (UserProperties)

---

## ⚙️ Cara Deploy & Instalasi

1. **Buat Bot Telegram:**
   * Chat `@BotFather` di Telegram, buat bot baru, lalu simpan **HTTP API Token** yang diberikan.

2. **Setup Google Apps Script:**
   * Buka [script.google.com](https://script.google.com) dan buat proyek baru.
   * *Copy-paste* kode `Code.gs` dari repositori ini.
   * Isi variabel `TOKEN` di baris paling atas dengan Token Bot Telegram milikmu.

3. **Deploy Web App:**
   * Klik **Deploy** > **New deployment**.
   * Pilih jenis **Web app**.
   * Set *Execute as*: **Me**.
   * Set *Who has access*: **Anyone**.
   * Klik **Deploy** dan salin **Web App URL**.

4. **Set Webhook Telegram:**
   * Buka URL berikut di browser kamu untuk menyambungkan Telegram ke GAS (ganti bagian yang ditandai):
     ```text
     [https://api.telegram.org/bot](https://api.telegram.org/bot)<TOKEN_BOT_KAMU>/setWebhook?url=<URL_WEB_APP_GAS>
     ```
   * Jika muncul respons `"Webhook was set"`, bot siap digunakan!

---

Crafted by: **WaktuLuangProject**
