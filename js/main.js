const SITE_URL = "https://imadtbn.github.io/mafkoudin.dz";
const SITE_NAME = "مفقودين الجزائر | Mafkoudin DZ";

function getDetailUrl(person) {
  return `${SITE_URL}/pages/detail.html?id=${encodeURIComponent(person.id)}`;
}

function getReportUrl(person) {
  return `${SITE_URL}/reports/${encodeURIComponent(person.id)}/`;
}

function setMetaContent(selector, value, attribute = "content") {
  const el = document.querySelector(selector);
  if (el) el.setAttribute(attribute, value);
}

/**
 * Mafkoudin DZ - Missing Persons Algeria
 * Main JavaScript File
 */

// ============================================
// DEMO DATA
// ============================================
let demoData = {
  persons: [
    {
      id: "MAF-2026-001",
      firstName: "أحمد",
      lastName: "بن علي",
      age: 12,
      gender: "male",
      state: "الجزائر العاصمة",
      municipality: "المدنية",
      address: "حي المدنية، الجزائر العاصمة",
      dateMissing: "2026-07-15",
      timeMissing: "16:30",
      placeMissing: "حديقة التجزئة، باب الزوار",
      lastSeen: "حديقة التجزئة",
      daysMissing: 20,
      status: "missing",
      height: "145",
      weight: "38",
      hairColor: "أسود",
      eyeColor: "بني",
      clothing: "قميص أزرق، بنطلون جينز، حذاء رياضي أبيض",
      distinctiveMarks: "ندبة صغيرة فوق الحاجب الأيمن",
      mentalState: "بكامل قواه العقلية",
      circumstances: "اختفى أثناء لعبه في الحديقة مع أصدقائه ولم يعد",
      description: "طفل هادئ الطباع، يحب كرة القدم، يعرف رقم هاتف والدته",
      mainImage: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=400&h=500&fit=crop",
      gallery: [],
      reporterName: "محمد بن علي",
      reporterRelation: "الأب",
      reporterPhone: "0550-123-456",
      reporterPhone2: "0770-987-654",
      reporterEmail: "mohamed.benali@email.com",
      reportDate: "2026-07-15",
      views: 1250,
      foundDate: null
    },
    {
      id: "MAF-2026-002",
      firstName: "فاطمة",
      lastName: "عمراوي",
      age: 68,
      gender: "female",
      state: "وهران",
      municipality: "وهران",
      address: "حي السانية، وهران",
      dateMissing: "2026-06-20",
      timeMissing: "09:00",
      placeMissing: "سوق وهران المركزي",
      lastSeen: "سوق وهران",
      daysMissing: 45,
      status: "missing",
      height: "160",
      weight: "55",
      hairColor: "رمادي",
      eyeColor: "بني فاتح",
      clothing: "جبة بيضاء، حجاب أزرق فاتح",
      distinctiveMarks: "نظارات طبية، خاتم ذهبي في اليد اليمنى",
      mentalState: "تعاني من مرض الزهايمر",
      circumstances: "خرجت لشراء بعض الحاجيات من السوق ولم تعد",
      description: "سيدة مسنة تعاني من فقدان الذاكرة، لا تحمل بطاقة هوية",
      mainImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=500&fit=crop",
      gallery: [],
      reporterName: "عمر عمراوي",
      reporterRelation: "الابن",
      reporterPhone: "0555-234-567",
      reporterPhone2: "",
      reporterEmail: "",
      reportDate: "2026-06-20",
      views: 2340,
      foundDate: null
    },
    {
      id: "MAF-2026-003",
      firstName: "كريم",
      lastName: "حساني",
      age: 25,
      gender: "male",
      state: "قسنطينة",
      municipality: "قسنطينة",
      address: "حي الزيتون، قسنطينة",
      dateMissing: "2026-05-10",
      timeMissing: "22:00",
      placeMissing: "جامعة منتوري، قسنطينة",
      lastSeen: "قرب المكتبة المركزية",
      daysMissing: 86,
      status: "missing",
      height: "178",
      weight: "72",
      hairColor: "أسود",
      eyeColor: "بني",
      clothing: "جينز، تيشيرت أسود، سترة جلدية",
      distinctiveMarks: "وشم على الذراع الأيسر",
      mentalState: "بكامل قواه العقلية",
      circumstances: "خرج من الجامعة بعد دراسة المساء ولم يصل للمنزل",
      description: "طالب جامعي في السنة الأخيرة، هادئ الطباع، لا يوجد خلافات مع أحد",
      mainImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop",
      gallery: [],
      reporterName: "نادية حساني",
      reporterRelation: "الأم",
      reporterPhone: "0660-345-678",
      reporterPhone2: "0550-111-222",
      reporterEmail: "nadia.hassani@email.com",
      reportDate: "2026-05-11",
      views: 3890,
      foundDate: null
    },
    {
      id: "MAF-2026-004",
      firstName: "سارة",
      lastName: "مبروك",
      age: 16,
      gender: "female",
      state: "سطيف",
      municipality: "سطيف",
      address: "حي 400 مسكن، سطيف",
      dateMissing: "2026-07-01",
      timeMissing: "14:00",
      placeMissing: "الطريق الوطني رقم 5، قرب محطة البنزين",
      lastSeen: "محطة البنزين الطريق الوطني 5",
      daysMissing: 34,
      status: "missing",
      height: "165",
      weight: "55",
      hairColor: "بني فاتح",
      eyeColor: "أخضر",
      clothing: "فستان أزرق، حذاء رياضي",
      distinctiveMarks: "حلق ذهبي في الأذن اليسرى",
      mentalState: "بكامل قواها العقلية",
      circumstances: "غادرت المنزل للذهاب إلى المدرسة ولم تصل",
      description: "تلميذة ثانوية، مجتهدة، لا توجد مشاكل عائلية",
      mainImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop",
      gallery: [],
      reporterName: "عبد الرحمن مبروك",
      reporterRelation: "الأب",
      reporterPhone: "0777-456-789",
      reporterPhone2: "",
      reporterEmail: "",
      reportDate: "2026-07-01",
      views: 5670,
      foundDate: null
    },
    {
      id: "MAF-2026-005",
      firstName: "عبد القادر",
      lastName: "بوشامة",
      age: 45,
      gender: "male",
      state: "تلمسان",
      municipality: "تلمسان",
      address: "حي المقري، تلمسان",
      dateMissing: "2026-04-20",
      timeMissing: "11:30",
      placeMissing: "غابة مغراوة، تلمسان",
      lastSeen: "غابة مغراوة",
      daysMissing: 106,
      status: "found",
      height: "175",
      weight: "80",
      hairColor: "أسود مصفر",
      eyeColor: "بني غامق",
      clothing: "قميص كحلي، بنطلون بيج، حذاء جلدي",
      distinctiveMarks: "لحية خفيفة، نظارات شمسية",
      mentalState: "بكامل قواه العقلية",
      circumstances: "ذهب للتنزه في الغابة مع مجموعة وانفصل عنهم",
      description: "موظف بنك، رياضي، يعرف المنطقة جيداً",
      mainImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop",
      gallery: [],
      reporterName: "فاطمة بوشامة",
      reporterRelation: "الزوجة",
      reporterPhone: "0550-567-890",
      reporterPhone2: "0666-222-333",
      reporterEmail: "fatima.bouchama@email.com",
      reportDate: "2026-04-20",
      views: 8900,
      foundDate: "2026-07-10"
    },
    {
      id: "MAF-2026-006",
      firstName: "ليلى",
      lastName: "مراد",
      age: 8,
      gender: "female",
      state: "عنابة",
      municipality: "عنابة",
      address: "حي سيدي سالم، عنابة",
      dateMissing: "2026-07-20",
      timeMissing: "17:00",
      placeMissing: "شاطئ رزقي إبراهيم، عنابة",
      lastSeen: "الشاطئ قرب المقاهي",
      daysMissing: 15,
      status: "missing",
      height: "120",
      weight: "25",
      hairColor: "بني داكن",
      eyeColor: "بني",
      clothing: "مايوه أزرق، فوطة بيضاء",
      distinctiveMarks: "شامة على الخد الأيمن",
      mentalState: "بكامل قواها العقلية",
      circumstances: "اختفت من الشاطئ أثناء لعبها مع أطفال آخرين",
      description: "طفلة مرحة، تجيد السباحة، كانت برفقة عائلة",
      mainImage: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=400&h=500&fit=crop",
      gallery: [],
      reporterName: "سعيد مراد",
      reporterRelation: "الأب",
      reporterPhone: "0770-678-901",
      reporterPhone2: "",
      reporterEmail: "said.merad@email.com",
      reportDate: "2026-07-20",
      views: 3200,
      foundDate: null
    },
    {
      id: "MAF-2026-007",
      firstName: "يوسف",
      lastName: "بلعيد",
      age: 70,
      gender: "male",
      state: "البليدة",
      municipality: "البليدة",
      address: "حي الكرمة، البليدة",
      dateMissing: "2026-03-15",
      timeMissing: "07:00",
      placeMissing: "حديقة الشهيد، البليدة",
      lastSeen: "الحديقة العامة",
      daysMissing: 142,
      status: "found",
      height: "170",
      weight: "65",
      hairColor: "أبيض",
      eyeColor: "أزرق",
      clothing: "جبة رمادية، بابوش تقليدي",
      distinctiveMarks: "عصا مشية، نظارات طبية",
      mentalState: "يعاني من مرض الزهايمر",
      circumstances: "خرج للتنزه الصباحي ولم يعد",
      description: "متقاعد، يعاني من فقدان الذاكرة، يحمل بطاقة هوية",
      mainImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
      gallery: [],
      reporterName: "نور الدين بلعيد",
      reporterRelation: "الابن",
      reporterPhone: "0555-789-012",
      reporterPhone2: "0660-333-444",
      reporterEmail: "",
      reportDate: "2026-03-15",
      views: 4500,
      foundDate: "2026-06-01"
    },
    {
      id: "MAF-2026-008",
      firstName: "أمينة",
      lastName: "زيدي",
      age: 19,
      gender: "female",
      state: "باتنة",
      municipality: "باتنة",
      address: "حي 17 أكتوبر، باتنة",
      dateMissing: "2026-07-25",
      timeMissing: "20:00",
      placeMissing: "جامعة الحاج لخضر، باتنة",
      lastSeen: "قرب بوابة الجامعة",
      daysMissing: 10,
      status: "missing",
      height: "162",
      weight: "52",
      hairColor: "أسود",
      eyeColor: "بني غامق",
      clothing: "جينز، قميص أبيض، حذاء رياضي",
      distinctiveMarks: "سوار فضي في المعصم الأيمن",
      mentalState: "بكامل قواها العقلية",
      circumstances: "غادرت الجامعة بعد المحاضرة الأخيرة ولم تصل للمنزل",
      description: "طالبة جامعية سنة ثانية، اجتماعية، لديها أصدقاء كثيرون",
      mainImage: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=500&fit=crop",
      gallery: [],
      reporterName: "محمد زيدي",
      reporterRelation: "الأب",
      reporterPhone: "0777-890-123",
      reporterPhone2: "",
      reporterEmail: "mohamed.zidi@email.com",
      reportDate: "2026-07-25",
      views: 1800,
      foundDate: null
    }
  ],

  states: [
    { name: "الجزائر العاصمة", count: 12, lat: 36.7538, lng: 3.0588 },
    { name: "وهران", count: 8, lat: 35.6971, lng: -0.6308 },
    { name: "قسنطينة", count: 6, lat: 36.3650, lng: 6.6147 },
    { name: "سطيف", count: 5, lat: 36.1898, lng: 5.4108 },
    { name: "عنابة", count: 4, lat: 36.9185, lng: 7.7591 },
    { name: "تلمسان", count: 3, lat: 34.8783, lng: -1.3150 },
    { name: "البليدة", count: 7, lat: 36.4700, lng: 2.8277 },
    { name: "باتنة", count: 4, lat: 35.5559, lng: 6.1744 },
    { name: "قالمة", count: 2, lat: 36.4621, lng: 7.4251 },
    { name: "بسكرة", count: 3, lat: 34.8500, lng: 5.7333 },
    { name: " Béjaïa", count: 5, lat: 36.7514, lng: 5.0556 },
    { name: "سكيكدة", count: 2, lat: 36.8667, lng: 6.9000 },
    { name: "تيارت", count: 1, lat: 35.3711, lng: 1.3160 },
    { name: "الشلف", count: 2, lat: 36.1653, lng: 1.3345 },
    { name: "مسكيلة", count: 1, lat: 35.3500, lng: 4.2000 },
    { name: "المدية", count: 3, lat: 36.2675, lng: 2.7500 },
    { name: "Mostaganem", count: 2, lat: 35.9372, lng: 0.0892 },
    { name: "الوادي", count: 1, lat: 33.3500, lng: 6.8667 },
    { name: "سعيدة", count: 1, lat: 34.8303, lng: 0.1517 },
    { name: "غرداية", count: 1, lat: 32.4900, lng: 3.6700 }
  ],

  municipalities: {
    "الجزائر العاصمة": ["المدنية", "باب الزوار", "الحراش", "بئر مراد رايس", "الجزائر الوسطى"],
    "وهران": ["وهران", "أرزيو", "قديل", "بئر الجير", "سانتا كروز"],
    "قسنطينة": ["قسنطينة", "خروبة", "عين سمارة", "الحامة", "بني حميدان"],
    "سطيف": ["سطيف", "عين ولمان", "بوعنداس", "العلمة", "حمام قرقور"],
    "عنابة": ["عنابة", "البوني", "سرايدي", "الحجار", "شطايبي"],
    "تلمسان": ["تلمسان", "منصورة", "شتوان", "الفحول", "الحناية"],
    "البليدة": ["البليدة", "بوعينان", "مفتاح", "الشفة", "وادي العلايق"],
    "باتنة": ["باتنة", "تازولت", "نقاوس", "القصبة", "عين ياقوت"]
  }
};

