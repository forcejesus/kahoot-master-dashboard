
export type Language = 'fr' | 'en';

export interface TranslationKeys {
  // Authentication
  'auth.email': string;
  'auth.password': string;
  'auth.login': string;
  'auth.loginTitle': string;
  'auth.loginSubtitle': string;
  'auth.rememberMe': string;
  'auth.forgotPassword': string;
  'auth.invalidCredentials': string;
  'auth.loginError': string;
  'auth.loginSuccess': string;
  'auth.loggingIn': string;
  
  // Navigation
  'nav.logout': string;
  
  // Dashboard
  'dashboard.goodMorning': string;
  'dashboard.goodAfternoon': string;
  'dashboard.goodEvening': string;
  'dashboard.welcomeBack': string;
  'dashboard.user': string;
  'dashboard.welcomeDescription': string;
  'dashboard.totalKahoots': string;
  'dashboard.totalLearners': string;
  'dashboard.totalSessions': string;
  'dashboard.loading': string;
  'dashboard.noKahoots': string;
  'dashboard.myKahoots': string;
  'dashboard.searchKahoots': string;
  'dashboard.deleting': string;
  'dashboard.delete': string;
  
  // Table headers
  'table.title': string;
  'table.questions': string;
  'table.sessions': string;
  'table.participants': string;
  
  // Question details
  'question.type': string;
  'question.points': string;
  'question.duration': string;
  'question.responses': string;
  
  // Loading messages
  'loading.data': string;
  'loading.dataDescription': string;
  'loading.deleting': string;
  'loading.deletingDescription': string;
  'loading.statsTitle': string;
  'loading.statsDescription': string;
  
  // Success messages
  'success.dataLoaded': string;
  'success.dataLoadedDescription': string;
  'success.deleteSuccess': string;
  'success.deleteSuccessDescription': string;
  
  // Error messages
  'error.loadingFailed': string;
  'error.loadingFailedDescription': string;
  'error.deleteFailed': string;
  'error.deleteFailedDescription': string;
}

export type TranslationKey = keyof TranslationKeys;
