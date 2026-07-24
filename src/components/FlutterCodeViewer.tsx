import React, { useState } from 'react';
import { Copy, Check, Download, FileCode, FolderGit2, Sparkles } from 'lucide-react';
import { FLUTTER_FILES } from '../data/flutterCode';

export const FlutterCodeViewer: React.FC = () => {
  const [selectedFilePath, setSelectedFilePath] = useState<string>('lib/main.dart');
  const [copied, setCopied] = useState<boolean>(false);

  const selectedFile = FLUTTER_FILES.find((f) => f.path === selectedFilePath) || FLUTTER_FILES[1];

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadAll = () => {
    // Combine all files into a structured markdown block for easy download/copy
    const fullProjectCode = FLUTTER_FILES.map(
      (file) => `// =============================================================\n// FILE: ${file.path}\n// =============================================================\n\n${file.content}\n\n`
    ).join('\n');

    const blob = new Blob([fullProjectCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bhao_flutter_complete_project.dart';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4 pb-24">
      {/* Overview Banner */}
      <div className="bg-gradient-to-r from-[#0f172a] to-[#1e293b] text-white rounded-2xl p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FolderGit2 className="w-5 h-5 text-[#6bff8f]" />
            <h2 className="text-lg font-bold">Complete Flutter Dart Codebase</h2>
          </div>
          <span className="bg-[#6bff8f]/20 text-[#6bff8f] text-xs font-bold px-2.5 py-1 rounded-full border border-[#6bff8f]/30">
            Material 3 Ready
          </span>
        </div>
        <p className="text-xs text-gray-300 leading-relaxed">
          Full, clean, multi-screen Flutter architecture matching all Bhao specs with navigation, English/Urdu localization setup (`AppStrings`), and explicit Firebase Firestore/Storage comments.
        </p>

        <div className="flex gap-2 pt-1">
          <button
            onClick={handleDownloadAll}
            className="bg-[#6bff8f] hover:bg-[#52e879] text-[#0f172a] text-xs font-bold px-3.5 py-2 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download All Code (.dart)</span>
          </button>
        </div>
      </div>

      {/* Main File Browser & Code Display */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-gray-900 rounded-2xl border border-gray-800 p-3 sm:p-4 shadow-md text-gray-100">
        {/* Sidebar File List */}
        <div className="md:col-span-1 space-y-1 border-b md:border-b-0 md:border-r border-gray-800 pb-3 md:pb-0 md:pr-3">
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2 px-2">
            Project Files ({FLUTTER_FILES.length})
          </p>
          {FLUTTER_FILES.map((file) => {
            const isActive = file.path === selectedFilePath;
            return (
              <button
                key={file.path}
                onClick={() => setSelectedFilePath(file.path)}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-mono font-medium transition-colors flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? 'bg-blue-600/30 text-blue-400 border border-blue-500/40'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
                }`}
              >
                <FileCode className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{file.path}</span>
              </button>
            );
          })}
        </div>

        {/* Code Content Window */}
        <div className="md:col-span-3 space-y-3 flex flex-col min-w-0">
          {/* File Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 bg-gray-950 p-3 rounded-xl border border-gray-800">
            <div>
              <p className="font-mono text-sm font-bold text-emerald-400">
                {selectedFile.path}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                {selectedFile.description}
              </p>
            </div>

            <button
              onClick={handleCopy}
              className="bg-gray-800 hover:bg-gray-700 text-gray-200 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Code</span>
                </>
              )}
            </button>
          </div>

          {/* Code Editor Preview */}
          <div className="relative bg-gray-950 rounded-xl p-4 overflow-x-auto border border-gray-800 font-mono text-xs leading-relaxed text-gray-300 max-h-[500px]">
            <pre className="whitespace-pre-wrap font-mono">
              {selectedFile.content}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
