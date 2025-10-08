const globalConfig = {
  mails: {
    footer: `
    <p></p>
    <p>З повагою,

    Команда EQApp</p>
    `,
  }
}

export default {
  setup: {
    title: "Ласкаво просимо в EQApp!",
    chooseLanguage: "Виберіть мову",
    thisSeetingCanBeLaterChanged: "Ці налаштування можна змінити пізніше.",
    signUpForNewsletter: "Підпишіться на розсилку новин",
    skip: "Пропустити",
    subscribe: "Підписатися",
    langNotSupported: "Обрана мова не підтримується.",
  },
  whatAmIDoingHere: {
    title: "Приємно познайомитись :)",
    content: "Схоже, ви завітали до нас без жодної рекомендації. Розкажіть нам, хто вам про нас розповів? Як ви сюди потрапили? :)",
    skip: "Перейти до додатку",
    fields: {
      content: "Зміст",
      name: "Ім'я",
      email: "Електронна пошта",
      phone: "Телефон",
    },
    messageSent: "Повідомлення відправлено!",
    messageSentDescription: "Дякуємо, що поділилися інформацією! Тепер ви можете перейти до додатку :)",
    goToApp: "Перейти до додатку",
    error: "Заповніть обов'язкові поля",
    errorDescription: "Заповніть обов'язкові поля",
  },
  joinUs: {
    title: "Зв'яжіться з нами",
    fields: {
    name: "Ім'я",
    email: "Електронна пошта",
    phone: "Номер телефону",
    content: "Повідомлення",
    },
    error: "Заповніть обов'язкові поля",
    errorDescription: "Усі поля повинні бути заповнені.",
    messageSent: "Повідомлення відправлено!",
    messageSentDescription: "Дякуємо за ваш контакт! Ми обов'язково зв'яжемося з вами :)",
  },
  clients: {
    links: {
      home: "Головна",
      services: "Послуги",
      webinars: "Вебінари",
      products: "Продукти",
      contact: "Контакти",
      articles: "Статті",
      shop: "Магазин",
      aboutUs: "Про нас",
      cookies: "Куки",
      partnerZone: "Зона партнера",
    },
    splash: {
      healthProtect: "Ми подбаємо про ваше здоров'я!",
      goToShop: "Познайомтеся з нашими продуктами",
    },
    why: {
      title: "Чому Eqology?",
      learnMore: "Ласкаво просимо!",
      slogan: "Сертифікати/Дослідження/Статті"
    },
    products: {
      title: "Наші продукти",
      ourProducts: "Наші продукти",
      fromProducer: "Від виробника",
      deliveryInTwoDays: "Доставка за два дні",
      buyNow: "Купити зараз",
      theChoiceIsYours: "Вибір за вами!",
      shop: "КУПИТИ!",
    },
    contact: {
      title: "Зв'яжіться з нами",
      sendUsEmail: "Надішліть нам електронного листа",
    },
    whatAmIDoingHere: {
      title: "Приємно познайомитись!",
      content: "Схоже, ви завітали до нас без жодної рекомендації. Розкажіть нам, хто вам про нас розповів? Як ви сюди потрапили? :)",
    },
    posts: {
      readMore: "Читати далі!",
      readMe: "Читайте",
      title: "Статті",
      description: `База даних зі статтями все ще оновлюється.

      Скоро з'являться нові статті та відео з фахівцями.`,
    },
    faqs: {
      title: "Поширені запитання",
    },
    whyUs: {
      slogan: "Найвища якість у світі - НАЙВАЖЛИВІША для нас!",
      certificates: "Сертифікати",
      products: "Продукти",
      faq: "Поширені запитання",
    },
    certificates: {
      title: "Довіряйте експертам",
      description: "Наші продукти неодноразово перевірялися, тестувалися та нагороджувалися. Наша якість поза сумнівом.",
      slogan: "Обирайте мудро - <strong>обирайте Eqology</strong>.",
      seeMore: "Дивитися більше",
    },
    meetOurProducts: {
      title: "Познайомтеся з нашими продуктами",
      goToShop: "Перейти до магазину",
    },
    webinars: {
      businessWebinars: "Бізнес-вебінари",
      clientWebinars: "Клієнтські вебінари",
      register: "Зареєструватися",
      noData: "Вебінарів не знайдено... Скоро завітайте до нас!",
      subscribe: "Підписатися",
      success: {
        title: "Успіх!",
        description: "Успіх! Тепер вам потрібно лише перейти до своєї поштової скриньки, підтвердити свою електронну пошту і... ми чекаємо на вас на вебінарі! :)",
      },
      youHaveToVerify: {
        title: "Вам потрібно підтвердити свою електронну пошту",
        description: "Перед тим, як ви зможете зареєструватися на вебінар, вам потрібно підтвердити свою електронну пошту. Перевірте свою поштову скриньку та підтвердьте свою адресу електронної пошти.",
      },
      invitationExpired:{
        title: "Ой...",
        description: "Запрошення закінчилося або вебінар скасовано.",
      },
    }
  },
  common: {
    share: "Поділитися",
    goTop: "Перейти до верху",
    languages: {
      intl: "Усі мови",
      pl: "Польська",
      en: "Англійська",
      uk: "Українська",
      lt: "Литовська",
      de: "Німецька",
    },
    weekDays: {
      1: "Понеділок",
      2: "Вівторок",
      3: "Середа",
      4: "Четвер",
      5: "П'ятниця",
      6: "Субота",
      7: "Неділя",
    },
    weekDaysShort: {
      1: "Пн",
      2: "Вт",
      3: "Ср",
      4: "Чт",
      5: "Пт",
      6: "Сб",
      7: "Нд",
    },
    months: {
      1: "Січень",
      2: "Лютий",
      3: "Березень",
      4: "Квітень",
      5: "Травень",
      6: "Червень",
      7: "Липень",
      8: "Серпень",
      9: "Вересень",
      10: "Жовтень",
      11: "Листопад",
      12: "Грудень",
    },
    submit: "Надіслати",
    save: "Зберегти",
    goBack: "Повернутися назад",
    file: "Файл",
    language: "Мова",
    none: "Немає",
    return: "Повернутися",
    error: "Помилка",
    changeSpeed: "Змінити швидкість",
    goBackToHome: "Повернутися на головну",
    noData: "Немає даних",
    noDataDesc: "Немає даних для відображення",
    noDataFound: "Немає результатів",
    noDataFoundDesc: "Немає результатів, що відповідають вашому запиту.",
    notFound: "Не знайдено",
    unexpectedError: "Непередбачена помилка",
    unexpectedErrorDescription: "Сталася непередбачена помилка. Будь ласка, спробуйте знову пізніше.",
    unauthorized: "Немає дозволу",
    unauthorizedDescription: "У вас немає дозволу на перегляд цієї сторінки.",
    somethingWentWrong: "Щось пішло не так",
    somethingWentWrongDescription: "Сталася непередбачена помилка. Будь ласка, спробуйте знову пізніше.",
    noInternet: "Немає з'єднання з Інтернетом",
    noInternetDescription: "Будь ласка, перевірте своє з'єднання з Інтернетом та спробуйте знову.",
    badRequest: "Неправильний запит",
    badRequestDescription: "Запит містить недійсні дані.",
    chosen: "Обраний",
    confirm: "Підтвердити",
    cancel: "Скасувати",
    edit: "Редагувати",
    close: "Закрити",
    create: "Створити",
    remove: "Видалити",
    search: "Пошук...",
    searchResults: "Результати пошуку",
    select: "Вибрати",
    addAttachment: "Додати вкладення",
    translations: "Переклади",
    categories: "Категорії",
    category: "Категорія",
    currentBrowsing: "Поточний перегляд",
    otherTranslations: "Інші переклади",
    addTranslation: "Додати переклад",
    relatedFiles: "Пов'язані файли",
    relatedImages: "Пов'язані зображення",
    relatedVideos: "Пов'язані відео",
    schedule: "Розклад",
    challenges: "Виклики",
    days: "днів",
    hours: "годин",
    minutes: "хвилин",
    seconds: "секунд",
    ready: "Готовий до старту!",
    motivate: "Змотивуйте себе :)",
    watch: "Дивитися",
    validation: {
      dateInPast: "Дата не може бути в минулому",
      errorsExist: "Сталися помилки...",
      required: "Це поле є обов'язковим",
      minLength: "Мінімальна кількість символів - {0}",
      maxLength: "Максимальна кількість символів - {0}",
      minArrayLength: "Мінімум {0} елементів",
      maxArrayLength: "Максимум {0} елементів",
      min: "Мінімальне значення - {0}",
      max: "Максимальне значення - {0}",
      isEmail: "Невірна адреса електронної пошти",
      isNumber: "Це повинно бути числом",
      passwordRepeat: "Паролі не збігаються",
      pattern: "Невірний формат",
      invalidType: "Невірний тип",
      imageType: "Підтримувані типи: {0}",
      imagesType: "Принаймні одне зображення має невірний формат (підтримувані типи: {0}",
      filesSize: "Принаймні один файл має невірний розмір (максимум {0} МБ)",
      fileSize: "Максимальний розмір файлу - {0} МБ",
      imageSize: "Зображення має невірні розміри або пропорції",
      select: "Невірний варіант",
      date: "Невірна дата",
      dataList: "Вибрані значення не дозволені",
      dateEndTooEarly: "Кінцева дата повинна бути після початкової дати",
      wysiwygNoFiles: "Немає інформації про файл для поля WYSIWYG",
      wysiwygImagesAmount:
        "Кількість завантажених зображень не відповідає очікуваній кількості (поле WYSIWYG)",
      notFound: "Запитуваний елемент не знайдено",
      fileUploadError:
        "Помилка при завантаженні файлу, можливо, файл занадто великий. Максимальний розмір файлу - {0} МБ",
      fileType: "Невірний формат файлу (підтримувані формати: {0})",
      multiLangRequired: "Базовий переклад відсутній",
      emailRepeat: "Електронні адреси не збігаються",
    },
    roles: {
      CLIENT: "Клієнт",
      ADMIN: "Адміністратор",
      LEADER: "Лідер",
      PARTNER: "Партнер",
      CANDIDATE_PARTNER: "Кандидат у партнери",
    },
  },
  dashboard: {
    welcome: "Ласкаво просимо на навчальну платформу!",
    welcomeMessage: `
      <p>Ми раді розпочати цю подорож разом. Усі необхідні навчальні матеріали тепер знаходяться в одному місці, що полегшує нам відстеження прогресу та досягнення наших цілей. Сподіваємося, що це буде унікальний освітній досвід для всіх нас!</p>
    
      <p>З повагою і побажання успіху</p>
      <p>Естера та Камиль Ханас</p>
    `
  },
  mails: {
    unverifiedAccountRemoved: {
      subject: "Ваш обліковий запис видалено",
      text: `
        <p>Вітаємо,</p>
        <p>Оскільки вашу електронну пошту не було підтверджено протягом 12 годин після реєстрації, ваш обліковий запис було видалено :(</p>
        <p>Будь ласка, зареєструйтеся знову!</p>
        ${globalConfig.mails.footer}
      `
    },
    youHaveToVerify: {
      title: "Підтвердити електронну пошту",
      description: "Щоб продовжити, ви повинні спочатку підтвердити свою електронну пошту.",
    },
    confirmWorkshopEmail: {
      subject: "Підтвердіть адресу електронної пошти",
      text: `
        <p>Вітаємо,</p>
        <p>Дякуємо за ваш інтерес до наших вебінарів! Щоб підтвердити свою адресу електронної пошти та продовжити, будь ласка, натисніть на посилання нижче.</p>
        <p><strong><a href="{0}">Натисніть тут</a></strong></p>
        ${globalConfig.mails.footer}
      `
    },
    contactMail: {
      subject: "Нове повідомлення щодо співпраці",
      text: `
        <p>Привіт,</p>
        <p>Виглядає на те, що хтось хоче з вами зв'язатися :)</p>
        <strong>{0}</strong></p>
        <p>Повідомлення:</p>
        <p><em>{1}</em></p>
        ${globalConfig.mails.footer}
      `
    },
    verificationReminder: {
      subject: "Ласкаво просимо до програми :)",
      text: `
        <p>Вітаємо,</p>
        <p>Нагадуємо, що ваш обліковий запис вже активовано.</p>
        <p>Тож якщо ви ще не увійшли до системи, запрошуємо скористатися програмою :)</p>
        <p>Ви можете вже запрошувати своїх партнерів.</p>
        <p>До зустрічі!</p>
        ${globalConfig.mails.footer}
      `
    },
    unexpectedVisitMail: {
      subject: "Непередбачений візит",
      text: `
        <p>Привіт,</p>
        <p>Схоже, хтось натрапив на наш веб-сайт, не отримавши рекомендації від жодного з наших партнерів. Ми запитали у них, як вони нас знайшли. Їхня відповідь:</p>
        <p>Його дані такі: <strong>{1}</strong></p>
        ${globalConfig.mails.footer}
      `
    },
    webinarStartsInTenMinutes: {
      subject: "Починаємо вже за 10 хвилин!",
      text: `
        <p>Вебінар <strong>{0}</strong> розпочнеться вже за 10 хвилин!</p>
        <p>Натисніть <strong><a href="{1}">сюди</a></strong>, щоб приєднатися зараз.</p>
        <p>До зустрічі! :)</p>
        ${globalConfig.mails.footer}
      `
    },
    webinarStartsInOneHour: {
      subject: "Відлік часу розпочався...",
      text: `
        <p>Вебінар <strong>{0}</strong> розпочнеться вже за годину!</p>
        <p>Нижче ви знайдете свій персоналізований лінк на захід</p>
        <p><strong><a href="{1}">Натисніть тут</a></strong></p>
        <p>До зустрічі! :)</p>
        ${globalConfig.mails.footer}
      `
    },
    webinarStartsNow: {
      subject: "Починаємо! :)",
      text: `
        <p>Вебінар <strong>{0}</strong> розпочинається.</p>
        <p>Натисніть <strong><a href="{1}">тут</a></strong>, щоб приєднатися.</p>
        <p>Чекаємо на Вас! :)</p>
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
    waitForActivationEmail: {
      subject: "Очікування активації",
      text: `
        <p>Привіт,</p>
        <p>Ваш акаунт було успішно створено, а електронна пошта перевірена.</p>
        <p>Тепер вам потрібно лише зачекати на активацію адміністратором.</p>
        <p>Не хвилюйтеся, це не забере багато часу! ;) Дякуємо за терпіння!</p>
        ${globalConfig.mails.footer}
      `
    },
    confirmEmail: {
      subject: "Підтвердіть свою електронну пошту",
      text: `
        <p>Вітаємо,</p>
        <p>Дякуємо за реєстрацію! Щоб підтвердити свою електронну пошту, натисніть на посилання нижче:</p>
        <p><strong><a href="{0}">Натисніть тут</a></strong></p>
        ${globalConfig.mails.footer}
      `
    },
    confirmWebinarEmail: {
      subject: "Підтвердіть свою електронну пошту",
      text: `
        <p>Вітаємо,</p>
        <p>Дякуємо за інтерес до нашого вебінару! Щоб підтвердити свою електронну пошту та зареєструватися на вебінар, натисніть на посилання нижче:</p>
        <p><strong><a href="{0}">Натисніть тут</a></strong></p>
        ${globalConfig.mails.footer}
      `
    },
    webinarInvitation: {
      subject: 'Запрошення на "{0}"',
      text: `
        <p>Привіт,</p>
        <p>Ми маємо персональне запрошення для вас приєднатися до цього вебінару :)</p>
        <p><a target="_blank" href="{0}">Прийняти</a></p>
        ${globalConfig.mails.footer}
      `
    },
    userPromoted: {
      subject: "Просування! :)",
      text: `
      <p>Привіт,</p>
      <p>Ваш наставник вирішив вас підвищити!</p>
      <p>Ваша нова позиція - <strong>{0}</strong>. Вітаємо!</p>
      ${globalConfig.mails.footer}
      `
    },
    passwordReset: {
      subject: "Ваш пароль було скинуто",
      text: `
      <p>Привіт,</p>
      <p>За вашим запитом ми скинули ваш пароль.</p>
      <p style="border: 0.3em solid #000; padding: 1em; width: fit-content;">Ваш новий пароль: <b>{0}</b></p>
      <p>З міркувань безпеки рекомендується змінити пароль після входу.</p>
      <p></p>
      <p>Якщо ви не запитували зміну пароля, будь ласка, проігноруйте цей лист.</p>
      ${globalConfig.mails.footer}
      `
    },
    userInvited: {
      subject: "Запрошення на реєстрацію",
      text: `
      <p>Вітаємо,</p>
      <p>Ми раді, що ви приєднуєтеся до нас! :) Натисніть посилання нижче, щоб зареєструватися в нашій системі:</p>
      <p><a href="{0}">Зареєструватися</a></p>
      `
    },
    userActivated: {
      subject: "Ваш аккаунт було активовано",
      text: `
      <p>Привіт,</p>
      <p>Ваш обліковий запис активовано! :) Ви можете увійти та повністю користуватися всіма перевагами нашого застосунку.</p>
      <p>Перейдіть до застосунку, натиснувши посилання нижче:</p>
      <p><a href="{0}">Увійти</a></p>
      ${globalConfig.mails.footer}
      `
    },
    userRemoved: {
      subject: "Ваш аккаунт було видалено",
      text: `
      <p>Привіт,</p>
      <p>На жаль, перевірка вашого аккаунту була невдалою, і ваш аккаунт було видалено.</p>
      <p>Якщо ви вважаєте, що це помилка, будь ласка, зв'яжіться з нами.</p>
      ${globalConfig.mails.footer}
      `
    },
    contactJoinedMentor: {
      subject: "У вас з'явився новий партнер!",
      text: `
      <p>Привіт,</p>
      <p>Вітаємо! У вас з'явився новий партнер! :)</p>
      <p>Його ім'я - {0}. Ви можете відстежувати його прогрес в адміністративній панелі (закладка "партнери") у будь-який час.</p>
      ${globalConfig.mails.footer}
      `
    },
  },
  nav: {
    home: "додому",
    webinars: "Вебінари",
    products: "Продукти",
    shop: "Магазин",
    contact: "контакт",
    partners: "Партнери",
    clients: "Клієнти",
    notifications: "Сповіщення",
    films: "фільми",
    startup: "Запуск 90 днів",
    workshops: "Майстер-класи",
    workshopsClient: "Клієнтська зона",
    workshopsPartner: "Партнерська зона",
    myWorkshopsDescription: "Вміщені тут семінари будуть доступні лише для ваших партнерів.",
    usefulLinks: "Корисні посилання",
    logout: "Вийти",
    login: "Логін",
    register: "зареєструватися",
    profile: "Редагувати профіль",
    chooseProgram: "Виберіть програму",
    boards: "система",
    admin: "Панель адміністратора",
    partnerZone: "Партнерська зона",
    slogans: {
      spirit: "дух",
      passion: "пристрасть",
      togetherness: "єднання"
    },
    adminSubmenu: {
      webinars: "Вебінари",
      users: "Користувачі",
      roles: "Ролі",
      workshops: "Майстер-класи",
      proteges: "Протеже",
      notifications: "Сповіщення",
      announcements: "Оголошення",
      pages: "сторінки",
      menuLinks: "Посилання на меню",
      products: "Продукти",
      posts: "Пости",
      certificates: "Сертифікати",
      faqs: "FAQ",
      systemContent: "Системний вміст",
      candidateQuizes: "Кандидатські вікторини"
    }
  },
  verifyEmail: {
    title: "Підтвердити електронну адресу",
    successTitle: "Успіх!",
    successDescription: "Вашу електронну адресу підтверджено! "
  },
  register: {
    title: "зареєструватися",
    createAction: "зареєструватися",
    chooseMentor: "Виберіть наставника",
    verifyCode: "Це майже все...",
    codeIsWrong: "Код неправильний",
    verifyMail: "Це майже все! Нам потрібно лише перевірити вашу електронну пошту. Перевірте свою поштову скриньку та натисніть на посилання, яке ми вам надіслали.",
    contact: {
      desc: "У нас уже є ваша електронна адреса, ім’я та прізвище. ",
      chooseRole: "Виберіть варіант, який найбільше відповідає вашому шляху розвитку."
    },
    accountTypes: {
      client: "Клієнт",
      partner: "Партнер"
    },
    fields: {
      email: "Електронна пошта",
      emailRepeat: "Повторіть електронну пошту",
      password: "Пароль",
      passwordRepeat: "Повторіть пароль",
      eqId: "ID ЕКОЛОГІЇ",
      firstName: "Ім'я",
      lastName: "Прізвище",
      avatar: "Аватар",
      phone: "Номер телефону",
      termsOfUse: "Я даю згоду на обробку моїх персональних даних для коректної перевірки членства (Закон. вісник 2017 р., п. 1219) і приймаю <a class=\"link\" href=\"{0}\" target=\"_blank\">правила та умови</a> і погоджуєтесь бути підписаним на розсилку.",
      saveToNewsletter: "Підпишіться на мою розсилку",
      saveToNewsletterDescription: "Я хочу отримувати інформацію про новини, акції та від Eqology.",
      emailConfirmation: "Я перевірила, що електронна пошта вказана правильно. Це дуже важливо, тому що після реєстрації ви обов'язково повинні перейти за активаційним посиланням, яке ми вам надішлемо."
    },
    success: {
      create: "Успіх!",
      createDesc: "Реєстрація пройшла успішно! "
    },
    errors: {
      emailExists: "Користувач із вказаною електронною адресою вже існує",
      eqIdExists: "Користувач із вказаним номером EQOLOGY вже існує",
      client: {
        emailExists: "Надана електронна адреса вже використовується іншим клієнтом"
      }
    }
  },
  registerPartner: {
    title: "зареєструватися",
    createAction: "зареєструватися",
    fields: {
      email: "Електронна пошта",
      password: "Пароль",
      passwordRepeat: "<PASSWORD>",
      oriflameId: "Оріфлейм ID",
      firstName: "Ім'я",
      lastName: "Прізвище",
      avatar: "Аватар",
      termsOfUse: "Я даю згоду на обробку моїх персональних даних для коректної перевірки членства (Закон. вісник 2017 р., п. 1219) і приймаю <a class=\"link\" href=\"{0}\" target=\"_blank\">правила та умови</a>",
    },
    success: {
      create: "Успіх!",
      createDesc: "Реєстрація пройшла успішно! "
    },
    errors: {
      emailExists: "Користувач із вказаною електронною адресою вже існує",
      oriflameIdExists: "Користувач із вказаним ID Oriflame вже існує"
    }
  },
  profile: {
    title: "Редагувати профіль",
    info: "Заповнюйте поля пароля, лише якщо ви хочете його змінити.",
    editAction: "Зберегти зміни",
    fields: {
      email: "Електронна пошта",
      password: "Пароль",
      passwordRepeat: "Повторіть пароль",
      oriflameId: "Оріфлейм ID",
      firstName: "Ім'я",
      lastName: "Прізвище",
      avatar: "Аватар",
      eqShopUrl: "Рекомендаційне посилання на магазин Eqology"
    },
    success: {
      edit: "Успіх!",
      editDesc: "Зміни застосовано"
    }
  },
  login: {
    title: "Логін",
    actionLogin: "авторизуватися",
    actionRegister: "зареєструватися",
    actionReset: "Скинути пароль",
    dontHaveAccount: "Немає облікового запису?",
    forgotPassword: "Забули пароль?",
    fields: {
      email: "Електронна пошта",
      password: "Пароль"
    },
    success: {
      create: "Успіх!",
      createDesc: "Вхід успішний!"
    },
    errors: {
      invalidCredentials: "Недійсна адреса електронної пошти або пароль",
      inactiveUser: "Ваш обліковий запис ще не активовано"
    }
  },
  forgotPassword: {
    title: "Забули свій пароль?",
    action: "Скинути пароль",
    fields: {
      email: "Електронна пошта",
      eqId: "ID ЕКОЛОГІЇ"
    },
    errors: {
      invalidData: "Недійсні дані"
    },
    success: {
      title: "Успіх!",
      description: "На вказану електронну адресу надіслано посилання з новим паролем."
    }
  },
  cropper: {
    title: "Урожай",
    confirm: "Підтвердити",
    cancel: "Скасувати"
  },
  termsOfUse: {
    title: "Умови використання"
  },
  footer: {
    links: {
      admin: "Панель адміністратора"
    }
  },
  notFound: {
    title: "Ой... Не знайдено!",
    description: "Нам не вдалося знайти потрібну сторінку. "
  },
  unauthorized: {
    title: "Ой... Ви не маєте дозволу!",
    description: "Ви не маєте дозволу переглядати цю сторінку. "
  },
  admin: {
    title: "Панель адміністратора",
    links: {
      users: "Користувачі",
      workshops: "Майстер-класи",
      courses: "Курси",
      startup: "Запуск 90 днів"
    }
  },
  users: {
    title: "Користувачі",
    invitation: {
      confirm: {
        title: "Підтвердити",
        desc: "Ви впевнені, що хочете надіслати запрошення на реєстрацію?",
      },
    },
    invite: "Запросити",
    candidates: "Кандидати",
    candidatesTitle: "Кандидати на партнерів",
    invitationSent: "Запрошення надіслано",
    waitingForActivation: "Очікування активації",
    activateUser: "активувати",
    deleteUser: "Видалити",
    userUpdated: "Користувач оновлений",
    allUsers: "Всі користувачі",
    editAction: "Зберегти зміни",
    delete: {
      confirmTitle: "Ти впевнений?",
      confirmDesc: "Ви впевнені, що хочете видалити цього користувача? "
    },
    edit: {
      title: "Редагувати користувача"
    },
    roles: {
      client: "Клієнт",
      partner: "Партнер",
      leader: "Лідер",
      admin: "адмін",
      candidate_partner: "Кандидат в партнери"
    },
    fields: {
      firstName: "Ім'я",
      lastName: "Прізвище",
      role: "Роль",
      mentor: "Наставник"
    },
    success: {
      edit: "Успіх!",
      editDesc: "Зміни застосовано"
    }
  },
  workshops: {
    icons: {
      HEART: "серце",
      LIKE: "Люблю",
      STATS: "Статистика",
      CONFIG: "спорядження",
      WORKSHOP: "Майстерня",
      INFO: "Інформація",
      FB: "Facebook",
      INSTAGRAM: "Instagram",
      SPORT: "спорт",
      MEDITATION: "Медитація",
      CHAT: "Чат",
      TROPHY: "Трофей",
      STAR: "зірка",
      CHALLENGE: "Виклик",
      MAIL: "Пошта",
      CALENDAR: "Календар",
      VIDEO: "відео",
      BOOK: "книга",
      PAPER: "Папір",
      LINK: "Посилання",
      FILE: "Файл",
      TEXT: "текст",
      PLUS: "Плюс",
      MINUS: "Мінус",
      CHECK: "Перевірте",
      MUSIC: "музика",
      CROSS: "Хрестик",
      ARROW_LEFT: "Стрілка вліво",
      ARROW_RIGHT: "Стрілка вправо",
      ARROW_UP: "Стрілка вгору",
      ARROW_DOWN: "Стрілка вниз",
      LOCK_OPEN: "Відкритий замок",
      LOCK_CLOSED: "Закритий замок",
      PIN: "Pin",
      PIN_TWO: "Pin два",
      CHART_UP: "Діаграми",
      CHART_DOWN: "Графік вниз",
      CHART_ALT: "Діаграма alt",
      TOOLS: "Інструменти",
      BOMB: "Бомба",
      DYNAMITE: "Динаміт",
      DIAMOND: "діамант",
      CASH: "Готівка",
      CASH_TWO: "Готівка два",
      GOLD: "золото",
      BUS: "Автобус",
      CAR: "автомобіль",
      TAXI: "Таксі",
      BOAT: "Човен",
      PLANE: "Літак",
      BIKE: "велосипед",
      SMARTPHONE: "смартфон",
      LAPTOP: "Ноутбук",
      DESKTOP: "Робочий стіл",
      PHONE_OLD: "Старий телефон",
      KEYBOARD: "Клавіатура",
      CAMERA: "Камера",
      COMPASS: "компас",
      ALARM: "сигналізація",
      WOMAN: "жінка",
      MAN: "людина",
      HOME: "додому",
      BELL: "дзвоник",
      ACADEMY: "Академія",
      CERTIFICATE: "Сертифікат",
      LIST: "Список",
      MOVIE: "фільм",
      PROFILE: "Профіль",
      CROWN: "Корона",
      KEY: "ключ",
      PATHS: "Шляхи",
      USERS: "Користувачі",
      NOTIFICATION: "Сповіщення",
      EXIT: "Вихід",
      CART: "кошик",
      FILES: "Файли",
      FIRE: "Вогонь"
    },
    title: "Майстер-класи",
    firstStepsTitle: "Перші кроки",
    titleClient: "Клієнтські майстерні",
    titlePartner: "Партнерські семінари",
    deleteWorkshop: "Видалити",
    allWorkshops: "Всі майстерні",
    editAction: "Зберегти зміни",
    createAction: "Додати майстерню",
    startAction: "старт",
    step: "Крок {0}",
    noWorkshopsInStep: "На цьому кроці немає семінарів",
    workshopCreated: "Майстерня додана",
    workshopUpdated: "Майстерня оновлена",
    translationAdded: "Переклад додано",
    workshopRemoved: "Майстерню видалено",
    noDataTitle: "Немає даних",
    noData: "Майстерні не знайдено...",
    backToParent: "Назад",
    addSubdirectory: "Додати підкаталог",
    addItem: "Додати майстерню",
    tabs: {
      basicData: "Базовий",
      files: "Файли"
    },
    delete: {
      confirmTitle: "Ти впевнений?",
      confirmDesc: "Ви впевнені, що хочете видалити цю майстерню? "
    },
    fields: {
      name: "Ім'я",
      description: "опис",
      icon: "значок",
      YTLink: "URL-адреса відео (YT)",
      supportedRoles: "Допоміжні ролі",
      supportedLanguages: "Підтримувані мови",
      contentVideo: "URL-адреса відео (YT)",
      contentText: "Текстовий зміст",
      poster: "Графічний",
      files: "Файли (вкладення)",
      categoryId: "Категорія",
      zone: "зона",
      step: "Крок",
      public: "Доступно кожному",
      publicDescription: "Позначте цей прапорець, якщо ви хочете, щоб семінар був доступний негайно, без необхідності активації від ментора.",
      stepName: {
        1: "Крок 1",
        2: "Крок 2",
        3: "Крок 3",
        4: "Крок 4",
        5: "Крок 5",
        6: "Крок 6",
        7: "Крок 7",
        8: "Крок 8",
        9: "Крок 9",
        10: "Крок 10"
      }
    },
    edit: {
      title: "Редагувати майстерню",
      desc: "Поля <strong>\"зона\"</strong> і <strong>\"доступно кожному\"</strong> має бути однаковим для кожної мовної версії семінару.",
    },
    create: {
      title: "Додати майстерню",
      translationCreationDesc: "Ви створюєте новий переклад існуючої майстерні",
      originalLanguage: "Оригінал",
      currentLanguage: "Переклад"
    },
    contentTypes: {
      video: "відео",
      text: "Текстовий зміст"
    },
    zones: {
      client: "Клієнтська зона",
      partner: "Партнерська зона",
      both: "Обидві зони"
    },
    success: {
      create: "Успіх!",
      createDesc: "Майстерня додана",
      edit: "Успіх!",
      editDesc: "Зміни застосовано"
    },
    errors: {
      nameExists: "Майстерня з такою назвою вже існує"
    },
    categories: {
      title: "Категорії",
      allCategories: "Всі категорії",
      createAction: "Додати категорію",
      editAction: "Зберегти зміни",
      create: {
        title: "Додати категорію"
      },
      edit: {
        title: "Редагувати категорію"
      },
      fields: {
        name: "Ім'я",
        owner: "Батьківська категорія",
        description: "опис"
      },
      delete: {
        confirmTitle: "Ти впевнений?",
        confirmDesc: "Ви впевнені, що хочете видалити цю категорію? "
      }
    },
    steps: {
      editAction: "Зберегти зміни",
      edit: {
        title: "Редагувати крок"
      },
      fields: {
        name: "Ім'я",
        description: "опис"
      }
    },
    directories: {
      createAction: "Додати каталог",
      fields: {
        name: "Ім'я",
        description: "опис",
        icon: "значок",
        supportedRoles: "Допоміжні ролі",
        supportedLanguages: "Підтримувані мови"
      },
      edit: {
        title: "Редагувати каталог"
      }
    }
  },
  partnerZone: {
    title: "Партнерська зона"
  },
  proteges: {
    title: "Протеже",
    candidatesTitle: "Кандидати на партнерів",
    tree: "Дерево партнерів",
    todayProtegesCount: "Нові партнери: {0}",
    treeWrongDevice: "Дерево партнерів доступне лише на великому екрані",
    protegesList: "Список ставлеників",
    pendingRequests: "Запити, що очікують на розгляд",
    requestAccepted: "Запит прийнято",
    requestRejected: "Запит відхилено",
    copySingUpInviteLink: "Скопіюйте посилання для запрошення до реєстрації",
    copyClientLink: "Ваше посилання для клієнта (до EQAPP)",
    speedChanged: "Швидкість змінено",
    myWorkshops: "Мої майстерні",
    clients: {
      title: "Клієнти",
      noClients: "Немає клієнтів",
      info: "Інформація"
    },
    candidates: {
      title: "Кандидати",
      noCandidates: "Немає кандидатів",
      info: "Інформація"
    },
    mainInfo: {
      role: "Роль",
      createdDate: "Дата приєднання",
      lastActivity: "Остання діяльність",
      step: "Поточний крок",
      phone: "Телефон",
      email: "Електронна пошта",
      eqologyId: "Eqology ID"
    },
    activity: {
      noActivity: "Жодної діяльності",
      seeMore: "Побачити більше",
      webinarActivity: "Вебінари",
      lastActivity: "Остання діяльність",
      allActivity: "Вся діяльність",
      webinarsLatest: "Останні вебінари",
      noDataTitle: "Тут нічого :(",
      noData: "Жодної діяльності",
      descriptions: {
        WORKSHOP_FINISH: "Готова майстерня <strong>\"{0}\"</strong>",
        WORKSHOP_START: "Розпочато майстерню <strong>\"{0}\"</strong>",
        REGISTRATION: "Зареєстрований обліковий запис",
        ACTIVATION: "Аккаунт активований",
        PROMOTION: "Підвищений до <strong>\"{0}\"</strong>",
        CONTACT_CREATION: "Створено контакт",
        COURSE_FINISH: "Закінчив курс <strong>\"{0}\"</strong>",
        DEMOTION: "Понижений до <strong>\"{0}\"</strong>",
        WEBINAR_SUBSCRIPTION: "Підписався на вебінар <strong>\"{0}\"</strong>",
        WEBINAR_PRESENCE: "Відвідав вебінар <strong>\"{0}\"</strong>"
      },
      webinarActivityTypes: {
        0: "Підписався",
        1: "відвідував",
        2: "Відсутній",
        3: "Не визначився"
      },
      seeAll: "Бачити все",
      browsingActivity: "Перегляд активності користувача <strong>{0}</strong>"
    },
    courseProgress: {
      title: "Прогрес курсу",
      description: "Поточний курс – <strong>{0}</strong>"
    },
    programProgress: {
      title: "Прогрес програми",
      description: "Актуальна програма – <strong>{0}</strong>",
      seeAll: "Побачити більше",
      allProgress: "Весь прогрес",
      browsingActivity: "Перегляд курсу користувача <strong>{0}</strong>"
    },
    actions: {
      title: "Дії",
      activate: "Активувати користувача",
      activateWorkshop: "Активувати майстерню",
      delete: "Видалити користувача",
      promoteToLeader: "Підвищити до лідера",
      promoteToAdmin: "Підвищити до адміністратора",
      demoteToLeader: "Понизити до лідера",
      demoteToPartner: "Понизити до партнера",
      inviteToSignUp: "Запрошуємо до реєстрації",
      activateNextStep: "Активуйте наступний крок",
      undoStep: "Скасувати крок",
      changeMentor: "Змінити наставника"
    },
    workshopActivation: {
      title: "Майстер-класи",
      activatingWorkshop: "Активація майстерні для користувача <strong>{0}</strong>",
      errors: {
        workshopNotFound: "Майстерня з вказаним ідентифікатором не знайдена",
        unauthorized: "Користувач не має доступу до зони, до якої належить майстерня",
        badRequest: "Майстерня вже доступна для користувача"
      },
      success: "Майстерню активовано"
    },
    userRemoved: "Користувача видалено",
    protegePromoted: "Протеже отримав підвищення!",
    protegeDemoted: "Протеже понижено в посаді!",
    protegeActivated: "Protege активовано!",
    invitationSent: "Запрошення надіслано!",
    mentorChanged: "Ментора змінили!",
    stepUndone: "Крок скасовано!",
    stepActivated: "Крок активовано!",
    promotion: {
      confirm: {
        title: "Просувати протеже",
        desc: "Ви впевнені, що хочете просувати цього протеже?"
      }
    },
    demotion: {
      confirm: {
        title: "Змініть роль протеже",
        desc: "Ви впевнені, що хочете змінити роль цього протеже?"
      }
    },
    inviteToSignUp: {
      confirm: {
        title: "Запрошуємо до реєстрації",
        desc: "Ви впевнені, що хочете запросити цього користувача зареєструватися?"
      }
    },
    activate: {
      confirm: {
        title: "Активувати користувача",
        desc: "Ви впевнені, що бажаєте активувати цього користувача?"
      }
    },
    activateNextStep: {
      confirm: {
        title: "Активуйте наступний крок",
        desc: "Ви впевнені, що бажаєте активувати наступний крок для цього користувача?"
      }
    },
    undoStep: {
      confirm: {
        title: "Скасувати крок",
        desc: "Ви впевнені, що бажаєте скасувати крок для цього користувача?"
      }
    },
    changeMentor: {
      confirm: {
        title: "Змінити наставника",
        desc: "Ви впевнені, що бажаєте змінити наставника для цього користувача?"
      }
    },
    changeSpeed: {
      confirm: {
        title: "Зміна швидкості",
        desc: "Ви впевнені, що бажаєте змінити швидкість курсу/програми для цього користувача?"
      }
    },
    copyInviteLink: "Ваше посилання для Protege (до EQAPP)",
    inviteLinkCopied: "Посилання скопійовано",
    courseRequests: {
      title: "Курси",
      protegeAsksFor: "Запитує активацію курсу <strong>\"{0}\"</strong>",
      denyAction: "Заперечувати",
      activateAction: "активувати"
    },
    programRequests: {
      title: "Програми",
      protegeAsksFor: "Запитує активацію програми <strong>\"{0}\"</strong>",
      denyAction: "Заперечувати",
      activateAction: "активувати"
    },
    activationRequests: {
      title: "Активації",
      protegeAsksFor: "Запитує активацію облікового запису",
      denyAction: "Заперечувати",
      activateAction: "активувати"
    }
  },
  courses: {
    title: "Курси",
    allCourses: "Всі курси",
    createAction: "Додайте курс",
    editAction: "зберегти зміни",
    courseCreated: "Курс додано",
    courseUpdated: "Зміни впроваджено",
    courseRemoved: "Курс видалено",
    timeToStart: "Ваш курс незабаром розпочнеться!<br> Час починати <strong>{0}</strong> це...",
    create: {
      title: "Додайте курс",
      desc: "На цій панелі ви можете додати новий курс, але без конкретного плану уроку. "
    },
    edit: {
      title: "Редагувати курс"
    },
    delete: {
      confirmTitle: "Ти впевнений?",
      confirmDesc: "Ви впевнені, що хочете видалити цей курс? "
    },
    fields: {
      name: "Ім'я",
      description: "опис",
      contract: "Договір",
      poster: "Графіка",
      days: "Тривалість"
    },
    day: {
      title: "День {0}",
      editAction: "зберегти зміни",
      success: {
        edit: "Успіх!",
        editDesc: "Опис оновлено"
      },
      fields: {
        challengesDescription: "Опис дня",
        summaryDescription: "Підсумки дня"
      },
      challenges: {
        createAction: "Додайте завдання",
        editAction: "зберегти зміни",
        useSchemaGo: "Використовуйте схему ГО",
        useSchemaRun: "Використовуйте схему RUN",
        listDesc: "Усі зміни в списку оновлюються в режимі реального часу.",
        create: {
          title: "Додайте завдання"
        },
        edit: {
          title: "Редагувати завдання"
        },
        fields: {
          title: "Назва",
          description: "опис",
          type: "Тип",
          workshopId: "Пов'язане навчання",
          optional: "Додатково",
          optionalDesc: "Чи може користувач пропустити цей виклик? ",
          typeVariants: {
            PROSPECTING: "Розвідка",
            APPOINTMENT: "Точне призначення.",
            WEBINAR: "Вебінар",
            FOLLOW_UP: "Слідувати",
            MEETING: "Зустріч",
            WORKSHOP: "Навчання",
            INFO: "інформації",
            FB: "Активність у ФБ",
            INSTAGRAM: "Активність в Instagram",
            SOCIAL_MEDIA: "Діяльність в MS",
            SPORT_ACTIVITY: "Фізична активність"
          }
        }
      }
    }
  },
  notifications: {
    title: "Сповіщення",
    allNotifications: "Усі сповіщення",
    notificationTemplates: "Шаблони",
    noNotifications: "Немає повідомлень",
    noNotificationsDesc: "У вас немає непрочитаних сповіщень.",
    fields: {
      title: "Назва",
      description: "опис",
      name: "Ім'я (внутрішнє)"
    },
    editAction: "зберегти зміни",
    notificationUpdated: "Зміни впроваджено",
    unseenPushNotifications: "У вас є {0} нових сповіщень"
  },
  catalogs: {
    title: "Каталоги",
    allCatalogs: "Всі каталоги",
    createAction: "Додати каталог",
    editAction: "зберегти зміни",
    catalogCreated: "Каталог додано",
    catalogUpdated: "Зміни впроваджено",
    catalogRemoved: "Каталог видалено",
    create: {
      title: "Додати каталог"
    },
    edit: {
      title: "Редагувати каталог"
    },
    delete: {
      confirmTitle: "Ти впевнений?",
      confirmDesc: "Ви впевнені, що бажаєте видалити цей каталог? "
    },
    fields: {
      name: "Ім'я",
      description: "Зміст",
      startAt: "Дата початку",
      variant: "Тривалість"
    },
    variants: {
      twoWeek: "2 тижні",
      threeWeek: "3 тижні"
    }
  },
  menuLinks: {
    title: "Посилання на меню",
    allLinks: "Всі посилання",
    createAction: "Додайте посилання",
    editAction: "зберегти зміни",
    linkCreated: "Посилання додано",
    linkUpdated: "Зміни впроваджено",
    linkRemoved: "Посилання видалено",
    create: {
      title: "Додайте посилання"
    },
    edit: {
      title: "Редагувати посилання"
    },
    delete: {
      confirmTitle: "Ти впевнений?",
      confirmDesc: "Ви впевнені, що хочете видалити це посилання? "
    },
    variants: {
      internal: "Підсторінка",
      external: "зовнішній"
    },
    fields: {
      name: "Ім'я",
      url: "URL-адреса",
      variant: "Тип",
      page: "Підсторінка",
      icon: "значок",
      supportedRoles: "Допоміжні ролі",
      supportedLanguages: "Підтримувані мови"
    },
    errors: {
      nameExists: "Посилання з такою назвою вже існує"
    }
  },
  productCategory: {
    allProductCategories: "Всі категорії",
    productCategoryCreated: "Категорію додано",
    productCategoryUpdated: "Зміни впроваджено",
    productCategoryRemoved: "Категорію видалено",
    buyingChoices: "Варіанти покупки - Ви купуєте безпосередньо у продавця!",
    goToShop: "До магазину!",
    posts: "Схожі статті",
    faqs: "Запитання",
    editProductRefLink: "Редагувати посилання на посилання",
    lackOfRefUrls: "Заповніть свої посилання!",
    copyRefLink: "Копіювати посилання",
    refLinkCopied: "Посилання скопійовано",
    benefits: {
      one: {
        title: "Швидка доставка",
        description: "Доставка замовнику протягом 2 робочих днів!"
      },
      two: {
        title: "Кращі ціни",
        description: "Купуй у нас – плати менше!"
      },
      three: {
        title: "Гарантія задоволення",
        description: "Гарантія повернення 30 днів!"
      },
      four: {
        title: "Спеціалізовані дослідження",
        description: "У нас є незалежні тести, що підтверджують найвищу якість!"
      }
    },
    createAction: "Додайте категорію",
    editAction: "Редагувати категорію",
    delete: {
      confirmTitle: "Ти впевнений?",
      confirmDesc: "Ви впевнені, що хочете видалити цю категорію? "
    },
    fields: {
      name: "Ім'я",
      descriptionBefore: "Опис перед продуктами",
      descriptionAfter: "Опис по продуктах",
      image: "Графіка",
      imageBig: "Велика графіка"
    },
    create: {
      title: "Додайте категорію"
    },
    edit: {
      title: "Редагувати категорію"
    },
    tabs: {
      basicData: "Базовий",
      products: "Продукти",
      articles: "статті",
      faqs: "FAQ"
    }
  },
  products: {
    title: "Продукти",
    seeMore: "Інформація",
    ourProducts: "Наші продукти",
    editUrl: "Редагувати посилання на посилання",
    fromProducer: "Купуйте безпосередньо у виробника",
    updateLink: "Заповніть посилання!",
    allProducts: "Всі продукти",
    createAction: "Додайте товар",
    editAction: "зберегти зміни",
    productCreated: "Товар додано",
    productUpdated: "Зміни впроваджено",
    productRemoved: "Товар видалено",
    linkCopied: "Посилання скопійовано",
    copyLink: "Копіювати посилання",
    create: {
      title: "Додайте товар"
    },
    edit: {
      title: "Редагувати товар"
    },
    delete: {
      confirmTitle: "Ти впевнений?",
      confirmDesc: "Ви впевнені, що хочете видалити цей продукт? "
    },
    fields: {
      name: "Ім'я",
      description: "опис",
      price: "Ціна",
      image: "Графіка",
      refUrl: "Реферальне посилання на товар",
      priceOld: "Стара ціна"
    }
  },
  posts: {
    title: "Пости",
    allPosts: "Всі пости",
    createAction: "Додайте публікацію",
    editAction: "зберегти зміни",
    postCreated: "Публікацію додано",
    postUpdated: "Зміни впроваджено",
    postRemoved: "Пост видалено",
    create: {
      title: "Додайте публікацію"
    },
    edit: {
      title: "Редагувати пост"
    },
    delete: {
      confirmTitle: "Ти впевнений?",
      confirmDesc: "Ви впевнені, що хочете видалити цю публікацію? "
    },
    fields: {
      title: "Назва",
      content: "Зміст",
      image: "Графіка"
    }
  },
  certificates: {
    seeMore: "Більше інформації",
    title: "Сертифікати",
    allCertificates: "Всі сертифікати",
    createAction: "Додайте сертифікат",
    editAction: "зберегти зміни",
    certificateCreated: "Сертифікат додано",
    certificateUpdated: "Зміни впроваджено",
    certificateRemoved: "Сертифікат видалено",
    create: {
      title: "Додайте сертифікат"
    },
    edit: {
      title: "Редагувати сертифікат"
    },
    delete: {
      confirmTitle: "Ти впевнений?",
      confirmDesc: "Ви впевнені, що хочете видалити цей сертифікат? "
    },
    fields: {
      title: "Назва",
      description: "опис",
      image: "Графіка",
      url: "URL-адреса"
    }
  },
  faqs: {
    title: "поширені запитання",
    allFaqs: "Усі FAQ",
    createAction: "Додайте FAQ",
    editAction: "зберегти зміни",
    faqCreated: "FAQ додано",
    faqUpdated: "Зміни впроваджено",
    faqRemoved: "FAQ видалено",
    create: {
      title: "Додайте FAQ"
    },
    edit: {
      title: "Редагувати FAQ"
    },
    delete: {
      confirmTitle: "Ти впевнений?",
      confirmDesc: "Ви впевнені, що хочете видалити цей FAQ? "
    },
    fields: {
      question: "Питання",
      answer: "Відповідь"
    }
  },
  candidateQuizes: {
    title: "Вікторини для кандидатів",
    allQuizes: "Всі вікторини",
    createAction: "Додати вікторину",
    editAction: "зберегти зміни",
    quizCreated: "Додано вікторину",
    quizUpdated: "Зміни впроваджено",
    quizRemoved: "Тест видалено",
    create: {
      title: "Додати вікторину"
    },
    edit: {
      title: "Редагувати вікторину"
    },
    delete: {
      confirmTitle: "Ти впевнений?",
      confirmDesc: "Ви впевнені, що хочете видалити цей тест? "
    },
    fields: {
      name: "Ім'я",
      graduateMinScore: "Прохідний бал (%)",
      movieUrl: "URL до відео"
    }
  },
  candidateQuizQuestions: {
    title: "Питання",
    allQuestions: "Всі питання",
    createAction: "Додайте запитання",
    editAction: "зберегти зміни",
    questionCreated: "Питання додано",
    questionUpdated: "Зміни впроваджено",
    questionRemoved: "Питання видалено",
    create: {
      title: "Додайте запитання"
    },
    edit: {
      title: "Редагувати питання"
    },
    delete: {
      confirmTitle: "Ти впевнений?",
      confirmDesc: "Ви впевнені, що хочете видалити це запитання? "
    },
    fields: {
      question: "Питання"
    }
  },
  candidateQuizAnswers: {
    title: "Відповіді",
    allAnswers: "Всі відповіді",
    createAction: "Додайте відповідь",
    editAction: "зберегти зміни",
    answerCreated: "Відповідь додано",
    answerUpdated: "Зміни впроваджено",
    answerRemoved: "Відповідь видалено",
    create: {
      title: "Додайте відповідь"
    },
    edit: {
      title: "Редагувати відповідь"
    },
    delete: {
      confirmTitle: "Ти впевнений?",
      confirmDesc: "Ви впевнені, що хочете видалити цю відповідь? "
    },
    fields: {
      answer: "Відповідь",
      isCorrect: "Правильно",
      questionDescription: "Виберіть, лише якщо відповідь вважається правильною"
    }
  },
  boardItemImages: {
    createAction: "Додайте графіку",
    delete: {
      confirmTitle: "Ти впевнений?",
      confirmDesc: "Ви впевнені, що хочете видалити це фото? "
    },
    fields: {
      image: "Файл"
    }
  },
  boardItemVideos: {
    createAction: "Додайте відео",
    delete: {
      confirmTitle: "Ти впевнений?",
      confirmDesc: "Ви впевнені, що хочете видалити це відео? "
    }
  },
  boardItemFiles: {
    createAction: "додати файл",
    delete: {
      confirmTitle: "Ти впевнений?",
      confirmDesc: "Ви впевнені, що хочете видалити цей файл? "
    },
    fields: {
      file: "Файл",
      languageId: "Язик"
    }
  },
  workshopItemFiles: {
    createAction: "додати файл",
    delete: {
      confirmTitle: "Ти впевнений?",
      confirmDesc: "Ви впевнені, що хочете видалити цей файл? "
    },
    fields: {
      file: "Файл",
      languageId: "Язик"
    }
  },
  pages: {
    title: "Підсторінки",
    allPages: "Усі підсторінки",
    createAction: "Додайте підсторінку",
    editAction: "зберегти зміни",
    pageCreated: "Підсторінку додано",
    pageUpdated: "Зміни впроваджено",
    pageRemoved: "Підсторінку видалено",
    goToBoardContent: "Перейти до вмісту",
    create: {
      title: "Додайте підсторінку"
    },
    edit: {
      title: "Редагувати підсторінку"
    },
    delete: {
      confirmTitle: "Ти впевнений?",
      confirmDesc: "Ви впевнені, що хочете видалити цю підсторінку? "
    },
    fields: {
      name: "ID"
    },
    types: {
      board: "дошка",
      boardItem: "Великий піст"
    }
  },
  webinars: {
    title: "Вебінари",
    platforms: {
      cmNew: "Новий ClickMeeting",
      cmFrom: "Існуючий ClickMeeting",
      sm: "Існуючий Streamyard/YT"
    },
    downloadPoster: "Завантажити плакат",
    createFromCM: "Створити з CM",
    downloadCSV: "Завантажити CSV",
    noMoreTokens: "Жетони відсутні",
    noMoreTokensDesc: "На жаль, більше немає вільних місць для цього вебінару :(",
    businessWebinars: "Бізнес вебінари",
    clientWebinars: "Продуктивні вебінари",
    showFinished: "Показ завершено",
    finishedWebinars: "Проведені вебінари",
    subscribe: "Зареєструватися!",
    details: "Подробиці",
    timeLeft: "Залишилося...",
    live: "НАЖИВО",
    subscribedUsers: "Збережено",
    attendedUsers: "Учасники",
    noSubscribedUsers: "Немає зареєстрованих користувачів",
    noAttendedUsers: "Немає учасників",
    startAt: "Злітає",
    subscribed: "Збережено!",
    subscribedInfo: "Ви отримаєте від нас нагадування за годину до початку вебінару.",
    presenter: "Лідер",
    seeYouSoon: "Побачимось! ",
    goToWebinar: "Увійдіть",
    allWebinars: "Всі вебінари",
    createAction: "Додати вебінар",
    editAction: "зберегти зміни",
    webinarCreated: "Вебінар додано",
    webinarUpdated: "Зміни впроваджено",
    webinarRemoved: "Вебінар видалено",
    noDataTitle: "Тут нічого немає :(",
    noData: "Вебінари наразі не заплановані...",
    invited: {
      invite: "Запросити",
      invited: "Запрошено!",
      invitePartner: "Запросіть партнера",
      inviteGuest: "Запросіть гостя",
      invitedUsers: "Зареєстровані користувачі",
      invitedGuests: "Зареєстровані гості",
      userInvited: "Користувача запрошено",
      error: "Сталася помилка...",
      typeEmail: "Введіть адресу вашої електронної пошти",
      emailExists: "Користувач уже отримав запрошення",
      invitationInvalidOrExpired: "Запрошення недійсне або прострочене",
      firstName: "Ім'я",
      lastName: "Прізвище",
      email: "Електронна пошта",
      urlGenerated: "Створено унікальне запрошення!",
      copyUrl: "Копіювати посилання",
      linkCopied: "Посилання скопійовано"
    },
    create: {
      title: "Додати вебінар"
    },
    edit: {
      title: "Редагувати вебінар"
    },
    delete: {
      confirmTitle: "Ти впевнений?",
      confirmDesc: "Ви впевнені, що хочете видалити цей вебінар? "
    },
    variants: {
      BUSINESS: "Бізнес",
      CLIENT: "Клієнт",
      INVITED: "За запрошенням"
    },
    fields: {
      title: "Назва",
      description: "опис",
      presenter: "Лідер",
      startAt: "Дата початку",
      duration: "Тривалість",
      variant: "Тип",
      supportedLanguages: "Підтримувані мови",
      supportedRoles: "Допоміжні ролі",
      embedUrl: "URL-адреса вбудовування",
      cmId: "ID з CM",
      cmIdDescription: "Перейдіть до деталей події та подивіться на адресу в браузері. ID — це число після останнього слешу. (Наприклад, у посиланні `https://account-panel.clickmeeting.com/8315894` ID — це `8315894`)",
      isWorkshop: "Внутрішній вебінар",
      isWorkshopDescription: "Якщо ця опція обрана, вебінар буде відображатися на вкладці «Вебінари для ділових партнерів» і запрошувати сторонніх осіб не буде можливим.",
      poster: "Плакат",
      embedCode: "Посилання на трансляцію StreamYard",
      embedCodeDescription: `Оберіть "Поділитися" у своєму "Онлайн"-потоці, скопіюйте посилання та вставте його тут.`
    }
  },
  announcements: {
    title: "Оголошення",
    allAnnouncements: "Всі оголошення",
    createAction: "Додайте оголошення",
    editAction: "зберегти зміни",
    announcementCreated: "Оголошення додано",
    announcementUpdated: "Зміни впроваджено",
    announcementRemoved: "Оголошення видалено",
    create: {
      title: "Додайте оголошення"
    },
    edit: {
      title: "Відредагуйте своє оголошення"
    },
    delete: {
      confirmTitle: "Ти впевнений?"
    },
    fields: {
      title: "Назва",
      description: "Зміст",
      startAt: "Дата початку"
    }
  },
  boards: {
    title: "система",
    allBoards: "Всі дошки",
    createAction: "Додайте масив",
    editAction: "зберегти зміни",
    boardCreated: "Дошку додано",
    boardUpdated: "Зміни впроваджено",
    boardRemoved: "Дошку зняли",
    noData: "Тут ще нічого немає...",
    noDataTitle: "Немає даних",
    addSubdirectory: "Додайте підкаталог",
    addItem: "Додайте предмет",
    backToParent: "Повертатися",
    colors: {
      PRIMARY: "Базовий",
      PRIMARY_LIGHTER: "Базовий (легший)",
      ORANGE: "Помаранчевий",
      GREEN: "Зелений",
      RED: "Червоний"
    },
    create: {
      title: "Додайте масив"
    },
    edit: {
      title: "Відредагуйте дошку"
    },
    delete: {
      confirmTitle: "Ти впевнений?",
      confirmDesc: "Ви впевнені, що хочете видалити цю дошку? "
    },
    fields: {
      name: "Ім'я",
      description: "Зміст",
      icon: "значок",
      supportedLanguages: "Підтримувані мови",
      supportedRoles: "Допоміжні ролі",
      color: "колір"
    },
    icons: {
      HEART: "серце",
      LIKE: "Люблю",
      STATS: "Статистика",
      CONFIG: "спорядження",
      WORKSHOP: "Навчання",
      INFO: "інформації",
      FB: "Facebook",
      INSTAGRAM: "Instagram",
      SPORT: "спорт",
      MEDITATION: "Медитація",
      CHAT: "Розмова",
      TROPHY: "Трофей",
      STAR: "зірка",
      CHALLENGE: "Виклик",
      MAIL: "Опублікувати",
      CALENDAR: "Календар",
      VIDEO: "відео",
      BOOK: "книга",
      PAPER: "Аркуш",
      LINK: "Посилання",
      FILE: "Файл",
      TEXT: "текст",
      PLUS: "Плюс",
      MINUS: "Мінус",
      CHECK: "Перевірте",
      MUSIC: "музика",
      CROSS: "Хрестик",
      ARROW_LEFT: "Стрілка вліво",
      ARROW_RIGHT: "Стрілка вправо",
      ARROW_UP: "Стрілка вгору",
      ARROW_DOWN: "Стрілка вниз",
      LOCK_OPEN: "Відкритий замок",
      LOCK_CLOSED: "Закритий замок",
      PIN: "Булавка для малювання",
      PIN_TWO: "Pin 2",
      CHART_UP: "Побудуйте графік",
      CHART_DOWN: "Графік вниз",
      CHART_ALT: "Альтернативна діаграма",
      TOOLS: "Інструменти",
      BOMB: "Бомба",
      DYNAMITE: "Динаміт",
      DIAMOND: "діамант",
      CASH: "Готівка",
      CASH_TWO: "Готівка 2",
      GOLD: "золото",
      BUS: "Автобус",
      CAR: "автомобіль",
      TAXI: "Таксі",
      BOAT: "Łódź",
      PLANE: "Літак",
      BIKE: "велосипед",
      SMARTPHONE: "смартфон",
      LAPTOP: "Ноутбук",
      DESKTOP: "Робочий стіл",
      PHONE_OLD: "Старий телефон",
      KEYBOARD: "Клавіатура",
      CAMERA: "Камера",
      COMPASS: "компас",
      ALARM: "сигналізація",
      WOMAN: "жінка",
      MAN: "людина",
      HOME: "Будинок",
      BELL: "дзвоник",
      ACADEMY: "Академія",
      CERTIFICATE: "Сертифікат",
      LIST: "Список",
      MOVIE: "фільм",
      PROFILE: "Профіль",
      CROWN: "Корона",
      KEY: "ключ",
      PATHS: "Шляхи",
      USERS: "Користувачі",
      NOTIFICATION: "Сповіщення",
      EXIT: "Вихід",
      CART: "Кошик",
      FILES: "Файли",
      FIRE: "Полум'я"
    },
    items: {
      chooseType: "Виберіть варіант",
      createAction: "Додайте предмет",
      editAction: "зберегти зміни",
      itemCreated: "Товар додано",
      itemUpdated: "Зміни впроваджено",
      itemRemoved: "Елемент видалено",
      tabs: {
        basicData: "Базовий",
        videos: "відео",
        files: "Файли",
        images: "Графіка"
      },
      create: {
        title: "Додайте предмет"
      },
      edit: {
        title: "Редагувати елемент"
      },
      delete: {
        confirmTitle: "Ти впевнений?",
        confirmDesc: "Ви впевнені, що хочете видалити цей елемент? "
      },
      fields: {
        name: "Ім'я",
        link: "Посилання",
        file: "Файл",
        text: "Текстовий зміст",
        icon: "значок",
        supportedLanguages: "Підтримувані мови",
        supportedRoles: "Допоміжні ролі"
      },
      contentTypes: {
        link: "Посилання",
        file: "Файл",
        text: "Текстовий зміст"
      },
      copyLink: "Копіювати посилання",
      linkCopied: "Посилання скопійовано",
      downloadFile: "завантажити файл",
      copyText: "Скопіюйте текст",
      textCopied: "Текст скопійовано"
    }
  },
  movies: {
    title: "База даних фільмів",
    categories: {
      title: "Категорії",
      createAction: "Додайте категорію",
      editAction: "зберегти зміни",
      categoryCreated: "Категорію додано",
      categoryUpdated: "Зміни впроваджено",
      categoryRemoved: "Категорію видалено",
      create: {
        title: "Додайте категорію"
      },
      edit: {
        title: "Редагувати категорію"
      },
      delete: {
        confirmTitle: "Ти впевнений?",
        confirmDesc: "Ви впевнені, що хочете видалити цю категорію? "
      },
      fields: {
        name: "Ім'я",
        description: "опис"
      }
    },
    createAction: "Додайте відео",
    editAction: "зберегти зміни",
    movieCreated: "Відео додано",
    movieUpdated: "Зміни впроваджено",
    movieRemoved: "Відео видалено",
    noData: "Тут ще нічого немає...",
    noDataTitle: "Немає даних",
    addSubcategory: "Додайте підкатегорію",
    addMovie: "Додайте відео",
    backToParent: "Повертатися",
    create: {
      title: "Додайте відео"
    },
    edit: {
      title: "Редагувати відео"
    },
    delete: {
      confirmTitle: "Ти впевнений?",
      confirmDesc: "Ви впевнені, що хочете видалити це відео? "
    },
    fields: {
      name: "Ім'я",
      description: "опис",
      link: "Посилання"
    }
  },
  programs: {
    title: "Програми",
    allPrograms: "Всі програми",
    createAction: "Додайте програму",
    editAction: "зберегти зміни",
    programCreated: "Програма додана",
    programUpdated: "Зміни впроваджено",
    programRemoved: "Програму видалено",
    timeToStart: "Ваша програма незабаром розпочнеться!<br> Час починати <strong>{0}</strong> це...",
    create: {
      title: "Додайте програму",
      desc: "На цій панелі ви можете додати нову програму, але без конкретного плану уроку. "
    },
    edit: {
      title: "Редагувати програму"
    },
    delete: {
      confirmTitle: "Ти впевнений?",
      confirmDesc: "Ви впевнені, що хочете видалити цю програму? "
    },
    fields: {
      name: "Ім'я",
      description: "опис",
      contract: "Договір",
      poster: "Графіка",
      days: "Тривалість"
    },
    day: {
      title: "День {0}",
      editAction: "зберегти зміни",
      success: {
        edit: "Успіх!",
        editDesc: "Опис оновлено"
      },
      fields: {
        challengesDescription: "Опис дня",
        summaryDescription: "Підсумки дня"
      },
      challenges: {
        createAction: "Додайте завдання",
        editAction: "зберегти зміни",
        listDesc: "Усі зміни в списку оновлюються в режимі реального часу.",
        create: {
          title: "Додайте завдання"
        },
        edit: {
          title: "Редагувати завдання"
        },
        fields: {
          title: "Назва",
          description: "опис",
          type: "Тип",
          optional: "Додатково",
          optionalDesc: "Чи може користувач пропустити цей виклик? ",
          typeVariants: {
            PROSPECTING: "Розвідка",
            APPOINTMENT: "Точне призначення.",
            WEBINAR: "Вебінар",
            FOLLOW_UP: "Слідувати",
            MEETING: "Зустріч",
            WORKSHOP: "Навчання",
            INFO: "інформації",
            FB: "Активність у ФБ",
            INSTAGRAM: "Активність в Instagram",
            SOCIAL_MEDIA: "Діяльність в MS",
            SPORT_ACTIVITY: "Фізична активність"
          }
        }
      }
    }
  },
  join: {
    title: "Привіт!",
    createAction: "Приєднуйтесь",
    desc: "Виберіть варіант, який вам сподобався на інформаційній зустрічі.",
    chooseAccountType: "Виберіть тип облікового запису",
    firstTimeDesc: "Ваші перші тренування попереду! ",
    fields: {
      firstName: "Ім'я",
      lastName: "Прізвище",
      email: "Електронна пошта"
    }
  },
  chooseProgram: {
    title: "Виберіть програму",
    signContract: "Підпишіть договір",
    desc: "Увага! ",
    startAction: "Запит на активацію",
    signContractAction: "Підпишіть договір",
    requestAlreadySent: {
      title: "Почекай... :)",
      desc: "Ваш запит на активацію курсу чи програми вже надіслано. "
    },
    alreadyInProgress: {
      title: "Не зараз! ",
      desc: "Один курс або програма вже діє. "
    },
    programs: {
      title: "Програми",
      startProgram: "Запит на активацію програми",
      youHaveToSignContract: "Щоб подати заявку на активацію програми, необхідно спочатку підписати договір."
    },
    courses: {
      title: "Курси",
      startCourse: "Запит на активацію курсу",
      youHaveToSignContract: "Щоб подати заявку на активацію курсу, вам необхідно спочатку підписати договір."
    },
    success: {
      title: "Успіх!",
      desc: "Вашого опікуна повідомлено про ваш запит. "
    }
  },
  films: {
    title: "База даних фільмів"
  },
  languages: {
    pl: "польський",
    en: "англійська",
    uk: "українська",
    de: "німецький"
  },
  roles: {
    title: "Ролі",
    saveAction: "зберегти зміни",
    saved: "Зміни впроваджено",
    permissions: {
      adminPanelAccess: "Доступ до адміністративної панелі (admin)",
      adminUsersRead: "Читати користувачів (адміністратор)",
      adminUsersEdit: "Редагування користувачів (адміністратор)",
      adminUsersRemove: "Видалення користувачів (адміністратор)",
      adminUsersActivate: "Активація користувача (адміністратор)",
      adminWorkshopsRead: "Навчання читанню (адмін)",
      adminWorkshopsEdit: "Навчання редагування (адміністратор)",
      adminWorkshopsRemove: "Видалення навчання (адмін)",
      adminWorkshopsCreate: "Створення навчання (адмін)",
      adminMenuLinksRead: "Читання посилань на меню (адміністратор)",
      adminMenuLinksEdit: "Редагування посилань меню (адміністратор)",
      adminMenuLinksRemove: "Видалення посилань на меню (адміністратор)",
      adminMenuLinksCreate: "Створення посилань на меню (адміністратор)",
      adminUsefulLinksRead: "Читайте корисні посилання (адмін)",
      adminUsefulLinksEdit: "Редагування корисних посилань (адмін)",
      adminUsefulLinksRemove: "Видалення корисних посилань (адмін)",
      adminUsefulLinksCreate: "Створення корисних посилань (адмін)",
      adminPagesRead: "Читання підсторінок (адмін)",
      adminPagesEdit: "Редагування підсторінок (адмін)",
      adminPagesRemove: "Видалення підсторінок (адмін)",
      adminPagesCreate: "Створення підсторінок (адмін)",
      adminWebinarsRead: "Читання вебінарів (адміністратор)",
      adminWebinarsEdit: "Редагування вебінарів (адмін)",
      adminWebinarsRemove: "Видалення вебінарів (адмін)",
      adminWebinarsCreate: "Створення вебінарів (адмін)",
      adminRolesRead: "Читати ролі (адміністратор)",
      adminRolesEdit: "Редагування ролей (адміністратор)",
      adminAnnouncementsRead: "Читання реклами (адмін)",
      adminAnnouncementsEdit: "Редагування оголошень (адмін)",
      adminAnnouncementsRemove: "Видалення оголошень (адмін)",
      adminAnnouncementsCreate: "Створення оголошень (адмін)",
      adminNotificationsRead: "Читання сповіщень (адміністратор)",
      adminNotificationsEdit: "Редагування сповіщень (адміністратор)",
      adminCustomNotificationsRead: "Читання спеціальних сповіщень (адміністратор)",
      adminCustomNotificationsEdit: "Редагування спеціальних сповіщень (адміністратор)",
      adminCustomNotificationsRemove: "Видалення спеціальних сповіщень (адміністратор)",
      adminCustomNotificationsCreate: "Створення спеціальних сповіщень (адміністратор)",
      adminProtegesPromoteToLEADER: "Підвищення партнера до керівника (адміністратора)",
      adminProtegesPromoteToADMIN: "Підвищення лідера до адміністратора (admin)",
      adminProtegesDemoteToLEADER: "Пониження адміна до керівника (адміністратора)",
      adminProtegesDemoteToPARTNER: "Пониження керівника до партнера (адміністратора)",
      adminProtegesChangeMentor: "Зміна опікуна (адміністратора) партнера",
      adminProductsRead: "Читати продукти (адміністратор)",
      adminProductsEdit: "Версія продукту (адміністратор)",
      adminProductsRemove: "Видалення продуктів (адміністратор)",
      adminProductsCreate: "Створення продукту (адміністратор)",
      adminProductsCategoryRead: "Читання категорій продуктів (адміністратор)",
      adminProductsCategoryEdit: "Редагування категорій товарів (адміністратор)",
      adminProductsCategoryRemove: "Видалення категорії товару (адміністратор)",
      adminProductsCategoryCreate: "Створення категорій товарів (адмін)",
      customWorkshopsRead: "Читайте власні навчальні курси",
      customWorkshopsEdit: "Відредагуйте власне навчання",
      customWorkshopsRemove: "Видалення власних навчальних курсів",
      customWorkshopsCreate: "Створення власного тренінгу",
      protegesInvite: "Запрошення партнерів",
      protegesRead: "Партнери по читанню",
      protegesRemove: "Видалення партнерів",
      workshopsRead: "Тренування читання",
      workshopsCreate: "Створення навчання",
      webinarsAccess: "Доступ до вебінарів",
      productsAccess: "Доступ до продуктів",
      adminPostsRead: "Читання дописів (адмін)",
      adminPostsEdit: "Редагування дописів (адмін)",
      adminPostsRemove: "Видалення дописів (адмін)",
      adminPostsCreate: "Створення дописів (адмін)",
      adminCertificatesRead: "Сертифікати читання (адміністратор)",
      adminCertificatesEdit: "Редагування сертифікатів (адміністратор)",
      adminCertificatesRemove: "Видалення сертифікатів (адміністратор)",
      adminCertificatesCreate: "Створення сертифікатів (адмін)",
      adminFaqsRead: "Читати FAQ (адміністратор)",
      adminFaqsEdit: "Редагувати FAQ (адміністратор)",
      adminFaqsRemove: "Видалення FAQ (адмін)",
      adminFaqsCreate: "Створення FAQ (адмін)",
      adminCandidateQuizRead: "Читати тести кандидатів (адмін)",
      adminCandidateQuizEdit: "Редагування тестів кандидатів (адміністратор)",
      adminCandidateQuizRemove: "Видалення кандидатських тестів (адміністратор)",
      adminCandidateQuizCreate: "Створення тестів кандидатів (адміністратор)",
      adminSystemPersonalizationRead: "Персоналізація системи читання (адміністратор)",
      adminSystemPersonalizationEdit: "Редагування персоналізації системи (адміністратор)",
      protegesChangeMentor: "Зміна опікуна партнера",
      chatAccess: "Доступ до чату",
    }
  },
  courseChallenges: {
    title: "День {0}",
    challenges: {
      title: "Сьогоднішні виклики"
    },
    summary: {
      success: {
        title: "Щиро вітаю!"
      },
      failure: {
        title: "на жаль...",
        description: "<p>Нам шкода, що ви не виконуєте те, про що ми домовилися.</p><p>Пам’ятайте, що ви вирішуєте, яким буде ваше майбутнє. </p><p>Однак все залежить від вашої прихильності - без неї ми не зможемо вам допомогти.</p><p>Але... тримай голову! <strong>Завтра теж день</strong> :)</p><p>Нехай це буде твій новий початок!</p>"
      }
    }
  },
  programChallenges: {
    challenges: {
      title: "Сьогоднішні виклики"
    },
    summary: {
      success: {
        title: "Щиро вітаю!",
        progress: "<p><strong>Сьогодні ви виконали {0}% своїх завдань</strong></p>"
      },
      failure: {
        title: "на жаль...",
        description: "<p>Нам шкода, що ви не виконуєте те, про що ми домовилися.</p><p>Пам’ятайте, що ви вирішуєте, яким буде ваше майбутнє. </p><p>Однак все залежить від вашої прихильності - без неї ми не зможемо вам допомогти.</p><p>Але... тримай голову! <strong>Завтра теж день</strong> :)</p><p>Нехай це буде твій новий початок!</p>",
        progress: "<p><strong>Ваш сьогоднішній результат становить лише {0}% :(</strong></p>"
      }
    }
  },
  usefulLinks: {
    title: "Корисні посилання"
  },
  currentProgram: {
    title: "Актуальна програма"
  },
  currentCourse: {
    title: "Поточний курс"
  },
  offline: {
    title: "Немає підключення до Інтернету",
    description: "Перевірте підключення та повторіть спробу."
  },
  workInProgress: {
    title: "Під модернізацію",
    description: "Вибачте за незручності. "
  },
  personalizedContent: {
    title: "Персоналізація системного контенту",
    contentUpdated: "Вміст оновлено",
    fields: {
      name: "Ім'я (ідентифікатор)",
      title: "Назва",
      content: "Зміст"
    },
    editAction: "Зберегти зміни",
    edit: {
      title: "Редагувати вміст"
    }
  },
  candidateQuiz: {
    start: "старт",
    goToQuiz: "Перейти до вікторини",
    checkAnswers: "Перевірте відповіді",
    requiredMinScore: "Прохідний поріг є ",
    goFurther: "Йти далі",
    refresh: "Спробуйте знову"
  },
  newsletter: {
    fields: {
      firstName: "Ім'я",
      lastName: "Прізвище",
      email: "Електронна пошта"
    },
    error: "Заповніть усі поля!",
    errorDescription: "Всі поля обов'язкові для заповнення...",
    subscribed: "Підписався на розсилку!",
    subscribedDescription: "Дякую :)",
    goToApp: "Перейдіть до програми"
  }
}