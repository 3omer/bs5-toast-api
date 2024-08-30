const toast = {
  _lastId: 0,
  _css: {
    success: {
      theme: 'text-white bg-success',
      icon: 'bi bi-check-circle-fill',
    },
    error: {
      theme: 'bg-danger text-white',
      icon: 'bi bi-exclamation-circle-fill',
    },
    info: { theme: 'bg-info text-white', icon: 'bi bi-exclamation-lg' },
    primary: { theme: 'bg-primary text-white', icon: null },
    animation: { in: 'toast-in' },
  },
  variant: {
    success: 'success',
    error: 'error',
    info: 'info',
  },
  _duration: 5000,
  _autohide: true,
};

toast.init = function ({
  bsToastModule,
  container,
  errorIconCSS,
  successIconCSS,
  infoIconCSS,
}) {
  toast._bsToast = bsToastModule;
  toast._container = container;

  toast._dangerIconCSS = errorIconCSS || toast._css.error.icon;
  toast._successIconCSS = successIconCSS || toast._css.success.icon;
  toast._infoIconCSS = infoIconCSS || toast._css.info;

  return toast;
};

toast._appendDOM = function ({ message, theme, iconCSS, variant }) {
  const id = `toast-id-${toast._lastId++}`;

  const toastDiv = document.createElement('div');
  toastDiv.setAttribute('id', id);
  toastDiv.setAttribute(
    'class',
    `toast align-items-center border-0 ${theme} ${variant} ${toast._css.animation.in}`
  );

  toastDiv.innerHTML = `
  <div class="d-flex">
  <div class="align-items-center d-flex toast-body">
    ${iconCSS ? `<i class="fs-2 me-2 ${iconCSS}"></i>` : ''}
    <span class="">${message}</span>
    </div>
 
  <button type="button" 
    class="btn-close btn-close-white  me-2 m-auto"  data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
  </div>    
  `;

  toast._container.appendChild(toastDiv);
  return toastDiv;
};

toast._removeDOM = function (toastDiv) {
  toastDiv.remove();
};

toast.show = function ({
  message,
  iconCSS,
  theme,
  variant,
  duration,
  autohide,
}) {
  const _autohide = autohide === false ? false : toast._autohide;
  const _duration = duration || toast._duration;
  const _theme = theme || toast._css.primary.theme;

  const toastDiv = toast._appendDOM({
    message,
    theme: _theme,
    iconCSS,
    variant,
  });
  const bsToast = toast._bsToast.getOrCreateInstance(toastDiv, {
    delay: _duration, // bootstrap doesnt suuport this
    autohide: _autohide,
    animation: true, // no bs default animation
  });

  const currentToasts = Array.from(toast._container.querySelectorAll('.toast'));
  if (currentToasts.length > 1) {
    // we need to animate the container height expansion
  }

  bsToast.show();

  toastDiv.addEventListener('hide.bs.toast', () => {
    toastDiv.classList.add('toast-out');
    toastDiv.classList.remove('toast-in');
  });

  toastDiv.addEventListener('hidden.bs.toast', () => {
    // work around: wait for animation to end - assume its 1s
    setTimeout((_) => toast._removeDOM(toastDiv), 1000);
  });
};

// shorthand methods
// iconCSS: pass boolean to hide otherwise global config is used
toast.success = function ({ message, duration, autohide, iconCSS }) {
  let _iconCSS = iconCSS === undefined ? toast._css.success.icon : iconCSS;
  toast.show({
    message,
    autohide,
    duration,
    theme: toast._css.success.theme,
    variant: toast.variant.success,
    iconCSS: _iconCSS,
  });
};

toast.error = function ({ message, duration, autohide, iconCSS }) {
  let _iconCSS = iconCSS === undefined ? toast._css.error.icon : iconCSS;
  toast.show({
    message,
    autohide,
    duration,
    theme: toast._css.error.theme,
    varient: toast.variant.error,
    iconCSS: _iconCSS,
  });
};

toast.info = function ({ message, duration, autohide, iconCSS }) {
  let _iconCSS = iconCSS === undefined ? toast._css.info.icon : iconCSS;
  toast.show({
    message,
    autohide,
    duration,
    theme: toast._css.info.theme,
    varient: toast.variant.info,
    iconCSS: _iconCSS,
  });
};

// TODO:
// Global config: set once and forget for the whole project
// Replace phosphor icons with BS !!!!!!!!!?? WTF??
// Animate out option
// White theme

window.toast = toast;
