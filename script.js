// Basic configuration - replace later with your real details
const CONFIG = {
  name: "Kavya M",
  company: "Miss Technology",
  role: "CCTV and Security Solutions",
  phone: "+919943703573",
  whatsapp: "+919943703573",
  email: "kavyamurugan24@gmail.com",
  website: "",
  logo: "", // Optional: path to your logo image (e.g., "assets/logo.svg" or "assets/logo.png")
  address: {
    line1: "52/1 vadakarai",
    line2: "Theni",
    line3: "",
  },
  about: {
    nature: "CCTV and security solution",
    specialties: [
      "CCTV Camera Installation",
      "Security Solutions",
      "Surveillance Systems",
    ],
  },
};

function initBasicCard() {
  const nameEl = document.getElementById("cardName");
  const roleEl = document.getElementById("cardRole");
  const brandNameEl = document.getElementById("primaryName");
  const companyEl = document.getElementById("companyName");
  const initialsEl = document.getElementById("cardInitials");
  const brandIconEl = document.getElementById("brandIcon");
  const cardPhotoEl = document.querySelector(".card-photo");

  if (nameEl) nameEl.textContent = CONFIG.name;
  if (brandNameEl) brandNameEl.textContent = CONFIG.name;
  if (roleEl) roleEl.textContent = CONFIG.role;
  if (companyEl) companyEl.textContent = CONFIG.company;

  const initials = CONFIG.name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

  if (initialsEl) initialsEl.textContent = initials || "DC";
  if (brandIconEl) brandIconEl.textContent = initials || "DC";

  // If logo is provided, use it instead of initials
  if (CONFIG.logo && CONFIG.logo.trim() && cardPhotoEl) {
    const img = document.createElement("img");
    img.src = CONFIG.logo;
    img.alt = CONFIG.name;
    img.onerror = () => {
      // If logo fails to load, keep initials
      if (initialsEl) initialsEl.style.display = "flex";
    };
    if (initialsEl) {
      initialsEl.style.display = "none";
      cardPhotoEl.appendChild(img);
    }
  }

  const line1 = document.getElementById("addrLine1");
  const line2 = document.getElementById("addrLine2");
  const line3 = document.getElementById("addrLine3");
  if (line1) line1.textContent = CONFIG.address.line1;
  if (line2) line2.textContent = CONFIG.address.line2;
  if (line3) line3.textContent = CONFIG.address.line3;
}

function initViewCounter() {
  const display = document.getElementById("viewCount");
  if (!display) return; // No counter element on this page

  const storageKey = "dvc_view_count";
  const sessionKey = "dvc_session_viewed";
  
  // Check if already viewed in this session
  const sessionViewed = sessionStorage.getItem(sessionKey);
  
  if (!sessionViewed) {
    // First view in this session - increment counter
    let count = Number.parseInt(localStorage.getItem(storageKey) || "0", 10);
    count += 1;
    localStorage.setItem(storageKey, String(count));
    sessionStorage.setItem(sessionKey, "true");
    display.textContent = String(count);
  } else {
    // Already viewed in this session - just show current count
    const count = Number.parseInt(localStorage.getItem(storageKey) || "0", 10);
    display.textContent = String(count);
  }
}

function initAboutSection() {
  const aboutCompany = document.getElementById("aboutCompany");
  const aboutNature = document.getElementById("aboutNature");
  const aboutSpecialties = document.getElementById("aboutSpecialties");

  if (aboutCompany) aboutCompany.textContent = CONFIG.company;
  if (aboutNature) aboutNature.textContent = CONFIG.about.nature;

  if (aboutSpecialties) {
    aboutSpecialties.innerHTML = "";
    CONFIG.about.specialties.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      aboutSpecialties.appendChild(li);
    });
  }
}

function wireMainActions() {
  const callBtn = document.getElementById("callBtn");
  const whatsappBtn = document.getElementById("whatsappBtn");
  const directionBtn = document.getElementById("directionBtn");
  const emailBtn = document.getElementById("emailBtn");
  const addToContactsBtn = document.getElementById("addToContactsBtn");

  if (callBtn) {
    callBtn.addEventListener("click", () => {
      window.location.href = `tel:${CONFIG.phone}`;
    });
  }

  if (whatsappBtn) {
    whatsappBtn.addEventListener("click", () => {
      const msg = encodeURIComponent(
        `Hello ${CONFIG.name}, I got your digital visiting card and would like to enquire.`
      );
      const num = CONFIG.whatsapp.replace(/[^\d]/g, "");
      window.location.href = `https://wa.me/${num}?text=${msg}`;
    });
  }

  if (directionBtn) {
    directionBtn.addEventListener("click", () => {
      const addr = encodeURIComponent(
        `${CONFIG.address.line1}, ${CONFIG.address.line2}, ${CONFIG.address.line3}`
      );
      window.open(`https://www.google.com/maps?q=${addr}`, "_blank");
    });
  }

  if (emailBtn) {
    emailBtn.addEventListener("click", () => {
      const subject = encodeURIComponent("Enquiry from digital visiting card");
      const body = encodeURIComponent(
        `Hello ${CONFIG.name},\n\nI got your digital visiting card and would like to enquire.\n\nName:\nPhone:\nRequirement:\n\nThank you.`
      );
      window.location.href = `mailto:${CONFIG.email}?subject=${subject}&body=${body}`;
    });
  }

  if (addToContactsBtn) {
    addToContactsBtn.addEventListener("click", () => {
      downloadVCard();
    });
  }
}