// ============================================
// EXTERNAL JSON DATA LOADER
// ============================================
function getDataBasePath() {
  return window.location.pathname.startsWith('/mafkoudin.dz/') ? '/mafkoudin.dz/' : '/';
}

async function loadSiteData() {
  const basePath = getDataBasePath();
  const [reportsResponse, adminResponse] = await Promise.all([
    fetch(`${basePath}dataperdu.json`, { cache: 'no-store' }),
    fetch(`${basePath}data.json`, { cache: 'no-store' })
  ]);

  if (!reportsResponse.ok || !adminResponse.ok) {
    throw new Error(`Data request failed: ${reportsResponse.status}/${adminResponse.status}`);
  }

  const reportsData = await reportsResponse.json();
  const administrativeData = await adminResponse.json();
  const wilayas = Array.isArray(administrativeData.wilayas) ? administrativeData.wilayas : [];
  const fallbackStateMeta = new Map((demoData.states || []).map((state) => [state.name.trim(), state]));

  if (Array.isArray(reportsData.persons)) {
    demoData.persons = reportsData.persons;
  }
  demoData.wilayas = wilayas;
  demoData.states = wilayas.map((wilaya) => {
    const metadata = fallbackStateMeta.get(wilaya.name.trim()) || {};
    return {
      name: wilaya.name,
      code: wilaya.code,
      count: demoData.persons.filter((person) => person.state === wilaya.name).length,
      lat: metadata.lat ?? null,
      lng: metadata.lng ?? null
    };
  });
  demoData.municipalities = Object.fromEntries(
    wilayas.map((wilaya) => [wilaya.name, (wilaya.communes || []).map((commune) => commune.name)])
  );
  window.siteData = { reports: reportsData, administrative: administrativeData };
  return demoData;
}

