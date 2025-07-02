'use client';

/* eslint-disable consistent-return */
import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Clarity from '@microsoft/clarity';
import { CLARITY_PROJECT_ID } from './analytics';

export function TrackerProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      Clarity.init(CLARITY_PROJECT_ID!);
      Clarity.consent();
    }
    return undefined;
  }, []);

  useEffect(() => {
    if (!pathname) return undefined;

    const sessionId = `session_${Date.now()}`;
    const pageId = `page_${pathname}`;
    Clarity.identify(sessionId, sessionId, pageId);

    Clarity.setTag('page_url', window.location.href);
    Clarity.setTag('page_title', document.title);
    Clarity.setTag('pathname', pathname);

    Clarity.event('page_view');
    return undefined;
  }, [pathname]);

  useEffect(() => {
    if (!searchParams?.toString()) return undefined;

    Clarity.setTag('search_params', searchParams.toString());
    Clarity.event('search_params_changed');
    return undefined;
  }, [searchParams]);

  useEffect(() => {
    if (!pathname) return undefined;

    let startTime = Date.now();

    const handleVisibilityChange = () => {
      if (document.hidden) {
        const engagementTime = Math.round((Date.now() - startTime) / 1000);
        Clarity.setTag('engagement_time', engagementTime.toString());
        Clarity.event('user_engagement');
      } else {
        startTime = Date.now();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [pathname]);

  useEffect(() => {
    const handleInteraction = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (target.closest('a')) {
        const link = target.closest('a');
        Clarity.setTag('interaction_type', 'link');
        Clarity.setTag('link_url', link?.href || '');
        Clarity.setTag('link_text', link?.textContent?.trim() || '');
        Clarity.event('link_click');
      }

      if (target.closest('button')) {
        const button = target.closest('button');
        Clarity.setTag('interaction_type', 'button');
        Clarity.setTag('button_text', button?.textContent?.trim() || '');
        Clarity.setTag('button_type', button?.type || '');
        Clarity.event('button_click');
      }

      if (target.closest('form')) {
        const form = target.closest('form');
        Clarity.setTag('interaction_type', 'form');
        Clarity.setTag('form_id', form?.id || '');
        Clarity.setTag('form_name', form?.name || '');
        Clarity.event('form_interaction');
      }

      Clarity.setTag('element_tag', target.tagName.toLowerCase());
      Clarity.setTag('element_id', target.id || '');
      Clarity.setTag('element_class', target.className || '');
    };

    document.addEventListener('click', handleInteraction);
    return () => document.removeEventListener('click', handleInteraction);
  }, []);

  useEffect(() => {
    let maxScroll = 0;

    const handleScroll = () => {
      const scrollPercentage = Math.round(
        ((window.scrollY + window.innerHeight) / document.documentElement.scrollHeight) * 100
      );

      if (scrollPercentage > maxScroll) {
        maxScroll = scrollPercentage;
        Clarity.setTag('max_scroll_depth', maxScroll.toString());
        Clarity.event('scroll_depth_reached');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleError = (error: ErrorEvent) => {
      Clarity.setTag('error_message', error.message);
      Clarity.setTag('error_stack', error.error?.stack || '');
      Clarity.setTag('error_type', error.type);
      Clarity.event('error_occurred');
      Clarity.upgrade('error_detected');
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  return <>{children}</>;
}

export const trackCustomEvent = (eventName: string, tags?: Record<string, string | string[]>) => {
  if (process.env.NODE_ENV === 'production' && tags) {
    Object.entries(tags).forEach(([key, value]) => {
      Clarity.setTag(key, value);
    });
    Clarity.event(eventName);
  }
};