function wireDetailsQuickLinks() {
  const waBtn = document.getElementById("detailsWhatsAppBtn");
  const phoneBtn = document.getElementById("detailsPhoneBtn");
  const emailBtn = document.getElementById("detailsEmailBtn");
  const webBtn = document.getElementById("detailsWebsiteBtn");

  if (waBtn) {
    waBtn.addEventListener("click", () => {
      const msg = encodeURIComponent(
        `Hello ${CONFIG.name},\nI am contacting you from your digital visiting card.`
      );
      const num = CONFIG.whatsapp.replace(/[^\d]/g, "");
      window.location.href = `https://wa.me/${num}?text=${msg}`;
    });
  }

  if (phoneBtn) {
    phoneBtn.addEventListener("click", () => {
      window.location.href = `tel:${CONFIG.phone}`;
    });
  }

  if (emailBtn) {
    emailBtn.addEventListener("click", () => {
      const subject = encodeURIComponent("Enquiry");
      const body = encodeURIComponent(
        `Hello ${CONFIG.name},\n\nI got your digital visiting card and would like to enquire.\n\nThank you.`
      );
      window.location.href = `mailto:${CONFIG.email}?subject=${subject}&body=${body}`;
    });
  }

  if (webBtn) {
    if (CONFIG.website && CONFIG.website.trim()) {
      webBtn.addEventListener("click", () => {
        window.open(CONFIG.website, "_blank");
      });
    } else {
      webBtn.style.display = "none";
    }
  }
}

function downloadVCard() {
  const fullAddress = [
    CONFIG.address.line1,
    CONFIG.address.line2,
    CONFIG.address.line3,
  ]
    .filter(Boolean)
    .join(", ");

  const vcardLines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${CONFIG.name}`,
    `N:${CONFIG.name};;;;`,
    `TEL;TYPE=CELL,VOICE:${CONFIG.phone}`,
    `TEL;TYPE=CELL,VOICE:${CONFIG.whatsapp}`,
    `EMAIL;TYPE=INTERNET:${CONFIG.email}`,
    CONFIG.website ? `URL:${CONFIG.website}` : "",
    fullAddress ? `ADR;TYPE=WORK:;;${fullAddress};;;;` : "",
    "END:VCARD",
  ].filter(Boolean);

  const blob = new Blob([vcardLines.join("\r\n")], {
    type: "text/vcard;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${CONFIG.name.replace(/\s+/g, "_")}.vcf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function wireEnquiryForm() {
  const form = document.getElementById("enquiryForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("enqName")?.value || "";
    const phone = document.getElementById("enqPhone")?.value || "";
    const email = document.getElementById("enqEmail")?.value || "";
    const product = document.getElementById("enqProduct")?.value || "";
    const message = document.getElementById("enqMessage")?.value || "";

    const common = `New enquiry from digital visiting card

Name: ${name}
Phone: ${phone}
Email: ${email}
Product / Service: ${product}
Details: ${message}

Please follow up.`;

    // WhatsApp
    const waNum = CONFIG.whatsapp.replace(/[^\d]/g, "");
    const waMsg = encodeURIComponent(common);
    window.open(`https://wa.me/${waNum}?text=${waMsg}`, "_blank");

    // Email
    const subject = encodeURIComponent("New enquiry from digital visiting card");
    const body = encodeURIComponent(common);
    window.location.href = `mailto:${CONFIG.email}?subject=${subject}&body=${body}`;
  });
}

function wireFeedbackForm() {
  const form = document.getElementById("feedbackForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("fbName")?.value || "";
    const rating = document.getElementById("fbRating")?.value || "";
    const comment = document.getElementById("fbComment")?.value || "";

    const msg = `New feedback from digital visiting card

Name: ${name}
Rating: ${rating}
Feedback: ${comment}

Thank you.`;

    const waNum = CONFIG.whatsapp.replace(/[^\d]/g, "");
    const waMsg = encodeURIComponent(msg);
    window.open(`https://wa.me/${waNum}?text=${waMsg}`, "_blank");

    const subject = encodeURIComponent("Feedback from customer");
    const body = encodeURIComponent(msg);
    window.location.href = `mailto:${CONFIG.email}?subject=${subject}&body=${body}`;
  });
}

function wireProductDownload() {
  // Handle all download buttons
  const downloadBtns = document.querySelectorAll("[data-download]");
  downloadBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const productName = btn.getAttribute("data-product");
      const productImage = btn.getAttribute("data-image");
      generateProductCard(productName, productImage);
    });
  });
}

