import { environment } from '../environmet/environment';

export function initAnalytics() {
  if (environment.gaMeasurementId) {
    const gaScript = document.createElement('script');
    gaScript.async = true;
    gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${environment.gaMeasurementId}`;
    document.head.appendChild(gaScript);

    const inline = document.createElement('script');
    inline.text = `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', '${environment.gaMeasurementId}');`;
    document.head.appendChild(inline);
  }

  if (environment.clarityProjectId) {
    const clarity = document.createElement('script');
    clarity.text = `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, 'clarity', 'script', '${environment.clarityProjectId}');`;
    document.head.appendChild(clarity);
  }
}
