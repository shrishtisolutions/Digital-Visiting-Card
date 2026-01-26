// Basic configuration - replace later with your real details
const CONFIG = {
  name: "PUSHPARAJ",
  company: "SHRISHTI SOLUTIONS",
  role: "TECHNICAL ARCHITECT",
  phone: "+919962883525",
  whatsapp: "+919962883525",
  whatsappAlt: "+919176187823",
  email: "pushparaj@shrishtisolutions.in",
  website: "",
  logo: "/images/products/shrishti-solutions-icon.jpg", // Optional: path to your logo image (e.g., "assets/logo.svg" or "assets/logo.png")
  address: {
    line1: "27/13, Nedunchezian street",
    line2: "MGR Nagar",
    line3: "Chennai - 600078",
  },
  about: {
    nature: "Technology & Security Solutions",
    specialties: [
      "Software services & IT equipment sales/support",
      "CCTV surveillance systems & professional installation",
      "Networking & cyber security solutions",
      "Dependable after-sales service",
      "Alt WhatsApp: +91 9176187823",
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

 const MAP_URL = "https://maps.app.goo.gl/x19QLYn3vYGRGiKD8";

if (directionBtn) {
  directionBtn.addEventListener("click", () => {

    // 1️⃣ If map link exists → open it
    if (MAP_URL && MAP_URL.trim() !== "") {
      window.open(MAP_URL, "_blank");
      return;
    }

    // 2️⃣ Fallback → open using address
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

  // Escape special characters in vCard format
  function escapeVCard(str) {
    if (!str) return "";
    return str.replace(/[,;\\]/g, "\\$&").replace(/\n/g, "\\n");
  }

  const vcardLines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${escapeVCard(CONFIG.name)}`,
    `N:${escapeVCard(CONFIG.name)};;;;`,
    `ORG:${escapeVCard(CONFIG.company)}`,
    `TEL;TYPE=CELL:${CONFIG.phone}`,
    `TEL;TYPE=WHATSAPP:${CONFIG.whatsapp}`,

    `EMAIL;TYPE=INTERNET:${CONFIG.email}`,
    CONFIG.website ? `URL:${CONFIG.website}` : "",
    fullAddress ? `ADR;TYPE=WORK:;;${escapeVCard(fullAddress)};;;;` : "",
    "END:VCARD",
  ].filter(Boolean);

  const vcardContent = vcardLines.join("\r\n");
  
  // Create blob with proper MIME type
  const blob = new Blob([vcardContent], {
    type: "text/vcard;charset=utf-8",
  });
  
  const fileName = `${CONFIG.name.replace(/\s+/g, "_")}.vcf`;
  const url = URL.createObjectURL(blob);
  
  // Try Web Share API first (best for mobile)
  if (navigator.share && navigator.canShare) {
    const file = new File([blob], fileName, { type: "text/vcard" });
    if (navigator.canShare({ files: [file] })) {
      navigator.share({
        files: [file],
        title: `Add ${CONFIG.name} to contacts`,
      }).catch(() => {
        // Fallback to download if share fails
        triggerDownload(url, fileName);
      });
      return;
    }
  }
  
  // Fallback: trigger download
  triggerDownload(url, fileName);
}

function triggerDownload(url, fileName) {
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  
  // Clean up after a delay
  setTimeout(() => {
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, 100);
}

function wireEnquiryForm() {
  const whatsappBtn = document.getElementById("enquiryWhatsAppBtn");
  const emailBtn = document.getElementById("enquiryEmailBtn");

  function getEnquiryData() {
    const name = document.getElementById("enqName")?.value || "";
    const phone = document.getElementById("enqPhone")?.value || "";
    const email = document.getElementById("enqEmail")?.value || "";
    const product = document.getElementById("enqProduct")?.value || "";
    const message = document.getElementById("enqMessage")?.value || "";

    return {
      name,
      phone,
      email,
      product,
      message,
      formatted: `New enquiry from digital visiting card

Name: ${name}
Phone: ${phone}
Email: ${email}
Product / Service: ${product}
Details: ${message}

Please follow up.`,
    };
  }

  if (whatsappBtn) {
    whatsappBtn.addEventListener("click", () => {
      const data = getEnquiryData();
      
      // Validate required fields
      if (!data.name || !data.phone || !data.product) {
        alert("Please fill in Name, Phone, and Product/Service fields.");
        return;
      }

      const waNum = CONFIG.whatsapp.replace(/[^\d]/g, "");
      const waMsg = encodeURIComponent(data.formatted);
      window.open(`https://wa.me/${waNum}?text=${waMsg}`, "_blank");
    });
  }

  if (emailBtn) {
    emailBtn.addEventListener("click", () => {
      const data = getEnquiryData();
      
      // Validate required fields
      if (!data.name || !data.phone || !data.product) {
        alert("Please fill in Name, Phone, and Product/Service fields.");
        return;
      }

      const subject = encodeURIComponent("New enquiry from digital visiting card");
      const body = encodeURIComponent(data.formatted);
      window.location.href = `mailto:${CONFIG.email}?subject=${subject}&body=${body}`;
    });
  }
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


// ===== Copy URL to Clipboard =====
const copyBtn = document.getElementById("copyBtn");
if (copyBtn) {
  copyBtn.addEventListener("click", () => {
    const urlInput = document.getElementById("shareUrl");
    urlInput.select();
    urlInput.setSelectionRange(0, 99999);
    document.execCommand("copy");
    alert("URL copied to clipboard!");
  });
}

// ===== Save QR Code as Image =====
const saveBtn = document.getElementById("saveBtn");
if (saveBtn) {
  saveBtn.addEventListener("click", () => {
    const qrImg = document.querySelector("#qrContainer img");
    if (qrImg) {
      const link = document.createElement("a");
      link.href = qrImg.src;
      link.download = "qr-code.png";
      link.click();
    } else {
      alert("QR code not generated yet!");
    }
  });
}


// ===== WhatsApp Share =====
const whatsappShareBtn = document.getElementById("whatsappShareBtn");
if (whatsappShareBtn) {
  whatsappShareBtn.addEventListener("click", () => {
    const countryCodeEl = document.getElementById("countryCode");
    const numberEl = document.getElementById("whatsappNumber");
    const shareUrlEl = document.getElementById("shareUrl");

    const countryCode = countryCodeEl ? countryCodeEl.value.replace("+", "") : "";
    const number = numberEl ? numberEl.value.trim() : "";
    const url = shareUrlEl ? shareUrlEl.value : window.location.href;

    if (!number) {
      alert("Please enter a mobile number.");
      return;
    }

    const whatsappUrl = `https://wa.me/${countryCode}${number}?text=${encodeURIComponent(url)}`;
    window.open(whatsappUrl, "_blank");
  });
}


// ===== Optional: Native Share Button =====
const shareBtn = document.getElementById("shareBtn");
if (shareBtn) {
  shareBtn.addEventListener("click", () => {
    const shareUrlEl = document.getElementById("shareUrl");
    const url = shareUrlEl ? shareUrlEl.value : window.location.href;

    if (navigator.share) {
      navigator.share({
        title: "Digital Card",
        url: url,
      }).catch((err) => console.error("Share failed:", err));
    } else {
      alert("Sharing not supported on this device. Copy the URL manually.");
    }
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

