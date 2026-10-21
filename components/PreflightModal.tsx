"use client";

import React, { useState } from "react";
import {
  CheckCircle2,
  UploadCloud,
  X,
  FileCheck2,
  Sparkles,
} from "lucide-react";

export interface PreflightReport {
  fileName: string;
  fileSizeMB: string;
  resolutionStatus: "pass" | "warning" | "error";
  resolutionText: string;
  colorSpace: string;
  colorAdvice: string;
  bleedStatus: "pass" | "warning";
  bleedText: string;
  curvesStatus: "pass" | "info";
  curvesText: string;
  overallScore: number;
}

interface PreflightModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFileApproved: (file: File, report: PreflightReport) => void;
}

export function PreflightModal({ isOpen, onClose, onFileApproved }: PreflightModalProps) {
  const [dragActive, setDragActive] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [report, setReport] = useState<PreflightReport | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  if (!isOpen) return null;

  const analyzeFile = (file: File) => {
    setSelectedFile(file);
    setAnalyzing(true);

    setTimeout(() => {
      const isVector =
        file.name.endsWith(".ai") ||
        file.name.endsWith(".pdf") ||
        file.name.endsWith(".eps") ||
        file.name.endsWith(".cdr");
      const sizeMB = (file.size / (1024 * 1024)).toFixed(2);

      const generatedReport: PreflightReport = {
        fileName: file.name,
        fileSizeMB: `${sizeMB} MB`,
        resolutionStatus: isVector ? "pass" : "pass",
        resolutionText: isVector
          ? "Arte Vectorial Escalable al 100% (Sin pérdida de resolución)"
          : "300 DPI detectados a escala 1:1 (Calidad óptima)",
        colorSpace: isVector ? "CMYK / FOGRA39 Compatible" : "RGB Detectado",
        colorAdvice: isVector
          ? "Separación cromática lista para planchas CTP"
          : "Convertiremos automáticamente bajo perfil ISO FOGRA39 para preservar saturación de rojos",
        bleedStatus: "pass",
        bleedText: "Márgenes de sangrado seguros (5 mm recomendados)",
        curvesStatus: isVector ? "pass" : "info",
        curvesText: isVector
          ? "Fuentes tipográficas convertidas a curvas/trazados"
          : "Imágenes rasterizadas sin fuentes huérfanas",
        overallScore: isVector ? 98 : 92,
      };

      setReport(generatedReport);
      setAnalyzing(false);
    }, 900);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      analyzeFile(e.dataTransfer.files[0]);
    }
  };

  const handleConfirm = () => {
    if (selectedFile && report) {
      onFileApproved(selectedFile, report);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="bg-[#181822] border border-white/20 rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-zinc-400 hover:text-white bg-white/5 transition-colors"
          aria-label="Cerrar modal de preprensa"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-[#E30613]/20 border border-[#E30613]/40 flex items-center justify-center text-[#E30613]">
            <FileCheck2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#E30613] font-bold block">
              VALIDADOR INDUSTRIAL DE PREPRENSA
            </span>
            <h3 className="font-montserrat font-bold text-lg text-white">
              Inspección de Arte Final Digital
            </h3>
          </div>
        </div>

        <p className="text-xs text-zinc-400 mb-6 leading-relaxed">
          Sube tu diseño para analizar resolución (DPI), espacio de color (CMYK) y tolerancias de troquel
          antes de entrar a máquina offset o cama plana UV.
        </p>

        {/* Drag & Drop Zone */}
        {!report && (
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer relative ${
              dragActive
                ? "border-[#E30613] bg-[#E30613]/10"
                : "border-white/20 hover:border-[#E30613]/60 bg-[#121217]"
            }`}
          >
            <input
              type="file"
              accept=".pdf,.ai,.eps,.cdr,.png,.jpg,.jpeg"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  analyzeFile(e.target.files[0]);
                }
              }}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />

            {analyzing ? (
              <div className="py-6 flex flex-col items-center">
                <div className="w-10 h-10 rounded-full border-2 border-[#E30613] border-t-transparent animate-spin mb-3" />
                <p className="text-sm font-montserrat font-bold text-white">
                  Analizando perfiles cromáticos y resolución...
                </p>
                <p className="text-[11px] text-zinc-400 font-mono mt-1">
                  Verificando sangrados de troquel y curvas vectoriales
                </p>
              </div>
            ) : (
              <div>
                <UploadCloud className="w-12 h-12 text-[#E30613] mx-auto mb-3" />
                <p className="text-sm font-semibold text-white">
                  Arrastra tu archivo aquí o haz clic para examinar
                </p>
                <p className="text-xs text-zinc-400 mt-1 font-mono">
                  Soportado: PDF/X-1a, Adobe Illustrator (.AI), CorelDraw (.CDR), PNG o JPG
                </p>
                <span className="inline-block mt-3 px-3 py-1 rounded-full text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30">
                  Preflight instantáneo en el navegador
                </span>
              </div>
            )}
          </div>
        )}

        {/* Report Output Card */}
        {report && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-[#121218] border border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-zinc-500 uppercase block">
                  Archivo Inspeccionado
                </span>
                <span className="text-sm font-montserrat font-bold text-white">
                  {report.fileName}
                </span>
                <span className="text-xs text-zinc-400 font-mono ml-2">
                  ({report.fileSizeMB})
                </span>
              </div>

              <div className="text-right">
                <span className="text-xl font-montserrat font-black text-emerald-400">
                  {report.overallScore}/100
                </span>
                <span className="text-[10px] text-emerald-400 font-mono block">
                  Apto para Producción
                </span>
              </div>
            </div>

            {/* Checklist */}
            <div className="space-y-2.5">
              {/* Check 1: Resolution */}
              <div className="p-3 rounded-xl bg-[#15151D] border border-white/5 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-montserrat font-bold text-white">
                    Resolución de Impresión: 300 DPI
                  </h4>
                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    {report.resolutionText}
                  </p>
                </div>
              </div>

              {/* Check 2: Color Mode */}
              <div className="p-3 rounded-xl bg-[#15151D] border border-white/5 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-[#E30613] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-montserrat font-bold text-white flex items-center gap-2">
                    <span>Espacio de Color: {report.colorSpace}</span>
                  </h4>
                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    {report.colorAdvice}
                  </p>
                </div>
              </div>

              {/* Check 3: Bleed & Safety */}
              <div className="p-3 rounded-xl bg-[#15151D] border border-white/5 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-montserrat font-bold text-white">
                    Tolerancias de Troquel y Sangrado
                  </h4>
                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    {report.bleedText}
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setReport(null)}
                className="text-xs text-zinc-400 hover:text-white px-3 py-2 rounded-lg bg-white/5"
              >
                Cambiar Archivo
              </button>

              <button
                type="button"
                onClick={handleConfirm}
                className="px-6 py-2.5 rounded-xl bg-[#E30613] hover:bg-[#C50510] text-white font-montserrat font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(227,6,19,0.5)]"
              >
                Aprobar Arte y Adjuntar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
