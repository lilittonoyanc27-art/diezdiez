export interface TextBlock {
  id: string;
  es: string;
  hy: string;
  category?: string;
  keywordEs?: string;
  keywordHy?: string;
}

export interface GrammaticalCategory {
  id: number;
  esTitle: string;
  hyTitle: string;
  esDef: string;
  hyDef: string;
  examples: string[];
  sampleSentence?: {
    es: string;
    hy: string;
  };
  adverbExamples?: {
    es: string;
    hy: string;
  }[];
}

export interface QuestionAnswer {
  id: number;
  qEs: string;
  qHy: string;
  aEs: string;
  aHy: string;
  categoryTag?: string;
}

export const FULL_TEXT_PARAGRAPHS: TextBlock[] = [
  {
    id: "p1",
    es: "Las categorías gramaticales son los diferentes tipos de palabras que existen en una lengua.",
    hy: "Քերականական խոսքի մասերը լեզվում գոյություն ունեցող բառերի տարբեր տեսակներն են։",
  },
  {
    id: "p2",
    es: "Cada palabra pertenece a una categoría según su función y sus características.",
    hy: "Յուրաքանչյուր բառ պատկանում է որևէ քերականական կատեգորիայի՝ ըստ իր գործառույթի և առանձնահատկությունների։",
  },
  {
    id: "p3",
    es: "Las principales categorías gramaticales son: sustantivo, adjetivo, determinante, pronombre, verbo, adverbio, preposición, conjunción e interjección.",
    hy: "Հիմնական խոսքի մասերն են՝ գոյական, ածական, որոշիչ, դերանուն, բայ, մակբայ, նախդիր, շաղկապ և ձայնարկություն։",
  },
  {
    id: "p4",
    es: "El sustantivo sirve para nombrar personas, animales, lugares, objetos o ideas. Por ejemplo: niño, perro, Madrid, mesa, alegría.",
    hy: "Գոյականը անվանում է մարդկանց, կենդանիների, վայրերի, առարկաների կամ գաղափարների։ Օրինակ՝ niño, perro, Madrid, mesa, alegría։",
    keywordEs: "sustantivo",
    keywordHy: "Գոյական",
  },
  {
    id: "p5",
    es: "El adjetivo expresa una cualidad o característica del sustantivo. Por ejemplo: casa grande, perro pequeño.",
    hy: "Ածականը ցույց է տալիս գոյականի հատկանիշը կամ որակը։ Օրինակ՝ casa grande, perro pequeño։",
    keywordEs: "adjetivo",
    keywordHy: "Ածական",
  },
  {
    id: "p6",
    es: "El determinante acompaña al sustantivo y aporta información sobre él. Por ejemplo: el libro, mi casa, dos amigos.",
    hy: "Որոշիչը ուղեկցում է գոյականին և դրա մասին լրացուցիչ տեղեկություն է տալիս։ Օրինակ՝ el libro, mi casa, dos amigos։",
    keywordEs: "determinante",
    keywordHy: "Որոշիչ",
  },
  {
    id: "p7",
    es: "El pronombre sustituye al sustantivo. Por ejemplo: yo, tú, él, ella, nosotros.",
    hy: "Դերանունը փոխարինում է գոյականին։ Օրինակ՝ yo, tú, él, ella, nosotros։",
    keywordEs: "pronombre",
    keywordHy: "Դերանուն",
  },
  {
    id: "p8",
    es: "El verbo expresa una acción, un estado o un proceso. Por ejemplo: correr, estudiar, ser, estar.",
    hy: "Բայը արտահայտում է գործողություն, վիճակ կամ գործընթաց։ Օրինակ՝ correr, estudiar, ser, estar։",
    keywordEs: "verbo",
    keywordHy: "Բայ",
  },
  {
    id: "p9",
    es: "El adverbio modifica a un verbo, a un adjetivo o a otro adverbio. Puede indicar lugar, tiempo, modo, cantidad, afirmación, negación o duda. Por ejemplo: aquí, ayer, bien, mucho, sí, no, quizá.",
    hy: "Մակբայը լրացնում կամ փոփոխում է բայի, ածականի կամ մեկ այլ մակբայի իմաստը։ Այն կարող է ցույց տալ տեղ, ժամանակ, ձև, քանակ, հաստատում, ժխտում կամ կասկած։ Օրինակ՝ aquí, ayer, bien, mucho, sí, no, quizá։",
    keywordEs: "adverbio",
    keywordHy: "Մակբայ",
  },
  {
    id: "p10",
    es: "La preposición relaciona palabras dentro de una oración. Algunas preposiciones son: a, de, en, con, por, para, sin, sobre.",
    hy: "Նախդիրը կապում է բառերը նախադասության մեջ։ Օրինակ՝ a, de, en, con, por, para, sin, sobre։",
    keywordEs: "preposición",
    keywordHy: "Նախդիր",
  },
  {
    id: "p11",
    es: "La conjunción une palabras u oraciones. Por ejemplo: y, o, pero, porque, aunque.",
    hy: "Շաղկապը միացնում է բառեր կամ նախադասություններ։ Օրինակ՝ y, o, pero, porque, aunque։",
    keywordEs: "conjunción",
    keywordHy: "Շաղկապ",
  },
  {
    id: "p12",
    es: "La interjección expresa emociones, reacciones o llamadas. Por ejemplo: ¡Ay!, ¡Hola!, ¡Bravo!",
    hy: "Ձայնարկությունը արտահայտում է զգացմունք, արձագանք կամ կանչ։ Օրինակ՝ ¡Ay!, ¡Hola!, ¡Bravo!։",
    keywordEs: "interjección",
    keywordHy: "Ձայնարկություն",
  },
  {
    id: "p13",
    es: "En resumen, las categorías gramaticales nos ayudan a saber qué tipo de palabra es cada una y qué función cumple en una oración.",
    hy: "Ամփոփելով՝ խոսքի մասերը օգնում են հասկանալ, թե յուրաքանչյուր բառ ինչ տեսակ է և ինչ գործառույթ ունի նախադասության մեջ։",
  },
];

