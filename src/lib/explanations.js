export const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिंदी (Hindi)" },
  { code: "mr", label: "मराठी (Marathi)" },
  { code: "es", label: "Español (Spanish)" },
];

// NOTE: have a qualified medical translator review these before real use.
export const EXPLANATIONS = {
  notumor: {
    en: "The AI analysis did not find signs of a brain tumor in this image. This is not a diagnosis and a doctor must review it. Please consult your physician if symptoms continue.",
    hi: "इस छवि में एआई विश्लेषण को मस्तिष्क ट्यूमर के कोई संकेत नहीं मिले। यह निदान नहीं है और डॉक्टर द्वारा इसकी समीक्षा आवश्यक है। लक्षण बने रहने पर कृपया अपने डॉक्टर से सलाह लें।",
    mr: "या प्रतिमेत एआय विश्लेषणाला मेंदूतील गाठीची (ट्यूमर) कोणतीही लक्षणे आढळली नाहीत. हे निदान नाही आणि डॉक्टरांनी त्याचे पुनरावलोकन करणे आवश्यक आहे. लक्षणे कायम राहिल्यास कृपया आपल्या डॉक्टरांचा सल्ला घ्या.",
    es: "El análisis de IA no encontró signos de tumor cerebral en esta imagen. Esto no es un diagnóstico y debe ser revisado por un médico. Consulte a su médico si los síntomas continúan.",
  },
  glioma: {
    en: "The AI analysis suggests a possible glioma (a growth of brain tissue) in this image. This is not a diagnosis. Please follow up promptly with a neurologist or neurosurgeon to confirm the findings and discuss next steps.",
    hi: "एआई विश्लेषण इस छवि में संभावित ग्लिओमा (मस्तिष्क ऊतक की वृद्धि) का संकेत देता है। यह निदान नहीं है। निष्कर्षों की पुष्टि और आगे के कदमों पर चर्चा के लिए कृपया जल्द ही न्यूरोलॉजिस्ट या न्यूरोसर्जन से मिलें।",
    mr: "एआय विश्लेषण या प्रतिमेत संभाव्य ग्लिओमा (मेंदूच्या ऊतींची वाढ) सुचवते. हे निदान नाही. निष्कर्षांची पुष्टी करण्यासाठी आणि पुढील उपचारांवर चर्चा करण्यासाठी कृपया लवकरात लवकर न्यूरोलॉजिस्ट किंवा न्यूरोसर्जनचा सल्ला घ्या.",
    es: "El análisis de IA sugiere un posible glioma (un crecimiento de tejido cerebral) en esta imagen. Esto no es un diagnóstico. Consulte pronto con un neurólogo o neurocirujano para confirmar los hallazgos y hablar de los siguientes pasos.",
  },
  meningioma: {
    en: "The AI analysis suggests a possible meningioma (a growth in the membranes covering the brain). Many are benign and slow-growing, but this is not a diagnosis. Your doctor will confirm the findings and advise on next steps.",
    hi: "एआई विश्लेषण संभावित मेनिन्जियोमा (मस्तिष्क को ढकने वाली झिल्लियों में वृद्धि) का संकेत देता है। इनमें से कई सौम्य और धीरे बढ़ने वाले होते हैं, लेकिन यह निदान नहीं है। आपके डॉक्टर निष्कर्षों की पुष्टि करेंगे और आगे की सलाह देंगे।",
    mr: "एआय विश्लेषण संभाव्य मेनिन्जिओमा (मेंदूला झाकणाऱ्या आवरणातील वाढ) सुचवते. यातील अनेक गाठी निरुपद्रवी आणि संथ गतीने वाढणाऱ्या असतात, परंतु हे निदान नाही. तुमचे डॉक्टर निष्कर्षांची पुष्टी करतील आणि पुढील सल्ला देतील.",
    es: "El análisis de IA sugiere un posible meningioma (un crecimiento en las membranas que cubren el cerebro). Muchos son benignos y de crecimiento lento, pero esto no es un diagnóstico. Su médico confirmará los hallazgos y le indicará los siguientes pasos.",
  },
  pituitary: {
    en: "The AI analysis suggests a possible pituitary gland finding. This is not a diagnosis. Your doctor, with endocrinology and neurosurgery specialists if needed, will confirm the findings and discuss hormone checks and treatment options.",
    hi: "एआई विश्लेषण पिट्यूटरी ग्रंथि में संभावित निष्कर्ष का संकेत देता है। यह निदान नहीं है। आपके डॉक्टर, आवश्यकता होने पर एंडोक्राइनोलॉजी और न्यूरोसर्जरी विशेषज्ञों के साथ, निष्कर्षों की पुष्टि करेंगे और हार्मोन जांच व उपचार विकल्पों पर चर्चा करेंगे।",
    mr: "एआय विश्लेषण पिट्यूटरी ग्रंथीमध्ये संभाव्य निष्कर्ष सुचवते. हे निदान नाही. तुमचे डॉक्टर, गरज पडल्यास एंडोक्रायनोलॉजी आणि न्यूरोसर्जरी तज्ज्ञांसह, निष्कर्षांची पुष्टी करतील आणि संप्रेरक तपासणी व उपचारांच्या पर्यायांवर चर्चा करतील.",
    es: "El análisis de IA sugiere un posible hallazgo en la glándula pituitaria. Esto no es un diagnóstico. Su médico, con especialistas en endocrinología y neurocirugía si es necesario, confirmará los hallazgos y hablará de los controles hormonales y las opciones de tratamiento.",
  },
};