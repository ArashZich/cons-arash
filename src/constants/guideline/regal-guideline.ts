// src/constants/guideline/regal-guideline.ts

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

// interface GuidelineService {
//   title: string;
//   description: string;
//   features?: string[];
//   image?: string;
//   links?: {
//     text: string;
//     url: string;
//     type: 'button' | 'link';
//   }[];
// }

interface GuidelineFAQ {
  question: string;
  answer: string;
}

interface ComparisonTable {
  headers: string[];
  rows: string[][];
}

export const regal_guideline = {
  // Header Information
  title: 'راهنمای کامل رگال فرش',
  subtitle: 'معرفی سرویس رگال فرش',
  description:
    'رگال فرش یکی از سرویس‌های منحصر به فرد آرمو است که امکان نمایش تا 50 طرح فرش در یک پروژه واحد را فراهم می‌کند. این سرویس تجربه‌ای مشابه رگال‌های فیزیکی فروشگاه‌ها ارائه می‌دهد که کاربران می‌توانند فرش‌ها را "ورق بزنند" و در محیط سه‌بعدی مشاهده کنند.',

  // Unique Feature
  unique_feature: {
    title: 'ویژگی منحصر به فرد:',
    content:
      'بدون هزینه اضافی! اگر پلن فعال در دسته‌بندی فرش دارید، می‌توانید از رگال فرش نیز استفاده کنید.',
    type: 'warning' as const,
  },

  // Differences with other services
  differences: {
    title: 'تفاوت رگال فرش با سایر سرویس‌ها:',
    items: [
      {
        title: '🆚 شوروم مجازی:',
        description: 'نمایش آلبوم‌وار جداگانه با اسم و سایز',
      },
      {
        title: '✅ رگال فرش:',
        description: 'نمایش یکپارچه در محیط سه‌بعدی با قابلیت ورق زدن',
      },
    ],
  },

  // Use Cases
  use_cases: {
    title: 'کاربردهای عملی رگال فرش:',
    items: [
      'مجموعه‌های یکسان: نمایش طرح‌های مختلف با سایز یکسان',
      'کالکشن فصلی یا موضوعی: گروه‌بندی براساس سبک یا فصل',
      'تنوع رنگی: ارائه رنگ‌های مختلف از یک طرح',
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
            'از منوی دسته‌بندی‌ها، گزینه رگال فرش را انتخاب کنید',
            'دکمه ادامه فعال شده و آن را کلیک کنید',
          ],
        },
      ],
      image: 'https://bytebase.armogroup.tech/api/v1/files/public/guideline-regal-1.webp',
    },
    {
      header: 'مرحله 2: اطلاعات پروژه رگال',
      sections: [
        {
          title: 'نام‌گذاری پروژه',
          type: 'error' as const,
          content: 'محدودیت‌های نام‌گذاری:',
          items: [
            'فقط حروف و اعداد انگلیسی استفاده کنید',
            'کاراکترهای غیر مجاز: فاصله، نقطه (.)، پرانتز ()، اسلش (/)، آندرلاین (_)، دو نقطه (:)، نقطه ویرگول (;)',
            'پیشنهاد: استفاده از کد محصول یا نام کالکشن',
          ],
        },
        {
          title: 'مثال نام‌های صحیح:',
          type: 'chips' as const,
          items: [
            { name: 'collection2024spring' },
            { name: 'modernstyle01' },
            { name: 'redcarpets' },
          ],
        },
        {
          title: 'آپلود عکس کاور پروژه',
          content: 'این عکس نماینده کل رگال شماست و الزاماً نیاز نیست عکس فرش باشد. می‌تواند:',
          items: ['لوگوی برند شما', 'عکس کلی از کالکشن', 'تصویر نمادین مجموعه'],
        },
        {
          title: 'مشخصات فنی عکس کاور:',
          type: 'info' as const,
          items: [
            'فرمت: JPG یا PNG',
            'حجم: کمتر از 1 مگابایت',
            'روش آپلود: فایل را با Drag & Drop بکشید یا روی کارت کلیک کرده و فایل مورد نظر را انتخاب کنید.',
          ],
        },
      ],
      image: 'https://bytebase.armogroup.tech/api/v1/files/public/guideline-regal-2.webp',
    },
    {
      header: 'مرحله 3: انتخاب شکل و سایز رگال',
      sections: [
        {
          title: 'انتخاب شکل رگال:',
        },
      ],
      image: 'https://bytebase.armogroup.tech/api/v1/files/public/guideline-regal-3.webp',
    },
    {
      header: 'مرحله 4: آپلود فرش‌های رگال',
      sections: [
        {
          title: 'ظرفیت رگال:',
          type: 'success' as const,
          items: [
            'حداکثر 50 عکس فرش در یک رگال',
            'همه فرش‌ها در یک لینک واحد قرار می‌گیرند',
            'امکان ورق زدن بین فرش‌ها در محیط سه‌بعدی',
          ],
        },
        {
          title: 'مشخصات فنی عکس‌های فرش:',
          type: 'warning' as const,
          items: [
            'فرمت فایل: PNG یا JPG',
            'حجم هر عکس: کمتر از 1 مگابایت',
            'نمای عکس: کاملاً روبرو و بدون حاشیه اضافی',
            'برای فرش دایره‌ای: فایل PNG با پس‌زمینه شفاف اجباری',
            'یکسان‌سازی: تمام فرش‌ها باید سایز یکسان را داشته باشند',
          ],
        },
      ],
      image: 'https://bytebase.armogroup.tech/api/v1/files/public/guideline-regal-4.webp',
    },
    {
      header: 'مرحله 5: تکمیل و ایجاد رگال',
      sections: [
        {
          title: 'روش آپلود فرش‌ها:',
          type: 'list' as const,
          items: [
            'عکس‌ها را با Drag & Drop بکشید یا روی کارت کلیک کرده و فایل مورد نظر را انتخاب کنید.',
            'پس از انتخاب، علامت ضربدر برای حذف هر عکس نمایش داده می‌شود',
            'دکمه "حذف همه" برای پاک کردن تمام انتخاب‌ها',
          ],
        },
        {
          title: 'نهایی‌سازی:',
          type: 'list' as const,
          items: [
            'پس از انتخاب تمام فرش‌ها، روی دکمه "آپلود" کلیک کنید',
            'دکمه "ادامه" فعال شده و آن را کلیک کنید',
            'رگال فرش در لحظه ساخته می‌شود',
            'لینک رگال آماده استفاده است',
            'صفحه تایید با دو گزینه نمایش داده می‌شود:',
          ],
        },
        {
          content: ['ایجاد پروژه جدید', 'اطلاعات پروژه'],
        },
      ],
    },
  ] as GuidelineStep[],

  // Project Management
  project_management: {
    title: 'مدیریت پروژه‌های رگال فرش',
    sections: [
      {
        title: 'مشاهده لیست پروژه‌ها',
        content:
          'از منوی سایدبار، گزینه "پروژه‌ها" را انتخاب کرده و سپس، دسته‌بندی رگال را تعیین کنید. در این صفحه موارد زیر نمایش داده می‌شود:',
        type: 'list' as const,
        items: [
          'نام پروژه',
          'تاریخ ایجاد',
          'تعداد مشاهده',
          'لینک AR (قابل کپی با یک کلیک)',
          'منوی سه نقطه برای دسترسی به گزینه‌های بیشتر',
        ],
        image: 'https://bytebase.armogroup.tech/api/v1/files/public/guideline-regal-5.webp',
      },
      {
        title: 'جزئیات و مدیریت پروژه',
        content: 'با کلیک بر روی نام هر پروژه، به صفحه جزئیات پروژه هدایت می‌شوید که شامل:',
        type: 'list' as const,
        items: [
          'لینک پروژه (قابل کپی)',
          'QR Code (قابل دانلود برای چاپ در کاتالوگ)',
          'گزارش عملکرد: آمار کامل مارکتینگی شامل:',
        ],
        subsections: [
          {
            items: ['تعداد مشاهده', 'مدت زمان بازدید', 'نوع مرورگرهای استفاده شده'],
          },
        ],
      },
    ],
  },

  // Optimization Tips
  optimization: {
    title: 'نکات بهینه‌سازی رگال',
    sections: [
      {
        title: 'انتخاب فرش‌های مناسب:',
        type: 'list' as const,
        items: [
          'ترجیحاً فرش‌هایی با سایز یکسان',
          'تنوع در رنگ و طرح',
          'کیفیت مشابه و قیمت‌گذاری منطقی',
        ],
      },
      {
        title: 'سازمان‌دهی محتوا:',
        type: 'list' as const,
        items: [
          'ترتیب فرش‌ها از پرفروش به کم‌فروش',
          'گروه‌بندی براساس رنگ یا سبک',
          'قرار دادن فرش‌های جذاب در ابتدا',
        ],
      },
    ],
  },

  // Advantages
  advantages: {
    title: 'مزایای رگال فرش نسبت به سایر روش‌ها',
    sections: [
      {
        title: 'تفاوت‌های کلیدی با سرویس فرش معمولی',
        type: 'table' as const,
        items: {
          headers: ['ویژگی', 'سرویس فرش معمولی', 'رگال فرش'],
          rows: [
            ['تعداد محصول', '10 عکس حداکثر', '50 عکس حداکثر'],
            ['لینک محصولات', 'هر فرش لینک جداگانه', 'همه در یک لینک'],
            ['نحوه نمایش', 'تک‌تک قابل دسترسی', 'ورق زدن یکپارچه'],
            ['کاربرد', 'فرش‌های مستقل', 'مجموعه و کالکشن'],
            ['تجربه کاربری', 'انتخاب مستقیم محصول', 'مرور و مقایسه'],
          ],
        } as ComparisonTable,
      },
      {
        title: 'تجربه کاربری منحصر به فرد:',
        subsections: [
          {
            title: 'در رگال فرش:',
            type: 'success' as const,
            items: [
              'مشاهده فرش‌ها در کنار یکدیگر',
              'ورق زدن مانند رگال فیزیکی',
              'انتخاب و مشاهده فوری با واقعیت افزوده',
              'احساس حضور در فروشگاه واقعی',
            ],
          },
          {
            title: 'در شوروم مجازی:',
            type: 'info' as const,
            items: [
              'نمایش لیست‌وار محصولات',
              'کلیک جداگانه برای هر محصول',
              'مشاهده اطلاعات تکمیلی (نام، سایز)',
            ],
          },
        ],
      },
    ],
  },

  // Performance Comparison
  performance_comparison: {
    title: 'مقایسه عملکرد و انتخاب بهینه',
    sections: [
      {
        title: 'چه زمانی از رگال فرش استفاده کنیم؟',
        subsections: [
          {
            title: 'مناسب برای:',
            type: 'success' as const,
            items: [
              'کالکشن‌های همگن (سایز یکسان)',
              'نمایش تنوع رنگی یک طرح',
              'ارائه مجموعه فصلی یا موضوعی',
              'فضاهای نمایشگاهی محدود',
              'تجربه مشابه خرید حضوری',
            ],
          },
          {
            title: 'مناسب نیست برای:',
            type: 'error' as const,
            items: [
              'فرش‌هایی با سایزهای کاملاً متفاوت',
              'محصولات مستقل بدون ارتباط موضوعی',
              'زمانی که نیاز به جزئیات هر محصول دارید',
            ],
          },
        ],
      },
      {
        title: 'راهنمای انتخاب سرویس مناسب:',
        items: [
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
      },
    ],
  },

  // Demo Link
  demo_link: {
    text: '🔗 تست نمونه رگال',
    url: 'https://webar.armogroup.tech/showroom/546e5373-5760-11f0-a535-fe3a0e44f5b8',
    type: 'link' as const,
  },

  // FAQ
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
  ] as GuidelineFAQ[],

  // Support
  support: {
    title: 'پشتیبانی و تماس',
    description:
      'برای راهنمایی بیشتر در انتخاب نوع سرویس مناسب یا رفع مشکلات فنی، می‌توانید با تیم پشتیبانی آرمو تماس بگیرید.',
    contact_button: {
      text: 'تماس با ما',
      url: 'https://armogroup.tech/contact-us/',
      type: 'button' as const,
    },
  },
};
