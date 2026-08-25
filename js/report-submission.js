(function () {
  const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
  const acceptedTypes = ["image/jpeg", "image/png", "image/webp"];

  function apiBaseUrl() {
    return String(window.MAFKOUDIN_REPORTS_API_BASE_URL || "").replace(/\/$/, "");
  }

  function validateImage(file) {
    if (!file) throw new Error("الصورة الرئيسية مطلوبة");
    if (file.size > MAX_IMAGE_BYTES) throw new Error("يجب ألا يتجاوز حجم الصورة 5 ميغابايت");
  }

  function optionalValue(id) {
    const value = document.getElementById(id).value.trim();
    return value || null;
  }

  function numericValue(id) {
    const value = document.getElementById(id).value;
    return value ? Number(value) : null;
  }

  function phoneValue(id) {
    const value = document.getElementById(id).value;
    const digits = value.replace(/\D/g, "");
    return digits || null;
  }

  function setSubmissionStatus(message = "", type = "info") {
    const status = document.getElementById("submissionStatus");
    if (!status) return;
    status.textContent = message;
    status.className = `alert alert-${type === "success" ? "success" : type === "error" ? "danger" : "info"} mt-3 mb-0${message ? "" : " d-none"}`;
  }

  const requiredTextFields = [
    ["firstName", "اسم الشخص المفقود"],
    ["lastName", "لقب الشخص المفقود"],
    ["state", "الولاية"],
    ["municipality", "البلدية"],
    ["placeMissing", "مكان الاختفاء"],
    ["circumstances", "ظروف الاختفاء"],
    ["reporterName", "اسم المبلّغ"],
  ];

  function validateRequiredTextFields() {
    for (const [id, label] of requiredTextFields) {
      const input = document.getElementById(id);
      if (!input || input.value.trim()) {
        input?.classList.remove("is-invalid");
        continue;
      }
      input.classList.add("is-invalid");
      input.focus();
      setSubmissionStatus(`يرجى إدخال ${label}.`, "error");
      showToast(`يرجى إدخال ${label}.`, "error");
      return false;
    }
    return true;
  }

  async function submitReport(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      setSubmissionStatus("الرجاء تعبئة جميع الحقول المطلوبة.", "error");
      showToast("الرجاء تعبئة جميع الحقول المطلوبة", "error");
      return;
    }
    if (!validateRequiredTextFields()) return;

    const baseUrl = apiBaseUrl();
    if (!baseUrl) {
      setSubmissionStatus("خدمة استقبال البلاغات قيد الإعداد. يرجى المحاولة لاحقًا.", "error");
      showToast("خدمة استقبال البلاغات قيد الإعداد. يرجى المحاولة لاحقًا.", "error");
      return;
    }

    const mainInput = document.getElementById("mainImageInput");
    const extraInput = document.getElementById("extraImagesInput");
    const btn = document.getElementById("submitBtn");
    const originalText = btn.innerHTML;
    try {
      if (!mainInput.files[0]) throw new Error("الصورة الرئيسية مطلوبة");
      if (extraInput.files.length > 5) throw new Error("يمكنك رفع خمس صور إضافية كحد أقصى");
      setSubmissionStatus("جارٍ تجهيز البلاغ وإرساله. لا تغلق الصفحة حتى تظهر النتيجة.", "info");
      btn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i> جاري الإرسال...';
      btn.disabled = true;
      validateImage(mainInput.files[0]);
      Array.from(extraInput.files).forEach(validateImage);
      const payload = {
        firstName: optionalValue("firstName"),
        lastName: optionalValue("lastName"),
        age: Number(document.getElementById("age").value),
        gender: document.getElementById("gender").value,
        mentalState: optionalValue("mentalState"),
        heightCm: numericValue("height"),
        weightKg: numericValue("weight"),
        hairColor: optionalValue("hairColor"),
        eyeColor: optionalValue("eyeColor"),
        clothing: optionalValue("clothing"),
        distinctiveMarks: optionalValue("distinctiveMarks"),
        state: document.getElementById("state").value.trim(),
        municipality: document.getElementById("municipality").value.trim(),
        address: optionalValue("address"),
        dateMissing: document.getElementById("dateMissing").value,
        timeMissing: optionalValue("timeMissing"),
        placeMissing: optionalValue("placeMissing"),
        lastSeen: optionalValue("lastSeen"),
        circumstances: optionalValue("circumstances"),
        description: optionalValue("description"),
        reporter: {
          fullName: optionalValue("reporterName"),
          relation: document.getElementById("reporterRelation").value,
          phone: phoneValue("reporterPhone"),
          backupPhone: phoneValue("reporterPhone2"),
          email: optionalValue("reporterEmail"),
        },
        website: document.getElementById("website")?.value || "",
      };
      const formData = new FormData();
      formData.append("payload", JSON.stringify(payload));
      formData.append("mainImage", mainInput.files[0]);
      Array.from(extraInput.files).forEach(file => formData.append("extraImages", file));
      const response = await fetch(`${baseUrl}/api/public/reports/upload`, {
        method: "POST",
        body: formData,
      });
      const body = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(body.error || "تعذر إرسال البلاغ الآن");
      setSubmissionStatus(`تم استلام البلاغ بنجاح. رقمك المرجعي: ${body.reference}`, "success");
      showToast(`تم استلام البلاغ بنجاح. رقمك المرجعي: ${body.reference}`, "success");
      form.reset();
      form.classList.remove("was-validated");
      document.getElementById("mainImagePreview").classList.add("d-none");
      document.getElementById("extraImagesPreview").classList.add("d-none");
    } catch (error) {
      const message = error instanceof Error ? error.message : "تعذر إرسال البلاغ الآن";
      setSubmissionStatus(message, "error");
      showToast(message, "error");
    } finally {
      btn.innerHTML = originalText;
      btn.disabled = false;
    }
  }

  function initImageUploads() {
    const mainZone = document.getElementById("mainImageZone");
    const mainInput = document.getElementById("mainImageInput");
    const mainPreview = document.getElementById("mainImagePreview");
    if (!mainZone || mainZone.dataset.initialized === "true") return;
    mainZone.dataset.initialized = "true";
    mainZone.addEventListener("click", () => mainInput.click());
    mainInput.addEventListener("change", () => {
      const file = mainInput.files[0];
      if (!file) return;
      const url = URL.createObjectURL(file);
      mainPreview.querySelector("img").src = url;
      mainPreview.classList.remove("d-none");
    });

    const extraZone = document.getElementById("extraImagesZone");
    const extraInput = document.getElementById("extraImagesInput");
    const extraPreview = document.getElementById("extraImagesPreview");
    extraZone.addEventListener("click", () => extraInput.click());
    extraInput.addEventListener("change", () => {
      extraPreview.innerHTML = "";
      const files = Array.from(extraInput.files).slice(0, 5);
      if (!files.length) return extraPreview.classList.add("d-none");
      files.forEach(file => {
        const image = document.createElement("img");
        image.src = URL.createObjectURL(file);
        image.alt = "معاينة صورة مرفقة";
        image.className = "rounded";
        image.style.cssText = "width:80px;height:80px;object-fit:cover;";
        extraPreview.appendChild(image);
      });
      extraPreview.classList.remove("d-none");
    });

    ["reporterPhone", "reporterPhone2"].forEach((id) => {
      const input = document.getElementById(id);
      input?.addEventListener("input", () => {
        input.value = input.value.replace(/\D/g, "").slice(0, 10);
      });
    });
  }

  function initializeForm() {
    const form = document.getElementById("reportForm");
    if (!form || form.dataset.submitHandlerBound === "true") return;
    form.dataset.submitHandlerBound = "true";

    initImageUploads();
    form.addEventListener("submit", submitReport);
  }

  document.addEventListener("DOMContentLoaded", () => {
    initializeForm();
  });
})();
