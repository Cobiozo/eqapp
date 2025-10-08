const globalConfig = {
  mails: {
    footer: `
    <p></p>
    <p>Su atsidavimu,</p>

    <p>EQApp komanda</p>
    `,
  }
}

export default {
  setup: {
    title: "Sveiki atvykę į EQApp!",
    chooseLanguage: "Pasirinkite kalbą",
    thisSeetingCanBeLaterChanged: "Šiuos parametrus vėliau galima keisti.",
    signUpForNewsletter: "Užsisakykite naujienlaiškį",
    skip: "Praleisti",
    subscribe: "Prenumeruoti",
    langNotSupported: "Pasirinktas kalbos nepalaikomas.",
  },
  whatAmIDoingHere: {
    title: "Malonu pažinti :)",
    content: "Atrodo, kad atvykote be jokio rekomendacijos. Pasakykite mums, kas jums apie mus papasakojo? Kaip čia patekote? :)",
    skip: "Pereiti į programėlę",
    fields: {
      content: "Turinys",
      name: "Vardas",
      email: "El. paštas",
      phone: "Telefonas",
    },
    messageSent: "Pranešimas išsiųstas!",
    messageSentDescription: "Ačiū, kad pasidalinote informacija! Dabar galite pereiti į programėlę :)",
    goToApp: "Pereiti į programėlę",
    error: "Aizpildiet nepieciešamos laukus",
    errorDescription: "Lūdzu, aizpildiet nepieciešamos laukus, lai turpinātu.",
  },
  joinUs: {
    title: "Susisiekite su mumis",
    fields: {
    name: "Vardas ir pavardė",
    email: "El. paštas",
    phone: "Telefono numeris",
    content: "Žinutė",
    },
    error: "Užpildykite visus privalomus laukus",
    errorDescription: "Visi laukai turi būti užpildyti.",
    messageSent: "Žinutė išsiųsta!",
    messageSentDescription: "Dėkojame, kad pasisiekėte! Mes tikrai su Jumis susisieksime :)",
  },
  clients: {
    links: {
      home: "Pagrindinis",
      services: "Paslaugos",
      webinars: "Seminarai",
      products: "Produktai",
      contact: "Kontaktai",
      articles: "Straipsniai",
      shop: "Parduotuvė",
      aboutUs: "Apie mus",
      cookies: "Slapukai",
      partnerZone: "Partnerių zona",
    },
    splash: {
      healthProtect: "Mes pasirūpinsime jūsų sveikata!",
      goToShop: "Susipažinkite su mūsų produktais",
    },
    products: {
      title: "Mūsų produktai",
      ourProducts: "Mūsų produktai",
      fromProducer: "Iš gamintojo",
      deliveryInTwoDays: "Pristatymas per dvi dienas",
      buyNow: "Pirkti dabar",
      theChoiceIsYours: "Pasirinkimas priklauso nuo jūsų!",
      shop: "PIRKTI!",
    },
    contact: {
      title: "Susisiekite su mumis",
      sendUsEmail: "Siųskite mums el. laišką",
    },
    whatAmIDoingHere: {
      title: "Malonu pažinti!",
      content: "Atrodo, kad atvykote be jokio rekomendacijos. Pasakykite mums, kas jums apie mus papasakojo? Kaip čia patekote? :)",
    },
    posts: {
      readMore: "Skaityti daugiau!",
      readMe: "Skaityti",
      title: "Straipsniai",
      description: `Duomenų bazė su straipsniais vis dar atnaujinama.

      Netrukus bus naujų straipsnių ir vaizdo įrašų su ekspertais.`,
    },
    faqs: {
      title: "Dažnai užduodami klausimai",
    },
    whyUs: {
      slogan: "Aukščiausi pasaulyje kokybės standartai - MŪSŲ SVARBIAUSIAI!",
      certificates: "Sertifikatai",
      products: "Produktai",
      faq: "Dažnai užduodami klausimai",
    },
    why: {
      title: "Kodėl Eqology?",
      learnMore: "Laukiame!",
      slogan: "Certifikatai/Tyrimai/Straipsniai"
    },
    certificates: {
      title: "Pasitikėkite ekspertais",
      description: "Mūsų produktai buvo kelis kartus patikrinti, išbandyti ir apdovanoti. Mūsų kokybė nekelia abejonių.",
      slogan: "Pasirinkite išmintingai - <strong>pasirinkite Eqology</strong>.",
      seeMore: "Žiūrėti daugiau",
    },
    meetOurProducts: {
      title: "Susipažinkite su mūsų produktais",
      goToShop: "Eiti į parduotuvę",
    },
    webinars: {
      createFromCM: "Sukurti iš CM",
      businessWebinars: "Verslo seminarai",
      clientWebinars: "Klientų seminarai",
      register: "Registruotis",
      noData: "Nerasta jokių seminarų... Netrukus sugrįžkite!",
      subscribe: "Prenumeruoti",
      success: {
        title: "Sėkmė!",
        description: "Sėkmė! Dabar jums tereikia patikrinti savo el. paštą, patvirtinti savo el. pašto adresą ir... mes laukiame jūsų seminare! :)",
      },
      youHaveToVerify: {
        title: "Jums reikia patvirtinti savo el. paštą",
        description: "Prieš registruodamiesi į seminarą, turite patvirtinti savo el. paštą. Patikrinkite savo el. pašto dėžutę ir patvirtinkite savo el. pašto adresą.",
      },
      invitationExpired:{
        title: "Oops...",
        description: "Pakvietimas baigėsi arba seminaras buvo atšauktas.",
      },
    }
  },
  common: {
    share: "Dalintis",
    goTop: "Eiti į viršų",
    languages: {
      intl: "Visos kalbos",
      pl: "Lenkų",
      en: "Anglų",
      uk: "Ukrainiečių",
      lt: "Lietuvių",
      de: "Vokiečių",
    },
    weekDays: {
      1: "Pirmadienis",
      2: "Antradienis",
      3: "Trečiadienis",
      4: "Ketvirtadienis",
      5: "Penktadienis",
      6: "Šeštadienis",
      7: "Sekmadienis",
    },
    weekDaysShort: {
      1: "P",
      2: "A",
      3: "T",
      4: "K",
      5: "P",
      6: "Š",
      7: "S",
    },
    months: {
      1: "Sausis",
      2: "Vasaris",
      3: "Kovas",
      4: "Balandis",
      5: "Gegužė",
      6: "Birželis",
      7: "Liepa",
      8: "Rugpjūtis",
      9: "Rugsėjis",
      10: "Spalis",
      11: "Lapkritis",
      12: "Gruodis",
    },
    submit: "Siųsti",
    save: "Išsaugoti",
    goBack: "Grįžti atgal",
    file: "Failas",
    language: "Kalba",
    none: "Nėra",
    return: "Grįžti",
    error: "Klaida",
    changeSpeed: "Pakeisti greitį",
    goBackToHome: "Grįžti į pagrindinį",
    noData: "Nėra duomenų",
    noDataDesc: "Nėra duomenų rodyti",
    noDataFound: "Nerasta rezultatų",
    noDataFoundDesc: "Nerasta rezultatų, atitinkančių jūsų užklausą.",
    notFound: "Nerasta",
    unexpectedError: "Netikėta klaida",
    unexpectedErrorDescription: "Įvyko netikėta klaida. Prašome pabandyti vėliau.",
    unauthorized: "Neturite teisių",
    unauthorizedDescription: "Neturite teisių peržiūrėti šią puslapį.",
    somethingWentWrong: "Kažkas nutiko blogai",
    somethingWentWrongDescription: "Įvyko netikėta klaida. Prašome pabandyti vėliau.",
    noInternet: "Nėra interneto ryšio",
    noInternetDescription: "Prašome patikrinti savo interneto ryšį ir bandyti dar kartą.",
    badRequest: "Blogas užklausimas",
    badRequestDescription: "Užklausoje yra neteisingų duomenų.",
    chosen: "Pasirinkta",
    confirm: "Patvirtinti",
    cancel: "Atšaukti",
    edit: "Redaguoti",
    close: "Uždaryti",
    create: "Sukurti",
    remove: "Pašalinti",
    search: "Ieškoti...",
    searchResults: "Paieškos rezultatai",
    select: "Pasirinkti",
    addAttachment: "Pridėti priedą",
    translations: "Vertimai",
    categories: "Kategorijos",
    category: "Kategorija",
    currentBrowsing: "Dabartinis naršymas",
    otherTranslations: "Kiti vertimai",
    addTranslation: "Pridėti vertimą",
    relatedFiles: "Susiję failai",
    relatedImages: "Susiję paveikslėliai",
    relatedVideos: "Susiję vaizdo įrašai",
    schedule: "Tvarkaraštis",
    challenges: "Iššūkiai",
    days: "dienos",
    hours: "valandos",
    minutes: "minutės",
    seconds: "sekundės",
    ready: "Paruošta pradėti!",
    motivate: "Paskatinkite save :)",
    watch: "Žiūrėti",
    validation: {
      dateInPast: "Data negali būti praeityje",
      errorsExist: "Įvyko klaidų...",
      required: "Šis laukas yra privalomas",
      minLength: "Minimalus simbolių skaičius - {0}",
      maxLength: "Maksimalus simbolių skaičius - {0}",
      minArrayLength: "Minimalus {0} elementų skaičius",
      maxArrayLength: "Maksimalus {0} elementų skaičius",
      min: "Minimalus skaičius - {0}",
      max: "Maksimalus skaičius - {0}",
      isEmail: "Neteisingas el. pašto adresas",
      isNumber: "Tai turi būti skaičius",
      passwordRepeat: "Slaptažodžiai nesutampa",
      pattern: "Neteisingas formatas",
      invalidType: "Neteisingas tipas",
      imageType: "Palaikomi tipai: {0}",
      imagesType: "Mažiausiai vienas paveikslėlis turi neteisingą formatą (palaikomi tipai: {0}",
      filesSize: "Mažiausiai vienas failas turi neteisingą dydį (maksimalus dydis - {0} MB)",
      fileSize: "Maksimalus failo dydis - {0} MB",
      imageSize: "Paveikslėlis turi neteisingą dydį arba proporcijas",
      select: "Neteisingas pasirinkimas",
      date: "Neteisinga data",
      dataList: "Pasirinktos reikšmės neleidžiamos",
      dateEndTooEarly: "Pabaigos data turi būti vėlesnė už pradžios datą",
      wysiwygNoFiles: "WYSIWYG laukui nėra failo informacijos",
      wysiwygImagesAmount:
        "Įkeltų paveikslėlių kiekis nesutampa su tikėtinu kiekiu (WYSIWYG laukas)",
      notFound: "Pageidaujamas elementas nerastas",
      fileUploadError:
        "Failo įkėlimo klaida, galbūt failas yra per didelis. Maksimalus failo dydis - {0} MB",
      fileType: "Neteisingas failo formatas (palaikomi formatai: {0})",
      multiLangRequired: "Pagrindinis vertimas trūksta",
      emailRepeat: "El. pašto adresai nesutampa",
    },
    roles: {
      CLIENT: "Klientas",
      ADMIN: "Administratorius",
      LEADER: "Lideris",
      PARTNER: "Partneris",
      CANDIDATE_PARTNER: "Partnerio kandidatas",
    },
  },
  dashboard: {
    welcome: "Sveiki atvykę į mokymo platformą!",
    welcomeMessage: `
      <p>Mes džiaugiamės, kad galime pradėti šią kelionę kartu. Visas būtinas mokymo medžiagą dabar yra vienoje vietoje, o tai palengvina mums sekti pažangą ir pasiekti savo tikslus. Tikimės, kad tai bus unikali mokymo patirtis visiems mums!</p>
    
      <p>Su pagarba ir geriausiais linkėjimais</p>
      <p>Ester ir Kamil Hanas</p>
    `
  },
  mails: {
    unverifiedAccountRemoved: {
      subject: "Jūsų paskyra buvo ištrinta",
      text: `
        <p>Sveiki,</p>
        <p>Kadangi jūsų el. pašto adresas nebuvo patvirtintas per 12 val. nuo registracijos, jūsų paskyra buvo ištrinta :(</p>
        <p>Prašome užsiregistruoti iš naujo!</p>
        ${globalConfig.mails.footer}
      `
    },
    confirmWorkshopEmail: {
      subject: "Patvirtinkite el. pašto adresą",
      text: `
        <p>Sveiki,</p>
        <p>Ačiū už susidomėjimą mūsų seminarais internetinėje erdvėje! Norėdami patvirtinti savo el. pašto adresą ir toliau veikti, spauskite žemiau esantį nuorodą.</p>
        <p><strong><a href="{0}">Spustelėkite čia</a></strong></p>
        ${globalConfig.mails.footer}
      `
    },
    contactMail: {
      subject: "Naujas pranešimas dėl bendradarbiavimo",
      text: `
        <p>Sveiki,</p>
        <p>Atrodo, kad kas nors nori su jumis susisiekti :)</p>
        <strong>{0}</strong></p>
        <p>Pranešimas:</p>
        <p><em>{1}</em></p>
        ${globalConfig.mails.footer}
      `
    },
    verificationReminder: {
      subject: "Sveiki atvykę į programėlę :)",
      text: `
        <p>Sveiki,</p>
        <p>Primename, kad jūsų paskyra jau aktyvi.</p>
        <p>Taigi, jei dar nesate prisijungę, kviečiame naudoti programėlę :)</p>
        <p>Jau dabar galite kviečioti savo partnerius.</p>
        <p>Iki!</p>
        ${globalConfig.mails.footer}
      `
    },
    unexpectedVisitMail: {
      subject: "Netikėtas apsilankymas",
      text: `
        <p>Sveiki,</p>
        <p>Atrodo, kad kas nors atsitiktinai atsidūrė mūsų svetainėje, neišgirdęs apie mus iš jokių mūsų partnerių. Paklaustėme jų, kaip jie mus radė. Štai jų atsakymas:</p>
        <p><em>{0}</em></p>
        <p>Jo duomenys yra <strong>{1}</strong></p>
        ${globalConfig.mails.footer}
      `
    },
    webinarStartsInTenMinutes: {
      subject: "Jau greitai pradėsime! :)",
      text: `
        <p>Vebinarių <strong>{0}</strong> pradės per 10 minučių!</p>
        <p>Spauskite <strong><a href="{1}">čia</a></strong>, kad prisijungtumėte dabar.</p>
        <p>Iki!</p>
        ${globalConfig.mails.footer}
      `
    },
    webinarStartsInOneHour: {
      subject: "Atgalinis skaičiavimas...",
      text: `
        <p>Vebinarių <strong>{0}</strong> pradės per valandą!</p>
        <p>Žemiau rasite savo asmeninį nuorodą į renginį</p>
        <p><strong><a href="{1}">Spauskite čia</a></strong></p>
        <p>Iki!</p>
        ${globalConfig.mails.footer}
      `
    },
    webinarStartsNow: {
      subject: "Pradedame! :)",
      text: `
        <p>Webinaras <strong>{0}</strong> dabar prasideda.</p>
        <p>Spauskite <strong><a href="{1}">čia</a></strong>, kad prisijungtumėte.</p>
        <p>Laukime jūsų! :)</p>
        ${globalConfig.mails.footer}
      `
    },
    waitForActivationEmail: {
      subject: "Laukti aktyvacijos",
      text: `
        <p>Sveiki,</p>
        <p>Jūsų paskyra sėkmingai sukurta ir jūsų el. pašto adresas patvirtintas.</p>
        <p>Dabar jums tik reikia palaukti, kol administratorius aktyvins jūsų paskyrą.</p>
        <p>Nezijaudinkitės, tai užtruks nedaug! ;) Ačiū už jūsų kantrybę!</p>
        ${globalConfig.mails.footer}
      `
    },
    confirmEmail: {
      subject: "Patvirtinkite el. paštą",
      text: `
        <p>Sveiki,</p>
        <p>Ačiū už registraciją! Norėdami patvirtinti savo el. pašto adresą, spauskite žemiau esantį nuorodą:</p>
        <p><strong><a href="{0}">Spauskite čia</a></strong></p>
        ${globalConfig.mails.footer}
      `
    },
    confirmWebinarEmail: {
      subject: "Patvirtinkite savo el. pašto adresą",
      text: `
        <p>Sveiki,</p>
        <p>Ačiū už susidomėjimą mūsų internetiniu seminaru! Norėdami patvirtinti savo el. pašto adresą ir dalyvavimą, spauskite žemiau esančią nuorodą:</p>
        <p><strong><a href="{0}">Spauskite čia</a></strong></p>
        ${globalConfig.mails.footer}
      `
    },
    webinarConfirmation: {
      subject: "Webinaras patvirtintas! :)",
      text: `
        <p>Sveiki,</p>
        <p>Jūsų vieta webinare patvirtinta! :)</p>
        <p>Laukiame Jūsų <strong>{0}</strong> pagal šį <strong><a target="_blank" href="{1}">nuorodą</a></strong></p>
        ${globalConfig.mails.footer}
      `
    },
    webinarInvitation: {
      subject: 'Kvietimas į "{0}"',
      text: `
        <p>Sveiki,</p>
        <p>Turime asmenišką kvietimą jums prisijungti prie šio seminaro :)</p>
        <p><a target="_blank" href="{0}">Priimti</a></p>
        ${globalConfig.mails.footer}
      `
    },
    userPromoted: {
      subject: "Pakėlimas! :)",
      text: `
      <p>Sveiki,</p>
      <p>Jūsų mentorius nusprendė jus pakelti!</p>
      <p>Jūsų naujas vaidmuo yra <strong>{0}</strong>. Sveikiname!</p>
      ${globalConfig.mails.footer}
      `
    },
    passwordReset: {
      subject: "Jūsų slaptažodis buvo nustatytas iš naujo",
      text: `
      <p>Sveiki,</p>
      <p>Pagal jūsų užklausą mes nustatėme jūsų slaptažodį iš naujo.</p>
      <p style="border: 0.3em solid #000; padding: 1em; width: fit-content;">Jūsų naujas slaptažodis yra: <b>{0}</b></p>
      <p>Dėl saugumo priežasčių rekomenduojama pakeisti slaptažodį prisijungus.</p>
      <p></p>
      <p>Jei jūs neprašėte pakeisti slaptažodį, prašome nepaisyti šio el. pašto.</p>
      ${globalConfig.mails.footer}
      `
    },
    userActivated: {
      subject: "Jūsų paskyra buvo aktyvuota",
      text: `
      <p>Sveiki,</p>
      <p>Jūsų paskyra aktyvuota! :) Dabar galite prisijungti ir visapusiškai naudotis visais mūsų programėlės privalumais.</p>
      <p>Norėdami pereiti prie programėlės, spauskite nuorodą žemiau:</p>
      <p><a href="{0}">Prisijungti</a></p>
      ${globalConfig.mails.footer}
      `
    },
    userInvited: {
      subject: "Registracijos pakvietimas",
      text: `
      <p>Sveiki,</p>
      <p>Džiaugiamės, galėdami jus pasivítų! :) Spauskite nuorodą žemiau, kad užsiregistruotumėte mūsų sistemoje:</p>
      <p><a href="{0}">Registruotis</a></p>
      `
    },
    userRemoved: {
      subject: "Jūsų paskyra buvo pašalinta",
      text: `
      <p>Sveiki,</p>
      <p>Deja, jūsų paskyros tikrinimas nebuvo sėkmingas, ir jūsų paskyra buvo pašalinta.</p>
      <p>Jei manote, kad tai klaida, prašome susisiekti su mumis.</p>
      ${globalConfig.mails.footer}
      `
    },
    contactJoinedMentor: {
      subject: "Jūs turite naują partnerį!",
      text: `
      <p>Sveiki,</p>
      <p>Sveikiname! Jūs turite naują partnerį! :)</p>
      <p>Jis vardu {0}. Jūs galite stebėti jo pažangą administracinėje srityje („partneriai“ skirtuke) bet kuriuo metu.</p>
      ${globalConfig.mails.footer}
      `
    },
  },
  nav: {
    home: "Namai",
    webinars: "Webinarai",
    products: "Produktai",
    shop: "Parduotuvė",
    contact: "kontaktas",
    partners: "Partneriai",
    clients: "Klientai",
    notifications: "Pranešimai",
    films: "Filmai",
    startup: "Paleidimas 90 dienų",
    workshops: "Seminarai",
    workshopsClient: "Klientų zona",
    workshopsPartner: "Partnerių sritis",
    myWorkshopsDescription: "Čia įtraukti seminarai bus prieinami tik jūsų partneriams.",
    usefulLinks: "Naudingos nuorodos",
    logout: "Atsijungti",
    login: "Prisijungti",
    register: "Registruotis",
    profile: "Redaguoti profilį",
    chooseProgram: "Pasirinkite programą",
    boards: "Sistema",
    admin: "Administratoriaus skydelis",
    partnerZone: "Partnerių zona",
    slogans: {
      spirit: "dvasia",
      passion: "aistra",
      togetherness: "bendrumas"
    },
    adminSubmenu: {
      webinars: "Webinarai",
      users: "Vartotojai",
      roles: "Vaidmenys",
      workshops: "Seminarai",
      proteges: "Protežai",
      notifications: "Pranešimai",
      announcements: "Skelbimai",
      pages: "Puslapiai",
      menuLinks: "Meniu nuorodos",
      products: "Produktai",
      posts: "Įrašai",
      certificates: "Sertifikatai",
      faqs: "DUK",
      systemContent: "Sistemos turinys",
      candidateQuizes: "Kandidatų viktorinos"
    }
  },
  verifyEmail: {
    title: "Patvirtinkite elektroninį paštą",
    successTitle: "Sėkmė!",
    successDescription: "Jūsų el. pašto adresas patvirtintas! "
  },
  register: {
    title: "Registruotis",
    createAction: "Registruotis",
    chooseMentor: "Pasirinkite mentorių",
    verifyCode: "Tai beveik viskas...",
    codeIsWrong: "Kodas neteisingas",
    verifyMail: "Tai beveik viskas! Mums tik reikia patvirtinti jūsų el. pašto adresą. Patikrinkite savo paštą ir spauskite nuorodą, kurią jums išsiuntėme.",
    contact: {
      desc: "Jau turime jūsų el. pašto adresą, vardą ir pavardę. ",
      chooseRole: "Pasirinkite variantą, kuris geriausiai atitinka jūsų vystymosi kelią."
    },
    accountTypes: {
      client: "Klientas",
      partner: "Partneris"
    },
    fields: {
      email: "El. paštas",
      emailRepeat: "Pakartokite el. paštą",
      password: "Slaptažodis",
      passwordRepeat: "Pakartokite slaptažodį",
      eqId: "EKOLOGIJOS ID",
      firstName: "Pirmas vardas",
      lastName: "Pavardė",
      avatar: "Avataras",
      phone: "Telefono numeris",
      termsOfUse: "Sutinku, kad mano asmens duomenys būtų tvarkomi siekiant teisingo narystės patikrinimo (2017 m. Teisės aktų leidinio 1219 punktas) ir sutinku su <a class=\"link\" href=\"{0}\" target=\"_blank\">terminai ir sąlygos</a> ir sutinkate prenumeruoti naujienlaiškį.",
      saveToNewsletter: "Prenumeruokite man naujienlaiškį",
      saveToNewsletterDescription: "Noriu gauti informacijos apie naujienas, akcijas ir iš Eqology.",
      emailConfirmation: "Aš patikrinau, ar el. pašto adresas teisingas. Tai labai svarbu, nes užsiregistravę privalote paspausti aktyvavimo nuorodą, kurią jums išsiųsime."
    },
    success: {
      create: "Sėkmė!",
      createDesc: "Registracija baigta! Dabar patikrinkite savo el. paštą ir paspauskite ant pašto patvirtinimo nuorodos :)"
    },
    errors: {
      emailExists: "Vartotojas su nurodytu el. pašto adresu jau yra",
      eqIdExists: "Naudotojas su nurodytu EQOLOGY numeriu jau yra",
      client: {
        emailExists: "Duotą el. pašto adresą jau naudoja kitas klientas"
      }
    }
  },
  registerPartner: {
    title: "Registruotis",
    createAction: "Registruotis",
    fields: {
      email: "El. paštas",
      password: "Slaptažodis",
      passwordRepeat: "<PASSWORD>",
      oriflameId: "Oriflame ID",
      firstName: "Pirmas vardas",
      lastName: "Pavardė",
      avatar: "Avataras",
      termsOfUse: "Sutinku, kad mano asmens duomenys būtų tvarkomi siekiant teisingo narystės patikrinimo (2017 m. Teisės aktų leidinio 1219 punktas) ir sutinku su <a class=\"link\" href=\"{0}\" target=\"_blank\">terminai ir sąlygos</a>.",
    },
    success: {
      create: "Sėkmė!",
      createDesc: "Registracija pavyko! "
    },
    errors: {
      emailExists: "Vartotojas su nurodytu el. pašto adresu jau yra",
      oriflameIdExists: "Vartotojas su nurodytu Oriflame ID jau yra"
    }
  },
  profile: {
    title: "Redaguoti profilį",
    info: "Slaptažodžio laukelius užpildykite tik tuo atveju, jei norite jį pakeisti.",
    editAction: "Išsaugoti pakeitimus",
    fields: {
      email: "El. paštas",
      password: "Slaptažodis",
      passwordRepeat: "Pakartokite slaptažodį",
      oriflameId: "Oriflame ID",
      firstName: "Pirmas vardas",
      lastName: "Pavardė",
      avatar: "Avataras",
      eqShopUrl: "„Eqology“ parduotuvės nuoroda"
    },
    success: {
      edit: "Sėkmė!",
      editDesc: "Pakeitimai pritaikyti"
    }
  },
  login: {
    title: "Prisijungti",
    actionLogin: "Prisijungti",
    actionRegister: "Registruotis",
    actionReset: "Atstatyti slaptažodį",
    dontHaveAccount: "Neturite paskyros?",
    forgotPassword: "Pamiršote slaptažodį?",
    fields: {
      email: "El. paštas",
      password: "Slaptažodis"
    },
    success: {
      create: "Sėkmė!",
      createDesc: "Prisijungimas sėkmingas!"
    },
    errors: {
      invalidCredentials: "Neteisingas elektroninio pašto adresas arba slaptažodis",
      inactiveUser: "Jūsų paskyra dar nesuaktyvinta"
    }
  },
  forgotPassword: {
    title: "Pamiršai slaptažodį?",
    action: "Atstatyti slaptažodį",
    fields: {
      email: "El. paštas",
      eqId: "EKOLOGIJOS ID"
    },
    errors: {
      invalidData: "Netinkami duomenys"
    },
    success: {
      title: "Sėkmė!",
      description: "Nurodytu el. pašto adresu buvo išsiųsta nuoroda su nauju slaptažodžiu."
    }
  },
  cropper: {
    title: "Apkarpyti",
    confirm: "Patvirtinti",
    cancel: "Atšaukti"
  },
  termsOfUse: {
    title: "Naudojimo sąlygos"
  },
  footer: {
    links: {
      admin: "Administratoriaus skydelis"
    }
  },
  notFound: {
    title: "Oi... Nerasta!",
    description: "Nepavyko rasti pageidaujamo puslapio. "
  },
  unauthorized: {
    title: "Oi... Jūs neturite leidimo!",
    description: "Neturite leidimo peržiūrėti šio puslapio. "
  },
  admin: {
    title: "Administratoriaus skydelis",
    links: {
      users: "Vartotojai",
      workshops: "Seminarai",
      courses: "Kursai",
      startup: "Paleidimas 90 dienų"
    }
  },
  users: {
    title: "Vartotojai",
    invitation: {
      confirm: {
        title: "Patvirtinti",
        desc: "Ar tikrai norite išsiųsti registracijos pakvietimą?",
      },
    },
    invite: "Pakviesti",
    candidates: "Kandidatai",
    candidatesTitle: "Partnerių kandidatai",
    invitationSent: "Pakvietimas išsiųstas",
    waitingForActivation: "Laukiama aktyvinimo",
    activateUser: "Suaktyvinti",
    deleteUser: "Ištrinti",
    userUpdated: "Vartotojas atnaujintas",
    allUsers: "Visi vartotojai",
    editAction: "Išsaugoti pakeitimus",
    delete: {
      confirmTitle: "Ar tu tuo tikras?",
      confirmDesc: "Ar tikrai norite ištrinti šį naudotoją? "
    },
    edit: {
      title: "Redaguoti naudotoją"
    },
    roles: {
      client: "Klientas",
      partner: "Partneris",
      leader: "Lyderis",
      admin: "Admin",
      candidate_partner: "Kandidatas į partnerius"
    },
    fields: {
      firstName: "Pirmas vardas",
      lastName: "Pavardė",
      role: "Vaidmuo",
      mentor: "Mentorė"
    },
    success: {
      edit: "Sėkmė!",
      editDesc: "Pakeitimai pritaikyti"
    }
  },
  workshops: {
    icons: {
      HEART: "Širdis",
      LIKE: "Kaip",
      STATS: "Statistika",
      CONFIG: "Pavara",
      WORKSHOP: "Seminaras",
      INFO: "Informacija",
      FB: "Facebook",
      INSTAGRAM: "Instagramas",
      SPORT: "Sportas",
      MEDITATION: "Meditacija",
      CHAT: "Pokalbis",
      TROPHY: "Trofėjus",
      STAR: "Žvaigždė",
      CHALLENGE: "Iššūkis",
      MAIL: "Paštas",
      CALENDAR: "Kalendorius",
      VIDEO: "Vaizdo įrašas",
      BOOK: "Knyga",
      PAPER: "Popierius",
      LINK: "Nuoroda",
      FILE: "Failas",
      TEXT: "Tekstas",
      PLUS: "Pliusas",
      MINUS: "Minusas",
      CHECK: "Patikrinti",
      MUSIC: "Muzika",
      CROSS: "Kirsti",
      ARROW_LEFT: "Rodyklė kairėn",
      ARROW_RIGHT: "Rodyklė dešinėn",
      ARROW_UP: "Rodyklė aukštyn",
      ARROW_DOWN: "Rodyklė žemyn",
      LOCK_OPEN: "Atidarykite užraktą",
      LOCK_CLOSED: "Uždaryta spyna",
      PIN: "Smeigtukas",
      PIN_TWO: "Prisegti du",
      CHART_UP: "Sukurkite diagramą",
      CHART_DOWN: "Diagrama žemyn",
      CHART_ALT: "Diagrama alt",
      TOOLS: "Įrankiai",
      BOMB: "Bomba",
      DYNAMITE: "Dinamitas",
      DIAMOND: "Deimantas",
      CASH: "Grynieji pinigai",
      CASH_TWO: "Pinigai du",
      GOLD: "Auksas",
      BUS: "Autobusas",
      CAR: "Automobilis",
      TAXI: "Taksi",
      BOAT: "Valtis",
      PLANE: "Lėktuvas",
      BIKE: "Dviratis",
      SMARTPHONE: "Išmanusis telefonas",
      LAPTOP: "Nešiojamas kompiuteris",
      DESKTOP: "Darbalaukis",
      PHONE_OLD: "Senas telefonas",
      KEYBOARD: "Klaviatūra",
      CAMERA: "Fotoaparatas",
      COMPASS: "Kompasas",
      ALARM: "Signalizacija",
      WOMAN: "Moteris",
      MAN: "Vyras",
      HOME: "Namai",
      BELL: "varpas",
      ACADEMY: "Akademija",
      CERTIFICATE: "Sertifikatas",
      LIST: "Sąrašas",
      MOVIE: "Filmas",
      PROFILE: "Profilis",
      CROWN: "Karūna",
      KEY: "Raktas",
      PATHS: "Keliai",
      USERS: "Vartotojai",
      NOTIFICATION: "Pranešimas",
      EXIT: "Išeiti",
      CART: "Krepšelis",
      FILES: "Failai",
      FIRE: "Ugnis"
    },
    title: "Seminarai",
    firstStepsTitle: "Pirmieji žingsniai",
    titleClient: "Klientų dirbtuvės",
    titlePartner: "Partnerių seminarai",
    deleteWorkshop: "Ištrinti",
    allWorkshops: "Visos dirbtuvės",
    editAction: "Išsaugoti pakeitimus",
    createAction: "Pridėti dirbtuves",
    startAction: "Pradėti",
    step: "{0} veiksmas",
    noWorkshopsInStep: "Šiame etape seminarų nėra",
    workshopCreated: "Pridėta dirbtuvės",
    workshopUpdated: "Seminaras atnaujintas",
    translationAdded: "Vertimas pridėtas",
    workshopRemoved: "Dirbtuvės pašalintos",
    noDataTitle: "Nėra duomenų",
    noData: "Dirbtuvių nerasta...",
    backToParent: "Atgal",
    addSubdirectory: "Pridėti pakatalogį",
    addItem: "Pridėti dirbtuves",
    tabs: {
      basicData: "Pagrindinis",
      files: "Failai"
    },
    delete: {
      confirmTitle: "Ar tu tuo tikras?",
      confirmDesc: "Ar tikrai norite ištrinti šį seminarą? "
    },
    fields: {
      name: "vardas",
      description: "apibūdinimas",
      icon: "Piktograma",
      YTLink: "URL į vaizdo įrašą (YT)",
      supportedRoles: "Palaikomi vaidmenys",
      supportedLanguages: "Palaikomos kalbos",
      contentVideo: "URL į vaizdo įrašą (YT)",
      contentText: "Teksto turinys",
      poster: "Grafika",
      files: "Failai (priedai)",
      categoryId: "Kategorija",
      zone: "Zona",
      step: "Žingsnis",
      public: "Prieinamos visiems",
      publicDescription: "Pažymėkite šį langelį, jei norite, kad seminaras būtų pasiekiamas iš karto, be mentoriaus aktyvinimo.",
      stepName: {
        1: "1 žingsnis",
        2: "2 žingsnis",
        3: "3 veiksmas",
        4: "4 veiksmas",
        5: "5 veiksmas",
        6: "6 veiksmas",
        7: "7 veiksmas",
        8: "8 veiksmas",
        9: "9 veiksmas",
        10: "10 veiksmas"
      }
    },
    edit: {
      title: "Redaguoti dirbtuves",
      desc: "Laukai <strong>\"zona\"</strong> ir <strong>\"prieinamas visiems\"</strong> turėtų būti vienodi kiekvienai seminaro kalbai.", 
    },
    create: {
      title: "Pridėti dirbtuves",
      translationCreationDesc: "Kuriate naują esamo seminaro vertimą",
      originalLanguage: "Originalus",
      currentLanguage: "Vertimas"
    },
    contentTypes: {
      video: "Vaizdo įrašas",
      text: "Teksto turinys"
    },
    zones: {
      client: "Kliento zona",
      partner: "Partnerių zona",
      both: "Abi zonos"
    },
    success: {
      create: "Sėkmė!",
      createDesc: "Pridėta dirbtuvės",
      edit: "Sėkmė!",
      editDesc: "Pakeitimai pritaikyti"
    },
    errors: {
      nameExists: "Dirbtuvės tokiu pavadinimu jau yra"
    },
    categories: {
      title: "Kategorijos",
      allCategories: "Visos kategorijos",
      createAction: "Pridėti kategoriją",
      editAction: "Išsaugoti pakeitimus",
      create: {
        title: "Pridėti kategoriją"
      },
      edit: {
        title: "Redaguoti kategoriją"
      },
      fields: {
        name: "vardas",
        owner: "Tėvų kategorija",
        description: "apibūdinimas"
      },
      delete: {
        confirmTitle: "Ar tu tuo tikras?",
        confirmDesc: "Ar tikrai norite ištrinti šią kategoriją? "
      }
    },
    steps: {
      editAction: "Išsaugoti pakeitimus",
      edit: {
        title: "Redaguoti veiksmą"
      },
      fields: {
        name: "vardas",
        description: "apibūdinimas"
      }
    },
    directories: {
      createAction: "Pridėti katalogą",
      fields: {
        name: "vardas",
        description: "apibūdinimas",
        icon: "Piktograma",
        supportedRoles: "Palaikomi vaidmenys",
        supportedLanguages: "Palaikomos kalbos"
      },
      edit: {
        title: "Redaguoti katalogą"
      }
    }
  },
  partnerZone: {
    title: "Partnerių zona"
  },
  proteges: {
    title: "Protežai",
    candidatesTitle: "Partnerių kandidatai",
    tree: "Partnerių medis",
    todayProtegesCount: "Nauji partneriai: {0}",
    treeWrongDevice: "Partnerių medis pasiekiamas tik dideliame ekrane",
    protegesList: "Protegų sąrašas",
    pendingRequests: "Laukiančios užklausos",
    requestAccepted: "Prašymas priimtas",
    requestRejected: "Prašymas atmestas",
    copySingUpInviteLink: "Nukopijuokite registracijos kvietimo nuorodą",
    copyClientLink: "Jūsų nuoroda klientui (į EQAPP)",
    speedChanged: "Greitis buvo pakeistas",
    myWorkshops: "Mano dirbtuvės",
    clients: {
      title: "Klientai",
      noClients: "Nėra klientų",
      info: "Informacija"
    },
    candidates: {
      title: "Kandidatai",
      noCandidates: "Kandidatų nėra",
      info: "Info"
    },
    mainInfo: {
      role: "Vaidmuo",
      createdDate: "Įstojimo data",
      lastActivity: "Paskutinė veikla",
      step: "Dabartinis žingsnis",
      phone: "Telefonas",
      email: "El. paštas",
      eqologyId: "Eqology ID"
    },
    activity: {
      noActivity: "Jokios veiklos",
      seeMore: "Žiūrėti daugiau",
      webinarActivity: "Webinarai",
      lastActivity: "Paskutinė veikla",
      allActivity: "Visa veikla",
      webinarsLatest: "Naujausi webinarai",
      noDataTitle: "Nieko čia nėra :(",
      noData: "Jokios veiklos",
      descriptions: {
        WORKSHOP_FINISH: "Baigta dirbtuvė <strong>„{0}“</strong>",
        WORKSHOP_START: "Pradėjo dirbtuves <strong>„{0}“</strong>",
        REGISTRATION: "Registruota sąskaita",
        ACTIVATION: "Paskyra suaktyvinta",
        PROMOTION: "Paaukštintas į <strong>„{0}“</strong>",
        CONTACT_CREATION: "Sukurtas kontaktas",
        COURSE_FINISH: "Baigtas kursas <strong>„{0}“</strong>",
        DEMOTION: "Pažemintas iki <strong>„{0}“</strong>",
        WEBINAR_SUBSCRIPTION: "Užsiprenumeravote internetinį seminarą <strong>„{0}“</strong>",
        WEBINAR_PRESENCE: "Dalyvavo webinare <strong>„{0}“</strong>"
      },
      webinarActivityTypes: {
        0: "Prenumeruoti",
        1: "Dalyvavo",
        2: "Nėra",
        3: "Neapsisprendęs"
      },
      seeAll: "Matyti viską",
      browsingActivity: "Vartotojo naršymo veikla <strong>{0}</strong>"
    },
    courseProgress: {
      title: "Kurso eiga",
      description: "Dabartinis kursas - <strong>{0}</strong>"
    },
    programProgress: {
      title: "Programos eiga",
      description: "Dabartinė programa - <strong>{0}</strong>",
      seeAll: "Žiūrėti daugiau",
      allProgress: "Visa pažanga",
      browsingActivity: "Vartotojo naršymo kurso eiga <strong>{0}</strong>"
    },
    actions: {
      title: "Veiksmai",
      activate: "Suaktyvinti vartotoją",
      activateWorkshop: "Suaktyvinkite dirbtuves",
      delete: "Ištrinti vartotoją",
      promoteToLeader: "Paaukštinti iki lyderio",
      promoteToAdmin: "Paaukštinti į administratorių",
      demoteToLeader: "Pažeminti iki lyderio",
      demoteToPartner: "Pažeminti iki partnerio",
      inviteToSignUp: "Kviečiame užsiregistruoti",
      activateNextStep: "Suaktyvinkite kitą veiksmą",
      undoStep: "Anuliuoti veiksmą",
      changeMentor: "Keisti mentorių"
    },
    workshopActivation: {
      title: "Seminarai",
      activatingWorkshop: "Vartotojo aktyvinimo dirbtuvės <strong>{0}</strong>",
      errors: {
        workshopNotFound: "Dirbtuvės su nurodytu ID nerastas",
        unauthorized: "Vartotojas neturi prieigos prie zonos, kuriai priklauso dirbtuvės",
        badRequest: "Seminaras jau prieinamas vartotojui"
      },
      success: "Seminaras aktyvuotas"
    },
    userRemoved: "Vartotojas pašalintas",
    protegePromoted: "Protege buvo paaukštintas!",
    protegeDemoted: "Protege buvo pažemintas!",
    protegeActivated: "Protege suaktyvinta!",
    invitationSent: "Kvietimas išsiųstas!",
    mentorChanged: "Mentorius pasikeitė!",
    stepUndone: "Žingsnis buvo anuliuotas!",
    stepActivated: "Žingsnis suaktyvintas!",
    promotion: {
      confirm: {
        title: "Skatinti protegą",
        desc: "Ar tikrai norite reklamuoti šį protegą?"
      }
    },
    demotion: {
      confirm: {
        title: "Pakeiskite gynėjo vaidmenį",
        desc: "Ar tikrai norite pakeisti šio protego vaidmenį?"
      }
    },
    inviteToSignUp: {
      confirm: {
        title: "Kviečiame užsiregistruoti",
        desc: "Ar tikrai norite pakviesti šį vartotoją prisiregistruoti?"
      }
    },
    activate: {
      confirm: {
        title: "Suaktyvinti vartotoją",
        desc: "Ar tikrai norite suaktyvinti šį naudotoją?"
      }
    },
    activateNextStep: {
      confirm: {
        title: "Suaktyvinkite kitą veiksmą",
        desc: "Ar tikrai norite suaktyvinti kitą šio vartotojo veiksmą?"
      }
    },
    undoStep: {
      confirm: {
        title: "Anuliuoti veiksmą",
        desc: "Ar tikrai norite anuliuoti šio naudotojo veiksmą?"
      }
    },
    changeMentor: {
      confirm: {
        title: "Keisti mentorių",
        desc: "Ar tikrai norite pakeisti šio naudotojo mentorių?"
      }
    },
    changeSpeed: {
      confirm: {
        title: "Keisti greitį",
        desc: "Ar tikrai norite pakeisti kursą / programos greitį šiam vartotojui?"
      }
    },
    copyInviteLink: "Jūsų „Protege“ nuoroda (į EQAPP)",
    inviteLinkCopied: "Nuoroda nukopijuota",
    courseRequests: {
      title: "Kursai",
      protegeAsksFor: "Prašo suaktyvinti kursą <strong>„{0}“</strong>",
      denyAction: "Neigti",
      activateAction: "Suaktyvinti"
    },
    programRequests: {
      title: "Programos",
      protegeAsksFor: "Prašo aktyvuoti programą <strong>„{0}“</strong>",
      denyAction: "Neigti",
      activateAction: "Suaktyvinti"
    },
    activationRequests: {
      title: "Suaktyvinimai",
      protegeAsksFor: "Prašo suaktyvinti paskyrą",
      denyAction: "Neigti",
      activateAction: "Suaktyvinti"
    }
  },
  courses: {
    title: "Kursai",
    allCourses: "Visi kursai",
    createAction: "Pridėti kursą",
    editAction: "išsaugoti pakeitimus",
    courseCreated: "Kursas buvo pridėtas",
    courseUpdated: "Pakeitimai įgyvendinti",
    courseRemoved: "Kursas ištrintas",
    timeToStart: "Jūsų kursai greitai prasidės!<br> Laikas pradėti <strong>{0}</strong> tai...",
    create: {
      title: "Pridėti kursą",
      desc: "Šiame skydelyje galite pridėti naują kursą, bet be konkretaus pamokos plano. "
    },
    edit: {
      title: "Redaguoti kursą"
    },
    delete: {
      confirmTitle: "Ar tu tuo tikras?",
      confirmDesc: "Ar tikrai norite ištrinti šį kursą? "
    },
    fields: {
      name: "vardas",
      description: "apibūdinimas",
      contract: "Sutartis",
      poster: "Grafika",
      days: "Trukmė"
    },
    day: {
      title: "{0} diena",
      editAction: "išsaugoti pakeitimus",
      success: {
        edit: "Sėkmė!",
        editDesc: "Aprašymas buvo atnaujintas"
      },
      fields: {
        challengesDescription: "Dienos aprašymas",
        summaryDescription: "Dienos santrauka"
      },
      challenges: {
        createAction: "Pridėkite iššūkį",
        editAction: "išsaugoti pakeitimus",
        useSchemaGo: "Naudokite GO schemą",
        useSchemaRun: "Naudokite RUN schemą",
        listDesc: "Visi sąrašo pakeitimai atnaujinami realiuoju laiku.",
        create: {
          title: "Pridėkite iššūkį"
        },
        edit: {
          title: "Redaguoti iššūkį"
        },
        fields: {
          title: "Pavadinimas",
          description: "apibūdinimas",
          type: "Tipas",
          workshopId: "Susiję mokymai",
          optional: "Neprivaloma",
          optionalDesc: "Ar vartotojas gali praleisti šį iššūkį? ",
          typeVariants: {
            PROSPECTING: "Žvalgymas",
            APPOINTMENT: "Vietinis susitikimas.",
            WEBINAR: "Webinaras",
            FOLLOW_UP: "Sekti",
            MEETING: "Susitikimas",
            WORKSHOP: "Treniruotės",
            INFO: "informacija",
            FB: "FB veikla",
            INSTAGRAM: "„Instagram“ veikla",
            SOCIAL_MEDIA: "Aktyvumas sergant MS",
            SPORT_ACTIVITY: "Fizinė veikla"
          }
        }
      }
    }
  },
  notifications: {
    title: "Pranešimai",
    allNotifications: "Visi pranešimai",
    notificationTemplates: "Šablonai",
    noNotifications: "Jokių pranešimų",
    noNotificationsDesc: "Neturite neskaitytų pranešimų.",
    fields: {
      title: "Pavadinimas",
      description: "apibūdinimas",
      name: "Vardas (vidinis)"
    },
    editAction: "išsaugoti pakeitimus",
    notificationUpdated: "Pakeitimai įgyvendinti",
    unseenPushNotifications: "Turite {0} naujų pranešimų"
  },
  catalogs: {
    title: "Katalogai",
    allCatalogs: "Visi katalogai",
    createAction: "Pridėti katalogą",
    editAction: "išsaugoti pakeitimus",
    catalogCreated: "Katalogas buvo pridėtas",
    catalogUpdated: "Pakeitimai įgyvendinti",
    catalogRemoved: "Katalogas buvo ištrintas",
    create: {
      title: "Pridėti katalogą"
    },
    edit: {
      title: "Redaguoti katalogą"
    },
    delete: {
      confirmTitle: "Ar tu tuo tikras?",
      confirmDesc: "Ar tikrai norite ištrinti šį katalogą? "
    },
    fields: {
      name: "vardas",
      description: "Turinys",
      startAt: "Pradžios data",
      variant: "Trukmė"
    },
    variants: {
      twoWeek: "2 savaitės",
      threeWeek: "3 savaitės"
    }
  },
  menuLinks: {
    title: "Meniu nuorodos",
    allLinks: "Visos nuorodos",
    createAction: "Pridėti nuorodą",
    editAction: "išsaugoti pakeitimus",
    linkCreated: "Nuoroda pridėta",
    linkUpdated: "Pakeitimai įgyvendinti",
    linkRemoved: "Nuoroda pašalinta",
    create: {
      title: "Pridėti nuorodą"
    },
    edit: {
      title: "Redaguoti nuorodą"
    },
    delete: {
      confirmTitle: "Ar tu tuo tikras?",
      confirmDesc: "Ar tikrai norite pašalinti šią nuorodą? "
    },
    variants: {
      internal: "Puslapis",
      external: "Išorinis"
    },
    fields: {
      name: "vardas",
      url: "URL adresas",
      variant: "Tipas",
      page: "Puslapis",
      icon: "Piktograma",
      supportedRoles: "Palaikomi vaidmenys",
      supportedLanguages: "Palaikomos kalbos"
    },
    errors: {
      nameExists: "Nuoroda tokiu vardu jau yra"
    }
  },
  productCategory: {
    allProductCategories: "Visos kategorijos",
    productCategoryCreated: "Kategorija buvo pridėta",
    productCategoryUpdated: "Pakeitimai įgyvendinti",
    productCategoryRemoved: "Kategorija buvo ištrinta",
    buyingChoices: "Pirkimo galimybės – perkate tiesiai iš pardavėjo!",
    goToShop: "Į parduotuvę!",
    posts: "Susiję straipsniai",
    faqs: "Užduoti klausimai",
    editProductRefLink: "Redaguoti pakartotinę nuorodą",
    lackOfRefUrls: "Užbaikite nuorodas!",
    copyRefLink: "Nukopijuoti nuorodą",
    refLinkCopied: "Nuoroda nukopijuota",
    benefits: {
      one: {
        title: "Greitas pristatymas",
        description: "Pristatymas klientui per 2 darbo dienas!"
      },
      two: {
        title: "Geresnės Kainos",
        description: "Pirkite pas mus – mokėkite mažiau!"
      },
      three: {
        title: "Pasitenkinimo garantija",
        description: "30 dienų grąžinimo garantija!"
      },
      four: {
        title: "Specializuotas tyrimas",
        description: "Turime nepriklausomus testus, patvirtinančius aukščiausią kokybę!"
      }
    },
    createAction: "Pridėti kategoriją",
    editAction: "Redaguoti kategoriją",
    delete: {
      confirmTitle: "Ar tu tuo tikras?",
      confirmDesc: "Ar tikrai norite ištrinti šią kategoriją? "
    },
    fields: {
      name: "vardas",
      descriptionBefore: "Aprašymas prieš gaminius",
      descriptionAfter: "Aprašymas pagal produktus",
      image: "Grafika",
      imageBig: "Didelė grafika",
    },
    create: {
      title: "Pridėti kategoriją"
    },
    edit: {
      title: "Redaguoti kategoriją"
    },
    tabs: {
      basicData: "Pagrindinis",
      products: "Produktai",
      articles: "Straipsniai",
      faqs: "DUK"
    }
  },
  products: {
    title: "Produktai",
    seeMore: "Informacija",
    ourProducts: "Mūsų produktai",
    editUrl: "Redaguoti pakartotinę nuorodą",
    fromProducer: "Pirkite tiesiai iš gamintojo",
    updateLink: "Užpildykite nuorodą!",
    allProducts: "Visi produktai",
    createAction: "Pridėti produktą",
    editAction: "išsaugoti pakeitimus",
    productCreated: "Produktas buvo pridėtas",
    productUpdated: "Pakeitimai įgyvendinti",
    productRemoved: "Produktas buvo pašalintas",
    linkCopied: "Nuoroda nukopijuota",
    copyLink: "Nukopijuoti nuorodą",
    create: {
      title: "Pridėti produktą"
    },
    edit: {
      title: "Redaguoti produktą"
    },
    delete: {
      confirmTitle: "Ar tu tuo tikras?",
      confirmDesc: "Ar tikrai norite pašalinti šį produktą? "
    },
    fields: {
      name: "vardas",
      description: "apibūdinimas",
      price: "Kaina",
      image: "Grafika",
      refUrl: "Nuoroda į produktą",
      priceOld: "Senas kaina",
    }
  },
  posts: {
    title: "Įrašai",
    allPosts: "Visi įrašai",
    createAction: "Pridėti įrašą",
    editAction: "išsaugoti pakeitimus",
    postCreated: "Įrašas pridėtas",
    postUpdated: "Pakeitimai įgyvendinti",
    postRemoved: "Įrašas ištrintas",
    create: {
      title: "Pridėti įrašą"
    },
    edit: {
      title: "Redaguoti įrašą"
    },
    delete: {
      confirmTitle: "Ar tu tuo tikras?",
      confirmDesc: "Ar tikrai norite ištrinti šį įrašą? "
    },
    fields: {
      title: "Pavadinimas",
      content: "Turinys",
      image: "Grafika"
    }
  },
  certificates: {
    seeMore: "Daugiau informacijos",
    title: "Sertifikatai",
    allCertificates: "Visi sertifikatai",
    createAction: "Pridėkite sertifikatą",
    editAction: "išsaugoti pakeitimus",
    certificateCreated: "Pažymėjimas buvo pridėtas",
    certificateUpdated: "Pakeitimai įgyvendinti",
    certificateRemoved: "Sertifikatas buvo ištrintas",
    create: {
      title: "Pridėkite sertifikatą"
    },
    edit: {
      title: "Redaguoti sertifikatą"
    },
    delete: {
      confirmTitle: "Ar tu tuo tikras?",
      confirmDesc: "Ar tikrai norite ištrinti šį sertifikatą? "
    },
    fields: {
      title: "Pavadinimas",
      description: "apibūdinimas",
      image: "Grafika",
      url: "URL adresas"
    }
  },
  faqs: {
    title: "DUK",
    allFaqs: "Visi DUK",
    createAction: "Pridėti DUK",
    editAction: "išsaugoti pakeitimus",
    faqCreated: "DUK buvo pridėta",
    faqUpdated: "Pakeitimai įgyvendinti",
    faqRemoved: "DUK buvo pašalinti",
    create: {
      title: "Pridėti DUK"
    },
    edit: {
      title: "Redaguoti DUK"
    },
    delete: {
      confirmTitle: "Ar tu tuo tikras?",
      confirmDesc: "Ar tikrai norite ištrinti šiuos DUK? "
    },
    fields: {
      question: "Klausimas",
      answer: "Atsakymas"
    }
  },
  candidateQuizes: {
    title: "Viktorinos kandidatams",
    allQuizes: "Visos viktorinos",
    createAction: "Pridėkite viktoriną",
    editAction: "išsaugoti pakeitimus",
    quizCreated: "Viktorina buvo pridėta",
    quizUpdated: "Pakeitimai įgyvendinti",
    quizRemoved: "Viktorina ištrinta",
    create: {
      title: "Pridėkite viktoriną"
    },
    edit: {
      title: "Redaguoti viktoriną"
    },
    delete: {
      confirmTitle: "Ar tu tuo tikras?",
      confirmDesc: "Ar tikrai norite ištrinti šią apklausą? "
    },
    fields: {
      name: "vardas",
      graduateMinScore: "išlaikymo rodiklis (%)",
      movieUrl: "URL į vaizdo įrašą"
    }
  },
  candidateQuizQuestions: {
    title: "Klausimai",
    allQuestions: "Visi klausimai",
    createAction: "Pridėkite klausimą",
    editAction: "išsaugoti pakeitimus",
    questionCreated: "Klausimas pridėtas",
    questionUpdated: "Pakeitimai įgyvendinti",
    questionRemoved: "Klausimas ištrintas",
    create: {
      title: "Pridėkite klausimą"
    },
    edit: {
      title: "Redaguoti klausimą"
    },
    delete: {
      confirmTitle: "Ar tu tuo tikras?",
      confirmDesc: "Ar tikrai norite ištrinti šį klausimą? "
    },
    fields: {
      question: "Klausimas"
    }
  },
  candidateQuizAnswers: {
    title: "Atsakymai",
    allAnswers: "Visi atsakymai",
    createAction: "Pridėkite atsakymą",
    editAction: "išsaugoti pakeitimus",
    answerCreated: "Atsakymas pridėtas",
    answerUpdated: "Pakeitimai įgyvendinti",
    answerRemoved: "Atsakymas buvo ištrintas",
    create: {
      title: "Pridėkite atsakymą"
    },
    edit: {
      title: "Redaguoti atsakymą"
    },
    delete: {
      confirmTitle: "Ar tu tuo tikras?",
      confirmDesc: "Ar tikrai norite ištrinti šį atsakymą? "
    },
    fields: {
      answer: "Atsakymas",
      isCorrect: "Teisingai",
      questionDescription: "Pasirinkite tik tuo atveju, jei atsakymas turi būti laikomas teisingu"
    }
  },
  boardItemImages: {
    createAction: "Pridėti grafiką",
    delete: {
      confirmTitle: "Ar tu tuo tikras?",
      confirmDesc: "Ar tikrai norite ištrinti šią nuotrauką? "
    },
    fields: {
      image: "Failas"
    }
  },
  boardItemVideos: {
    createAction: "Pridėti vaizdo įrašą",
    delete: {
      confirmTitle: "Ar tu tuo tikras?",
      confirmDesc: "Ar tikrai norite ištrinti šį vaizdo įrašą? "
    }
  },
  boardItemFiles: {
    createAction: "Pridėti failą",
    delete: {
      confirmTitle: "Ar tu tuo tikras?",
      confirmDesc: "Ar tikrai norite ištrinti šį failą? "
    },
    fields: {
      file: "Failas",
      languageId: "Liežuvis"
    }
  },
  workshopItemFiles: {
    createAction: "Pridėti failą",
    delete: {
      confirmTitle: "Ar tu tuo tikras?",
      confirmDesc: "Ar tikrai norite ištrinti šį failą? "
    },
    fields: {
      file: "Failas",
      languageId: "Liežuvis"
    }
  },
  pages: {
    title: "Puslapiai",
    allPages: "Visi antriniai puslapiai",
    createAction: "Pridėkite antrinį puslapį",
    editAction: "išsaugoti pakeitimus",
    pageCreated: "Papildomas puslapis buvo pridėtas",
    pageUpdated: "Pakeitimai įgyvendinti",
    pageRemoved: "Antrasis puslapis buvo ištrintas",
    goToBoardContent: "Pereiti prie turinio",
    create: {
      title: "Pridėkite antrinį puslapį"
    },
    edit: {
      title: "Redaguoti antrinį puslapį"
    },
    delete: {
      confirmTitle: "Ar tu tuo tikras?",
      confirmDesc: "Ar tikrai norite ištrinti šį antrinį puslapį? "
    },
    fields: {
      name: "ID"
    },
    types: {
      board: "Lenta",
      boardItem: "Gavėnia"
    }
  },
  webinars: {
    title: "Webinarai",
    platforms: {
      cmNew: "Naujas ClickMeeting",
      cmFrom: "Esamas ClickMeeting",
      sm: "Esamas Streamyard/YT"
    },
    youHaveToVerify: {
      title: "Patvirtinkite el. paštą",
      description: "Prieš tęsdami, turite patvirtinti savo el. pašto adresą.",
    },
    downloadPoster: "Atsisiųsti plakatą",
    downloadCSV: "Atsisiųsti CSV",
    noMoreTokens: "Žetonų nėra",
    noMoreTokensDesc: "Deja, daugiau vietų į šį internetinį seminarą nebėra :(",
    businessWebinars: "Verslo internetiniai seminarai",
    clientWebinars: "Produkto seminarai",
    showFinished: "Paroda baigta",
    finishedWebinars: "Baigti internetiniai seminarai",
    subscribe: "Registruotis!",
    details: "Detalės",
    timeLeft: "Liko...",
    live: "GYVAI",
    subscribedUsers: "Išsaugota",
    attendedUsers: "Dalyviai",
    noSubscribedUsers: "Registruotų vartotojų nėra",
    noAttendedUsers: "Dalyvių nėra",
    startAt: "Tai kyla",
    subscribed: "Išsaugota!",
    subscribedInfo: "Likus valandai iki webinaro pradžios, gausite priminimo pranešimą.",
    presenter: "Lyderis",
    seeYouSoon: "Iki! ",
    goToWebinar: "Įeiti",
    allWebinars: "Visi webinarai",
    createAction: "Pridėkite internetinį seminarą",
    editAction: "išsaugoti pakeitimus",
    webinarCreated: "Pridėtas internetinis seminaras",
    webinarUpdated: "Pakeitimai įgyvendinti",
    webinarRemoved: "Webinaras ištrintas",
    noDataTitle: "Nieko čia nėra :(",
    noData: "Šiuo metu nėra suplanuotų internetinių seminarų...",
    invited: {
      invite: "Pakviesti",
      invited: "Pakviestas!",
      invitePartner: "Pakvieskite partnerį",
      inviteGuest: "Pakvieskite svečią",
      invitedUsers: "Registruoti vartotojai",
      invitedGuests: "Registruoti svečiai",
      userInvited: "Vartotojas buvo pakviestas",
      error: "Įvyko klaida...",
      typeEmail: "Įveskite savo elektroninio pašto adresą",
      emailExists: "Vartotojas jau gavo kvietimą",
      invitationInvalidOrExpired: "Kvietimas neteisingas arba pasibaigęs",
      firstName: "vardas",
      lastName: "Pavardė",
      email: "paštas",
      urlGenerated: "Sugeneruotas unikalus kvietimas!",
      copyUrl: "Nukopijuoti nuorodą",
      linkCopied: "Nuoroda nukopijuota"
    },
    create: {
      title: "Pridėkite internetinį seminarą"
    },
    edit: {
      title: "Redaguoti internetinį seminarą"
    },
    delete: {
      confirmTitle: "Ar tu tuo tikras?",
      confirmDesc: "Ar tikrai norite ištrinti šį internetinį seminarą? "
    },
    variants: {
      BUSINESS: "Verslas",
      CLIENT: "Klientas",
      INVITED: "Pagal kvietimą"
    },
    fields: {
      title: "Pavadinimas",
      description: "apibūdinimas",
      presenter: "Lyderis",
      startAt: "Pradžios data",
      duration: "Trukmė",
      variant: "Tipas",
      supportedLanguages: "Palaikomos kalbos",
      supportedRoles: "Palaikomi vaidmenys",
      embedUrl: "Įterpti URL (YT)",
      cmId: "ID iš CM",
      cmIdDescription: "Eikite į renginio informaciją ir peržiūrėkite adresą naršyklėje. ID yra skaičius po paskutiniuju slashiuku. (Pavyzdžiui, nuorodoje `https://account-panel.clickmeeting.com/8315894`, ID yra `8315894`)",
      isWorkshop: "Vidinis seminaras",
      isWorkshopDescription: "Jei pažymėtas šis laukelis, seminaras bus rodomas „Verslo partnerių seminarai“ skirtuke ir nebus galima pakviesti išorinių asmenų.",
      poster: "Plakatas",
      embedCode: "StreamYard srauto nuoroda",
      embedCodeDescription: `Pasirinkite „Dalintis“ savo „On-air“ sraute, nukopijuokite nuorodą ir įklijuokite čia.`
    }
  },
  announcements: {
    title: "Skelbimai",
    allAnnouncements: "Visi skelbimai",
    createAction: "Pridėti skelbimą",
    editAction: "išsaugoti pakeitimus",
    announcementCreated: "Skelbimas buvo pridėtas",
    announcementUpdated: "Pakeitimai įgyvendinti",
    announcementRemoved: "Skelbimas pašalintas",
    create: {
      title: "Pridėti skelbimą"
    },
    edit: {
      title: "Redaguokite savo skelbimą"
    },
    delete: {
      confirmTitle: "Ar tu tuo tikras?"
    },
    fields: {
      title: "Pavadinimas",
      description: "Turinys",
      startAt: "Pradžios data"
    }
  },
  boards: {
    title: "Sistema",
    allBoards: "Visos lentos",
    createAction: "Pridėti masyvą",
    editAction: "išsaugoti pakeitimus",
    boardCreated: "Lenta pridėta",
    boardUpdated: "Pakeitimai įgyvendinti",
    boardRemoved: "Lenta nuimta",
    noData: "Čia dar nieko nėra...",
    noDataTitle: "Nėra duomenų",
    addSubdirectory: "Pridėkite pakatalogią",
    addItem: "Pridėti elementą",
    backToParent: "Grįžk",
    colors: {
      PRIMARY: "Pagrindinis",
      PRIMARY_LIGHTER: "Pagrindinis (lengvesnis)",
      ORANGE: "Oranžinė",
      GREEN: "Žalias",
      RED: "Raudona"
    },
    create: {
      title: "Pridėti masyvą"
    },
    edit: {
      title: "Redaguokite lentą"
    },
    delete: {
      confirmTitle: "Ar tu tuo tikras?",
      confirmDesc: "Ar tikrai norite ištrinti šią lentą? "
    },
    fields: {
      name: "vardas",
      description: "Turinys",
      icon: "Piktograma",
      supportedLanguages: "Palaikomos kalbos",
      supportedRoles: "Palaikomi vaidmenys",
      color: "Spalva"
    },
    icons: {
      HEART: "Širdis",
      LIKE: "Kaip",
      STATS: "Statistika",
      CONFIG: "Pavara",
      WORKSHOP: "Treniruotės",
      INFO: "informacija",
      FB: "Facebook",
      INSTAGRAM: "Instagramas",
      SPORT: "Sportas",
      MEDITATION: "Meditacija",
      CHAT: "Pokalbis",
      TROPHY: "Trofėjus",
      STAR: "Žvaigždė",
      CHALLENGE: "Iššūkis",
      MAIL: "Įrašas",
      CALENDAR: "Kalendorius",
      VIDEO: "Vaizdo įrašas",
      BOOK: "Knyga",
      PAPER: "Lapas",
      LINK: "Nuoroda",
      FILE: "Failas",
      TEXT: "Tekstas",
      PLUS: "Pliusas",
      MINUS: "Minusas",
      CHECK: "Patikrinti",
      MUSIC: "Muzika",
      CROSS: "Kirsti",
      ARROW_LEFT: "Rodyklė kairėn",
      ARROW_RIGHT: "Rodyklė dešinėn",
      ARROW_UP: "Rodyklė aukštyn",
      ARROW_DOWN: "Rodyklė žemyn",
      LOCK_OPEN: "Atidarykite spyną",
      LOCK_CLOSED: "Uždaryta spyna",
      PIN: "Smeigtukas",
      PIN_TWO: "2 kaištis",
      CHART_UP: "Grafikas",
      CHART_DOWN: "Grafikas žemyn",
      CHART_ALT: "Alternatyvi diagrama",
      TOOLS: "Įrankiai",
      BOMB: "Bomba",
      DYNAMITE: "Dinamitas",
      DIAMOND: "Deimantas",
      CASH: "Grynieji pinigai",
      CASH_TWO: "Grynieji pinigai 2",
      GOLD: "Auksas",
      BUS: "Autobusas",
      CAR: "Automobilis",
      TAXI: "Taksi",
      BOAT: "Lodzė",
      PLANE: "Lėktuvas",
      BIKE: "Dviratis",
      SMARTPHONE: "Išmanusis telefonas",
      LAPTOP: "Nešiojamas kompiuteris",
      DESKTOP: "Darbalaukis",
      PHONE_OLD: "Senas telefonas",
      KEYBOARD: "Klaviatūra",
      CAMERA: "Fotoaparatas",
      COMPASS: "Kompasas",
      ALARM: "Signalizacija",
      WOMAN: "Moteris",
      MAN: "Vyras",
      HOME: "Namas",
      BELL: "varpas",
      ACADEMY: "Akademija",
      CERTIFICATE: "Sertifikatas",
      LIST: "Sąrašas",
      MOVIE: "Filmas",
      PROFILE: "Profilis",
      CROWN: "Karūna",
      KEY: "Raktas",
      PATHS: "Keliai",
      USERS: "Vartotojai",
      NOTIFICATION: "Pranešimas",
      EXIT: "Išeiti",
      CART: "Krepšelis",
      FILES: "Failai",
      FIRE: "Liepsna"
    },
    items: {
      chooseType: "Pasirinkite variantą",
      createAction: "Pridėti elementą",
      editAction: "išsaugoti pakeitimus",
      itemCreated: "Elementas buvo pridėtas",
      itemUpdated: "Pakeitimai įgyvendinti",
      itemRemoved: "Elementas buvo ištrintas",
      tabs: {
        basicData: "Pagrindinis",
        videos: "Vaizdo įrašas",
        files: "Failai",
        images: "Grafika"
      },
      create: {
        title: "Pridėti elementą"
      },
      edit: {
        title: "Redaguoti elementą"
      },
      delete: {
        confirmTitle: "Ar tu tuo tikras?",
        confirmDesc: "Ar tikrai norite ištrinti šį elementą? "
      },
      fields: {
        name: "vardas",
        link: "Nuoroda",
        file: "Failas",
        text: "Teksto turinys",
        icon: "Piktograma",
        supportedLanguages: "Palaikomos kalbos",
        supportedRoles: "Palaikomi vaidmenys"
      },
      contentTypes: {
        link: "Nuoroda",
        file: "Failas",
        text: "Teksto turinys"
      },
      copyLink: "Nukopijuoti nuorodą",
      linkCopied: "Nuoroda nukopijuota",
      downloadFile: "Atsisiųsti failą",
      copyText: "Nukopijuokite tekstą",
      textCopied: "Tekstas nukopijuotas"
    }
  },
  movies: {
    title: "Filmų duomenų bazė",
    categories: {
      title: "Kategorijos",
      createAction: "Pridėti kategoriją",
      editAction: "išsaugoti pakeitimus",
      categoryCreated: "Kategorija buvo pridėta",
      categoryUpdated: "Pakeitimai įgyvendinti",
      categoryRemoved: "Kategorija buvo ištrinta",
      create: {
        title: "Pridėti kategoriją"
      },
      edit: {
        title: "Redaguoti kategoriją"
      },
      delete: {
        confirmTitle: "Ar tu tuo tikras?",
        confirmDesc: "Ar tikrai norite ištrinti šią kategoriją? "
      },
      fields: {
        name: "vardas",
        description: "apibūdinimas"
      }
    },
    createAction: "Pridėti vaizdo įrašą",
    editAction: "išsaugoti pakeitimus",
    movieCreated: "Vaizdo įrašas buvo pridėtas",
    movieUpdated: "Pakeitimai įgyvendinti",
    movieRemoved: "Vaizdo įrašas pašalintas",
    noData: "Čia dar nieko nėra...",
    noDataTitle: "Nėra duomenų",
    addSubcategory: "Pridėti subkategoriją",
    addMovie: "Pridėti vaizdo įrašą",
    backToParent: "Grįžk",
    create: {
      title: "Pridėti vaizdo įrašą"
    },
    edit: {
      title: "Redaguoti vaizdo įrašą"
    },
    delete: {
      confirmTitle: "Ar tu tuo tikras?",
      confirmDesc: "Ar tikrai norite ištrinti šį vaizdo įrašą? "
    },
    fields: {
      name: "vardas",
      description: "apibūdinimas",
      link: "Nuoroda"
    }
  },
  programs: {
    title: "Programos",
    allPrograms: "Visos programos",
    createAction: "Pridėti programą",
    editAction: "išsaugoti pakeitimus",
    programCreated: "Programa buvo pridėta",
    programUpdated: "Pakeitimai įgyvendinti",
    programRemoved: "Programa pašalinta",
    timeToStart: "Jūsų programa netrukus prasidės!<br> Laikas pradėti <strong>{0}</strong> tai...",
    create: {
      title: "Pridėti programą",
      desc: "Šiame skydelyje galite pridėti naują programą, bet be konkretaus pamokos plano. "
    },
    edit: {
      title: "Redaguoti programą"
    },
    delete: {
      confirmTitle: "Ar tu tuo tikras?",
      confirmDesc: "Ar tikrai norite pašalinti šią programą? "
    },
    fields: {
      name: "vardas",
      description: "apibūdinimas",
      contract: "Sutartis",
      poster: "Grafika",
      days: "Trukmė"
    },
    day: {
      title: "{0} diena",
      editAction: "išsaugoti pakeitimus",
      success: {
        edit: "Sėkmė!",
        editDesc: "Aprašymas buvo atnaujintas"
      },
      fields: {
        challengesDescription: "Dienos aprašymas",
        summaryDescription: "Dienos santrauka"
      },
      challenges: {
        createAction: "Pridėkite iššūkį",
        editAction: "išsaugoti pakeitimus",
        listDesc: "Visi sąrašo pakeitimai atnaujinami realiuoju laiku.",
        create: {
          title: "Pridėkite iššūkį"
        },
        edit: {
          title: "Redaguoti iššūkį"
        },
        fields: {
          title: "Pavadinimas",
          description: "apibūdinimas",
          type: "Tipas",
          optional: "Neprivaloma",
          optionalDesc: "Ar vartotojas gali praleisti šį iššūkį? ",
          typeVariants: {
            PROSPECTING: "Žvalgymas",
            APPOINTMENT: "Vietinis susitikimas.",
            WEBINAR: "Webinaras",
            FOLLOW_UP: "Sekti",
            MEETING: "Susitikimas",
            WORKSHOP: "Treniruotės",
            INFO: "informacija",
            FB: "FB veikla",
            INSTAGRAM: "„Instagram“ veikla",
            SOCIAL_MEDIA: "Aktyvumas sergant MS",
            SPORT_ACTIVITY: "Fizinė veikla"
          }
        }
      }
    }
  },
  join: {
    title: "Sveiki!",
    createAction: "Prisijunk",
    desc: "Informaciniame susitikime pasirinkite jums patikusią parinktį.",
    chooseAccountType: "Pasirinkite paskyros tipą",
    firstTimeDesc: "Jūsų laukia pirmosios treniruotės! ",
    fields: {
      firstName: "vardas",
      lastName: "Pavardė",
      email: "paštas"
    }
  },
  chooseProgram: {
    title: "Pasirinkite programą",
    signContract: "Pasirašykite sutartį",
    desc: "Dėmesio! ",
    startAction: "Prašyti aktyvavimo",
    signContractAction: "Pasirašykite sutartį",
    requestAlreadySent: {
      title: "Laukti... :)",
      desc: "Jūsų prašymas suaktyvinti kursą ar programą jau išsiųstas. "
    },
    alreadyInProgress: {
      title: "Ne dabar! ",
      desc: "Vienas kursas ar programa jau vyksta. "
    },
    programs: {
      title: "Programos",
      startProgram: "Prašyti programos aktyvavimo",
      youHaveToSignContract: "Norėdami prašyti aktyvuoti programą, pirmiausia turite pasirašyti sutartį."
    },
    courses: {
      title: "Kursai",
      startCourse: "Prašyti kurso aktyvavimo",
      youHaveToSignContract: "Norėdami prašyti aktyvuoti kursą, pirmiausia turite pasirašyti sutartį."
    },
    success: {
      title: "Sėkmė!",
      desc: "Jūsų globėjas buvo informuotas apie jūsų prašymą. "
    }
  },
  films: {
    title: "Filmų duomenų bazė"
  },
  languages: {
    pl: "lenkas",
    en: "Anglų",
    uk: "ukrainiečių",
    de: "vokiečių kalba"
  },
  roles: {
    title: "Vaidmenys",
    saveAction: "išsaugoti pakeitimus",
    saved: "Pakeitimai įgyvendinti",
    permissions: {
      adminPanelAccess: "Prieiga prie administravimo skydelio (administratorius)",
      adminUsersRead: "Skaityti naudotojus (administratorius)",
      adminUsersEdit: "Naudotojų redagavimas (administratorius)",
      adminUsersRemove: "Naudotojų ištrynimas (administratorius)",
      adminUsersActivate: "Vartotojo aktyvinimas (administratorius)",
      adminWorkshopsRead: "Skaitymo mokymas (adminas)",
      adminWorkshopsEdit: "Redagavimo mokymas (administratorius)",
      adminWorkshopsRemove: "Treniruotės ištrynimas (administratorius)",
      adminWorkshopsCreate: "Kurti mokymus (adminas)",
      adminMenuLinksRead: "Skaitymo meniu nuorodos (administratorius)",
      adminMenuLinksEdit: "Meniu nuorodų redagavimas (administratorius)",
      adminMenuLinksRemove: "Meniu nuorodų šalinimas (administratorius)",
      adminMenuLinksCreate: "Meniu nuorodų kūrimas (administratorius)",
      adminUsefulLinksRead: "Skaityti naudingas nuorodas (admin)",
      adminUsefulLinksEdit: "Naudingų nuorodų redagavimas (administratorius)",
      adminUsefulLinksRemove: "Naudingų nuorodų šalinimas (administratorius)",
      adminUsefulLinksCreate: "Naudingų nuorodų kūrimas (adminas)",
      adminPagesRead: "Antrinių puslapių skaitymas (administratorius)",
      adminPagesEdit: "Antrinių puslapių redagavimas (administratorius)",
      adminPagesRemove: "Antrinių puslapių trynimas (administratorius)",
      adminPagesCreate: "Antrinių puslapių kūrimas (administratorius)",
      adminWebinarsRead: "Internetinių seminarų skaitymas (administratorius)",
      adminWebinarsEdit: "Internetinių seminarų redagavimas (administratorius)",
      adminWebinarsRemove: "Internetinių seminarų trynimas (administratorius)",
      adminWebinarsCreate: "Internetinių seminarų kūrimas (administratorius)",
      adminRolesRead: "Skaityti vaidmenis (administratorius)",
      adminRolesEdit: "Vaidmenų redagavimas (administratorius)",
      adminAnnouncementsRead: "Skelbimų skaitymas (adminas)",
      adminAnnouncementsEdit: "Skelbimų redagavimas (administratorius)",
      adminAnnouncementsRemove: "Skelbimų trynimas (administratorius)",
      adminAnnouncementsCreate: "Skelbimų kūrimas (administratorius)",
      adminNotificationsRead: "Pranešimų skaitymas (administratorius)",
      adminNotificationsEdit: "Pranešimų redagavimas (administratorius)",
      adminCustomNotificationsRead: "Priskirtų pranešimų skaitymas (administratorius)",
      adminCustomNotificationsEdit: "Priskirtų pranešimų redagavimas (administratorius)",
      adminCustomNotificationsRemove: "Pasirinktinių pranešimų ištrynimas (administratorius)",
      adminCustomNotificationsCreate: "Priskirtų pranešimų kūrimas (administratorius)",
      adminProtegesPromoteToLEADER: "Partnerio paaukštinimas iki lyderio (admin)",
      adminProtegesPromoteToADMIN: "Lyderio paaukštinimas į administratorių (admin)",
      adminProtegesDemoteToLEADER: "Administratoriaus pažeminimas į lyderį (admin)",
      adminProtegesDemoteToPARTNER: "Lyderio pažeminimas į partnerį (admin)",
      adminProtegesChangeMentor: "Partnerio globėjo (admin) keitimas",
      adminProductsRead: "Skaityti produktus (administratorius)",
      adminProductsEdit: "Produkto leidimas (administratorius)",
      adminProductsRemove: "Produktų ištrynimas (administratorius)",
      adminProductsCreate: "Produkto kūrimas (administratorius)",
      adminProductsCategoryRead: "Produktų kategorijų skaitymas (administratorius)",
      adminProductsCategoryEdit: "Produktų kategorijų redagavimas (administratorius)",
      adminProductsCategoryRemove: "Produkto kategorijos ištrynimas (administratorius)",
      adminProductsCategoryCreate: "Produktų kategorijų kūrimas (administratorius)",
      customWorkshopsRead: "Skaitykite savo mokymo kursus",
      customWorkshopsEdit: "Redaguokite savo mokymą",
      customWorkshopsRemove: "Savo mokymo kursų ištrynimas",
      customWorkshopsCreate: "Savo mokymų kūrimas",
      protegesInvite: "Kviečiame partnerius",
      protegesRead: "Skaitymo partneriai",
      protegesRemove: "Partnerių pašalinimas",
      workshopsRead: "Skaitymo mokymas",
      workshopsCreate: "Treniruočių kūrimas",
      webinarsAccess: "Prieiga prie internetinių seminarų",
      productsAccess: "Prieiga prie produktų",
      adminPostsRead: "Įrašų skaitymas (administratorius)",
      adminPostsEdit: "Įrašų redagavimas (administratorius)",
      adminPostsRemove: "Įrašų trynimas (administratorius)",
      adminPostsCreate: "Įrašų kūrimas (administratorius)",
      adminCertificatesRead: "Sertifikatų skaitymas (administratorius)",
      adminCertificatesEdit: "Sertifikatų redagavimas (administratorius)",
      adminCertificatesRemove: "Sertifikatų trynimas (administratorius)",
      adminCertificatesCreate: "Sertifikatų kūrimas (administratorius)",
      adminFaqsRead: "Skaityti DUK (administratorius)",
      adminFaqsEdit: "Redaguoti DUK (administratorius)",
      adminFaqsRemove: "DUK ištrynimas (administratorius)",
      adminFaqsCreate: "DUK kūrimas (administratorius)",
      adminCandidateQuizRead: "Skaityti kandidatų viktorinas (admin)",
      adminCandidateQuizEdit: "Kandidatų viktorinų redagavimas (administratorius)",
      adminCandidateQuizRemove: "Kandidatų viktorinų trynimas (administratorius)",
      adminCandidateQuizCreate: "Kandidatų viktorinų kūrimas (administratorius)",
      adminSystemPersonalizationRead: "Skaitymo sistemos personalizavimas (administratorius)",
      adminSystemPersonalizationEdit: "Sistemos personalizavimo redagavimas (administratorius)",
      protegesChangeMentor: "Partnerio globėjo pasikeitimas",
      chatAccess: "Prieiga prie pokalbių",
    }
  },
  courseChallenges: {
    title: "{0} diena",
    challenges: {
      title: "Šiandienos iššūkiai"
    },
    summary: {
      success: {
        title: "Sveikiname!"
      },
      failure: {
        title: "Deja...",
        description: "<p>Apgailestaujame, kad neįgyvendinate to, dėl ko susitarėme.</p><p>Atminkite, kad jūs nuspręsite, kaip atrodys jūsų ateitis. </p><p>Tačiau viskas priklauso nuo jūsų įsipareigojimo – be jo mes negalėsime jums padėti.</p><p>Bet... laikyk galvą aukštyn! <strong>Rytoj irgi diena</strong> :)</p><p>Tegul tai būna tavo nauja pradžia!</p>"
      }
    }
  },
  programChallenges: {
    challenges: {
      title: "Šiandienos iššūkiai"
    },
    summary: {
      success: {
        title: "Sveikiname!",
        progress: "<p><strong>Šiandien atlikote {0} % savo užduočių</strong></p>"
      },
      failure: {
        title: "Deja...",
        description: "<p>Apgailestaujame, kad neįgyvendinate to, dėl ko susitarėme.</p><p>Atminkite, kad jūs nuspręsite, kaip atrodys jūsų ateitis. </p><p>Tačiau viskas priklauso nuo jūsų įsipareigojimo – be jo mes negalėsime jums padėti.</p><p>Bet... laikyk galvą aukštyn! <strong>Rytoj irgi diena</strong> :)</p><p>Tegul tai būna tavo nauja pradžia!</p>",
        progress: "<p><strong>Jūsų rezultatas šiandien yra tik {0}% :(</strong></p>"
      }
    }
  },
  usefulLinks: {
    title: "Naudingos nuorodos"
  },
  currentProgram: {
    title: "Dabartinė programa"
  },
  currentCourse: {
    title: "Dabartinis kursas"
  },
  offline: {
    title: "Nėra interneto ryšio",
    description: "Patikrinkite ryšį ir bandykite dar kartą."
  },
  workInProgress: {
    title: "Modernizuojama",
    description: "Atsiprašome už nepatogumus. "
  },
  personalizedContent: {
    title: "Sistemos turinio personalizavimas",
    contentUpdated: "Turinys atnaujintas",
    fields: {
      name: "Vardas (identifikatorius)",
      title: "Pavadinimas",
      content: "Turinys"
    },
    editAction: "Išsaugoti pakeitimus",
    edit: {
      title: "Redaguoti turinį"
    }
  },
  candidateQuiz: {
    start: "Pradėti",
    goToQuiz: "Eiti į viktoriną",
    checkAnswers: "Patikrinkite atsakymus",
    requiredMinScore: "Perėjimo slenkstis yra ",
    goFurther: "Eik toliau",
    refresh: "Bandyk iš naujo"
  },
  newsletter: {
    fields: {
      firstName: "Pirmas vardas",
      lastName: "Pavardė",
      email: "paštas"
    },
    error: "Užpildykite visus laukus!",
    errorDescription: "Visi laukai yra privalomi...",
    subscribed: "Užsiprenumeravote naujienlaiškį!",
    subscribedDescription: "Ačiū :)",
    goToApp: "Eikite į programą"
  }
}