export const CATEGORIES: GrammaticalCategory[] = [
  {
    id: 1,
    esTitle: "Sustantivo",
    hyTitle: "Գոյական",
    esDef: "Nombra personas, animales, lugares, objetos o ideas.",
    hyDef: "Անվանում է մարդկանց, կենդանիների, վայրերի, առարկաների կամ գաղափարների։",
    examples: ["niño", "gato", "colegio", "mesa", "amor"],
  },
  {
    id: 2,
    esTitle: "Adjetivo",
    hyTitle: "Ածական",
    esDef: "Expresa una cualidad del sustantivo.",
    hyDef: "Ցույց է տալիս գոյականի հատկանիշը։",
    examples: ["alto", "pequeño", "bonito", "rápido"],
    sampleSentence: {
      es: "un niño alto",
      hy: "բարձրահասակ տղա",
    },
  },
  {
    id: 3,
    esTitle: "Determinante",
    hyTitle: "Որոշիչ",
    esDef: "Acompaña al sustantivo.",
    hyDef: "Ուղեկցում է գոյականին։",
    examples: ["el", "la", "un", "una", "mi", "tu", "este", "dos"],
    sampleSentence: {
      es: "mi libro",
      hy: "իմ գիրքը",
    },
  },
  {
    id: 4,
    esTitle: "Pronombre",
    hyTitle: "Դերանուն",
    esDef: "Sustituye a un sustantivo.",
    hyDef: "Փոխարինում է գոյականին։",
    examples: ["yo", "tú", "él", "ella", "nosotros", "ellos"],
    sampleSentence: {
      es: "María estudia. Ella estudia.",
      hy: "Մարիան սովորում է։ Նա սովորում է։",
    },
  },
  {
    id: 5,
    esTitle: "Verbo",
    hyTitle: "Բայ",
    esDef: "Expresa acciones, estados o procesos.",
    hyDef: "Արտահայտում է գործողություն, վիճակ կամ գործընթաց։",
    examples: ["correr", "comer", "estudiar", "vivir", "ser", "estar"],
    sampleSentence: {
      es: "Pedro corre.",
      hy: "Պեդրոն վազում է։",
    },
  },
  {
    id: 6,
    esTitle: "Adverbio",
    hyTitle: "Մակբայ",
    esDef: "Puede indicar lugar, tiempo, modo o cantidad.",
    hyDef: "Կարող է ցույց տալ տեղ, ժամանակ, ձև կամ քանակ։",
    examples: ["aquí", "hoy", "bien", "mucho", "nunca", "quizá"],
    adverbExamples: [
      { es: "aquí", hy: "այստեղ" },
      { es: "hoy", hy: "այսօր" },
      { es: "bien", hy: "լավ" },
      { es: "mucho", hy: "շատ" },
      { es: "nunca", hy: "երբեք" },
      { es: "quizá", hy: "գուցե" },
    ],
  },
  {
    id: 7,
    esTitle: "Preposición",
    hyTitle: "Նախդիր",
    esDef: "Une y relaciona palabras.",
    hyDef: "Կապում և հարաբերության մեջ է դնում բառերը։",
    examples: ["a", "de", "en", "con", "por", "para", "sin", "sobre"],
    sampleSentence: {
      es: "Vivo en Madrid.",
      hy: "Ես ապրում եմ Մադրիդում։",
    },
  },
  {
    id: 8,
    esTitle: "Conjunción",
    hyTitle: "Շաղկապ",
    esDef: "Une palabras u oraciones.",
    hyDef: "Միացնում է բառեր կամ նախադասություններ։",
    examples: ["y", "o", "pero", "porque", "aunque"],
  },
  {
    id: 9,
    esTitle: "Interjección",
    hyTitle: "Ձայնարկություն",
    esDef: "Expresa emociones o reacciones.",
    hyDef: "Արտահայտում է զգացմունք կամ արձագանք։",
    examples: ["¡Ay!", "¡Oh!", "¡Hola!", "¡Bravo!"],
  },
];

