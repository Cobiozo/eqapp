const globalConfig = {
  mails: {
    footer: `
    <p></p>
    <p>Pozdrawiamy,<br>
    Zespół EQApp</p>
    `,
  }
}

export default {
  setup: {
    title: "Witamy w aplikacji EQApp!",
    chooseLanguage: "Wybierz język",
    thisSeetingCanBeLaterChanged: "To ustawienie można później zmienić.",
    signUpForNewsletter: "Zapisz się na newsletter",
    skip: "Pomiń",
    subscribe: "Zapisz się",
    langNotSupported: "Wybrany język nie jest wspierany.",
  },
  joinUs: {
    title: "Skontaktuj sie z nami :)",
    fields: {
      name: "Imię i nazwisko",
      email: "E-mail",
      phone: "Nr. telefonu",
      content: "Wiadomość",
    },
    error: "Wypełnij wymagane pola",
    errorDescription: "Wszystkie pola muszą zostać wypełnione.",
    messageSent: "Wiadomość wysłana!",
    messageSentDescription: "Dziękujemy za kontakt! Na pewno się odezwiemy :)",
  },
  whatAmIDoingHere: {
    title: "Miło Cię poznać! :)",
    content: "Wygląda na to, że nie przybyłeś do nas z poleceniami żadnego z partnerów. Będzie nam niezmiernie miło, jeśli podzielisz się informację, jak trafiłeś do naszej aplikacji! :)",
    skip: "Przejdź do aplikacji",
    fields: {
      content: "Treść",
      name: "Imię i nazwisko",
      email: "E-mail",
      phone: "Nr. telefonu",
    },
    messageSent: "Wiadomość wysłana!",
    messageSentDescription: "Dziękujemy za informację! Teraz możesz już śmiało przejść do aplikacji! :)",
    goToApp: "Przejdź do aplikacji",
    error: "Wypełnij wymagane pola",
    errorDescription: "Imię oraz treść są wymagane.",
  },
  clients: {
    links: {
      home: "Strona główna",
      services: "Usługi",
      webinars: "Webinary",
      products: "Produkty",
      contact: "Kontakt",
      articles: "Artykuły",
      shop: "Sklep",
      aboutUs: "O nas",
      cookies: "Polityka cookies",
      partnerZone: "Strefa partnera",
    },
    aboutUs: {
      title: "O nas",
      description: "<strong>Estera i Kamil Hanasz</strong> - Jesteśmy profesjonalnym małżeństwem, które reprezentuje norweską firmę EQOLOGY na polskim oraz europejskim rynku. Z determinacją, zaangażowaniem i unikalną wizją tworzymy trwałe relacje biznesowe, wprowadzając innowacyjne rozwiązania. Nasza pasja do pracy oraz skupienie na jakości sprawiają, że mamy zaszczyt dostarczać klientom produkty i usługi najwyższej klasy. Dzięki wspólnemu wysiłkowi i zrozumieniu potrzeb rynku, dążymy do osiągnięcia sukcesu zarówno dla naszej firmy, jak i dla naszych partnerów biznesowych.",
      myMission: "Moja Misja",
      estera: `
      Moja misja to pomagać kobietom na całym świecie i udowadniać, że każda z nas ma niezwykłą wartość, którą czasem trzeba tylko lekko odkryć. Ukończyłam szkołę sztuk pięknych, zdobywając tytuł artystki i malarki, a następnie studiowałam grafikę komputerową. Przez całe życie pragnęłam być wsparciem dla innych.
      1 października 2015 roku, razem z mężem, wprowadziłam firmę Eqology, która obecnie ma ponad 40 000 zadowolonych klientów. Obecnie pełnię najwyższe stanowisko w historii firmy, jako jedyna kobieta, osiągając pozycję Double Diamond Ambassador. Każdego dnia dążę do większych celów, świadoma, że jeszcze tysiące ludzkich serc potrzebuje wsparcia. To dla mnie nie tylko praca, to pasja i zaangażowanie w zmianę życia innych kobiet na lepsze.
      `,
      kamil: `
      Moją misją jest niesienie pomocy drugiemu człowiekowi i wspieranie go w odnajdywaniu działań w biznesie. Stwarzam możliwości i oferuję wsparcie. Marka, którą razem z żoną postanowiliśmy promować, doskonale współgra z naszymi wartościami. Dlaczego? Ponieważ marka Eqology to produkty i marketing na najwyższym poziomie, a my jesteśmy zdecydowani angażować się tylko w sprawy, które są zgodne z naszymi standardami. Naszym priorytetem jest zapewnienie klientom produktów najwyższej jakości oraz obsługi premium. Wybieramy markę, która gwarantuje, że nasi klienci zawsze otrzymają to, co najlepsze, a plan wynagrodzeń oferuje szanse każdej osobie, aby odnieść sukces z najwyższej jakości standardami.
      `,
      weInviteYouToContact: "Zapraszamy do kontaktu",
      weInviteYouToCollaboration: "Zapraszamy do współpracy",
      benefits: {
        experience: {
          title: "Ekspertyza i Doświadczenie",
          content: "Działamy na rynku z powodzeniem od wielu lat, zdobywając w tym czasie niezbędną wiedzę i doświadczenie. Nasza firma może pochwalić się ekspertyzą w swojej dziedzinie, co gwarantuje profesjonalizm i wysoką jakość świadczonych usług."
        },
        creativity: {
          title: "Innowacyjne Rozwiązania i Kreatywność",
          content: "Jesteśmy zawsze otwarci na nowe wyzwania i gotowi dostosować się do dynamicznie zmieniającego się rynku. Nasza firma wyróżnia się innowacyjnym podejściem oraz kreatywnością, co pozwala nam oferować unikalne rozwiązania dostosowane do indywidualnych potrzeb naszych partnerów biznesowych.",
        },
        trust: {
          title: "Zaufanie i Solidność",
          content: "Działamy na zasadach etyki biznesowej, dbając o partnerskie relacje oparte na wzajemnym zaufaniu. Nasza solidność i terminowość wykonania zobowiązań sprawiają, że współpraca z nami to gwarancja stabilności i długoterminowego partnerstwa."
        },
      },
      sloganOne: "Współpraca z nami to wybór <strong>solidności</strong>, <strong>kreatywności</strong> oraz <strong>doświadczenia.</strong>",
      sloganTwo: "Razem możemy osiągnąć wspólne cele i wzajemnie się rozwijać.",
      contact: "Zapraszamy do kontaktu",
      ourVision: {
        title: "Nasza wizja",
        content: "Dążymy do bycia liderem w branży wellness, świadcząc usługi i dostarczając produkty najwyższej jakości, które przyczyniają się do poprawy jakości życia naszych klientów, zachęcając ich do zdrowszego i bardziej kontrolowanego stylu życia."
      }
    },
    splash: {
      meetEqology: "Poznaj Eqology",
      meetEqologySlogan: "Sprawdź nasze <strong>specjalistyczne</strong> produkty o <strong>najwyższej</strong> jakości!",
      healthProtect: "Zadbamy o Twoje zdrowie!",
      goToShop: "Poznaj nasze produkty",
    },
    products: {
      title: "Poznaj nasze produkty",
      slogan: "U nas zawsze najważniejsza jest <strong>JAKOŚĆ</strong>",
      idealFor: "Idealne dla...",
      clients: {
        professionals: "Profesjonalistów",
        athletes: "Sportowców",
        you: "Dla Ciebie!",
      },
      reason: "Bo każdy zasługuje na <strong>długie</strong> i <strong>zdrowe</strong> życie!",
      seeMore: "Zobacz więcej",
      ourProducts: "Nasze produkty",
      fromProducer: "Zakup od producenta",
      deliveryInTwoDays: "Dostawa: 2 dni robocze!",
      buyNow: "Kup teraz",
      theChoiceIsYours: "Wybór należy do Ciebie!",
      shop: "SKLEP!"
    },
    contact: {
      title: "Skontaktuj się z nami",
      sendUsEmail: "Wyślij do nas e-mail",
    },
    whatAmIDoingHere: {
      title: "Miło Cię poznać! :)",
      content: "Wygląda na to, że nie przybyłeś do nas z poleceniami żadnego z partnerów. Będzie nam niezmiernie miło, jeśli podzielisz się informację, jak trafiłeś na naszą stronę :)",
    },
    cookies: {
      title: "Polityka cookies",
      content:`

<p>Nasza strona internetowa korzysta z plików cookie, aby zapewnić Ci najlepsze doświadczenie użytkownika. Poniżej znajdują się informacje dotyczące naszej polityki cookies, zgodnie z wymogami RODO.</p>

<h2>1. Czym są pliki cookie?</h2>

<p>Pliki cookie to niewielkie pliki tekstowe przechowywane na Twoim urządzeniu (takim jak komputer, tablet czy smartphone), gdy odwiedzasz naszą stronę. Są one szeroko stosowane w celu poprawy funkcjonalności strony oraz dostarczenia bardziej spersonalizowanego doświadczenia.</p>

<h2>2. Rodzaje plików cookie, których używamy</h2>

<p>Na naszej stronie internetowej używamy następujących rodzajów plików cookie:</p>

<p>- Pliki cookie niezbędne do działania strony: pozwalają na wyświetlanie zawartości i korzystanie z naszej strony, tak aby mogła ona działać poprawnie.</p>
<p>- Pliki cookie analityczne/statystyczne: umożliwiają nam analizowanie danych dotyczących korzystania z naszej strony, co pozwala nam ulepszać jej działanie i dostosowywać nasze usługi do Twoich preferencji.</p>
<p>- Pliki cookie reklamowe: umożliwiają nam wyświetlanie spersonalizowanych reklam, które są bardziej odpowiednie dla Ciebie.</p>

<h2>3. Twoja zgoda na pliki cookie</h2>

<p>Przy pierwszym odwiedzeniu naszej strony zostajesz poinformowany(a) o naszej polityce cookies. Korzystając dalej z naszej strony, zgadzasz się na używanie plików cookie zgodnie z naszą polityką.</p>

<h2>4. Zarządzanie ustawieniami cookies</h2>

<p>Jeśli chcesz zablokować lub usunąć pliki cookie z Twojego urządzenia, możesz to zrobić poprzez zmianę ustawień przeglądarki internetowej. Pamiętaj jednak, że blokowanie plików cookie może wpłynąć na funkcjonalność naszej strony.</p>

<h2>5. Kontakt</h2>

<p>W przypadku pytań lub wątpliwości dotyczących naszej polityki dotyczącej plików cookie, możesz skontaktować się z nami pod adresem support@esteraikamilhanasz.pl.

Zachowujemy się zgodnie z wymogami RODO, aby chronić Twoje dane osobowe i zapewnić Ci bezpieczne korzystanie z naszej strony. Dziękujemy za zaufanie, jakim nas obdarzasz, odwiedzając naszą stronę.</p>
      `
    },
    posts: {
      readMore: "Zapraszamy!",
      readMe: "Czytaj",
      title: "Artykuły",
      description: `Baza z artykułami pozostaje uzupełniona.<br>
      Wkrótce pojawią się nowe artykuły oraz filmy ze specjalistami.`
    },
    why: {
      title: "Dlaczego Eqology?",
      health: {
        title: "Zdrowie",
        desc: "Zadbaj o swoje zdrowie! W naszym katalogu znajdziesz tylko <strong>certyfikowane</strong> produkty <strong>najwyższej jakości</strong>, spełniające najbardziej rygorystyczne normy.",
      },
      experience: {
        title: "Doświadczenie",
        desc: "Jesteśmy na rynku od lat. Działamy w <strong>Polsce i całej <strong>Europie</strong>."
      },
      satisfaction: {
        title: "Gwarancja satysfkacji",
        desc: "Stoją za nami <strong>tysiące zadowolonych klientów</strong>. Spróbuj naszych produktów i przekonaj się sam!"
      },
      learnMore: "Zapraszamy!",
      slogan: "Certyfikaty/Badania/Artykuły"
    },
    meetUs: {
      title: "Eqology = ludzie",
      slogan: "Poznaj nas lepiej!",
      description: `
      <p>Estera i Kamil to projektodawcy zespołu EQOLOGY w polskim oraz litewskim rynku.</p>
      <p><em>"Oferujemy pełen pakiet usług które stanowią ekskluzywną ofertę dla naszych innowacyjnych produktów".</em>
      `,
      link: "O nas",
      marriageContent: `
      Dobra współpraca między ludźmi stanowi kluczowy element sukcesu w wielu zastosowaniach życia. Otwarta komunikacja i możliwości słuchania są jednym z najważniejszych wyników lub odpowiedzi na pytania, które rozstrzygają o rozwiązaniu problemu. Zrozumienie i ocena wobec różnorodności, tworzenie kreatywnych i zrównoważonych alternatyw, daje dobrą współpracę wspieraną przez udział wszystkich uczestników.`,
      signature: "Estera i Kamil Hanasz",
      signatureDesc: "Projektodawcy EQOLOGY w Polsce oraz Litwie",
    },
    newsletter: {
      title: "Zarejestruj się do grupy e-mailingowej",
      beUpdated: "Bądź na bieżąco z...",
      news: "Nowościami",
      promotions: "Promocjami",
      webinars: "Webinarami",
      tips: "Poradami",
    },
    footer: {
      copyright: "© Estera i Kamil Hanasz"
    },
    faqs: {
      title: "Najczęściej zadawane pytania"
    },
    whyUs: {
      title: "Dlaczego Eqology?",
      question: "Dlaczego warto nam zaufać?",
     
      slogan: "Najwyższa Światowa jakość jest dla nas NAJWAŻNIEJSZA!",
      certificates: "Certyfikaty",
      products: "Produkty",
      faq: "FAQ",
    },
    certificates: {
      title: "Zaufaj ekspertom",
      description: "Nasze produkty zostały wielokrotnie sprawdzone, przebadane oraz nagradzane. Nasza jakość jest niepodważalna.",
      slogan: "Wybierz mądrze – <strong>wybierz Eqology</strong>.",
      seeMore: "Dowiedz się więcej",
    },
    meetOurProducts: {
      title: "Poznaj nasze produkty",
      goToShop: "Przejdź do sklepu",
    },
    webinars: {
      businessWebinars: "Webinary biznesowe",
      clientWebinars: "Webinary dla klientów",
      register: "Zapisz się",
      noData: "Na razie niczego jeszcze nie zaplanowaliśmy... Wróć do nas wkrótce :)",
      subscribe: "Zapisz się",
      success: {
        title: "Sukces!",
        description: "Udało się! Wysłaliśmy na Twój adres e-mail link weryfikacyjny. Sprawdź swoją skrzynkę i wejdź w otrzymany link, aby dokończyć rejestrację do webinaru.",
      },
      youHaveToVerify: {
        title: "Potwierdź e-mail",
        description: "Zanim zapiszesz się na webinar, musisz potwierdzić swój adres e-mail. Sprawdź swoją skrzynkę odbiorczą.",
      },
      invitationExpired:{
        title: "Ups...",
        description: "Zaproszenie wygasło albo webinar już się odbył.",
      },
    }
  },
  common: {
    share: "Udostępnij",
    goTop: "Do góry!",
    languages: {
      intl: "Wszystkie języki",
      pl: "Polski",
      en: "Angielski",
      uk: "Ukraiński",
      lt: "Litewski",
      de: "Niemiecki",
    },
    weekDays: {
      1: "Poniedziałek",
      2: "Wtorek",
      3: "Środa",
      4: "Czwartek",
      5: "Piątek",
      6: "Sobota",
      7: "Niedziela",
    },
    weekDaysShort: {
      1: "Pon",
      2: "Wto",
      3: "Śro",
      4: "Czw",
      5: "Pią",
      6: "Sob",
      7: "Nie",
    },
    months: {
      1: "Styczeń",
      2: "Luty",
      3: "Marzec",
      4: "Kwiecień",
      5: "Maj",
      6: "Czerwiec",
      7: "Lipiec",
      8: "Sierpień",
      9: "Wrzesień",
      10: "Październik",
      11: "Listopad",
      12: "Grudzień",
    },
    submit: "Wyślij",
    save: "Zapisz",
    goBack: "Wróć",
    file: "Plik",
    language: "Język",
    none: "Brak",
    return: "Wróć",
    error: "Bład",  
    changeSpeed: "Zmień tempo",
    goBackToHome: "Wróć do strony głównej",
    noData: "Brak danych",
    noDataDesc: "Brak danych do wyświetlenia",
    noDataFound: "Brak wyników",
    noDataFoundDesc: "Do podanej frazy nie udało się dopasować żadnych wyników.",
    notFound: "Nie znaleziono",
    unexpectedError: "Wystąpił błąd",
    unexpectedErrorDescription: "Wystąpił nieoczekiwany błąd. Spróbuj ponownie później.",
    unauthorized: "Brak dostępu",
    unauthorizedDescription: "Nie masz uprawnień do przeglądania tej strony.",
    somethingWentWrong: "Coś poszło nie tak...",
    somethingWentWrongDescription: "Wystąpił nieoczekiwany błąd. Spróbuj ponownie później.",
    noInternet: "Brak połączenia z internetem",
    noInternetDescription: "Sprawdź swoje połączenie z internetem i spróbuj ponownie.",
    badRequest: "Nieprawidłowe żądanie",
    badRequestDescription: "Żądanie zawiera nieprawidłowe dane.",
    chosen: "Wybrano",
    confirm: "Potwierdź",
    cancel: "Anuluj",
    edit: "Edytuj",
    close: "Zamknij",
    create: "Dodaj",
    remove: "Usuń",
    search: "Wyszukaj...",
    searchResults: "Wyniki wyszukiwania",
    select: "Wybierz",
    addAttachment: "Dodaj załącznik",
    translations: "Wersje językowe",
    categories: "Kategorie",
    category: "Kategoria",
    currentBrowsing: "Aktualnie przeglądasz",
    otherTranslations: "Inne wersje językowe",
    addTranslation: "Dodaj tłumaczenie",
    relatedFiles: "Powiązane pliki",
    relatedImages: "Powiązane grafiki",
    relatedVideos: "Powiązane filmy",
    schedule: "Harmonogram",
    challenges: "Wyzwania",
    days: "dni",
    hours: "godzin",
    minutes: "minut",
    seconds: "sekund",
    ready: "Już startujemy!",
    motivate: "Zmotywuj się :)",
    watch: "Oglądaj",
    validation: {
      dateInPast: "Data nie może być z przeszłości",
      errorsExist: "Wystąpiły błędy...",
      required: "To pole jest wymagane",
      minLength: "Min. liczba znaków to {0}",
      maxLength: "Maks. liczba znaków to {0}",
      minArrayLength: "Minimalnie {0} elementów",
      maxArrayLength: "Maksymalnie {0} elementów",
      min: "Minimalna wartość to {0}",
      max: "Maksymalna wartość to {0}",
      isEmail: "Nieprawidłowy adres email",
      isNumber: "To musi być liczba",
      passwordRepeat: "Hasła nie są identyczne",
      pattern: "Nieprawidłowy format",
      invalidType: "Nieprawidłowy typ",
      imageType: "Wspierane typy to {0}",
      imagesType: "Przynajmniej jeden obrazek ma zły format (wspierane typy: {0}",
      filesSize: "Przynajmniej jeden plik ma zły rozmiar (maksymalnie {0} MB)",
      fileSize: "Maksymalny rozmiar pliku to {0} MB",
      imageSize: "Obrazek ma nieprawidłowy rozmiar lub proporcje",
      select: "Niepoprawna opcja",
      date: "Nieprawidłowa data",
      dataList: "Wybrano niedozwolone wartości",
      dateEndTooEarly: "Data końcowa musi być późniejsza niż początkowa",
      wysiwygNoFiles: "Nie dostarczono informacji o plikach dla pola WYSIWYG",
      wysiwygImagesAmount: "Liczba przesłanych obrazków nie zgadza się z oczekiwaną (pole WYSIWYG)",
      notFound: "Nie udało się odnaleźć żądanego elementu",
      fileUploadError: "Błąd podczas przesyłania pliku, prawdopodobnie plik jest zbyt duży. Maksymalny rozmiar pliku to {0} MB",
      fileType: "Nieprawidłowy format pliku (wspierane formaty: {0})",
      multiLangRequired: "Brakuje bazowego tłumaczenia",
      emailRepeat: "E-maile nie są identyczne",
    },
    roles: {
      CLIENT: "Klient",
      ADMIN: "Admin",
      LEADER: "Lider",
      PARTNER: "Partner",
      CANDIDATE_PARTNER: "Kandydat na partnera",
    },
  },
  dashboard: {
    welcome: "Witajcie na platformie szkoleniowej!",
    welcomeMessage: `
      <p>Jesteśmy bardzo podekscytowani, że możemy zacząć tę podróż razem. Wszystkie niezbędne materiały do szkoleń znajdują się teraz w jednym miejscu, dzięki czemu łatwiej będzie nam wszystkim śledzić postępy i osiągać nasze cele. Mamy nadzieję, że będzie to dla nas wszystkich wyjątkowe doświadczenie edukacyjne!</p>
      
      <p>Pozdrawiamy i Powodzenia</p>
      <p>Estera i Kamil Hanasz</p>
    `
  },
  mails: {
    unverifiedAccountRemoved: {
      subject: "Twoje konto zostało usunięte",
      text: `
        <p>Cześć,</p>
        <p>Jako, że Twój adres e-mail nie został zweryfikowany w ciągu 12h od rejestracji, Twoje konto zostało usunięte :(</p>
        <p>Zachęcamy do ponownej rejestracji!</p>
        ${globalConfig.mails.footer}
      `
    },
    verificationReminder: {
      subject: "Zapraszamy do aplikacji :)",
      text: `
        <p>Czesć,<p>
        <p>Przypominamy, że Twoje konto jest już aktywne.</p>
        <p>Jeśli więc jeszcze się nie zalogowałeś/zalogowałaś, to zapraszamy do aplikacji :)</p>
        <p>Śmiało możesz zapraszać już do niej również swoich partnerów.</p>
        <p>Do zobaczenia!</p>
        ${globalConfig.mails.footer}
      `
    },
    unexpectedVisitMail: {  
      subject: "Nieoczekiwana wizyta",
      text: `
        <p>Cześć,</p>
        <p>Wygląda na to, że ktoś trafił na naszą stronę bez polecenia żadnego z partnerów. Zapytaliśmy go o to, skąd sie u nas znalazł. Jego odpowiedź to:</p>
        <p><em>{0}</em></p>
        <p>Jego dane to <strong>{1}</strong></p>
        ${globalConfig.mails.footer}
      `
    },
    contactMail: {
      subject: "Nowa wiadomość ws. współpracy",
      text: `
        <p>Cześć,</p>
        <p>Wygląda na to, że ktoś chce się z Tobą skontaktować :)</p>
        <strong>{0}</strong></p>
        <p>Wiadomość:</p>
        <p><em>{1}</em></p>
        ${globalConfig.mails.footer}
      `
    },
    webinarStartsNow: {
      subject: "Zaczynamy! :)",
      text: `
        <p>Webinar <strong>{0}</strong> właśnie się rozpoczął.</p>
        <p>Kliknij <strong><a href="{1}">tutaj</a></strong>, aby dołączyć.</p>
        <p>Czekamy na Ciebie! :)</p>
        ${globalConfig.mails.footer}
      `
    },
    webinarStartsInTenMinutes: {
      subject: "Za chwilę zaczynamy! :)",
      text: `
        <p>Webinar <strong>{0}</strong> rozpocznie się już za 10 minut!</p>
        <p>Kliknij <strong><a href="{1}">tutaj</a></strong>, aby dołączyć już teraz.</p>
        <p>Do zobaczenia! :)</p>
        ${globalConfig.mails.footer}
      `
    },
    webinarStartsInOneHour: {
      subject: "Odliczamy...",
      text: `
        <p>Webinar <strong>{0}</strong> startuje już za godzinę!</p>
        <p>Poniżej znajdziesz Twój spersonalizowany link do wydarzenia</p>
        <p><strong><a href="{1}">Kliknij tutaj</a></strong>
        <p>Do zobaczenia! :)</p>
        ${globalConfig.mails.footer}
      `
    },
    confirmEmail: {
      subject: "Potwierdź adres e-mail",
      text: `
        <p>Cześć,</p>
        <p>Dziękujęmy za rejestrację! Aby potwierdzić swój adres e-mail kliknij w poniższy link:</p>
        <p><strong><a href="{0}">Kliknij tutaj</a></strong></p>
        ${globalConfig.mails.footer}
      `
    },
    waitForActivationEmail: {
      subject: "Czekaj na aktywację",
      text: `
        <p>Cześć,</p>
        <p>Twoje konto zostało poprawnie zarejestrowane, a e-mail pozytywnie zweryfikowany.</p>
        <p>Pozostaje Ci już tylko czekać na aktywację przez administratora.</p>
        <p>Spokojnie, to nie potrwa długo! ;) Dziękujemy za cierpliwość!</p>
        ${globalConfig.mails.footer}
      `
    },
    confirmWebinarEmail: {
      subject: "Potwierdź adres e-mail",
      text: `
        <p>Cześć,</p>
        <p>Dziękujęmy za zainteresowanie naszym webinarem! Aby zweryfikować swój adres e-mail i potwierdzić obecność, kliknij w poniższy link:</p>
        <p><strong><a href="{0}">Kliknij tutaj</a></strong></p>
        ${globalConfig.mails.footer}
      `
    },
    confirmWorkshopEmail: {
      subject: "Potwierdź adres e-mail",
      text: `
        <p>Cześć,</p>
        <p>Dziękujęmy za zainteresowanie naszymi webinarami! Aby zweryfikować swój adres e-mail i kontynuować kliknij w poniższy link.</p>
        <p><strong><a href="{0}">Kliknij tutaj</a></strong></p>
        ${globalConfig.mails.footer}
      `
    },
    webinarInvitation: {
      subject: 'Zaproszenie na "{0}"',
      text: `
        <p>Cześć,</p>
        <p>Mamy dla Ciebie spersonalizowane zaproszenie na ten webinar :)</p>
        <p><a target="_blank" href="{0}">Zaakceptuj</a></p>
        ${globalConfig.mails.footer}
      `
    },
    webinarConfirmation: {
      subject: "Webinar potwierdzony! :)",
      text: `
        <p>Cześć,</p>
        <p>Twój udział w webinarze został potwierdzony! :)</p>
        <p>Czekamy na Ciebie <strong>{0}</strong> pod tym <strong><a target="_blank" href="{1}">linkiem</a></strong></p>
        ${globalConfig.mails.footer}
      `
    },
    userPromoted: {
      subject: "Awans! :)",
      text: `
      <p>Cześć,</p>
      <p>Twój opiekun postanowił Cię awansować!</p>
      <p>Twoje nowe stanowisko to <strong>{0}</strong>. Serdecznie Ci gratulujemy! :)</p>
      ${globalConfig.mails.footer}
      `
    },
    passwordReset: {
      subject: "Twoje hasło zostało zresetowane",
      text: `
      <p>Cześć,</p>
      <p>Zgodnie z Twoją prośbą, zresetowaliśmy Twoje hasło.</p>
      <p style="border: 0.3em solid #000; padding: 1em; width: fit-content;">Nowe hasło to: <b>{0}</b></p>
      <p>Po zalogowaniu, ze względów bezpieczeństwa, warto zmienić hasło na nowe.</p>
      <p></p>
      <p>Jeśli nie prosiłeś o zmianę hasła, zignoruj ten e-mail.<p>
      ${globalConfig.mails.footer}
      `
    },
    userActivated:{
      subject: "Twoje konto zostało aktywowane",
      text: `
      <p>Cześć,</p>
      <p>Twoje konto zostało aktywowane! :) Możesz się już zalogować i w pełni korzystać z wszelkich dobrodziejstw naszej aplikacji.</p>
      <p>Przejdź do aplikacji klikając w poniższy link:</p>
      <p><a href="{0}">Zaloguj się</a></p>
      ${globalConfig.mails.footer}
      `
    },
    userInvited: {
      subject: "Zaproszenie do rejestracji",
      text: `
      <p>Cześć,</p>
      <p>Cieszymy się, że chcesz do nas dołączyć! :) Kliknij w poniższy link, aby zarejestrować się w naszym systemie:</p>
      <p><a href="{0}">Zarejestruj się</a></p>
      `
    },
    userRemoved:{
      subject: "Twoje konto zostało usunięte",
      text: `
      <p>Cześć,</p>
      <p>Z przykrością informujemy, że weryfikacja Twojego konta przebiegła negatywnie i zostało ono usunięte.</p>
      <p>Jeśli uważasz, że to pomyłka, skontaktuj się z nami</p>
      ${globalConfig.mails.footer}
      `
    },
    contactJoinedMentor: {
      subject: "Masz nowego partnera!",
      text: `
      <p>Cześć,</p>
      <p>Gratulujemy! Masz nowego partnera! :)</p>
      <p>Jest nim {0}. Możesz na bieżąco analizować progres tej osoby w panelu administracyjnym (zakładka "partnerzy").</p>
      ${globalConfig.mails.footer}
      `
    },
  },
  nav: {
    home: "Główna",
    webinars: "Webinary",
    products: "Produkty",
    shop: "Sklep",
    contact: "Kontakt",
    partners: "Partnerzy",
    clients: "Klienci",
    notifications: "Powiadomienia",
    films: "Filmy",
    startup: "Startup 90 dni",
    workshops: "Szkolenia",
    workshopsClient: "Strefa klienta",
    workshopsPartner: "Strefa partnera",
    myWorkshopsDescription: "Szkolenia tu zawarte będą dostępne tylko dla Twoich partnerów.",
    usefulLinks: "Przydatne linki",
    logout: "Wyloguj",
    login: "Logowanie",
    register: "Rejestracja",
    profile: "Edytuj profil",
    chooseProgram: "Wybierz program",
    boards: "System",
    admin: "Panel admina",
    partnerZone: "Strefa partnera",
    slogans: {
      spirit: "duch",
      passion: "pasja",
      togetherness: "bycie razem"
    },
    adminSubmenu: {
      webinars: "Webinary",
      users: "Użytkownicy",
      roles: "Role",
      workshops: "Szkolenia",
      proteges: "Podopieczni",
      notifications: "Powiadomienia",
      announcements: "Ogłoszenia",
      pages: "Podstrony",
      menuLinks: "Linki menu",
      products: "Produkty",
      posts: "Posty",
      certificates: "Certyfikaty",
      faqs: "FAQ",
      systemContent: "Treści systemowe",
      candidateQuizes: "Quizy dla kandydatów",
    }
  },
  verifyEmail: {
    title: "Potwiedź e-mail",
    successTitle: "Sukces!",
    successDescription: "Twój adres e-mail został potwierdzony! Musisz poczekać teraz na zaakceptowanie Twojego konta przez administratora. Wkrótce się odezwiemy! :)",
  },
  register: {
    title: "Zarejestruj się",
    createAction: "Zarejestruj się",
    chooseMentor: "Wybierz opiekuna",
    verifyCode: "To już prawie wszystko...",
    codeIsWrong: "Kod jest niepoprawny",
    verifyMail: "To już prawie wszystko! Musimy jeszcze tylko zweryfikować Twój adres e-mail. Zajrzyj na swoją skrzynkę i kliknij w link, który do Ciebie wysłaliśmy.",
    contact: {
      desc: "Twój e-mail, imię i nazwisko już znamy. Nie mamy więc dużo pytań :)",
      chooseRole: "Wybierz opcję, w której chcesz się z nami rozwijać.",
    },
    accountTypes: {
      client: "Klient",
      partner: "Partner",
    },
    fields: {
      email: "E-mail",
      emailRepeat: "Powtórz e-mail",
      password: "Hasło",
      passwordRepeat: "Powtórz hasło",
      eqId: "Nr EQOLOGY",
      firstName: "Imię",
      lastName: "Nazwisko",
      avatar: "Avatar",
      phone: "Numer telefonu",
      termsOfUse: "Wyrażam zgodę na przetwarzanie moich danych osobowych w celu poprawnej weryfikacji członkowstwa (Dz. U. z 2017 r. poz. 1219) oraz akceptuję <a class=\"link\" href=\"{0}\" target=\"_blank\">regulamin</a> i zgadzam się na zapisanie do newslettera.",
      saveToNewsletter: "Zapisz mnie do newslettera",
      saveToNewsletterDescription: "Chcę otrzymywać informacje o nowościach, promocjach i od Eqology. Spokojnie, nie spamujemy! ;)",
      emailConfirmation: "Upewniłam/em się, że e-mail jest poprawny. To bardzo ważne, bowiem po rejestracji musisz koniecznie wejść w link aktywacyjny, który do Ciebie wyślemy.",
    },
    success: {
      create: "Sukces!",
      createDesc: "Rejestracja przebiegła pomyślnie! Wejdź na swoją pocztę, aby potwierdzić e-mail.",
    },
    errors: {
      emailExists: "Użytkownik o podanym adresie email już istnieje",
      eqIdExists: "Użytkownik o podanym numerze Eqology już istnieje",
      client: {
        emailExists: "Podany adres e-mail jest już użyty przez innego klienta",
      }
    }
  },
  registerPartner: {
    title: "Zarejestruj się",
    createAction: "Zarejestruj się",
    fields: {
      email: "E-mail",
      password: "Hasło",
      passwordRepeat: "Powtórz hasło",
      oriflameId: "Nr Klubowicza",
      firstName: "Imię",
      lastName: "Nazwisko",
      avatar: "Avatar",
      termsOfUse: "Wyrażam zgodę na przetwarzanie moich danych osobowych w celu poprawnej weryfikacji członkowstwa (Dz. U. z 2017 r. poz. 1219) oraz akceptuję <a class=\"link\" href=\"{0}\" target=\"_blank\">regulamin</a> i zgadzam się na zapisanie do newslettera.",
    },
    success: {
      create: "Sukces!",
      createDesc: "Rejestracja przebiegła pomyślnie! Możesz się teraz zalogować :)",
    },
    errors: {
      emailExists: "Użytkownik o podanym adresie email już istnieje",
      oriflameIdExists: "Użytkownik o podanym numerze klubowicza już istnieje",
    }
  },
  profile: {
    title: "Edytuj profil",
    info: "Pola z hasłem wypełnił tylko w sytuacji, jeśli chcesz je zmienić.",
    editAction: "Zapisz zmiany",
    fields: {
      email: "E-mail",
      password: "Hasło",
      passwordRepeat: "Powtórz hasło",
      oriflameId: "Nr Klubowicza",
      firstName: "Imię",
      lastName: "Nazwisko",
      avatar: "Avatar",
      eqShopUrl: "Reflink do sklepu Eqology",
    },
    success: {
      edit: "Sukces!",
      editDesc: "Zmiany zostały wprowadzone",
    },
  },
  login: {
    title: "Logowanie",
    actionLogin: "Zaloguj się",
    actionRegister: "Zarejestruj się",
    actionReset: "Zresetuj hasło",
    dontHaveAccount: "Nie masz konta?",
    forgotPassword: "Zapomniałeś hasła?",
    fields: {
      email: "E-mail",
      password: "Hasło",
    },
    success: {
      create: "Sukces!",
      createDesc: "Logowanie przeprowadzone pomyślnie!",
    },
    errors: {
      invalidCredentials: "Nieprawidłowy adres email lub hasło",
      inactiveUser: "Twoje konto nie zostało jeszcze aktywowane",
    }
  },
  forgotPassword: {
    title: "Zapomniałeś hasła?",
    action: "Zresetuj hasło",
    fields: {
      email: "E-mail",
      eqId: "Nr EQOLOGY",
    },
    errors: {
      invalidData: "Nieprawidłowe dane",
    },
    success: {
      title: "Sukces!",
      description: "Na podany adres email został wysłany link z nowym hasłem.",
    }
  },
  cropper: {
    title: "Przytnij",
    confirm: "Zatwierdź",
    cancel: "Anuluj",
  },
  termsOfUse: {
    title: "Regulamin",
  },
  footer: {
    links: {
      admin: "Panel administracyjny",
    }
  },
  notFound: {
    title: "Ups... Nie znaleziono!",
    description: "Nie udało nam się odnaleźć żądanej strony. Upewnij się, że adres jest w porządku i spróbuj ponownie. Jeśli uważasz, że to błąd, skontaktuj się z administratorem strony.",
  },
  unauthorized: {
    title: "Ups... Nie masz uprawnień!",
    description: "Nie masz uprawnień do przeglądania tej strony. Jeśli uważasz, że to błąd, skontaktuj się z administratorem strony.",
  },
  admin: {
    title: "Panel administracyjny",
    links: {
      users: "Użytkownicy",
      workshops: "Szkolenia",
      courses: "Kursy",
      startup: "Startup 90 dni",
    }
  },
  users: {
    title: "Użytkownicy",
    invitation: {
      confirm: {
        title: "Potwierdź",
        desc: "Czy na pewno chcesz wysłać zaproszenie do rejestracji?",
      },
    },
    invite: "Zaproś",
    candidates: "Kandydaci",
    candidatesTitle: "Kandydaci na partnerów",
    invitationSent: "Zaproszenie wysłane",
    waitingForActivation: "Oczekujący na aktywację",
    activateUser: "Aktywuj",
    deleteUser: "Usuń",
    userUpdated: "Zaktualizowano użytkownika",
    allUsers: "Wszyscy użytkownicy",
    editAction: "Zapisz zmiany",
    delete: {
      confirmTitle: "Jesteś pewien?",
      confirmDesc: "Czy na pewno chcesz usunąć tego użytkownika? Ta operacja jest nieodwracalna.",
    },
    edit: {
      title: "Edytuj użytkownika",
    },
    roles: {
      client: "Klient",
      partner: "Partner",
      leader: "Lider",
      admin: "Admin",
      candidate_partner: "Kandydat na partnera",
    },
    fields: {
      firstName: "Imię",
      lastName: "Nazwisko",
      role: "Rola",
      mentor: "Opiekun",
    },
    success: {
      edit: "Sukces!",
      editDesc: "Zmiany zostały wprowadzone",
    },
  },
  workshops: {
    icons: {
      HEART: "Serce",
      LIKE: "Like",
      STATS: "Statystyki",
      CONFIG: "Koło zębate",
      WORKSHOP: "Szkolenie",
      INFO: "Informacja",
      FB: "Facebook",
      INSTAGRAM: "Instagram",
      SPORT: "Sport",
      MEDITATION: "Medytacja",
      CHAT: "Rozmowa",
      TROPHY: "Trofeum",
      STAR: "Gwiazda",
      CHALLENGE: "Wyzwanie",
      MAIL: "Poczta",
      CALENDAR: "Kalendarz",
      VIDEO: "Wideo",
      BOOK: "Książka",
      PAPER: "Kartka",
      LINK: "Link",
      FILE: "Plik",
      TEXT: "Tekst",
      PLUS: "Plus",
      MINUS: "Minus",
      CHECK: "Check",
      MUSIC: "Muzyka",
      CROSS: "Krzyżyk",
      ARROW_LEFT: "Strzałka w lewo",
      ARROW_RIGHT: "Strzałka w prawo",
      ARROW_UP: "Strzałka w górę",
      ARROW_DOWN: "Strzałka w dół",
      LOCK_OPEN: "Otwarta kłódka",
      LOCK_CLOSED: "Zamknięta kłódka",
      PIN: "Pinezka",
      PIN_TWO: "Pinezka 2",
      CHART_UP: "Wykres w górę",
      CHART_DOWN: "Wykres w dół",
      CHART_ALT: "Wykres alternatywny",
      TOOLS: "Narzędzia",
      BOMB: "Bomba",
      DYNAMITE: "Dynamit",
      DIAMOND: "Diament",
      CASH: "Gotówka",
      CASH_TWO: "Gotówka 2",
      GOLD: "Złoto",
      BUS: "Autobus",
      CAR: "Samochód",
      TAXI: "Taksówka",
      BOAT: "Łódź",
      PLANE: "Samolot",
      BIKE: "Rower",
      SMARTPHONE: "Smartfon",
      LAPTOP: "Laptop",
      DESKTOP: "Komputer stacjonarny",
      PHONE_OLD: "Stary telefon",
      KEYBOARD: "Klawiatura",
      CAMERA: "Aparat",
      COMPASS: "Kompas",
      ALARM: "Alarm",
      WOMAN: "Kobieta",
      MAN: "Mężczyzna",
      HOME: "Dom",
      BELL: "Dzwonek",
      ACADEMY: "Akademia",
      CERTIFICATE: "Certyfikat",
      LIST: "Lista",
      MOVIE: "Film",
      PROFILE: "Profil",
      CROWN: "Korona",
      KEY: "Klucz",
      PATHS: "Ścieżki",
      USERS: "Użytkownicy",
      NOTIFICATION: "Powiadomienie",
      EXIT: "Wyjście",
      CART: "Koszyk",
      FILES: "Pliki",
      FIRE: "Płomień"
    },
    title: "Szkolenia",
    firstStepsTitle: "Pierwsze kroki",
    titleClient: "Szkolenia klienta",
    titlePartner: "Szkolenia partnera",
    deleteWorkshop: "Usuń",
    allWorkshops: "Wszystkie szkolenia",
    editAction: "Zapisz zmiany",
    createAction: "Dodaj szkolenie",
    startAction: "Rozpocznij",
    step: "Krok {0}",
    noWorkshopsInStep: "Brak szkoleń w tym kroku",
    workshopCreated: "Szkolenie zostało dodane",
    workshopUpdated: "Zaktualizowano szkolenie",
    translationAdded: "Dodano tłumaczenie",
    workshopRemoved: "Szkolenie usunięte",
    noDataTitle: "Brak danych",
    noData: "Nie znaleziono żadnych szkoleń...",
    backToParent: "Wróć",
    addSubdirectory: "Dodaj podkatalog",
    addItem: "Dodaj szkolenie",
    tabs: {
      basicData: "Podstawowe",
      files: "Pliki"
    },
    delete: {
      confirmTitle: "Jesteś pewien?",
      confirmDesc: "Czy na pewno chcesz usunąć to szkolenie? Ta operacja jest nieodwracalna.",
    },
    fields: {
      name: "Nazwa",
      description: "Opis",
      icon: "Ikona",
      YTLink: "Adres URL do filmu (YT)",
      supportedRoles: "Wspierane role",
      supportedLanguages: "Wspierane języki",
      contentVideo: "Adres URL do filmu (YT)",
      contentText: "Treść tekstowa",
      poster: "Grafika",
      files: "Pliki (załączniki)",
      categoryId: "Kategoria",
      zone: "Strefa",
      step: "Krok",
      public: "Dostępne dla wszystkich",
      publicDescription: "Zaznacz, jeśli chcesz, aby szkolenie było dostępne od razu, bez potrzeby aktywacji ze strony opiekuna.",
      stepName: {
        1: "Krok 1",
        2: "Krok 2",
        3: "Krok 3",
        4: "Krok 4",
        5: "Krok 5",
        6: "Krok 6",
        7: "Krok 7",
        8: "Krok 8",
        9: "Krok 9",
        10: "Krok 10",
      }
    },
    edit: {
      title: "Edytuj szkolenie",
      desc: "Pola <strong>\"strefa\"</strong> i <strong>\"dostępne dla wszystkich\"</strong> powinny być takie same dla każdej wersji językowej szkolenia. Dlatego też, niezależnie, którą wersję aktualnie przeglądasz, modyfikujesz te pola dla wszystkich wariantów językowych.",
    },
    create: {
      title: "Dodaj szkolenie",
      translationCreationDesc: "Tworzysz nowe tłumaczenie istniejącego szkolenia",
      originalLanguage: "Oryginał",
      currentLanguage: "Tłumaczenie",
    },
    contentTypes: {
      video: "Wideo",
      text: "Treść tekstowa",
    },
    zones: {
      client: "Strefa klienta",
      partner: "Strefa partnera",
      both: "Obie strefy"
    },
    success: {
      create: "Sukces!",
      createDesc: "Szkolenie zostało dodane",
      edit: "Sukces!",
      editDesc: "Zmiany zostały wprowadzone",
    },
    errors: {
      nameExists: "Szkolenie o podanej nazwie już istnieje",
    },
    categories: {
      title: "Kategorie",
      allCategories: "Wszystkie kategorie",
      createAction: "Dodaj kategorię",
      editAction: "Zapisz zmiany",
      create: {
        title: "Dodaj kategorię",
      },
      edit: {
        title: "Edytuj kategorię",
      },
      fields: {
        name: "Nazwa",
        owner: "Kategoria rodzica",
        description: "Opis",
      },
      delete: {
        confirmTitle: "Jesteś pewien?",
        confirmDesc: "Czy na pewno chcesz usunąć tę kategorię? Ta operacja jest nieodwracalna.",
      }
    },
    steps: {
      editAction: "Zapisz zmiany",
      edit: {
        title: "Edytuj krok",
      },
      fields: {
        name: "Nazwa",
        description: "Opis",
      }
    },
    directories: {
      createAction: "Dodaj katalog",
      fields: {
        name: "Nazwa",
        description: "Opis",
        icon: "Ikona",
        supportedRoles: "Wspierane role",
        supportedLanguages: "Wspierane języki",
      },
      edit: {
        title: "Edytuj katalog",
      },
    },
  },
  partnerZone: {
    title: "Strefa partnera"
  },
  proteges: {
    title: "Podopieczni",
    tree: "Drzewo partnerów",
    candidatesTitle: "Kandydaci",
    todayProtegesCount: "Nowi partnerzy: {0}",
    treeWrongDevice: "Drzewo partnerów jest dostępne tylko na dużym ekranie",
    protegesList: "Lista partnerów",
    pendingRequests: "Oczekujące prośby",
    requestAccepted: "Prośba została zaakceptowana",
    requestRejected: "Prośba została odrzucona",
    copySingUpInviteLink: "Skopiuj link do rejestracji",
    copyClientLink: "Twój link dla Klienta (do EQAPP)",
    speedChanged: "Tempo zostało zmienione",
    myWorkshops: "Moje szkolenia",
    clients: {
      title: "Klienci",
      noClients: "Brak klientów",
      info: "Info"
    },
    candidates: {
      title: "Kandydaci",
      noCandidates: "Brak kandydatów",
      info: "Info"
    },
    mainInfo: {
      role: "Rola",
      createdDate: "Data dołączenia",
      lastActivity: "Ostatnia aktywność",
      step: "Aktualny krok",
      phone: "Telefon",
      email: "Email",
      eqologyId: "ID Eqology",
    },
    activity: {
      noActivity: "Brak aktywności",
      seeMore: "Zobacz więcej",
      webinarActivity: "Webinary",  
      lastActivity: "Ostatnia aktywność",
      allActivity: "Wszystkie aktywności",
      webinarsLatest: "Ostatnie webinary",
      noDataTitle: "Nic tu nie ma :(",
      noData: "Brak aktywności",
      descriptions: {
        WORKSHOP_FINISH: "Ukończono szkolenie <strong>\"{0}\"</strong>",
        WORKSHOP_START: "Rozpoczęto szkolenie <strong>\"{0}\"</strong>",
        REGISTRATION: "Zarejestrowano konto",
        ACTIVATION: "Konto zostało aktywowane",
        PROMOTION: "Awans na <strong>\"{0}\"</strong>",
        CONTACT_CREATION: "Utworzono kontakt",
        COURSE_FINISH: "Ukończono kurs <strong>\"{0}\"</strong>",
        DEMOTION: "Zmieniono rolę na <strong>\"{0}\"</strong>",
        WEBINAR_SUBSCRIPTION: "Zapisano do webinaru <strong>\"{0}\"</strong>",
        WEBINAR_PRESENCE: "Uczestnictwo w webinarze <strong>\"{0}\"</strong>",
      },
      webinarActivityTypes: {
        0: "Zapisano",
        1: "Uczestnictwo",
        2: "Brak obecności",
        3: "Brak decyzji"
      },
      seeAll: "Zobacz wszystkie",
      browsingActivity: "Przeglądasz aktywność użytkownika <strong>{0}</strong>",
    },
    courseProgress: {
      title: "Postęp kursu",
      description: "Bieżący kurs – <strong>{0}</strong>",
    },
    programProgress: {
      title: "Postęp programu",
      description: "Bieżący program – <strong>{0}</strong>",
      seeAll: "Zobacz więcej",
      allProgress: "Wszystkie postępy",
      browsingActivity: "Przeglądasz postęp kursu użytkownika <strong>{0}</strong>",
    },
    actions: {
      title: "Operacje",
      activate: "Aktywuj użytkownika",
      activateWorkshop: "Aktywuj szkolenie",
      delete: "Usuń użytownika",
      promoteToLeader: "Awansuj na lidera",
      promoteToAdmin: "Awansuj na admina",
      demoteToLeader: "Zdegraduj do lidera",
      demoteToPartner: "Zdegraduj do partnera",
      inviteToSignUp: "Zaproś do rejestracji",
      activateNextStep: "Aktywuj kol. krok",
      undoStep: "Cofnij krok",
      changeMentor: "Zmień opiekuna",
    },
    workshopActivation: {
      title: "Szkolenia",
      activatingWorkshop: "Aktywuj szkolenia dla użytkownika <strong>{0}</strong>",
      errors: {
        workshopNotFound: "Nie znaleziono szkoelnia o podanym ID",
        unauthorized: "Użytkownik nie ma dostępu do strefy, do której należy szkolenie",
        badRequest: "Szkolenie jest już dostępne dla użytkownika",
      },
      success: "Szkolenie zostało aktywowane",
    },
    userRemoved: "Użytkownik został usunięty",
    protegePromoted: "Podopieczny został awansowany!",
    protegeDemoted: "Podopieczny został zdegradowany!",
    protegeActivated: "Podopieczny został aktywowany!",
    invitationSent: "Zaproszenie wysłane!",
    mentorChanged: "Opiekun został zmieniony!",
    stepUndone: "Krok został cofnięty!",
    stepActivated: "Krok został aktywowany!",
    promotion: {
      confirm: {
        title: "Awansuj partnerów",
        desc: "Czy na pewno chcesz awansować tego partnera?",
      }
    },
    demotion: {
      confirm: {
        title: "Zmień rolę partnera",
        desc: "Czy na pewno chcesz zmienić rolę tego partnera?",
      }
    },
    inviteToSignUp: {
      confirm: {
        title: "Zaproś do rejestracji",
        desc: "Czy na pewno chcesz zaprosić tego użytkownika do rejestracji?",
      }
    },
    activate: {
      confirm: {
        title: "Aktywuj użytkownika",
        desc: "Czy na pewno chcesz aktywować tego użytkownika?",
      }
    },
    activateNextStep: {
      confirm: {
        title: "Aktywuj kolejny krok",
        desc: "Czy na pewno chcesz aktywować kolejny krok dla tego użytkownika?",
      }
    },
    undoStep: {
      confirm: {
        title: "Cofnij krok",
        desc: "Czy na pewno chcesz cofnąć krok dla tego użytkownika?",
      }
    },
    changeMentor: {
      confirm: {
        title: "Zmień opiekuna",
        desc: "Czy na pewno chcesz zmienić opiekuna dla tego użytkownika?",
      }
    },
    changeSpeed: {
      confirm: {
        title: "Zmień tempo",
        desc: "Czy na pewno chcesz zmienić tempo kursu/programu dla tego użytkownika?",  
      },
    },
    copyInviteLink: "Twój link dla Partnera (do EQAPP)",
    inviteLinkCopied: "Link został skopiowany",
    courseRequests: {
      title: "Kursy",
      protegeAsksFor: "Prosi o aktywację kursu <strong>\"{0}\"</strong>",
      denyAction: "Odmów",
      activateAction: "Aktywuj",
    },
    programRequests: {
      title: "Programy",
      protegeAsksFor: "Prosi o aktywację programu <strong>\"{0}\"</strong>",
      denyAction: "Odmów",
      activateAction: "Aktywuj",
    },
    activationRequests: {
      title: "Aktywacje",
      protegeAsksFor: "Prosi o aktywację konta",
      denyAction: "Odmów",
      activateAction: "Aktywuj",
    },
  },
  courses: {
    title: "Kursy",
    allCourses: "Wszystkie kursy",
    createAction: "Dodaj kurs",
    editAction: "Zapisz zmiany",
    courseCreated: "Kurs został dodany",
    courseUpdated: "Zmiany zostały wprowadzone",
    courseRemoved: "Kurs został usunięty",
    timeToStart: "Już wkrótce startuje Twój kurs!<br> Czas do rozpoczęcia <strong>{0}</strong> to...",
    create: {
      title: "Dodaj kurs",
      desc: "W tym panelu możesz dodać nowy kurs, lecz jeszcze bez konkretnego planu zajęć. Ten możesz ustalić poźniej, wchodząc w panel edycji kursu.",
    },
    edit: {
      title: "Edytuj kurs",
    },
    delete: {
      confirmTitle: "Jesteś pewien?",
      confirmDesc: "Czy na pewno chcesz usunąć ten kurs? Ta operacja jest nieodwracalna.",
    },
    fields: {
      name: "Nazwa",
      description: "Opis",
      contract: "Kontrakt",
      poster: "Grafika",
      days: "Długość trwania",
    },
    day: {
      title: "Dzień {0}",
      editAction: "Zapisz zmiany",
      success: {
        edit: "Sukces!",
        editDesc: "Opis został zaktualizowany",
      },
      fields: {
        challengesDescription: "Opis dnia",
        summaryDescription: "Podsumowanie dnia",
      },
      challenges: {
        createAction: "Dodaj wyzwanie",
        editAction: "Zapisz zmiany",
        useSchemaGo: "Użyj schematu GO",
        useSchemaRun: "Użyj schematu RUN",
        listDesc: "Wszystkie zmiany w liście są aktualizowane w czasie rzeczywistym.",
        create: {
          title: "Dodaj wyzwanie",
        },
        edit: {
          title: "Edytuj wyzwanie",
        },
        fields: {
          title: "Tytuł",
          description: "Opis",
          type: "Typ",
          workshopId: "Powiązane szkolenie",
          optional: "Opcjonalne",
          optionalDesc: "Czy użytkownik może pominąć to wyzwanie? Zaznacz, jeśli tak.",
          typeVariants: {
            PROSPECTING: "Prospecting",
            APPOINTMENT: "Umówienie spot.",
            WEBINAR: "Webinar",
            FOLLOW_UP: "Follow-up",
            MEETING: "Spotkanie",
            WORKSHOP: "Szkolenie",
            INFO: "Informacja",
            FB: "Aktywność FB",
            INSTAGRAM: "Aktywność Insta",
            SOCIAL_MEDIA: "Aktywność w SM",
            SPORT_ACTIVITY: "Aktywność fizyczna",
          }
        }
      }
    }
  },
  notifications: {
    title: "Powiadomienia",
    allNotifications: "Wszystkie powiadomienia",
    notificationTemplates: "Szablony",
    noNotifications: "Brak powiadomień",
    noNotificationsDesc: "Nie masz żadnych nieprzeczytanych powiadomień.",
    fields: {
      title: "Tytuł",
      description: "Opis",
      name: "Nazwa (wewnętrzna)",
    },
    editAction: "Zapisz zmiany",
    notificationUpdated: "Zmiany zostały wprowadzone",
    unseenPushNotifications: "Masz {0} nowych powiadomień",
  },
  catalogs: {
    title: "Katalogi",
    allCatalogs: "Wszystkie katalogi",
    createAction: "Dodaj katalog",
    editAction: "Zapisz zmiany",
    catalogCreated: "Katalog został dodany",
    catalogUpdated: "Zmiany zostały wprowadzone",
    catalogRemoved: "Katalog został usunięty",
    create: {
      title: "Dodaj katalog",
    },
    edit: {
      title: "Edytuj katalog",
    },
    delete: {
      confirmTitle: "Jesteś pewien?",
      confirmDesc: "Czy na pewno chcesz usunąć ten katalog? Ta operacja jest nieodwracalna.",
    },
    fields: {
      name: "Nazwa",
      description: "Treść",
      startAt: "Data rozpoczęcia",
      variant: "Czas trwania"
    },
    variants: {
      twoWeek: "2 tygodnie",
      threeWeek: "3 tygodnie",
    },
  },
  menuLinks: {
    title: "Linki menu",
    allLinks: "Wszystkie linki",
    createAction: "Dodaj link",
    editAction: "Zapisz zmiany",
    linkCreated: "Link został dodany",
    linkUpdated: "Zmiany zostały wprowadzone",
    linkRemoved: "Link został usunięty",
    create: {
      title: "Dodaj link",
    },
    edit: {
      title: "Edytuj link",
    },
    delete: {
      confirmTitle: "Jesteś pewien?",
      confirmDesc: "Czy na pewno chcesz usunąć ten link? Ta operacja jest nieodwracalna.",
    },
    variants: {
      internal: "Podstrona",
      external: "Zewnętrzny",
    },
    fields: {
      name: "Nazwa",
      url: "Adres URL",
      variant: "Typ",
      page: "Podstrona",
      icon: "Ikona",
      supportedRoles: "Wspierane role",
      supportedLanguages: "Wspierane języki",
    },
    errors: {
      nameExists: "Link o podanej nazwie już istnieje",
    }
  },
  productCategory: {
    allProductCategories: "Wszystkie kategorie",
    productCategoryCreated: "Kategoria została dodana",
    productCategoryUpdated: "Zmiany zostały wprowadzone",
    productCategoryRemoved: "Kategoria została usunięta",
    buyingChoices: "Możliwości zakupu - Kupujesz bezpośrednio od sprzedawcy!",
    goToShop: "Do sklepu!",
    posts: "Powiązane artykuły",
    faqs: "Zadawane pytania",
    editProductRefLink: "Edytuj reflink",
    lackOfRefUrls: "Uzupełnij reflinki!",
    copyRefLink: "Skopiuj link do produktu",
    refLinkCopied: "Link został skopiowany",
    benefits: {
      one: {
        title: "Szybka dostawa",
        description: "Dostawa do klienta w ciągu 2 dni roboczych!",
      },
      two: {
        title: "Lepsze Ceny",
        description: "Kupuj z nami – płać mniej!",
      },
      three: {
        title: "Gwarancja Zadowolenia",
        description: "30 dniowa gwarancja zwrotu!",
      },
      four: {
        title: "Specjalistyczne Badania",
        description: "Posiadamy niezależne badania, potwierdzające najwyższą jakość!",
      },
    },
    createAction: "Dodaj kategorię",
    editAction: "Edytuj kategorię",
    delete: {
      confirmTitle: "Jesteś pewien?",
      confirmDesc: "Czy na pewno chcesz usunąć tę kategorię? Ta operacja jest nieodwracalna.",
    },
    fields: {
      name: "Nazwa",
      descriptionBefore: "Opis przed produktami",
      descriptionAfter: "Opis po produktach",
      image: "Grafika (kwadrat)",
      imageBig: "Grafika duża (prostokąt)"
    },
    create: {
      title: "Dodaj kategorię",
    },
    edit: {
      title: "Edytuj kategorię",
    },
    tabs: {
      basicData: "Podstawowe",
      products: "Produkty",
      articles: "Artykuły",
      faqs: "FAQ",
    }
  },
  products: {
    title: "Produkty",
    seeMore: "Informacje",
    ourProducts: "Nasze produkty",
    editUrl: "Edytuj reflink",
    fromProducer: "Zakup prosto od producenta",
    updateLink: "Uzupełnij link!",
    allProducts: "Wszystkie produkty",
    createAction: "Dodaj produkt",  
    editAction: "Zapisz zmiany",
    productCreated: "Produkt został dodany",
    productUpdated: "Zmiany zostały wprowadzone",
    productRemoved: "Produkt został usunięty",
    linkCopied: "Link został skopiowany",
    copyLink: "Skopiuj link",
    create: {
      title: "Dodaj produkt",
    },
    edit: {
      title: "Edytuj produkt",
    },
    delete: {
      confirmTitle: "Jesteś pewien?",
      confirmDesc: "Czy na pewno chcesz usunąć ten produkt? Ta operacja jest nieodwracalna.",
    },
    fields: {
      name: "Nazwa",
      description: "Opis",
      price: "Cena",
      image: "Grafika",
      refUrl: "Ref link do produktu",
      priceOld: "Stara cena",
    }
  },
  posts: {
    title: "Posty",
    allPosts: "Wszystkie posty",
    createAction: "Dodaj post",
    editAction: "Zapisz zmiany",
    postCreated: "Post został dodany",
    postUpdated: "Zmiany zostały wprowadzone",
    postRemoved: "Post został usunięty",
    create: {
      title: "Dodaj post",
    },
    edit: {
      title: "Edytuj post",
    },
    delete: {
      confirmTitle: "Jesteś pewien?",
      confirmDesc: "Czy na pewno chcesz usunąć ten post? Ta operacja jest nieodwracalna.",
    },
    fields: {
      title: "Tytuł",
      content:  "Treść",
      image: "Grafika",
    },
  },
  certificates: {
    seeMore: "Więcej informacji",
    title: "Zaświadczenia",
    allCertificates: "Wszystkie zaświadczenia",
    createAction: "Dodaj zaświadczenie",
    editAction: "Zapisz zmiany",
    certificateCreated: "Zaświadczenie zostało dodane",
    certificateUpdated: "Zmiany zostały wprowadzone",
    certificateRemoved: "Zaświadczenie zostało usunięte",
    create: {
      title: "Dodaj zaświadczenie",
    },
    edit: {
      title: "Edytuj zaświadczenie",
    },
    delete: {
      confirmTitle: "Jesteś pewien?",
      confirmDesc: "Czy na pewno chcesz usunąć to zaświadczenie? Ta operacja jest nieodwracalna.",
    },
    fields: {
      title: "Tytuł",
      description: "Opis",
      image: "Grafika",
      url: "Adres URL",
    }
  },
  faqs: {
    title: "FAQs",
    allFaqs: "Wszystkie FAQi",
    createAction: "Dodaj FAQ",
    editAction: "Zapisz zmiany",
    faqCreated: "FAQ został dodany",
    faqUpdated: "Zmiany zostały wprowadzone",
    faqRemoved: "FAQ został usunięty",
    create: {
      title: "Dodaj FAQ",
    },
    edit: {
      title: "Edytuj FAQ",
    },
    delete: {
      confirmTitle: "Jesteś pewien?",
      confirmDesc: "Czy na pewno chcesz usunąć to FAQ? Ta operacja jest nieodwracalna.",
    },
    fields: {
      question: "Pytanie",
      answer: "Odpowiedź",
    }
  },
  candidateQuizes: {
    title: "Quizy dla kandydatów",
    allQuizes: "Wszystkie quizy",
    createAction: "Dodaj quiz",
    editAction: "Zapisz zmiany",
    quizCreated: "Quiz został dodany",
    quizUpdated: "Zmiany zostały wprowadzone",
    quizRemoved: "Quiz został usunięty",
    create: {
      title: "Dodaj quiz",
    },
    edit: {
      title: "Edytuj quiz",
    },
    delete: {
      confirmTitle: "Jesteś pewien?",
      confirmDesc: "Czy na pewno chcesz usunąć ten quiz? Ta operacja jest nieodwracalna.",
    },
    fields: {
      name: "Nazwa",
      graduateMinScore: "Próg zdawalności (%)",
      movieUrl: "Adres URL do filmu",
    }
  },
  candidateQuizQuestions: {
    title: "Pytania",
    allQuestions: "Wszystkie pytania",
    createAction: "Dodaj pytanie",
    editAction: "Zapisz zmiany",
    questionCreated: "Pytanie zostało dodane",
    questionUpdated: "Zmiany zostały wprowadzone",
    questionRemoved: "Pytanie zostało usunięte",
    create: {
      title: "Dodaj pytanie",
    },
    edit: {
      title: "Edytuj pytanie",
    },
    delete: {
      confirmTitle: "Jesteś pewien?",
      confirmDesc: "Czy na pewno chcesz usunąć to pytanie? Ta operacja jest nieodwracalna.",
    },
    fields: {
      question: "Pytanie",
    }
  },
  candidateQuizAnswers: {
    title: "Odpowiedzi",
    allAnswers: "Wszystkie odpowiedzi",
    createAction: "Dodaj odpowiedź",
    editAction: "Zapisz zmiany",
    answerCreated: "Odpowiedź została dodana",
    answerUpdated: "Zmiany zostały wprowadzone",
    answerRemoved: "Odpowiedź została usunięta",
    create: {
      title: "Dodaj odpowiedź",
    },
    edit: {
      title: "Edytuj odpowiedź",
    },
    delete: {
      confirmTitle: "Jesteś pewien?",
      confirmDesc: "Czy na pewno chcesz usunąć tę odpowiedź? Ta operacja jest nieodwracalna.",
    },
    fields: {
      answer: "Odpowiedź",
      isCorrect: "Poprawna",
      questionDescription: "Zaznacz tylko wtedy, jeśli odpowiedź ma być uznana za poprawną",
    }
  },
  boardItemImages: {
    createAction: "Dodaj grafikę",
    delete: {
      confirmTitle: "Jesteś pewien?",
      confirmDesc: "Czy na pewno chcesz usunąć to zdjęcie? Ta operacja jest nieodwracalna.",
    },
    fields: {
      image: "Plik"
    }
  },
  boardItemVideos: {
    createAction: "Dodaj film",
    delete: {
      confirmTitle: "Jesteś pewien?",
      confirmDesc: "Czy na pewno chcesz usunąć ten film? Ta operacja jest nieodwracalna.",
    },
  },
  boardItemFiles: {
    createAction: "Dodaj plik",
    delete: {
      confirmTitle: "Jesteś pewien?",
      confirmDesc: "Czy na pewno chcesz usunąć ten plik? Ta operacja jest nieodwracalna.",
    },
    fields: {
      file: "Plik",
      languageId: "Język",
    }
  },
  workshopItemFiles: {
    createAction: "Dodaj plik",
    delete: {
      confirmTitle: "Jesteś pewien?",
      confirmDesc: "Czy na pewno chcesz usunąć ten plik? Ta operacja jest nieodwracalna.",
    },
    fields: {
      file: "Plik",
      languageId: "Język",
    }
  },
  pages: {
    title: "Podstrony",
    allPages: "Wszystkie podstrony",
    createAction: "Dodaj podstronę",
    editAction: "Zapisz zmiany",
    pageCreated: "Podstrona została dodana",
    pageUpdated: "Zmiany zostały wprowadzone",
    pageRemoved: "Podstrona została usunięta",
    goToBoardContent: "Przejdź do zawartości",
    create: {
      title: "Dodaj podstronę",
    },
    edit: {
      title: "Edytuj podstronę",
    },
    delete: {
      confirmTitle: "Jesteś pewien?",
      confirmDesc: "Czy na pewno chcesz usunąć tę podstronę? Ta operacja jest nieodwracalna.",
    },
    fields: {
      name: "Identyfikator",
    },
    types: {
      board: "Tablica",
      boardItem: "Post"
    }
  },
  webinars: {
    title: "Webinary",
    platforms: {
      cmNew: "Nowy ClickMeeting",
      cmFrom: "Istniejący ClickMeeting",
      sm: "Istniejący Streamyard/YT"
    },
    youHaveToVerify: {
      title: "Zweryfikuj e-mail",
      description: "Aby kontynuować, musisz najpierw zweryfikować swój adres e-mail.",
    },
    downloadPoster: "Pobierz plakat",
    createFromCM: "Dodaj istniejący z CM",
    downloadCSV: "Pobierz CSV",
    noMoreTokens: "Brak dostępnych tokenów",
    noMoreTokensDesc: "Niestety, na tym webinarze nie ma już wolnych miejsc :(",
    businessWebinars: "Webinary biznesowe",
    clientWebinars: "Webinary produktowe",
    showFinished: "Pokaż zakończone",
    finishedWebinars: "Zakończone webinary",
    subscribe: "Zapisz się!",
    details: "Szczegóły",
    timeLeft: "Pozostało...",
    live: "LIVE",
    subscribedUsers: "Zapisani",
    attendedUsers: "Uczestnicy",
    noSubscribedUsers: "Brak zapisanych użytkowników",
    noAttendedUsers: "Brak uczestników",
    startAt: "Startuje",
    subscribed: "Zapisano!",
    subscribedInfo: "Na godzinę przed rozpoczęciem webinaru otrzymasz od nas przypominające powiadomienie.",
    presenter: "Prowadzący",
    seeYouSoon: "Do zobaczenia! :)",
    goToWebinar: "Wejdź",
    allWebinars: "Wszystkie webinary",
    createAction: "Dodaj webinar",
    editAction: "Zapisz zmiany",
    webinarCreated: "Webinar został dodany",
    webinarUpdated: "Zmiany zostały wprowadzone",
    webinarRemoved: "Webinar został usunięty",
    noDataTitle: "Nic tu nie ma :(",
    noData: "Nie zaplanowano aktualnie żadnych webinarów...",
    invited: {
      invite: "Zaproś",
      invited: "Zaproszono!",
      invitePartner: "Zaproś partnera",
      inviteGuest: "Zaproś gościa",
      invitedUsers: "Zapisani użytkownicy",
      invitedGuests: "Zapisani goście",
      userInvited: "Użytkownik został zaproszony",
      error: "Wystąpił bład...",
      typeEmail: "Wpisz adres email",
      emailExists: "Użytkownik dostał już zaproszenie",
      invitationInvalidOrExpired: "Zaproszenie jest nieprawidłowe lub wygasło",
      firstName: "Imię",
      lastName: "Nazwisko",
      email: "E-mail",
      urlGenerated: "Wygenerowano unikalne zaproszenie!",
      copyUrl: "Skopiuj link",
      linkCopied: "Link został skopiowany",
    },
    create: {
      title: "Dodaj webinar",
    },
    edit: {
      title: "Edytuj webinar",
    },
    delete: {
      confirmTitle: "Jesteś pewien?",
      confirmDesc: "Czy na pewno chcesz usunąć ten webinar? Ta operacja jest nieodwracalna.",
    },
    variants: {
      BUSINESS: "Biznes",
      CLIENT: "Klient",
      INVITED: "Na zaproszenie",
    },
    fields: {
      title: "Tytuł",
      description: "Opis",
      presenter: "Prowadzący",
      startAt: "Data rozpoczęcia",
      duration: "Czas trwania",
      variant: "Typ",
      supportedLanguages: "Wspierane języki",
      supportedRoles: "Wspierane role",
      embedUrl: "Adres URL YouTube",
      cmId: "ID z CM",
      cmIdDescription: "Wejdź w szczegóły wydarzenia i spójrz na adres w przeglądarce. ID to liczba po ostatnim ukośniku. (Np. w linku dla linku `https://account-panel.clickmeeting.com/8315894`, id to `8315894`)",
      isWorkshop: "Webinar wewnętrzny",
      isWorkshopDescription: "Jeśli zaznaczysz to pole, to webinar będzie wyświetlany w zakładce Webinary dla Partnerów Biznesowych i nie bedzie można zapraszać do niego osób z zewnątrz.",
      poster: "Plakat",
      embedCode: "Link do streamu StreamYard",
      embedCodeDescription: `Wybierz opcję "Share" na swoim streamie "On-air", skopiuj link i wklej go tutaj.`
    }
  },
  announcements: {
    title: "Ogłoszenia",
    allAnnouncements: "Wszystkie ogłoszenia",
    createAction: "Dodaj ogłoszenie",
    editAction: "Zapisz zmiany",
    announcementCreated: "Ogłoszenie zostało dodane",
    announcementUpdated: "Zmiany zostały wprowadzone",
    announcementRemoved: "Ogłoszenie zostało usunięte",
    create: {
      title: "Dodaj ogłoszenie",
    },
    edit: {
      title: "Edytuj ogłoszenie",
    },
    delete: {
      confirmTitle: "Jesteś pewien?",
    },
    fields: {
      title: "Tytuł",
      description: "Treść",
      startAt: "Data rozpoczęcia",
    }
  },
  boards: {
    title: "System",
    allBoards: "Wszystkie tablice",
    createAction: "Dodaj tablicę",
    editAction: "Zapisz zmiany",
    boardCreated: "Tablica została dodana",
    boardUpdated: "Zmiany zostały wprowadzone",
    boardRemoved: "Tablica została usunięta",
    noData: "Nic tu jeszcze nie ma...",
    noDataTitle: "Brak danych",
    addSubdirectory: "Dodaj podkatalog",
    addItem: "Dodaj element",
    backToParent: "Wróć",
    colors: {
      PRIMARY: "Podstawowy",
      PRIMARY_LIGHTER: "Podstawowy (jaśniejszy)",
      ORANGE: "Pomarańczowy",
      GREEN: "Zielony",
      RED: "Czerwony",
    },
    create: {
      title: "Dodaj tablicę",
    },
    edit: {
      title: "Edytuj tablicę",
    },
    delete: {
      confirmTitle: "Jesteś pewien?",
      confirmDesc: "Czy na pewno chcesz usunąć tę tablicę? Ta operacja jest nieodwracalna.",
    },
    fields: {
      name: "Nazwa",
      description: "Treść",
      icon: "Ikona",
      supportedLanguages: "Wspierane języki",
      supportedRoles: "Wspierane role",
      color: "Kolor"
    },
    icons: {
      HEART: "Serce",
      LIKE: "Like",
      STATS: "Statystyki",
      CONFIG: "Koło zębate",
      WORKSHOP: "Szkolenie",
      INFO: "Informacja",
      FB: "Facebook",
      INSTAGRAM: "Instagram",
      SPORT: "Sport",
      MEDITATION: "Medytacja",
      CHAT: "Rozmowa",
      TROPHY: "Trofeum",
      STAR: "Gwiazda",
      CHALLENGE: "Wyzwanie",
      MAIL: "Poczta",
      CALENDAR: "Kalendarz",
      VIDEO: "Wideo",
      BOOK: "Książka",
      PAPER: "Kartka",
      LINK: "Link",
      FILE: "Plik",
      TEXT: "Tekst",
      PLUS: "Plus",
      MINUS: "Minus",
      CHECK: "Check",
      MUSIC: "Muzyka",
      CROSS: "Krzyżyk",
      ARROW_LEFT: "Strzałka w lewo",
      ARROW_RIGHT: "Strzałka w prawo",
      ARROW_UP: "Strzałka w górę",
      ARROW_DOWN: "Strzałka w dół",
      LOCK_OPEN: "Otwarta kłódka",
      LOCK_CLOSED: "Zamknięta kłódka",
      PIN: "Pinezka",
      PIN_TWO: "Pinezka 2",
      CHART_UP: "Wykres w górę",
      CHART_DOWN: "Wykres w dół",
      CHART_ALT: "Wykres alternatywny",
      TOOLS: "Narzędzia",
      BOMB: "Bomba",
      DYNAMITE: "Dynamit",
      DIAMOND: "Diament",
      CASH: "Gotówka",
      CASH_TWO: "Gotówka 2",
      GOLD: "Złoto",
      BUS: "Autobus",
      CAR: "Samochód",
      TAXI: "Taksówka",
      BOAT: "Łódź",
      PLANE: "Samolot",
      BIKE: "Rower",
      SMARTPHONE: "Smartfon",
      LAPTOP: "Laptop",
      DESKTOP: "Komputer stacjonarny",
      PHONE_OLD: "Stary telefon",
      KEYBOARD: "Klawiatura",
      CAMERA: "Aparat",
      COMPASS: "Kompas",
      ALARM: "Alarm",
      WOMAN: "Kobieta",
      MAN: "Mężczyzna",
      HOME: "Dom",
      BELL: "Dzwonek",
      ACADEMY: "Akademia",
      CERTIFICATE: "Certyfikat",
      LIST: "Lista",
      MOVIE: "Film",
      PROFILE: "Profil",
      CROWN: "Korona",
      KEY: "Klucz",
      PATHS: "Ścieżki",
      USERS: "Użytkownicy",
      NOTIFICATION: "Powiadomienie",
      EXIT: "Wyjście",
      CART: "Koszyk",
      FILES: "Pliki",
      FIRE: "Płomień"
    },
    items: {
      chooseType: "Wybierz wariant",
      createAction: "Dodaj element",
      editAction: "Zapisz zmiany",
      itemCreated: "Element został dodany",
      itemUpdated: "Zmiany zostały wprowadzone",
      itemRemoved: "Element został usunięty",
      tabs: {
        basicData: "Podstawowe",
        videos: "Wideo",
        files: "Pliki",
        images: "Grafiki",
      },
      create: {
        title: "Dodaj element",
      },
      edit: {
        title: "Edytuj element",
      },
      delete: {
        confirmTitle: "Jesteś pewien?",
        confirmDesc: "Czy na pewno chcesz usunąć ten element? Ta operacja jest nieodwracalna.",
      },
      fields: {
        name: "Nazwa",
        link: "Link",
        file: "Plik",
        text: "Treść tekstowa",
        icon: "Ikona",
        supportedLanguages: "Wspierane języki",
        supportedRoles: "Wspierane role",
      },
      contentTypes: {
        link: "Link",
        file: "Plik",
        text: "Treść tekstowa",
      },
      copyLink: "Skopiuj link",
      linkCopied: "Link został skopiowany",
      downloadFile: "Pobierz plik",
      copyText: "Skopiuj tekst",
      textCopied: "Tekst został skopiowany",
    }
  },
  movies: {
    title: "Baza filmów",
    categories: {
      title: "Kategorie",
      createAction: "Dodaj kategorię",
      editAction: "Zapisz zmiany",
      categoryCreated: "Kategoria została dodana",
      categoryUpdated: "Zmiany zostały wprowadzone",
      categoryRemoved: "Kategoria została usunięta",
      create: {
        title: "Dodaj kategorię",
      },
      edit: {
        title: "Edytuj kategorię",
      },
      delete: {
        confirmTitle: "Jesteś pewien?",
        confirmDesc: "Czy na pewno chcesz usunąć tę kategorię? Ta operacja jest nieodwracalna.",
      },
      fields: {
        name: "Nazwa",
        description: "Opis",
      },
    },
    createAction: "Dodaj film",
    editAction: "Zapisz zmiany",
    movieCreated: "Film został dodany",
    movieUpdated: "Zmiany zostały wprowadzone",
    movieRemoved: "Film został usunięty",
    noData: "Nic tu jeszcze nie ma...",
    noDataTitle: "Brak danych",
    addSubcategory: "Dodaj podkategorię",
    addMovie: "Dodaj film",
    backToParent: "Wróć",
    create: {
      title: "Dodaj film",
    },
    edit: {
      title: "Edytuj film",
    },
    delete: {
      confirmTitle: "Jesteś pewien?",
      confirmDesc: "Czy na pewno chcesz usunąć ten film? Ta operacja jest nieodwracalna.",
    },
    fields: {
      name: "Nazwa",
      description: "Opis",
      link: "Link",
    },
  
  },
  programs: {
    title: "Programy",
    allPrograms: "Wszystkie programy",
    createAction: "Dodaj program",
    editAction: "Zapisz zmiany",
    programCreated: "Program został dodany",
    programUpdated: "Zmiany zostały wprowadzone",
    programRemoved: "Program został usunięty",
    timeToStart: "Już wkrótce startuje Twój program!<br> Czas do rozpoczęcia <strong>{0}</strong> to...",
    create: {
      title: "Dodaj program",
      desc: "W tym panelu możesz dodać nowy program, lecz jeszcze bez konkretnego planu zajęć. Ten możesz ustalić poźniej, wchodząc w panel edycji programu.",
    },
    edit: {
      title: "Edytuj program",
    },
    delete: {
      confirmTitle: "Jesteś pewien?",
      confirmDesc: "Czy na pewno chcesz usunąć ten program? Ta operacja jest nieodwracalna.",
    },
    fields: {
      name: "Nazwa",
      description: "Opis",
      contract: "Kontrakt",
      poster: "Grafika",
      days: "Długość trwania",
    },
    day: {
      title: "Dzień {0}",
      editAction: "Zapisz zmiany",
      success: {
        edit: "Sukces!",
        editDesc: "Opis został zaktualizowany",
      },
      fields: {
        challengesDescription: "Opis dnia",
        summaryDescription: "Podsumowanie dnia",
      },
      challenges: {
        createAction: "Dodaj wyzwanie",
        editAction: "Zapisz zmiany",
        listDesc: "Wszystkie zmiany w liście są aktualizowane w czasie rzeczywistym.",
        create: {
          title: "Dodaj wyzwanie",
        },
        edit: {
          title: "Edytuj wyzwanie",
        },
        fields: {
          title: "Tytuł",
          description: "Opis",
          type: "Typ",
          optional: "Opcjonalne",
          optionalDesc: "Czy użytkownik może pominąć to wyzwanie? Zaznacz, jeśli tak.",
          typeVariants: {
            PROSPECTING: "Prospecting",
            APPOINTMENT: "Umówienie spot.",
            WEBINAR: "Webinar",
            FOLLOW_UP: "Follow-up",
            MEETING: "Spotkanie",
            WORKSHOP: "Szkolenie",
            INFO: "Informacja",
            FB: "Aktywność FB",
            INSTAGRAM: "Aktywność Insta",
            SOCIAL_MEDIA: "Aktywność w SM",
            SPORT_ACTIVITY: "Aktywność fizyczna",
          }
        }
      }
    }
  },
  join: {
    title: "Witaj!",
    createAction: "Dołącz",
    desc: "Wybierz opcję, która spodobała Ci się na spotkaniu informacyjnym.",
    chooseAccountType: "Wybierz typ konta",
    firstTimeDesc: "Przed Tobą pierwsze szkolenia! :) Jeśli jednak nie masz czasu, żeby się nimi od razu zająć – nie przejmuj się. Przed chwilą wysłaliśmy Ci na Twoją skrzynkę e-mail wiadomość z unikalnym linkiem, który pozwoli na powrót do tego miejsca w dowolnym momencie.",
    fields: {
      firstName: "Imię",
      lastName: "Nazwisko",
      email: "E-mail",
    }
  },
  chooseProgram: {
    title: "Wybierz program",
    signContract: "Podpisz kontrakt",
    desc: "Uwaga! Wybór programu lub kursu musi być zaakceptowany przez Twojego opiekuna. Poproś więc o jego uruchomienie tylko wtedy, jeśli wcześniej rozmawialiście już na ten temat.",
    startAction: "Poproś o aktywację",
    signContractAction: "Podpisz kontrakt",
    requestAlreadySent: {
      title: "Poczekaj... :)",
      desc: "Prośba o aktywację kursu lub programu została już wysłana. Poczekaj na decyzję swojego opiekuna.",
    },
    alreadyInProgress: {
      title: "Nie teraz! :)",
      desc: "Jeden kurs lub program jest już w trakcie realizacji. Dopiero gdy go skończysz, możesz poprosić swojego opiekuna o aktywację kolejnego.",
    },
    programs: {
      title: "Programy",
      startProgram: "Poproś o aktywację programu",
      youHaveToSignContract: "Aby poprosić o aktywację programu, musisz najpierw podpisać kontrakt.",
    },
    courses: {
      title: "Kursy",
      startCourse: "Poproś o aktywację kursu",
      youHaveToSignContract: "Aby poprosić o aktywację kursu, musisz najpierw podpisać kontrakt.",
    },
    success: {
      title: "Sukces!",
      desc: "Twój opiekun został poinformowany o Twojej prośbie. E-mailowo damy Ci znać o podjętej decyzji.",
    }
  },
  films: {
    title: "Baza filmów",
  },
  languages: {
    pl: "polski",
    en: "angielski",
    uk: "ukraiński",
    de: "niemiecki",
  },
  roles: {
    title: "Role",
    saveAction: "Zapisz zmiany",
    saved: "Zmiany zostały wprowadzone",
    permissions: {
      adminPanelAccess: "Dostęp do panelu administracyjnego (admin)",

      adminUsersRead: "Odczyt użytkowników (admin)",
      adminUsersEdit: "Edycja użytkowników (admin)",
      adminUsersRemove: "Usuwanie użytkowników (admin)",
      adminUsersActivate: "Aktywacja użytkowników (admin)",
    
      adminWorkshopsRead: "Odczyt szkoleń (admin)",
      adminWorkshopsEdit: "Edycja szkoleń (admin)",
      adminWorkshopsRemove: "Usuwanie szkoleń (admin)",
      adminWorkshopsCreate: "Tworzenie szkoleń (admin)",
    
      adminMenuLinksRead: "Odczyt linków menu (admin)",
      adminMenuLinksEdit: "Edycja linków menu (admin)",
      adminMenuLinksRemove: "Usuwanie linków menu (admin)",
      adminMenuLinksCreate: "Tworzenie linków menu (admin)",
    
      adminUsefulLinksRead: "Odczyt przydatnych linków (admin)",
      adminUsefulLinksEdit: "Edycja przydatnych linków (admin)",
      adminUsefulLinksRemove: "Usuwanie przydatnych linków (admin)",
      adminUsefulLinksCreate: "Tworzenie przydatnych linków (admin)",
    
      adminPagesRead: "Odczyt podstron (admin)",
      adminPagesEdit: "Edycja podstron (admin)",
      adminPagesRemove: "Usuwanie podstron (admin)",
      adminPagesCreate: "Tworzenie podstron (admin)",
    
      adminWebinarsRead: "Odczyt webinariów (admin)",
      adminWebinarsEdit: "Edycja webinariów (admin)",
      adminWebinarsRemove: "Usuwanie webinariów (admin)",
      adminWebinarsCreate: "Tworzenie webinariów (admin)",
    
      adminRolesRead: "Odczyt ról (admin)",
      adminRolesEdit: "Edycja ról (admin)",
    
      adminAnnouncementsRead: "Odczyt ogłoszeń (admin)",
      adminAnnouncementsEdit: "Edycja ogłoszeń (admin)",
      adminAnnouncementsRemove: "Usuwanie ogłoszeń (admin)",
      adminAnnouncementsCreate: "Tworzenie ogłoszeń (admin)",
    
      adminNotificationsRead: "Odczyt powiadomień (admin)",
      adminNotificationsEdit: "Edycja powiadomień (admin)",
    
      adminCustomNotificationsRead: "Odczyt niestandardowych powiadomień (admin)",
      adminCustomNotificationsEdit: "Edycja niestandardowych powiadomień (admin)",
      adminCustomNotificationsRemove: "Usuwanie niestandardowych powiadomień (admin)",
      adminCustomNotificationsCreate: "Tworzenie niestandardowych powiadomień (admin)",
    
      adminProtegesPromoteToLEADER: "Awansowanie partnera na lidera (admin)",
      adminProtegesPromoteToADMIN: "Awansowanie lidera na admina (admin)",
      adminProtegesDemoteToLEADER: "Degradacja admina do lidera (admin)",
      adminProtegesDemoteToPARTNER: "Degradacja lidera do partnera (admin)",
      adminProtegesChangeMentor: "Zmiana opiekuna partnera (admin)",

      adminProductsRead: "Odczyt produktów (admin)",
      adminProductsEdit: "Edycja produktów (admin)",
      adminProductsRemove: "Usuwanie produktów (admin)",
      adminProductsCreate: "Tworzenie produktów (admin)",

      adminProductsCategoryRead: "Odczyt kategorii produktów (admin)",
      adminProductsCategoryEdit: "Edycja kategorii produktów (admin)",
      adminProductsCategoryRemove: "Usuwanie kategorii produktów (admin)",
      adminProductsCategoryCreate: "Tworzenie kategorii produktów (admin)",
    
      customWorkshopsRead: "Odczyt własnych szkoleń",
      customWorkshopsEdit: "Edycja własnych szkoleń",
      customWorkshopsRemove: "Usuwanie własnych szkoleń",
      customWorkshopsCreate: "Tworzenie własnych szkoleń",
    
      protegesInvite: "Zapraszanie partnerów",
      protegesRead: "Odczyt partnerów",
      protegesRemove: "Usuwanie partnerów",
      workshopsRead: "Odczyt szkoleń",
      workshopsCreate: "Tworzenie szkoleń",
      webinarsAccess: "Dostęp do webinariów",
      productsAccess: "Dostęp do produktów",

      adminPostsRead: "Odczyt postów (admin)",
      adminPostsEdit: "Edycja postów (admin)",
      adminPostsRemove: "Usuwanie postów (admin)",
      adminPostsCreate: "Tworzenie postów (admin)",
    
      adminCertificatesRead: "Odczyt certyfikatów (admin)",
      adminCertificatesEdit: "Edycja certyfikatów (admin)",
      adminCertificatesRemove: "Usuwanie certyfikatów (admin)",
      adminCertificatesCreate: "Tworzenie certyfikatów (admin)",
    
      adminFaqsRead: "Odczyt FAQ (admin)",
      adminFaqsEdit: "Edycja FAQ (admin)",
      adminFaqsRemove: "Usuwanie FAQ (admin)",
      adminFaqsCreate: "Tworzenie FAQ (admin)",

      adminCandidateQuizRead: "Odczyt quizów kandydatów (admin)",
      adminCandidateQuizEdit: "Edycja quizów kandydatów (admin)",
      adminCandidateQuizRemove: "Usuwanie quizów kandydatów (admin)",
      adminCandidateQuizCreate: "Tworzenie quizów kandydatów (admin)",

      adminSystemPersonalizationRead: "Odczyt personalizacji systemu (admin)",
      adminSystemPersonalizationEdit: "Edycja personalizacji systemu (admin)",
      protegesChangeMentor: "Zmiana opiekuna partnera",
      chatAccess: "Dostęp do czatu",
    }
  },
  courseChallenges: {
    title: "Dzień {0}",
    challenges: {
      title: "Dzisiejsze wyzwania",
    },
    summary: {
      success: {
        title: "Gratulacje!",
      },
      failure: {
        title: "Niestety...",
        description: "<p>Przykro nam, że nie realizujesz tego na co się umówiliśmy.</p><p>Pamiętaj, że to Ty decydujesz o tym, jak wygląda Twoja przyszłość. To Ty możesz zmienić swoje życie na lepsze.</p><p>Wszystko zależy jednak od Twojego zaangażowania – bez niego, nie będziemy w stanie Ci pomóc.</p><p>Ale... głowa do góry! <strong>Jutro też jest dzień</strong> :)</p><p>Niech to będzie Twój nowy początek!</p>",
      }
    }
  },
  programChallenges: {
    challenges: {
      title: "Dzisiejsze wyzwania",
    },
    summary: {
      success: {
        title: "Gratulacje!",
        progress: "<p><strong>Dzisiejszego dnia udało Ci się wykonać aż {0}% zadań</strong></p>"
      },
      failure: {
        title: "Niestety...",
        description: "<p>Przykro nam, że nie realizujesz tego na co się umówiliśmy.</p><p>Pamiętaj, że to Ty decydujesz o tym, jak wygląda Twoja przyszłość. To Ty możesz zmienić swoje życie na lepsze.</p><p>Wszystko zależy jednak od Twojego zaangażowania – bez niego, nie będziemy w stanie Ci pomóc.</p><p>Ale... głowa do góry! <strong>Jutro też jest dzień</strong> :)</p><p>Niech to będzie Twój nowy początek!</p>",
        progress: "<p><strong>Twój dzisiejszy wynik to zaledwie {0}% :(</strong></p>"
      }
    }
  },
  usefulLinks: {
    title: "Przydatne linki",
  },
  currentProgram: {
    title: "Aktualny program",
  },
  currentCourse: {
    title: "Aktualny kurs",
  },
  quotes: {
    0: `Dopóki nie będziesz cenić siebie, nie będziesz cenić własnego czasu. <figcaption>M. Scott Peck</figcaption>`,
    1: `Jesteśmy tym, co w swoim życiu powtarzamy. Doskonałość nie jest jednorazowym aktem, lecz nawykiem. <figcaption>Arystoteles</figcaption>`,
    2: `Jeśli nie czujesz się godny, by wyrosły Ci skrzydła, nigdy nie oderwiesz się od ziemi. <figcaption>Nick Vujicic</figcaption>`,
    3: `Jeśli potrafisz o czymś marzyć, to potrafisz także tego dokonać. <figcaption>Walt Disney</figcaption>`,
    4: `Ludzie są dokładnie tak szczęśliwi, jak myślą, że są. <figcaption>Abraham Lincoln</figcaption>`,
    5: `Potykając się, można zajść daleko; nie wolno tylko upaść i nie podnieść się. <figcaption>Goethe</figcaption>`,
    6: `Prawdziwy akt odkrycia nie polega na odnajdywaniu nowych lądów, lecz na patrzeniu na stare w nowy sposób. <figcaption>Marcel Proust</figcaption>`,
    7: `Przeciwności, z którymi musimy się zmierzyć, często sprawiają, że stajemy się silniejsi. A to, co dziś wydaje się stratą, jutro może okazać się zyskiem. <figcaption>Nick Vujicic</figcaption>`,
    8: `Ludzie, którzy tracą czas czekając, aż zaistnieją najbardziej sprzyjające warunki, nigdy nic nie zdziałają. Najlepszy czas na działanie jest teraz! <figcaption>Mark Fisher</figcaption>`,
    9: `Mądrzy ciągle się uczą, głupcy najczęściej wszystko umieją. <figcaption>Apolinary Despinoix</figcaption>`,
    10: `Motywacja jest tym co pozwala Ci zacząć. Nawyk jest tym co pozwala Ci wytrwać! <figcaption>Stephen Covey</figcaption>`,
    11: `W życiu nie chodzi o czekanie, aż burza minie… Chodzi o to, by nauczyć się tańczyć w deszczu. <figcaption>Vivian Green</figcaption>`,
    12: `Ważniejsze jest, co ty myślisz o sobie samym, niż to, co o tobie myślą inni. <figcaption>Seneka Mlodszy</figcaption>`,
    13: `Kto potrafi cieszyć się z małych rzeczy, mieszka w ogrodzie pełnym szczęśliwości. <figcaption>Phil Bosmans</figcaption>`,
    14: `Nigdy nie rezygnuj z celu tylko dlatego, że osiągnięcie go wymaga czasu. Czas i tak upłynie. <figcaption>H. Jackson Brown</figcaption>`,
    15: `Dopóki nie będziesz cenić siebie, nie będziesz cenić własnego czasu. <figcaption>M. Scott Peck</figcaption>`,
    16: `Jesteśmy tym, co w swoim życiu powtarzamy. Doskonałość nie jest jednorazowym aktem, lecz nawykiem. <figcaption>Arystoteles</figcaption>`,
    17: `Jeśli nie czujesz się godny, by wyrosły Ci skrzydła, nigdy nie oderwiesz się od ziemi. <figcaption>Nick Vujicic</figcaption>`,
    18: `Jeśli potrafisz o czymś marzyć, to potrafisz także tego dokonać. <figcaption>Walt Disney</figcaption>`,
    19: `Ludzie są dokładnie tak szczęśliwi, jak myślą, że są. <figcaption>Abraham Lincoln</figcaption>`,
    20: `Potykając się, można zajść daleko; nie wolno tylko upaść i nie podnieść się. <figcaption>Goethe</figcaption>`,
    21: `Prawdziwy akt odkrycia nie polega na odnajdywaniu nowych lądów, lecz na patrzeniu na stare w nowy sposób. <figcaption>Marcel Proust</figcaption>`,
    22: `Przeciwności, z którymi musimy się zmierzyć, często sprawiają, że stajemy się silniejsi. A to, co dziś wydaje się stratą, jutro może okazać się zyskiem. <figcaption>Nick Vujicic</figcaption>`,
    23: `Ludzie, którzy tracą czas czekając, aż zaistnieją najbardziej sprzyjające warunki, nigdy nic nie zdziałają. Najlepszy czas na działanie jest teraz! <figcaption>Mark Fisher</figcaption>`,
    24: `Mądrzy ciągle się uczą, głupcy najczęściej wszystko umieją. <figcaption>Apolinary Despinoix</figcaption>`,
    25: `Motywacja jest tym co pozwala Ci zacząć. Nawyk jest tym co pozwala Ci wytrwać! <figcaption>Stephen Covey</figcaption>`,
    26: `W życiu nie chodzi o czekanie, aż burza minie… Chodzi o to, by nauczyć się tańczyć w deszczu. <figcaption>Vivian Green</figcaption>`,
    27: `Ważniejsze jest, co ty myślisz o sobie samym, niż to, co o tobie myślą inni. <figcaption>Seneka Mlodszy</figcaption>`,
    28: `Kto potrafi cieszyć się z małych rzeczy, mieszka w ogrodzie pełnym szczęśliwości. <figcaption>Phil Bosmans</figcaption>`,
    29: `Nigdy nie rezygnuj z celu tylko dlatego, że osiągnięcie go wymaga czasu. Czas i tak upłynie. <figcaption>H. Jackson Brown</figcaption>`,
    30: `Dopóki nie będziesz cenić siebie, nie będziesz cenić własnego czasu. <figcaption>M. Scott Peck</figcaption>`,
    31: `Jesteśmy tym, co w swoim życiu powtarzamy. Doskonałość nie jest jednorazowym aktem, lecz nawykiem. <figcaption>Arystoteles</figcaption>`,
  },
  offline: {
    title: "Brak połączenia z internetem",
    description: "Sprawdź swoje połączenie i spróbuj ponownie.",
  },
  workInProgress: {
    title: "Przerwa modernizacyjna",
    description: "Przepraszamy za utrudnienia. Wkróce wrócimy!",
  },
  personalizedContent: {
    title: "Personalizacja treści systemowych",
    contentUpdated: "Treść została zaktualizowana",
    fields: {
      name: "Nazwa (identyfikator)",
      title: "Tytuł",
      content: "Treść"
    },
    editAction: "Zapisz zmiany",
    edit: {
      title: "Edytuj treść",
    }
  },
  candidateQuiz: {
    start: "Rozpocznij",
    goToQuiz: "Przejdź do quizu",
    checkAnswers: "Sprawdź odpowiedzi",
    requiredMinScore: "Próg zaliczenia to ",
    goFurther: "Przejdź dalej",
    refresh: "Spróbuj ponownie"
  },
  newsletter: {
    fields: {
      firstName: "Imię",
      lastName: "Nazwisko",
      email: "E-mail",
    },
    error: "Wypełnij wszystkie pola!",
    errorDescription: "Wszystkie pola są wymagane...",
    subscribed: "Zapisano na newsletter!",
    subscribedDescription: "Dziękujemy :)",
    goToApp: "Przejdź do aplikacji",
  },
  legal: {
    cookieBox: `
      Aby kontynuować, musisz zaakceptować naszą <a href="/dashboard/cookies">politykę cookies</a>, <a href="/dashboard/privacy">politykę prywatności</a> oraz <a href="/dashboard/terms">regulamin</a>.
    `,
    privacy: {
      title: "Polityka prywatności",
      text: `
      <p>Nadrzędnym celem naszego Serwisu jest gromadzenie jak najmniejszej ilości danych o Użytkownikach i tylko takiej, która jest niezbędna do ich obsługi.</p>

      <h2>Definicje</h2>
      <p><strong>EqApp.pl/My</strong> - właściciel serwisu.</p>
      <p><strong>Dane Osobowe</strong> – informacje o zidentyfikowanej lub możliwej do zidentyfikowania osobie fizycznej>/p>

      <p><strong>Serwis</strong> – strona internetowa, pod adresem https://eqapp.pl oraz pod adresami będącymi przekierowaniami do tego adresu, a także każdym innym będącym jego uzupełnieniem lub kontynuacją i każdym tym, który go zastąpi.</p>

      <p><strong>Użytkownik/Ty</strong> – osoba fizyczna odwiedzająca Serwis lub korzystająca z naszych usług.</p>

      <p><strong>RODO</strong> – Rozporządzenie Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 7 kwietnia 2016 roku w sprawie ochrony osób fizycznych w związku z przetwarzaniem danych osobowych i w sprawie swobodnego przepływu takich danych oraz uchylenia dyrektywy 95/46/WE.</p>

      <p><strong>Polityka</strong> – niniejsza Polityka prywatności.</p>

      <p><strong>Regulamin</strong> – regulamin Serwisu dostępny pod linkiem.</p>

      <p><strong>Cookies/Ciasteczka</strong> – dane informatyczne, w szczególności pliki tekstowe, przechowywane w urządzeniach końcowych użytkowników. Pozwalają rozpoznać urządzenie użytkownika i odpowiednio wyświetlić stronę internetową dostosowaną do jego indywidualnych preferencji.</p>

      <h2>Korzystanie z serwisu</h2>
    <p>Jeżeli korzystasz z Serwisu, MysterFox.pl, ten na pewno przetwarza Twoje Dane Osobowe. Przez te dane należy rozumieć adres IP lub inne identyfikatory oraz informacje gromadzone za pośrednictwem plików cookies albo innych podobnych technologii. To, jaka dokładnie aktywność, w jaki sposób i w jakich celach jest rejestrowana, jest opisane w sekcjach poniżej.</p>

    <p>Celem gromadzenia tych danych jest identyfikacja nadawcy oraz obsługa jego zapytania przesłanego przez udostępnione formularze oraz analiza analityczna i statystyczna.</p>

    <p>Podstawą prawną tych działań jest niezbędność przetwarzania do wykonania umowy o świadczenie usługi oraz robienia tego w jak najlepszej jakości.</p>

    <h2>Użytkownik odwiedzający stronę</h2>
    <p>Od momentu wejścia na stronę, Serwis może od razu zapisyjwać/przetwarzać o Użytkowniku jedną informację – adres IP.</p>

  <h2>Adres IP</h2>

  <p>Adres nie jest domyślnie analizowany ani zapisywany, lecz Serwis zastrzega sobie prawo do sprawdzania adresu IP Użytkownika w celach bezpieczeństwa oraz blokowania takiego adresu, jeśli zachodzi podejrzenie, że jest on źródłem działalności niezgodnej z prawem.</p>

  <h2>Użytkownik korzystający z usług Serwisu</h2>
  <p>W przypadku pełnego korzystania z usług serwisu, tj. nie tylko przeglądania oferty serwisu, ale także korzystania z webinarów wymagana jest odpowiednia weryfikacja. Użytkownik musi jednorazowo podzielić się swoimi danymi osobowymi w postaci imienia, nazwiska oraz adresu e-mail. Dane te są zapisywane w bazie danych serwisu i przy użyciu "ciasteczka" przypisywane do konkretnego uzytkownika. Ma to na celu weryfikację, aby dostęp do webinarów miały tylko pożądane osoby.</p>

  <h2>Rejestracja i logowanie</h2>

  <p>Rejestracja w Serwisie jest możliwa tylko i wyłącznie dla partnerów firmy Eqology. Tym samym, przy próbie rejestracji, użytkownik musi podać podstawowe dane osobowe (imię, nazwisko, adres e-mail, identyfikator Eqology), tak aby właściciel Serwisu mógł taką osobę zweryfikować. W przypadku, gdy użytkownik nie jest partnerem firmy Eqology, rejestracja nie jest możliwa.</p>

  <p>Jest to niezbędne minimum informacji, które Serwis musi pozyskać, aby być w stanie poprawnie identyfikować użytkownika E-mail i hasło są podstawą procesu logowania. Podając obie te informacje na podstronie autoryzacji, Użytkownik upewnia Serwis, że jest tą osobą, za którą się podaje.</p>

  <h2>Serwisy zewnętrzne</h2>

  <p>Serwis korzystu z usług firm ClickMeeting oraz GetResponse w celu realizacji usługi webinarów na żywo oraz newslettera. Aby było to możliwe, niektóre dane osobowe muszą być przesyłane również firm trzecich. Informacje o tym, jakie dokładnie dane są wykorzystywane, można znaleźć w politykach prywatności obu serwisów – clickmeeting.com oraz getresponse.pl</p>

  <h2>Dostawcy usług</h2>

  <p>W związku z realizacją Usług Twoje Dane Osobowe będą lub mogą być w przyszłości podczas realizacji zamówienia ujawniane zewnętrznym podmiotom, w tym w szczególności dostawcom odpowiedzialnym za obsługę systemów informatycznych, takim jak:</p>
  <ul>
    <li>
    -agencjom marketingowym (analiza statystyczna),
    </li>
    <li>
    -podmiotom świadczącym usługi utrzymania kopii zapasowej serwisu i przechowywania danych
    </li>
  </ul>

  <h2>Organy administracji państwowej</h2>

  <p>Zastrzegamy sobie prawo ujawnienia informacji właściwym organom bądź osobom trzecim, które zgłoszą żądanie udzielenia takich informacji, w oparciu o odpowiednią podstawę prawną oraz zgodnie z przepisami obowiązującego prawa.<p>

  <h2>Prawa użytkowników</h2>
  <p>Użytkownik posiada następujące prawa:</p>

  <ul>
    <li>-dostępu do treści danych oraz żądania ich sprostowania,<li>
    <li>-usunięcia przechowywanych danych,<li>
    <li>-ograniczenia przetwarzania,<li>
    <li>-prawo wniesienia skargi do organu nadzorczego zajmującego się ochroną danych osobowych,<li>
    <li>-prawo wniesienia sprzeciwu względem przetwarzania danych<li>
  </ul>
  <p>Możesz skorzystać z tych praw w dowolnej chwili. W takiej sytuacji prosimy o kontakt mailowy - support@esteraikamilhanasz.pl. Gdy tylko dostaniemy odpowiednią informację, poczynimy odpowiednie kroki.</p>

  <h2>Bezpieczeństwo danych</h2>
  <p>Dokładamy wszelkich starań, aby Twoje Dane Osobowe były bezpieczne. Wszystkie operacje przetwarzania danych są jak najbardziej poufne i przeprowdzane tylko w koniecznej formie. Dbamy o to, by wszystkie operacje były rejestrowane i realizowane jedynie przez osoby uprawnione. Każdy z naszych podmiotów zewnętrznych daje nam gwarancję, że stosuje odpowiednie środki bezpieczeństwa, kiedy przetwarza Twoje Dane Osobowe</p>

  <h2>Zmiany polityki</h2>
  <p>Wraz ze zmianami prawnymi oraz rozszerzeń funkcjonalności treść tej polityki prywatności może ulec zmianie. Zmiany te mają na celu ochronę Twoich praw w możliwie nalepszy sposób. O każdej zmianie Serwis będzie informował za pomocą witryny.</p>
      `
    }
  }
}
