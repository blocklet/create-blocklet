import { withQuery } from 'ufo';

/**
 * Generates an HTML string containing a spinner with optional color and image.
 *
 * @param {Object} options - The options for generating the HTML.
 * @param {string} options.color - The color of the spinner. Defaults to "#333".
 * @param {string} options.image - The URL of the image to display alongside the spinner.
 * @param {boolean} options.showPoweredBy - Whether to show the "Powered by" text.
 * @param {string} [options.poweredByText='Powered by ArcBlock'] - The text to display for "Powered by".
 * @return {string} The generated HTML string.
 */
function generateHtml({ color, image, showPoweredBy, poweredByText = 'Powered by ArcBlock' }) {
  return `<style>
  #loadingSpinnerWrapper {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
    animation-name: fadeIn;
    animation-duration: 500ms;
    animation-timing-function: ease;
    animation-iteration-count: 1;
    animation-delay: 500ms;
    animation-fill-mode: forwards;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  #loadingSpinnerWrapper .spinner {
    width: 70px;
    text-align: center;
  }

  #loadingSpinnerWrapper .spinner>.bounce1,
  #loadingSpinnerWrapper .spinner>.bounce2,
  #loadingSpinnerWrapper .spinner>.bounce3 {
    width: 18px;
    height: 18px;

    background-color: ${color};

    border-radius: 100%;
    display: inline-block;
    -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
    animation: sk-bouncedelay 1.4s infinite ease-in-out both;
  }

  #loadingSpinnerWrapper .spinner .bounce1 {
    -webkit-animation-delay: -0.32s;
    animation-delay: -0.32s;
  }

  #loadingSpinnerWrapper .spinner .bounce2 {
    -webkit-animation-delay: -0.16s;
    animation-delay: -0.16s;
  }

  #loadingImageWrapper {
    width: 70px;
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 16px;
  }

  #loadingImageWrapper.loading-image {
    border-radius: 4px;
    background-color: oklch(87.2% 0.01 258.338);
    animation: 2s ease-in-out 0.5s infinite none running skeleton;
  }

  #loadingImage {
    display: inline-block;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }


  @-webkit-keyframes skeleton {
    0% { opacity: 0.6; }
    50% { opacity: 0.4; }
    100% { opacity: 0.6; }
  }
  @keyframes skeleton {
    0% { opacity: 0.6; }
    50% { opacity: 0.4; }
    100% { opacity: 0.6; }
  }

  @-webkit-keyframes fadeIn {
    0% { opacity: 0; }
    50% { opacity: 0.4; }
    100% { opacity: 1; }
  }
  @keyframes fadeIn {
    0% { opacity: 0; }
    50% { opacity: 0.4; }
    100% { opacity: 1; }
  }

  @-webkit-keyframes sk-bouncedelay {
    0%,
    80%,
    100% {
      -webkit-transform: scale(0);
    }
    40% {
      -webkit-transform: scale(1);
    }
  }

  @keyframes sk-bouncedelay {
    0%,
    80%,
    100% {
      -webkit-transform: scale(0);
      transform: scale(0);
    }
    40% {
      -webkit-transform: scale(1);
      transform: scale(1);
    }
  }

  #loadingPoweredBy {
    position: fixed;
    color: oklch(70.7% 0.022 261.325);
    bottom: 16px;
    left: 0;
    right: 0;
    text-align: center;
    opacity: ${showPoweredBy ? 1 : 0.01};
  }

  </style>
  <div id="loadingSpinnerWrapper">
    <div id="loadingImageWrapper" class="loading-image"></div>
    <div class="spinner">
      <div class="bounce1"></div>
      <div class="bounce2"></div>
      <div class="bounce3"></div>
    </div>
  </div>
  <div id="loadingPoweredBy">${poweredByText}</div>
  <script>
    (() => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

      let logo = "${image}";

      if (window?.blocklet) {
        const { appLogo, appLogoDark } = window.blocklet;
        if (appLogo) {
          logo = isDark && appLogoDark ? appLogoDark : appLogo;
        }
      }
      const img = document.createElement('img');
      img.id = 'loadingImage';
      img.src = logo;
      img.onload = () => {
        const loadingImageWrapper = document.getElementById('loadingImageWrapper');
        loadingImageWrapper.appendChild(img);
        loadingImageWrapper.classList.remove('loading-image');
      };
    })();
  </script>`;
}

/**
 * Creates a loading plugin for Vite.
 *
 * @param {Object} options - The options for the loading plugin.
 * @param {string} [options.loadingElementId='app'] - The ID of the loading element.
 * @param {string} [options.loadingColor='#8abaf0'] - The color of the loading animation.
 * @param {string} [options.loadingImage='/.well-known/service/blocklet/logo?imageFilter=convert&f=png&w=80'] - The URL of the loading image.
 * @param {boolean} [options.loadingShowPoweredBy=true] - Whether to show the "Powered by" text.
 * @param {string} [options.loadingPoweredByText='Powered by ArcBlock'] - The text to display for "Powered by".
 * @return {Object} - The Vite plugin object.
 */
export default function createLoadingPlugin({
  loadingElementId = 'app',
  loadingColor = '#8abaf0',
  loadingImage,
  loadingShowPoweredBy = true,
  loadingPoweredByText = 'Powered by ArcBlock',
} = {}) {
  if (!loadingImage) {
    loadingImage = withQuery('/.well-known/service/blocklet/logo', {
      imageFilter: 'convert',
      f: 'png',
      w: 80,
    });
  }
  const injectHtml = generateHtml({
    color: loadingColor,
    image: loadingImage,
    showPoweredBy: loadingShowPoweredBy,
    poweredByText: loadingPoweredByText,
  });

  return {
    name: 'blocklet:loading',
    enforce: 'post',
    transformIndexHtml(html) {
      return html.replace(`<div id="${loadingElementId}"></div>`, `<div id="${loadingElementId}">${injectHtml}</div>`);
    },
  };
}