export const QUESTIONS_AND_ANSWERS: QuestionAnswer[] = [
  {
    id: 1,
    qEs: "¿Qué son las categorías gramaticales?",
    qHy: "Ի՞նչ են քերականական խոսքի մասերը։",
    aEs: "Son los diferentes tipos de palabras que existen en una lengua.",
    aHy: "Դրանք լեզվում գոյություն ունեցող բառերի տարբեր տեսակներն են։",
    categoryTag: "Concepto",
  },
  {
    id: 2,
    qEs: "¿Cuáles son las principales categorías gramaticales?",
    qHy: "Որո՞նք են հիմնական խոսքի մասերը։",
    aEs: "Sustantivo, adjetivo, determinante, pronombre, verbo, adverbio, preposición, conjunción e interjección.",
    aHy: "Գոյական, ածական, որոշիչ, դերանուն, բայ, մակբայ, նախդիր, շաղկապ և ձայնարկություն։",
    categoryTag: "Lista",
  },
  {
    id: 3,
    qEs: "¿Qué es un sustantivo?",
    qHy: "Ի՞նչ է գոյականը։",
    aEs: "Es una palabra que nombra personas, animales, lugares, objetos o ideas.",
    aHy: "Դա բառ է, որը անվանում է մարդկանց, կենդանիների, վայրերի, առարկաների կամ գաղափարների։",
    categoryTag: "Sustantivo",
  },
  {
    id: 4,
    qEs: "¿Qué es un adjetivo?",
    qHy: "Ի՞նչ է ածականը։",
    aEs: "Es una palabra que expresa una cualidad del sustantivo.",
    aHy: "Դա բառ է, որը ցույց է տալիս գոյականի հատկանիշը։",
    categoryTag: "Adjetivo",
  },
  {
    id: 5,
    qEs: "¿Qué es un determinante?",
    qHy: "Ի՞նչ է որոշիչը։",
    aEs: "Es una palabra que acompaña al sustantivo.",
    aHy: "Դա բառ է, որը ուղեկցում է գոյականին։",
    categoryTag: "Determinante",
  },
  {
    id: 6,
    qEs: "¿Qué es un pronombre?",
    qHy: "Ի՞նչ է դերանունը։",
    aEs: "Es una palabra que sustituye al sustantivo.",
    aHy: "Դա բառ է, որը փոխարինում է գոյականին։",
    categoryTag: "Pronombre",
  },
  {
    id: 7,
    qEs: "¿Qué es un verbo?",
    qHy: "Ի՞նչ է բայը։",
    aEs: "Es una palabra que expresa una acción, estado o proceso.",
    aHy: "Դա բառ է, որը արտահայտում է գործողություն, վիճակ կամ գործընթաց։",
    categoryTag: "Verbo",
  },
  {
    id: 8,
    qEs: "¿Qué es un adverbio?",
    qHy: "Ի՞նչ է մակբայը։",
    aEs: "Es una palabra que puede indicar lugar, tiempo, modo o cantidad.",
    aHy: "Դա բառ է, որը կարող է ցույց տալ տեղ, ժամանակ, ձև կամ քանակ։",
    categoryTag: "Adverbio",
  },
  {
    id: 9,
    qEs: "¿Qué es una preposición?",
    qHy: "Ի՞նչ է նախդիրը։",
    aEs: "Es una palabra que relaciona otras palabras.",
    aHy: "Դա բառ է, որը կապում է այլ բառեր։",
    categoryTag: "Preposición",
  },
  {
    id: 10,
    qEs: "¿Qué es una conjunción?",
    qHy: "Ի՞նչ է շաղկապը։",
    aEs: "Es una palabra que une palabras u oraciones.",
    aHy: "Դա բառ է, որը միացնում է բառեր կամ նախադասություններ։",
    categoryTag: "Conjunción",
  },
  {
    id: 11,
    qEs: "¿Qué es una interjección?",
    qHy: "Ի՞նչ է ձայնարկությունը։",
    aEs: "Es una palabra que expresa una emoción o reacción.",
    aHy: "Դա բառ է, որը արտահայտում է զգացմունք կամ արձագանք։",
    categoryTag: "Interjección",
  },
  {
    id: 12,
    qEs: "¿Qué categoría es “casa”?",
    qHy: "«Casa» բառը ո՞ր խոսքի մասն է։",
    aEs: "Sustantivo.",
    aHy: "Գոյական։",
    categoryTag: "Ejemplo",
  },
  {
    id: 13,
    qEs: "¿Qué categoría es “bonito”?",
    qHy: "«Bonito» բառը ո՞ր խոսքի մասն է։",
    aEs: "Adjetivo.",
    aHy: "Ածական։",
    categoryTag: "Ejemplo",
  },
  {
    id: 14,
    qEs: "¿Qué categoría es “ellos”?",
    qHy: "«Ellos» բառը ո՞ր խոսքի մասն է։",
    aEs: "Pronombre.",
    aHy: "Դերանուն։",
    categoryTag: "Ejemplo",
  },
  {
    id: 15,
    qEs: "¿Qué categoría es “estudiar”?",
    qHy: "«Estudiar» բառը ո՞ր խոսքի մասն է։",
    aEs: "Verbo.",
    aHy: "Բայ։",
    categoryTag: "Ejemplo",
  },
  {
    id: 16,
    qEs: "¿Qué categoría es “ayer”?",
    qHy: "«Ayer» բառը ո՞ր խոսքի մասն է։",
    aEs: "Adverbio de tiempo.",
    aHy: "Ժամանակի մակբայ։",
    categoryTag: "Ejemplo",
  },
  {
    id: 17,
    qEs: "¿Qué categoría es “con”?",
    qHy: "«Con» բառը ո՞ր խոսքի մասն է։",
    aEs: "Preposición.",
    aHy: "Նախդիր։",
    categoryTag: "Ejemplo",
  },
  {
    id: 18,
    qEs: "¿Qué categoría es “pero”?",
    qHy: "«Pero» բառը ո՞ր խոսքի մասն է։",
    aEs: "Conjunción.",
    aHy: "Շաղկապ։",
    categoryTag: "Ejemplo",
  },
  {
    id: 19,
    qEs: "¿Qué categoría es “¡Ay!”?",
    qHy: "«¡Ay!» բառը ո՞ր խոսքի մասն է։",
    aEs: "Interjección.",
    aHy: "Ձայնարկություն։",
    categoryTag: "Ejemplo",
  },
];

export const SHORT_TEXT_PARAGRAPHS: TextBlock[] = [
  {
    id: "st1",
    es: "Las categorías gramaticales son los diferentes tipos de palabras.",
    hy: "Քերականական խոսքի մասերը բառերի տարբեր տեսակներն են։",
  },
  {
    id: "st2",
    es: "Las principales son: sustantivo, adjetivo, determinante, pronombre, verbo, adverbio, preposición, conjunción e interjección.",
    hy: "Հիմնականներն են՝ գոյական, ածական, որոշիչ, դերանուն, բայ, մակբայ, նախդիր, շաղկապ և ձայնարկություն։",
  },
  {
    id: "st3",
    es: "El sustantivo nombra personas, animales, lugares o cosas; el adjetivo expresa cualidades; el verbo expresa acciones; y las demás categorías ayudan a relacionar, sustituir o completar las palabras en una oración.",
    hy: "Գոյականը անվանում է մարդ, կենդանի, վայր կամ առարկա, ածականը ցույց է տալիս հատկանիշ, բայը՝ գործողություն, իսկ մյուս խոսքի մասերը օգնում են բառերը կապել, փոխարինել կամ լրացնել նախադասության մեջ։",
  },
];
