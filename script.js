const message = `Selamat ulang tahun, sayanggku... 🌹\n\nDi hari spesialmu ini, aku hanya ingin piwa tahu bahwa piwa adalah hadiah terindah dan termanis tercantik yang pernah ada. \n\nMaapyaa kalo belakangan ini kita sering ribut masalah hal kecil. Mudah mudahan hal kecil yang sering kita ributin bisa jadi pelajaran kita buat jadi pasangan yang lebih baikk yaa sayangg.\n\nSemoga di usia piwa yang suda tua ini, semua impian dan harapanmu menjadi kenyataan. Semoga piwa selalu dikelilingi kebahagiaan, kesehatan, dan cinta yang tulus dan juga piwa dapat terlepas dari hal hal yang buruk buat piwa kedepannya AAAMIIINNNN.\n\nTerima kasih telah hadir dan mewarnai duniaku dengan warna-warna paling indah. Aku mencintaimu, hari ini, esok, dan selamanya.\n\nDengan segenap cinta,\n[ai ndut] 💕`;

// Variabel untuk musik
let isMusicPlaying = false;
let audio = null;

// Fungsi untuk toggle musik
function toggleMusic() {
  if (!audio) {
    audio = document.getElementById('bgMusic');
  }
  
  if (isMusicPlaying) {
    audio.pause();
    showNotification('🎵 Musik dijeda');
  } else {
    audio.play()
      .then(() => {
        showNotification('🎵 Selamat ulang tahun! 💝');
      })
      .catch(error => {
        console.log('Gagal memutar musik:', error);
        showNotification('⚠️ Klik izinkan untuk memutar musik', 3000);
      });
  }
  
  isMusicPlaying = !isMusicPlaying;
  updateMusicButton();
}

// Fungsi untuk update tampilan tombol musik
function updateMusicButton() {
  const musicBtn = document.getElementById('musicBtn');
  const musicText = musicBtn.querySelector('.music-text');
  
  if (isMusicPlaying) {
    musicBtn.classList.add('playing');
    musicText.textContent = 'Jeda Musik';
  } else {
    musicBtn.classList.remove('playing');
    musicText.textContent = 'Putar Musik';
  }
}

// Fungsi untuk menampilkan notifikasi
function showNotification(message, duration = 2000) {
  // Hapus notifikasi yang sudah ada
  const existingNotif = document.querySelector('.music-notification');
  if (existingNotif) {
    existingNotif.remove();
  }
  
  // Buat notifikasi baru
  const notification = document.createElement('div');
  notification.className = 'music-notification';
  notification.textContent = message;
  document.body.appendChild(notification);
  
  // Hapus notifikasi setelah durasi tertentu
  setTimeout(() => {
    notification.remove();
  }, duration);
}

// Mulai musik otomatis saat halaman dimuat (jika diizinkan browser)
window.addEventListener('load', () => {
  audio = document.getElementById('bgMusic');
  
  // Coba mulai musik (mungkin diblokir browser)
  audio.play().then(() => {
    isMusicPlaying = true;
    updateMusicButton();
    showNotification('🎵 Musik dimulai otomatis');
  }).catch(error => {
    console.log('Autoplay diblokir browser. Klik tombol musik untuk memulai.');
  });
});

function showLetter() {
  document.getElementById("introText").style.opacity = 0;
  document.querySelector(".btn").style.display = "none";

  setTimeout(() => {
    const letterBox = document.getElementById("letterBox");
    const typedText = document.getElementById("typedText");
    
    typedText.innerHTML = "";
    letterBox.style.display = "block";
    
    let i = 0;

    function typeWriter() {
      if (i < message.length) {
        typedText.innerHTML += message.charAt(i);
        i++;
        
        // Auto-scroll ke bawah
        letterBox.scrollTop = letterBox.scrollHeight;
        
        setTimeout(typeWriter, 60); // Dipercepat sedikit untuk kenyamanan baca
      } else {
        // Saat selesai mengetik, tampilkan notifikasi
        showNotification('💝  Selamat ulang tahun NDUTT!', 3000);
      }
    }

    typeWriter();
    
    // Putar musik otomatis saat surat dibuka (jika belum diputar)
    if (!isMusicPlaying && audio) {
      audio.play().then(() => {
        isMusicPlaying = true;
        updateMusicButton();
      }).catch(error => {
        console.log('Tidak bisa memutar musik otomatis:', error);
      });
    }
  }, 800);

}

