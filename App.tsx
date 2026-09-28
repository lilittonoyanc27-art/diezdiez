import React, { useState, useMemo } from 'react';
import {
  FULL_TEXT_PARAGRAPHS,
  CATEGORIES,
  QUESTIONS_AND_ANSWERS,
  SHORT_TEXT_PARAGRAPHS,
  GrammaticalCategory,
  QuestionAnswer,
  TextBlock,
} from './data.ts';
import {
  BookOpen,
  Layers,
  HelpCircle,
  FileText,
  Volume2,
  Eye,
  EyeOff,
  Search,
  CheckCircle2,
  Sparkles,
  ChevronDown,
  RotateCcw,
  Languages,
  Check,
  Award,
} from 'lucide-react';

type TabType = 'full-text' | 'categories' | 'qa' | 'short-text' | 'quiz';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('categories');
  const [revealedIds, setRevealedIds] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [showAllTr, setShowAllTr] = useState(false);

  // Quiz state
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizRevealed, setQuizRevealed] = useState(false);
  const [quizScore, setQuizScore] = useState<{ known: number; review: number }>({
    known: 0,
    review: 0,
  });
  const [completedQuizIds, setCompletedQuizIds] = useState<Record<number, boolean>>({});

  // TTS helper
  const speakSpanish = (text: string, id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES';
    utterance.rate = 0.9;

    setSpeakingId(id);
    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);

    window.speechSynthesis.speak(utterance);
  };

  // Toggle single item reveal
  const toggleReveal = (id: string) => {
    setRevealedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const isItemRevealed = (id: string) => {
    if (showAllTr) return true;
    return !!revealedIds[id];
  };

  // Reveal all / hide all
  const handleToggleAll = (reveal: boolean) => {
    setShowAllTr(reveal);
    if (!reveal) {
      setRevealedIds({});
    }
  };

  // Filtered QA
  const filteredQA = useMemo(() => {
    if (!searchQuery.trim()) return QUESTIONS_AND_ANSWERS;
    const q = searchQuery.toLowerCase().trim();
    return QUESTIONS_AND_ANSWERS.filter(
      (item) =>
        item.qEs.toLowerCase().includes(q) ||
        item.qHy.toLowerCase().includes(q) ||
        item.aEs.toLowerCase().includes(q) ||
        item.aHy.toLowerCase().includes(q) ||
        String(item.id).includes(q)
    );
  }, [searchQuery]);

  // Filtered Categories
  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return CATEGORIES;
    const q = searchQuery.toLowerCase().trim();
    return CATEGORIES.filter(
      (cat) =>
        cat.esTitle.toLowerCase().includes(q) ||
        cat.hyTitle.toLowerCase().includes(q) ||
        cat.esDef.toLowerCase().includes(q) ||
        cat.hyDef.toLowerCase().includes(q) ||
        cat.examples.some((ex) => ex.toLowerCase().includes(q)) ||
        cat.sampleSentence?.es.toLowerCase().includes(q) ||
        cat.sampleSentence?.hy.toLowerCase().includes(q) ||
        cat.adverbExamples?.some(
          (adv) =>
            adv.es.toLowerCase().includes(q) || adv.hy.toLowerCase().includes(q)
        )
    );
  }, [searchQuery]);

  // Filtered Full Text
  const filteredFullText = useMemo(() => {
    if (!searchQuery.trim()) return FULL_TEXT_PARAGRAPHS;
    const q = searchQuery.toLowerCase().trim();
    return FULL_TEXT_PARAGRAPHS.filter(
      (item) =>
        item.es.toLowerCase().includes(q) ||
        item.hy.toLowerCase().includes(q) ||
        (item.keywordEs && item.keywordEs.toLowerCase().includes(q)) ||
        (item.keywordHy && item.keywordHy.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  // Current Quiz Question
  const currentQuiz = QUESTIONS_AND_ANSWERS[quizIndex];

  const handleNextQuiz = (known: boolean) => {
    setQuizScore((prev) => ({
      known: known ? prev.known + 1 : prev.known,
      review: !known ? prev.review + 1 : prev.review,
    }));
    setCompletedQuizIds((prev) => ({ ...prev, [currentQuiz.id]: true }));
    setQuizRevealed(false);
    if (quizIndex < QUESTIONS_AND_ANSWERS.length - 1) {
      setQuizIndex(quizIndex + 1);
    }
  };

  const resetQuiz = () => {
    setQuizIndex(0);
    setQuizRevealed(false);
    setQuizScore({ known: 0, review: 0 });
    setCompletedQuizIds({});
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      {/* Top Bar Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-red-600 flex items-center justify-center text-white shadow-sm font-bold text-lg">
              ES
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 text-base sm:text-lg tracking-tight">
                  4. Categorías Gramaticales
                </span>
                <span className="text-xs bg-amber-100 text-amber-900 font-medium px-2 py-0.5 rounded-full border border-amber-200">
                  ES ↔ ARM
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Քերականական խոսքի մասերը · Իսպաներեն — Հայերեն
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleToggleAll(!showAllTr)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer text-slate-700"
              title="Բացել կամ փակել բոլոր հայերեն թարգմանությունները"
            >
              {showAllTr ? (
                <>
                  <EyeOff className="w-3.5 h-3.5 text-slate-500" />
                  <span className="hidden sm:inline">Փակել բոլորը</span>
                </>
              ) : (
                <>
                  <Eye className="w-3.5 h-3.5 text-amber-600" />
                  <span className="hidden sm:inline">Բացել բոլորը</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <nav className="flex space-x-1 sm:space-x-2 overflow-x-auto py-2 no-scrollbar border-t border-slate-100">
            <button
              onClick={() => setActiveTab('categories')}
              className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'categories'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>9 Խոսքի մասեր</span>
            </button>

            <button
              onClick={() => setActiveTab('qa')}
              className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'qa'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              <span>Հարց ու պատասխան (19)</span>
            </button>

            <button
              onClick={() => setActiveTab('full-text')}
              className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'full-text'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Լիարժեք տեքստ</span>
            </button>

            <button
              onClick={() => setActiveTab('short-text')}
              className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'short-text'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Կարճ տեքստ</span>
            </button>

            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'quiz'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span>Վարժանք & Քարտեր</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Banner with Instructions */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 bg-amber-500 text-white rounded-xl shadow-xs shrink-0 mt-0.5">
              <Languages className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-semibold text-amber-950 flex items-center gap-2">
                <span>Ինտերակտիվ ուսուցում</span>
                <span className="text-xs bg-amber-200/80 text-amber-900 px-2 py-0.5 rounded-full font-medium">
                  Արմ ↔ Իսպ
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-amber-800/90 mt-0.5">
                👆 <strong>Սեղմեք ցանկացած իսպաներեն նախադասության կամ քարտի վրա</strong>՝ հայերեն թարգմանությունն անմիջապես տեսնելու համար։ Լսելու համար սեղմեք բարձրախոսի կոճակը 🔊։
              </p>
            </div>
          </div>

          {/* Search Input */}
          {activeTab !== 'quiz' && (
            <div className="relative w-full sm:w-64 shrink-0">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Որոնել բառ կամ թեմա..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm bg-white border border-amber-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all placeholder:text-slate-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>
          )}
        </div>

        {/* TAB 1: 9 CATEGORÍAS PRINCIPALES */}
        {activeTab === 'categories' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Categorías principales / Հիմնական խոսքի մասերը
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Ընդհանուր 9 քերականական կատեգորիա՝ սահմանումներով, օրինակներով և արտասանությամբ
                </p>
              </div>
              <span className="text-xs font-mono text-slate-400 tabular-nums">
                {filteredCategories.length} / 9 մաս
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCategories.map((cat) => {
                const cardId = `cat-${cat.id}`;
                const revealed = isItemRevealed(cardId);

                return (
                  <div
                    key={cat.id}
                    onClick={() => toggleReveal(cardId)}
                    className={`group relative bg-white rounded-2xl border transition-all duration-200 p-5 cursor-pointer shadow-xs hover:shadow-md flex flex-col justify-between ${
                      revealed
                        ? 'border-amber-400 ring-2 ring-amber-400/10'
                        : 'border-slate-200 hover:border-amber-300'
                    }`}
                  >
                    <div>
                      {/* Top Header of Category */}
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-2.5">
                          <span className="w-7 h-7 rounded-lg bg-amber-50 text-amber-700 font-bold text-xs flex items-center justify-center border border-amber-200 shrink-0">
                            {cat.id}
                          </span>
                          <div>
                            <h3 className="text-base font-bold text-slate-900 group-hover:text-amber-600 transition-colors flex items-center gap-1.5">
                              <span>{cat.esTitle}</span>
                            </h3>
                            {revealed && (
                              <p className="text-xs font-semibold text-amber-700 animate-fadeIn">
                                {cat.hyTitle}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={(e) => speakSpanish(cat.esTitle, `speak-cat-${cat.id}`, e)}
                            className={`p-1.5 rounded-lg text-slate-400 hover:text-amber-600 hover:bg-amber-50 transition-colors cursor-pointer ${
                              speakingId === `speak-cat-${cat.id}` ? 'text-amber-600 animate-pulse' : ''
                            }`}
                            title="Լսել իսպաներեն արտասանությունը"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>

                          <div
                            className={`p-1 rounded-md text-slate-400 transition-transform ${
                              revealed ? 'text-amber-600 rotate-180' : ''
                            }`}
                          >
                            <ChevronDown className="w-4 h-4" />
                          </div>
                        </div>
                      </div>

                      {/* Spanish Definition */}
                      <div className="mb-3">
                        <div className="text-xs font-medium text-slate-400 mb-0.5 flex items-center justify-between">
                          <span>🇪🇸 Español:</span>
                          <span className="text-[10px] text-amber-600 group-hover:underline">
                            {revealed ? 'Թաքցնել' : 'Սեղմեք թարգմանության համար'}
                          </span>
                        </div>
                        <p className="text-sm text-slate-800 leading-relaxed font-medium">
                          {cat.esDef}
                        </p>
                      </div>

                      {/* Armenian Definition (Revealable) */}
                      {revealed ? (
                        <div className="mb-3.5 p-2.5 bg-amber-50/70 border border-amber-200/80 rounded-xl animate-fadeIn">
                          <div className="text-[11px] font-semibold text-amber-800 mb-0.5">
                            🇦🇲 Հայերեն թարգմանություն:
                          </div>
                          <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                            {cat.hyDef}
                          </p>
                        </div>
                      ) : (
                        <div className="mb-3.5 p-2 bg-slate-50 border border-dashed border-slate-200 rounded-xl text-center">
                          <span className="text-xs text-slate-500 font-medium">
                            🇦🇲 Սեղմեք՝ հայերեն սահմանումը բացելու համար
                          </span>
                        </div>
                      )}

                      {/* Examples */}
                      <div className="pt-3 border-t border-slate-100">
                        <div className="text-xs font-semibold text-slate-500 mb-1.5 flex items-center justify-between">
                          <span>Ejemplos / Օրինակներ:</span>
                        </div>

                        {/* Special case: Adverb breakdown */}
                        {cat.adverbExamples ? (
                          <div className="grid grid-cols-2 gap-1.5 text-xs">
                            {cat.adverbExamples.map((adv, idx) => (
                              <div
                                key={idx}
                                className="px-2 py-1 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between"
                              >
                                <span className="font-semibold text-slate-800">{adv.es}</span>
                                {revealed ? (
                                  <span className="text-amber-700 font-medium ml-1">
                                    — {adv.hy}
                                  </span>
                                ) : (
                                  <span className="text-slate-400 text-[10px]">···</span>
                                )}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="flex flex-wrap gap-1.5">
                            {cat.examples.map((ex, idx) => (
                              <span
                                key={idx}
                                onClick={(e) => speakSpanish(ex, `ex-${cat.id}-${idx}`, e)}
                                className="px-2 py-0.5 bg-slate-100 hover:bg-amber-100 hover:text-amber-900 text-slate-700 text-xs rounded-md transition-colors font-medium cursor-pointer"
                                title="Սեղմեք լսելու համար"
                              >
                                {ex}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Sample sentence if available */}
                      {cat.sampleSentence && (
                        <div className="mt-3 pt-2.5 border-t border-slate-100 text-xs">
                          <div className="text-slate-400 text-[11px] mb-1 font-medium">
                            Օրինակ նախադասություն:
                          </div>
                          <div className="p-2 bg-slate-50 rounded-lg border border-slate-100 space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-slate-800">
                                🇪🇸 {cat.sampleSentence.es}
                              </span>
                              <button
                                onClick={(e) =>
                                  speakSpanish(
                                    cat.sampleSentence!.es,
                                    `sample-${cat.id}`,
                                    e
                                  )
                                }
                                className="p-1 text-slate-400 hover:text-amber-600 transition-colors"
                              >
                                <Volume2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            {revealed && (
                              <div className="text-amber-800 font-medium pt-1 border-t border-slate-200/60">
                                🇦🇲 {cat.sampleSentence.hy}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: 19 PREGUNTAS Y RESPUESTAS */}
        {activeTab === 'qa' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Preguntas y respuestas / Հարցեր և պատասխաններ
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Բոլոր 19 հարցերն ու պատասխանները՝ քերականական սահմանումներից մինչև կոնկրետ բառերի որոշում
                </p>
              </div>
              <span className="text-xs font-mono text-slate-400 tabular-nums">
                {filteredQA.length} / 19 հարց
              </span>
            </div>

            <div className="space-y-3">
              {filteredQA.map((qa) => {
                const qaId = `qa-${qa.id}`;
                const revealed = isItemRevealed(qaId);

                return (
                  <div
                    key={qa.id}
                    onClick={() => toggleReveal(qaId)}
                    className={`group bg-white rounded-2xl border p-4 sm:p-5 transition-all duration-200 cursor-pointer shadow-xs hover:shadow-md ${
                      revealed
                        ? 'border-amber-400 bg-amber-50/20'
                        : 'border-slate-200 hover:border-amber-300'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <span className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 font-bold text-xs flex items-center justify-center shrink-0 border border-amber-200/80 mt-0.5">
                          #{qa.id}
                        </span>

                        <div className="space-y-2 flex-1">
                          {/* Spanish Question */}
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                                🇪🇸 Հարց
                              </span>
                              <button
                                onClick={(e) => speakSpanish(qa.qEs, `speak-qa-q-${qa.id}`, e)}
                                className="p-1 text-slate-400 hover:text-amber-600 transition-colors"
                                title="Լսել հարցը"
                              >
                                <Volume2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-1">
                              {qa.qEs}
                            </h3>
                          </div>

                          {/* Armenian Question (Revealed) */}
                          {revealed && (
                            <div className="p-2.5 bg-white/80 rounded-xl border border-amber-200 animate-fadeIn">
                              <span className="text-xs font-medium text-amber-800 block mb-0.5">
                                🇦🇲 Հայերեն հարց:
                              </span>
                              <p className="text-sm font-semibold text-slate-800">
                                {qa.qHy}
                              </p>
                            </div>
                          )}

                          {/* Spanish Answer */}
                          <div className="pt-2 border-t border-slate-100">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                                🇪🇸 Պատասխան
                              </span>
                              <button
                                onClick={(e) => speakSpanish(qa.aEs, `speak-qa-a-${qa.id}`, e)}
                                className="p-1 text-slate-400 hover:text-emerald-600 transition-colors"
                                title="Լսել պատասխանը"
                              >
                                <Volume2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <p className="text-sm sm:text-base text-slate-800 font-medium mt-1">
                              {qa.aEs}
                            </p>
                          </div>

                          {/* Armenian Answer (Revealed) */}
                          {revealed ? (
                            <div className="p-2.5 bg-emerald-50/70 rounded-xl border border-emerald-200 animate-fadeIn">
                              <span className="text-xs font-medium text-emerald-900 block mb-0.5">
                                🇦🇲 Հայերեն պատասխան:
                              </span>
                              <p className="text-sm font-semibold text-emerald-950">
                                {qa.aHy}
                              </p>
                            </div>
                          ) : (
                            <div className="text-xs text-amber-700 font-medium flex items-center gap-1.5 pt-1">
                              <span>👆 Սեղմեք՝ հայերեն թարգմանությունները տեսնելու համար</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <div
                          className={`p-1.5 rounded-lg border border-slate-200 text-slate-400 group-hover:text-amber-600 transition-all ${
                            revealed ? 'bg-amber-100 text-amber-700 border-amber-300' : 'bg-slate-50'
                          }`}
                        >
                          {revealed ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: TEXTO COMPLETO */}
        {activeTab === 'full-text' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Texto completo / Լիարժեք տեքստ
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Ամբողջական տեքստը՝ նախադասություն առ նախադասություն ինտերակտիվ թարգմանությամբ
                </p>
              </div>
              <span className="text-xs font-mono text-slate-400 tabular-nums">
                {filteredFullText.length} հատված
              </span>
            </div>

            <div className="space-y-3">
              {filteredFullText.map((block, index) => {
                const blockId = `block-${block.id}`;
                const revealed = isItemRevealed(blockId);

                return (
                  <div
                    key={block.id}
                    onClick={() => toggleReveal(blockId)}
                    className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 cursor-pointer shadow-xs hover:shadow-md ${
                      revealed
                        ? 'bg-amber-50/20 border-amber-300 ring-1 ring-amber-300/30'
                        : 'bg-white border-slate-200 hover:border-amber-300'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-bold text-slate-400 tabular-nums">
                            #{index + 1}
                          </span>
                          {block.keywordEs && (
                            <span className="text-xs bg-amber-100 text-amber-900 font-semibold px-2 py-0.5 rounded-md border border-amber-200">
                              {block.keywordEs}
                            </span>
                          )}
                          <span className="text-xs text-slate-400">🇪🇸 Español</span>
                        </div>

                        {/* Spanish text */}
                        <p className="text-base sm:text-lg text-slate-900 font-medium leading-relaxed">
                          {block.es}
                        </p>

                        {/* Armenian translation */}
                        {revealed ? (
                          <div className="mt-3 p-3 bg-amber-50/80 border border-amber-200 rounded-xl animate-fadeIn">
                            <span className="text-xs font-bold text-amber-900 block mb-1">
                              🇦🇲 Հայերեն թարգմանություն:
                            </span>
                            <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
                              {block.hy}
                            </p>
                          </div>
                        ) : (
                          <p className="text-xs text-amber-700 font-medium pt-1">
                            👆 Սեղմեք՝ հայերեն թարգմանությունը բացելու համար
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={(e) => speakSpanish(block.es, `speak-${block.id}`, e)}
                          className={`p-2 rounded-xl text-slate-400 hover:text-amber-600 hover:bg-amber-50 transition-colors cursor-pointer ${
                            speakingId === `speak-${block.id}` ? 'text-amber-600 animate-pulse' : ''
                          }`}
                          title="Լսել իսպաներեն"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>

                        <div className="p-1.5 text-slate-400">
                          {revealed ? (
                            <EyeOff className="w-4 h-4 text-amber-600" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 4: TEXTO CORTO */}
        {activeTab === 'short-text' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Texto corto / Կարճ տեքստ
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Քերականական խոսքի մասերի համառոտ ամփոփագիրը
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {SHORT_TEXT_PARAGRAPHS.map((st, idx) => {
                const stId = `short-${st.id}`;
                const revealed = isItemRevealed(stId);

                return (
                  <div
                    key={st.id}
                    onClick={() => toggleReveal(stId)}
                    className={`p-5 rounded-2xl border transition-all duration-200 cursor-pointer shadow-xs hover:shadow-md ${
                      revealed
                        ? 'bg-amber-50/20 border-amber-300'
                        : 'bg-white border-slate-200 hover:border-amber-300'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-3 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 text-xs font-bold flex items-center justify-center border border-amber-200">
                            {idx + 1}
                          </span>
                          <span className="text-xs font-semibold text-slate-400">
                            🇪🇸 Español
                          </span>
                        </div>

                        <p className="text-base sm:text-lg text-slate-900 font-medium leading-relaxed">
                          {st.es}
                        </p>

                        {revealed ? (
                          <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-xl animate-fadeIn">
                            <span className="text-xs font-bold text-amber-900 block mb-1">
                              🇦🇲 Հայերեն:
                            </span>
                            <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
                              {st.hy}
                            </p>
                          </div>
                        ) : (
                          <span className="text-xs text-amber-700 font-medium block">
                            👆 Սեղմեք՝ հայերենը բացելու համար
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={(e) => speakSpanish(st.es, `speak-st-${st.id}`, e)}
                          className="p-2 rounded-xl text-slate-400 hover:text-amber-600 hover:bg-amber-50 transition-colors"
                          title="Լսել իսպաներեն"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 5: FLASHCARDS & QUIZ */}
        {activeTab === 'quiz' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
                  <span>Վարժանք & Քարտեր</span>
                  <span className="text-xs bg-yellow-100 text-yellow-800 font-semibold px-2 py-0.5 rounded-full border border-yellow-200">
                    Flashcards
                  </span>
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Ստուգեք Ձեր գիտելիքները 19 հարցերի և քերականական կատեգորիաների շուրջ
                </p>
              </div>

              {/* Progress and score */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 bg-emerald-50 text-emerald-800 rounded-lg border border-emerald-200">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Գիտեմ: {quizScore.known}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 bg-amber-50 text-amber-800 rounded-lg border border-amber-200">
                  <RotateCcw className="w-3.5 h-3.5 text-amber-600" />
                  <span>Կրկնել: {quizScore.review}</span>
                </div>
                <button
                  onClick={resetQuiz}
                  className="p-1.5 text-xs text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                  title="Վերսկսել թեստը"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quiz Progress Bar */}
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-amber-500 h-full transition-all duration-300"
                style={{
                  width: `${((quizIndex + 1) / QUESTIONS_AND_ANSWERS.length) * 100}%`,
                }}
              />
            </div>

            {/* Main Interactive Flashcard */}
            {currentQuiz && (
              <div className="max-w-2xl mx-auto">
                <div
                  onClick={() => setQuizRevealed(!quizRevealed)}
                  className={`bg-white rounded-3xl border p-6 sm:p-8 min-h-[320px] flex flex-col justify-between cursor-pointer transition-all duration-300 shadow-sm hover:shadow-lg ${
                    quizRevealed
                      ? 'border-amber-400 ring-2 ring-amber-400/20'
                      : 'border-slate-200 hover:border-amber-300'
                  }`}
                >
                  {/* Top Bar of Card */}
                  <div className="flex items-center justify-between text-xs text-slate-400 pb-4 border-b border-slate-100">
                    <span className="font-semibold text-amber-600">
                      Քարտ {quizIndex + 1} / {QUESTIONS_AND_ANSWERS.length}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => speakSpanish(currentQuiz.qEs, 'quiz-q-speak', e)}
                        className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors cursor-pointer"
                        title="Լսել հարցը"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                      <span className="text-[11px] bg-slate-100 px-2 py-0.5 rounded text-slate-600 font-medium">
                        {currentQuiz.categoryTag || 'Քերականություն'}
                      </span>
                    </div>
                  </div>

                  {/* Question & Answer Area */}
                  <div className="py-6 text-center space-y-4">
                    <div className="space-y-2">
                      <span className="text-xs uppercase tracking-wider text-slate-400 font-bold">
                        🇪🇸 Իսպաներեն Հարց
                      </span>
                      <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                        {currentQuiz.qEs}
                      </h2>
                    </div>

                    {/* Revealed Answer Content */}
                    {quizRevealed ? (
                      <div className="pt-4 border-t border-slate-100 space-y-4 animate-fadeIn">
                        <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-left">
                          <span className="text-xs font-semibold text-amber-800 block mb-0.5">
                            🇦🇲 Հարցի հայերեն իմաստը:
                          </span>
                          <p className="text-sm font-medium text-slate-900">
                            {currentQuiz.qHy}
                          </p>
                        </div>

                        <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-left space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-emerald-800">
                              🇪🇸 Ճիշտ պատասխան:
                            </span>
                            <button
                              onClick={(e) => speakSpanish(currentQuiz.aEs, 'quiz-a-speak', e)}
                              className="p-1 text-emerald-600 hover:bg-emerald-100 rounded"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <p className="text-base sm:text-lg font-bold text-emerald-950">
                            {currentQuiz.aEs}
                          </p>
                          <div className="pt-2 border-t border-emerald-200/60 text-xs sm:text-sm font-semibold text-emerald-900">
                            🇦🇲 {currentQuiz.aHy}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="py-6">
                        <span className="inline-flex items-center gap-2 text-xs font-semibold text-amber-700 bg-amber-50 px-4 py-2 rounded-xl border border-amber-200">
                          👆 Սեղմեք քարտի վրա՝ պատասխանը բացելու համար
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (quizIndex > 0) {
                          setQuizIndex(quizIndex - 1);
                          setQuizRevealed(false);
                        }
                      }}
                      disabled={quizIndex === 0}
                      className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
                    >
                      ← Նախորդը
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNextQuiz(false);
                        }}
                        className="px-3.5 py-1.5 text-xs font-semibold bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-xl border border-rose-200 transition-colors cursor-pointer"
                      >
                        Կրկնել
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNextQuiz(true);
                        }}
                        className="px-4 py-1.5 text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-700 rounded-xl shadow-xs transition-colors cursor-pointer"
                      >
                        Գիտեի ✓
                      </button>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (quizIndex < QUESTIONS_AND_ANSWERS.length - 1) {
                          setQuizIndex(quizIndex + 1);
                          setQuizRevealed(false);
                        }
                      }}
                      disabled={quizIndex === QUESTIONS_AND_ANSWERS.length - 1}
                      className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
                    >
                      Հաջորդը →
                    </button>
                  </div>
                </div>

                {/* Question index quick jump dots */}
                <div className="flex flex-wrap items-center justify-center gap-1.5 mt-4">
                  {QUESTIONS_AND_ANSWERS.map((q, idx) => {
                    const isDone = completedQuizIds[q.id];
                    const isCurrent = idx === quizIndex;

                    return (
                      <button
                        key={q.id}
                        onClick={() => {
                          setQuizIndex(idx);
                          setQuizRevealed(false);
                        }}
                        className={`w-7 h-7 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                          isCurrent
                            ? 'bg-amber-600 text-white shadow-xs scale-110'
                            : isDone
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                            : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-4 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <div>
            <span>4. Categorías Gramaticales · Քերականական Խոսքի Մասերը</span>
          </div>
          <div className="flex items-center gap-4">
            <span>🇪🇸 Español — 🇦🇲 Հայերեն</span>
            <span>·</span>
            <span>Սեղմեք իսպաներեն տեքստին՝ թարգմանությունը բացելու համար</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
