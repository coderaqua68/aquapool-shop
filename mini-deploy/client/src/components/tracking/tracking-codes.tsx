import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

interface TrackingSetting {
  id: number;
  key: string;
  value: string | null;
  description: string | null;
  category: string;
  isActive: boolean;
}

export default function TrackingCodes() {
  const { data: settings = [] } = useQuery<TrackingSetting[]>({
    queryKey: ["/api/tracking-settings"],
  });

  useEffect(() => {
    // Внедряем трекинг коды в head документа
    settings.forEach((setting) => {
      if (setting.isActive && setting.value) {
        switch (setting.key) {
          case 'yandex_metrica':
            injectYandexMetrica(setting.value);
            break;
          case 'google_analytics':
            injectGoogleAnalytics(setting.value);
            break;
          case 'google_tag_manager':
            injectGoogleTagManager(setting.value);
            break;
          case 'facebook_pixel':
            injectFacebookPixel(setting.value);
            break;
          case 'yandex_direct_pixel':
            injectYandexDirectPixel(setting.value);
            break;
          case 'vk_pixel':
            injectVKPixel(setting.value);
            break;
          default:
            // Для пользовательских кодов просто добавляем в head
            injectCustomCode(setting.value);
            break;
        }
      }
    });
  }, [settings]);

  const injectYandexMetrica = (code: string) => {
    if (document.getElementById('yandex-metrica')) return;
    
    const script = document.createElement('script');
    script.id = 'yandex-metrica';
    script.innerHTML = `
      (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
      m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
      (window, document, "script", "https://mc.yandex.ru/metrika/watch.js", "ym");
      ym(${code}, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true,
        webvisor:true
      });
    `;
    document.head.appendChild(script);

    // Добавляем noscript тег
    const noscript = document.createElement('noscript');
    noscript.innerHTML = `<div><img src="https://mc.yandex.ru/watch/${code}" style="position:absolute; left:-9999px;" alt="" /></div>`;
    document.body.appendChild(noscript);
  };

  const injectGoogleAnalytics = (code: string) => {
    if (document.getElementById('google-analytics')) return;
    
    const script1 = document.createElement('script');
    script1.id = 'google-analytics';
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${code}`;
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${code}');
    `;
    document.head.appendChild(script2);
  };

  const injectGoogleTagManager = (code: string) => {
    if (document.getElementById('google-tag-manager')) return;
    
    const script = document.createElement('script');
    script.id = 'google-tag-manager';
    script.innerHTML = `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${code}');
    `;
    document.head.appendChild(script);

    // Добавляем noscript тег для GTM
    const noscript = document.createElement('noscript');
    noscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${code}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
    document.body.appendChild(noscript);
  };

  const injectFacebookPixel = (code: string) => {
    if (document.getElementById('facebook-pixel')) return;
    
    const script = document.createElement('script');
    script.id = 'facebook-pixel';
    script.innerHTML = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${code}');
      fbq('track', 'PageView');
    `;
    document.head.appendChild(script);

    // Добавляем noscript тег
    const noscript = document.createElement('noscript');
    noscript.innerHTML = `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${code}&ev=PageView&noscript=1" />`;
    document.body.appendChild(noscript);
  };

  const injectYandexDirectPixel = (code: string) => {
    if (document.getElementById('yandex-direct-pixel')) return;
    
    const script = document.createElement('script');
    script.id = 'yandex-direct-pixel';
    script.innerHTML = `
      (function(w, d, n, s, t) {
        w[n] = w[n] || [];
        w[n].push(function() {
          Ya.Context.AdvManager.render({
            blockId: "${code}",
            renderTo: "yandex_rtb_${code}"
          });
        });
        t = d.getElementsByTagName("script")[0];
        s = d.createElement("script");
        s.type = "text/javascript";
        s.src = "//an.yandex.ru/system/context.js";
        s.async = true;
        t.parentNode.insertBefore(s, t);
      })(window, document, "yandexContextAsyncCallbacks");
    `;
    document.head.appendChild(script);
  };

  const injectVKPixel = (code: string) => {
    if (document.getElementById('vk-pixel')) return;
    
    const script = document.createElement('script');
    script.id = 'vk-pixel';
    script.innerHTML = `
      !function(){var t=document.createElement("script");t.type="text/javascript",t.async=!0,t.src='https://vk.com/js/api/openapi.js?169',t.onload=function(){VK.Retargeting.Init("${code}"),VK.Retargeting.Hit()},document.head.appendChild(t)}();
    `;
    document.head.appendChild(script);

    // Добавляем noscript тег
    const noscript = document.createElement('noscript');
    noscript.innerHTML = `<img src="https://vk.com/rtrg?p=${code}" style="position:fixed; left:-999px;" alt=""/>`;
    document.body.appendChild(noscript);
  };

  const injectCustomCode = (code: string) => {
    const script = document.createElement('script');
    script.innerHTML = code;
    document.head.appendChild(script);
  };

  return null; // Этот компонент не рендерит ничего видимого
}