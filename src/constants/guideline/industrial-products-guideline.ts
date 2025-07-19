// src/constants/guideline/industrial-products-guideline.ts

export const industrial_products_guideline = {
  title: 'راهنمای کامل سرویس محصولات صنعتی',
  subtitle: 'معرفی سرویس واقعیت افزوده محصولات صنعتی',
  description:
    'سرویس محصولات صنعتی برای ایجاد تجربه واقعیت افزوده انواع تجهیزات، ماشین‌آلات و محصولات صنعتی طراحی شده است. این سرویس به کسب‌وکارهای فعال در حوزه صنعتی امکان ارائه تجربه‌ای منحصر به فرد و حرفه‌ای از محصولات خود را می‌دهد.',

  // ویژگی منحصر به فرد
  title_feature: 'ویژگی منحصر به فرد آرمو:',
  unique_feature:
    'تنها با آپلود فایل سه‌بعدی محصولات صنعتی می‌توانید تجربه واقعیت افزوده بسازید و مشتریان صنعتی قبل از خرید، محصول را در محیط واقعی کارخانه یا محل نصب مشاهده کنند.',

  // قابلیت‌های کلیدی
  title_key_features: 'قابلیت‌های کلیدی سرویس:',
  key_features: [
    { title: 'نمای 360 درجه:', description: 'امکان بررسی دقیق محصول از تمام جهات' },
    { title: 'واقعیت افزوده:', description: 'مشاهده محصول در محیط واقعی کارخانه یا محل نصب' },
    { title: 'دسترسی تحت وب:', description: 'بدون نیاز به نصب اپلیکیشن' },
  ],

  // تفاوت با سایر سرویس‌ها (اختیاری)
  title_difference: null,
  differences: null,

  // کاربردهای عملی
  title_usecases: 'مناسب برای:',
  usecases: [
    'ماشین‌آلات صنعتی: دستگاه‌های تولید، پرس، دریل، تراش، فرز',
    'تجهیزات سنگین: کمپرسور، پمپ، موتور، ژنراتور',
    'ابزارآلات صنعتی: جرثقیل، لیفتراک، تجهیزات جوشکاری',
    'سیستم‌های صنعتی: خطوط تولید، کانوایر، سیستم‌های هوا و گاز',
    'قطعات و اجزاء: کاتالوگ قطعات یدکی، اجزاء مکانیکی',
  ],

  title_guideline: 'راهنمای گام به گام ساخت پروژه محصولات صنعتی',

  // مرحله 1
  header_step_1: 'مرحله 1: انتخاب دسته‌بندی',
  step_1: [
    'از منوی دسته‌بندی‌ها، گزینه محصولات صنعتی را انتخاب کنید',
    'دکمه ادامه فعال شده و آن را کلیک کنید',
  ],
  step_1_image: 'https://bytebase.armogroup.tech/api/v1/files/public/guideline-industry-1.webp',

  // مرحله 2
  header_step_2: 'مرحله 2: اطلاعات پروژه',
  title_step_2: null,

  // نام‌گذاری پروژه
  title_step_2_naming: 'نام‌گذاری پروژه',
  step_2_naming_restrictions: 'محدودیت‌های نام‌گذاری:',
  step_2_naming_rules: [
    'فقط حروف و اعداد انگلیسی استفاده کنید',
    'کاراکترهای غیر مجاز: فاصله، نقطه (.)، پرانتز ()، اسلش (/)، آندرلاین (_)، دو نقطه (:)، نقطه ویرگول (;)',
    'پیشنهاد: استفاده از کد محصول یا مدل',
  ],
  step_2_naming_examples_title: 'مثال نام‌های صحیح:',
  step_2_naming_examples: ['compressor2024XL', 'industrialpress', 'weldingmachine'],

  title_step_2_cover: 'آپلود عکس کاور پروژه',
  step_2_cover_description:
    'این عکس اولین چیزی است که مشتری هنگام استفاده از سرویس AR می‌بیند. ابتدا این عکس نمایش داده می‌شود، سپس مدل سه‌بعدی لود شده و نهایتاً با انتخاب دکمه "مشاهده محصول در محیط" امکان واقعیت افزوده فراهم می‌شود.',
  step_2_cover_options: null,
  step_2_cover_specs_title: 'مشخصات فنی عکس کاور:',
  step_2_cover_specs: [
    'فرمت: JPG یا PNG',
    'حجم: کمتر از 1 مگابایت',
    'محتوا: می‌تواند هر چیزی باشد - عکس محصول، لوگوی برند، یا تصویر نمادین',
    'روش آپلود: Drag & Drop یا کلیک روی کارت',
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
  step_2_image: 'https://bytebase.armogroup.tech/api/v1/files/public/guideline-industry-2.webp',

  // مرحله 3
  header_step_3: 'مرحله 3: آپلود فایل سه‌بعدی',
  title_step_3: 'مشخصات فنی فایل سه‌بعدی',

  // نام‌گذاری (اختیاری - فقط برای فرش)
  title_step_3_naming: null,
  step_3_naming: null,
  title_step_3_upload: 'الزامات فنی:',
  step_3_upload_notes: [
    'فرمت: GLB (اجباری)',
    'حجم: کمتر از 15 مگابایت',
    'تکسچرها: حتماً PBR (Physically Based Rendering)',
    'سایز مدل: مطابق با ابعاد واقعی محصول در فایل سه‌بعدی',
    'جانمایی: مطابق با فایل نمونه آرمو',
  ],
  title_step_3_method: 'نحوه آپلود:',
  step_3_method: [
    'فایل GLB را با Drag & Drop بکشید یا روی کارت کلیک کرده و فایل مورد نظر را انتخاب کنید.',
    'دانلود فایل نمونه مدل سه‌بعدی محصولات صنعتی',
  ],
  step_3_image: 'https://bytebase.armogroup.tech/api/v1/files/public/guideline-industry-3.webp',

  // مرحله 4
  header_step_4: 'مرحله 4: تکمیل پروژه',

  // ظرفیت (اختیاری - فقط برای رگال)
  title_step_4_capacity: null,
  step_4_capacity: null,
  title_step_4_specs: null,
  step_4_specs: null,

  step_4: [
    'پس از آپلود موفق فایل سه‌بعدی، دکمه "ادامه" فعال می‌شود',
    'با کلیک روی دکمه ادامه، پروژه در لحظه ساخته می‌شود',
    'صفحه تایید با دو گزینه نمایش داده می‌شود:',
  ],
  step_4_options: ['ایجاد پروژه جدید', 'اطلاعات پروژه'],
  step_4_image: 'https://bytebase.armogroup.tech/api/v1/files/public/guideline-industry-4.webp',

  // مرحله 5 (اختیاری - فقط برای رگال)
  header_step_5: null,
  title_step_5_upload: null,
  step_5_upload_method: null,
  title_step_5_finalize: null,
  step_5_finalize: null,
  step_5_options: null,

  // مدیریت پروژه‌ها
  title_project_management: 'مدیریت پروژه‌های محصولات صنعتی',
  header_project_list: 'مشاهده لیست پروژه‌ها',
  project_list_description:
    'از منوی سایدبار، گزینه "پروژه‌ها" را انتخاب کرده و سپس، دسته‌بندی محصولات صنعتی را تعیین کنید. در این صفحه اطلاعات زیر نمایش داده می‌شود:',
  project_list_items: [
    'نام پروژه',
    'تاریخ ایجاد',
    'تعداد مشاهده',
    'لینک AR (قابل کپی با یک کلیک)',
    'منوی سه نقطه برای دسترسی به گزینه‌های بیشتر',
  ],
  project_list_image:
    'https://bytebase.armogroup.tech/api/v1/files/public/guideline-industry-5.webp',

  // جزئیات و مدیریت پروژه
  header_project_details: 'جزئیات و مدیریت پروژه',
  project_details_description:
    'با کلیک بر روی نام هر پروژه، به صفحه جزئیات پروژه هدایت می‌شوید که شامل:',
  project_details_items: [
    'لینک پروژه (قابل کپی)',
    'QR Code (قابل دانلود برای چاپ در کاتالوگ)',
    'دکمه گزارش عملکرد برای مشاهده آمار مارکتینگی:',
  ],
  project_performance_items: ['تعداد مشاهده', 'مدت زمان بازدید', 'نوع مرورگرهای استفاده شده'],
  project_details_image:
    'https://bytebase.armogroup.tech/api/v1/files/public/guideline-industry-6.webp',

  // ویرایش پروژه
  header_project_edit: 'ویرایش پروژه',
  project_edit_description: 'از منوی سه نقطه کنار هر پروژه، می‌توانید:',
  project_edit_options: [
    {
      title: 'تغییر نام پروژه',
      description: null,
    },
    {
      title: 'اضافه کردن لینک فروشگاه:',
      description: [
        'این لینک به عنوان دکمه "مشاهده در فروشگاه" در صفحه AR نمایش داده می‌شود',
        'مشتری مستقیماً به صفحه خرید محصول هدایت می‌شود',
        'برای افزایش نرخ تبدیل فروش ضروری است',
      ],
    },
  ],
  project_edit_image: null,

  // نکات بهینه‌سازی
  title_optimization: 'نکات بهینه‌سازی برای محصولات صنعتی',
  header_carpet_selection: 'انتخاب عکس کاور مؤثر',
  carpet_selection_tips: [
    'عکس با کیفیت از محصول در محیط کاری',
    'تصویر محصول در حال کار (برای نمایش عملکرد)',
    'لوگوی برند با طراحی حرفه‌ای',
    'عکس محصول با کیفیت صنعتی بالا',
  ],

  header_content_organization: 'بهینه‌سازی مدل سه‌بعدی',
  content_organization_tips: [
    'جزئیات قابل مشاهده: دکمه‌ها، نمایشگرها، کنترل‌ها و اتصالات',
    'تکسچرهای PBR: برای نمایش واقعی‌تر فلزات، پلاستیک‌ها و مواد صنعتی',
    'سایز دقیق: مطابق ابعاد واقعی محصول (بسیار مهم در صنعت)',
    'بهینه‌سازی فایل: کاهش حجم بدون از دست دادن کیفیت و جزئیات فنی',
  ],

  // مزایای سرویس
  title_advantages: 'مزایا و فواید سرویس محصولات صنعتی',
  header_key_differences: 'فواید کسب‌وکاری',
  comparison_table: null,
  title_unique_experience: 'برای تولیدکنندگان و فروشندگان:',
  regal_experience_title: '1. کاهش هزینه‌های نمایشگاهی:',
  regal_experience: [
    'عدم نیاز به حمل ماشین‌آلات سنگین به نمایشگاه‌ها',
    'امکان نمایش محصولات حجیم در فضای محدود',
    'کاهش هزینه‌های حمل و نقل و بسته‌بندی',
  ],

  showroom_experience_title: '2. افزایش کیفیت ارائه:',
  showroom_experience: [
    'نمایش جزئیات فنی قابل مشاهده',
    'امکان بررسی محصول از زوایای مختلف',
    'ارائه حرفه‌ای در جلسات B2B',
  ],

  title_business_applications: 'کاربردهای تخصصی در صنعت:',
  business_applications: [
    {
      title: 'نمایشگاه‌ها و رویدادهای صنعتی:',
      description: 'نمایش محصولات سنگین بدون نیاز به حمل فیزیکی',
    },
    {
      title: 'جلسات فروش B2B:',
      description: 'ارائه حرفه‌ای: استفاده از تبلت یا لپ‌تاپ',
    },
    {
      title: 'کاتالوگ‌های دیجیتال:',
      description: 'تعامل با مخاطب: تجربه فراتر از عکس ساده',
    },
    {
      title: 'آموزش و آشنایی:',
      description: 'تعلیم کارکنان: آشنایی با تجهیزات جدید',
    },
  ],

  title_economic_advantages: 'بازگشت سرمایه (ROI) برای کسب‌وکارهای صنعتی:',
  economic_advantages: [
    {
      title: 'کاهش هزینه‌ها:',
      description: 'حمل و نقل تجهیزات سنگین: تا 70% کاهش',
    },
    {
      title: 'افزایش فروش:',
      description: 'افزایش 35% در میزان درگیری مشتری',
    },
    {
      title: 'بهبود تجربه مشتری:',
      description: 'کاهش 60% در زمان تصمیم‌گیری',
    },
    {
      title: 'گسترش بازار:',
      description: 'دسترسی به مشتریان بین‌المللی',
    },
  ],

  title_performance_comparison: 'فایل سه‌بعدی ندارید؟',
  header_when_to_use: 'راه‌حل‌های موجود:',

  suitable_for_title: '✅ راه‌حل 1: سفارش به تیم متخصص آرمو',
  suitable_for: [
    'تیم متخصص مدل‌سازی سه‌بعدی',
    'رعایت کامل استانداردهای آرمو',
    'کیفیت تضمین شده',
    'سازگاری کامل با سیستم',
  ],

  not_suitable_for_title: '✅ راه‌حل 2: تولید با تیم داخلی',
  not_suitable_for: [
    'فایل‌های موجود را مطابق استانداردهای آرمو تنظیم کنید',
    'در اکانت آرمو آپلود کنید',
    'بدون درگیری اضافی از سرویس استفاده کنید',
    'کنترل کامل بر کیفیت و جزئیات',
  ],

  title_service_selection_guide: null,
  service_selection_guide: null,

  // سرویس‌های پیشرفته
  title_advanced_services: null,

  // مشاور هوش مصنوعی (اختیاری - فقط برای فرش)
  ai_advisor_title: null,
  ai_advisor_scenario_title: null,
  ai_advisor_scenario: null,
  ai_advisor_how_title: null,
  ai_advisor_steps: null,
  ai_advisor_investment: null,
  ai_advisor_test_link: null,

  // شوروم مجازی (اختیاری - فقط برای فرش)
  virtual_showroom_title: null,
  virtual_showroom_description: null,
  virtual_showroom_usecases_title: null,
  virtual_showroom_usecases: null,
  virtual_showroom_features_title: null,
  virtual_showroom_features: null,
  virtual_showroom_investment: null,
  virtual_showroom_demo_link: null,

  // رگال (اختیاری - فقط برای فرش)
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
      question: 'آیا می‌توانم تجهیزات سنگین و حجیم را نمایش دهم؟',
      answer:
        'بله، این سرویس ویژه برای تجهیزات صنعتی سنگین طراحی شده که حمل فیزیکی آنها دشوار است.',
    },
    {
      question: 'آیا برای ماشین‌آلات پیچیده هم می‌توانم استفاده کنم؟',
      answer: 'بله، تیم آرمو تجربه کار با انواع ماشین‌آلات پیچیده صنعتی را دارد.',
    },
    {
      question: 'فایل سه‌بعدی ندارم و نمی‌دانم چگونه تهیه کنم؟',
      answer: 'تیم آرمو این خدمات را ارائه می‌دهد. هزینه و زمان براساس پیچیدگی محصول تعیین می‌شود.',
    },
    {
      question: 'آیا می‌توانم بعد از ساخت پروژه، فایل سه‌بعدی را تغییر دهم؟',
      answer: 'خیر، امکان تغییر فایل سه‌بعدی پس از ساخت پروژه وجود ندارد. باید پروژه جدید بسازید.',
    },
    {
      question: 'آیا فایل‌های CAD موجود من قابل استفاده است؟',
      answer:
        'فایل‌های CAD نیاز به تبدیل به فرمت GLB دارند. تیم آرمو می‌تواند این کار را انجام دهد.',
    },
    {
      question: 'برای نمایشگاه‌های صنعتی چگونه استفاده کنم؟',
      answer:
        'می‌توانید QR Code را در غرفه، استند، یا بروشورهای خود چاپ کنید و بازدیدکنندگان را به تجربه AR هدایت کنید.',
    },
    {
      question: 'آیا این سرویس برای آموزش کارکنان مناسب است؟',
      answer: 'بله، کارکنان می‌توانند با تجهیزات جدید آشنا شوند و نحوه کار و اجزاء آن را بیاموزند.',
    },
  ],

  // پشتیبانی
  title_support: 'پشتیبانی و تماس',
  support_description:
    'برای راهنمایی بیشتر در آماده‌سازی فایل‌های سه‌بعدی محصولات صنعتی، تبدیل فایل‌های CAD، انتخاب بهترین روش نمایش تجهیزات یا رفع مشکلات فنی، می‌توانید با تیم پشتیبانی آرمو تماس بگیرید.',

  // دکمه تماس با ما
  contact_us_button: {
    text: 'تماس با ما',
    url: 'https://armogroup.tech/contact-us/',
    type: 'button',
  },

  // لینک تست نمونه
  demo_link: {
    text: '🔗 دانلود فایل نمونه مدل سه‌بعدی محصولات صنعتی',
    url: 'https://bytebase.armogroup.tech/api/v1/files/public/guideline-industry.glb',
    type: 'link',
  },

  // تصاویر
  images: [
    'https://bytebase.armogroup.tech/api/v1/files/public/guideline-industry-1.webp',
    'https://bytebase.armogroup.tech/api/v1/files/public/guideline-industry-2.webp',
    'https://bytebase.armogroup.tech/api/v1/files/public/guideline-industry-3.webp',
    'https://bytebase.armogroup.tech/api/v1/files/public/guideline-industry-4.webp',
    'https://bytebase.armogroup.tech/api/v1/files/public/guideline-industry-5.webp',
    'https://bytebase.armogroup.tech/api/v1/files/public/guideline-industry-6.webp',
  ],
};
