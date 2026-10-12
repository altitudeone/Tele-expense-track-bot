const TOKEN = "Placeholder";
const TELEGRAM_URL = "https://api.telegram.org/bot" + TOKEN;

function doPost(e) {
  const contents = JSON.parse(e.postData.contents);
  if (!contents.message || !contents.message.text) return;

  const chatId = contents.message.chat.id;
  const text = contents.message.text.trim();
  const userProperties = PropertiesService.getUserProperties();

  // 1. Ambil user yang sedang aktif (Default: )
  let currentUser = userProperties.getProperty("CURRENT_USER") || "Joan";

  // 2. Perintah Ganti User (/ganti <nama>)
  if (text.toLowerCase().startsWith("/ganti ")) {
    const newUser = text.split(" ").slice(1).join(" ").trim();
    if (newUser) {
      userProperties.setProperty("CURRENT_USER", newUser);
      let userTotal = parseInt(userProperties.getProperty("EXPENSE_" + newUser) || "0", 10);
      
      sendMessage(
        chatId, 
        `🔄 *Ganti User Success!*\n\n` +
        `👤 User Aktif: *${newUser}*\n` +
        `💰 Total Pengeluaran: *Rp ${userTotal.toLocaleString('id-ID')}*`
      );
      return;
    }
  }

  // 3. Perintah Cek Status User (/user)
  if (text.toLowerCase() === "/user") {
    let currentTotal = parseInt(userProperties.getProperty("EXPENSE_" + currentUser) || "0", 10);
    sendMessage(
      chatId, 
      `📌 *Status Saat Ini*\n\n` +
      `👤 User: *${currentUser}*\n` +
      `💰 Akumulasi Total: *Rp ${currentTotal.toLocaleString('id-ID')}*`
    );
    return;
  }

  // 4. Perintah Reset Pengeluaran User Aktif (/reset)
  if (text.toLowerCase() === "/reset") {
    userProperties.setProperty("EXPENSE_" + currentUser, "0");
    sendMessage(chatId, `🧹 Total pengeluaran untuk *${currentUser}* di-reset kembali ke *Rp 0*.`);
    return;
  }

  // 5. Ekstrak Angka & Otomatis Penjumlahan
  const cleanText = text.replace(/\./g, ''); // Hapus titik ribuan
  const numbers = cleanText.match(/\d+/g);

  if (numbers) {
    // JUMLAHKAN SEMUA ANGKA DALAM PESAN (misal: 6000 + 5000 = 11000)
    const amount = numbers.reduce((sum, num) => sum + Number(num), 0);
    
    // Ambil total lama dari Properties
    let rawTotal = userProperties.getProperty("EXPENSE_" + currentUser);
    let previousTotal = rawTotal ? Number(rawTotal) : 0;
    
    // Murni penjumlahan matematika total lama + input baru
    let newTotal = previousTotal + amount;

    // Simpan kembali
    userProperties.setProperty("EXPENSE_" + currentUser, newTotal.toString());

    sendMessage(
      chatId,
      `➕ *Catatan Ditambahkan*\n` +
      `• User: *${currentUser}*\n` +
      `• Input: Rp ${amount.toLocaleString('id-ID')}\n` +
      `-----------------------------------\n` +
      `📊 *Total Pengeluaran ${currentUser}: Rp ${newTotal.toLocaleString('id-ID')}*`
    );
  } else {
    sendMessage(
      chatId, 
      `💡 *Format Salah / Tidak Ada Angka*\n\n` +
      `Contoh catat: \`cilok 5000\` atau \`es 5.000\`\n` +
      `Ganti user: \`/ganti Budi\`\n` +
      `Cek total: \`/user\`\n` +
      `Reset total: \`/reset\``
    );
  }
}

function sendMessage(chatId, text) {
  UrlFetchApp.fetch(TELEGRAM_URL + "/sendMessage", {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify({
      chat_id: chatId,
      text: text,
      parse_mode: "Markdown"
    })
  });
}
