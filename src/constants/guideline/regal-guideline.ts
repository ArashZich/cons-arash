// src/constants/guideline/regal-guideline.ts

export const regal_guideline = {
  title: 'راهنمای کامل رگال فرش',
  subtitle: 'معرفی سرویس رگال فرش',
  description:
    'رگال فرش یکی از سرویس‌های منحصر به فرد آرمو است که امکان نمایش تا 50 طرح فرش در یک پروژه واحد را فراهم می‌کند. این سرویس تجربه‌ای مشابه رگال‌های فیزیکی فروشگاه‌ها ارائه می‌دهد که کاربران می‌توانند فرش‌ها را "ورق بزنند" و در محیط سه‌بعدی مشاهده کنند.',

  // ویژگی منحصر به فرد
  title_feature: 'ویژگی منحصر به فرد:',
  unique_feature:
    'بدون هزینه اضافی! اگر پلن فعال در دسته‌بندی فرش دارید، می‌توانید از رگال فرش نیز استفاده کنید.',

  // قابلیت‌های کلیدی (اختیاری - فقط برای فرش)
  title_key_features: null,
  key_features: null,

  // تفاوت با سایر سرویس‌ها
  title_difference: 'تفاوت رگال فرش با سایر سرویس‌ها:',
  differences: [
    {
      title: '🆚 شوروم مجازی:',
      description: 'نمایش آلبوم‌وار جداگانه با اسم و سایز',
    },
    {
      title: '✅ رگال فرش:',
      description: 'نمایش یکپارچه در محیط سه‌بعدی با قابلیت ورق زدن',
    },
  ],

  // کاربردهای عملی
  title_usecases: 'کاربردهای عملی رگال فرش:',
  usecases: [
    'مجموعه‌های یکسان: نمایش طرح‌های مختلف با سایز یکسان',
    'کالکشن فصلی یا موضوعی: گروه‌بندی براساس سبک یا فصل',
    'تنوع رنگی: ارائه رنگ‌های مختلف از یک طرح',
  ],

  title_guideline: 'راهنمای گام به گام ساخت رگال فرش',

  // مرحله 1
  header_step_1: 'مرحله 1: انتخاب دسته‌بندی',
  step_1: [
    'از منوی دسته‌بندی‌ها، گزینه رگال فرش را انتخاب کنید',
    'دکمه ادامه فعال شده و آن را کلیک کنید',
  ],
  step_1_image: 'https://bytebase.armogroup.tech/api/v1/files/public/guideline-regal-1.webp',

  // مرحله 2
  header_step_2: 'مرحله 2: اطلاعات پروژه رگال',
  title_step_2: null, // برای رگال استفاده نمی‌شود

  // نام‌گذاری پروژه
  title_step_2_naming: 'نام‌گذاری پروژه',
  step_2_naming_restrictions: 'محدودیت‌های نام‌گذاری:',
  step_2_naming_rules: [
    'فقط حروف و اعداد انگلیسی استفاده کنید',
    'کاراکترهای غیر مجاز: فاصله، نقطه (.)، پرانتز ()، اسلش (/)، آندرلاین (_)، دو نقطه (:)، نقطه ویرگول (;)',
    'پیشنهاد: استفاده از کد محصول یا نام کالکشن',
  ],
  step_2_naming_examples_title: 'مثال نام‌های صحیح:',
  step_2_naming_examples: ['collection2024spring', 'modernstyle01', 'redcarpets'],

  title_step_2_cover: 'آپلود عکس کاور پروژه',
  step_2_cover_description:
    'این عکس نماینده کل رگال شماست و الزاماً نیاز نیست عکس فرش باشد. می‌تواند:',
  step_2_cover_options: ['لوگوی برند شما', 'عکس کلی از کالکشن', 'تصویر نمادین مجموعه'],
  step_2_cover_specs_title: 'مشخصات فنی عکس کاور:',
  step_2_cover_specs: [
    'فرمت: JPG یا PNG',
    'حجم: کمتر از 1 مگابایت',
    'روش آپلود: فایل GLB را با Drag & Drop بکشید یا روی کارت کلیک کرده و فایل مورد نظر را انتخاب کنید.',
  ],

  // فرش مستطیلی و دایره‌ای (اختیاری - فقط برای فرش)
  subtitle_step_2_1: null,
  description_step_2_1: null,
  rectangular_sizes: null,
  subtitle_step_2_2: null,
  description_step_2_2: null,
  circular_sizes: null,
  title_step_2_notes: null,
  step_2_notes: null,
  step_2_image: 'https://bytebase.armogroup.tech/api/v1/files/public/guideline-regal-2.webp',

  // مرحله 3
  header_step_3: 'مرحله 3: انتخاب شکل و سایز رگال',
  title_step_3: 'انتخاب شکل رگال:',

  // نام‌گذاری (فقط برای فرش در مرحله 3)
  title_step_3_naming: null,
  step_3_naming: null,
  title_step_3_upload: null,
  step_3_upload_notes: null,
  title_step_3_method: null,
  step_3_method: null,
  step_3_image: 'https://bytebase.armogroup.tech/api/v1/files/public/guideline-regal-3.webp',

  // مرحله 4
  header_step_4: 'مرحله 4: آپلود فرش‌های رگال',

  // ظرفیت رگال
  title_step_4_capacity: 'ظرفیت رگال:',
  step_4_capacity: [
    'حداکثر 50 عکس فرش در یک رگال',
    'همه فرش‌ها در یک لینک واحد قرار می‌گیرند',
    'امکان ورق زدن بین فرش‌ها در محیط سه‌بعدی',
  ],

  title_step_4_specs: 'مشخصات فنی عکس‌های فرش:',
  step_4_specs: [
    'فرمت فایل: PNG یا JPG',
    'حجم هر عکس: کمتر از 1 مگابایت',
    'نمای عکس: کاملاً روبرو و بدون حاشیه اضافی',
    'برای فرش دایره‌ای: فایل PNG با پس‌زمینه شفاف اجباری',
    'یکسان‌سازی: تمام فرش‌ها باید سایز یکسان را داشته باشند',
  ],

  step_4: null, // برای رگال استفاده نمی‌شود
  step_4_options: null,
  step_4_image: 'https://bytebase.armogroup.tech/api/v1/files/public/guideline-regal-4.webp',

  // مرحله 5
  header_step_5: 'مرحله 5: تکمیل و ایجاد رگال',
  title_step_5_upload: 'روش آپلود فرش‌ها:',
  step_5_upload_method: [
    'عکس‌ها را با Drag & Drop بکشید یا روی کارت کلیک کرده و فایل مورد نظر را انتخاب کنید.',
    'پس از انتخاب، علامت ضربدر برای حذف هر عکس نمایش داده می‌شود',
    'دکمه "حذف همه" برای پاک کردن تمام انتخاب‌ها',
  ],

  title_step_5_finalize: 'نهایی‌سازی:',
  step_5_finalize: [
    'پس از انتخاب تمام فرش‌ها، روی دکمه "آپلود" کلیک کنید',
    'دکمه "ادامه" فعال شده و آن را کلیک کنید',
    'رگال فرش در لحظه ساخته می‌شود',
    'لینک رگال آماده استفاده است',
    'صفحه تایید با دو گزینه نمایش داده می‌شود:',
  ],
  step_5_options: ['ایجاد پروژه جدید', 'اطلاعات پروژه'],

  // مدیریت پروژه‌ها
  title_project_management: 'مدیریت پروژه‌های رگال فرش',
  header_project_list: 'مشاهده لیست پروژه‌ها',
  project_list_description:
    'از منوی سایدبار، گزینه "پروژه‌ها" را انتخاب کرده و سپس، دسته‌بندی رگال را تعیین کنید. در این صفحه موارد زیر نمایش داده می‌شود:',
  project_list_items: [
    'نام پروژه',
    'تاریخ ایجاد',
    'تعداد مشاهده',
    'لینک AR (قابل کپی با یک کلیک)',
    'منوی سه نقطه برای دسترسی به گزینه‌های بیشتر',
  ],
  project_list_image: 'https://bytebase.armogroup.tech/api/v1/files/public/guideline-regal-5.webp',

  // جزئیات و مدیریت پروژه
  header_project_details: 'جزئیات و مدیریت پروژه',
  project_details_description:
    'با کلیک بر روی نام هر پروژه، به صفحه جزئیات پروژه هدایت می‌شوید که شامل:',
  project_details_items: [
    'لینک پروژه (قابل کپی)',
    'QR Code (قابل دانلود برای چاپ در کاتالوگ)',
    'گزارش عملکرد: آمار کامل مارکتینگی شامل:',
  ],
  project_performance_items: ['تعداد مشاهده', 'مدت زمان بازدید', 'نوع مرورگرهای استفاده شده'],
  project_details_image: null, // برای رگال عکس ندارد

  // ویرایش پروژه (اختیاری - فقط برای فرش)
  header_project_edit: null,
  project_edit_description: null,
  project_edit_options: null,
  project_edit_image: null,

  // نکات بهینه‌سازی رگال
  title_optimization: 'نکات بهینه‌سازی رگال',
  header_carpet_selection: 'انتخاب فرش‌های مناسب:',
  carpet_selection_tips: [
    'ترجیحاً فرش‌هایی با سایز یکسان',
    'تنوع در رنگ و طرح',
    'کیفیت مشابه و قیمت‌گذاری منطقی',
  ],

  header_content_organization: 'سازمان‌دهی محتوا:',
  content_organization_tips: [
    'ترتیب فرش‌ها از پرفروش به کم‌فروش',
    'گروه‌بندی براساس رنگ یا سبک',
    'قرار دادن فرش‌های جذاب در ابتدا',
  ],

  // مزایای رگال فرش
  title_advantages: 'مزایای رگال فرش نسبت به سایر روش‌ها',
  header_key_differences: 'تفاوت‌های کلیدی با سرویس فرش معمولی',
  comparison_table: {
    headers: ['ویژگی', 'سرویس فرش معمولی', 'رگال فرش'],
    rows: [
      ['تعداد محصول', '10 عکس حداکثر', '50 عکس حداکثر'],
      ['لینک محصولات', 'هر فرش لینک جداگانه', 'همه در یک لینک'],
      ['نحوه نمایش', 'تک‌تک قابل دسترسی', 'ورق زدن یکپارچه'],
      ['کاربرد', 'فرش‌های مستقل', 'مجموعه و کالکشن'],
      ['تجربه کاربری', 'انتخاب مستقیم محصول', 'مرور و مقایسه'],
    ],
  },

  title_unique_experience: 'تجربه کاربری منحصر به فرد:',
  regal_experience_title: 'در رگال فرش:',
  regal_experience: [
    'مشاهده فرش‌ها در کنار یکدیگر',
    'ورق زدن مانند رگال فیزیکی',
    'انتخاب و مشاهده فوری با واقعیت افزوده',
    'احساس حضور در فروشگاه واقعی',
  ],

  showroom_experience_title: 'در شوروم مجازی:',
  showroom_experience: [
    'نمایش لیست‌وار محصولات',
    'کلیک جداگانه برای هر محصول',
    'مشاهده اطلاعات تکمیلی (نام، سایز)',
  ],

  title_business_applications: 'کاربردهای تجاری:',
  business_applications: [
    {
      title: 'فروشگاه‌های فیزیکی:',
      description: 'جایگزین رگال‌های حجیم',
    },
    {
      title: 'نمایشگاه‌ها:',
      description: 'نمایش کل کالکشن در فضای محدود',
    },
    {
      title: 'فروش آنلاین:',
      description: 'تجربه نزدیک به خرید حضوری',
    },
    {
      title: 'ارائه به مشتریان:',
      description: 'نمایش حرفه‌ای مجموعه محصولات',
    },
  ],

  title_economic_advantages: 'مزایای اقتصادی:',
  economic_advantages: [
    {
      title: 'صرفه‌جویی در فضا:',
      description: 'عدم نیاز به رگال فیزیکی بزرگ',
    },
    {
      title: 'کاهش هزینه حمل:',
      description: 'در نمایشگاه‌ها و رویدادها',
    },
    {
      title: 'افزایش فروش:',
      description: 'تصمیم‌گیری آسان‌تر مشتری',
    },
    {
      title: 'مدیریت آسان:',
      description: 'بروزرسانی فوری محصولات',
    },
  ],

  // مقایسه عملکرد و انتخاب بهینه
  title_performance_comparison: 'مقایسه عملکرد و انتخاب بهینه',
  header_when_to_use: 'چه زمانی از رگال فرش استفاده کنیم؟',

  suitable_for_title: 'مناسب برای:',
  suitable_for: [
    'کالکشن‌های همگن (سایز یکسان)',
    'نمایش تنوع رنگی یک طرح',
    'ارائه مجموعه فصلی یا موضوعی',
    'فضاهای نمایشگاهی محدود',
    'تجربه مشابه خرید حضوری',
  ],

  not_suitable_for_title: 'مناسب نیست برای:',
  not_suitable_for: [
    'فرش‌هایی با سایزهای کاملاً متفاوت',
    'محصولات مستقل بدون ارتباط موضوعی',
    'زمانی که نیاز به جزئیات هر محصول دارید',
  ],

  title_service_selection_guide: 'راهنمای انتخاب سرویس مناسب:',
  service_selection_guide: [
    {
      scenario: 'فرش‌های مستقل مختلف',
      recommendation: 'سرویس فرش معمولی',
      link: '/guidelines/carpet',
    },
    {
      scenario: 'مجموعه کاملاً متنوع',
      recommendation: 'شوروم مجازی',
      link: 'https://showroom.armogroup.tech/31219912-c659-46bc-9d4c-2dc23a0c6b6c/',
    },
    {
      scenario: 'کالکشن همگن',
      recommendation: 'رگال فرش',
      link: '/guidelines/regal',
    },
    {
      scenario: 'پیشنهاد هوشمند',
      recommendation: 'مشاور هوش مصنوعی',
      link: 'https://recommender-carpet.armogroup.tech/',
    },
  ],

  // سرویس‌های پیشرفته (اختیاری - فقط برای فرش)
  title_advanced_services: null,
  ai_advisor_title: null,
  ai_advisor_scenario_title: null,
  ai_advisor_scenario: null,
  ai_advisor_how_title: null,
  ai_advisor_steps: null,
  ai_advisor_investment: null,
  ai_advisor_test_link: null,
  virtual_showroom_title: null,
  virtual_showroom_description: null,
  virtual_showroom_usecases_title: null,
  virtual_showroom_usecases: null,
  virtual_showroom_features_title: null,
  virtual_showroom_features: null,
  virtual_showroom_investment: null,
  virtual_showroom_demo_link: null,
  regal_title: null,
  regal_when_title: null,
  regal_when: null,
  regal_difference_title: null,
  regal_difference: null,
  regal_specs_title: null,
  regal_specs: null,
  regal_investment: null,
  regal_guide_link: null,

  // سوالات متداول
  title_faq: 'سوالات متداول',
  faq: [
    {
      question: 'آیا می‌توانم فرش‌هایی با سایزهای مختلف در یک رگال قرار دهم؟',
      answer:
        'خیر، تمام فرش‌های یک رگال باید سایز یکسان داشته باشند چرا که سایز انتخاب شده برای کل پروژه اعمال می‌شود.',
    },
    {
      question: 'تفاوت رگال فرش با شوروم مجازی چیست؟',
      answer:
        'در شوروم مجازی، فرش‌ها به صورت فهرست نمایش داده می‌شوند. در رگال فرش، امکان ورق زدن در محیط سه‌بعدی وجود دارد.',
    },
    {
      question: 'آیا می‌توانم بعد از ساخت رگال، فرش جدید اضافه کنم؟',
      answer: 'متأسفانه امکان ویرایش محتوای رگال پس از ساخت وجود ندارد. باید رگال جدید بسازید.',
    },
    {
      question: 'چرا عکس کاور الزاماً نباید فرش باشد؟',
      answer:
        'عکس کاور نماینده کل رگال است و می‌تواند لوگوی برند یا عکس کلی از کالکشن باشد تا رگال را بهتر معرفی کند.',
    },
    {
      question: 'آیا هزینه اضافی برای رگال فرش دارد؟',
      answer:
        'خیر، اگر پلن فعال در دسته‌بندی فرش دارید، می‌توانید بدون هزینه اضافی از رگال فرش استفاده کنید.',
    },
  ],

  // پشتیبانی
  title_support: 'پشتیبانی و تماس',
  support_description:
    'برای راهنمایی بیشتر در انتخاب نوع سرویس مناسب یا رفع مشکلات فنی، می‌توانید با تیم پشتیبانی آرمو تماس بگیرید.',

  // دکمه تماس با ما
  contact_us_button: {
    text: 'تماس با ما',
    url: 'https://armogroup.tech/contact-us/',
    type: 'button',
  },

  // لینک تست نمونه رگال
  demo_link: {
    text: '🔗 تست نمونه رگال',
    url: 'https://regal-demo.armogroup.tech/', // URL نمونه - باید با لینک واقعی جایگزین شود
    type: 'link',
  },

  // تصاویر
  images: [
    'https://bytebase.armogroup.tech/api/v1/files/public/guideline-regal-1.webp',
    'https://bytebase.armogroup.tech/api/v1/files/public/guideline-regal-2.webp',
    'https://bytebase.armogroup.tech/api/v1/files/public/guideline-regal-3.webp',
    'https://bytebase.armogroup.tech/api/v1/files/public/guideline-regal-4.webp',
    'https://bytebase.armogroup.tech/api/v1/files/public/guideline-regal-5.webp',
    'https://bytebase.armogroup.tech/api/v1/files/public/guideline-regal-6.webp',
  ],
};
