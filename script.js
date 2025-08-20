document.addEventListener("DOMContentLoaded", () => {
  // --- Smooth Scroll untuk Tautan Navigasi ---
  document.querySelectorAll("a[href^='#']").forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      })
    })
  }) // --- Logika Menu Mobile dan Ikon Burger/Silang ---

  const mobileMenuButton = document.getElementById("mobile-menu-button")
  const mobileMenu = document.getElementById("mobile-menu")
  const burgerIcon = document.getElementById("burger-icon")
  const closeIcon = document.getElementById("close-icon")

  if (mobileMenuButton) {
    mobileMenuButton.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden")
      burgerIcon.classList.toggle("hidden")
      closeIcon.classList.toggle("hidden")
    })
  }

  if (mobileMenu) {
    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden")
        burgerIcon.classList.remove("hidden")
        closeIcon.classList.add("hidden")
      })
    })
  } // --- Logika untuk Tombol Download CV (POPUP Kustom) ---

  const downloadCvBtn = document.getElementById("download-cv-btn")
  const cvDownloadModal = document.getElementById("cv-download-modal")
  const closeCvModalBtn = document.getElementById("close-cv-modal")
  const downloadNowBtn = document.getElementById("download-now-btn")
  const viewOnlineBtn = document.getElementById("view-online-btn") // Ganti link ini dengan link PDF yang bisa di-download

  const DOWNLOAD_LINK =
    "https://drive.google.com/uc?export=download&id=1wNrzNgUWvI0texo57yFYBvrAPI6-S6m2" // Ganti link ini dengan link untuk melihat CV online
  const VIEW_LINK =
    "https://drive.google.com/file/d/1wNrzNgUWvI0texo57yFYBvrAPI6-S6m2/view?usp=drive_link"

  if (downloadCvBtn) {
    downloadCvBtn.addEventListener("click", () => {
      cvDownloadModal.classList.remove("hidden")
      document.body.style.overflow = "hidden"
    })
  }

  if (closeCvModalBtn) {
    closeCvModalBtn.addEventListener("click", () => {
      cvDownloadModal.classList.add("hidden")
      document.body.style.overflow = ""
    })
  }

  if (downloadNowBtn) {
    downloadNowBtn.addEventListener("click", () => {
      // Membuat elemen tautan sementara
      const link = document.createElement("a")
      link.href = DOWNLOAD_LINK
      link.setAttribute("download", "CV_Mellani.pdf") // Nama file yang akan diunduh
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      cvDownloadModal.classList.add("hidden")
      document.body.style.overflow = ""
    })
  }

  if (viewOnlineBtn) {
    viewOnlineBtn.addEventListener("click", () => {
      window.open(VIEW_LINK, "_blank")
      cvDownloadModal.classList.add("hidden")
      document.body.style.overflow = ""
    })
  } // --- Logika untuk Modal Tanda Tangan ---

  const openSignatureModalBtn = document.getElementById("open-signature-modal")
  const signatureModal = document.getElementById("signature-modal")
  const closeSignatureModalBtn = document.getElementById(
    "close-signature-modal"
  )

  if (openSignatureModalBtn) {
    openSignatureModalBtn.addEventListener("click", () => {
      signatureModal.classList.remove("hidden")
      document.body.style.overflow = "hidden"
    })
  }

  if (closeSignatureModalBtn) {
    closeSignatureModalBtn.addEventListener("click", () => {
      signatureModal.classList.add("hidden")
      document.body.style.overflow = ""
    })
  } // Menutup modal saat mengklik di luar area modal tanda tangan

  if (signatureModal) {
    signatureModal.addEventListener("click", (e) => {
      if (e.target === signatureModal) {
        signatureModal.classList.add("hidden")
        document.body.style.overflow = ""
      }
    })
  } // --- Logika untuk Section SKILL (Slider Dinamis) & POPUP ---

  const skills = [
    {
      title: "Project Management",
      description:
        "Kemampuan dalam merencanakan, mengelola, dan mengeksekusi proyek untuk mencapai tujuan yang telah ditetapkan dalam batasan waktu, anggaran, dan ruang lingkup.",
      icon: "fi-rr-projector",
      buttonText: "Learn More",
    },
    {
      title: "Quality Assurance (QA)",
      description:
        "Keahlian dalam memastikan kualitas produk atau layanan sesuai dengan standar yang ditetapkan melalui pengujian, identifikasi bug, dan perbaikan berkelanjutan.",
      icon: "fi-rr-search-alt",
      buttonText: "Learn More",
    },
    {
      title: "Web Administration",
      description:
        "Bertanggung jawab atas pengelolaan, pemeliharaan, dan pengamanan situs web untuk memastikan ketersediaan dan kinerja yang optimal.",
      icon: "fi-rr-settings",
      buttonText: "Learn More",
    },
    {
      title: "Web Design",
      description:
        "Kemampuan dalam merancang tata letak, antarmuka pengguna (UI), dan pengalaman pengguna (UX) untuk menciptakan situs web yang menarik dan fungsional.",
      icon: "fi-rr-laptop-code",
      buttonText: "Learn More",
    },
    {
      title: "Wireframe",
      description:
        "Membuat sketsa visual dan struktur dasar halaman web atau aplikasi untuk menentukan tata letak, hierarki konten, dan fungsionalitas sebelum proses desain yang lebih detail.",
      icon: "fi-rr-ruler-combined",
      buttonText: "Learn More",
    },
    {
      title: "User Research",
      description:
        "Mengumpulkan dan menganalisis data tentang perilaku pengguna, kebutuhan, dan motivasi melalui berbagai metode untuk menginformasikan proses desain produk.",
      icon: "fi-rr-users-alt",
      buttonText: "Learn More",
    },
  ]

  const skillsContainer = document.getElementById("skills-container")
  const skillsList = document.getElementById("skills-list")
  const skillsPagination = document.getElementById("skills-pagination")
  const skillModal = document.getElementById("skill-modal")
  const closeSkillModal = document.getElementById("close-skill-modal")

  let currentSlide = 0
  let isDown = false
  let startX
  let scrollLeft

  function getSkillsPerPage() {
    return window.innerWidth < 768 ? 1 : 3
  }

  function renderSkills() {
    const skillsPerPage = getSkillsPerPage()
    skillsList.innerHTML = ""
    skillsPagination.innerHTML = ""

    skills.forEach((skill) => {
      const skillCard = document.createElement("div")
      skillCard.className =
        "flex-none w-full md:w-[calc(33.3333%-2rem/3)] bg-white/10 p-8 rounded-2xl text-center snap-start"
      skillCard.innerHTML = `
          <i class="fi ${skill.icon} text-5xl text-green-400"></i>
          <h3 class="font-semibold mt-4">${skill.title}</h3>
          <p class="mt-2 text-sm text-gray-300">${skill.description}</p>
          <button class="mt-4 bg-green-400 hover:bg-green-500 text-black px-4 py-2 rounded-full transition learn-more-skill-btn" data-title="${skill.title}" data-description="${skill.description}">
            ${skill.buttonText}
          </button>
        `
      skillsList.appendChild(skillCard)
    })

    if (skills.length > skillsPerPage) {
      const totalPages = Math.ceil(skills.length / skillsPerPage)
      for (let i = 0; i < totalPages; i++) {
        const bullet = document.createElement("button")
        bullet.className = `w-3 h-3 rounded-full mx-1 ${
          i === currentSlide ? "bg-green-400" : "bg-white/50"
        }`
        bullet.addEventListener("click", () => {
          currentSlide = i
          updateSkillsSlider()
        })
        skillsPagination.appendChild(bullet)
      }
    }
    updateSkillsSlider()
  }

  function updateSkillsSlider() {
    const skillsPerPage = getSkillsPerPage()
    const firstSkillCard = skillsList.querySelector(".flex-none")
    if (!firstSkillCard) return

    const cardWidth = firstSkillCard.offsetWidth
    const gapWidth = 32
    const scrollAmount =
      skillsPerPage === 1
        ? cardWidth + gapWidth
        : (cardWidth + gapWidth) * skillsPerPage

    if (skills.length <= skillsPerPage) {
      skillsContainer.scrollLeft = 0
    } else {
      const scrollPosition = currentSlide * scrollAmount
      skillsContainer.scrollLeft = scrollPosition
    }

    updateActiveBullet()
  }

  function updateActiveBullet() {
    const skillsPerPage = getSkillsPerPage()
    const firstSkillCard = skillsList.querySelector(".flex-none")
    if (!firstSkillCard) return

    const cardWidth = firstSkillCard.offsetWidth
    const gapWidth = 32
    const scrollAmount =
      skillsPerPage === 1
        ? cardWidth + gapWidth
        : (cardWidth + gapWidth) * skillsPerPage

    const currentScrollPosition = skillsContainer.scrollLeft
    currentSlide = Math.round(currentScrollPosition / scrollAmount)

    const bullets = skillsPagination.querySelectorAll("button")
    bullets.forEach((bullet, index) => {
      if (index === currentSlide) {
        bullet.classList.add("bg-green-400")
        bullet.classList.remove("bg-white/50")
      } else {
        bullet.classList.remove("bg-green-400")
        bullet.classList.add("bg-white/50")
      }
    })
  } // --- Kode untuk Geser Kursor (DRAG TO SCROLL) ---

  if (skillsContainer) {
    skillsContainer.addEventListener("mousedown", (e) => {
      isDown = true
      skillsContainer.style.cursor = "grabbing"
      startX = e.pageX - skillsContainer.offsetLeft
      scrollLeft = skillsContainer.scrollLeft
    })

    skillsContainer.addEventListener("mouseleave", () => {
      isDown = false
      skillsContainer.style.cursor = "grab"
    })

    skillsContainer.addEventListener("mouseup", () => {
      isDown = false
      skillsContainer.style.cursor = "grab"
    })

    skillsContainer.addEventListener("mousemove", (e) => {
      if (!isDown) return
      e.preventDefault()
      const x = e.pageX - skillsContainer.offsetLeft
      const walk = x - startX
      skillsContainer.scrollLeft = scrollLeft - walk
    }) // Event listener baru untuk mendeteksi perubahan scroll

    skillsContainer.addEventListener("scroll", updateActiveBullet)
  }

  window.addEventListener("resize", () => {
    renderSkills()
  })

  renderSkills()
  if (skillsContainer) {
    skillsContainer.style.cursor = "grab"
  } // Logika untuk membuka dan menutup modal skill

  function openSkillModal(title, description) {
    if (skillModal) {
      document.getElementById("skill-modal-title").textContent = title
      document.getElementById("skill-modal-description").textContent =
        description
      skillModal.classList.remove("hidden")
      document.body.style.overflow = "hidden" // Mencegah scrolling body
    }
  }

  function closeSkillModalFunc() {
    if (skillModal) {
      skillModal.classList.add("hidden")
      document.body.style.overflow = "" // Mengembalikan scrolling body
    }
  } // Menambahkan event listener ke tombol "Learn More" di skills

  document.body.addEventListener("click", (e) => {
    if (e.target.classList.contains("learn-more-skill-btn")) {
      const title = e.target.getAttribute("data-title")
      const description = e.target.getAttribute("data-description")
      openSkillModal(title, description)
    }
  }) // Menambahkan event listener ke tombol tutup modal skill

  if (closeSkillModal) {
    closeSkillModal.addEventListener("click", closeSkillModalFunc)
  } // Menutup modal saat mengklik di luar area modal skill

  if (skillModal) {
    skillModal.addEventListener("click", (e) => {
      if (e.target === skillModal) {
        closeSkillModalFunc()
      }
    })
  } // --- Logika untuk Section CERTIFICATION (Modal & Pagination) ---

  const certifications = [
    {
      title: "FGA Bootcamp Web Development Program + React JS",
      description:
        "Sertifikat ini menunjukkan keahlian dalam pengembangan web, termasuk front-end dengan React JS.",
      year: "2024",
      image: "sertifikat1.jpg",
      pdf: "https://drive.google.com/file/d/1gqYlQhWCPGnQZD/view?usp=drive_link",
    },
    {
      title: "Certified Project Management Professional (PMP)",
      description:
        "Sertifikasi untuk keahlian dalam memimpin proyek, mengelola tim, dan mencapai target dengan sukses.",
      year: "2024",
      image: "https://placehold.co/400x300/e0e0e0/333333?text=Sertifikasi+PMP",
      pdf: "https://drive.google.com/file/d/1gqYlQhWCPGnQZD/view?usp=drive_link",
    },
    {
      title: "Certified ScrumMaster (CSM)",
      description:
        "Sertifikasi yang membuktikan pemahaman mendalam tentang framework Scrum untuk tim Agile.",
      year: "2023",
      image: "https://placehold.co/400x300/d0d0d0/333333?text=Sertifikasi+CSM",
      pdf: "https://drive.google.com/file/d/2hXfR9lVdFgE2p/view?usp=drive_link",
    },
    {
      title: "Google Project Management Certificate",
      description:
        "Sertifikasi dari Google yang mencakup dasar-dasar manajemen proyek dan alat yang relevan.",
      year: "2023",
      image: "https://placehold.co/400x300/c0c0c0/333333?text=Google+PM",
      pdf: "https://drive.google.com/file/d/3jKmP4wLqFmO8q/view?usp=drive_link",
    },
    {
      title: "Advanced Web Design with Figma",
      description:
        "Sertifikasi untuk keahlian dalam membuat desain web modern menggunakan Figma.",
      year: "2022",
      image: "https://placehold.co/400x300/b0b0b0/333333?text=Figma+Design",
      pdf: "https://drive.google.com/file/d/4lNoT6xWyGbA0v/view?usp=drive_link",
    },
    {
      title: "Introduction to Quality Assurance",
      description:
        "Sertifikasi dasar untuk menguasai konsep dan metodologi Quality Assurance dalam pengembangan produk.",
      year: "2022",
      image: "https://placehold.co/400x300/a0a0a0/333333?text=Intro+QA",
      pdf: "https://drive.google.com/file/d/5oPrU8zZcPzE3k/view?usp=drive_link",
    },
    {
      title: "Python for Data Science",
      description:
        "Sertifikasi yang berfokus pada penggunaan Python untuk analisis data dan Machine Learning.",
      year: "2021",
      image: "https://placehold.co/400x300/909090/333333?text=Python+DS",
      pdf: "https://drive.google.com/file/d/6pQsV1yAwRzW4n/view?usp=drive_link",
    },
    {
      title: "Sertifikasi Tambahan 1",
      description: "Deskripsi sertifikat tambahan.",
      year: "2020",
      image: "https://placehold.co/400x300/808080/333333?text=Tambahan+1",
      pdf: "https://drive.google.com/file/d/7qRtX3yBxStU5o/view?usp=drive_link",
    },
    {
      title: "Sertifikasi Tambahan 2",
      description: "Deskripsi sertifikat tambahan.",
      year: "2019",
      image: "https://placehold.co/400x300/707070/333333?text=Tambahan+2",
      pdf: "https://drive.google.com/file/d/8rSuY4zCyTvF6p/view?usp=drive_link",
    },
    {
      title: "Sertifikasi Tambahan 3",
      description: "Deskripsi sertifikat tambahan.",
      year: "2018",
      image: "https://placehold.co/400x300/606060/333333?text=Tambahan+3",
      pdf: "https://drive.google.com/file/d/9sTvZ5aDzUwG7q/view?usp=drive_link",
    },
  ]

  const certificationsPerPage = 6
  const totalCertPages = Math.ceil(
    certifications.length / certificationsPerPage
  )
  const certificationList = document.getElementById("certification-list")
  const paginationContainer = document.getElementById("pagination")
  const modal = document.getElementById("certification-modal")
  const closeModalButton = document.getElementById("close-modal")

  function renderCertificates(page) {
    if (!certificationList) return
    certificationList.innerHTML = ""
    const start = (page - 1) * certificationsPerPage
    const end = start + certificationsPerPage
    const paginatedCertifications = certifications.slice(start, end)

    paginatedCertifications.forEach((cert, index) => {
      const certIndex = start + index
      const card = document.createElement("div")
      card.className = "bg-gray-100 p-6 rounded-lg text-center"
      card.innerHTML = `
          <img src="${cert.image}" alt="${cert.title}" class="w-full h-auto rounded-lg mb-4" />
          <h3 class="font-semibold">${cert.title}</h3>
          <p class="mt-2 text-sm text-gray-700">${cert.description}</p>
          <button class="mt-4 border border-indigo-600 text-indigo-600 px-4 py-2 rounded-full hover:bg-indigo-50 transition learn-more-btn" data-index="${certIndex}">
            Learn More
          </button>
        `
      certificationList.appendChild(card)
    })

    document.querySelectorAll(".learn-more-btn").forEach((button) => {
      button.addEventListener("click", (e) => {
        const certIndex = e.target.dataset.index
        openModal(certifications[certIndex])
      })
    })
  }

  function renderPagination(currentPage) {
    if (!paginationContainer) return
    paginationContainer.innerHTML = ""
    for (let i = 1; i <= totalCertPages; i++) {
      const button = document.createElement("button")
      button.textContent = i
      button.className = `w-8 h-8 rounded-full font-semibold ${
        i === currentPage
          ? "bg-indigo-600 text-white"
          : "bg-gray-200 hover:bg-gray-300"
      }`
      button.addEventListener("click", () => {
        renderCertificates(i)
        renderPagination(i)
      })
      paginationContainer.appendChild(button)
    }
  }

  function openModal(cert) {
    if (!modal) return
    document.getElementById("modal-image").src = cert.image
    document.getElementById("modal-image").alt = cert.title
    document.getElementById("modal-title").textContent = cert.title
    document.getElementById("modal-year").textContent = `Tahun: ${cert.year}`
    document.getElementById("modal-description").textContent = cert.description

    const pdfLink = document.getElementById("modal-pdf-link")
    if (pdfLink) {
      if (cert.pdf) {
        pdfLink.href = cert.pdf
        pdfLink.classList.remove("hidden")
      } else {
        pdfLink.classList.add("hidden")
      }
    }

    modal.classList.remove("hidden")
    document.body.style.overflow = "hidden"
  }

  function closeModal() {
    if (!modal) return
    modal.classList.add("hidden")
    document.body.style.overflow = ""
  }

  if (closeModalButton) {
    closeModalButton.addEventListener("click", closeModal)
  }

  renderCertificates(1)
  renderPagination(1) // --- Logika untuk Bagian Dokumentasi (Slider Otomatis) ---

  const documentationData = {
    photography: [
      {
        src: "https://placehold.co/600x600/F5C14F/FFFFFF?text=Photo+1",
        alt: "Photography 1",
      },
      {
        src: "https://placehold.co/600x600/FF5733/FFFFFF?text=Photo+2",
        alt: "Photography 2",
      },
      {
        src: "https://placehold.co/600x600/C70039/FFFFFF?text=Photo+3",
        alt: "Photography 3",
      },
      {
        src: "https://placehold.co/600x600/900C3F/FFFFFF?text=Photo+4",
        alt: "Photography 4",
      },
      {
        src: "https://placehold.co/600x600/581845/FFFFFF?text=Photo+5",
        alt: "Photography 5",
      },
      {
        src: "https://placehold.co/600x600/4B0082/FFFFFF?text=Photo+6",
        alt: "Photography 6",
      },
      {
        src: "https://placehold.co/600x600/800080/FFFFFF?text=Photo+7",
        alt: "Photography 7",
      },
      {
        src: "https://placehold.co/600x600/E6E6FA/333333?text=Photo+8",
        alt: "Photography 8",
      },
      {
        src: "https://placehold.co/600x600/DDA0DD/333333?text=Photo+9",
        alt: "Photography 9",
      },
      {
        src: "https://placehold.co/600x600/D8BFD8/333333?text=Photo+10",
        alt: "Photography 10",
      },
    ],
    designFigma: [
      {
        src: "https://placehold.co/600x600/40A2E3/FFFFFF?text=Figma+Design+1",
        alt: "Figma Design 1",
      },
      {
        src: "https://placehold.co/600x600/4D869C/FFFFFF?text=Figma+Design+2",
        alt: "Figma Design 2",
      },
      {
        src: "https://placehold.co/600x600/7AB2B2/FFFFFF?text=Figma+Design+3",
        alt: "Figma Design 3",
      },
      {
        src: "https://placehold.co/600x600/98E440/FFFFFF?text=Figma+Design+4",
        alt: "Figma Design 4",
      },
      {
        src: "https://placehold.co/600x600/A0DEFF/333333?text=Figma+Design+5",
        alt: "Figma Design 5",
      },
      {
        src: "https://placehold.co/600x600/C6EBC5/333333?text=Figma+Design+6",
        alt: "Figma Design 6",
      },
      {
        src: "https://placehold.co/600x600/FEFDED/333333?text=Figma+Design+7",
        alt: "Figma Design 7",
      },
      {
        src: "https://placehold.co/600x600/D0F0C0/333333?text=Figma+Design+8",
        alt: "Figma Design 8",
      },
      {
        src: "https://placehold.co/600x600/E3F6EE/333333?text=Figma+Design+9",
        alt: "Figma Design 9",
      },
      {
        src: "https://placehold.co/600x600/A1E8D2/333333?text=Figma+Design+10",
        alt: "Figma Design 10",
      },
    ],
    coder: [
      {
        src: "https://placehold.co/600x600/27374D/FFFFFF?text=Code+1",
        alt: "Coder 1",
      },
      {
        src: "https://placehold.co/600x600/526D82/FFFFFF?text=Code+2",
        alt: "Coder 2",
      },
      {
        src: "https://placehold.co/600x600/9DB2BF/FFFFFF?text=Code+3",
        alt: "Coder 3",
      },
      {
        src: "https://placehold.co/600x600/DDE6ED/FFFFFF?text=Code+4",
        alt: "Coder 4",
      },
      {
        src: "https://placehold.co/600x600/C8D8E4/333333?text=Code+5",
        alt: "Coder 5",
      },
      {
        src: "https://placehold.co/600x600/B2C8D8/333333?text=Code+6",
        alt: "Coder 6",
      },
      {
        src: "https://placehold.co/600x600/96B8D0/333333?text=Code+7",
        alt: "Coder 7",
      },
      {
        src: "https://placehold.co/600x600/7DA5C9/333333?text=Code+8",
        alt: "Coder 8",
      },
      {
        src: "https://placehold.co/600x600/5E8CB4/333333?text=Code+9",
        alt: "Coder 9",
      },
      {
        src: "https://placehold.co/600x600/416A96/333333?text=Code+10",
        alt: "Coder 10",
      },
    ],
  }

  function createSlider(containerId, images) {
    const container = document.getElementById(containerId)
    if (!container) return

    images.forEach((image) => {
      const imgWrapper = document.createElement("div")
      imgWrapper.className =
        "slider-card relative transition-transform duration-300"
      imgWrapper.innerHTML = `
        <img src="${image.src}" alt="${image.alt}" class="w-full h-auto rounded-lg shadow-lg cursor-pointer" />
      `
      container.appendChild(imgWrapper) // Menambahkan event listener untuk fungsionalitas zoom

      imgWrapper.addEventListener("click", () => {
        // Hapus kelas 'zoomed' dari semua gambar lain
        const allCards = container.querySelectorAll(".slider-card")
        allCards.forEach((card) => {
          if (card !== imgWrapper) {
            card.classList.remove("zoomed")
          }
        }) // Toggle kelas 'zoomed' pada gambar yang diklik

        imgWrapper.classList.toggle("zoomed")
      })
    })

    let scrollInterval
    const scrollSpeed = 2 // Kecepatan scroll (dalam piksel)
    const scrollDelay = 30 // Jeda antar scroll (dalam milidetik)

    function scrollContinuously() {
      if (
        container.scrollLeft <
        container.scrollWidth - container.clientWidth
      ) {
        container.scrollLeft += scrollSpeed
      } else {
        container.scrollLeft = 0 // Kembali ke awal setelah mencapai akhir
      }
    }

    function startContinuousScroll() {
      scrollInterval = setInterval(scrollContinuously, scrollDelay)
    }

    function stopContinuousScroll() {
      clearInterval(scrollInterval)
    }

    container.addEventListener("mouseenter", stopContinuousScroll)
    container.addEventListener("mouseleave", startContinuousScroll)

    startContinuousScroll() // Mulai otomatis saat halaman dimuat
  } // Panggil fungsi untuk setiap slider

  createSlider("photography-slider", documentationData.photography)
  createSlider("design-figma-slider", documentationData.designFigma)
  createSlider("coder-slider", documentationData.coder) // --- Tambahan Copyright Footer ---

  const copyrightYear = document.getElementById("copyright-year")
  if (copyrightYear) {
    const currentYear = new Date().getFullYear()
    copyrightYear.textContent = currentYear
  }
})
