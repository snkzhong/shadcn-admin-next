import {cookies} from 'next/headers';
import {getRequestConfig} from 'next-intl/server';
import {hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import {routing} from './routing';
 
export default getRequestConfig(async ({requestLocale}) => {
  const locale = await requestLocale;
  
  const _locale = hasLocale(routing.locales, locale)
    ? locale
    : routing.defaultLocale;
 
  return {
    locale: _locale,
    messages: (await import(`../../messages/${_locale}.json`)).default
  };
});