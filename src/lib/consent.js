const initializedManagers = new WeakSet();

export function initializeConsentManager(scope) {
  const manager = scope.silktideConsentManager;
  if (!manager || typeof manager.init !== "function") return false;
  if (initializedManagers.has(manager)) return true;
  manager.init(createConsentConfig(scope));
  initializedManagers.add(manager);
  return true;
}

export function createConsentConfig(scope) {
  return {
  backdrop: {
    show: true
  },
  icon: {
    position: "bottomLeft"
  },
  prompt: {
    position: "bottomLeft"
  },
  consentTypes: [
    {
      id: "essential",
      label: "Essential",
      description: "<p>These cookies are necessary for the website to function properly and cannot be switched off. They help with things like logging in and setting your privacy preferences.</p>",
      required: true,
      onAccept: function() {
        console.log('Add logic for the required Essential consent type here');
      }
    },
    {
      id: "analytics",
      label: "Analytics",
      description: "<p>These cookies help us improve the site by tracking which pages are most popular and how visitors move around the site.</p>",
      required: false,
      onAccept: function() {
        scope.dataLayer = scope.dataLayer || [];
        function gtag(){ scope.dataLayer.push(arguments); }
        gtag('consent', 'update', {
          analytics_storage: 'granted',
          personalization_storage: 'granted'
        });
      },
      onReject: function() {
        scope.dataLayer = scope.dataLayer || [];
        function gtag(){ scope.dataLayer.push(arguments); }
        gtag('consent', 'update', {
          analytics_storage: 'denied',
          personalization_storage: 'denied'
        });
      }
    },
    {
      id: "marketing",
      label: "Marketing",
      description: "<p>These cookies are used by us and our advertising partners to show you relevant ads on this site and elsewhere, and to measure how those campaigns perform.</p>",
      required: false,
      onAccept: function() {
        scope.dataLayer = scope.dataLayer || [];
        function gtag(){ scope.dataLayer.push(arguments); }
        gtag('consent', 'update', {
          ad_storage: 'granted',
          ad_user_data: 'granted',
          ad_personalization: 'granted'
        });
      },
      onReject: function() {
        scope.dataLayer = scope.dataLayer || [];
        function gtag(){ scope.dataLayer.push(arguments); }
        gtag('consent', 'update', {
          ad_storage: 'denied',
          ad_user_data: 'denied',
          ad_personalization: 'denied'
        });
      }
    }
  ],
  text: {
    prompt: {
      description: "<p>We use cookies on our site to enhance your user experience, provide personalized content, and analyze our traffic.</p>",
      acceptAllButtonText: "Accept all",
      acceptAllButtonAccessibleLabel: "Accept all cookies",
      rejectNonEssentialButtonText: "Reject non-essential",
      rejectNonEssentialButtonAccessibleLabel: "Reject all non-essential cookies",
      preferencesButtonText: "Preferences",
      preferencesButtonAccessibleLabel: "Toggle preferences"
    },
    preferences: {
      title: "Customize your cookie preferences",
      description: "<p>We respect your right to privacy. You can choose not to allow some types of cookies. Your cookie preferences will apply across our website.</p>",
      saveButtonText: "Save and close",
      saveButtonAccessibleLabel: "Save your cookie preferences",
      creditLinkText: "Get this banner for free",
      creditLinkAccessibleLabel: "Get this banner for free"
    }
  }
};
}
