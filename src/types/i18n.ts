
export type Language = 'fr' | 'en';

export interface TranslationKeys {
  // Authentication
  'auth.title': string;
  'auth.subtitle': string;
  'auth.email': string;
  'auth.emailPlaceholder': string;
  'auth.password': string;
  'auth.passwordPlaceholder': string;
  'auth.signIn': string;
  'auth.loggingIn': string;
  'auth.forgotPassword': string;
  'auth.secureEducator': string;
  'auth.loginSuccess': string;
  'auth.welcomeMessage': string;
  'auth.loginFailed': string;
  'auth.checkCredentials': string;
  
  // Navigation
  'nav.logout': string;
  'nav.dashboard': string;
  'nav.planification': string;
  
  // Dashboard
  'dashboard.title': string;
  'dashboard.totalKahoots': string;
  'dashboard.totalLearners': string;
  'dashboard.createKahoot': string;
  'dashboard.noKahoots': string;
  'dashboard.loading': string;
  
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
  
  // Table headers
  'table.title': string;
  'table.questions': string;
  'table.sessions': string;
  'table.participants': string;
  
  // Game details
  'game.questions': string;
  'game.planifications': string;
  'game.sessions': string;
  'game.noQuestions': string;
  'game.deleteConfirm': string;
  'game.deleteConfirmDescription': string;
  'game.delete': string;
  'game.cancel': string;
  'game.schedule': string;
  
  // Question details
  'question.details': string;
  'question.id': string;
  'question.label': string;
  'question.time': string;
  'question.chronoActive': string;
  'question.chronoEnabled': string;
  'question.chronoDisabled': string;
  'question.date': string;
  'question.type': string;
  'question.points': string;
  'question.fileType': string;
  'question.gameId': string;
  'question.seconds': string;
  'question.yes': string;
  'question.no': string;
  
  // Delete confirmation
  'delete.confirm': string;
  'delete.confirmDescription': string;
  'delete.confirmDescriptionPlural': string;
  'delete.deleting': string;
  'delete.cancel': string;
  'delete.delete': string;
  
  // Planification
  'planification.scheduleGame': string;
  'planification.schedulingFor': string;
  'planification.accessPin': string;
  'planification.copyPin': string;
  'planification.from': string;
  'planification.to': string;
  'planification.at': string;
  'planification.type': string;
  'planification.limit': string;
  'planification.participants': string;
  'planification.standard': string;
  'planification.noPlans': string;
  'planification.noPlanFilters': string;
  'planification.searchPlaceholder': string;
  'planification.status': string;
  'planification.allStatuses': string;
  'planification.pending': string;
  'planification.inProgress': string;
  'planification.completed': string;
  'planification.allTypes': string;
  'planification.public': string;
  'planification.assigned': string;
  
  // Common
  'common.home': string;
  'common.back': string;
  'common.save': string;
  'common.edit': string;
  'common.create': string;
  'common.update': string;
  'common.search': string;
  'common.filter': string;
  'common.all': string;
  'common.none': string;
  'common.or': string;
  'common.and': string;
  'common.with': string;
  'common.without': string;
  'common.total': string;
  'common.found': string;
}

export type TranslationKey = keyof TranslationKeys;
