# Leonida Platinum Atlas

[![make.fun · gta6-trophy-guide-01](https://make.fun/badge/gta6-trophy-guide-01.svg)](https://make.fun/bounty/gta6-trophy-guide-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01)
[![rank](https://make.fun/badge/gta6-trophy-guide-01/ginzbitcoin/gta6-trophy-guide-01/rank.svg)](https://make.fun/bounty/gta6-trophy-guide-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01)
[![reward](https://make.fun/badge/gta6-trophy-guide-01/ginzbitcoin/gta6-trophy-guide-01/reward.svg)](https://make.fun/bounty/gta6-trophy-guide-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01)

Panduan trofi PS5 Grand Theft Auto VI: 55 trofi lengkap dengan tracker offline.

## Apa ini

Leonida Platinum Atlas adalah panduan dan tracker trofi GTA VI untuk PS5. Semua data trofi tersimpan lokal di `app/data/trophies.json`, aplikasi berjalan offline penuh, dan progres checklist tersimpan di localStorage browser kamu.

Isi panduan:

- 1 platinum: Vice Got a Price, buka semua 54 trofi lain
- 2 gold: tamat cerita utama dan 100% penyelesaian game
- 6 silver: penguasaan wilayah, tempur, berkendara, dan koleksi
- 46 bronze: misi cerita, eksplorasi, aktivitas, dan koleksi Leonida
- 5 trofi missable: ditandai jelas MISSABLE, kerjakan sebelum tamat supaya tidak terlewat permanen

Total 55 trofi. Tiap trofi punya panduan cara dapat dan tips praktis, dengan ikon SVG sesuai kategorinya.

## Cara pakai

Buka `app/index.html` langsung di browser, atau jalankan server lokal:

```bash
npx tsx serve.ts
```

Lalu buka http://localhost:8000 di browser.

Tiga tab di aplikasi:

1. Checklist: daftar 55 trofi, centang yang sudah didapat, progres tersimpan otomatis
2. Roadmap: tahapan main dari prolog sampai platinum, urutan yang disarankan
3. Missable: 5 trofi yang bisa terlewat, lengkap dengan jendela waktunya

## Struktur repo

- `app/index.html`: halaman aplikasi
- `app/style.css`: gaya visual bertema GTA VI
- `app/app.js`: logika tab, tracker, dan render trofi
- `app/data/trophies.json`: data 55 trofi
- `main.ts`: entrypoint, mencetak ringkasan trofi
- `serve.ts`: server statis folder app di port 8000
- `screenshots/`: tangkapan layar tiap tab

## Referral

Referral: `fv6v3cs2`

## Lisensi

MIT, lihat file LICENSE.
