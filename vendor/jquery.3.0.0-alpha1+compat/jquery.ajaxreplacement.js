/*!
 * jQuery v.1.10.x and higher has "permission denied" problems with AJAX "PATCH"-requests in IE.
 * Those problems where solved in jQuery3.0.0-alpha1+compat.
 * But some application components has conflicts with newer jQuery version.
 * So for a while we need to use jQuery version related to ember-cli (1.11.x),
 * but replace some AJAX-related code with newer jQuery3.0.0-alpha1+compat version.
 */
(function(jQuery, document) {
  var ieVersion = document.documentMode ? document.documentMode : -1;
  if (ieVersion > 0 && ieVersion <= 8) {
    return;
  }

  var support = {};
  jQuery.ajaxSettings.xhr = function() {
    try {
      return new window.XMLHttpRequest();
    } catch ( e ) {}
  };

  var xhrSuccessStatus = {
      // file protocol always yields status code 0, assume 200
      0: 200,
      // Support: IE9
      // #1450: sometimes IE returns 1223 when it should be 204
      1223: 204
    },
    xhrSupported = jQuery.ajaxSettings.xhr();

  support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
  support.ajax = xhrSupported = !!xhrSupported;

  jQuery.ajaxTransport(function( options ) {
    var callback;

    // Cross domain only allowed if supported through XMLHttpRequest
    if ( support.cors || xhrSupported && !options.crossDomain ) {
      return {
        send: function( headers, complete ) {
          var i,
            xhr = options.xhr();

          xhr.open(
            options.type,
            options.url,
            options.async,
            options.username,
            options.password
          );

          // Apply custom fields if provided
          if ( options.xhrFields ) {
            for ( i in options.xhrFields ) {
              xhr[ i ] = options.xhrFields[ i ];
            }
          }

          // Override mime type if needed
          if ( options.mimeType && xhr.overrideMimeType ) {
            xhr.overrideMimeType( options.mimeType );
          }

          // X-Requested-With header
          // For cross-domain requests, seeing as conditions for a preflight are
          // akin to a jigsaw puzzle, we simply never set it to be sure.
          // (it can always be set on a per-request basis or even using ajaxSetup)
          // For same-domain requests, won't change header if already provided.
          if ( !options.crossDomain && !headers["X-Requested-With"] ) {
            headers["X-Requested-With"] = "XMLHttpRequest";
          }

          // Set headers
          for ( i in headers ) {
            xhr.setRequestHeader( i, headers[ i ] );
          }

          // Callback
          callback = function( type ) {
            return function() {
              if ( callback ) {
                callback = xhr.onload = xhr.onerror = null;

                if ( type === "abort" ) {
                  xhr.abort();
                } else if ( type === "error" ) {
                  complete(
                    // file: protocol always yields status 0; see #8605, #14207
                    xhr.status,
                    xhr.statusText
                  );
                } else {
                  complete(
                    xhrSuccessStatus[ xhr.status ] || xhr.status,
                    xhr.statusText,
                    // Support: IE9
                    // Accessing binary-data responseText throws an exception
                    // (#11426)
                    typeof xhr.responseText === "string" ? {
                      text: xhr.responseText
                    } : undefined,
                    xhr.getAllResponseHeaders()
                  );
                }
              }
            };
          };

          // Listen to events
          xhr.onload = callback();
          xhr.onerror = callback("error");

          // Create the abort callback
          callback = callback("abort");

          try {
            // Do send the request (this may raise an exception)
            xhr.send( options.hasContent && options.data || null );
          } catch ( e ) {
            // #14683: Only rethrow if this hasn't been notified as an error yet
            if ( callback ) {
              throw e;
            }
          }
        },

        abort: function() {
          if ( callback ) {
            callback();
          }
        }
      };
    }
  });
})(jQuery, document);