window.siteDataReady = loadSiteData().catch((error) => {
  console.warn('External JSON data could not be loaded; using fallback data.', error);
  return demoData;
});

// ============================================
// UTILITY FUNCTIONS
// ============================================
function getAgeCategory(age) {
  if (age < 13) return "طفل";
  if (age < 18) return "مراهق";
  if (age < 60) return "بالغ";
  return "مسن";
}

function formatDate(dateStr) {
  if (!dateStr) return "غير محدد";
  const date = new Date(dateStr);
  return date.toLocaleDateString("ar-DZ", { year: "numeric", month: "long", day: "numeric" });
}

function getDaysSince(dateStr) {
  if (!dateStr) return 0;
  const date = new Date(dateStr);
  const now = new Date();
  return Math.floor((now - date) / (1000 * 60 * 60 * 24));
}

function getGenderLabel(gender) {
  return gender === "male" ? "ذكر" : "أنثى";
}

function getStatusLabel(status) {
  return status === "found" ? "تم العثور عليه" : "مفقود حاليا";
}

function getStatusClass(status) {
  return status === "found" ? "found" : "missing";
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function showToast(message, type = "success") {
  const container = document.getElementById("toastContainer") || createToastContainer();
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <i class="fas ${type === "success" ? "fa-check-circle text-success" : "fa-exclamation-circle text-danger"}"></i>
    <span>${escapeHtml(message)}</span>
  `;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(-100%)";
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

function createToastContainer() {
  const container = document.createElement("div");
  container.id = "toastContainer";
  container.className = "toast-container";
  document.body.appendChild(container);
  return container;
}

// ============================================
// SHARE FUNCTIONALITY
// ============================================
function shareReport(person, platform) {
  const url = getReportUrl(person);
  const text = `🔴 بلاغ مفقود: ${person.firstName} ${person.lastName} - ${person.state}\n📅 تاريخ الاختفاء: ${formatDate(person.dateMissing)}\n📞 للاتصال: ${person.reporterPhone}`;
  
  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    messenger: `https://www.facebook.com/dialog/send?link=${encodeURIComponent(url)}&app_id=123456`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(text + "\n" + url)}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
    email: `mailto:?subject=${encodeURIComponent("بلاغ مفقود - " + person.firstName + " " + person.lastName)}&body=${encodeURIComponent(text + "\n\n" + url)}`
  };

  if (platform === "copy") {
    const copyPromise = navigator.clipboard?.writeText ? navigator.clipboard.writeText(url) : Promise.reject(new Error("clipboard-unavailable"));
    copyPromise.then(() => showToast("تم نسخ الرابط!"))
      .catch(() => {
        const input = document.createElement("textarea");
        input.value = url;
        input.style.position = "fixed";
        input.style.opacity = "0";
        document.body.appendChild(input);
        input.select();
        document.execCommand("copy");
        input.remove();
        showToast("تم نسخ الرابط!");
      });
  } else if (shareUrls[platform]) {
    window.open(shareUrls[platform], "_blank", "width=600,height=400");
  }
}

