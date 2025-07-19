// src/constants/guideline/carpet-guideline.ts

export const carpet_guideline = {
  title: 'راهنمای کامل سرویس فرش',
  subtitle: 'معرفی سرویس واقعیت افزوده فرش',
  description:
    'سرویس واقعیت افزوده فرش، پرمخاطب‌ترین سرویس آرمو است که به کاربران امکان ایجاد تجربه واقعیت افزوده برای فرش‌های خود را می‌دهد',
  title_feature: 'ویژگی منحصر به فرد آرمو:',
  unique_feature:
    'تنها با آپلود عکس فرش‌ها می‌توانید پروژه واقعیت افزوده بسازید و نیازی به مدلسازی سه‌بعدی ندارید.',
  title_key_features: 'قابلیت‌های کلیدی سرویس:',
  key_features: [
    { title: 'دسترسی تحت وب:', description: 'بدون نیاز به نصب اپلیکیشن، اجرای مستقیم در مرورگر' },
    { title: 'ساخت خودکار و آنی:', description: 'تبدیل عکس‌ها به AR در کمتر از چند ثانیه' },
    {
      title: 'تنظیم دقیق ابعاد:',
      description: 'پشتیبانی از فرش‌های مستطیلی و دایره‌ای با سایز دلخواه',
    },
  ],

  title_guideline: 'راهنمای گام به گام ساخت پروژه فرش:',

  // مرحله 1
  header_step_1: 'مرحله 1: انتخاب دسته‌بندی',
  step_1: [
    'از منوی دسته‌بندی‌ها، گزینه فرش را انتخاب کنید',
    'دکمه ادامه فعال شده و آن را کلیک کنید',
  ],
  step_1_image: 'https://bytebase.armogroup.tech/api/v1/files/public/guideline-carpet-1.webp',

  // مرحله 2
  header_step_2: 'مرحله 2: انتخاب شکل و سایز فرش',
  title_step_2: 'انتخاب شکل فرش:',

  // فرش مستطیلی
  subtitle_step_2_1: 'فرش مستطیلی:',
  description_step_2_1: 'سایزهای پیش‌فرض:',
  rectangular_sizes: [
    { name: '6 متری', dimensions: '200 × 300' },
    { name: '9 متری', dimensions: '250 × 350' },
    { name: '12 متری', dimensions: '300 × 400' },
    { name: 'سایز دلخواه', dimensions: null },
  ],

  // فرش دایره‌ای
  subtitle_step_2_2: 'فرش دایره‌ای:',
  description_step_2_2: 'سایزهای پیش‌فرض:',
  circular_sizes: [
    { name: '1متری', dimensions: '100 سانتی‌متر' },
    { name: '1.5متری', dimensions: '150 سانتی‌متر' },
    { name: '3 متری', dimensions: '200 سانتی‌متر' },
    { name: 'سایز دلخواه', dimensions: null },
  ],

  // نکات مهم مرحله 2
  title_step_2_notes: 'نکات مهم وارد کردن ابعاد:',
  step_2_notes: [
    'طول و عرض را دقیقاً مطابق تصویر نمونه وارد کنید. اگر برعکس وارد کنید، تصویر بدشکل می‌شود',
    'برای فرش دایره‌ای، فایل PNG با پس‌زمینه شفاف (Transparent) اجباری است.',
    'برای فرش دایره‌ای، به جای طول و عرض، فقط قطر را وارد کنید',
    'پس از ساخت پروژه، امکان تغییر ابعاد وجود ندارد',
    'سایز انتخاب شده برای هر 10 عکس اعمال می‌شود',
  ],
  step_2_image: 'https://bytebase.armogroup.tech/api/v1/files/public/guideline-carpet-2.webp',

  // مرحله 3
  header_step_3: 'مرحله 3: نام‌گذاری و آپلود عکس محصولات',
  title_step_3_naming: 'نکته کلیدی نام‌گذاری:',
  step_3_naming: [
    'نام عکس = نام پروژه در سیستم',
    'بهتر است کد محصول را به عنوان نام انتخاب کنید',
    'این نام در لیست پروژه‌ها و شوروم مجازی نمایش داده می‌شود',
    'محدودیتی برای نام فارسی یا انگلیسی نیست',
  ],

  title_step_3_upload: 'نکات مهم برای آپلود عکس:',
  step_3_upload_notes: [
    'حداکثر 10 عکس به صورت همزمان قابل آپلود است',
    'فرمت فایل: فقط JPG یا PNG',
    'حجم فایل: کمتر از 1 مگابایت',
    'نمای عکس: کاملاً روبرو و بدون هیچ حاشیه اضافی (عکس از دکور خانه نگذارید - فقط نمای مستقیم فرش)',
  ],

  title_step_3_method: 'نحوه آپلود:',
  step_3_method: [
    'عکس‌ها را با Drag & Drop بکشید یا روی کارت کلیک کرده و فایل مورد نظر را انتخاب کنید.',
    'پس از انتخاب، علامت ضربدر برای حذف هر عکس نمایش داده می‌شود',
    'دکمه "حذف همه" برای پاک کردن تمام انتخاب‌ها',
  ],
  step_3_image: 'https://bytebase.armogroup.tech/api/v1/files/public/guideline-carpet-3.webp',

  // مرحله 4
  header_step_4: 'مرحله 4: تکمیل پروژه',
  step_4: [
    'روی دکمه "آپلود" کلیک کنید',
    'پس از آپلود موفق، دکمه "ادامه" فعال می‌شود',
    'پروژه در لحظه ساخته می‌شود',
    'صفحه تایید با دو گزینه نمایش داده می‌شود:',
  ],
  step_4_options: ['ایجاد پروژه جدید', 'اطلاعات پروژه'],

  // مدیریت پروژه‌ها
  title_project_management: 'مدیریت پروژه‌های فرش',
  header_project_list: 'مشاهده لیست پروژه‌ها',
  project_list_description:
    'از منوی سایدبار، گزینه "پروژه‌ها" را انتخاب کرده و سپس، دسته‌بندی فرش را تعیین کنید. در این صفحه موارد زیر نمایش داده می‌شود:',
  project_list_items: [
    'نام پروژه (و سایز انتخاب شده)',
    'تاریخ ایجاد',
    'تعداد مشاهده',
    'لینک AR (قابل کپی با یک کلیک)',
    'منوی سه نقطه برای دسترسی به گزینه‌های بیشتر',
  ],
  project_list_image: 'https://bytebase.armogroup.tech/api/v1/files/public/guideline-carpet-4.webp',

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
  project_details_image:
    'https://bytebase.armogroup.tech/api/v1/files/public/guideline-carpet-5.webp',

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
        'مشتری مستقیماً به صفحه خرید هدایت می‌شود',
        'برای سرویس مشاور هوش مصنوعی ضروری است',
      ],
    },
  ],
  project_edit_image: 'https://bytebase.armogroup.tech/api/v1/files/public/guideline-carpet-6.webp',

  // سرویس‌های پیشرفته
  title_advanced_services: 'سرویس‌های پیشرفته و تکمیلی',

  // مشاور هوش مصنوعی
  ai_advisor_title: 'مشاور هوش مصنوعی - انقلاب در فروش آنلاین',
  ai_advisor_scenario_title: 'تصور کنید مشتری شما:',
  ai_advisor_scenario: [
    'فقط یک عکس از اتاقش می‌گیرد',
    'در عرض چند ثانیه، فرش‌های ایده‌آل پیشنهاد می‌شود',
    'هر پیشنهاد را با واقعیت افزوده در منزلش می‌بیند',
    'مطمئن از انتخابش، خرید را نهایی می‌کند',
  ],

  ai_advisor_how_title: 'چگونه کار می‌کند؟',
  ai_advisor_steps: [
    {
      title: 'آپلود عکس:',
      description: 'مشتری عکس فضای مورد نظر می‌فرستد',
    },
    {
      title: 'تحلیل هوشمند:',
      description: 'سیستم بررسی می‌کند:',
      items: [
        'پالت رنگی غالب',
        'سبک دکوراسیون (مدرن، کلاسیک، مینیمال و ...)',
        'نوع و رنگ مبلمان',
        'شدت نور محیط',
        'ابعاد تقریبی فضا',
      ],
    },
    {
      title: 'پیشنهاد هوشمند:',
      description: 'از میان محصولات شما، بهترین گزینه‌ها انتخاب می‌شود',
    },
    {
      title: 'تست واقعیت افزوده:',
      description: 'مشتری هر پیشنهاد را در فضای واقعی می‌بیند',
    },
  ],
  ai_advisor_investment:
    'سرمایه‌گذاری: نیاز به پلن فعال واقعیت افزوده + تکمیل لینک‌های فروشگاه + پرداخت هزینه فعال‌سازی',
  ai_advisor_test_link: {
    text: '🔗 تست مشاور هوش مصنوعی',
    url: 'https://recommender-carpet.armogroup.tech/',
    type: 'link',
  },

  // شوروم مجازی
  virtual_showroom_title: 'شوروم مجازی - نمایشگاه دیجیتال محصولات',
  virtual_showroom_description:
    'این سرویس چیست؟ شوروم مجازی، تمام فرش‌های شما را در یک نمایشگاه دیجیتال زیبا گردآوری می‌کند. مانند یک کاتالوگ آنلاین تعاملی که هر محصول قابلیت مشاهده با واقعیت افزوده دارد.',

  virtual_showroom_usecases_title: 'کاربردهای عملی:',
  virtual_showroom_usecases: [
    {
      title: 'برای کسب‌وکارهای اینستاگرامی:',
      description: 'قرار دادن در بیو و استوری‌ها',
    },
    {
      title: 'نمایشگاه‌ها و رویدادها:',
      description: 'ارائه کل کالکشن بدون حمل فیزیکی محصولات',
    },
    {
      title: 'سایت‌های فروشگاهی:',
      description: 'به عنوان بخش "مشاهده با AR"',
    },
    {
      title: 'فروش B2B:',
      description: 'ارائه به خریداران عمده و نمایندگی‌ها',
    },
  ],

  virtual_showroom_features_title: 'ویژگی‌های منحصر به فرد:',
  virtual_showroom_features: [
    'بروزرسانی خودکار با اضافه/حذف محصولات',
    'نمایش اطلاعات کامل: عکس، نام، سایز',
    'دسترسی مستقیم به واقعیت افزوده هر محصول',
    'سازگار با تمام دستگاه‌ها',
  ],
  virtual_showroom_investment:
    'سرمایه‌گذاری: نیاز به پلن فعال واقعیت افزوده + پرداخت هزینه فعال‌سازی',
  virtual_showroom_demo_link: {
    text: '🔗 مشاهده نمونه شوروم مجازی',
    url: 'https://showroom.armogroup.tech/31219912-c659-46bc-9d4c-2dc23a0c6b6c/',
    type: 'link',
  },

  // رگال فرش
  regal_title: 'رگال فرش - نمایش مجموعه‌ای',
  regal_when_title: 'چه زمانی از رگال استفاده کنیم؟',
  regal_when: [
    'داشتن مجموعه‌ای از فرش‌ها با طرح‌های مختلف اما سایز یکسان',
    'نمایش کالکشن فصلی یا موضوعی (سنتی، مدرن، کودکانه و ...)',
    'ارائه چندین رنگ از یک طرح',
  ],

  regal_difference_title: 'تفاوت با سرویس‌های دیگر:',
  regal_difference: [
    {
      title: 'شوروم مجازی:',
      description: 'نمایش آلبوم‌وار جداگانه',
    },
    {
      title: 'رگال فرش:',
      description: 'امکان "ورق زدن" در محیط سه‌بعدی یکپارچه',
    },
  ],

  regal_specs_title: 'مشخصات فنی:',
  regal_specs: [
    'حداکثر 50 طرح در یک پروژه',
    'همه در یک لینک واحد',
    'تجربه مشابه رگال فیزیکی فروشگاه‌ها',
  ],
  regal_investment: 'سرمایه‌گذاری: شامل پلن فعال فرش (بدون نیاز به پرداخت هزینه اضافی)',
  regal_guide_link: {
    text: '🔗 لینک به صفحه راهنمای رگال',
    url: 'https://armogroup.tech/',
    type: 'link',
  },

  // سوالات متداول
  title_faq: 'سوالات متداول',
  faq: [
    {
      question: 'آیا می‌توانم پس از ساخت پروژه، ابعاد فرش را تغییر دهم؟',
      answer:
        'خیر، پس از ساخت پروژه امکان تغییر ابعاد وجود ندارد. لطفاً ابعاد را دقیقاً مطابق راهنما وارد کنید.',
    },
    {
      question: 'چرا عکس فرش دایره‌ای باید PNG با پس‌زمینه شفاف باشد؟',
      answer: 'برای نمایش صحیح فرش دایره‌ای در واقعیت افزوده، پس‌زمینه شفاف ضروری است.',
    },
    {
      question: 'لینک فروشگاه چه کاربردی دارد؟',
      answer:
        'این لینک در صفحه AR به عنوان دکمه "مشاهده در فروشگاه" نمایش داده می‌شود و مشتری را مستقیماً به صفحه خرید هدایت می‌کند.',
    },
    {
      question: 'آیا سرویس‌های تکمیلی ارزش سرمایه‌گذاری دارند؟',
      answer:
        'بله، به خصوص مشاور هوش مصنوعی که می‌تواند نرخ فروش شما را به طور قابل توجهی افزایش دهد.',
    },
  ],

  // پشتیبانی
  title_support: 'پشتیبانی و تماس',
  support_description:
    'برای راهنمایی بیشتر یا رفع مشکلات فنی، می‌توانید با تیم پشتیبانی آرمو تماس بگیرید.',

  // دکمه تماس با ما
  contact_us_button: {
    text: 'تماس با ما',
    url: 'https://armogroup.tech/contact-us/',
    type: 'button',
  },

  // تصاویر
  images: [
    'https://bytebase.armogroup.tech/api/v1/files/public/guideline-carpet-1.webp',
    'https://bytebase.armogroup.tech/api/v1/files/public/guideline-carpet-2.webp',
    'https://bytebase.armogroup.tech/api/v1/files/public/guideline-carpet-3.webp',
    'https://bytebase.armogroup.tech/api/v1/files/public/guideline-carpet-4.webp',
    'https://bytebase.armogroup.tech/api/v1/files/public/guideline-carpet-5.webp',
    'https://bytebase.armogroup.tech/api/v1/files/public/guideline-carpet-6.webp',
  ],
};
