// src/constants/guideline/carpet-guideline.ts

// Types for dynamic guideline structure
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

interface GuidelineBlock {
  title: string;
  sections: GuidelineSection[];
  divider?: boolean;
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

export const carpet_guideline = {
  // Header Information
  title: 'راهنمای کامل سرویس فرش',
  subtitle: 'معرفی سرویس واقعیت افزوده فرش',
  description:
    'سرویس واقعیت افزوده فرش، پرمخاطب‌ترین سرویس آرمو است که به کاربران امکان ایجاد تجربه واقعیت افزوده برای فرش‌های خود را می‌دهد',

  // Unique Feature
  unique_feature: {
    title: 'ویژگی منحصر به فرد آرمو:',
    content:
      'تنها با آپلود عکس فرش‌ها می‌توانید پروژه واقعیت افزوده بسازید و نیازی به مدلسازی سه‌بعدی ندارید.',
    type: 'warning' as const,
  },

  // Key Features
  key_features: {
    title: 'قابلیت‌های کلیدی سرویس:',
    items: [
      {
        title: 'دسترسی تحت وب:',
        description: 'بدون نیاز به نصب اپلیکیشن، اجرای مستقیم در مرورگر',
      },
      {
        title: 'ساخت خودکار و آنی:',
        description: 'تبدیل عکس‌ها به AR در کمتر از چند ثانیه',
      },
      {
        title: 'تنظیم دقیق ابعاد:',
        description: 'پشتیبانی از فرش‌های مستطیلی و دایره‌ای با سایز دلخواه',
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
            'از منوی دسته‌بندی‌ها، گزینه فرش را انتخاب کنید',
            'دکمه ادامه فعال شده و آن را کلیک کنید',
          ],
        },
      ],
      image: 'https://bytebase.armogroup.tech/api/v1/files/public/guideline-carpet-1.webp',
    },
    {
      header: 'مرحله 2: انتخاب شکل و سایز فرش',
      sections: [
        {
          title: 'انتخاب شکل فرش:',
        },
        {
          title: 'فرش مستطیلی:',
          content: 'سایزهای پیش‌فرض:',
          subsections: [
            {
              type: 'chips' as const,
              items: [
                { name: '6 متری', dimensions: '200 × 300' },
                { name: '9 متری', dimensions: '250 × 350' },
                { name: '12 متری', dimensions: '300 × 400' },
                { name: 'سایز دلخواه', dimensions: null },
              ],
            },
          ],
        },
        {
          title: 'فرش دایره‌ای:',
          content: 'سایزهای پیش‌فرض:',
          subsections: [
            {
              type: 'chips' as const,
              items: [
                { name: '1متری', dimensions: '100 سانتی‌متر' },
                { name: '1.5متری', dimensions: '150 سانتی‌متر' },
                { name: '3 متری', dimensions: '200 سانتی‌متر' },
                { name: 'سایز دلخواه', dimensions: null },
              ],
            },
          ],
        },
        {
          title: 'نکات مهم وارد کردن ابعاد:',
          type: 'error' as const,
          items: [
            'طول و عرض را دقیقاً مطابق تصویر نمونه وارد کنید. اگر برعکس وارد کنید، تصویر بدشکل می‌شود',
            'برای فرش دایره‌ای، فایل PNG با پس‌زمینه شفاف (Transparent) اجباری است.',
            'برای فرش دایره‌ای، به جای طول و عرض، فقط قطر را وارد کنید',
            'پس از ساخت پروژه، امکان تغییر ابعاد وجود ندارد',
            'سایز انتخاب شده برای هر 10 عکس اعمال می‌شود',
          ],
        },
      ],
      image: 'https://bytebase.armogroup.tech/api/v1/files/public/guideline-carpet-2.webp',
    },
    {
      header: 'مرحله 3: نام‌گذاری و آپلود عکس محصولات',
      sections: [
        {
          title: 'نکته کلیدی نام‌گذاری:',
          type: 'info' as const,
          items: [
            'نام عکس = نام پروژه در سیستم',
            'بهتر است کد محصول را به عنوان نام انتخاب کنید',
            'این نام در لیست پروژه‌ها و شوروم مجازی نمایش داده می‌شود',
            'محدودیتی برای نام فارسی یا انگلیسی نیست',
          ],
        },
        {
          title: 'نکات مهم برای آپلود عکس:',
          type: 'warning' as const,
          items: [
            'حداکثر 10 عکس به صورت همزمان قابل آپلود است',
            'فرمت فایل: فقط JPG یا PNG',
            'حجم فایل: کمتر از 1 مگابایت',
            'نمای عکس: کاملاً روبرو و بدون هیچ حاشیه اضافی (عکس از دکور خانه نگذارید - فقط نمای مستقیم فرش)',
          ],
        },
        {
          title: 'نحوه آپلود:',
          type: 'list' as const,
          items: [
            'عکس‌ها را با Drag & Drop بکشید یا روی کارت کلیک کرده و فایل مورد نظر را انتخاب کنید.',
            'پس از انتخاب، علامت ضربدر برای حذف هر عکس نمایش داده می‌شود',
            'دکمه "حذف همه" برای پاک کردن تمام انتخاب‌ها',
          ],
        },
      ],
      image: 'https://bytebase.armogroup.tech/api/v1/files/public/guideline-carpet-3.webp',
    },
    {
      header: 'مرحله 4: تکمیل پروژه',
      sections: [
        {
          type: 'list' as const,
          items: [
            'روی دکمه "آپلود" کلیک کنید',
            'پس از آپلود موفق، دکمه "ادامه" فعال می‌شود',
            'پروژه در لحظه ساخته می‌شود',
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
    title: 'مدیریت پروژه‌های فرش',
    sections: [
      {
        title: 'مشاهده لیست پروژه‌ها',
        content:
          'از منوی سایدبار، گزینه "پروژه‌ها" را انتخاب کرده و سپس، دسته‌بندی فرش را تعیین کنید. در این صفحه موارد زیر نمایش داده می‌شود:',
        type: 'list' as const,
        items: [
          'نام پروژه (و سایز انتخاب شده)',
          'تاریخ ایجاد',
          'تعداد مشاهده',
          'لینک AR (قابل کپی با یک کلیک)',
          'منوی سه نقطه برای دسترسی به گزینه‌های بیشتر',
        ],
        image: 'https://bytebase.armogroup.tech/api/v1/files/public/guideline-carpet-4.webp',
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
        image: 'https://bytebase.armogroup.tech/api/v1/files/public/guideline-carpet-5.webp',
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
              'مشتری مستقیماً به صفحه خرید هدایت می‌شود',
              'برای سرویس مشاور هوش مصنوعی ضروری است',
            ],
          },
        ],
        image: 'https://bytebase.armogroup.tech/api/v1/files/public/guideline-carpet-6.webp',
      },
    ],
  },

