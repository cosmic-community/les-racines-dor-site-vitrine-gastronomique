const fs = require('fs');
const path = require('path');

function injectConsoleCapture() {
  const outDir = path.join(process.cwd(), '.next');
  
  if (!fs.existsSync(outDir)) {
    console.log('No .next directory found, skipping console capture injection');
    return;
  }

  const scriptContent = `
    <script>
      (function() {
        if (window.self === window.top) return;
        
        const logs = [];
        const MAX_LOGS = 500;
        
        const originalConsole = {
          log: console.log,
          warn: console.warn,
          error: console.error,
          info: console.info,
          debug: console.debug
        };
        
        function captureLog(level, args) {
          const timestamp = new Date().toISOString();
          const message = args.map(arg => {
            if (typeof arg === 'object' && arg !== null) {
              try {
                return JSON.stringify(arg, (key, value) => {
                  if (typeof value === 'function') return '[Function]';
                  if (value instanceof Error) return value.toString();
                  return value;
                }, 2);
              } catch (e) {
                return '[Object]';
              }
            }
            return String(arg);
          }).join(' ');
          
          const logEntry = {
            timestamp,
            level,
            message,
            url: window.location.href
          };
          
          logs.push(logEntry);
          if (logs.length > MAX_LOGS) {
            logs.shift();
          }
          
          try {
            window.parent.postMessage({
              type: 'console-log',
              log: logEntry
            }, '*');
          } catch (e) {}
          
          originalConsole[level].apply(console, args);
        }
        
        console.log = function(...args) { captureLog('log', args); };
        console.warn = function(...args) { captureLog('warn', args); };
        console.error = function(...args) { captureLog('error', args); };
        console.info = function(...args) { captureLog('info', args); };
        console.debug = function(...args) { captureLog('debug', args); };
        
        window.addEventListener('error', function(event) {
          captureLog('error', [\`Uncaught Error: \${event.error ? event.error.toString() : event.message}\`]);
        });
        
        window.addEventListener('unhandledrejection', function(event) {
          captureLog('error', [\`Unhandled Promise Rejection: \${event.reason}\`]);
        });
        
        function sendReady() {
          try {
            window.parent.postMessage({
              type: 'console-capture-ready',
              url: window.location.href,
              timestamp: new Date().toISOString()
            }, '*');
            
            sendRouteChange();
          } catch (e) {}
        }
        
        function sendRouteChange() {
          try {
            window.parent.postMessage({
              type: 'route-change',
              route: {
                pathname: window.location.pathname,
                search: window.location.search,
                hash: window.location.hash,
                href: window.location.href
              },
              timestamp: new Date().toISOString()
            }, '*');
          } catch (e) {}
        }
        
        const originalPushState = history.pushState;
        const originalReplaceState = history.replaceState;
        
        history.pushState = function(...args) {
          originalPushState.apply(this, args);
          setTimeout(sendRouteChange, 0);
        };
        
        history.replaceState = function(...args) {
          originalReplaceState.apply(this, args);
          setTimeout(sendRouteChange, 0);
        };
        
        window.addEventListener('popstate', sendRouteChange);
        window.addEventListener('hashchange', sendRouteChange);
        
        if (document.readyState === 'loading') {
          window.addEventListener('load', sendReady);
        } else {
          setTimeout(sendReady, 0);
        }
      })();
    </script>
  `;

  function processHtmlFiles(dir) {
    if (!fs.existsSync(dir)) return;

    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        processHtmlFiles(filePath);
      } else if (file.endsWith('.html')) {
        try {
          let content = fs.readFileSync(filePath, 'utf8');
          
          if (!content.includes('console-capture-ready') && content.includes('<head>')) {
            content = content.replace('<head>', '<head>' + scriptContent);
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Injected console capture script into: ${filePath}`);
          }
        } catch (error) {
          console.warn(`Failed to process ${filePath}:`, error.message);
        }
      }
    });
  }

  try {
    processHtmlFiles(outDir);
    console.log('Console capture script injection completed');
  } catch (error) {
    console.warn('Console capture injection failed:', error.message);
  }
}

// Run the injection
injectConsoleCapture();