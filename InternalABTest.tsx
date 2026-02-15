import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FlaskConical, BarChart3, Eye, Copy, Check } from 'lucide-react';

const STORAGE_KEY = 'ab_variant';

export function getABVariant(): 'A' | 'B' {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'A' || stored === 'B') return stored;
    return Math.random() < 0.5 ? 'A' : 'B';
  } catch {
    return 'A';
  }
}

export function setABVariant(v: 'A' | 'B') {
  localStorage.setItem(STORAGE_KEY, v);
}

export default function InternalABTest() {
  const [variant, setVariant] = useState<'A' | 'B'>(getABVariant());
  const [copied, setCopied] = useState(false);

  const applyVariant = (v: 'A' | 'B') => {
    setABVariant(v);
    setVariant(v);
  };

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const linkA = `${baseUrl}/?ab=A`;
  const linkB = `${baseUrl}/long2?ab=B`;

  const copyLink = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto p-6 md:p-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors mb-8 text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" /> На главную
        </Link>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="bg-slate-900 text-white px-6 py-5 flex items-center gap-3">
            <FlaskConical className="w-7 h-7 text-yellow-400" />
            <div>
              <h1 className="text-2xl font-black font-serif">A/B Тест — Внутренняя панель</h1>
              <p className="text-slate-400 text-sm mt-0.5">Переключай варианты и смотри результаты</p>
            </div>
          </div>

          <div className="p-6 md:p-10 space-y-8">
            {/* Текущий вариант */}
            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                <BarChart3 className="w-5 h-5" /> Текущий вариант для этого устройства
              </h2>
              <div className="flex gap-3">
                <button
                  onClick={() => applyVariant('A')}
                  className={`flex-1 py-4 px-6 rounded-xl font-bold text-lg transition-all border-2 ${
                    variant === 'A'
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-blue-300'
                  }`}
                >
                  Вариант A
                </button>
                <button
                  onClick={() => applyVariant('B')}
                  className={`flex-1 py-4 px-6 rounded-xl font-bold text-lg transition-all border-2 ${
                    variant === 'B'
                      ? 'bg-purple-600 text-white border-purple-600'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-purple-300'
                  }`}
                >
                  Вариант B
                </button>
              </div>
              <p className="text-sm text-slate-500 mt-2">
                Выбран <strong className="text-slate-700">вариант {variant}</strong>. Сохраняется в localStorage.
              </p>
            </section>

            {/* Ссылки для теста */}
            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Eye className="w-5 h-5" /> Прямые ссылки для A/B
              </h2>
              <div className="space-y-4">
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
                  <div className="text-xs font-mono text-slate-500 uppercase mb-2">Вариант A</div>
                  <div className="flex gap-2 items-center">
                    <input
                      readOnly
                      value={linkA}
                      className="flex-1 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-mono truncate"
                    />
                    <button
                      onClick={() => copyLink(linkA)}
                      className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-2 text-sm"
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      {copied ? 'Скопировано' : 'Копировать'}
                    </button>
                  </div>
                </div>
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
                  <div className="text-xs font-mono text-slate-500 uppercase mb-2">Вариант B</div>
                  <div className="flex gap-2 items-center">
                    <input
                      readOnly
                      value={linkB}
                      className="flex-1 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-mono truncate"
                    />
                    <button
                      onClick={() => copyLink(linkB)}
                      className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-2 text-sm"
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      {copied ? 'Скопировано' : 'Копировать'}
                    </button>
                  </div>
                </div>
              </div>
              <p className="text-sm text-slate-500 mt-2">
                Вариант A = главная страница. Вариант B = Long2 (новая лендинг). Используй в рекламе или рассылках.
              </p>
            </section>

            {/* Что тестируем */}
            <section className="bg-amber-50 border border-amber-200 rounded-xl p-6">
              <h2 className="text-lg font-bold text-amber-900 mb-2">Следующий шаг</h2>
              <p className="text-amber-800 text-sm">
                Сейчас страница читает вариант из <code className="bg-amber-100 px-1 rounded">localStorage</code> или из URL (<code className="bg-amber-100 px-1 rounded">?ab=A</code>). 
                Дальше можно добавить разные блоки, заголовки или CTA для вариантов A и B — и сравнивать конверсию.
              </p>
            </section>

            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <Link
                to="/?ab=A"
                className="inline-flex items-center justify-center gap-2 bg-slate-900 text-white font-bold py-3 px-6 rounded-xl hover:bg-slate-800 transition-colors"
              >
                <Eye className="w-5 h-5" /> Вариант A — главная
              </Link>
              <Link
                to="/long2?ab=B"
                className="inline-flex items-center justify-center gap-2 bg-purple-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-purple-700 transition-colors"
              >
                <Eye className="w-5 h-5" /> Вариант B — Long2
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
