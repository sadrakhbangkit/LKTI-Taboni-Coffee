import React, { useState, useEffect } from 'react';
import { getCoffees } from './services/api';

export default function App() {
  const [lang, setLang] = useState('id'); // 'id' (Indonesia) atau 'en' (English)

  const defaultCoffeesData = {
    id: [
      {
        id: 1,
        name: 'Kopi Natural (Natural Proses)',
        category: 'Natural Proses',
        process_type: 'Natural Process',
        roast_level: 'Medium Roast',
        price: 75000,
        image: '/kopi premium.jpeg',
        description: "-Rasa cenderung lebih manis dan beraroma buah.\n-Bisa muncul karakter stroberi, blueberry, buah matang, atau fermentasi.\nBody (ketebalan rasa di mulut) biasanya terasa lebih penuh.\nSangat bergantung pada kematangan buah dan kebersihan fermentasi."
      },
      {
        id: 2,
        name: 'Kopi Premium',
        category: 'Premium Grade',
        process_type: 'Full Washed',
        roast_level: 'Medium Roast',
        price: 65000,
        image: '/kopi premium.jpeg',
        description: "Rasa lebih bersih dan seimbang jika bahan bakunya bagus.\nAroma bisa berupa cokelat, karamel, bunga, atau buah.\nAftertaste (rasa yang tertinggal setelah diminum) lebih menyenangkan.\nBiasanya dipilih dari biji dengan cacat lebih sedikit.\nCatatan: Premium bukan satu standar mutu universal."
      },
      {
        id: 3,
        name: 'Kopi Lanang (Peaberry)',
        category: 'Single Bean Selection',
        process_type: 'Natural / Washed',
        roast_level: 'Medium Roast',
        price: 85000,
        image: '/kopi premium.jpeg',
        description: "Bentuk bijinya bulat dan tunggal.\nUmumnya terdapat satu biji di dalam buah kopi, bukan dua.\nRasa bisa lebih pekat atau intens, tetapi tidak otomatis lebih enak daripada kopi biasa.\nHarga dapat lebih tinggi jika diseleksi dan diminati pembeli."
      },
      {
        id: 4,
        name: 'Kopi Grade 2',
        category: 'Commercial Grade',
        process_type: 'Washed / Giling Basah',
        roast_level: 'Medium Roast',
        price: 50000,
        image: '/kopi premium.jpeg',
        description: "Rasa: umumnya seimbang, aroma kopi cukup kuat.\nBisa terasa cokelat, kacang, rempah, atau sedikit buah.\nKualitas fisik bijinya berada di bawah Grade 1.\nCocok untuk kopi konsumsi harian dan pasar komersial."
      }
    ],
    en: [
      {
        id: 1,
        name: 'Natural Coffee (Natural Process)',
        category: 'Natural Process',
        process_type: 'Natural Process',
        roast_level: 'Medium Roast',
        price: 75000,
        image: '/kopi premium.jpeg',
        description: "-Taste tends to be sweeter with a fruity aroma.\n-Notes of strawberry, blueberry, ripe fruit, or fermentation may appear.\nBody (mouthfeel thickness) usually feels fuller.\nHighly dependent on fruit ripeness and fermentation cleanliness."
      },
      {
        id: 2,
        name: 'Premium Coffee',
        category: 'Premium Grade',
        process_type: 'Full Washed',
        roast_level: 'Medium Roast',
        price: 65000,
        image: '/kopi premium.jpeg',
        description: "Cleaner and more balanced taste when using high-quality raw cherries.\nAroma can feature chocolate, caramel, floral, or fruity notes.\nAftertaste is more pleasant and lingering.\nTypically selected from beans with fewer defects.\nNote: Premium is not a single universal quality standard."
      },
      {
        id: 3,
        name: 'Peaberry Coffee (Kopi Lanang)',
        category: 'Single Bean Selection',
        process_type: 'Natural / Washed',
        roast_level: 'Medium Roast',
        price: 85000,
        image: '/kopi premium.jpeg',
        description: "The bean shape is round and single.\nGenerally, there is only one bean inside the coffee cherry instead of two.\nFlavor can be bolder or more intense, though not automatically better than regular beans.\nPrice can be higher if carefully sorted and in high demand."
      },
      {
        id: 4,
        name: 'Grade 2 Coffee',
        category: 'Commercial Grade',
        process_type: 'Washed / Wet-Hulled',
        roast_level: 'Medium Roast',
        price: 50000,
        image: '/kopi premium.jpeg',
        description: "Taste: generally balanced with a fairly strong coffee aroma.\nMay carry notes of chocolate, nuts, spices, or mild fruit.\nPhysical bean quality is below Grade 1.\nSuitable for daily consumption and the commercial market."
      }
    ]
  };

  const [apiCoffees, setApiCoffees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' atau 'katalog'
  const [selectedProcess, setSelectedProcess] = useState('natural'); // 'natural', 'lanang', 'premium', 'grade2'

  useEffect(() => {
    getCoffees()
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setApiCoffees(data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching data:', err);
        setLoading(false);
      });
  }, []);

  // Gabungkan data bahasa yang dipilih dengan sinkronisasi harga & foto terbaru
  const coffees = defaultCoffeesData[lang].map((item, idx) => ({
    ...item,
    id: apiCoffees[idx]?.id || item.id,
  }));

  // Kamus Teks Antarmuka & Konten (ID & EN)
  const content = {
    id: {
      subtitle: 'Bubuk Kopi Arabika Lintong',
      navDashboard: 'Dashboard',
      navCatalog: 'Katalog Produk',
      badgeLocation: 'NAGASARIBU, LINTONGNIHUTA, HUMBANG HASUNDUTAN',
      ownerLabel: 'Pengusaha Taboni Coffee:',
      historyP1: (
        <>
          Perjalanan <strong>Taboni Coffee</strong> berawal pada tahun 2015 ketika keluarga <strong>Bang Alexsander Panjaitan</strong> merintis usaha pengepulan biji kopi di <strong>Nagasaribu, Kabupaten Humbang Hasundutan, Sumatera Utara</strong>, dengan nama toko yang akrab dikenal masyarakat sekitar sebagai <strong>&ldquo;Si Alex&rdquo;</strong>. Sejak awal berdiri pada tahun 2015, usaha ini langsung menjalin kerja sama dengan <strong>Perusahaan Full Coffee</strong> dan mengembangkan dua varietas bibit unggulan, yakni <strong>Blending Kopi Lasuna</strong> dan <strong>Kopi Sigararutang</strong>.
        </>
      ),
      historyP2: (
        <>
          Pada <strong>April 2018</strong>, merek <strong>&ldquo;Taboni Coffee&rdquo;</strong> resmi lahir sebagai identitas bisnis mereka. Seiring berjalannya waktu, kualitas cita rasa <strong>Taboni Coffee</strong> semakin dikenal luas hingga keluar Pulau Sumatera dan menembus pasar mancanegara dengan nama besar <strong>&ldquo;Kopi Lintong&rdquo;</strong>.
        </>
      ),
      milestones: [
        {
          tag: '2015 • Awal Merintis',
          title: 'Toko Pengepul “Si Alex”',
          desc: 'Bermitra dengan Full Coffee; bibit Blending Kopi Lasuna & Sigararutang.'
        },
        {
          tag: 'April 2018 • Transformasi',
          title: 'Lahirnya “Taboni Coffee”',
          desc: 'Dukungan gedung pabrik pemerintah memicu produksi bubuk kopi mandiri.'
        },
        {
          tag: 'Ekspansi Pasar',
          title: 'Mendunia sebagai “Kopi Lintong”',
          desc: 'Dikenal luas di luar Sumatera hingga pasar luar negeri.'
        }
      ],
      btnSeeAll: 'Lihat Seluruh Produk Taboni Coffee',
      processHeading: 'Alur Cara Pembuatan Kopi Lintong',
      processSub: 'Tahapan proses pengolahan pascapanen hingga menjadi produk Taboni Coffee siap seduh.',
      tabs: [
        { id: 'natural', label: '1. Kopi Natural' },
        { id: 'lanang', label: '2. Kopi Lanang' },
        { id: 'premium', label: '3. Kopi Premium' },
        { id: 'grade2', label: '4. Kopi Grade 2' }
      ],
      titleNatural: '1. Proses Kopi Natural',
      prosesNatural: [
        'Petik buah kopi yang sudah merah matang.',
        'Sortir buah yang busuk, mentah, dan rusak.',
        'Cuci atau bersihkan kotoran.',
        'Jemur buah kopi utuh kurang lebih seminggu, tidak dikupas kulitnya.',
        'Balik secara berkala agar kering merata dan tidak berjamur.',
        'Setelah kering stabil, kupas kulit kering menggunakan mesin huller.',
        'Sortir biji kopi hijau (green bean).',
        'Simpan dalam karung yang bersih dan kering.'
      ],
      titleLanang: '2. Proses Kopi Lanang',
      prosesLanang: [
        'Panen buah kopi merah matang seperti biasa.',
        'Lakukan pengolahan Natural atau Washed.',
        'Setelah menjadi green bean, lakukan penyortiran.',
        'Pisahkan biji lanang yang berbentuk bulat tunggal dari biji normal yang pipih.',
        'Bersihkan dan sortir berdasarkan ukuran serta cacat biji.'
      ],
      premiumRawTitle: '1. Bahan baku untuk kopi premium',
      premiumRawList: [
        'Pilih buah kopi yang merah matang.',
        'Jangan campur buah hijau, kuning, busuk, atau kering.',
        'Petik dengan tangan agar buah tidak rusak.',
        'Gunakan wadah panen yang bersih.'
      ],
      premiumKey: 'Kunci premium: kualitas premium dimulai dari pemilihan buah, bukan dari mesin pengolahan.',
      premiumStepsTitle: '2. Tahapan proses Kopi Premium',
      prosesPremium: [
        {
          title: 'Tahap 1. Sortir buah',
          desc: 'Masukkan buah merah ke bak berisi air bersih. Pisahkan buah yang mengapung, busuk, dan rusak. Gunakan buah matang yang bagus.'
        },
        {
          title: 'Tahap 2. Pengupasan kulit',
          desc: 'Gunakan mesin pulper untuk memisahkan kulit dan daging buah dari biji. Sebaiknya dilakukan pada hari yang sama dengan panen.'
        },
        {
          title: 'Tahap 3. Fermentasi',
          desc: 'Masukkan biji yang masih berlendir ke dalam wadah bersih. Untuk percobaan awal, gunakan fermentasi sekitar 12–24 jam. Waktu harus disesuaikan dengan suhu dan kondisi lendir.\nJangan hanya mengandalkan jam. Periksa apakah lendir sudah mudah terlepas dan tidak muncul bau busuk.'
        },
        {
          title: 'Tahap 4. Pencucian',
          desc: 'Cuci dengan air bersih sampai lendir hilang. Pisahkan biji yang rusak dan kotor.'
        },
        {
          title: 'Tahap 5. Penjemuran',
          desc: 'Jemur biji yang masih memiliki kulit tanduk (parchment) di atas para-para atau jaring bersih. Hamparkan tipis sekitar 3–5 cm dan balik secara berkala.\nHindari hujan, embun berlebihan, dan pengeringan yang terlalu panas.'
        },
        {
          title: 'Tahap 6. Pengukuran kadar air',
          desc: 'Targetkan sekitar 10–12% untuk persiapan penyimpanan green bean. Gunakan alat ukur kadar air khusus kopi, bukan hanya perkiraan tangan.'
        },
        {
          title: 'Tahap 7. Pengupasan kulit tanduk',
          desc: 'Gunakan mesin huller untuk mengupas kulit tanduk yang sudah kering. Hasilnya adalah green bean.'
        },
        {
          title: 'Tahap 8. Sortir akhir',
          desc: 'Pisahkan biji hitam, pecah, berlubang, berjamur, dan benda asing. Kelompokkan berdasarkan ukuran dan kepadatan jika tersedia alatnya.'
        }
      ],
      premiumTestTitle: '3. Bagaimana memastikan hasilnya benar-benar premium?',
      premiumTestSub: 'Ada dua pengujian yang harus dilakukan:',
      premiumTestList: [
        'Uji fisik: kadar air, ukuran biji, warna, jumlah biji cacat, dan kebersihan.',
        'Uji cita rasa (cupping): aroma, rasa manis, keasaman, body, aftertaste, dan keseragaman rasa.'
      ],
      grade2StepsTitle: '1. Tahapan pengolahan Kopi Grade 2',
      prosesGrade2: [
        {
          title: '1. Panen buah merah',
          desc: 'Petik buah yang benar-benar merah matang. Pisahkan buah hijau, hitam, busuk, dan berlubang.'
        },
        {
          title: '2. Sortasi buah',
          desc: 'Bersihkan daun, ranting, tanah, dan kerikil. Pisahkan buah yang rusak atau terserang hama.'
        },
        {
          title: '3. Pengupasan',
          desc: 'Gunakan mesin pulper untuk memisahkan kulit merah dari biji kopi.'
        },
        {
          title: '4. Fermentasi',
          desc: 'Masukkan biji berlendir ke wadah bersih selama sekitar 12–36 jam. Sesuaikan waktu dengan suhu dan kondisi lendir.'
        },
        {
          title: '5. Pencucian',
          desc: 'Cuci sampai lendir bersih dan pisahkan kotoran.'
        },
        {
          title: '6. Penjemuran',
          desc: 'Jemur di atas para-para atau alas bersih. Balik secara berkala. Targetkan kadar air maksimal 12,5%.'
        },
        {
          title: '7. Pengupasan kulit tanduk',
          desc: 'Gunakan mesin huller sampai menjadi green bean.'
        },
        {
          title: '8. Sortasi akhir',
          desc: 'Pisahkan biji hitam, cokelat, pecah, berlubang, biji muda, serta benda asing.'
        }
      ],
      grade2CheckTitle: '2. Cara menentukan apakah sudah Grade 2',
      grade2CheckSub: 'Ambil green bean sebanyak 300 gram, kemudian:',
      grade2CheckList: [
        'Timbang sampel.',
        'Pisahkan biji yang cacat.',
        'Hitung nilai cacat masing-masing.',
        'Jumlahkan seluruh nilai cacat.'
      ],
      grade2DefectExample: 'Contoh nilai cacat:',
      grade2TableHead1: 'Jenis cacat',
      grade2TableHead2: 'Nilai',
      nilaiCacatGrade2: [
        { jenis: '1 biji hitam', nilai: '1' },
        { jenis: '1 biji cokelat', nilai: '0,25' },
        { jenis: '1 biji pecah', nilai: '0,2' },
        { jenis: '1 biji berlubang satu', nilai: '0,1' },
        { jenis: '1 batu besar', nilai: '5' }
      ],
      grade2Conclusion: 'Jika hasil perhitungan sampel 300 gram adalah 18, berarti masuk Grade 2.',
      catalogHeading: 'Katalog Seluruh Taboni Coffee',
      catalogSub: 'Daftar lengkap varian kopi Lintong terdaftar',
      btnBack: '← Kembali ke Dashboard',
      loadingText: 'Memuat data kopi...',
      verifiedBadge: 'Terverifikasi'
    },

    en: {
      subtitle: 'Lintong Arabica Ground Coffee',
      navDashboard: 'Dashboard',
      navCatalog: 'Product Catalog',
      badgeLocation: 'NAGASARIBU, LINTONGNIHUTA, HUMBANG HASUNDUTAN',
      ownerLabel: 'Taboni Coffee Owner:',
      historyP1: (
        <>
          The journey of <strong>Taboni Coffee</strong> began in 2015 when <strong>Bang Alexsander Panjaitan&rsquo;s</strong> family started a coffee bean collection business in <strong>Nagasaribu, Humbang Hasundutan Regency, North Sumatra</strong>, under a shop name locally known as <strong>&ldquo;Si Alex&rdquo;</strong>. Right from its founding in 2015, the business partnered directly with <strong>Perusahaan Full Coffee</strong> and cultivated two flagship seed varieties: <strong>Blending Kopi Lasuna</strong> and <strong>Kopi Sigararutang</strong>.
        </>
      ),
      historyP2: (
        <>
          In <strong>April 2018</strong>, the brand <strong>&ldquo;Taboni Coffee&rdquo;</strong> was officially established as their business identity. Over time, the distinctive quality and flavor of <strong>Taboni Coffee</strong> gained wide recognition beyond Sumatra and reached international markets under the renowned name <strong>&ldquo;Kopi Lintong&rdquo;</strong>.
        </>
      ),
      milestones: [
        {
          tag: '2015 • Early Beginnings',
          title: '“Si Alex” Collector Shop',
          desc: 'Partnered with Full Coffee; Blending Kopi Lasuna & Sigararutang seeds.'
        },
        {
          tag: 'April 2018 • Transformation',
          title: 'Birth of “Taboni Coffee”',
          desc: 'Government processing factory support sparked independent ground coffee production.'
        },
        {
          tag: 'Market Expansion',
          title: 'Global Reach as “Kopi Lintong”',
          desc: 'Well-known outside Sumatra and exported to international markets.'
        }
      ],
      btnSeeAll: 'View All Taboni Coffee Products',
      processHeading: 'Lintong Coffee Production Process',
      processSub: 'Post-harvest processing stages from cherry picking to ready-to-brew Taboni Coffee.',
      tabs: [
        { id: 'natural', label: '1. Natural Coffee' },
        { id: 'lanang', label: '2. Peaberry Coffee' },
        { id: 'premium', label: '3. Premium Coffee' },
        { id: 'grade2', label: '4. Grade 2 Coffee' }
      ],
      titleNatural: '1. Natural Coffee Process',
      prosesNatural: [
        'Harvest fully ripe red coffee cherries.',
        'Sort out rotten, unripe, and damaged cherries.',
        'Wash or clean off dirt and impurities.',
        'Sun-dry whole coffee cherries for about one week without removing the skin.',
        'Turn periodically so they dry evenly and do not develop mold.',
        'Once stably dry, remove the dried husk using a huller machine.',
        'Sort the green coffee beans.',
        'Store in clean, dry sacks.'
      ],
      titleLanang: '2. Peaberry Coffee (Kopi Lanang) Process',
      prosesLanang: [
        'Harvest ripe red coffee cherries as usual.',
        'Perform either Natural or Washed processing.',
        'Once processed into green beans, perform sorting.',
        'Separate the single round peaberry beans from the regular flat-sided beans.',
        'Clean and sort based on bean size and defects.'
      ],
      premiumRawTitle: '1. Raw materials for premium coffee',
      premiumRawList: [
        'Select only fully ripe red coffee cherries.',
        'Do not mix green, yellow, rotten, or dried cherries.',
        'Hand-pick carefully so the cherries are not damaged.',
        'Use clean harvesting containers.'
      ],
      premiumKey: 'Key to premium: premium quality starts with cherry selection, not processing machinery.',
      premiumStepsTitle: '2. Premium Coffee processing stages',
      prosesPremium: [
        {
          title: 'Stage 1. Cherry sorting',
          desc: 'Place red cherries into a tank of clean water. Separate floating, rotten, and damaged cherries. Use only good ripe cherries.'
        },
        {
          title: 'Stage 2. Pulping',
          desc: 'Use a pulper machine to separate the skin and pulp from the beans. Ideally done on the same day as harvest.'
        },
        {
          title: 'Stage 3. Fermentation',
          desc: 'Place the mucilage-covered beans into a clean container. For initial batches, ferment for about 12–24 hours. Adjust timing based on temperature and mucilage condition.\nDo not rely solely on the clock. Check whether the mucilage detaches easily and ensure no foul odor develops.'
        },
        {
          title: 'Stage 4. Washing',
          desc: 'Wash with clean water until all mucilage is removed. Separate damaged and dirty beans.'
        },
        {
          title: 'Stage 5. Drying',
          desc: 'Dry the parchment coffee on raised drying beds or clean nets. Spread thinly about 3–5 cm and turn periodically.\nProtect from rain, excessive dew, and overly intense heat.'
        },
        {
          title: 'Stage 6. Moisture measurement',
          desc: 'Target around 10–12% moisture for green bean storage preparation. Use a dedicated coffee moisture meter rather than relying on hand estimation.'
        },
        {
          title: 'Stage 7. Hulling',
          desc: 'Use a huller machine to remove the dried parchment skin. The result is green bean.'
        },
        {
          title: 'Stage 8. Final sorting',
          desc: 'Remove black, broken, insect-damaged, moldy beans, and foreign matter. Grade by size and density if equipment is available.'
        }
      ],
      premiumTestTitle: '3. How to ensure the result is truly premium?',
      premiumTestSub: 'Two tests must be conducted:',
      premiumTestList: [
        'Physical test: moisture content, bean size, color, defect count, and cleanliness.',
        'Cupping test: aroma, sweetness, acidity, body, aftertaste, and flavor uniformity.'
      ],
      grade2StepsTitle: '1. Grade 2 Coffee processing stages',
      prosesGrade2: [
        {
          title: '1. Red cherry harvesting',
          desc: 'Pick truly ripe red cherries. Separate green, black, rotten, and perforated cherries.'
        },
        {
          title: '2. Cherry sorting',
          desc: 'Remove leaves, twigs, soil, and pebbles. Separate damaged or pest-affected cherries.'
        },
        {
          title: '3. Pulping',
          desc: 'Use a pulper machine to separate the red skin from the coffee beans.'
        },
        {
          title: '4. Fermentation',
          desc: 'Place mucilage-covered beans in a clean container for about 12–36 hours. Adjust duration according to temperature and mucilage condition.'
        },
        {
          title: '5. Washing',
          desc: 'Wash until the mucilage is clean and remove impurities.'
        },
        {
          title: '6. Drying',
          desc: 'Dry on raised beds or clean mats. Turn periodically. Target a maximum moisture content of 12.5%.'
        },
        {
          title: '7. Hulling',
          desc: 'Use a huller machine to produce green beans.'
        },
        {
          title: '8. Final sorting',
          desc: 'Separate black, brown, broken, perforated, immature beans, and foreign matter.'
        }
      ],
      grade2CheckTitle: '2. How to determine if it qualifies as Grade 2',
      grade2CheckSub: 'Take a 300-gram sample of green beans, then:',
      grade2CheckList: [
        'Weigh the sample.',
        'Separate the defective beans.',
        'Calculate each defect value.',
        'Sum up all defect values.'
      ],
      grade2DefectExample: 'Example of defect values:',
      grade2TableHead1: 'Defect type',
      grade2TableHead2: 'Value',
      nilaiCacatGrade2: [
        { jenis: '1 black bean', nilai: '1' },
        { jenis: '1 brown bean', nilai: '0.25' },
        { jenis: '1 broken bean', nilai: '0.2' },
        { jenis: '1 single-hole bean', nilai: '0.1' },
        { jenis: '1 large stone', nilai: '5' }
      ],
      grade2Conclusion: 'If the total calculation for the 300-gram sample is 18, it qualifies as Grade 2.',
      catalogHeading: 'All Taboni Coffee Catalog',
      catalogSub: 'Complete list of registered Lintong coffee variants',
      btnBack: '← Back to Dashboard',
      loadingText: 'Loading coffee data...',
      verifiedBadge: 'Verified'
    }
  };

  const t = content[lang];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF5EF] text-[#2C1D11]">
      {/* Navbar Responsif + Tombol Pilihan Bahasa */}
      <header className="bg-[#3C2A21] text-[#E5D3C0] py-4 px-4 sm:px-8 flex flex-col sm:flex-row justify-between items-center shadow-md sticky top-0 z-50 gap-3 sm:gap-0">
        <div className="cursor-pointer text-center sm:text-left" onClick={() => setActiveTab('dashboard')}>
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-wider text-[#F3E5D8]">TABONI COFFEE</h1>
          <p className="text-[11px] sm:text-xs text-[#D5B99B]">{t.subtitle}</p>
        </div>

        <div className="flex items-center space-x-5 sm:space-x-6">
          <nav className="flex space-x-5 sm:space-x-6 text-sm font-semibold">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`transition pb-1 ${activeTab === 'dashboard' ? 'text-[#E28941] border-b-2 border-[#E28941]' : 'hover:text-[#F3E5D8]'}`}
            >
              {t.navDashboard}
            </button>
            <button
              onClick={() => setActiveTab('katalog')}
              className={`transition pb-1 ${activeTab === 'katalog' ? 'text-[#E28941] border-b-2 border-[#E28941]' : 'hover:text-[#F3E5D8]'}`}
            >
              {t.navCatalog}
            </button>
          </nav>

          {/* Toggle Pilihan Bahasa (ID / EN) */}
          <div className="flex items-center bg-[#2C1D11] rounded-lg p-1 border border-[#5A4235]">
            <button
              onClick={() => setLang('id')}
              className={`px-2.5 py-1 rounded-md text-xs font-bold transition ${
                lang === 'id'
                  ? 'bg-[#E28941] text-white shadow-xs'
                  : 'text-[#D5B99B] hover:text-white'
              }`}
            >
              ID
            </button>
            <button
              onClick={() => setLang('en')}
              className={`px-2.5 py-1 rounded-md text-xs font-bold transition ${
                lang === 'en'
                  ? 'bg-[#E28941] text-white shadow-xs'
                  : 'text-[#D5B99B] hover:text-white'
              }`}
            >
              EN
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-5xl mx-auto p-4 sm:p-6 w-full space-y-8 sm:space-y-10">

        {/* ================= TAMPILAN DASHBOARD ================= */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8 sm:space-y-10">

            {/* 1. SECTION UTAMA TABONI COFFEE & SEJARAH BERDIRINYA */}
            <section className="bg-white p-5 sm:p-8 rounded-2xl shadow-sm border border-[#E5D3C0] space-y-6">

              {/* Header Bagian Atas: Badge + Nama Usaha & Info Pengusaha */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-[#E5D3C0] pb-6 gap-5">
                <div className="w-full md:w-auto">
                  <span className="inline-block bg-[#D67B2A] text-white text-[10px] sm:text-xs font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider max-w-full leading-normal">
                    {t.badgeLocation}
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-extrabold text-[#3C2A21] mt-3">
                    Taboni Coffee
                  </h2>
                </div>

                {/* Info Pengusaha Taboni Coffee */}
                <div className="bg-[#FFF8F0] p-4 rounded-xl border border-[#E5D3C0] w-full md:w-auto text-left md:text-right shadow-xs">
                  <p className="text-xs text-slate-500 font-medium">{t.ownerLabel}</p>
                  <p className="text-sm font-bold text-[#3C2A21]">Alexsander Panjaitan</p>
                  <p className="text-xs text-[#E28941] font-semibold mt-0.5">Contact: +62857-1106-8732</p>
                </div>
              </div>

              {/* Narasi Sejarah & Awal Mula Taboni Coffee */}
              <div className="space-y-4 text-slate-700 leading-relaxed text-sm sm:text-base">
                <p>{t.historyP1}</p>
                <p>{t.historyP2}</p>
              </div>

              {/* Highlight Jejak Perjalanan Singkat (Milestone) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                {t.milestones.map((item, idx) => (
                  <div key={idx} className="bg-[#FFF8F0] border border-[#E5D3C0] rounded-xl p-3.5">
                    <span className="text-[11px] font-bold text-[#E28941] uppercase">{item.tag}</span>
                    <p className="text-xs sm:text-sm font-bold text-[#3C2A21] mt-0.5">{item.title}</p>
                    <p className="text-xs text-slate-600 mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>

              {/* Tombol Lihat Seluruh Produk */}
              <div className="pt-2">
                <button
                  onClick={() => setActiveTab('katalog')}
                  className="w-full sm:w-auto bg-[#3C2A21] hover:bg-[#4A3525] text-[#F3E5D8] px-6 py-3 rounded-xl font-bold transition flex items-center justify-center gap-3 shadow-md hover:shadow-lg text-sm sm:text-base"
                >
                  <span>{t.btnSeeAll}</span>
                  <span className="text-[#E28941]">→</span>
                </button>
              </div>
            </section>

            {/* 2. SECTION ALUR PROSES PEMBUATAN KOPI (4 JENIS) */}
            <section className="bg-white p-5 sm:p-8 rounded-2xl shadow-sm border border-[#E5D3C0]">
              <div className="mb-6 border-b border-[#E5D3C0] pb-5">
                <h2 className="text-xl sm:text-2xl font-bold text-[#3C2A21]">{t.processHeading}</h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 mb-5">
                  {t.processSub}
                </p>

                {/* Tab Pilihan Jenis Proses Pembuatan */}
                <div className="flex flex-wrap gap-2">
                  {t.tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setSelectedProcess(tab.id)}
                      className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
                        selectedProcess === tab.id
                          ? 'bg-[#3C2A21] text-[#F3E5D8] shadow-sm'
                          : 'bg-[#FFF8F0] text-[#3C2A21] border border-[#E5D3C0] hover:bg-[#F3E5D8]'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* --- TAB 1: PROSES NATURAL --- */}
              {selectedProcess === 'natural' && (
                <div className="space-y-6">
                  <h3 className="text-lg sm:text-xl font-bold text-[#3C2A21]">{t.titleNatural}</h3>
                  <div className="space-y-5 relative before:absolute before:inset-0 before:left-4 sm:before:left-5 before:w-0.5 before:bg-[#E5D3C0]">
                    {t.prosesNatural.map((stepText, index) => (
                      <div key={index} className="relative flex items-center gap-4 sm:gap-6">
                        <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#3C2A21] text-[#E28941] font-extrabold flex items-center justify-center text-xs sm:text-sm shadow border-2 border-[#FAF5EF] z-10">
                          {String(index + 1).padStart(2, '0')}
                        </div>
                        <p className="text-xs sm:text-sm font-medium text-[#3C2A21] flex-1">
                          {stepText}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* --- TAB 2: PROSES LANANG --- */}
              {selectedProcess === 'lanang' && (
                <div className="space-y-6">
                  <h3 className="text-lg sm:text-xl font-bold text-[#3C2A21]">{t.titleLanang}</h3>
                  <div className="space-y-5 relative before:absolute before:inset-0 before:left-4 sm:before:left-5 before:w-0.5 before:bg-[#E5D3C0]">
                    {t.prosesLanang.map((stepText, index) => (
                      <div key={index} className="relative flex items-center gap-4 sm:gap-6">
                        <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#3C2A21] text-[#E28941] font-extrabold flex items-center justify-center text-xs sm:text-sm shadow border-2 border-[#FAF5EF] z-10">
                          {String(index + 1).padStart(2, '0')}
                        </div>
                        <p className="text-xs sm:text-sm font-medium text-[#3C2A21] flex-1">
                          {stepText}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* --- TAB 3: KOPI PREMIUM --- */}
              {selectedProcess === 'premium' && (
                <div className="space-y-8">
                  {/* 1. Bahan baku untuk kopi premium */}
                  <div className="bg-[#FFF8F0] border border-[#E5D3C0] rounded-xl p-5 space-y-2.5">
                    <h3 className="text-base sm:text-lg font-bold text-[#3C2A21]">
                      {t.premiumRawTitle}
                    </h3>
                    <ul className="list-disc list-inside text-xs sm:text-sm text-slate-700 space-y-1.5">
                      {t.premiumRawList.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                    <p className="text-xs sm:text-sm font-bold text-[#3C2A21] pt-1">
                      {t.premiumKey}
                    </p>
                  </div>

                  {/* 2. Tahapan proses premium */}
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-[#3C2A21] mb-5">
                      {t.premiumStepsTitle}
                    </h3>
                    <div className="space-y-6 sm:space-y-7 relative before:absolute before:inset-0 before:left-4 sm:before:left-5 before:w-0.5 before:bg-[#E5D3C0]">
                      {t.prosesPremium.map((item, index) => (
                        <div key={index} className="relative flex items-start gap-4 sm:gap-6">
                          <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#3C2A21] text-[#E28941] font-extrabold flex items-center justify-center text-xs sm:text-sm shadow border-2 border-[#FAF5EF] z-10">
                            {String(index + 1).padStart(2, '0')}
                          </div>
                          <div className="pt-0.5 flex-1">
                            <h4 className="font-bold text-[#3C2A21] text-sm sm:text-base mb-1">{item.title}</h4>
                            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                              {item.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 3. Bagaimana memastikan hasilnya benar-benar premium? */}
                  <div className="bg-[#FFF8F0] border border-[#E5D3C0] rounded-xl p-5 space-y-2">
                    <h3 className="text-base sm:text-lg font-bold text-[#3C2A21]">
                      {t.premiumTestTitle}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-700">
                      {t.premiumTestSub}
                    </p>
                    <ul className="list-disc list-inside text-xs sm:text-sm text-slate-700 space-y-1.5">
                      {t.premiumTestList.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* --- TAB 4: GRADE 2 --- */}
              {selectedProcess === 'grade2' && (
                <div className="space-y-8">
                  {/* 1. Tahapan pengolahan Grade 2 */}
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-[#3C2A21] mb-5">
                      {t.grade2StepsTitle}
                    </h3>
                    <div className="space-y-6 sm:space-y-7 relative before:absolute before:inset-0 before:left-4 sm:before:left-5 before:w-0.5 before:bg-[#E5D3C0]">
                      {t.prosesGrade2.map((item, index) => (
                        <div key={index} className="relative flex items-start gap-4 sm:gap-6">
                          <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#3C2A21] text-[#E28941] font-extrabold flex items-center justify-center text-xs sm:text-sm shadow border-2 border-[#FAF5EF] z-10">
                            {String(index + 1).padStart(2, '0')}
                          </div>
                          <div className="pt-0.5 flex-1">
                            <h4 className="font-bold text-[#3C2A21] text-sm sm:text-base mb-1">{item.title}</h4>
                            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                              {item.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 2. Cara menentukan apakah sudah Grade 2 */}
                  <div className="bg-[#FFF8F0] border border-[#E5D3C0] rounded-xl p-5 space-y-3">
                    <h3 className="text-base sm:text-lg font-bold text-[#3C2A21]">
                      {t.grade2CheckTitle}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-700">
                      {t.grade2CheckSub}
                    </p>
                    <ul className="list-disc list-inside text-xs sm:text-sm text-slate-700 space-y-1">
                      {t.grade2CheckList.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>

                    <div className="pt-2">
                      <p className="text-xs sm:text-sm font-bold text-[#3C2A21] mb-2">
                        {t.grade2DefectExample}
                      </p>
                      <div className="overflow-x-auto">
                        <table className="w-full max-w-sm text-xs sm:text-sm text-left border border-[#E5D3C0] bg-white rounded-lg overflow-hidden">
                          <thead className="bg-[#3C2A21] text-[#F3E5D8]">
                            <tr>
                              <th className="px-4 py-2.5">{t.grade2TableHead1}</th>
                              <th className="px-4 py-2.5">{t.grade2TableHead2}</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#E5D3C0] text-slate-700">
                            {t.nilaiCacatGrade2.map((row, idx) => (
                              <tr key={idx}>
                                <td className="px-4 py-2">{row.jenis}</td>
                                <td className="px-4 py-2 font-semibold">{row.nilai}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm font-bold text-[#3C2A21] pt-1">
                      {t.grade2Conclusion}
                    </p>
                  </div>
                </div>
              )}
            </section>

          </div>
        )}

        {/* ================= TAMPILAN KATALOG PRODUK LENGKAP ================= */}
        {activeTab === 'katalog' && (
          <section className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-5 sm:p-6 rounded-xl border border-[#E5D3C0] shadow-sm gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#3C2A21]">{t.catalogHeading}</h2>
                <p className="text-xs sm:text-sm text-slate-600">{t.catalogSub}</p>
              </div>
              <button
                onClick={() => setActiveTab('dashboard')}
                className="w-full sm:w-auto bg-[#3C2A21] text-[#F3E5D8] text-xs font-bold px-4 py-2.5 rounded-lg hover:bg-[#4A3525] transition text-center"
              >
                {t.btnBack}
              </button>
            </div>

            {loading ? (
              <div className="text-center py-12 text-slate-500 font-medium bg-white rounded-xl border border-[#E5D3C0]">
                {t.loadingText}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {coffees.map((coffee) => (
                  <div key={coffee.id} className="bg-white rounded-xl shadow-sm border border-[#E5D3C0] overflow-hidden flex flex-col hover:shadow-md transition">
                    {/* Bagian Foto Kemasan Produk */}
                    <div className="h-56 bg-[#F3E5D8]/50 flex items-center justify-center relative p-3 border-b border-[#E5D3C0]">
                      <img
                        src={coffee.image || '/kopi premium.jpeg'}
                        alt={coffee.name}
                        className="h-full w-auto object-contain rounded-lg drop-shadow-sm"
                      />
                      <span className="absolute top-3 left-3 bg-[#3C2A21] text-[#F3E5D8] text-[10px] font-bold px-2.5 py-1 rounded">
                        ☕ {coffee.category}
                      </span>
                      <span className="absolute top-3 right-3 bg-[#E28941] text-white text-[10px] font-bold px-2.5 py-1 rounded">
                        Taboni Coffee
                      </span>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-bold text-[#3C2A21] text-lg mb-1">{coffee.name}</h3>
                        <p className="text-xs text-[#E28941] font-semibold mb-3">{coffee.process_type} • {coffee.roast_level}</p>
                        <p className="text-sm text-slate-600 leading-relaxed mb-4 whitespace-pre-line">{coffee.description}</p>
                      </div>
                      <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
                        <span className="font-extrabold text-[#3C2A21] text-xl">
                          Rp {Number(coffee.price).toLocaleString('id-ID')}
                        </span>
                        <span className="text-xs bg-[#FFF8F0] text-[#3C2A21] font-bold px-3 py-1 rounded-full border border-[#E5D3C0]">
                          {t.verifiedBadge}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

      </main>

      {/* Footer Responsif */}
      <footer className="bg-[#3C2A21] text-[#D5B99B] py-5 text-center text-xs border-t border-[#4A3525] mt-auto px-4">
        © 2026 Taboni Coffee - Alexsander Panjaitan (Nagasaribu, Lintongnihuta)
      </footer>
    </div>
  );
}