function gtag_report_conversion(url) {
  var callback = function () {
    if (typeof(url) != 'undefined') {
      window.location = url;
    }
  };
  gtag('event', 'conversion', {
      'send_to': 'AW-699780384/VxUWCPno37EBEKCa180C',
      'event_callback': callback
  });
  return false;
}