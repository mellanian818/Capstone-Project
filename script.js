document.addEventListener("DOMContentLoaded", () => {
  // --- Smooth Scroll untuk Tautan Navigasi ---
  document.querySelectorAll("a[href^='#']").forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      })
    })
  })

  // --- Logika Menu Mobile dan Ikon Burger/Silang ---
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
  }

  // --- Logika untuk Section SKILL (Slider Dinamis) ---
  const skills = [
    {
      title: "UI/UX Design",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      icon: "fi-rr-edit",
      buttonText: "Learn More",
    },
    {
      title: "App Design",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      icon: "fi-rr-calendar",
      buttonText: "Learn More",
    },
    {
      title: "Web Design",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      icon: "fi-rr-apps",
      buttonText: "Learn More",
    },
    {
      title: "Project Management",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      icon: "fi-rr-briefcase",
      buttonText: "Learn More",
    },
    {
      title: "Quality Assurance",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      icon: "fi-rr-shield-check",
      buttonText: "Learn More",
    },
    {
      title: "User Research",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      icon: "fi-rr-search",
      buttonText: "Learn More",
    },
  ]

  const skillsContainer = document.getElementById("skills-container")
  const skillsList = document.getElementById("skills-list")
  const skillsPagination = document.getElementById("skills-pagination")
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
          <i class=\"fi ${skill.icon} text-5xl text-green-400\"></i>
          <h3 class=\"font-semibold mt-4\">${skill.title}</h3>
          <p class=\"mt-2 text-sm text-gray-300\">${skill.description}</p>
          <button class=\"mt-4 bg-green-400 hover:bg-green-500 text-black px-4 py-2 rounded-full transition\">
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
  }

  // --- Kode untuk Geser Kursor (DRAG TO SCROLL) ---
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
    })

    // Event listener baru untuk mendeteksi perubahan scroll
    skillsContainer.addEventListener("scroll", updateActiveBullet)
  }

  window.addEventListener("resize", () => {
    renderSkills()
  })

  renderSkills()
  if (skillsContainer) {
    skillsContainer.style.cursor = "grab"
  }

  // --- Logika untuk Section CERTIFICATION (Modal & Pagination) ---
  const certifications = [
    {
      title: "Certified Project Management Professional (PMP)",
      description:
        "Sertifikasi untuk keahlian dalam memimpin proyek, mengelola tim, dan mencapai target dengan sukses.",
      year: "2024",
      image:
        "https://placehold.co/400x300/e0e0e0/333333?text=Image+Certificated",
      pdf: "https://www.orimi.com/pdf-test.pdf",
    },
    {
      title: "Certified ScrumMaster (CSM)",
      description:
        "Sertifikasi yang membuktikan pemahaman mendalam tentang framework Scrum untuk tim Agile.",
      year: "2023",
      image:
        "https://placehold.co/400x300/d0d0d0/333333?text=Image+Certificated",
      pdf: "https://www.orimi.com/pdf-test.pdf",
    },
    {
      title: "Google Project Management Certificate",
      description:
        "Sertifikasi dari Google yang mencakup dasar-dasar manajemen proyek dan alat yang relevan.",
      year: "2023",
      image:
        "https://placehold.co/400x300/c0c0c0/333333?text=Image+Certificated",
      pdf: "https://www.orimi.com/pdf-test.pdf",
    },
    {
      title: "Advanced Web Design with Figma",
      description:
        "Sertifikasi untuk keahlian dalam membuat desain web modern menggunakan Figma.",
      year: "2022",
      image:
        "https://placehold.co/400x300/b0b0b0/333333?text=Image+Certificated",
      pdf: "https://www.orimi.com/pdf-test.pdf",
    },
    {
      title: "Introduction to Quality Assurance",
      description:
        "Sertifikasi dasar untuk menguasai konsep dan metodologi Quality Assurance dalam pengembangan produk.",
      year: "2022",
      image:
        "https://placehold.co/400x300/a0a0a0/333333?text=Image+Certificated",
      pdf: "https://www.orimi.com/pdf-test.pdf",
    },
    {
      title: "Python for Data Science",
      description:
        "Sertifikasi yang berfokus pada penggunaan Python untuk analisis data dan Machine Learning.",
      year: "2021",
      image:
        "https://placehold.co/400x300/909090/333333?text=Image+Certificated",
      pdf: "https://www.orimi.com/pdf-test.pdf",
    },
    {
      title: "Sertifikasi Tambahan 1",
      description: "Deskripsi sertifikat tambahan.",
      year: "2020",
      image:
        "https://placehold.co/400x300/808080/333333?text=Image+Certificated",
      pdf: "https://www.orimi.com/pdf-test.pdf",
    },
    {
      title: "Sertifikasi Tambahan 2",
      description: "Deskripsi sertifikat tambahan.",
      year: "2019",
      image:
        "https://placehold.co/400x300/707070/333333?text=Image+Certificated",
      pdf: "https://www.orimi.com/pdf-test.pdf",
    },
    {
      title: "Sertifikasi Tambahan 3",
      description: "Deskripsi sertifikat tambahan.",
      year: "2018",
      image:
        "https://placehold.co/400x300/606060/333333?text=Image+Certificated",
      pdf: "https://www.orimi.com/pdf-test.pdf",
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
          <img src=\"${cert.image}\" alt=\"${cert.title}\" class=\"w-full h-auto rounded-lg mb-4\" />
          <h3 class=\"font-semibold\">${cert.title}</h3>
          <p class=\"mt-2 text-sm text-gray-700\">${cert.description}</p>
          <button class=\"mt-4 border border-indigo-600 text-indigo-600 px-4 py-2 rounded-full hover:bg-indigo-50 transition learn-more-btn\" data-index=\"${certIndex}\">
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
  renderPagination(1)

  // --- Tambahan Copyright Footer ---
  const copyrightYear = document.getElementById("copyright-year")
  if (copyrightYear) {
    const currentYear = new Date().getFullYear()
    copyrightYear.textContent = currentYear
  }
})
