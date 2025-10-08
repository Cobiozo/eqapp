const globalConfig = {
  mails: {
    footer: `
    <p></p>
    <p>Greetings,<br>
    EQApp Team</p>
    `,
  }
}

export default {
  setup: {
    title: "Welcome in EQApp!",
    chooseLanguage: "Choose your language",
    thisSeetingCanBeLaterChanged: "These settings can be change later.",
    signUpForNewsletter: "Sign up for newsletter",
    skip: "Skip",
    subscribe: "Sign up",
    langNotSupported: "Selected language is not supported.",
  },
  whatAmIDoingHere: {
    title: "Nice to meet you :)",
    content: "It seems you've visited us without any referral. Tell us, who told you about us? How did you get here? :)",
    skip: "Go to app",
    fields: {
      content: "Content",
      name: "Name",
      email: "E-mail",
      phone: "Phone number",
    },
    joinUs: {
      title: "Contact Us",
      fields: {
      name: "Name",
      email: "Email",
      phone: "Phone Number",
      content: "Message",
      },
      error: "Fill in the required fields",
      errorDescription: "All fields are mandatory.",
      messageSent: "Message Sent!",
      messageSentDescription: "Thanks for reaching out! We will definitely get back to you :)",
    },
    messageSent: "The message has been sent!",
    messageSentDescription: "Thank you for sharing the info! Now you can go to the app :)",
    goToApp: "Go to app",
    error: "Fill required fields",
    errorDescription: "Please, fill the required fields to continue.",
  },
  clients: {
    links: {
      home: "Home",
      services: "Services",
      webinars: "Webinars",
      products: "Products",
      contact: "Contact",
      articles: "Articles",
      shop: "Shop",
      aboutUs: "About us",
      cookies: "Cookies",
      partnerZone: "Partner zone",
    },
    splash: {
      healthProtect: "We'll take care of your health!",
      goToShop: "Meet our products",
    },
    products: {
      title: "Our products",
      ourProducts: "Our products",
      fromProducer: "From the producer",
      deliveryInTwoDays: "Delivery in two days",
      buyNow: "Buy now",
      theChoiceIsYours: "The choice is yours!",
      shop: "SHOP!"
    },
    why: {
      title: "Why Eqology?",
      learnMore: "Welcome!",
      slogan: "Certificates/Research/Articles"
    },
    contact: {
      title: "Contact us",
      sendUsEmail: "Send us an e-mail",
    },
    whatAmIDoingHere: {
      title: "Nice to meet you!",
      content: "It seems you've visited us without any referral. Tell us, who told you about us? How did you get here? :)",
    },
    posts: {
      readMore: "Read more!",
      readMe: "Read me",
      title: "Articles",
      description: `The database with articles is still being updated.<br>
      Soon new articles and videos with specialists will appear.`,
    },
    faqs: {
      title: "Freqently asked questions",
    },
    whyUs: {
      slogan: "The highest world quality is the MOST IMPORTANT for us!",
      certificates: "Certificates",
      products: "Products",
      faq: "FAQ",
    },
    certificates: {
      title: "Trust the experts",
      description: "Our products have been repeatedly checked, tested and awarded. Our quality is unquestionable.",
      slogan: "Choose wisely - <strong>choose Eqology</strong>.",
      seeMore: "See more",
    },
    meetOurProducts: {
      title: "Meet our products",
      goToShop: "Go to shop",
    },
    webinars: {
      businessWebinars: "Business webinars",
      clientWebinars: "Client webinars",
      register: "Register",
      noData: "No webinars found... Visit us soon!",
      subscribe: "Sign up",
      success: {
        title: "Success!",
        description: "Success! Now you just need to go to your mailbox, confirm your e-mail and... we're waiting for you at the webinar! :)",
      },
      youHaveToVerify: {
        title: "You have to verify your e-mail",
        description: "Before you can sign up for the webinar, you need to verify your e-mail. Check your mailbox and confirm your e-mail address.",
      },
      invitationExpired:{
        title: "Oops...",
        description: "Invitation has expired or webinar has been canceled.",
      },
    }
  },
  common: {
    share: "Share",
    goTop: "Go to top",
    languages: {
      intl: "All languages",
      pl: "Polish",
      en: "English",
      uk: "Ukrainian",
      lt: "Lithuanian",
      de: "German",
    },
    weekDays: {
      1: "Monday",
      2: "Tuesday",
      3: "Wednesday",
      4: "Thursday",
      5: "Friday",
      6: "Saturday",
      7: "Sunday",
    },
    weekDaysShort: {
      1: "Mon",
      2: "Tue",
      3: "Wed",
      4: "Thu",
      5: "Fri",
      6: "Sat",
      7: "Sun",
    },
    months: {
      1: "January",
      2: "February",
      3: "March",
      4: "April",
      5: "May",
      6: "June",
      7: "July",
      8: "August",
      9: "September",
      10: "October",
      11: "November",
      12: "December",
    },
    submit: "Submit",
    save: "Save",
    goBack: "Go back",
    file: "File",
    language: "Language",
    none: "None",
    return: "Return",
    error: "Error",
    changeSpeed: "Change speed",
    goBackToHome: "Go back to home",
    noData: "No data",
    noDataDesc: "No data to display",
    noDataFound: "No results",
    noDataFoundDesc: "No results matched your search query.",
    notFound: "Not found",
    unexpectedError: "Unexpected error",
    unexpectedErrorDescription: "An unexpected error occurred. Please try again later.",
    unauthorized: "Unauthorized",
    unauthorizedDescription: "You are not authorized to view this page.",
    somethingWentWrong: "Something went wrong",
    somethingWentWrongDescription: "An unexpected error occurred. Please try again later.",
    noInternet: "No internet connection",
    noInternetDescription: "Please check your internet connection and try again.",
    badRequest: "Bad request",
    badRequestDescription: "The request contains invalid data.",
    chosen: "Chosen",
    confirm: "Confirm",
    cancel: "Cancel",
    edit: "Edit",
    close: "Close",
    create: "Create",
    remove: "Remove",
    search: "Search...",
    searchResults: "Search results",
    select: "Select",
    addAttachment: "Add attachment",
    translations: "Translations",
    categories: "Categories",
    category: "Category",
    currentBrowsing: "Currently browsing",
    otherTranslations: "Other translations",
    addTranslation: "Add translation",
    relatedFiles: "Related files",
    relatedImages: "Related images",
    relatedVideos: "Related videos",
    schedule: "Schedule",
    challenges: "Challenges",
    days: "days",
    hours: "hours",
    minutes: "minutes",
    seconds: "seconds",
    ready: "Ready to go!",
    motivate: "Get motivated :)",
    watch: "Watch",
    validation: {
      dateInPast: "Date cannot be in the past",
      errorsExist: "Errors occurred...",
      required: "This field is required",
      minLength: "Min. character count is {0}",
      maxLength: "Max. character count is {0}",
      minArrayLength: "Minimum of {0} items",
      maxArrayLength: "Maximum of {0} items",
      min: "Minimum value is {0}",
      max: "Maximum value is {0}",
      isEmail: "Invalid email address",
      isNumber: "This must be a number",
      passwordRepeat: "Passwords do not match",
      pattern: "Invalid format",
      invalidType: "Invalid type",
      imageType: "Supported types are {0}",
      imagesType: "At least one image has an invalid format (supported types: {0}",
      filesSize: "At least one file has an invalid size (max {0} MB)",
      fileSize: "Maximum file size is {0} MB",
      imageSize: "Image has invalid dimensions or proportions",
      select: "Invalid option",
      date: "Invalid date",
      dataList: "Selected values are not allowed",
      dateEndTooEarly: "End date must be after start date",
      wysiwygNoFiles: "No file information provided for WYSIWYG field",
      wysiwygImagesAmount:
        "Number of uploaded images does not match the expected amount (WYSIWYG field)",
      notFound: "The requested item could not be found",
      fileUploadError:
        "Error uploading file, possibly the file is too large. Maximum file size is {0} MB",
      fileType: "Invalid file format (supported formats: {0})",
      multiLangRequired: "Base translation is missing",
      emailRepeat: "Emails do not match",
    },
    roles: {
      CLIENT: "Client",
      ADMIN: "Admin",
      LEADER: "Leader",
      PARTNER: "Partner",
      CANDIDATE_PARTNER: "Candidate for partner",
    },
  },
  dashboard: {
    welcome: "Welcome to the training platform!",
    welcomeMessage: `
      <p>We are thrilled to embark on this journey together. All the necessary training materials are now in one place, making it easier for all of us to track progress and achieve our goals. We hope this will be a unique educational experience for all of us!</p>
  
      <p>Best regards and Good luck</p>
      <p>Estera and Kamil Hanasz</p>
    `
  },
  mails: {
    unverifiedAccountRemoved: {
      subject: "Your account has been deleted",
      text: `
        <p>Hi,</p>
        <p>Since your email address was not verified within 12 hours of registration, your account has been deleted :(</p>
        <p>Please register again!</p>
        ${globalConfig.mails.footer}
      `
    },
    verificationReminder: {
      subject: "Welcome to the app :)",
      text: `
        <p>Hi,</p>
        <p>Just a reminder that your account is already active.</p>
        <p>So if you haven't logged in yet, we invite you to use the app :)</p>
        <p>Feel free to invite your partners already.</p>
        <p>See you soon!</p>
        ${globalConfig.mails.footer}
      `
    },
    unexpectedVisitMail: {
      subject: "Unexpected visit",
      text: `
        <p>Hi,</p>
        <p>It looks like someone has stumbled upon our website without being referred by any of our partners. We asked them how they found us. Their answer is:</p>
        <p><em>{0}</em></p>
        <p>It's <strong>{1}</strong></p>
        ${globalConfig.mails.footer}
      `
    },
    webinarConfirmation: {
      subject: "Webinar Confirmed! :)",
      text: `
        <p>Hello,</p>
        <p>Your spot in the webinar has been confirmed! :)</p>
        <p>We're expecting you at <strong>{0}</strong> via this <strong><a target="_blank" href="{1}">link</a></strong></p>
        ${globalConfig.mails.footer}
      `
    },
    webinarStartsInTenMinutes: {
      subject: "We're starting soon!",
      text: `
        <p>The webinar <strong>{0}</strong> will start in 10 minutes!</p>
        <p>Click <strong><a href="{1}">here</a></strong> to join now.</p>
        <p>See you there! :)</p>
        ${globalConfig.mails.footer}
      `
    },
    webinarStartsInOneHour: {
      subject: "Countdown...",
      text: `
        <p>The webinar <strong>{0}</strong> will start in one hour!</p>
        <p>Below is your personalized link to the event</p>
        <p><strong><a href="{1}">Click here</a></strong></p>
        <p>See you there! :)</p>
        ${globalConfig.mails.footer}
      `
    },
    webinarStartsNow: {
      subject: "Time's up! :)",
      text: `
        <p>Hello,</p>
        <p>Webinar <strong>{0}</strong> is starting now! :)</p>
        <p>Join us via this <strong><a target="_blank" href="{1}">link</a></strong></p>
        <p>See you there!</p>
        ${globalConfig.mails.footer}
      `
    },
    confirmEmail: {
      subject: "Confirm your email",
      text: `
        <p>Hello,</p>
        <p>Thank you for registering! To confirm your email address, please click the link below:</p>
        <p><strong><a href="{0}">Click here</a></strong></p>
        ${globalConfig.mails.footer}
      `
    },
    contactMail: {
      subject: "New message regarding cooperation",
      text: `
        <p>Hi there,</p>
        <p>It looks like someone wants to get in touch with you :)</p>
        <strong>{0}</strong></p>
        <p>Message:</p>
        <p><em>{1}</em></p>
        ${globalConfig.mails.footer}
      `
    },
    confirmWorkshopEmail: {
      subject: "Confirm Email Address",
      text: `
        <p>Hello,</p>
        <p>Thank you for your interest in our webinars! To verify your email address and continue, please click on the link below.</p>
        <p><strong><a href="{0}">Click here</a></strong></p>
        ${globalConfig.mails.footer}
      `
    },
    waitForActivationEmail: {
      subject: "Wait for Activation",
      text: `
        <p>Hello,</p>
        <p>Your account has been successfully created and your email address has been verified.</p>
        <p>Now, you just need to wait for activation by the administrator.</p>
        <p>Don't worry, it won't take long! ;) Thank you for your patience!</p>
        ${globalConfig.mails.footer}
      `
    },
    confirmWebinarEmail: {
      subject: "Confirm your email",
      text: `
        <p>Hello,</p>
        <p>Thank you for your interest in our webinar! To verify your email address and confirm your attendance, please click the link below:</p>
        <p><strong><a href="{0}">Click here</a></strong></p>
        ${globalConfig.mails.footer}
      `
    },
    webinarInvitation: {
      subject: 'Invitation to "{0}"',
      text: `
        <p>Hi,</p>
        <p>We have a personalized invitation for you to join this webinar :)</p>
        <p><a target="_blank" href="{0}">Accept</a></p>
        ${globalConfig.mails.footer}
      `
    },
    userPromoted: {
      subject: "Promotion! :)",
      text: `
      <p>Hi,</p>
      <p>Your mentor has decided to promote you!</p>
      <p>Your new position is <strong>{0}</strong>. Congratulations!</p>
      ${globalConfig.mails.footer}
      `
    },
    passwordReset: {
      subject: "Your password has been reset",
      text: `
      <p>Hi,</p>
      <p>As per your request, we have reset your password.</p>
      <p style="border: 0.3em solid #000; padding: 1em; width: fit-content;">Your new password is: <b>{0}</b></p>
      <p>For security reasons, it is recommended to change the password after logging in.</p>
      <p></p>
      <p>If you did not request a password change, please ignore this email.</p>
      ${globalConfig.mails.footer}
      `
    },
    userActivated: {
      subject: "Your account has been activated",
      text: `
      <p>Hi,</p>
      <p>Your account has been activated! :) You can now log in and fully enjoy all the benefits of our application.</p>
      <p>Go to the application by clicking the link below:</p>
      <p><a href="{0}">Log in</a></p>
      ${globalConfig.mails.footer}
      `
    },
    userInvited: {
      subject: "Invitation to register",
      text: `
      <p>Hello,</p>
      <p>We are happy to have you join us! :) Click the link below to register in our system:</p>
      <p><a href="{0}">Register</a></p>
      `
    },
    userRemoved: {
      subject: "Your account has been removed",
      text: `
      <p>Hi,</p>
      <p>Unfortunately, your account verification was unsuccessful, and your account has been removed.</p>
      <p>If you believe this is a mistake, please contact us.</p>
      ${globalConfig.mails.footer}
      `
    },
    contactJoinedMentor: {
      subject: "You have a new partner!",
      text: `
      <p>Hi,</p>
      <p>Congratulations! You have a new partner! :)</p>
      <p>Their name is {0}. You can track their progress in the administrative panel ("partners" tab) at any time.</p>
      ${globalConfig.mails.footer}
      `
    },
  },
  nav: {
    home: "Home",
    webinars: "Webinars",
    products: "Products",
    shop: "Shop",
    contact: "Contact",
    partners: "Partners",
    clients: "Clients",
    notifications: "Notifications",
    films: "Films",
    startup: "Startup 90 days",
    workshops: "Workshops",
    workshopsClient: "Client area",
    workshopsPartner: "Partner area",
    myWorkshopsDescription: "The workshops included here will only be accessible to your partners.",
    usefulLinks: "Useful links",
    logout: "Logout",
    login: "Login",
    register: "Register",
    profile: "Edit profile",
    chooseProgram: "Choose program",
    boards: "System",
    admin: "Admin panel",
    partnerZone: "Partner zone",
    slogans: {
      spirit: "spirit",
      passion: "passion",
      togetherness: "togetherness"
    },
    adminSubmenu: {
      webinars: "Webinars",
      users: "Users",
      roles: "Roles",
      workshops: "Workshops",
      proteges: "Proteges",
      notifications: "Notifications",
      announcements: "Announcements",
      pages: "Pages",
      menuLinks: "Menu links",
      products: "Products",
      posts: "Posts",
      certificates: "Certificates",
      faqs: "FAQ",
      systemContent: "System content",
      candidateQuizes: "Candidate quizzes",
    }
  },
  verifyEmail: {
    title: "Verify email",
    successTitle: "Success!",
    successDescription:
      "Your email address has been confirmed! You now need to wait for your account to be approved by an administrator. We will get back to you soon! :)",
  },
  register: {
    title: "Register",
    createAction: "Register",
    chooseMentor: "Choose a mentor",
    verifyCode: "That's almost everything...",
    codeIsWrong: "The code is incorrect",
    verifyMail: "That's almost everything! We just need to verify your email address. Check your inbox and click on the link we sent you.",
    contact: {
      desc: "We already have your email, first name, and last name. So, not many questions left :)",
      chooseRole: "Choose the option that best suits your development path.",
    },
    accountTypes: {
      client: "Client",
      partner: "Partner",
    },
    fields: {
      email: "Email",
      emailRepeat: "Repeat email",
      password: "Password",
      passwordRepeat: "Repeat password",
      eqId: "EQOLOGY ID",
      firstName: "First name",
      lastName: "Last name",
      avatar: "Avatar",
      phone: "Phone number",
      termsOfUse:
        "I agree to the processing of my personal data for the correct verification of membership (Journal of Laws of 2017, item 1219) and accept the <a class=\"link\" href=\"{0}\" target=\"_blank\">terms and conditions</a> and agree to be subscribed to the newsletter.",
      saveToNewsletter: "Subscribe me to the newsletter",
      saveToNewsletterDescription:
        "I want to receive information about news, promotions, and from Eqology. Don't worry, we don't spam! ;)",
      emailConfirmation: "I have made sure that the email is correct. This is very important, as after registration you must click on the activation link that we will send you."
    },
    success: {
      create: "Success!",
      createDesc: "Registration was successful! Please check your email to confirm.",
    },
    errors: {
      emailExists: "A user with the given email address already exists",
      eqIdExists: "A user with the given EQOLOGY number already exists",
      client: {
        emailExists: "The given email address is already in use by another client",
      },
    },
  },
  registerPartner: {
    title: "Register",
    createAction: "Register",
    fields: {
      email: "Email",
      password: "Password",
      passwordRepeat: "<PASSWORD>",
      oriflameId: "Oriflame ID",
      firstName: "First name",
      lastName: "Last name",
      avatar: "Avatar",
      termsOfUse:
        "I agree to the processing of my personal data for the correct verification of membership (Journal of Laws of 2017, item 1219) and accept the <a class=\"link\" href=\"{0}\" target=\"_blank\">terms and conditions</a>.",
    },
    success: {
      create: "Success!",
      createDesc: "Registration was successful! You can log in now :)",
    },
    errors: {
      emailExists: "A user with the given email address already exists",
      oriflameIdExists: "A user with the given Oriflame ID already exists",
    },
  },
  profile: {
    title: "Edit profile",
    info: "Only fill in the password fields if you want to change it.",
    editAction: "Save changes",
    fields: {
      email: "Email",
      password: "Password",
      passwordRepeat: "Repeat password",
      oriflameId: "Oriflame ID",
      firstName: "First name",
      lastName: "Last name",
      avatar: "Avatar",
      eqShopUrl: "Eqology shop referral link",
    },
    success: {
      edit: "Success!",
      editDesc: "Changes have been applied",
    },
  },
  login: {
    title: "Login",
    actionLogin: "Log in",
    actionRegister: "Register",
    actionReset: "Reset password",
    dontHaveAccount: "Don't have an account?",
    forgotPassword: "Forgot password?",
    fields: {
      email: "Email",
      password: "Password",
    },
    success: {
      create: "Success!",
      createDesc: "Login successful!",
    },
    errors: {
      invalidCredentials: "Invalid email address or password",
      inactiveUser: "Your account has not been activated yet",
    },
  },
  forgotPassword: {
    title: "Forgot your password?",
    action: "Reset password",
    fields: {
      email: "Email",
      eqId: "EQOLOGY ID",
    },
    errors: {
      invalidData: "Invalid data",
    },
    success: {
      title: "Success!",
      description: "A link with a new password has been sent to the provided email address.",
    },
  },
  cropper: {
    title: "Crop",
    confirm: "Confirm",
    cancel: "Cancel",
  },
  termsOfUse: {
    title: "Terms of use",
  },
  footer: {
    links: {
      admin: "Admin panel",
    },
  },
  notFound: {
    title: "Oops... Not found!",
    description: "We couldn't find the requested page. Please check the URL and try again. If you think this is an error, contact the site administrator.",
  },
  unauthorized: {
    title: "Oops... You don't have permission!",
    description: "You don't have permission to view this page. If you think this is an error, contact the site administrator.",
  },
  admin: {
    title: "Admin panel",
    links: {
      users: "Users",
      workshops: "Workshops",
      courses: "Courses",
      startup: "Startup 90 days",
    },
  },
  users: {
    title: "Users",
    invitation: {
      confirm: {
        title: "Confirm",
        desc: "Are you sure you want to send the registration invitation?",
      },
    },
    invite: "Invite",
    candidates: "Candidates",
    candidatesTitle: "Partner Candidates",
    invitationSent: "Invitation sent",
    waitingForActivation: "Waiting for activation",
    activateUser: "Activate",
    deleteUser: "Delete",
    userUpdated: "User updated",
    allUsers: "All users",
    editAction: "Save changes",
    delete: {
      confirmTitle: "Are you sure?",
      confirmDesc: "Are you sure you want to delete this user? This action is irreversible.",
    },
    edit: {
      title: "Edit user",
    },
    roles: {
      client: "Client",
      partner: "Partner",
      leader: "Leader",
      admin: "Admin",
      candidate_partner: "Candidate for partner",
    },
    fields: {
      firstName: "First name",
      lastName: "Last name",
      role: "Role",
      mentor: "Mentor",
    },
    success: {
      edit: "Success!",
      editDesc: "Changes have been applied",
    },
  },
  workshops: {
    icons: {
      HEART: "Heart",
      LIKE: "Like",
      STATS: "Statistics",
      CONFIG: "Gear",
      WORKSHOP: "Workshop",
      INFO: "Info",
      FB: "Facebook",
      INSTAGRAM: "Instagram",
      SPORT: "Sport",
      MEDITATION: "Meditation",
      CHAT: "Chat",
      TROPHY: "Trophy",
      STAR: "Star",
      CHALLENGE: "Challenge",
      MAIL: "Mail",
      CALENDAR: "Calendar",
      VIDEO: "Video",
      BOOK: "Book",
      PAPER: "Paper",
      LINK: "Link",
      FILE: "File",
      TEXT: "Text",
      PLUS: "Plus",
      MINUS: "Minus",
      CHECK: "Check",
      MUSIC: "Music",
      CROSS: "Cross",
      ARROW_LEFT: "Arrow left",
      ARROW_RIGHT: "Arrow right",
      ARROW_UP: "Arrow up",
      ARROW_DOWN: "Arrow down",
      LOCK_OPEN: "Open lock",
      LOCK_CLOSED: "Closed lock",
      PIN: "Pin",
      PIN_TWO: "Pin two",
      CHART_UP: "Chart up",
      CHART_DOWN: "Chart down",
      CHART_ALT: "Chart alt",
      TOOLS: "Tools",
      BOMB: "Bomb",
      DYNAMITE: "Dynamite",
      DIAMOND: "Diamond",
      CASH: "Cash",
      CASH_TWO: "Cash two",
      GOLD: "Gold",
      BUS: "Bus",
      CAR: "Car",
      TAXI: "Taxi",
      BOAT: "Boat",
      PLANE: "Plane",
      BIKE: "Bike",
      SMARTPHONE: "Smartphone",
      LAPTOP: "Laptop",
      DESKTOP: "Desktop",
      PHONE_OLD: "Old phone",
      KEYBOARD: "Keyboard",
      CAMERA: "Camera",
      COMPASS: "Compass",
      ALARM: "Alarm",
      WOMAN: "Woman",
      MAN: "Man",
      HOME: "Home",
      BELL: "Bell",
      ACADEMY: "Academy",
      CERTIFICATE: "Certificate",
      LIST: "List",
      MOVIE: "Movie",
      PROFILE: "Profile",
      CROWN: "Crown",
      KEY: "Key",
      PATHS: "Paths",
      USERS: "Users",
      NOTIFICATION: "Notification",
      EXIT: "Exit",
      CART: "Cart",
      FILES: "Files",
      FIRE: "Fire"
    },
    title: "Workshops",
    firstStepsTitle: "First steps",
    titleClient: "Client workshops",
    titlePartner: "Partner workshops",
    deleteWorkshop: "Delete",
    allWorkshops: "All workshops",
    editAction: "Save changes",
    createAction: "Add workshop",
    startAction: "Start",
    step: "Step {0}",
    noWorkshopsInStep: "No workshops in this step",
    workshopCreated: "Workshop added",
    workshopUpdated: "Workshop updated",
    translationAdded: "Translation added",
    workshopRemoved: "Workshop removed",
    noDataTitle: "No data",
    noData: "No workshops found...",
    backToParent: "Back",
    addSubdirectory: "Add subdirectory",
    addItem: "Add workshop",
    tabs: {
      basicData: "Basic",
      files: "Files"
    },
    delete: {
      confirmTitle: "Are you sure?",
      confirmDesc: "Are you sure you want to delete this workshop? This action is irreversible.",
    },
    fields: {
      name: "Name",
      description: "Description",
      icon: "Icon",
      YTLink: "URL to video (YT)",
      supportedRoles: "Supported roles",
      supportedLanguages: "Supported languages",
      contentVideo: "URL to video (YT)",
      contentText: "Text content",
      poster: "Graphic",
      files: "Files (attachments)",
      categoryId: "Category",
      zone: "Zone",
      step: "Step",
      public: "Available to everyone",
      publicDescription:
        "Check this box if you want the workshop to be available immediately, without the need for activation from the mentor.",
      stepName: {
        1: "Step 1",
        2: "Step 2",
        3: "Step 3",
        4: "Step 4",
        5: "Step 5",
        6: "Step 6",
        7: "Step 7",
        8: "Step 8",
        9: "Step 9",
        10: "Step 10",
      },
    },
    edit: {
      title: "Edit workshop",
      desc:
        "The fields <strong>\"zone\"</strong> and <strong>\"available to everyone\"</strong> should be the same for each language version of the workshop. Therefore, regardless of which version you are currently viewing, you are modifying these fields for all language variants.",
    },
    create: {
      title: "Add workshop",
      translationCreationDesc: "You are creating a new translation of an existing workshop",
      originalLanguage: "Original",
      currentLanguage: "Translation",
    },
    contentTypes: {
      video: "Video",
      text: "Text content",
    },
    zones: {
      client: "Client zone",
      partner: "Partner zone",
      both: "Both zones"
    },
    success: {
      create: "Success!",
      createDesc: "Workshop added",
      edit: "Success!",
      editDesc: "Changes have been applied",
    },
    errors: {
      nameExists: "A workshop with the given name already exists",
    },
    categories: {
      title: "Categories",
      allCategories: "All categories",
      createAction: "Add category",
      editAction: "Save changes",
      create: {
        title: "Add category",
      },
      edit: {
        title: "Edit category",
      },
      fields: {
        name: "Name",
        owner: "Parent category",
        description: "Description",
      },
      delete: {
        confirmTitle: "Are you sure?",
        confirmDesc: "Are you sure you want to delete this category? This action is irreversible.",
      },
    },
    steps: {
      editAction: "Save changes",
      edit: {
        title: "Edit step",
      },
      fields: {
        name: "Name",
        description: "Description",
      }
    },
    directories: {
      createAction: "Add directory",
      fields: {
        name: "Name",
        description: "Description",
        icon: "Icon",
        supportedRoles: "Supported roles",
        supportedLanguages: "Supported languages",
      },
      edit: {
        title: "Edit directory",
      },
    },
  },
  partnerZone: {
    title: "Partner zone"
  },
  proteges: {
    title: "Proteges",
    candidatesTitle: "Candidates",
    tree: "Partner tree",
    todayProtegesCount: "New partners: {0}",
    treeWrongDevice: "Partner tree is available only on large screen",
    protegesList: "Proteges list",
    pendingRequests: "Pending requests",
    requestAccepted: "Request accepted",
    requestRejected: "Request rejected",
    copySingUpInviteLink: "Copy sign up invite link",
    copyClientLink: "Your link for Client (to EQAPP)",
    speedChanged: "Speed has been changed",
    myWorkshops: "My workshops",
    clients: {
      title: "Clients",
      noClients: "No clients",
      info: "Info"
    },
    candidates: {
      title: "Candidates",
      noCandidates: "No candidates",
      info: "Info"
    },
    mainInfo: {
      role: "Role",
      createdDate: "Join date",
      lastActivity: "Last activity",
      step: "Current step",
      phone: "Phone",
      email: "Email",
      eqologyId: "Eqology ID",
    },
    activity: {
      noActivity: "No activity",
      seeMore: "See more",
      webinarActivity: "Webinars",  
      lastActivity: "Last activity",
      allActivity: "All activity",
      webinarsLatest: "Latest webinars",
      noDataTitle: "Nothing here :(",
      noData: "No activity",
      descriptions: {
        WORKSHOP_FINISH: "Finished workshop <strong>\"{0}\"</strong>",
        WORKSHOP_START: "Started workshop <strong>\"{0}\"</strong>",
        REGISTRATION: "Registered account",
        ACTIVATION: "Account activated",
        PROMOTION: "Promoted to <strong>\"{0}\"</strong>",
        CONTACT_CREATION: "Created contact",
        COURSE_FINISH: "Finished course <strong>\"{0}\"</strong>",
        DEMOTION: "Demoted to <strong>\"{0}\"</strong>",
        WEBINAR_SUBSCRIPTION: "Subscribed to webinar <strong>\"{0}\"</strong>",
        WEBINAR_PRESENCE: "Attended webinar <strong>\"{0}\"</strong>",
      },
      webinarActivityTypes: {
        0: "Subscribed",
        1: "Attended",
        2: "Absent",
        3: "Undecided"
      },
      seeAll: "See all",
      browsingActivity: "Browsing activity of user <strong>{0}</strong>",
    },
    courseProgress: {
      title: "Course progress",
      description: "Current course – <strong>{0}</strong>",
    },
    programProgress: {
      title: "Program progress",
      description: "Current program – <strong>{0}</strong>",
      seeAll: "See more",
      allProgress: "All progress",
      browsingActivity: "Browsing course progress of user <strong>{0}</strong>",
    },
    actions: {
      title: "Actions",
      activate: "Activate user",
      activateWorkshop: "Activate workshop",
      delete: "Delete user",
      promoteToLeader: "Promote to leader",
      promoteToAdmin: "Promote to admin",
      demoteToLeader: "Demote to leader",
      demoteToPartner: "Demote to partner",
      inviteToSignUp: "Invite to sign up",
      activateNextStep: "Activate next step",
      undoStep: "Undo step",
      changeMentor: "Change mentor",
    },
    workshopActivation: {
      title: "Workshops",
      activatingWorkshop: "Activating workshop for user <strong>{0}</strong>",
      errors: {
        workshopNotFound: "Workshop with given ID not found",
        unauthorized: "User does not have access to zone that workshop belongs to",
        badRequest: "Workshop is already available for user",
      },
      success: "Workshop has been activated",
    },
    userRemoved: "User has been removed",
    protegePromoted: "Protege has been promoted!",
    protegeDemoted: "Protege has been demoted!",
    protegeActivated: "Protege has been activated!",
    invitationSent: "Invitation sent!",
    mentorChanged: "Mentor has been changed!",
    stepUndone: "Step has been undone!",
    stepActivated: "Step has been activated!",
    promotion: {
      confirm: {
        title: "Promote protege",
        desc: "Are you sure you want to promote this protege?",
      }
    },
    demotion: {
      confirm: {
        title: "Change protege role",
        desc: "Are you sure you want to change role of this protege?",
      }
    },
    inviteToSignUp: {
      confirm: {
        title: "Invite to sign up",
        desc: "Are you sure you want to invite this user to sign up?",
      }
    },
    activate: {
      confirm: {
        title: "Activate user",
        desc: "Are you sure you want to activate this user?",
      }
    },
    activateNextStep: {
      confirm: {
        title: "Activate next step",
        desc: "Are you sure you want to activate next step for this user?",
      }
    },
    undoStep: {
      confirm: {
        title: "Undo step",
        desc: "Are you sure you want to undo step for this user?",
      }
    },
    changeMentor: {
      confirm: {
        title: "Change mentor",
        desc: "Are you sure you want to change mentor for this user?",
      }
    },
    changeSpeed: {
      confirm: {
        title: "Change speed",
        desc: "Are you sure you want to change course/program speed for this user?",  
      },
    },
    copyInviteLink: "Your link for Protege (to EQAPP)",
    inviteLinkCopied: "Link has been copied",
    courseRequests: {
      title: "Courses",
      protegeAsksFor: "Asks for course activation <strong>\"{0}\"</strong>",
      denyAction: "Deny",
      activateAction: "Activate",
    },
    programRequests: {
      title: "Programs",
      protegeAsksFor: "Asks for program activation <strong>\"{0}\"</strong>",
      denyAction: "Deny",
      activateAction: "Activate",
    },
    activationRequests: {
      title: "Activations",
      protegeAsksFor: "Asks for account activation",
      denyAction: "Deny",
      activateAction: "Activate",
    },
  },
  courses: {
    title: "Courses",
    allCourses: "All courses",
    createAction: "Add a course",
    editAction: "save Changes",
    courseCreated: "The course has been added",
    courseUpdated: "The changes have been implemented",
    courseRemoved: "The course has been deleted",
    timeToStart: "Your course starts soon!<br> Time to start <strong>{0}</strong> this...",
    create: {
      title: "Add a course",
      desc: "In this panel you can add a new course, but without a specific lesson plan. "
    },
    edit: {
      title: "Edit course"
    },
    delete: {
      confirmTitle: "Are you sure?",
      confirmDesc: "Are you sure you want to delete this course? "
    },
    fields: {
      name: "Name",
      description: "Description",
      contract: "Contract",
      poster: "Graphics",
      days: "Duration"
    },
    day: {
      title: "Day {0}",
      editAction: "save Changes",
      success: {
        edit: "Success!",
        editDesc: "The description has been updated"
      },
      fields: {
        challengesDescription: "Description of the day",
        summaryDescription: "Summary of the day"
      },
      challenges: {
        createAction: "Add a challenge",
        editAction: "save Changes",
        useSchemaGo: "Use the GO scheme",
        useSchemaRun: "Use the RUN scheme",
        listDesc: "All changes to the list are updated in real time.",
        create: {
          title: "Add a challenge"
        },
        edit: {
          title: "Edit challenge"
        },
        fields: {
          title: "Title",
          description: "Description",
          type: "Type",
          workshopId: "Related training",
          optional: "Optional",
          optionalDesc: "Can a user skip this challenge? ",
          typeVariants: {
            PROSPECTING: "Prospecting",
            APPOINTMENT: "Spot appointment.",
            WEBINAR: "Webinar",
            FOLLOW_UP: "Follow-up",
            MEETING: "Meeting",
            WORKSHOP: "Training",
            INFO: "information",
            FB: "FB activity",
            INSTAGRAM: "Instagram Activity",
            SOCIAL_MEDIA: "Activity in MS",
            SPORT_ACTIVITY: "Physical activity"
          }
        }
      }
    }
  },
  notifications: {
    title: "Notifications",
    allNotifications: "All notifications",
    notificationTemplates: "Templates",
    noNotifications: "No notifications",
    noNotificationsDesc: "You have no unread notifications.",
    fields: {
      title: "Title",
      description: "Description",
      name: "Name (internal)"
    },
    editAction: "save Changes",
    notificationUpdated: "The changes have been implemented",
    unseenPushNotifications: "You have {0} new notifications"
  },
  catalogs: {
    title: "Catalogues",
    allCatalogs: "All catalogues",
    createAction: "Add directory",
    editAction: "save Changes",
    catalogCreated: "The catalog has been added",
    catalogUpdated: "The changes have been implemented",
    catalogRemoved: "The catalog has been deleted",
    create: {
      title: "Add directory"
    },
    edit: {
      title: "Edit directory"
    },
    delete: {
      confirmTitle: "Are you sure?",
      confirmDesc: "Are you sure you want to delete this directory? "
    },
    fields: {
      name: "Name",
      description: "Contents",
      startAt: "Start date",
      variant: "Duration"
    },
    variants: {
      twoWeek: "2 weeks",
      threeWeek: "3 weeks"
    }
  },
  menuLinks: {
    title: "Menu links",
    allLinks: "All links",
    createAction: "Add link",
    editAction: "save Changes",
    linkCreated: "The link has been added",
    linkUpdated: "The changes have been implemented",
    linkRemoved: "The link has been removed",
    create: {
      title: "Add link"
    },
    edit: {
      title: "Edit link"
    },
    delete: {
      confirmTitle: "Are you sure?",
      confirmDesc: "Are you sure you want to remove this link? "
    },
    variants: {
      internal: "Subpage",
      external: "External"
    },
    fields: {
      name: "Name",
      url: "URL address",
      variant: "Type",
      page: "Subpage",
      icon: "Icon",
      supportedRoles: "Supported roles",
      supportedLanguages: "Supported languages"
    },
    errors: {
      nameExists: "A link with the given name already exists"
    }
  },
  productCategory: {
    allProductCategories: "All categories",
    productCategoryCreated: "The category has been added",
    productCategoryUpdated: "The changes have been implemented",
    productCategoryRemoved: "The category has been deleted",
    buyingChoices: "Purchasing options - You buy directly from the seller!",
    goToShop: "To the shop!",
    posts: "Related articles",
    faqs: "Questions asked",
    editProductRefLink: "Edit reflink",
    lackOfRefUrls: "Complete your reflinks!",
    copyRefLink: "Copy reflink",
    refLinkCopied: "The reflink has been copied",
    benefits: {
      one: {
        title: "Fast delivery",
        description: "Delivery to the customer within 2 business days!"
      },
      two: {
        title: "Better Prices",
        description: "Buy with us – pay less!"
      },
      three: {
        title: "Satisfaction Guarantee",
        description: "30 days return guarantee!"
      },
      four: {
        title: "Specialized Research",
        description: "We have independent tests confirming the highest quality!"
      }
    },
    createAction: "Add a category",
    editAction: "Edit category",
    delete: {
      confirmTitle: "Are you sure?",
      confirmDesc: "Are you sure you want to delete this category? "
    },
    fields: {
      name: "Name",
      descriptionBefore: "Description before products",
      descriptionAfter: "Description by products",
      image: "Image",
      imageBig: "Big image"
    },
    create: {
      title: "Add a category"
    },
    edit: {
      title: "Edit category"
    },
    tabs: {
      basicData: "Basic",
      products: "Products",
      articles: "Articles",
      faqs: "FAQ"
    }
  },
  products: {
    title: "Products",
    seeMore: "Information",
    ourProducts: "Our products",
    editUrl: "Edit reflink",
    fromProducer: "Purchase straight from the manufacturer",
    updateLink: "Complete the link!",
    allProducts: "All products",
    createAction: "Add a product",
    editAction: "save Changes",
    productCreated: "The product has been added",
    productUpdated: "The changes have been implemented",
    productRemoved: "The product has been removed",
    linkCopied: "The link has been copied",
    copyLink: "Copy link",
    create: {
      title: "Add a product"
    },
    edit: {
      title: "Edit product"
    },
    delete: {
      confirmTitle: "Are you sure?",
      confirmDesc: "Are you sure you want to remove this product? "
    },
    fields: {
      name: "Name",
      description: "Description",
      price: "Price",
      image: "Graphics",
      refUrl: "Ref link to the product",
      priceOld: "Old price",
    }
  },
  posts: {
    title: "Posts",
    allPosts: "All posts",
    createAction: "Add a post",
    editAction: "save Changes",
    postCreated: "The post has been added",
    postUpdated: "The changes have been implemented",
    postRemoved: "The post has been deleted",
    create: {
      title: "Add a post"
    },
    edit: {
      title: "Edit post"
    },
    delete: {
      confirmTitle: "Are you sure?",
      confirmDesc: "Are you sure you want to delete this post? "
    },
    fields: {
      title: "Title",
      content: "Contents",
      image: "Graphics"
    }
  },
  certificates: {
    seeMore: "More information",
    title: "Certificates",
    allCertificates: "All certificates",
    createAction: "Add a certificate",
    editAction: "save Changes",
    certificateCreated: "The certificate has been added",
    certificateUpdated: "The changes have been implemented",
    certificateRemoved: "The certificate has been deleted",
    create: {
      title: "Add a certificate"
    },
    edit: {
      title: "Edit certificate"
    },
    delete: {
      confirmTitle: "Are you sure?",
      confirmDesc: "Are you sure you want to delete this certificate? "
    },
    fields: {
      title: "Title",
      description: "Description",
      image: "Graphics",
      url: "URL address"
    }
  },
  faqs: {
    title: "FAQs",
    allFaqs: "All FAQs",
    createAction: "Add FAQ",
    editAction: "save Changes",
    faqCreated: "FAQ has been added",
    faqUpdated: "The changes have been implemented",
    faqRemoved: "FAQ has been removed",
    create: {
      title: "Add FAQ"
    },
    edit: {
      title: "Edit FAQ"
    },
    delete: {
      confirmTitle: "Are you sure?",
      confirmDesc: "Are you sure you want to delete this FAQ? "
    },
    fields: {
      question: "Question",
      answer: "Answer"
    }
  },
  candidateQuizes: {
    title: "Quizzes for candidates",
    allQuizes: "All quizzes",
    createAction: "Add a quiz",
    editAction: "save Changes",
    quizCreated: "The quiz has been added",
    quizUpdated: "The changes have been implemented",
    quizRemoved: "The quiz has been deleted",
    create: {
      title: "Add a quiz"
    },
    edit: {
      title: "Edit quiz"
    },
    delete: {
      confirmTitle: "Are you sure?",
      confirmDesc: "Are you sure you want to delete this quiz? "
    },
    fields: {
      name: "Name",
      graduateMinScore: "Pass rate (%)",
      movieUrl: "URL to the video"
    }
  },
  candidateQuizQuestions: {
    title: "Questions",
    allQuestions: "All questions",
    createAction: "Add a question",
    editAction: "save Changes",
    questionCreated: "The question has been added",
    questionUpdated: "The changes have been implemented",
    questionRemoved: "The question has been deleted",
    create: {
      title: "Add a question"
    },
    edit: {
      title: "Edit question"
    },
    delete: {
      confirmTitle: "Are you sure?",
      confirmDesc: "Are you sure you want to delete this question? "
    },
    fields: {
      question: "Question"
    }
  },
  candidateQuizAnswers: {
    title: "Answers",
    allAnswers: "All answers",
    createAction: "Add a reply",
    editAction: "save Changes",
    answerCreated: "The answer has been added",
    answerUpdated: "The changes have been implemented",
    answerRemoved: "The reply has been deleted",
    create: {
      title: "Add a reply"
    },
    edit: {
      title: "Edit answer"
    },
    delete: {
      confirmTitle: "Are you sure?",
      confirmDesc: "Are you sure you want to delete this answer? "
    },
    fields: {
      answer: "Answer",
      isCorrect: "Correct",
      questionDescription: "Select only if the answer is to be considered correct"
    }
  },
  boardItemImages: {
    createAction: "Add graphics",
    delete: {
      confirmTitle: "Are you sure?",
      confirmDesc: "Are you sure you want to delete this photo? "
    },
    fields: {
      image: "File"
    }
  },
  boardItemVideos: {
    createAction: "Add a video",
    delete: {
      confirmTitle: "Are you sure?",
      confirmDesc: "Are you sure you want to delete this video? "
    }
  },
  boardItemFiles: {
    createAction: "add file",
    delete: {
      confirmTitle: "Are you sure?",
      confirmDesc: "Are you sure you want to delete this file? "
    },
    fields: {
      file: "File",
      languageId: "Tongue"
    }
  },
  workshopItemFiles: {
    createAction: "add file",
    delete: {
      confirmTitle: "Are you sure?",
      confirmDesc: "Are you sure you want to delete this file? "
    },
    fields: {
      file: "File",
      languageId: "Tongue"
    }
  },
  pages: {
    title: "Subpages",
    allPages: "All subpages",
    createAction: "Add a subpage",
    editAction: "save Changes",
    pageCreated: "The subpage has been added",
    pageUpdated: "The changes have been implemented",
    pageRemoved: "The subpage has been deleted",
    goToBoardContent: "Skip to content",
    create: {
      title: "Add a subpage"
    },
    edit: {
      title: "Edit subpage"
    },
    delete: {
      confirmTitle: "Are you sure?",
      confirmDesc: "Are you sure you want to delete this subpage? "
    },
    fields: {
      name: "ID"
    },
    types: {
      board: "Board",
      boardItem: "Lent"
    }
  },
  webinars: {
    title: "Webinars",
    platforms: {
      cmNew: "New ClickMeeting",
      cmFrom: "Existing ClickMeeting",
      sm: "Existing Streamyard/YT"
    },
    youHaveToVerify: {
      title: "Verify Email",
      description: "You must verify your email address before continuing.",
    },
    downloadPoster: "Download poster",
    createFromCM: "Create from CM",
    downloadCSV: "Download CSV",
    noMoreTokens: "No tokens available",
    noMoreTokensDesc: "Unfortunately, there are no more places available for this webinar :(",
    businessWebinars: "Business webinars",
    clientWebinars: "Product webinars",
    showFinished: "Show completed",
    finishedWebinars: "Completed webinars",
    subscribe: "Sign up!",
    details: "Details",
    timeLeft: "Remaining...",
    live: "LIVE",
    subscribedUsers: "Saved",
    attendedUsers: "Participants",
    noSubscribedUsers: "No registered users",
    noAttendedUsers: "No participants",
    startAt: "It's taking off",
    subscribed: "Saved!",
    subscribedInfo: "You will receive a reminder notification from us an hour before the webinar starts.",
    presenter: "Leader",
    seeYouSoon: "See you! ",
    goToWebinar: "Come in",
    allWebinars: "All webinars",
    createAction: "Add a webinar",
    editAction: "save Changes",
    webinarCreated: "The webinar has been added",
    webinarUpdated: "The changes have been implemented",
    webinarRemoved: "The webinar has been deleted",
    noDataTitle: "There is nothing here :(",
    noData: "No webinars currently scheduled...",
    invited: {
      invite: "Invite",
      invited: "Invited!",
      invitePartner: "Invite a partner",
      inviteGuest: "Invite a guest",
      invitedUsers: "Registered users",
      invitedGuests: "Registered guests",
      userInvited: "The user has been invited",
      error: "An error occured...",
      typeEmail: "Enter your email address",
      emailExists: "The user has already received an invitation",
      invitationInvalidOrExpired: "The invitation is invalid or has expired",
      firstName: "Name",
      lastName: "Last name",
      email: "E-mail",
      urlGenerated: "A unique invitation has been generated!",
      copyUrl: "Copy link",
      linkCopied: "The link has been copied"
    },
    create: {
      title: "Add a webinar"
    },
    edit: {
      title: "Edit webinar"
    },
    delete: {
      confirmTitle: "Are you sure?",
      confirmDesc: "Are you sure you want to delete this webinar? "
    },
    variants: {
      BUSINESS: "Business",
      CLIENT: "Client",
      INVITED: "By invitation"
    },
    fields: {
      poster: "Poster",
      title: "Title",
      description: "Description",
      presenter: "Leader",
      startAt: "Start date",
      duration: "Duration",
      variant: "Type",
      supportedLanguages: "Supported languages",
      supportedRoles: "Supported roles",
      embedUrl: "URL (eg. YouTube)",
      cmId: "ID from CM",
      cmIdDescription: "Go to the event details and look at the address in the browser. The ID is the number after the last slash. (For example, in the link `https://account-panel.clickmeeting.com/8315894`, the ID is `8315894`)",
      isWorkshop: "Internal webinar",
      isWorkshopDescription: "If this field is checked, the webinar will be displayed in the Business Partners Webinars tab and it will not be possible to invite outsiders.",
      embedCode: "StreamYard Stream Link",
embedCodeDescription: `Select "Share" on your "On-air" stream, copy the link and paste it here.`
    }
  },
  announcements: {
    title: "Advertisements",
    allAnnouncements: "All ads",
    createAction: "Add an announcement",
    editAction: "save Changes",
    announcementCreated: "The announcement has been added",
    announcementUpdated: "The changes have been implemented",
    announcementRemoved: "The ad has been removed",
    create: {
      title: "Add an announcement"
    },
    edit: {
      title: "Edit your ad"
    },
    delete: {
      confirmTitle: "Are you sure?"
    },
    fields: {
      title: "Title",
      description: "Contents",
      startAt: "Start date"
    }
  },
  boards: {
    title: "System",
    allBoards: "All boards",
    createAction: "Add an array",
    editAction: "save Changes",
    boardCreated: "The board has been added",
    boardUpdated: "The changes have been implemented",
    boardRemoved: "The board has been removed",
    noData: "There's nothing here yet...",
    noDataTitle: "No data",
    addSubdirectory: "Add a subdirectory",
    addItem: "Add an item",
    backToParent: "Come back",
    colors: {
      PRIMARY: "Basic",
      PRIMARY_LIGHTER: "Basic (lighter)",
      ORANGE: "Orange",
      GREEN: "Green",
      RED: "Red"
    },
    create: {
      title: "Add an array"
    },
    edit: {
      title: "Edit the board"
    },
    delete: {
      confirmTitle: "Are you sure?",
      confirmDesc: "Are you sure you want to delete this board? "
    },
    fields: {
      name: "Name",
      description: "Contents",
      icon: "Icon",
      supportedLanguages: "Supported languages",
      supportedRoles: "Supported roles",
      color: "Color"
    },
    icons: {
      HEART: "Heart",
      LIKE: "Like",
      STATS: "Statistics",
      CONFIG: "Gear",
      WORKSHOP: "Training",
      INFO: "information",
      FB: "Facebook",
      INSTAGRAM: "Instagram",
      SPORT: "Sport",
      MEDITATION: "Meditation",
      CHAT: "Conversation",
      TROPHY: "Trophy",
      STAR: "Star",
      CHALLENGE: "Challenge",
      MAIL: "Post",
      CALENDAR: "Calendar",
      VIDEO: "Video",
      BOOK: "Book",
      PAPER: "Sheet",
      LINK: "Link",
      FILE: "File",
      TEXT: "Text",
      PLUS: "Plus",
      MINUS: "Minus",
      CHECK: "Check",
      MUSIC: "Music",
      CROSS: "Cross",
      ARROW_LEFT: "Left arrow",
      ARROW_RIGHT: "Right arrow",
      ARROW_UP: "Arrow up",
      ARROW_DOWN: "Down arrow",
      LOCK_OPEN: "Open padlock",
      LOCK_CLOSED: "Closed padlock",
      PIN: "Drawing pin",
      PIN_TWO: "Pin 2",
      CHART_UP: "Graph up",
      CHART_DOWN: "Graph down",
      CHART_ALT: "Alternate chart",
      TOOLS: "Tools",
      BOMB: "Bomb",
      DYNAMITE: "Dynamite",
      DIAMOND: "Diamond",
      CASH: "Cash",
      CASH_TWO: "Cash 2",
      GOLD: "Gold",
      BUS: "Bus",
      CAR: "Car",
      TAXI: "Taxi",
      BOAT: "Łódź",
      PLANE: "Plane",
      BIKE: "Bicycle",
      SMARTPHONE: "Smartphone",
      LAPTOP: "Laptop",
      DESKTOP: "Desktop",
      PHONE_OLD: "Old phone",
      KEYBOARD: "Keyboard",
      CAMERA: "The camera",
      COMPASS: "Compass",
      ALARM: "Alarm",
      WOMAN: "Woman",
      MAN: "Man",
      HOME: "House",
      BELL: "Bell",
      ACADEMY: "Academy",
      CERTIFICATE: "Certificate",
      LIST: "List",
      MOVIE: "Movie",
      PROFILE: "Profile",
      CROWN: "Crown",
      KEY: "Key",
      PATHS: "Paths",
      USERS: "Users",
      NOTIFICATION: "Notification",
      EXIT: "Exit",
      CART: "Basket",
      FILES: "Files",
      FIRE: "Flame"
    },
    items: {
      chooseType: "Select a variant",
      createAction: "Add an item",
      editAction: "save Changes",
      itemCreated: "The item has been added",
      itemUpdated: "The changes have been implemented",
      itemRemoved: "The item has been deleted",
      tabs: {
        basicData: "Basic",
        videos: "Video",
        files: "Files",
        images: "Graphics"
      },
      create: {
        title: "Add an item"
      },
      edit: {
        title: "Edit item"
      },
      delete: {
        confirmTitle: "Are you sure?",
        confirmDesc: "Are you sure you want to delete this item? "
      },
      fields: {
        name: "Name",
        link: "Link",
        file: "File",
        text: "Text content",
        icon: "Icon",
        supportedLanguages: "Supported languages",
        supportedRoles: "Supported roles"
      },
      contentTypes: {
        link: "Link",
        file: "File",
        text: "Text content"
      },
      copyLink: "Copy link",
      linkCopied: "The link has been copied",
      downloadFile: "download file",
      copyText: "Copy text",
      textCopied: "The text has been copied"
    }
  },
  movies: {
    title: "Movie database",
    categories: {
      title: "Categories",
      createAction: "Add a category",
      editAction: "save Changes",
      categoryCreated: "The category has been added",
      categoryUpdated: "The changes have been implemented",
      categoryRemoved: "The category has been deleted",
      create: {
        title: "Add a category"
      },
      edit: {
        title: "Edit category"
      },
      delete: {
        confirmTitle: "Are you sure?",
        confirmDesc: "Are you sure you want to delete this category? "
      },
      fields: {
        name: "Name",
        description: "Description"
      }
    },
    createAction: "Add a video",
    editAction: "save Changes",
    movieCreated: "The video has been added",
    movieUpdated: "The changes have been implemented",
    movieRemoved: "The video has been removed",
    noData: "There's nothing here yet...",
    noDataTitle: "No data",
    addSubcategory: "Add a subcategory",
    addMovie: "Add a video",
    backToParent: "Come back",
    create: {
      title: "Add a video"
    },
    edit: {
      title: "Edit video"
    },
    delete: {
      confirmTitle: "Are you sure?",
      confirmDesc: "Are you sure you want to delete this video? "
    },
    fields: {
      name: "Name",
      description: "Description",
      link: "Link"
    }
  },
  programs: {
    title: "Programs",
    allPrograms: "All programs",
    createAction: "Add a program",
    editAction: "save Changes",
    programCreated: "The program has been added",
    programUpdated: "The changes have been implemented",
    programRemoved: "The program has been removed",
    timeToStart: "Your program starts soon!<br> Time to start <strong>{0}</strong> this...",
    create: {
      title: "Add a program",
      desc: "In this panel you can add a new program, but without a specific lesson plan. "
    },
    edit: {
      title: "Edit program"
    },
    delete: {
      confirmTitle: "Are you sure?",
      confirmDesc: "Are you sure you want to remove this program? "
    },
    fields: {
      name: "Name",
      description: "Description",
      contract: "Contract",
      poster: "Graphics",
      days: "Duration"
    },
    day: {
      title: "Day {0}",
      editAction: "save Changes",
      success: {
        edit: "Success!",
        editDesc: "The description has been updated"
      },
      fields: {
        challengesDescription: "Description of the day",
        summaryDescription: "Summary of the day"
      },
      challenges: {
        createAction: "Add a challenge",
        editAction: "save Changes",
        listDesc: "All changes to the list are updated in real time.",
        create: {
          title: "Add a challenge"
        },
        edit: {
          title: "Edit challenge"
        },
        fields: {
          title: "Title",
          description: "Description",
          type: "Type",
          optional: "Optional",
          optionalDesc: "Can a user skip this challenge? ",
          typeVariants: {
            PROSPECTING: "Prospecting",
            APPOINTMENT: "Spot appointment.",
            WEBINAR: "Webinar",
            FOLLOW_UP: "Follow-up",
            MEETING: "Meeting",
            WORKSHOP: "Training",
            INFO: "information",
            FB: "FB activity",
            INSTAGRAM: "Instagram Activity",
            SOCIAL_MEDIA: "Activity in MS",
            SPORT_ACTIVITY: "Physical activity"
          }
        }
      }
    }
  },
  join: {
    title: "Hello!",
    createAction: "Join",
    desc: "Select the option you liked at the information meeting.",
    chooseAccountType: "Select an account type",
    firstTimeDesc: "Your first training sessions are ahead of you! ",
    fields: {
      firstName: "Name",
      lastName: "Last name",
      email: "E-mail"
    }
  },
  chooseProgram: {
    title: "Select a program",
    signContract: "Sign the contract",
    desc: "Attention! ",
    startAction: "Request activation",
    signContractAction: "Sign the contract",
    requestAlreadySent: {
      title: "Wait... :)",
      desc: "Your request to activate your course or program has already been sent. "
    },
    alreadyInProgress: {
      title: "Not now! ",
      desc: "One course or program is already in progress. "
    },
    programs: {
      title: "Programs",
      startProgram: "Request program activation",
      youHaveToSignContract: "To request activation of the program, you must first sign a contract."
    },
    courses: {
      title: "Courses",
      startCourse: "Request course activation",
      youHaveToSignContract: "To request course activation, you must first sign a contract."
    },
    success: {
      title: "Success!",
      desc: "Your guardian has been informed of your request. "
    }
  },
  films: {
    title: "Movie database"
  },
  languages: {
    pl: "Polish",
    en: "English",
    uk: "Ukrainian",
    de: "german"
  },
  roles: {
    title: "Roles",
    saveAction: "save Changes",
    saved: "The changes have been implemented",
    permissions: {
      adminPanelAccess: "Access to the administration panel (admin)",
      adminUsersRead: "Read users (admin)",
      adminUsersEdit: "Editing users (admin)",
      adminUsersRemove: "Deleting users (admin)",
      adminUsersActivate: "User activation (admin)",
      adminWorkshopsRead: "Reading training (admin)",
      adminWorkshopsEdit: "Editing training (admin)",
      adminWorkshopsRemove: "Deleting training (admin)",
      adminWorkshopsCreate: "Creating training (admin)",
      adminMenuLinksRead: "Reading menu links (admin)",
      adminMenuLinksEdit: "Editing menu links (admin)",
      adminMenuLinksRemove: "Removing menu links (admin)",
      adminMenuLinksCreate: "Creating menu links (admin)",
      adminUsefulLinksRead: "Read useful links (admin)",
      adminUsefulLinksEdit: "Editing useful links (admin)",
      adminUsefulLinksRemove: "Removing useful links (admin)",
      adminUsefulLinksCreate: "Creating useful links (admin)",
      adminPagesRead: "Reading subpages (admin)",
      adminPagesEdit: "Editing subpages (admin)",
      adminPagesRemove: "Deleting subpages (admin)",
      adminPagesCreate: "Creating subpages (admin)",
      adminWebinarsRead: "Reading webinars (admin)",
      adminWebinarsEdit: "Editing webinars (admin)",
      adminWebinarsRemove: "Deleting webinars (admin)",
      adminWebinarsCreate: "Creating webinars (admin)",
      adminRolesRead: "Read roles (admin)",
      adminRolesEdit: "Editing roles (admin)",
      adminAnnouncementsRead: "Reading advertisements (admin)",
      adminAnnouncementsEdit: "Editing ads (admin)",
      adminAnnouncementsRemove: "Deleting ads (admin)",
      adminAnnouncementsCreate: "Creating announcements (admin)",
      adminNotificationsRead: "Reading notifications (admin)",
      adminNotificationsEdit: "Editing notifications (admin)",
      adminCustomNotificationsRead: "Reading custom notifications (admin)",
      adminCustomNotificationsEdit: "Editing custom notifications (admin)",
      adminCustomNotificationsRemove: "Deleting custom notifications (admin)",
      adminCustomNotificationsCreate: "Creating custom notifications (admin)",
      adminProtegesPromoteToLEADER: "Promoting a partner to leader (admin)",
      adminProtegesPromoteToADMIN: "Promoting a leader to admin (admin)",
      adminProtegesDemoteToLEADER: "Demotion of admin to leader (admin)",
      adminProtegesDemoteToPARTNER: "Demotion of leader to partner (admin)",
      adminProtegesChangeMentor: "Changing the partner's guardian (admin)",
      adminProductsRead: "Read products (admin)",
      adminProductsEdit: "Product edition (admin)",
      adminProductsRemove: "Deleting products (admin)",
      adminProductsCreate: "Product creation (admin)",
      adminProductsCategoryRead: "Reading product categories (admin)",
      adminProductsCategoryEdit: "Editing product categories (admin)",
      adminProductsCategoryRemove: "Deleting a product category (admin)",
      adminProductsCategoryCreate: "Creating product categories (admin)",
      customWorkshopsRead: "Read your own training courses",
      customWorkshopsEdit: "Edit your own training",
      customWorkshopsRemove: "Deleting your own training courses",
      customWorkshopsCreate: "Creating your own training",
      protegesInvite: "Inviting partners",
      protegesRead: "Reading partners",
      protegesRemove: "Removing partners",
      workshopsRead: "Reading training",
      workshopsCreate: "Creating training",
      webinarsAccess: "Access to webinars",
      productsAccess: "Access to products",
      adminPostsRead: "Reading posts (admin)",
      adminPostsEdit: "Editing posts (admin)",
      adminPostsRemove: "Deleting posts (admin)",
      adminPostsCreate: "Creating posts (admin)",
      adminCertificatesRead: "Reading certificates (admin)",
      adminCertificatesEdit: "Editing certificates (admin)",
      adminCertificatesRemove: "Deleting certificates (admin)",
      adminCertificatesCreate: "Creating certificates (admin)",
      adminFaqsRead: "Read FAQ (admin)",
      adminFaqsEdit: "Edit FAQ (admin)",
      adminFaqsRemove: "Deleting FAQ (admin)",
      adminFaqsCreate: "Creating FAQ (admin)",
      adminCandidateQuizRead: "Read candidates' quizzes (admin)",
      adminCandidateQuizEdit: "Editing candidate quizzes (admin)",
      adminCandidateQuizRemove: "Deleting candidate quizzes (admin)",
      adminCandidateQuizCreate: "Creating candidate quizzes (admin)",
      adminSystemPersonalizationRead: "Reading system personalization (admin)",
      adminSystemPersonalizationEdit: "Editing system personalization (admin)",
      protegesChangeMentor: "Change of partner's guardian",
      chatAccess: "Access to chat",
    }
  },
  courseChallenges: {
    title: "Day {0}",
    challenges: {
      title: "Today's challenges"
    },
    summary: {
      success: {
        title: "Congratulations!"
      },
      failure: {
        title: "Unfortunately...",
        description: "<p>We are sorry that you are not implementing what we agreed on.</p><p>Remember that you decide what your future looks like. </p><p>However, everything depends on your commitment - without it, we will not be able to help you.</p><p>But... keep your head up! <strong>Tomorrow is a day too</strong> :)</p><p>Let this be your new beginning!</p>"
      }
    }
  },
  programChallenges: {
    challenges: {
      title: "Today's challenges"
    },
    summary: {
      success: {
        title: "Congratulations!",
        progress: "<p><strong>Today you completed {0}% of your tasks</strong></p>"
      },
      failure: {
        title: "Unfortunately...",
        description: "<p>We are sorry that you are not implementing what we agreed on.</p><p>Remember that you decide what your future looks like. </p><p>However, everything depends on your commitment - without it, we will not be able to help you.</p><p>But... keep your head up! <strong>Tomorrow is a day too</strong> :)</p><p>Let this be your new beginning!</p>",
        progress: "<p><strong>Your result today is only {0}% :(</strong></p>"
      }
    }
  },
  usefulLinks: {
    title: "Useful links"
  },
  currentProgram: {
    title: "Current program"
  },
  currentCourse: {
    title: "Current rate"
  },
  offline: {
    title: "No internet connection",
    description: "Check your connection and try again.",
  },
  workInProgress: {
    title: "Under modernization",
    description: "Sorry for the inconvenience. We'll be back soon!",
  },
  personalizedContent: {
    title: "Personalization of system content",
    contentUpdated: "Content has been updated",
    fields: {
      name: "Name (identifier)",
      title: "Title",
      content: "Content"
    },
    editAction: "Save changes",
    edit: {
      title: "Edit content",
    }
  },
  candidateQuiz: {
    start: "Start",
    goToQuiz: "Go to quiz",
    checkAnswers: "Check answers",
    requiredMinScore: "Passing threshold is ",
    goFurther: "Go further",
    refresh: "Try again"
  },
  newsletter: {
    fields: {
      firstName: "First name",
      lastName: "Last name",
      email: "E-mail",
    },
    error: "Fill in all fields!",
    errorDescription: "All fields are required...",
    subscribed: "Subscribed to newsletter!",
    subscribedDescription: "Thank you :)",
    goToApp: "Go to app",
  },
}