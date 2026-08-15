import { Pengaturan } from "../types";

// GitHub Pages build: this module intentionally uses browser localStorage only.
// GitHub Pages cannot run Firebase/Node server code, so the static demo must not
// initialize a remote database during application startup.
export const firestore = null;

export const COLLECTIONS = {
  SISWA: "data_siswa",
  MAPEL: "mapel",
  JADWAL: "jadwal",
  LOG_ABSENSI: "log_absensi",
  DATA_NILAI: "data_nilai",
  JURNAL_AGENDA: "jurnal_agenda",
  SISWA_BIMBINGAN: "siswa_bimbingan",
  BIMBINGAN_WALI: "bimbingan_wali",
  PENGATURAN: "pengaturan",
} as const;

const keyFor = (collectionName: string) => `smk_tunas_media_db_${collectionName}`;

function readCollection<T>(collectionName: string): T[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(keyFor(collectionName));
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeCollection<T>(collectionName: string, data: T[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(keyFor(collectionName), JSON.stringify(data));
  window.dispatchEvent(new CustomEvent(`smk_tunas_media_update_${collectionName}`, { detail: data }));
}

export function isRemixInstance(): boolean { return false; }
export function checkDatabaseAuthorization(): { authorized: boolean; reason?: string } {
  return { authorized: true };
}
export function checkPengaturanDatabaseAuthorization(): { authorized: boolean; reason?: string } {
  return { authorized: true };
}

export function subscribeCollection<T>(collectionName: string, callback: (data: T[]) => void) {
  callback(readCollection<T>(collectionName));
  if (typeof window === "undefined") return () => {};
  const eventName = `smk_tunas_media_update_${collectionName}`;
  const handleUpdate = (event: Event) => {
    const detail = (event as CustomEvent).detail;
    callback(Array.isArray(detail) ? detail : readCollection<T>(collectionName));
  };
  window.addEventListener(eventName, handleUpdate);
  return () => window.removeEventListener(eventName, handleUpdate);
}

export async function saveDocument(collectionName: string, id: string, data: Record<string, any>) {
  const current = readCollection<any>(collectionName);
  const index = current.findIndex((item) => item.id === id);
  const updated = { ...(index >= 0 ? current[index] : {}), ...data, id, updatedAt: Date.now() };
  if (index >= 0) current[index] = updated;
  else current.push(updated);
  writeCollection(collectionName, current);
}

export async function deleteDocument(collectionName: string, id: string) {
  const current = readCollection<any>(collectionName);
  writeCollection(collectionName, current.filter((item) => item.id !== id));
}

export async function batchSaveDocuments(collectionName: string, items: Array<{ id: string; [key: string]: any }>) {
  if (!items?.length) return;
  const current = readCollection<any>(collectionName);
  for (const item of items) {
    const index = current.findIndex((existing) => existing.id === item.id);
    const updated = { ...(index >= 0 ? current[index] : {}), ...item, updatedAt: Date.now() };
    if (index >= 0) current[index] = updated;
    else current.push(updated);
  }
  writeCollection(collectionName, current);
}

export async function savePengaturan(config: Pengaturan) {
  if (typeof window === "undefined") return;
  localStorage.setItem("smk_tunas_media_pengaturan", JSON.stringify(config));
  window.dispatchEvent(new CustomEvent("smk_tunas_media_pengaturan_update", { detail: config }));
}

export function subscribePengaturan(callback: (config: Pengaturan) => void) {
  if (typeof window === "undefined") return () => {};
  const raw = localStorage.getItem("smk_tunas_media_pengaturan");
  if (raw) {
    try { callback(JSON.parse(raw)); } catch { /* ignore malformed local data */ }
  }
  const handleUpdate = (event: Event) => {
    const detail = (event as CustomEvent).detail;
    if (detail) callback(detail as Pengaturan);
  };
  window.addEventListener("smk_tunas_media_pengaturan_update", handleUpdate);
  return () => window.removeEventListener("smk_tunas_media_pengaturan_update", handleUpdate);
}

export async function clearAllDatabaseCollections() {
  if (typeof window === "undefined") return;
  Object.values(COLLECTIONS).forEach((collectionName) => {
    localStorage.removeItem(keyFor(collectionName));
    window.dispatchEvent(new CustomEvent(`smk_tunas_media_update_${collectionName}`, { detail: [] }));
  });
  localStorage.removeItem("smk_tunas_media_pengaturan");
  localStorage.setItem("edadmin_database_cleared", "true");
  window.dispatchEvent(new CustomEvent("smk_tunas_media_pengaturan_update", { detail: {} }));
}
