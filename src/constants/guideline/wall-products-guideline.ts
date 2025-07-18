// src/constants/guideline/wall-products-guideline.ts

// Using same types from carpet-guideline
interface GuidelineStep {
  header: string;
  sections: GuidelineSection[];
  image?: string;
}

interface GuidelineSection {
  title?: string;
  content?: string | string[];
  type?: 'text' | 'list' | 'warning' | 'info' | 'success' | 'error' | 'chips' | 'table';
  items?: any[];
  subsections?: GuidelineSection[];
}

interface GuidelineService {
  title: string;
  description: string;
  features?: string[];
  image?: string;
  links?: {
    text: string;
    url: string;
    type: 'button' | 'link';
  }[];
}

interface GuidelineFAQ {
  question: string;
  answer: string;
}

export const wall_products_guideline = {
  // Header Information
  title: 'راهنمای کامل سرویس محصولات دیواری',
  subtitle: 'معرفی سرویس واقعیت افزوده محصولات دیواری',
  description:
    'سرویس محصولات دیواری برای محصولاتی طراحی شده که بر روی دیوار نصب می‌شوند. تفاوت کلیدی این سرویس با سایر دسته‌بندی‌ها در خروجی نهایی است؛ محصولات روی دیوار نمایش داده می‌شوند که تجربه واقعی‌تری برای مشتری ایجاد می‌کند.',

  // Unique Feature
  unique_feature: {
    title: 'تفاوت کلیدی با سایر دسته‌بندی‌ها:',
    content:
      'در خروجی نهایی واقعیت افزوده، محصولات روی دیوار قرار می‌گیرند و نمایش واقعی‌تری از نحوه نصب ارائه می‌دهند. این ویژگی مناسب برای محصولاتی است که فضای دیواری اشغال می‌کنند و ارتفاع نصب آنها قابل تنظیم است.',
    type: 'warning' as const,
  },

  // Key Features
  key_features: {
    title: 'قابلیت‌های کلیدی:',
    items: [
      {
        title: '🔄 نمای 360 درجه:',
        description: 'امکان بررسی دقیق محصول از تمام جهات',
      },
      {
        title: '🏠 واقعیت افزوده روی دیوار:',
        description: 'مشاهده محصول در موقعیت واقعی نصب',
      },
      {
        title: '🌐 دسترسی تحت وب:',
        description: 'بدون نیاز به نصب اپلیکیشن',
      },
    ],
  },

  // Suitable Products
  suitable_products: {
    title: 'مناسب برای:',
    items: [
      'تجهیزات آشپزخانه: سینک، هود، کابینت دیواری، مایکروویو دیواری',
      'وسایل نگهداری: شلف، قفسه، کمد دیواری، جاکتابی',
      'تزئینات: آینه، تابلو، ساعت دیواری، گلدان دیواری',
      'سیستم‌های خانگی: کولر دیواری، پکیج، تلویزیون',
      'تجهیزات حمام: کابینت، آینه، لوازم بهداشتی',
    ],
  },

  // Comparison with other services
  comparison: {
    title: 'تفاوت کلیدی با سایر دسته‌بندی‌ها',
    subtitle: 'در خروجی نهایی واقعیت افزوده:',
    sections: [
      {
        title: 'محصولات دیواری:',
        type: 'success' as const,
        items: [
          'محصول روی دیوار قرار می‌گیرد',
          'نمایش واقعی‌تر نحوه نصب',
          'مناسب برای محصولاتی که فضای دیواری اشغال می‌کنند',
          'ارتفاع نصب قابل تنظیم',
        ],
      },
      {
        title: 'سایر دسته‌بندی‌ها:',
        type: 'info' as const,
        items: ['محصولات روی زمین قرار می‌گیرند', 'مناسب برای مبلمان و لوازم قابل حمل'],
      },
    ],
  },

  // Step by Step Guide
  steps: [
    {
      header: 'مرحله 1: انتخاب دسته‌بندی',
      sections: [
        {
          type: 'list' as const,
          items: [
            'از منوی دسته‌بندی‌ها، گزینه محصولات دیواری را انتخاب کنید',
            'دکمه ادامه فعال شده و آن را کلیک کنید',
          ],
        },
      ],
      image: 'https://bytebase.armogroup.tech/api/v1/files/public/guideline-wall-mounted-1.webp',
    },
    {
      header: 'مرحله 2: اطلاعات پروژه',
      sections: [
        {
          title: 'نام‌گذاری پروژه',
          type: 'error' as const,
          content: 'محدودیت‌های نام‌گذاری:',
          items: [
            'فقط حروف و اعداد انگلیسی استفاده کنید',
            'کاراکترهای غیر مجاز: فاصله، نقطه (.)، پرانتز ()، اسلش (/)، آندرلاین (_)، دو نقطه (:)، نقطه ویرگول (;)',
            'پیشنهاد: استفاده از کد محصول',
          ],
        },
        {
          title: 'مثال نام‌های صحیح:',
          type: 'chips' as const,
          items: [{ name: 'kitchencabinet2024' }, { name: 'wallmirror' }, { name: 'kitchenhood' }],
        },
        {
          title: 'آپلود عکس کاور پروژه',
          type: 'info' as const,
          content:
            'نکته مهم: این عکس اولین چیزی است که مشتری هنگام استفاده از سرویس AR می‌بیند. ابتدا این عکس نمایش داده می‌شود، سپس مدل سه‌بعدی لود شده و نهایتاً با انتخاب دکمه "مشاهده محصول در محیط" امکان واقعیت افزوده فراهم می‌شود.',
          subsections: [
            {
              title: 'مشخصات فنی عکس کاور:',
              items: [
                'فرمت: JPG یا PNG',
                'حجم: کمتر از 1 مگابایت',
                'محتوا: می‌تواند هر چیزی باشد - عکس محصول، لوگوی برند، یا تصویر نمادین',
                'روش آپلود: Drag & Drop یا کلیک روی کارت',
              ],
            },
          ],
        },
      ],
      image: 'https://bytebase.armogroup.tech/api/v1/files/public/guideline-wall-mounted-2.webp',
    },
    {
      header: 'مرحله 3: آپلود فایل سه‌بعدی',
      sections: [
        {
          title: 'مشخصات فنی فایل سه‌بعدی',
          type: 'error' as const,
          content: 'الزامات فنی:',
          items: [
            'فرمت: GLB (اجباری)',
            'حجم: کمتر از 15 مگابایت',
            'تکسچرها: حتماً PBR (Physically Based Rendering)',
            'سایز مدل: مطابق با ابعاد واقعی محصول در فایل سه‌بعدی',
            'جانمایی: مطابق با فایل نمونه آرمو',
          ],
        },
        {
          title: 'دانلود فایل نمونه',
          type: 'success' as const,
          content:
            'برای درک بهتر ساختار مورد انتظار، فایل نمونه مدل سه‌بعدی محصولات دیواری را دانلود کنید:',
          items: [
            {
              name: 'فایل نمونه GLB - محصولات دیواری',
              url: 'https://bytebase.armogroup.tech/api/v1/files/public/guideline-wall-mounted.glb',
              type: 'download',
            },
          ],
        },
        {
          title: 'نحوه آپلود:',
          content:
            'فایل GLB را با Drag & Drop بکشید یا روی کارت کلیک کرده و فایل مورد نظر را انتخاب کنید.',
        },
      ],
      image: 'https://bytebase.armogroup.tech/api/v1/files/public/guideline-wall-mounted-3.webp',
    },
    {
      header: 'مرحله 4: تکمیل پروژه',
      sections: [
        {
          type: 'list' as const,
          items: [
            'پس از آپلود موفق فایل سه‌بعدی، دکمه "ادامه" فعال می‌شود',
            'با کلیک روی دکمه ادامه، پروژه در لحظه ساخته می‌شود',
            'صفحه تایید با دو گزینه نمایش داده می‌شود:',
          ],
        },
        {
          content: ['ایجاد پروژه جدید', 'اطلاعات پروژه'],
        },
      ],
      image: 'https://bytebase.armogroup.tech/api/v1/files/public/guideline-wall-mounted-4.webp',
    },
  ] as GuidelineStep[],

  // Project Management
  project_management: {
    title: 'مدیریت پروژه‌های محصولات دیواری',
    sections: [
      {
        title: 'مشاهده لیست پروژه‌ها',
        content:
          'از منوی سایدبار، گزینه "پروژه‌ها" را انتخاب کرده و سپس، دسته‌بندی محصولات دیواری را تعیین کنید. در این صفحه اطلاعات زیر نمایش داده می‌شود:',
        type: 'list' as const,
        items: [
          'نام پروژه',
          'تاریخ ایجاد',
          'تعداد مشاهده',
          'لینک AR (قابل کپی با یک کلیک)',
          'منوی سه نقطه برای دسترسی به گزینه‌های بیشتر',
        ],
        image: 'https://bytebase.armogroup.tech/api/v1/files/public/guideline-wall-mounted-5.webp',
      },
      {
        title: 'جزئیات و مدیریت پروژه',
        content: 'با کلیک بر روی نام هر پروژه، به صفحه جزئیات پروژه هدایت می‌شوید که شامل:',
        type: 'list' as const,
        items: [
          'لینک پروژه (قابل کپی)',
          'QR Code (قابل دانلود برای چاپ در کاتالوگ)',
          'دکمه گزارش عملکرد برای مشاهده آمار مارکتینگی:',
        ],
        subsections: [
          {
            items: ['تعداد مشاهده', 'مدت زمان بازدید', 'نوع مرورگرهای استفاده شده'],
          },
        ],
        image: 'https://bytebase.armogroup.tech/api/v1/files/public/guideline-wall-mounted-6.webp',
      },
      {
        title: 'ویرایش پروژه',
        content: 'از منوی سه نقطه کنار هر پروژه، می‌توانید:',
        subsections: [
          {
            title: 'تغییر نام پروژه',
          },
          {
            title: 'اضافه کردن لینک فروشگاه:',
            items: [
              'این لینک به عنوان دکمه "مشاهده در فروشگاه" در صفحه AR نمایش داده می‌شود',
              'مشتری مستقیماً به صفحه خرید محصول هدایت می‌شود',
              'برای افزایش نرخ تبدیل فروش ضروری است',
            ],
          },
        ],
      },
    ],
  },

  // Usage Applications
  usage_applications: {
    title: 'استفاده از لینک‌های تولید شده',
    sections: [
      {
        title: 'کاربردهای مختلف:',
        items: [
          'سایت فروشگاه: قرار دادن در صفحه محصول',
          'شبکه‌های اجتماعی: اشتراک‌گذاری در اینستاگرام، تلگرام',
          'کاتالوگ فیزیکی: چاپ QR Code',
          'نمایشگاه‌ها: نمایش در غرفه و استندها',
          'اپلیکیشن موبایل: ادغام در اپ فروشگاهی',
        ],
      },
    ],
  },

  // 3D File Solutions
  file_solutions: {
    title: '🎯 فایل سه‌بعدی ندارید؟',
    sections: [
      {
        title: 'راه‌حل 1: سفارش به تیم متخصص آرمو',
        content: 'مزایای سفارش به آرمو:',
        type: 'success' as const,
        items: [
          'تیم متخصص مدل‌سازی سه‌بعدی',
          'رعایت کامل استانداردهای آرمو',
          'کیفیت تضمین شده',
          'سازگاری کامل با سیستم',
        ],
        subsections: [
          {
            title: 'فرآیند سفارش:',
            type: 'list' as const,
            items: [
              'ارسال اطلاعات و تصاویر محصول به تیم آرمو',
              'بررسی میزان پیچیدگی محصول',
              'تعیین هزینه و زمان براساس پیچیدگی',
              'آماده‌سازی فایل مطابق استانداردها',
              'تست و تایید کیفیت',
              'تحویل فایل آماده برای آپلود',
            ],
          },
        ],
      },
      {
        title: 'راه‌حل 2: تولید با تیم داخلی',
        content: 'اگر تیم طراحی مدل‌سازی دارید:',
        type: 'info' as const,
        items: [
          'فایل‌های موجود را مطابق استانداردهای آرمو تنظیم کنید',
          'در اکانت آرمو آپلود کنید',
          'بدون درگیری اضافی از سرویس استفاده کنید',
          'کنترل کامل بر کیفیت و جزئیات',
        ],
        subsections: [
          {
            title: 'اگر فایل‌های سه‌بعدی موجود دارید:',
            items: [
              'بررسی سازگاری با فرمت GLB',
              'تنظیم سایز مطابق ابعاد واقعی',
              'آپلود مستقیم در سیستم',
            ],
          },
        ],
      },
    ],
  },

  // Related Services
  related_services: [
    {
      title: '🛋️ مبلمان',
      description: 'برای انواع مبل، صندلی، میز و سایر وسایل مبلمان',
      features: ['با خرید پلن محصولات دیواری، بدون هزینه اضافی دسترسی دارید'],
      links: [
        {
          text: 'مشاهده راهنمای کامل مبلمان',
          url: '/guidelines/furniture',
          type: 'link',
        },
      ],
    },
    {
      title: '🏠 لوازم خانگی',
      description: 'برای وسایل برقی خانگی، تجهیزات آشپزخانه و سایر لوازم',
      features: ['با خرید پلن محصولات دیواری، بدون هزینه اضافی دسترسی دارید'],
      links: [
        {
          text: 'مشاهده راهنمای کامل لوازم خانگی',
          url: '/guidelines/home_appliances',
          type: 'link',
        },
      ],
    },
    {
      title: '🛍️ ویترین',
      description: 'برای نمایش تا 10 محصول در یک پروژه واحد (مجموعه شلف‌ها، ست آشپزخانه)',
      features: ['با خرید پلن محصولات دیواری، بدون هزینه اضافی دسترسی دارید'],
      links: [
        {
          text: 'مشاهده راهنمای کامل ویترین',
          url: '/guidelines/vitrine',
          type: 'link',
        },
      ],
    },
  ] as GuidelineService[],

  // Best Practices
  best_practices: {
    title: 'نکات بهینه‌سازی برای محصولات دیواری',
    sections: [
      {
        title: 'انتخاب عکس کاور مؤثر',
        subsections: [
          {
            title: 'انتخاب‌های مناسب:',
            type: 'success' as const,
            items: [
              'عکس محصول در حالت نصب شده',
              'تصویری که کاربرد محصول را نشان دهد',
              'لوگوی برند با طراحی حرفه‌ای',
            ],
          },
          {
            title: 'اجتناب از:',
            type: 'error' as const,
            items: ['عکس‌های تار یا کم‌کیفیت', 'تصاویر نامرتبط', 'فایل‌های حجیم بالای 1 مگابایت'],
          },
        ],
      },
      {
        title: 'بهینه‌سازی مدل سه‌بعدی',
        content: 'نکات ویژه برای محصولات دیواری:',
        type: 'warning' as const,
        items: [
          'جهت‌گیری صحیح: مدل باید برای نصب روی دیوار طراحی شود',
          'نقاط اتصال: جزئیات نحوه نصب قابل مشاهده باشد',
          'تکسچرهای PBR: برای نمایش واقعی‌تر مواد',
          'سایز دقیق: مطابق ابعاد واقعی محصول',
        ],
      },
    ],
  },

  // Marketing Strategy
  marketing_strategy: {
    title: 'استراتژی بازاریابی',
    sections: [
      {
        title: 'تأکید بر ویژگی‌های کلیدی:',
        items: [
          'نمایش در موقعیت واقعی نصب',
          'معرفی سهولت نصب و استفاده',
          'نمایش تناسب با فضاهای مختلف',
        ],
      },
      {
        title: 'کاربردهای تخصصی:',
        items: [
          {
            title: 'طراحان داخلی:',
            description: 'کمک به انتخاب محصولات مناسب',
          },
          {
            title: 'مشتریان نوسازی:',
            description: 'تصمیم‌گیری بهتر برای بازسازی',
          },
          {
            title: 'معماران:',
            description: 'ادغام در پروژه‌های ساختمانی',
          },
        ],
      },
    ],
  },

  // FAQ
  faq: [
    {
      question: 'آیا می‌توانم محصولات مختلف (شلف + آینه) در یک پروژه قرار دهم؟',
      answer:
        'خیر، هر پروژه محصولات دیواری فقط برای یک محصول است. برای چندین محصول، از سرویس ویترین استفاده کنید.',
    },
    {
      question: 'تفاوت محصولات دیواری با سایر دسته‌بندی‌ها چیست؟',
      answer:
        'در محصولات دیواری، محصول روی دیوار نمایش داده می‌شود، در حالی که در سایر دسته‌بندی‌ها روی زمین قرار می‌گیرد.',
    },
    {
      question: 'برای محصولی که هم روی زمین و هم روی دیوار قابل نصب است، کدام سرویس را انتخاب کنم؟',
      answer:
        'براساس کاربرد اصلی محصول تصمیم بگیرید. اگر عمدتاً روی دیوار نصب می‌شود، محصولات دیواری را انتخاب کنید.',
    },
    {
      question: 'فایل سه‌بعدی ندارم و نمی‌دانم چگونه تهیه کنم؟',
      answer: 'تیم آرمو این خدمات را ارائه می‌دهد. هزینه و زمان براساس پیچیدگی محصول تعیین می‌شود.',
    },
    {
      question: 'آیا می‌توانم ارتفاع نصب محصول را در AR تنظیم کنم؟',
      answer:
        'سیستم به صورت خودکار ارتفاع مناسب را تشخیص می‌دهد، اما مشتری می‌تواند موقعیت را تنظیم کند.',
    },
    {
      question: 'آیا می‌توانم از مبلمان و لوازم خانگی نیز استفاده کنم؟',
      answer:
        'بله، با پلن محصولات دیواری بدون هزینه اضافی به همه ساب‌کتگوری‌های خانه و آشپزخانه دسترسی دارید.',
    },
  ] as GuidelineFAQ[],

  // Support
  support: {
    title: 'پشتیبانی و تماس',
    description:
      'برای راهنمایی بیشتر در آماده‌سازی فایل‌های سه‌بعدی، انتخاب بهترین روش نمایش محصولات یا رفع مشکلات فنی، می‌توانید با تیم پشتیبانی آرمو تماس بگیرید.',
    contact_button: {
      text: 'تماس با ما',
      url: 'https://armogroup.tech/contact-us/',
      type: 'button' as const,
    },
  },
};