function printReport() {
  window.print();
}

// ============================================
// CONTACT FUNCTIONS
// ============================================
function callPhone(phone) {
  window.location.href = `tel:${phone.replace(/-/g, "")}`;
}

function openWhatsApp(phone) {
  const cleanPhone = phone.replace(/-/g, "").replace(/^0/, "213");
  window.open(`https://wa.me/${cleanPhone}`, "_blank");
}

function openViber(phone) {
  const cleanPhone = phone.replace(/-/g, "").replace(/^0/, "213");
  window.open(`viber://chat?number=${cleanPhone}`, "_blank");
}

// ============================================
// LAZY LOADING
// ============================================
function initLazyLoading() {
  const images = document.querySelectorAll("img[data-src]");
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute("data-src");
        imageObserver.unobserve(img);
      }
    });
  });
  images.forEach((img) => imageObserver.observe(img));
}

// ============================================
// ANIMATIONS
// ============================================
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll("[data-animate]");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  animatedElements.forEach((el) => observer.observe(el));
}

// ============================================
// MOBILE MENU
// ============================================
function initMobileMenu() {
  const toggler = document.querySelector(".navbar-toggler");
  const collapse = document.querySelector(".navbar-collapse");
  if (toggler && collapse) {
    toggler.addEventListener("click", () => {
      collapse.classList.toggle("show");
    });
  }
}

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener("DOMContentLoaded", () => {
  initLazyLoading();
  initScrollAnimations();
  initMobileMenu();
});

// PWA Registration
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    const projectBase = window.location.pathname.startsWith("/mafkoudin.dz/") ? "/mafkoudin.dz/" : "/";
    const serviceWorkerUrl = `${projectBase}service-worker.js`;
    navigator.serviceWorker.register(serviceWorkerUrl, { scope: projectBase })
      .then((reg) => console.log("Service Worker registered:", reg.scope))
      .catch((err) => console.warn("Service Worker registration failed:", err));
  });
        }
      
