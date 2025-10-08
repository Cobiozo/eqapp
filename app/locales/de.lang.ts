const globalConfig = {
  mails: {
    footer: `
    <p></p>
    <p>Grüße,

    EQApp Team</p>
    `,
  }
}

export default {
  setup: {
    title: "Willkommen bei EQApp!",
    chooseLanguage: "Wählen Sie Ihre Sprache",
    thisSeetingCanBeLaterChanged: "Diese Einstellungen können später geändert werden.",
    signUpForNewsletter: "Melden Sie sich für den Newsletter an",
    skip: "Überspringen",
    subscribe: "Abonnieren",
    langNotSupported: "Die ausgewählte Sprache wird nicht unterstützt.",
  },
  whatAmIDoingHere: {
    title: "Schön, Sie kennenzulernen :)",
    content: "Es scheint, dass Sie uns ohne Weiterempfehlung besucht haben. Erzählen Sie uns, wer hat Ihnen von uns erzählt? Wie sind Sie hierher gekommen? :)",
    skip: "Zur App gehen",
    fields: {
      content: "Inhalt",
      name: "Name",
      email: "E-Mail Adresse",
      phone: "Telefonnummer",
    },
    messageSent: "Die Nachricht wurde gesendet!",
    messageSentDescription: "Vielen Dank, dass Sie die Informationen geteilt haben! Jetzt können Sie zur App gehen :)",
    goToApp: "Zur App gehen",
    error: "Fehler",
    errorDescription: "Ein Fehler ist aufgetreten. Füllen Sie die fehlenden Felder aus.",
  },
  joinUs: {
    title: "Kontaktieren Sie uns",
    fields: {
    name: "Name",
    email: "E-Mail",
    phone: "Telefonnummer",
    content: "Nachricht",
    },
    error: "Füllen Sie die erforderlichen Felder aus",
    errorDescription: "Alle Felder müssen ausgefüllt werden.",
    messageSent: "Nachricht gesendet!",
    messageSentDescription: "Vielen Dank für Ihre Kontaktaufnahme! Wir melden uns garantiert bei Ihnen :)",
  },
  clients: {
    links: {
      home: "Zuhause",
      services: "Dienstleistungen",
      webinars: "Webinare",
      products: "Produkte",
      contact: "Kontakt",
      articles: "Artikel",
      shop: "Geschäft",
      aboutUs: "Über uns",
      cookies: "Cookies",
      partnerZone: "Partnerzone",
    },
    why: {
      title: "Warum Eqology?",
      learnMore: "Willkommen!",
      slogan: "Zertifikate/Forschung/Artikel"
    },
    splash: {
      healthProtect: "Wir kümmern uns um Ihre Gesundheit!",
      goToShop: "Treffen Sie unsere Produkte",
    },
    products: {
      title: "Unsere Produkte",
      ourProducts: "Unsere Produkte",
      fromProducer: "Vom Hersteller",
      deliveryInTwoDays: "Lieferung in zwei Tagen",
      buyNow: "Jetzt kaufen",
      theChoiceIsYours: "Die Wahl liegt bei Ihnen!",
      shop: "SHOP!"
    },
    contact: {
      title: "Kontaktiere uns",
      sendUsEmail: "Senden Sie uns eine E-Mail",
    },
    whatAmIDoingHere: {
      title: "Schön, Sie kennenzulernen!",
      content: "Es scheint, dass Sie uns ohne Weiterempfehlung besucht haben. Erzählen Sie uns, wer hat Ihnen von uns erzählt? Wie sind Sie hierher gekommen? :)",
    },
    posts: {
      readMore: "Lesen Sie mehr!",
      readMe: "Lesen Sie mich",
      title: "Artikel",
      description: "Die Datenbank mit Artikeln wird noch aktualisiert. Bald werden neue Artikel und Videos mit Spezialisten erscheinen.",
    },
    faqs: {
      title: "Häufig gestellte Fragen",
    },
    whyUs: {
      slogan: "Die höchste Weltqualität ist das WICHTIGSTE für uns!",
      certificates: "Zertifikate",
      products: "Produkte",
      faq: "Häufig gestellte Fragen",
    },
    certificates: {
      title: "Vertrauen Sie den Experten",
      description: "Unsere Produkte wurden wiederholt geprüft, getestet und ausgezeichnet. Unsere Qualität ist unbestreitbar.",
      slogan: "Wählen Sie weise - <strong>wählen Sie Eqologie</strong>.",
      seeMore: "Mehr sehen",
    },
    meetOurProducts: {
      title: "Treffen Sie unsere Produkte",
      goToShop: "Zum Geschäft gehen",
    },
    webinars: {
      businessWebinars: "Geschäfts-Webinare",
      clientWebinars: "Kunden-Webinare",
      register: "Registrieren",
      noData: "Keine Webinare gefunden... Besuchen Sie uns bald!",
      subscribe: "Abonnieren",
      success: {
        title: "Erfolg!",
        description: "Erfolg! Jetzt müssen Sie nur noch in Ihr Postfach gehen, Ihre E-Mail bestätigen und... wir sehen uns beim Webinar! :)",
      },
      youHaveToVerify: {
        title: "Sie müssen Ihre E-Mail verifizieren",
        description: "Bevor Sie sich für das Webinar anmelden können, müssen Sie Ihre E-Mail verifizieren. Überprüfen Sie Ihr Postfach und bestätigen Sie Ihre E-Mail-Adresse.",
      },
      invitationExpired:{
        title: "Oops...",
        description: "Einladung abgelaufen oder Webinar abgesagt.",
      },
    }
  },
  common: {
    share: "Teilen",
    goTop: "Nach oben gehen",
    languages: {
      intl: "Alle Sprachen",
      pl: "Polnisch",
      en: "Englisch",
      uk: "Ukrainisch",
      lt: "Litauisch",
      de: "Deutsch",
    },
    weekDays: {
      1: "Montag",
      2: "Dienstag",
      3: "Mittwoch",
      4: "Donnerstag",
      5: "Freitag",
      6: "Samstag",
      7: "Sonntag",
    },
    weekDaysShort: {
      1: "Mo",
      2: "Di",
      3: "Mi",
      4: "Do",
      5: "Fr",
      6: "Sa",
      7: "So",
    },
    months: {
      1: "Januar",
      2: "Februar",
      3: "März",
      4: "April",
      5: "Mai",
      6: "Juni",
      7: "Juli",
      8: "August",
      9: "September",
      10: "Oktober",
      11: "November",
      12: "Dezember",
    },
    submit: "Abschicken",
    save: "Speichern",
    goBack: "Zurückgehen",
    file: "Datei",
    language: "Sprache",
    none: "Keine",
    return: "Zurück",
    error: "Fehler",
    changeSpeed: "Geschwindigkeit ändern",
    goBackToHome: "Zurück zum Start",
    noData: "Keine Daten",
    noDataDesc: "Keine Daten zum Anzeigen",
    noDataFound: "Keine Ergebnisse",
    noDataFoundDesc: "Keine Ergebnisse für Ihre Suchanfrage gefunden.",
    notFound: "Nicht gefunden",
    unexpectedError: "Unerwarteter Fehler",
    unexpectedErrorDescription: "Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.",
    unauthorized: "Nicht autorisiert",
    unauthorizedDescription: "Sie sind nicht berechtigt, diese Seite anzuzeigen.",
    somethingWentWrong: "Etwas ist schief gelaufen",
    somethingWentWrongDescription: "Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.",
    noInternet: "Keine Internetverbindung",
    noInternetDescription: "Bitte überprüfen Sie Ihre Internetverbindung und versuchen Sie es erneut.",
    badRequest: "Ungültige Anfrage",
    badRequestDescription: "Die Anfrage enthält ungültige Daten.",
    chosen: "Ausgewählt",
    confirm: "Bestätigen",
    cancel: "Abbrechen",
    edit: "Bearbeiten",
    close: "Schließen",
    create: "Erstellen",
    remove: "Entfernen",
    search: "Suchen...",
    searchResults: "Suchergebnisse",
    select: "Auswählen",
    addAttachment: "Anhang hinzufügen",
    translations: "Übersetzungen",
    categories: "Kategorien",
    category: "Kategorie",
    currentBrowsing: "Derzeitiges Durchsuchen",
    otherTranslations: "Andere Übersetzungen",
    addTranslation: "Übersetzung hinzufügen",
    relatedFiles: "Verwandte Dateien",
    relatedImages: "Verwandte Bilder",
    relatedVideos: "Verwandte Videos",
    schedule: "Zeitplan",
    challenges: "Herausforderungen",
    days: "Tage",
    hours: "Stunden",
    minutes: "Minuten",
    seconds: "Sekunden",
    ready: "Bereit zum Loslegen!",
    motivate: "Motiviere dich :)",
    watch: "Schauen",
    validation: {
      dateInPast: "Das Datum kann nicht in der Vergangenheit liegen",
      errorsExist: "Fehler sind aufgetreten...",
      required: "Dieses Feld ist erforderlich",
      minLength: "Mindestzeichenanzahl ist {0}",
      maxLength: "Max. Zeichenanzahl ist {0}",
      minArrayLength: "Mindestens {0} Artikel",
      maxArrayLength: "Maximal {0} Artikel",
      min: "Mindestwert ist {0}",
      max: "Maximalwert ist {0}",
      isEmail: "Ungültige E-Mail-Adresse",
      isNumber: "Dies muss eine Zahl sein",
      passwordRepeat: "Die Passwörter stimmen nicht überein",
      pattern: "Ungültiges Format",
      invalidType: "Ungültiger Typ",
      imageType: "Unterstützte Formate sind {0}",
      imagesType: "Mindestens ein Bild hat ein ungültiges Format (unterstützte Formate: {0}",
      filesSize: "Mindestens eine Datei hat eine ungültige Größe (max. {0} MB)",
      fileSize: "Maximale Dateigröße beträgt {0} MB",
      imageSize: "Das Bild hat ungültige Abmessungen oder Proportionen",
      select: "Ungültige Option",
      date: "Ungültiges Datum",
      dataList: "Ausgewählte Werte sind nicht zulässig",
      dateEndTooEarly: "Das Enddatum muss nach dem Startdatum liegen",
      wysiwygNoFiles: "Keine Dateiinformationen für WYSIWYG-Feld bereitgestellt",
      wysiwygImagesAmount:
        "Die Anzahl der hochgeladenen Bilder entspricht nicht der erwarteten Anzahl (WYSIWYG-Feld)",
      notFound: "Der angeforderte Artikel konnte nicht gefunden werden",
      fileUploadError:
        "Fehler beim Hochladen der Datei, möglicherweise ist die Datei zu groß. Die maximale Dateigröße beträgt {0} MB",
      fileType: "Ungültiges Dateiformat (unterstützte Formate: {0})",
      multiLangRequired: "Basistranslation fehlt",
      emailRepeat: "E-Mail-Adressen stimmen nicht übere"
    },
    roles: {
      CLIENT: "Kunde",
      ADMIN: "Administrator",
      LEADER: "Anführer",
      PARTNER: "Partner",
      CANDIDATE_PARTNER: "Kandidat für Partner",
    },
  },
  dashboard: {
    welcome: "Willkommen auf der Schulungsplattform!",
    welcomeMessage: "<p>Wir freuen uns, diese Reise gemeinsam anzutreten. Alle erforderlichen Schulungsmaterialien befinden sich nun an einem Ort, was es für uns alle einfacher macht, den Fortschritt zu verfolgen und unsere Ziele zu erreichen. Wir hoffen, dass dies für uns alle eine einzigartige Lernerfahrung sein wird!</p><p>Beste Grüße und viel Glück</p><p>Estera und Kamil Hanasz</p>"
  },
  mails: {
    unverifiedAccountRemoved: {
      subject: "Ihr Konto wurde gelöscht",
      text: `
        <p>Hallo,</p>
        <p>Da Ihre E-Mail-Adresse nicht innerhalb von 12 Stunden nach der Registrierung verifiziert wurde, wurde Ihr Konto gelöscht :(</p>
        <p>Bitte registrieren Sie sich erneut!</p>
        ${globalConfig.mails.footer}
      `
    },
    verificationReminder: {
      subject: "Willkommen bei der App :)",
      text: `
        <p>Hallo,</p>
        <p>Wir möchten Sie daran erinnern, dass Ihr Konto bereits aktiv ist.</p>
        <p>Wenn Sie sich also noch nicht angemeldet haben, laden wir Sie ein, die App zu nutzen :)</p>
        <p>Sie können Ihre Partner gerne schon jetzt einladen.</p>
        <p>Bis bald!</p>
        ${globalConfig.mails.footer}
      `
    },
    confirmWorkshopEmail: {
      subject: "E-Mail-Adresse bestätigen",
      text: `
        <p>Hallo,</p>
        <p>Vielen Dank für Ihr Interesse an unseren Webinaren! Um Ihre E-Mail-Adresse zu verifizieren und fortzufahren, klicken Sie bitte auf den folgenden Link.</p>
        <p><strong><a href="{0}">Hier klicken</a></strong></p>
        ${globalConfig.mails.footer}
      `
    },
    contactMail: {
      subject: "Neue Nachricht zur Zusammenarbeit",
      text: `
        <p>Hallo,</p>
        <p>Es sieht so aus, als möchte jemand Kontakt mit Ihnen aufnehmen :)</p>
        <strong>{0}</strong></p>
        <p>Nachricht:</p>
        <p><em>{1}</em></p>
        ${globalConfig.mails.footer}
      `
    },
    unexpectedVisitMail: {
      subject: "Unerwarteter Besuch",
      text: `
        <p>Hallo,</p>
        <p>Es sieht so aus, als hätte jemand unsere Website besucht, ohne von einem unserer Partner weitergeleitet zu werden. Wir haben sie gefragt, wie sie uns gefunden haben. Ihre Antwort lautet:</p>
        <p><em>{0}</em></p>
        <p>Seine Daten sind <strong>{1}</strong></p>
        ${globalConfig.mails.footer}
      `
    },
    webinarStartsInTenMinutes: {
      subject: "Es geht gleich los!",
      text: `
        <p>Das Webinar <strong>{0}</strong> beginnt in 10 Minuten!</p>
        <p>Klicken Sie <strong><a href="{1}">hier</a></strong>, um jetzt beizutreten.</p>
        <p>Bis gleich! :)</p>
        ${globalConfig.mails.footer}
      `
    },
    webinarStartsInOneHour: {
      subject: "Der Countdown läuft...",
      text: `
        <p>Das Webinar <strong>{0}</strong> startet in einer Stunde!</p>
        <p>Hier ist Ihr personalisierter Link für die Veranstaltung:</p>
        <p><strong><a href="{1}">Klicken Sie hier</a></strong></p>
        <p>Bis gleich! :)</p>
        ${globalConfig.mails.footer}
      `
    },
    webinarStartsNow: {
      subject: "Los geht's! :)",
      text: `
        <p>Das Webinar <strong>{0}</strong> beginnt jetzt.</p>
        <p>Klicken Sie <strong><a href="{1}">hier</a></strong>, um beizutreten.</p>
        <p>Wir freuen uns auf Sie! :)</p>
        ${globalConfig.mails.footer}
      `
    },
    webinarConfirmation: {
      subject: "Webinar bestätigt! :)",
      text: `
        <p>Hallo,</p>
        <p>Ihr Platz im Webinar wurde bestätigt! :)</p>
        <p>Wir erwarten Sie um <strong>{0}</strong> über diesen <strong><a target="_blank" href="{1}">Link</a></strong></p>
        ${globalConfig.mails.footer}
      `
    },
    confirmEmail: {
      subject: "Bestätigen Sie Ihre E-Mail-Adresse",
      text: `
        <p>Hallo,</p>
        <p>Vielen Dank für Ihre Registrierung! Bitte bestätigen Sie Ihre E-Mail-Adresse, indem Sie auf den folgenden Link klicken:</p>
        <p><strong><a href="{0}">Klicken Sie hier</a></strong></p>
        ${globalConfig.mails.footer}
      `
    },
    waitForActivationEmail: {
      subject: "Warten auf Aktivierung",
      text: `
        <p>Hallo,</p>
        <p>Ihr Konto wurde erfolgreich erstellt und Ihre E-Mail-Adresse wurde verifiziert.</p>
        <p>Jetzt müssen Sie nur noch auf die Aktivierung durch den Administrator warten.</p>
        <p>Keine Sorge, das dauert nicht lange! ;) Vielen Dank für Ihre Geduld!</p>
        ${globalConfig.mails.footer}
      `
    },
    confirmWebinarEmail: {
      subject: "Bestätigen Sie Ihre E-Mail-Adresse für das Webinar",
      text: `
        <p>Hallo,</p>
        <p>Vielen Dank für Ihr Interesse an unserem Webinar! Bitte bestätigen Sie Ihre E-Mail-Adresse und Ihre Teilnahme, indem Sie auf den folgenden Link klicken:</p>
        <p><strong><a href="{0}">Klicken Sie hier</a></strong></p>
        ${globalConfig.mails.footer}
      `
    },
    webinarInvitation: {
      subject: 'Einladung zu "{0}"',
      text: `
        <p>Hallo,</p>
        <p>Wir haben eine personalisierte Einladung für Sie, an diesem Webinar teilzunehmen :)</p>
        <p><a target="_blank" href="{0}">Annehmen</a></p>
        ${globalConfig.mails.footer}
      `
    },
    userPromoted: {
      subject: "Beförderung! :)",
      text: `
      <p>Hallo,</p>
      <p>Ihr Mentor hat beschlossen, Sie zu befördern!</p>
      <p>Ihre neue Position ist <strong>{0}</strong>. Glückwunsch!</p>
      ${globalConfig.mails.footer}
      `
    },
    passwordReset: {
      subject: "Ihr Passwort wurde zurückgesetzt",
      text: `
      <p>Hallo,</p>
      <p>Wie von Ihnen angefordert, haben wir Ihr Passwort zurückgesetzt.</p>
      <p style="border: 0.3em solid #000; padding: 1em; width: fit-content;">Ihr neues Passwort lautet: <b>{0}</b></p>
      <p>Aus Sicherheitsgründen wird empfohlen, das Passwort nach der Anmeldung zu ändern.</p>
      <p></p>
      <p>Wenn Sie die Änderung des Passworts nicht angefordert haben, ignorieren Sie diese E-Mail bitte.</p>
      ${globalConfig.mails.footer}
      `
    },
    userActivated: {
      subject: "Ihr Konto wurde aktiviert",
      text: `
      <p>Hallo,</p>
      <p>Ihr Konto wurde aktiviert! :) Sie können sich jetzt anmelden und alle Vorteile unserer Anwendung in vollem Umfang nutzen.</p>
      <p>Gehen Sie zur Anwendung, indem Sie auf den folgenden Link klicken:</p>
      <p><a href="{0}">Anmelden</a></p>
      ${globalConfig.mails.footer}
      `
    },
    userInvited: {
      subject: "Einladung zur Registrierung",
      text: `
      <p>Hallo,</p>
      <p>Wir freuen uns, Sie bei uns begrüßen zu dürfen! :) Klicken Sie auf den folgenden Link, um sich in unserem System zu registrieren:</p>
      <p><a href="{0}">Registrieren</a></p>
      `
    },
    userRemoved: {
      subject: "Ihr Konto wurde entfernt",
      text: `
      <p>Hallo,</p>
      <p>Leider war die Überprüfung Ihres Kontos nicht erfolgreich und Ihr Konto wurde entfernt.</p>
      <p>Wenn Sie der Meinung sind, dass dies ein Fehler ist, kontaktieren Sie uns bitte.</p>
      ${globalConfig.mails.footer}
      `
    },
    contactJoinedMentor: {
      subject: "Sie haben einen neuen Partner!",
      text: `
      <p>Hallo,</p>
      <p>Glückwunsch! Sie haben einen neuen Partner! :)</p>
      <p>Sein Name ist {0}. Sie können seinen Fortschritt jederzeit im Administrationsbereich ("Partner" -Reiter) verfolgen.</p>
      ${globalConfig.mails.footer}
      `
    },
  },
  nav: {
    home: "Heim",
    webinars: "Webinare",
    products: "Produkte",
    shop: "Geschäft",
    contact: "Kontakt",
    partners: "Partner",
    clients: "Kunden",
    notifications: "Benachrichtigungen",
    films: "Filme",
    startup: "Inbetriebnahme 90 Tage",
    workshops: "Workshops",
    workshopsClient: "Kundenbereich",
    workshopsPartner: "Partnerbereich",
    myWorkshopsDescription: "Die hier enthaltenen Workshops sind nur für Ihre Partner zugänglich.",
    usefulLinks: "Nützliche Links",
    logout: "Ausloggen",
    login: "Anmeldung",
    register: "Registrieren",
    profile: "Profil bearbeiten",
    chooseProgram: "Programm auswählen",
    boards: "System",
    admin: "Administrationsmenü",
    partnerZone: "Partnerzone",
    slogans: {
      spirit: "Geist",
      passion: "Hingabe",
      togetherness: "Zusammengehörigkeit"
    },
    adminSubmenu: {
      webinars: "Webinare",
      users: "Benutzer",
      roles: "Rollen",
      workshops: "Workshops",
      proteges: "Schützlinge",
      notifications: "Benachrichtigungen",
      announcements: "Ankündigungen",
      pages: "Seiten",
      menuLinks: "Menülinks",
      products: "Produkte",
      posts: "Beiträge",
      certificates: "Zertifikate",
      faqs: "FAQ",
      systemContent: "Systeminhalt",
      candidateQuizes: "Kandidaten-Quiz"
    }
  },
  verifyEmail: {
    title: "E-Mail bestätigen",
    successTitle: "Erfolg!",
    successDescription: "Deine Emailadresse wurde bestätigt! "
  },
  register: {
    title: "Registrieren",
    createAction: "Registrieren",
    chooseMentor: "Wählen Sie einen Mentor",
    verifyCode: "Das ist fast alles...",
    codeIsWrong: "Der Code ist falsch",
    verifyMail: "Das ist fast alles! Wir müssen nur noch Ihre E-Mail-Adresse verifizieren. Überprüfen Sie Ihren Posteingang und klicken Sie auf den Link, den wir Ihnen gesendet haben.",
    contact: {
      desc: "Wir haben bereits Ihre E-Mail-Adresse, Ihren Vor- und Nachnamen. ",
      chooseRole: "Wählen Sie die Option, die am besten zu Ihrem Entwicklungspfad passt."
    },
    accountTypes: {
      client: "Klient",
      partner: "Partner"
    },
    fields: {
      email: "Email",
      emailRepeat: "Email wiederholen",
      password: "Passwort",
      passwordRepeat: "Passwort wiederholen",
      eqId: "EQOLOGY-ID",
      firstName: "Vorname",
      lastName: "Familienname, Nachname",
      avatar: "Benutzerbild",
      phone: "Telefonnummer",
      termsOfUse: "Ich bin mit der Verarbeitung meiner personenbezogenen Daten zur korrekten Überprüfung der Mitgliedschaft (polnisches Gesetzblatt von 2017, Pos. 1219) einverstanden und akzeptiere die <a class=\"link\" href=\"{0}\" target=\"_blank\">Geschäftsbedingungen</a> und stimmen zu, den Newsletter zu abonnieren.",
      saveToNewsletter: "Abonnieren Sie mich für den Newsletter",
      saveToNewsletterDescription: "Ich möchte Informationen über Neuigkeiten, Aktionen und von Eqology erhalten. ",
      emailConfirmation: "Ich habe mich vergewissert, dass die E-Mail-Adresse korrekt ist. Dies ist sehr wichtig, da Sie nach der Registrierung unbedingt auf den Aktivierungslink klicken müssen, den wir Ihnen senden werden.",
    },
    success: {
      create: "Erfolg!",
      createDesc: "Die Registrierung war erfolgreich! "
    },
    errors: {
      emailExists: "Ein Benutzer mit der angegebenen E-Mail-Adresse existiert bereits",
      eqIdExists: "Ein Benutzer mit der angegebenen EQOLOGY-Nummer existiert bereits",
      client: {
        emailExists: "Die angegebene E-Mail-Adresse wird bereits von einem anderen Kunden verwendet"
      }
    }
  },
  registerPartner: {
    title: "Registrieren",
    createAction: "Registrieren",
    fields: {
      email: "Email",
      password: "Passwort",
      passwordRepeat: "<PASSWORD>",
      oriflameId: "Oriflame-ID",
      firstName: "Vorname",
      lastName: "Familienname, Nachname",
      avatar: "Benutzerbild",
      termsOfUse: "Ich bin mit der Verarbeitung meiner personenbezogenen Daten zur korrekten Überprüfung der Mitgliedschaft (polnisches Gesetzblatt von 2017, Pos. 1219) einverstanden und akzeptiere die <a class=\"link\" href=\"{0}\" target=\"_blank\">Geschäftsbedingungen</a>."
    },
    success: {
      create: "Erfolg!",
      createDesc: "Die Registrierung war erfolgreich! "
    },
    errors: {
      emailExists: "Ein Benutzer mit der angegebenen E-Mail-Adresse existiert bereits",
      oriflameIdExists: "Ein Benutzer mit der angegebenen Oriflame-ID existiert bereits"
    }
  },
  profile: {
    title: "Profil bearbeiten",
    info: "Füllen Sie die Passwortfelder nur aus, wenn Sie es ändern möchten.",
    editAction: "Änderungen speichern",
    fields: {
      email: "Email",
      password: "Passwort",
      passwordRepeat: "Passwort wiederholen",
      oriflameId: "Oriflame-ID",
      firstName: "Vorname",
      lastName: "Familienname, Nachname",
      avatar: "Benutzerbild",
      eqShopUrl: "Empfehlungslink für den Eqology-Shop"
    },
    success: {
      edit: "Erfolg!",
      editDesc: "Änderungen wurden übernommen"
    }
  },
  login: {
    title: "Anmeldung",
    actionLogin: "Anmeldung",
    actionRegister: "Registrieren",
    actionReset: "Passwort zurücksetzen",
    dontHaveAccount: "Sie haben noch kein Konto?",
    forgotPassword: "Passwort vergessen?",
    fields: {
      email: "Email",
      password: "Passwort"
    },
    success: {
      create: "Erfolg!",
      createDesc: "Anmeldung erfolgreich!"
    },
    errors: {
      invalidCredentials: "Ungültige Emailadresse oder Passwort",
      inactiveUser: "Ihr Konto wurde noch nicht aktiviert"
    }
  },
  forgotPassword: {
    title: "Haben Sie Ihr Passwort vergessen?",
    action: "Passwort zurücksetzen",
    fields: {
      email: "Email",
      eqId: "EQOLOGY-ID"
    },
    errors: {
      invalidData: "Ungültige Daten"
    },
    success: {
      title: "Erfolg!",
      description: "Ein Link mit einem neuen Passwort wurde an die angegebene E-Mail-Adresse gesendet."
    }
  },
  cropper: {
    title: "Ernte",
    confirm: "Bestätigen",
    cancel: "Stornieren"
  },
  termsOfUse: {
    title: "Nutzungsbedingungen"
  },
  footer: {
    links: {
      admin: "Administrationsmenü"
    }
  },
  notFound: {
    title: "Ups... Nicht gefunden!",
    description: "Wir konnten die angeforderte Seite nicht finden. "
  },
  unauthorized: {
    title: "Ups... Du hast keine Erlaubnis!",
    description: "Sie haben keine Berechtigung, diese Seite anzuzeigen. "
  },
  admin: {
    title: "Administrationsmenü",
    links: {
      users: "Benutzer",
      workshops: "Workshops",
      courses: "Kurse",
      startup: "Inbetriebnahme 90 Tage"
    }
  },
  users: {
    title: "Benutzer",
    invitation: {
      confirm: {
        title: "Bestätigen",
        desc: "Möchten Sie die Registrierungs-Einladung wirklich senden?",
      },
    },
    invite: "Einladen",
    candidates: "Kandidaten",
    candidatesTitle: "Partnerkandidaten",
    invitationSent: "Einladung gesendet",
    waitingForActivation: "auf Aktivierung warten",
    activateUser: "aktivieren Sie",
    deleteUser: "Löschen",
    userUpdated: "Benutzer aktualisiert",
    allUsers: "Alle Nutzer",
    editAction: "Änderungen speichern",
    delete: {
      confirmTitle: "Bist du sicher?",
      confirmDesc: "Sind Sie sicher, dass Sie diesen Benutzer löschen möchten? "
    },
    edit: {
      title: "Benutzer bearbeiten"
    },
    roles: {
      client: "Klient",
      partner: "Partner",
      leader: "Führer",
      admin: "Administrator",
      candidate_partner: "Kandidat für Partner"
    },
    fields: {
      firstName: "Vorname",
      lastName: "Familienname, Nachname",
      role: "Rolle",
      mentor: "Mentor"
    },
    success: {
      edit: "Erfolg!",
      editDesc: "Änderungen wurden übernommen"
    }
  },
  workshops: {
    icons: {
      HEART: "Herz",
      LIKE: "Wie",
      STATS: "Statistiken",
      CONFIG: "Gang",
      WORKSHOP: "Werkstatt",
      INFO: "Die Info",
      FB: "Facebook",
      INSTAGRAM: "Instagram",
      SPORT: "Sport",
      MEDITATION: "Meditation",
      CHAT: "Plaudern",
      TROPHY: "Trophäe",
      STAR: "Stern",
      CHALLENGE: "Herausforderung",
      MAIL: "Post",
      CALENDAR: "Kalender",
      VIDEO: "Video",
      BOOK: "Buch",
      PAPER: "Papier",
      LINK: "Verknüpfung",
      FILE: "Datei",
      TEXT: "Text",
      PLUS: "Plus",
      MINUS: "Minus",
      CHECK: "Überprüfen",
      MUSIC: "Musik",
      CROSS: "Kreuzen",
      ARROW_LEFT: "Pfeil nach links",
      ARROW_RIGHT: "Pfeil nach rechts",
      ARROW_UP: "Pfeil nach oben",
      ARROW_DOWN: "Pfeil nach unten",
      LOCK_OPEN: "Schloss öffnen",
      LOCK_CLOSED: "Geschlossenes Schloss",
      PIN: "Stift",
      PIN_TWO: "Pin zwei",
      CHART_UP: "Diagramm erstellen",
      CHART_DOWN: "Diagramm nach unten",
      CHART_ALT: "Diagramm alt",
      TOOLS: "Werkzeuge",
      BOMB: "Bombe",
      DYNAMITE: "Dynamit",
      DIAMOND: "Diamant",
      CASH: "Kasse",
      CASH_TWO: "Bargeld zwei",
      GOLD: "Gold",
      BUS: "Bus",
      CAR: "Auto",
      TAXI: "Taxi",
      BOAT: "Boot",
      PLANE: "Flugzeug",
      BIKE: "Fahrrad",
      SMARTPHONE: "Smartphone",
      LAPTOP: "Laptop",
      DESKTOP: "Desktop",
      PHONE_OLD: "Altes Handy",
      KEYBOARD: "Tastatur",
      CAMERA: "Kamera",
      COMPASS: "Kompass",
      ALARM: "Alarm",
      WOMAN: "Frau",
      MAN: "Mann",
      HOME: "Heim",
      BELL: "Glocke",
      ACADEMY: "Akademie",
      CERTIFICATE: "Zertifikat",
      LIST: "Aufführen",
      MOVIE: "Film",
      PROFILE: "Profil",
      CROWN: "Krone",
      KEY: "Schlüssel",
      PATHS: "Wege",
      USERS: "Benutzer",
      NOTIFICATION: "Benachrichtigung",
      EXIT: "Ausfahrt",
      CART: "Wagen",
      FILES: "Dateien",
      FIRE: "Feuer"
    },
    title: "Workshops",
    firstStepsTitle: "Erste Schritte",
    titleClient: "Kundenworkshops",
    titlePartner: "Partnerworkshops",
    deleteWorkshop: "Löschen",
    allWorkshops: "Alle Workshops",
    editAction: "Änderungen speichern",
    createAction: "Werkstatt hinzufügen",
    startAction: "Start",
    step: "Schritt {0}",
    noWorkshopsInStep: "In diesem Schritt gibt es keine Workshops",
    workshopCreated: "Werkstatt hinzugefügt",
    workshopUpdated: "Werkstatt aktualisiert",
    translationAdded: "Übersetzung hinzugefügt",
    workshopRemoved: "Werkstatt entfernt",
    noDataTitle: "Keine Daten",
    noData: "Keine Werkstätten gefunden...",
    backToParent: "Zurück",
    addSubdirectory: "Unterverzeichnis hinzufügen",
    addItem: "Werkstatt hinzufügen",
    tabs: {
      basicData: "Basic",
      files: "Dateien"
    },
    delete: {
      confirmTitle: "Bist du sicher?",
      confirmDesc: "Sind Sie sicher, dass Sie diesen Workshop löschen möchten? "
    },
    fields: {
      name: "Name",
      description: "Beschreibung",
      icon: "Symbol",
      YTLink: "URL zum Video (YT)",
      supportedRoles: "Unterstützte Rollen",
      supportedLanguages: "Unterstützte Sprachen",
      contentVideo: "URL zum Video (YT)",
      contentText: "Textinhalt",
      poster: "Grafik",
      files: "Dateien (Anhänge)",
      categoryId: "Kategorie",
      zone: "Zone",
      step: "Schritt",
      public: "Für jeden verfügbar",
      publicDescription: "Aktivieren Sie dieses Kontrollkästchen, wenn Sie möchten, dass der Workshop sofort verfügbar ist, ohne dass eine Aktivierung durch den Mentor erforderlich ist.",
      stepName: {
        1: "Schritt 1",
        2: "Schritt 2",
        3: "Schritt 3",
        4: "Schritt 4",
        5: "Schritt 5",
        6: "Schritt 6",
        7: "Schritt 7",
        8: "Schritt 8",
        9: "Schritt 9",
        10: "Schritt 10"
      }
    },
    edit: {
      title: "Werkstatt bearbeiten",
      desc: "Die Felder <strong>\"Zone\"</strong> Und <strong>„für alle verfügbar“</strong> sollte für jede Sprachversion des Workshops gleich sein.", 
    },
    create: {
      title: "Werkstatt hinzufügen",
      translationCreationDesc: "Sie erstellen eine neue Übersetzung eines bestehenden Workshops",
      originalLanguage: "Original",
      currentLanguage: "Übersetzung"
    },
    contentTypes: {
      video: "Video",
      text: "Textinhalt"
    },
    zones: {
      client: "Kundenzone",
      partner: "Partnerzone",
      both: "Beide Zonen"
    },
    success: {
      create: "Erfolg!",
      createDesc: "Werkstatt hinzugefügt",
      edit: "Erfolg!",
      editDesc: "Änderungen wurden übernommen"
    },
    errors: {
      nameExists: "Eine Werkstatt mit dem angegebenen Namen existiert bereits"
    },
    categories: {
      title: "Kategorien",
      allCategories: "Alle Kategorien",
      createAction: "Kategorie hinzufügen",
      editAction: "Änderungen speichern",
      create: {
        title: "Kategorie hinzufügen"
      },
      edit: {
        title: "Kategorie bearbeiten"
      },
      fields: {
        name: "Name",
        owner: "Eltern-Kategorie",
        description: "Beschreibung"
      },
      delete: {
        confirmTitle: "Bist du sicher?",
        confirmDesc: "Sind Sie sicher, dass Sie diese Kategorie löschen möchten? "
      }
    },
    steps: {
      editAction: "Änderungen speichern",
      edit: {
        title: "Schritt bearbeiten"
      },
      fields: {
        name: "Name",
        description: "Beschreibung"
      }
    },
    directories: {
      createAction: "Verzeichnis hinzufügen",
      fields: {
        name: "Name",
        description: "Beschreibung",
        icon: "Symbol",
        supportedRoles: "Unterstützte Rollen",
        supportedLanguages: "Unterstützte Sprachen"
      },
      edit: {
        title: "Verzeichnis bearbeiten"
      }
    }
  },
  partnerZone: {
    title: "Partnerzone"
  },
  proteges: {
    title: "Schützlinge",
    candidatesTitle: "Partnerkandidaten",
    tree: "Partnerbaum",
    todayProtegesCount: "Neue Partner: {0}",
    treeWrongDevice: "Der Partnerbaum ist nur auf dem Großbildschirm verfügbar",
    protegesList: "Liste der Schützlinge",
    pendingRequests: "Offene Anfragen",
    requestAccepted: "Anfrage akzeptiert",
    requestRejected: "Anfrage zurückgewiesen",
    copySingUpInviteLink: "Anmelde-Einladungslink kopieren",
    copyClientLink: "Ihr Link für den Kunden (zu EQAPP)",
    speedChanged: "Die Geschwindigkeit wurde geändert",
    myWorkshops: "Meine Workshops",
    clients: {
      title: "Kunden",
      noClients: "Keine Kunden",
      info: "Die Info"
    },
    candidates: {
      title: "Kandidaten",
      noCandidates: "Keine Kandidaten",
      info: "Info"
    },
    mainInfo: {
      role: "Rolle",
      createdDate: "Beitrittsdatum",
      lastActivity: "Letzte Aktivität",
      step: "Aktueller Schritt",
      phone: "Telefon",
      email: "Email",
      eqologyId: "Eqology-ID"
    },
    activity: {
      noActivity: "Keine Aktivität",
      seeMore: "Mehr sehen",
      webinarActivity: "Webinare",
      lastActivity: "Letzte Aktivität",
      allActivity: "Alle Aktivitäten",
      webinarsLatest: "Aktuelle Webinare",
      noDataTitle: "Nichts hier :(",
      noData: "Keine Aktivität",
      descriptions: {
        WORKSHOP_FINISH: "Fertige Werkstatt <strong>„{0}“</strong>",
        WORKSHOP_START: "Workshop begonnen <strong>„{0}“</strong>",
        REGISTRATION: "Registriertes Konto",
        ACTIVATION: "Konto aktiviert",
        PROMOTION: "Befördert zu <strong>„{0}“</strong>",
        CONTACT_CREATION: "Kontakt erstellt",
        COURSE_FINISH: "Abgeschlossener Kurs <strong>„{0}“</strong>",
        DEMOTION: "Herabgestuft auf <strong>„{0}“</strong>",
        WEBINAR_SUBSCRIPTION: "Webinar abonniert <strong>„{0}“</strong>",
        WEBINAR_PRESENCE: "Habe am Webinar teilgenommen <strong>„{0}“</strong>"
      },
      webinarActivityTypes: {
        0: "Gezeichnet",
        1: "Besucht",
        2: "Abwesend",
        3: "Unentschieden"
      },
      seeAll: "Alles sehen",
      browsingActivity: "Browsing-Aktivität des Benutzers <strong>{0}</strong>"
    },
    courseProgress: {
      title: "Kursfortschritt",
      description: "Aktueller Kurs – <strong>{0}</strong>"
    },
    programProgress: {
      title: "Programmfortschritt",
      description: "Aktuelles Programm – <strong>{0}</strong>",
      seeAll: "Mehr sehen",
      allProgress: "Alle Fortschritte",
      browsingActivity: "Durchsuchen des Kursfortschritts des Benutzers <strong>{0}</strong>"
    },
    actions: {
      title: "Aktionen",
      activate: "Benutzer aktivieren",
      activateWorkshop: "Werkstatt aktivieren",
      delete: "Benutzer löschen",
      promoteToLeader: "Zum Leiter befördern",
      promoteToAdmin: "Zum Administrator hochstufen",
      demoteToLeader: "Zum Anführer degradieren",
      demoteToPartner: "Zum Partner herabstufen",
      inviteToSignUp: "Laden Sie zur Anmeldung ein",
      activateNextStep: "Nächsten Schritt aktivieren",
      undoStep: "Schritt rückgängig machen",
      changeMentor: "Mentor wechseln"
    },
    workshopActivation: {
      title: "Workshops",
      activatingWorkshop: "Aktivierender Workshop für Benutzer <strong>{0}</strong>",
      errors: {
        workshopNotFound: "Werkstatt mit angegebener ID nicht gefunden",
        unauthorized: "Der Benutzer hat keinen Zugriff auf die Zone, zu der die Werkstatt gehört",
        badRequest: "Der Workshop steht dem Benutzer bereits zur Verfügung"
      },
      success: "Workshop wurde aktiviert"
    },
    userRemoved: "Benutzer wurde entfernt",
    protegePromoted: "Protege wurde befördert!",
    protegeDemoted: "Protege wurde degradiert!",
    protegeActivated: "Protege wurde aktiviert!",
    invitationSent: "Einladung versendet!",
    mentorChanged: "Mentor wurde geändert!",
    stepUndone: "Schritt wurde rückgängig gemacht!",
    stepActivated: "Schritt wurde aktiviert!",
    promotion: {
      confirm: {
        title: "Schützling fördern",
        desc: "Sind Sie sicher, dass Sie diesen Schützling befördern möchten?"
      }
    },
    demotion: {
      confirm: {
        title: "Schützlingsrolle ändern",
        desc: "Sind Sie sicher, dass Sie die Rolle dieses Schützlings ändern möchten?"
      }
    },
    inviteToSignUp: {
      confirm: {
        title: "Laden Sie zur Anmeldung ein",
        desc: "Möchten Sie diesen Benutzer wirklich zur Registrierung einladen?"
      }
    },
    activate: {
      confirm: {
        title: "Benutzer aktivieren",
        desc: "Sind Sie sicher, dass Sie diesen Benutzer aktivieren möchten?"
      }
    },
    activateNextStep: {
      confirm: {
        title: "Nächsten Schritt aktivieren",
        desc: "Sind Sie sicher, dass Sie den nächsten Schritt für diesen Benutzer aktivieren möchten?"
      }
    },
    undoStep: {
      confirm: {
        title: "Schritt rückgängig machen",
        desc: "Sind Sie sicher, dass Sie den Schritt für diesen Benutzer rückgängig machen möchten?"
      }
    },
    changeMentor: {
      confirm: {
        title: "Mentor wechseln",
        desc: "Sind Sie sicher, dass Sie den Mentor für diesen Benutzer ändern möchten?"
      }
    },
    changeSpeed: {
      confirm: {
        title: "Geschwindigkeit ändern",
        desc: "Sind Sie sicher, dass Sie die Kurs-/Programmgeschwindigkeit für diesen Benutzer ändern möchten?"
      }
    },
    copyInviteLink: "Ihr Link für Protege (zu EQAPP)",
    inviteLinkCopied: "Link wurde kopiert",
    courseRequests: {
      title: "Kurse",
      protegeAsksFor: "Bittet um Kursaktivierung <strong>„{0}“</strong>",
      denyAction: "Leugnen",
      activateAction: "aktivieren Sie"
    },
    programRequests: {
      title: "Programme",
      protegeAsksFor: "Fordert die Programmaktivierung an <strong>„{0}“</strong>",
      denyAction: "Leugnen",
      activateAction: "aktivieren Sie"
    },
    activationRequests: {
      title: "Aktivierungen",
      protegeAsksFor: "Fordert eine Kontoaktivierung an",
      denyAction: "Leugnen",
      activateAction: "aktivieren Sie"
    }
  },
  courses: {
    title: "Kurse",
    allCourses: "Alle Kurse",
    createAction: "Fügen Sie einen Kurs hinzu",
    editAction: "Änderungen speichern",
    courseCreated: "Der Kurs wurde hinzugefügt",
    courseUpdated: "Die Änderungen wurden umgesetzt",
    courseRemoved: "Der Kurs wurde gelöscht",
    timeToStart: "Ihr Kurs beginnt bald!<br> Zeit anzufangen <strong>{0}</strong> Das...",
    create: {
      title: "Fügen Sie einen Kurs hinzu",
      desc: "In diesem Bereich können Sie einen neuen Kurs hinzufügen, jedoch ohne einen bestimmten Unterrichtsplan. "
    },
    edit: {
      title: "Kurs bearbeiten"
    },
    delete: {
      confirmTitle: "Bist du sicher?",
      confirmDesc: "Möchten Sie diesen Kurs wirklich löschen? "
    },
    fields: {
      name: "Name",
      description: "Beschreibung",
      contract: "Vertrag",
      poster: "Grafik",
      days: "Dauer"
    },
    day: {
      title: "Tag {0}",
      editAction: "Änderungen speichern",
      success: {
        edit: "Erfolg!",
        editDesc: "Die Beschreibung wurde aktualisiert"
      },
      fields: {
        challengesDescription: "Beschreibung des Tages",
        summaryDescription: "Zusammenfassung des Tages"
      },
      challenges: {
        createAction: "Fügen Sie eine Herausforderung hinzu",
        editAction: "Änderungen speichern",
        useSchemaGo: "Verwenden Sie das GO-Schema",
        useSchemaRun: "Verwenden Sie das RUN-Schema",
        listDesc: "Alle Änderungen an der Liste werden in Echtzeit aktualisiert.",
        create: {
          title: "Fügen Sie eine Herausforderung hinzu"
        },
        edit: {
          title: "Herausforderung bearbeiten"
        },
        fields: {
          title: "Titel",
          description: "Beschreibung",
          type: "Typ",
          workshopId: "Verwandte Ausbildung",
          optional: "Optional",
          optionalDesc: "Kann ein Benutzer diese Herausforderung überspringen? ",
          typeVariants: {
            PROSPECTING: "Prospektion",
            APPOINTMENT: "Termin vor Ort.",
            WEBINAR: "Webinar",
            FOLLOW_UP: "Nachverfolgen",
            MEETING: "Treffen",
            WORKSHOP: "Ausbildung",
            INFO: "Information",
            FB: "FB-Aktivität",
            INSTAGRAM: "Instagram-Aktivität",
            SOCIAL_MEDIA: "Aktivität bei MS",
            SPORT_ACTIVITY: "Physische Aktivität"
          }
        }
      }
    }
  },
  notifications: {
    title: "Benachrichtigungen",
    allNotifications: "Alle Benachrichtigungen",
    notificationTemplates: "Vorlagen",
    noNotifications: "Keine Benachrichtigungen",
    noNotificationsDesc: "Sie haben keine ungelesenen Benachrichtigungen.",
    fields: {
      title: "Titel",
      description: "Beschreibung",
      name: "Name (intern)"
    },
    editAction: "Änderungen speichern",
    notificationUpdated: "Die Änderungen wurden umgesetzt",
    unseenPushNotifications: "Sie haben {0} neue Benachrichtigungen"
  },
  catalogs: {
    title: "Kataloge",
    allCatalogs: "Alle Kataloge",
    createAction: "Verzeichnis hinzufügen",
    editAction: "Änderungen speichern",
    catalogCreated: "Der Katalog wurde hinzugefügt",
    catalogUpdated: "Die Änderungen wurden umgesetzt",
    catalogRemoved: "Der Katalog wurde gelöscht",
    create: {
      title: "Verzeichnis hinzufügen"
    },
    edit: {
      title: "Verzeichnis bearbeiten"
    },
    delete: {
      confirmTitle: "Bist du sicher?",
      confirmDesc: "Sind Sie sicher, dass Sie dieses Verzeichnis löschen möchten? "
    },
    fields: {
      name: "Name",
      description: "Inhalt",
      startAt: "Startdatum",
      variant: "Dauer"
    },
    variants: {
      twoWeek: "2 Wochen",
      threeWeek: "3 Wochen"
    }
  },
  menuLinks: {
    title: "Menülinks",
    allLinks: "Alle Links",
    createAction: "Link hinzufügen",
    editAction: "Änderungen speichern",
    linkCreated: "Der Link wurde hinzugefügt",
    linkUpdated: "Die Änderungen wurden umgesetzt",
    linkRemoved: "Der Link wurde entfernt",
    create: {
      title: "Link hinzufügen"
    },
    edit: {
      title: "Link bearbeiten"
    },
    delete: {
      confirmTitle: "Bist du sicher?",
      confirmDesc: "Möchten Sie diesen Link wirklich entfernen? "
    },
    variants: {
      internal: "Unterseite",
      external: "Extern"
    },
    fields: {
      name: "Name",
      url: "URL-Adresse",
      variant: "Typ",
      page: "Unterseite",
      icon: "Symbol",
      supportedRoles: "Unterstützte Rollen",
      supportedLanguages: "Unterstützte Sprachen"
    },
    errors: {
      nameExists: "Ein Link mit dem angegebenen Namen existiert bereits"
    }
  },
  productCategory: {
    allProductCategories: "Alle Kategorien",
    productCategoryCreated: "Die Kategorie wurde hinzugefügt",
    productCategoryUpdated: "Die Änderungen wurden umgesetzt",
    productCategoryRemoved: "Die Kategorie wurde gelöscht",
    buyingChoices: "Kaufoptionen - Sie kaufen direkt beim Verkäufer!",
    goToShop: "Zum Laden!",
    posts: "In Verbindung stehende Artikel",
    faqs: "Fragen gestellt",
    editProductRefLink: "Reflink bearbeiten",
    lackOfRefUrls: "Vervollständigen Sie Ihre Reflinks!",
    copyRefLink: "Link kopieren",
    refLinkCopied: "Der Link wurde kopiert",
    benefits: {
      one: {
        title: "Schnelle Lieferung",
        description: "Lieferung an den Kunden innerhalb von 2 Werktagen!"
      },
      two: {
        title: "Bessere Preise",
        description: "Kaufen Sie bei uns – zahlen Sie weniger!"
      },
      three: {
        title: "Zufriedenheitsgarantie",
        description: "30 Tage Rückgabegarantie!"
      },
      four: {
        title: "Spezialisierte Forschung",
        description: "Wir verfügen über unabhängige Tests, die höchste Qualität bestätigen!"
      }
    },
    createAction: "Fügen Sie eine Kategorie hinzu",
    editAction: "Kategorie bearbeiten",
    delete: {
      confirmTitle: "Bist du sicher?",
      confirmDesc: "Sind Sie sicher, dass Sie diese Kategorie löschen möchten? "
    },
    fields: {
      name: "Name",
      descriptionBefore: "Beschreibung vor Produkten",
      descriptionAfter: "Beschreibung nach Produkten",
      image: "Grafik",
      imageBig: "Große Grafik"
    },
    create: {
      title: "Fügen Sie eine Kategorie hinzu"
    },
    edit: {
      title: "Kategorie bearbeiten"
    },
    tabs: {
      basicData: "Basic",
      products: "Produkte",
      articles: "Artikel",
      faqs: "FAQ"
    }
  },
  products: {
    title: "Produkte",
    seeMore: "Information",
    ourProducts: "Unsere Produkte",
    editUrl: "Reflink bearbeiten",
    fromProducer: "Kaufen Sie direkt beim Hersteller",
    updateLink: "Vervollständigen Sie den Link!",
    allProducts: "Alle Produkte",
    createAction: "Fügen Sie ein Produkt hinzu",
    editAction: "Änderungen speichern",
    productCreated: "Das Produkt wurde hinzugefügt",
    productUpdated: "Die Änderungen wurden umgesetzt",
    productRemoved: "Das Produkt wurde entfernt",
    linkCopied: "Der Link wurde kopiert",
    copyLink: "Link kopieren",
    create: {
      title: "Fügen Sie ein Produkt hinzu"
    },
    edit: {
      title: "Produkt bearbeiten"
    },
    delete: {
      confirmTitle: "Bist du sicher?",
      confirmDesc: "Möchten Sie dieses Produkt wirklich entfernen? "
    },
    fields: {
      name: "Name",
      description: "Beschreibung",
      price: "Preis",
      image: "Grafik",
      refUrl: "Ref-Link zum Produkt",
      priceOld: "Alter Preis",
    }
  },
  posts: {
    title: "Beiträge",
    allPosts: "Alle Artikel",
    createAction: "Fügen Sie einen Beitrag hinzu",
    editAction: "Änderungen speichern",
    postCreated: "Der Beitrag wurde hinzugefügt",
    postUpdated: "Die Änderungen wurden umgesetzt",
    postRemoved: "Der Beitrag wurde gelöscht",
    create: {
      title: "Fügen Sie einen Beitrag hinzu"
    },
    edit: {
      title: "Beitrag bearbeiten"
    },
    delete: {
      confirmTitle: "Bist du sicher?",
      confirmDesc: "Sind Sie sicher, dass Sie diesen Beitrag löschen möchten? "
    },
    fields: {
      title: "Titel",
      content: "Inhalt",
      image: "Grafik"
    }
  },
  certificates: {
    seeMore: "Mehr Informationen",
    title: "Zertifikate",
    allCertificates: "Alle Zertifikate",
    createAction: "Fügen Sie ein Zertifikat hinzu",
    editAction: "Änderungen speichern",
    certificateCreated: "Das Zertifikat wurde hinzugefügt",
    certificateUpdated: "Die Änderungen wurden umgesetzt",
    certificateRemoved: "Das Zertifikat wurde gelöscht",
    create: {
      title: "Fügen Sie ein Zertifikat hinzu"
    },
    edit: {
      title: "Zertifikat bearbeiten"
    },
    delete: {
      confirmTitle: "Bist du sicher?",
      confirmDesc: "Sind Sie sicher, dass Sie dieses Zertifikat löschen möchten? "
    },
    fields: {
      title: "Titel",
      description: "Beschreibung",
      image: "Grafik",
      url: "URL-Adresse"
    }
  },
  faqs: {
    title: "FAQs",
    allFaqs: "Alle FAQs",
    createAction: "FAQ hinzufügen",
    editAction: "Änderungen speichern",
    faqCreated: "FAQ wurde hinzugefügt",
    faqUpdated: "Die Änderungen wurden umgesetzt",
    faqRemoved: "FAQ wurde entfernt",
    create: {
      title: "FAQ hinzufügen"
    },
    edit: {
      title: "FAQ bearbeiten"
    },
    delete: {
      confirmTitle: "Bist du sicher?",
      confirmDesc: "Sind Sie sicher, dass Sie diese FAQ löschen möchten? "
    },
    fields: {
      question: "Frage",
      answer: "Antwort"
    }
  },
  candidateQuizes: {
    title: "Quiz für Kandidaten",
    allQuizes: "Alle Quizze",
    createAction: "Fügen Sie ein Quiz hinzu",
    editAction: "Änderungen speichern",
    quizCreated: "Das Quiz wurde hinzugefügt",
    quizUpdated: "Die Änderungen wurden umgesetzt",
    quizRemoved: "Das Quiz wurde gelöscht",
    create: {
      title: "Fügen Sie ein Quiz hinzu"
    },
    edit: {
      title: "Quiz bearbeiten"
    },
    delete: {
      confirmTitle: "Bist du sicher?",
      confirmDesc: "Möchten Sie dieses Quiz wirklich löschen? "
    },
    fields: {
      name: "Name",
      graduateMinScore: "Erfolgsquote (%)",
      movieUrl: "URL zum Video"
    }
  },
  candidateQuizQuestions: {
    title: "Fragen",
    allQuestions: "Alle Fragen",
    createAction: "Fügen Sie eine Frage hinzu",
    editAction: "Änderungen speichern",
    questionCreated: "Die Frage wurde hinzugefügt",
    questionUpdated: "Die Änderungen wurden umgesetzt",
    questionRemoved: "Die Frage wurde gelöscht",
    create: {
      title: "Fügen Sie eine Frage hinzu"
    },
    edit: {
      title: "Frage bearbeiten"
    },
    delete: {
      confirmTitle: "Bist du sicher?",
      confirmDesc: "Sind Sie sicher, dass Sie diese Frage löschen möchten? "
    },
    fields: {
      question: "Frage"
    }
  },
  candidateQuizAnswers: {
    title: "Antworten",
    allAnswers: "Alle Antworten",
    createAction: "Fügen Sie eine Antwort hinzu",
    editAction: "Änderungen speichern",
    answerCreated: "Die Antwort wurde hinzugefügt",
    answerUpdated: "Die Änderungen wurden umgesetzt",
    answerRemoved: "Die Antwort wurde gelöscht",
    create: {
      title: "Fügen Sie eine Antwort hinzu"
    },
    edit: {
      title: "Antwort bearbeiten"
    },
    delete: {
      confirmTitle: "Bist du sicher?",
      confirmDesc: "Sind Sie sicher, dass Sie diese Antwort löschen möchten? "
    },
    fields: {
      answer: "Antwort",
      isCorrect: "Richtig",
      questionDescription: "Wählen Sie diese Option nur aus, wenn die Antwort als richtig angesehen werden soll"
    }
  },
  boardItemImages: {
    createAction: "Grafiken hinzufügen",
    delete: {
      confirmTitle: "Bist du sicher?",
      confirmDesc: "Möchten Sie dieses Foto wirklich löschen? "
    },
    fields: {
      image: "Datei"
    }
  },
  boardItemVideos: {
    createAction: "Fügen Sie ein Video hinzu",
    delete: {
      confirmTitle: "Bist du sicher?",
      confirmDesc: "Möchten Sie dieses Video wirklich löschen? "
    }
  },
  boardItemFiles: {
    createAction: "Datei hinzufügen",
    delete: {
      confirmTitle: "Bist du sicher?",
      confirmDesc: "Sind Sie sicher, dass Sie diese Datei löschen möchten? "
    },
    fields: {
      file: "Datei",
      languageId: "Zunge"
    }
  },
  workshopItemFiles: {
    createAction: "Datei hinzufügen",
    delete: {
      confirmTitle: "Bist du sicher?",
      confirmDesc: "Sind Sie sicher, dass Sie diese Datei löschen möchten? "
    },
    fields: {
      file: "Datei",
      languageId: "Zunge"
    }
  },
  pages: {
    title: "Unterseiten",
    allPages: "Alle Unterseiten",
    createAction: "Fügen Sie eine Unterseite hinzu",
    editAction: "Änderungen speichern",
    pageCreated: "Die Unterseite wurde hinzugefügt",
    pageUpdated: "Die Änderungen wurden umgesetzt",
    pageRemoved: "Die Unterseite wurde gelöscht",
    goToBoardContent: "Zum Inhalt springen",
    create: {
      title: "Fügen Sie eine Unterseite hinzu"
    },
    edit: {
      title: "Unterseite bearbeiten"
    },
    delete: {
      confirmTitle: "Bist du sicher?",
      confirmDesc: "Sind Sie sicher, dass Sie diese Unterseite löschen möchten? "
    },
    fields: {
      name: "AUSWEIS"
    },
    types: {
      board: "Planke",
      boardItem: "Fastenzeit"
    }
  },
  webinars: {
    title: "Webinare",
    platforms: {
      cmNew: "Neues ClickMeeting",
      cmFrom: "Bestehendes ClickMeeting",
      sm: "Bestehendes Streamyard/YT"
    },
    youHaveToVerify: {
      title: "E-Mail verifizieren",
      description: "Sie müssen Ihre E-Mail-Adresse verifizieren, bevor Sie fortfahren können.",
    },
    downloadPoster: "Grafik herunterladen",
    createFromCM: "Aus CM hinzufügen",
    downloadCSV: "Herunterladen",
    noMoreTokens: "Keine Token verfügbar",
    noMoreTokensDesc: "Leider sind für dieses Webinar keine Plätze mehr verfügbar :(",
    businessWebinars: "Business-Webinare",
    clientWebinars: "Produktwebinare",
    showFinished: "Show abgeschlossen",
    finishedWebinars: "Abgeschlossene Webinare",
    subscribe: "Melden Sie sich an!",
    details: "Einzelheiten",
    timeLeft: "Übrig...",
    live: "LIVE",
    subscribedUsers: "Gerettet",
    attendedUsers: "Teilnehmer",
    noSubscribedUsers: "Keine registrierten Benutzer",
    noAttendedUsers: "Keine Teilnehmer",
    startAt: "Es geht los",
    subscribed: "Gerettet!",
    subscribedInfo: "Eine Stunde vor Beginn des Webinars erhalten Sie von uns eine Erinnerungsbenachrichtigung.",
    presenter: "Führer",
    seeYouSoon: "Wir sehen uns! ",
    goToWebinar: "Komm herein",
    allWebinars: "Alle Webinare",
    createAction: "Fügen Sie ein Webinar hinzu",
    editAction: "Änderungen speichern",
    webinarCreated: "Das Webinar wurde hinzugefügt",
    webinarUpdated: "Die Änderungen wurden umgesetzt",
    webinarRemoved: "Das Webinar wurde gelöscht",
    noDataTitle: "Hier ist nichts :(",
    noData: "Derzeit sind keine Webinare geplant...",
    invited: {
      invite: "Einladen",
      invited: "Eingeladen!",
      invitePartner: "Laden Sie einen Partner ein",
      inviteGuest: "Laden Sie einen Gast ein",
      invitedUsers: "Registrierte Benutzer",
      invitedGuests: "Registrierte Gäste",
      userInvited: "Der Benutzer wurde eingeladen",
      error: "Es ist ein Fehler aufgetreten...",
      typeEmail: "Geben sie ihre E-Mailadresse ein",
      emailExists: "Der Benutzer hat bereits eine Einladung erhalten",
      invitationInvalidOrExpired: "Die Einladung ist ungültig oder abgelaufen",
      firstName: "Name",
      lastName: "Familienname, Nachname",
      email: "Email",
      urlGenerated: "Eine einzigartige Einladung wurde generiert!",
      copyUrl: "Link kopieren",
      linkCopied: "Der Link wurde kopiert"
    },
    create: {
      title: "Fügen Sie ein Webinar hinzu"
    },
    edit: {
      title: "Webinar bearbeiten"
    },
    delete: {
      confirmTitle: "Bist du sicher?",
      confirmDesc: "Sind Sie sicher, dass Sie dieses Webinar löschen möchten? "
    },
    variants: {
      BUSINESS: "Geschäft",
      CLIENT: "Klient",
      INVITED: "Auf Einladung"
    },
    fields: {
      poster: "Grafik",
      title: "Titel",
      description: "Beschreibung",
      presenter: "Führer",
      startAt: "Startdatum",
      duration: "Dauer",
      variant: "Typ",
      supportedLanguages: "Unterstützte Sprachen",
      supportedRoles: "Unterstützte Rollen",
      embedUrl: "URL zum Einbetten (YT)",
      cmId: "ID von CM",
      cmIdDescription: "Gehen Sie zu den Veranstaltungsdetails und sehen Sie sich die Adresse im Browser an. Die ID ist die Zahl nach dem letzten Schrägstrich. (Beispiel: In der URL `https://account-panel.clickmeeting.com/8315894` ist die ID `8315894`)",
      isWorkshop: "Internes Webinar",
      isWorkshopDescription: "Wenn dieses Feld aktiviert ist, wird das Webinar in der Registerkarte „Webinare für Geschäftspartner“ angezeigt und es ist nicht möglich, Außenstehende einzuladen.",
      embedCode: "StreamYard-Stream-Link",
      embedCodeDescription: `Wählen Sie "Share" in Ihrem "On-Air"-Stream aus, kopieren Sie den Link und fügen Sie ihn hier ein.`
    }
  },
  announcements: {
    title: "Anzeige",
    allAnnouncements: "Alle Anzeigen",
    createAction: "Fügen Sie eine Ankündigung hinzu",
    editAction: "Änderungen speichern",
    announcementCreated: "Die Ankündigung wurde hinzugefügt",
    announcementUpdated: "Die Änderungen wurden umgesetzt",
    announcementRemoved: "Die Anzeige wurde entfernt",
    create: {
      title: "Fügen Sie eine Ankündigung hinzu"
    },
    edit: {
      title: "Bearbeiten Sie Ihre Anzeige"
    },
    delete: {
      confirmTitle: "Bist du sicher?"
    },
    fields: {
      title: "Titel",
      description: "Inhalt",
      startAt: "Startdatum"
    }
  },
  boards: {
    title: "System",
    allBoards: "Alle Bretter",
    createAction: "Fügen Sie ein Array hinzu",
    editAction: "Änderungen speichern",
    boardCreated: "Das Board wurde hinzugefügt",
    boardUpdated: "Die Änderungen wurden umgesetzt",
    boardRemoved: "Die Platine wurde entfernt",
    noData: "Hier ist noch nichts...",
    noDataTitle: "Keine Daten",
    addSubdirectory: "Fügen Sie ein Unterverzeichnis hinzu",
    addItem: "Fügen Sie einen Artikel hinzu",
    backToParent: "Komm zurück",
    colors: {
      PRIMARY: "Basic",
      PRIMARY_LIGHTER: "Basic (leichter)",
      ORANGE: "Orange",
      GREEN: "Grün",
      RED: "Rot"
    },
    create: {
      title: "Fügen Sie ein Array hinzu"
    },
    edit: {
      title: "Bearbeiten Sie das Board"
    },
    delete: {
      confirmTitle: "Bist du sicher?",
      confirmDesc: "Sind Sie sicher, dass Sie dieses Board löschen möchten? "
    },
    fields: {
      name: "Name",
      description: "Inhalt",
      icon: "Symbol",
      supportedLanguages: "Unterstützte Sprachen",
      supportedRoles: "Unterstützte Rollen",
      color: "Farbe"
    },
    icons: {
      HEART: "Herz",
      LIKE: "Wie",
      STATS: "Statistiken",
      CONFIG: "Gang",
      WORKSHOP: "Ausbildung",
      INFO: "Information",
      FB: "Facebook",
      INSTAGRAM: "Instagram",
      SPORT: "Sport",
      MEDITATION: "Meditation",
      CHAT: "Gespräch",
      TROPHY: "Trophäe",
      STAR: "Stern",
      CHALLENGE: "Herausforderung",
      MAIL: "Post",
      CALENDAR: "Kalender",
      VIDEO: "Video",
      BOOK: "Buch",
      PAPER: "Blatt",
      LINK: "Verknüpfung",
      FILE: "Datei",
      TEXT: "Text",
      PLUS: "Plus",
      MINUS: "Minus",
      CHECK: "Überprüfen",
      MUSIC: "Musik",
      CROSS: "Kreuzen",
      ARROW_LEFT: "Linker Pfeil",
      ARROW_RIGHT: "Rechter Pfeil",
      ARROW_UP: "Pfeil nach oben",
      ARROW_DOWN: "Pfeil nach unten",
      LOCK_OPEN: "Vorhängeschloss öffnen",
      LOCK_CLOSED: "Geschlossenes Vorhängeschloss",
      PIN: "Reißzwecke",
      PIN_TWO: "Pin 2",
      CHART_UP: "Diagramm nach oben",
      CHART_DOWN: "Grafik nach unten",
      CHART_ALT: "Alternatives Diagramm",
      TOOLS: "Werkzeuge",
      BOMB: "Bombe",
      DYNAMITE: "Dynamit",
      DIAMOND: "Diamant",
      CASH: "Kasse",
      CASH_TWO: "Bargeld 2",
      GOLD: "Gold",
      BUS: "Bus",
      CAR: "Auto",
      TAXI: "Taxi",
      BOAT: "Łódź",
      PLANE: "Flugzeug",
      BIKE: "Fahrrad",
      SMARTPHONE: "Smartphone",
      LAPTOP: "Laptop",
      DESKTOP: "Desktop",
      PHONE_OLD: "Altes Handy",
      KEYBOARD: "Tastatur",
      CAMERA: "Die Kamera",
      COMPASS: "Kompass",
      ALARM: "Alarm",
      WOMAN: "Frau",
      MAN: "Mann",
      HOME: "Haus",
      BELL: "Glocke",
      ACADEMY: "Akademie",
      CERTIFICATE: "Zertifikat",
      LIST: "Aufführen",
      MOVIE: "Film",
      PROFILE: "Profil",
      CROWN: "Krone",
      KEY: "Schlüssel",
      PATHS: "Wege",
      USERS: "Benutzer",
      NOTIFICATION: "Benachrichtigung",
      EXIT: "Ausfahrt",
      CART: "Korb",
      FILES: "Dateien",
      FIRE: "Flamme"
    },
    items: {
      chooseType: "Wählen Sie eine Variante aus",
      createAction: "Fügen Sie einen Artikel hinzu",
      editAction: "Änderungen speichern",
      itemCreated: "Der Artikel wurde hinzugefügt",
      itemUpdated: "Die Änderungen wurden umgesetzt",
      itemRemoved: "Der Artikel wurde gelöscht",
      tabs: {
        basicData: "Basic",
        videos: "Video",
        files: "Dateien",
        images: "Grafik"
      },
      create: {
        title: "Fügen Sie einen Artikel hinzu"
      },
      edit: {
        title: "Element bearbeiten"
      },
      delete: {
        confirmTitle: "Bist du sicher?",
        confirmDesc: "Sind Sie sicher, dass Sie dieses Element löschen möchten? "
      },
      fields: {
        name: "Name",
        link: "Verknüpfung",
        file: "Datei",
        text: "Textinhalt",
        icon: "Symbol",
        supportedLanguages: "Unterstützte Sprachen",
        supportedRoles: "Unterstützte Rollen"
      },
      contentTypes: {
        link: "Verknüpfung",
        file: "Datei",
        text: "Textinhalt"
      },
      copyLink: "Link kopieren",
      linkCopied: "Der Link wurde kopiert",
      downloadFile: "Download-Datei",
      copyText: "Text kopieren",
      textCopied: "Der Text wurde kopiert"
    }
  },
  movies: {
    title: "Filmdatenbank",
    categories: {
      title: "Kategorien",
      createAction: "Fügen Sie eine Kategorie hinzu",
      editAction: "Änderungen speichern",
      categoryCreated: "Die Kategorie wurde hinzugefügt",
      categoryUpdated: "Die Änderungen wurden umgesetzt",
      categoryRemoved: "Die Kategorie wurde gelöscht",
      create: {
        title: "Fügen Sie eine Kategorie hinzu"
      },
      edit: {
        title: "Kategorie bearbeiten"
      },
      delete: {
        confirmTitle: "Bist du sicher?",
        confirmDesc: "Sind Sie sicher, dass Sie diese Kategorie löschen möchten? "
      },
      fields: {
        name: "Name",
        description: "Beschreibung"
      }
    },
    createAction: "Fügen Sie ein Video hinzu",
    editAction: "Änderungen speichern",
    movieCreated: "Das Video wurde hinzugefügt",
    movieUpdated: "Die Änderungen wurden umgesetzt",
    movieRemoved: "Das Video wurde entfernt",
    noData: "Hier ist noch nichts...",
    noDataTitle: "Keine Daten",
    addSubcategory: "Fügen Sie eine Unterkategorie hinzu",
    addMovie: "Fügen Sie ein Video hinzu",
    backToParent: "Komm zurück",
    create: {
      title: "Fügen Sie ein Video hinzu"
    },
    edit: {
      title: "Video bearbeiten"
    },
    delete: {
      confirmTitle: "Bist du sicher?",
      confirmDesc: "Möchten Sie dieses Video wirklich löschen? "
    },
    fields: {
      name: "Name",
      description: "Beschreibung",
      link: "Verknüpfung"
    }
  },
  programs: {
    title: "Programme",
    allPrograms: "Alle Programme",
    createAction: "Fügen Sie ein Programm hinzu",
    editAction: "Änderungen speichern",
    programCreated: "Das Programm wurde hinzugefügt",
    programUpdated: "Die Änderungen wurden umgesetzt",
    programRemoved: "Das Programm wurde entfernt",
    timeToStart: "Ihr Programm startet bald!<br> Zeit anzufangen <strong>{0}</strong> Das...",
    create: {
      title: "Fügen Sie ein Programm hinzu",
      desc: "In diesem Bereich können Sie ein neues Programm hinzufügen, jedoch ohne einen bestimmten Unterrichtsplan. "
    },
    edit: {
      title: "Programm bearbeiten"
    },
    delete: {
      confirmTitle: "Bist du sicher?",
      confirmDesc: "Möchten Sie dieses Programm wirklich entfernen? "
    },
    fields: {
      name: "Name",
      description: "Beschreibung",
      contract: "Vertrag",
      poster: "Grafik",
      days: "Dauer"
    },
    day: {
      title: "Tag {0}",
      editAction: "Änderungen speichern",
      success: {
        edit: "Erfolg!",
        editDesc: "Die Beschreibung wurde aktualisiert"
      },
      fields: {
        challengesDescription: "Beschreibung des Tages",
        summaryDescription: "Zusammenfassung des Tages"
      },
      challenges: {
        createAction: "Fügen Sie eine Herausforderung hinzu",
        editAction: "Änderungen speichern",
        listDesc: "Alle Änderungen an der Liste werden in Echtzeit aktualisiert.",
        create: {
          title: "Fügen Sie eine Herausforderung hinzu"
        },
        edit: {
          title: "Herausforderung bearbeiten"
        },
        fields: {
          title: "Titel",
          description: "Beschreibung",
          type: "Typ",
          optional: "Optional",
          optionalDesc: "Kann ein Benutzer diese Herausforderung überspringen? ",
          typeVariants: {
            PROSPECTING: "Prospektion",
            APPOINTMENT: "Termin vor Ort.",
            WEBINAR: "Webinar",
            FOLLOW_UP: "Nachverfolgen",
            MEETING: "Treffen",
            WORKSHOP: "Ausbildung",
            INFO: "Information",
            FB: "FB-Aktivität",
            INSTAGRAM: "Instagram-Aktivität",
            SOCIAL_MEDIA: "Aktivität bei MS",
            SPORT_ACTIVITY: "Physische Aktivität"
          }
        }
      }
    }
  },
  join: {
    title: "Hallo!",
    createAction: "Verbinden",
    desc: "Wählen Sie die Option aus, die Ihnen beim Informationstreffen gefallen hat.",
    chooseAccountType: "Wählen Sie einen Kontotyp aus",
    firstTimeDesc: "Deine ersten Trainingseinheiten liegen vor dir! ",
    fields: {
      firstName: "Name",
      lastName: "Familienname, Nachname",
      email: "Email"
    }
  },
  chooseProgram: {
    title: "Wählen Sie ein Programm aus",
    signContract: "Den Vertrag unterschreiben",
    desc: "Aufmerksamkeit! ",
    startAction: "Aktivierung anfordern",
    signContractAction: "Den Vertrag unterschreiben",
    requestAlreadySent: {
      title: "Warten... :)",
      desc: "Ihre Anfrage zur Aktivierung Ihres Kurses oder Programms wurde bereits gesendet. "
    },
    alreadyInProgress: {
      title: "Nicht jetzt! ",
      desc: "Ein Kurs oder Programm ist bereits in Bearbeitung. "
    },
    programs: {
      title: "Programme",
      startProgram: "Programmaktivierung anfordern",
      youHaveToSignContract: "Um die Aktivierung des Programms zu beantragen, müssen Sie zunächst einen Vertrag unterzeichnen."
    },
    courses: {
      title: "Kurse",
      startCourse: "Fordern Sie eine Kursfreigabe an",
      youHaveToSignContract: "Um die Kursfreigabe anzufordern, müssen Sie zunächst einen Vertrag unterzeichnen."
    },
    success: {
      title: "Erfolg!",
      desc: "Ihr Vormund wurde über Ihre Anfrage informiert. "
    }
  },
  films: {
    title: "Filmdatenbank"
  },
  languages: {
    pl: "Polieren",
    en: "Englisch",
    uk: "ukrainisch",
    de: "Deutsch"
  },
  roles: {
    title: "Rollen",
    saveAction: "Änderungen speichern",
    saved: "Die Änderungen wurden umgesetzt",
    permissions: {
      adminPanelAccess: "Zugriff auf das Administrationspanel (admin)",
      adminUsersRead: "Benutzer lesen (admin)",
      adminUsersEdit: "Benutzer bearbeiten (Admin)",
      adminUsersRemove: "Benutzer löschen (Administrator)",
      adminUsersActivate: "Benutzeraktivierung (Administrator)",
      adminWorkshopsRead: "Lesetraining (admin)",
      adminWorkshopsEdit: "Redaktionsschulung (Administrator)",
      adminWorkshopsRemove: "Training löschen (Administrator)",
      adminWorkshopsCreate: "Schulung erstellen (Administrator)",
      adminMenuLinksRead: "Menü-Links lesen (Administrator)",
      adminMenuLinksEdit: "Menü-Links bearbeiten (Administrator)",
      adminMenuLinksRemove: "Menü-Links entfernen (Administrator)",
      adminMenuLinksCreate: "Menü-Links erstellen (Admin)",
      adminUsefulLinksRead: "Nützliche Links lesen (admin)",
      adminUsefulLinksEdit: "Nützliche Links bearbeiten (Admin)",
      adminUsefulLinksRemove: "Nützliche Links entfernen (Administrator)",
      adminUsefulLinksCreate: "Nützliche Links erstellen (Admin)",
      adminPagesRead: "Unterseiten lesen (Admin)",
      adminPagesEdit: "Unterseiten bearbeiten (Admin)",
      adminPagesRemove: "Unterseiten löschen (Admin)",
      adminPagesCreate: "Unterseiten erstellen (Admin)",
      adminWebinarsRead: "Webinare lesen (admin)",
      adminWebinarsEdit: "Webinare bearbeiten (Administrator)",
      adminWebinarsRemove: "Webinare löschen (Administrator)",
      adminWebinarsCreate: "Webinare erstellen (Administrator)",
      adminRolesRead: "Rollen lesen (admin)",
      adminRolesEdit: "Rollen bearbeiten (Administrator)",
      adminAnnouncementsRead: "Anzeigen lesen (admin)",
      adminAnnouncementsEdit: "Anzeigen bearbeiten (Administrator)",
      adminAnnouncementsRemove: "Anzeigen löschen (Administrator)",
      adminAnnouncementsCreate: "Ankündigungen erstellen (Admin)",
      adminNotificationsRead: "Lesebenachrichtigungen (Administrator)",
      adminNotificationsEdit: "Benachrichtigungen bearbeiten (Administrator)",
      adminCustomNotificationsRead: "Benutzerdefinierte Benachrichtigungen lesen (Administrator)",
      adminCustomNotificationsEdit: "Benutzerdefinierte Benachrichtigungen bearbeiten (Administrator)",
      adminCustomNotificationsRemove: "Benutzerdefinierte Benachrichtigungen löschen (Administrator)",
      adminCustomNotificationsCreate: "Benutzerdefinierte Benachrichtigungen erstellen (Administrator)",
      adminProtegesPromoteToLEADER: "Beförderung eines Partners zum Leiter (Administrator)",
      adminProtegesPromoteToADMIN: "Beförderung eines Leiters zum Administrator (admin)",
      adminProtegesDemoteToLEADER: "Degradierung des Admins zum Leader (Admin)",
      adminProtegesDemoteToPARTNER: "Degradierung des Leiters zum Partner (Administrator)",
      adminProtegesChangeMentor: "Vormund des Partners ändern (Admin)",
      adminProductsRead: "Produkte lesen (admin)",
      adminProductsEdit: "Produktedition (Administrator)",
      adminProductsRemove: "Produkte löschen (Administrator)",
      adminProductsCreate: "Produkterstellung (Administrator)",
      adminProductsCategoryRead: "Produktkategorien lesen (Administrator)",
      adminProductsCategoryEdit: "Produktkategorien bearbeiten (Administrator)",
      adminProductsCategoryRemove: "Eine Produktkategorie löschen (Administrator)",
      adminProductsCategoryCreate: "Produktkategorien erstellen (Administrator)",
      customWorkshopsRead: "Lesen Sie Ihre eigenen Schulungen",
      customWorkshopsEdit: "Bearbeiten Sie Ihr eigenes Training",
      customWorkshopsRemove: "Löschen eigener Schulungen",
      customWorkshopsCreate: "Erstellen Sie Ihr eigenes Training",
      protegesInvite: "Partner einladen",
      protegesRead: "Lesepartner",
      protegesRemove: "Partner entfernen",
      workshopsRead: "Lesetraining",
      workshopsCreate: "Ausbildung erstellen",
      webinarsAccess: "Zugang zu Webinaren",
      productsAccess: "Zugang zu Produkten",
      adminPostsRead: "Beiträge lesen (admin)",
      adminPostsEdit: "Beiträge bearbeiten (Administrator)",
      adminPostsRemove: "Beiträge löschen (Admin)",
      adminPostsCreate: "Beiträge erstellen (Administrator)",
      adminCertificatesRead: "Lesezeugnisse (admin)",
      adminCertificatesEdit: "Zertifikate bearbeiten (Admin)",
      adminCertificatesRemove: "Zertifikate löschen (Admin)",
      adminCertificatesCreate: "Zertifikate erstellen (Admin)",
      adminFaqsRead: "FAQ lesen (admin)",
      adminFaqsEdit: "FAQ bearbeiten (Administrator)",
      adminFaqsRemove: "FAQ löschen (Administrator)",
      adminFaqsCreate: "FAQ erstellen (Administrator)",
      adminCandidateQuizRead: "Lesen Sie die Quizfragen der Kandidaten (Administrator)",
      adminCandidateQuizEdit: "Kandidatenquiz bearbeiten (Administrator)",
      adminCandidateQuizRemove: "Kandidatentests löschen (Administrator)",
      adminCandidateQuizCreate: "Kandidatenquiz erstellen (Administrator)",
      adminSystemPersonalizationRead: "Personalisierung des Lesesystems (Administrator)",
      adminSystemPersonalizationEdit: "Systempersonalisierung bearbeiten (Administrator)",
      protegesChangeMentor: "Wechsel des Vormunds des Partners",
      chatAccess: "Zugang zum Chat",
    }
  },
  courseChallenges: {
    title: "Tag {0}",
    challenges: {
      title: "Die heutigen Herausforderungen"
    },
    summary: {
      success: {
        title: "Glückwunsch!"
      },
      failure: {
        title: "Bedauerlicherweise...",
        description: "<p>Es tut uns leid, dass Sie nicht umsetzen, was wir vereinbart haben.</p><p>Denken Sie daran, dass Sie selbst entscheiden, wie Ihre Zukunft aussieht. </p><p>Allerdings hängt alles von Ihrem Engagement ab – ohne dieses können wir Ihnen nicht helfen.</p><p>Aber... Kopf hoch! <strong>Morgen ist auch ein Tag</strong> :) :)</p><p>Lass dies Dein Neuanfang sein!</p>"
      }
    }
  },
  programChallenges: {
    challenges: {
      title: "Die heutigen Herausforderungen"
    },
    summary: {
      success: {
        title: "Glückwunsch!",
        progress: "<p><strong>Heute haben Sie {0} % Ihrer Aufgaben erledigt</strong></p>"
      },
      failure: {
        title: "Bedauerlicherweise...",
        description: "<p>Es tut uns leid, dass Sie nicht umsetzen, was wir vereinbart haben.</p><p>Denken Sie daran, dass Sie selbst entscheiden, wie Ihre Zukunft aussieht. </p><p>Allerdings hängt alles von Ihrem Engagement ab – ohne dieses können wir Ihnen nicht helfen.</p><p>Aber... Kopf hoch! <strong>Morgen ist auch ein Tag</strong> :) :)</p><p>Lass dies Dein Neuanfang sein!</p>",
        progress: "<p><strong>Ihr Ergebnis beträgt heute nur {0} % :(</strong></p>"
      }
    }
  },
  usefulLinks: {
    title: "Nützliche Links"
  },
  currentProgram: {
    title: "Aktuelles Programm"
  },
  currentCourse: {
    title: "Tageskurs"
  },
  offline: {
    title: "Keine Internetverbindung",
    description: "Überprüfen Sie Ihre Verbindung und versuchen Sie es erneut."
  },
  workInProgress: {
    title: "Unter Modernisierung",
    description: "Entschuldigen Sie die Unannehmlichkeiten. "
  },
  personalizedContent: {
    title: "Personalisierung von Systeminhalten",
    contentUpdated: "Der Inhalt wurde aktualisiert",
    fields: {
      name: "Name (Bezeichner)",
      title: "Titel",
      content: "Inhalt"
    },
    editAction: "Änderungen speichern",
    edit: {
      title: "Inhalte bearbeiten"
    }
  },
  candidateQuiz: {
    start: "Start",
    goToQuiz: "Gehe zum Quiz",
    checkAnswers: "Antworten kontrollieren",
    requiredMinScore: "Überschreitungsschwelle ist ",
    goFurther: "Weiter gehen",
    refresh: "Versuchen Sie es erneut"
  },
  newsletter: {
    fields: {
      firstName: "Vorname",
      lastName: "Familienname, Nachname",
      email: "Email"
    },
    error: "Füllen Sie alle Felder aus!",
    errorDescription: "Alle Felder sind erforderlich...",
    subscribed: "Newsletter abonniert!",
    subscribedDescription: "Danke :)",
    goToApp: "Gehen Sie zur App"
  }
}