  // Additional Services
  additional_services: [
    {
      title: 'مشاور هوش مصنوعی - انقلاب در فروش آنلاین',
      description:
        'تصور کنید مشتری شما فقط یک عکس از اتاقش می‌گیرد و در عرض چند ثانیه، فرش‌های ایده‌آل پیشنهاد می‌شود',
      features: [
        'آپلود عکس: مشتری عکس فضای مورد نظر می‌فرستد',
        'تحلیل هوشمند: پالت رنگی، سبک دکوراسیون، نوع مبلمان',
        'پیشنهاد هوشمند: انتخاب بهترین گزینه‌ها از محصولات شما',
        'تست واقعیت افزوده: مشاهده هر پیشنهاد در فضای واقعی',
      ],
      links: [
        {
          text: '🔗 تست مشاور هوش مصنوعی',
          url: 'https://recommender-carpet.armogroup.tech/',
          type: 'link',
        },
      ],
    },
    {
      title: 'شوروم مجازی - نمایشگاه دیجیتال محصولات',
      description:
        'تمام فرش‌های شما در یک نمایشگاه دیجیتال زیبا گردآوری می‌شوند. مانند یک کاتالوگ آنلاین تعاملی',
      features: [
        'بروزرسانی خودکار با اضافه/حذف محصولات',
        'نمایش اطلاعات کامل: عکس، نام، سایز',
        'دسترسی مستقیم به واقعیت افزوده هر محصول',
        'سازگار با تمام دستگاه‌ها',
      ],
      links: [
        {
          text: '🔗 مشاهده نمونه شوروم مجازی',
          url: 'https://showroom.armogroup.tech/31219912-c659-46bc-9d4c-2dc23a0c6b6c/',
          type: 'link',
        },
      ],
    },
    {
      title: 'رگال فرش - نمایش مجموعه‌ای',
      description: 'برای نمایش کالکشن فصلی یا موضوعی با امکان "ورق زدن" در محیط سه‌بعدی یکپارچه',
      features: [
        'حداکثر 50 طرح در یک پروژه',
        'همه در یک لینک واحد',
        'تجربه مشابه رگال فیزیکی فروشگاه‌ها',
      ],
      links: [
        {
          text: '📖 راهنمای کامل رگال فرش',
          url: '/guidelines/regal',
          type: 'link',
        },
      ],
    },
  ] as GuidelineService[],

  // FAQ
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
  ] as GuidelineFAQ[],

  // Support
  support: {
    title: 'پشتیبانی و تماس',
    description:
      'برای راهنمایی بیشتر یا رفع مشکلات فنی، می‌توانید با تیم پشتیبانی آرمو تماس بگیرید.',
    contact_button: {
      text: 'تماس با ما',
      url: 'https://armogroup.tech/contact-us/',
      type: 'button' as const,
    },
  },
};