function wireProductEnquiry() {
  // Handle all enquiry buttons
  const enquiryBtns = document.querySelectorAll("[data-enquiry]");
  enquiryBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const productName = btn.getAttribute("data-product");
      sendProductEnquiry(productName);
    });
  });
}

function sendProductEnquiry(productName) {
  const message = `Hello ${CONFIG.name},\n\nI need a service of ${productName}.\n\nPlease provide more details.\n\nThank you.`;
  const waNum = CONFIG.whatsapp.replace(/[^\d]/g, "");
  const waMsg = encodeURIComponent(message);
  window.open(`https://wa.me/${waNum}?text=${waMsg}`, "_blank");
}

function generateProductCard(productName, productImageUrl) {
  const canvas = document.createElement("canvas");
  const width = 800;
  const height = 450;
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // Background gradient
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "#020617");
  gradient.addColorStop(0.5, "#0f172a");
  gradient.addColorStop(1, "#111827");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Product image (use provided URL or default)
  const productImg = new Image();
  productImg.crossOrigin = "anonymous";
  productImg.src = productImageUrl || "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=450&fit=crop";
  
  productImg.onload = () => {
    // Draw product image with overlay
    ctx.drawImage(productImg, 0, 0, width, height);
    
    // Dark overlay for better text readability
    ctx.fillStyle = "rgba(2, 6, 23, 0.6)";
    ctx.fillRect(0, 0, width, height);

    // Watermark box at bottom
    ctx.fillStyle = "rgba(15, 23, 42, 0.95)";
    ctx.fillRect(0, height - 180, width, 180);

    // Product name
    ctx.fillStyle = "#38bdf8";
    ctx.font = "bold 32px 'Segoe UI', system-ui, sans-serif";
    ctx.fillText(productName, 40, height - 140);

    // Contact watermark
    ctx.fillStyle = "#e5e7eb";
    ctx.font = "20px 'Segoe UI Semibold', system-ui, sans-serif";
    ctx.fillText(CONFIG.name, 40, height - 100);

    ctx.font = "16px 'Segoe UI', system-ui, sans-serif";
    ctx.fillStyle = "#9ca3af";
    ctx.fillText(`📞 ${CONFIG.phone}`, 40, height - 70);
    ctx.fillText(`💬 ${CONFIG.whatsapp}`, 40, height - 45);
    ctx.fillText(`✉️ ${CONFIG.email}`, 40, height - 20);

    // Download the image
    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `${productName.replace(/\s+/g, "_")}_card.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  productImg.onerror = () => {
    // Fallback if image fails to load - use text-only version
    ctx.fillStyle = "rgba(15, 23, 42, 0.9)";
    ctx.fillRect(40, 40, width - 80, height - 80);

    ctx.fillStyle = "#e5e7eb";
    ctx.font = "28px 'Segoe UI', system-ui, sans-serif";
    ctx.fillText(productName, 70, 120);

    ctx.font = "18px 'Segoe UI', system-ui, sans-serif";
    ctx.fillStyle = "#9ca3af";
    ctx.fillText("High quality CCTV camera solution", 70, 160);

    ctx.fillStyle = "#38bdf8";
    ctx.font = "20px 'Segoe UI Semibold', system-ui, sans-serif";
    ctx.fillText(CONFIG.name, 70, height - 150);

    ctx.fillStyle = "#e5e7eb";
    ctx.font = "18px 'Segoe UI', system-ui, sans-serif";
    ctx.fillText(`Call: ${CONFIG.phone}`, 70, height - 115);
    ctx.fillText(`WhatsApp: ${CONFIG.whatsapp}`, 70, height - 85);
    ctx.fillText(`Email: ${CONFIG.email}`, 70, height - 55);

    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `${productName.replace(/\s+/g, "_")}_card.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
}

function initQrCode() {
  const container = document.getElementById("qrContainer");
  if (!container || typeof QRCode === "undefined") return;

  container.innerHTML = "";
  const url = window.location.href;

  new QRCode(container, {
    text: url,
    width: 140,
    height: 140,
  });
}

function initGallery() {
  const galleryItems = document.querySelectorAll(".gallery-item img");
  galleryItems.forEach((img) => {
    img.addEventListener("click", () => {
      // Simple lightbox - open image in new tab for now
      // You can enhance this with a modal later
      window.open(img.src, "_blank");
    });
  });
}

function initTabs() {
  const tabs = document.querySelectorAll(".tab");
  const pages = document.querySelectorAll(".page");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const targetId = tab.getAttribute("data-target");
      if (!targetId) return;

      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      pages.forEach((page) => {
        if (page.id === targetId) {
          page.classList.add("active");
        } else {
          page.classList.remove("active");
        }
      });
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initBasicCard();
  initViewCounter();
  initAboutSection();
  wireMainActions();
  wireDetailsQuickLinks();
  wireEnquiryForm();
  wireFeedbackForm();
  wireProductDownload();
  wireProductEnquiry();
  initTabs();
  initQrCode();
  initGallery();
});

