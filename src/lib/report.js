import jsPDF from "jspdf";
import { DISCLAIMER, LOW_CONFIDENCE, getClass } from "./classes";
import { formatDate, formatPercent, imageSrc, toRatio } from "./format";

const MARGIN = 20;
const CONTENT_W = 170;
const PAGE_H = 297;
const BOTTOM = 25;

// jsPDF's built-in fonts only support Latin characters.
const safe = (v) => String(v ?? "").replace(/[^\x20-\x7E\u00A0-\u00FF]/g, "?");

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Image failed to load."));
    img.src = src;
  });
}

function toJpeg(img) {
  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0);
  return canvas.toDataURL("image/jpeg", 0.9);
}

function fit(img, maxW, maxH) {
  const ratio = Math.min(maxW / img.naturalWidth, maxH / img.naturalHeight);
  return { w: img.naturalWidth * ratio, h: img.naturalHeight * ratio };
}

/**
 * data: { patientName, age, gender, doctorName, diagnosis, confidence,
 *         remarks, date?, images?: [{ label, src }] }
 * Returns { skippedImages } (images that could not be embedded).
 */
export async function downloadReport(data) {
  const { patientName, age, gender, doctorName, diagnosis, confidence, remarks, date, images = [] } = data;
  const cls = getClass(diagnosis);
  const inconclusive = !cls || toRatio(confidence) < LOW_CONFIDENCE;

  const doc = new jsPDF("p", "mm", "a4");
  let y = MARGIN;

  const ensure = (h) => {
    if (y + h > PAGE_H - BOTTOM) {
      doc.addPage();
      y = MARGIN;
    }
  };

  const text = (value, { size = 11, bold = false, color = [0, 0, 0], gap = 6 } = {}) => {
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(size);
    doc.setTextColor(...color);
    const lines = doc.splitTextToSize(safe(value), CONTENT_W);
    ensure(lines.length * gap);
    doc.text(lines, MARGIN, y);
    y += lines.length * gap;
  };

  text("NeuroAI - MRI Analysis Report", { size: 20, bold: true, color: [29, 78, 216], gap: 9 });
  text(`Report date: ${formatDate(date ?? new Date().toISOString())}`, { size: 10, color: [100, 116, 139] });
  doc.setDrawColor(200);
  doc.line(MARGIN, y, MARGIN + CONTENT_W, y);
  y += 8;

  text("Patient", { bold: true, size: 13, gap: 8 });
  text(`Name: ${patientName || "N/A"}`);
  text(`Age: ${age || "N/A"}     Gender: ${gender || "N/A"}`);
  text(`Referring doctor: ${doctorName || "N/A"}`);
  y += 4;

  text("AI findings", { bold: true, size: 13, gap: 8 });
  text(`Classification: ${cls ? cls.label : safe(diagnosis) || "Unknown"}`);
  text(`Confidence: ${formatPercent(confidence)}`);
  if (inconclusive) {
    text("Result is inconclusive (low confidence or unrecognized class). Specialist review required.", {
      bold: true,
      color: [180, 83, 9],
    });
  }

  if (remarks?.trim()) {
    y += 4;
    text("Doctor remarks", { bold: true, size: 13, gap: 8 });
    text(remarks);
  }

  const loaded = [];
  const requested = images.filter((i) => i?.src);
  for (const item of requested) {
    try {
      const img = await loadImage(imageSrc(item.src));
      loaded.push({ label: item.label, data: toJpeg(img), ...fit(img, 80, 80) });
    } catch {
      // skip an image that cannot be embedded; reported via skippedImages
    }
  }

  if (loaded.length) {
    y += 6;
    ensure(100);
    let x = MARGIN;
    for (const item of loaded) {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      doc.text(safe(item.label), x, y);
      doc.addImage(item.data, "JPEG", x, y + 3, item.w, item.h);
      x += 90;
    }
    y += 95;
  }

  ensure(25);
  y += 12;
  doc.setDrawColor(0);
  doc.line(120, y, 190, y);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text("Reviewing clinician signature", 120, y + 5);

  const pages = doc.getNumberOfPages();
  for (let i = 1; i <= pages; i++) {
    doc.setPage(i);
    doc.setFont("helvetica", "italic");
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text(doc.splitTextToSize(DISCLAIMER, CONTENT_W), MARGIN, PAGE_H - 18);
    doc.text(`Page ${i} of ${pages}`, MARGIN + CONTENT_W, PAGE_H - 8, { align: "right" });
  }

  const name = safe(patientName || "scan").replace(/[^A-Za-z0-9_-]+/g, "_");
  doc.save(`MRI_Report_${name}_${new Date().toISOString().slice(0, 10)}.pdf`);

  return { skippedImages: requested.length - loaded.length };
}