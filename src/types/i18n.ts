
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
  'auth.welcomeMessage': string;
  'auth.loginFailed': string;
  'auth.checkCredentials': string;
  'auth.title': string;
  'auth.subtitle': string;
  'auth.emailPlaceholder': string;
  'auth.passwordPlaceholder': string;
  'auth.signIn': string;
  'auth.secureEducator': string;
  
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
  'question.details': string;
  'question.id': string;
  'question.label': string;
  'question.time': string;
  'question.seconds': string;
  'question.chronoActive': string;
  'question.yes': string;
  'question.no': string;
  'question.date': string;
  'question.fileType': string;
  'question.gameId': string;
  
  // Delete dialogs
  'delete.confirm': string;
  'delete.confirmDescription': string;
  'delete.confirmDescriptionPlural': string;
  'delete.cancel': string;
  'delete.deleting': string;
  'delete.delete': string;
  
  // Planification
  'planification.accessPin': string;
  'planification.copyPin': string;
  'planification.from': string;
  'planification.to': string;
  'planification.type': string;
  'planification.standard': string;
  'planification.status': string;
  'planification.pending': string;
  'planification.limit': string;
  'planification.participants': string;
  
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
