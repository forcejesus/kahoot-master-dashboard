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
  'auth.resetPassword': string;
  'auth.resetPasswordTitle': string;
  'auth.resetPasswordSubtitle': string;
  'auth.sendResetLink': string;
  'auth.sendingResetLink': string;
  'auth.backToLogin': string;
  'auth.resetLinkSent': string;
  'auth.resetLinkSentDescription': string;
  'auth.resetLinkError': string;
  'auth.resetLinkErrorDescription': string;
  
  // Navigation
  'nav.logout': string;
  'nav.profile': string;
  'nav.settings': string;
  'nav.loggingOut': string;
  
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

  // Create Kahoot
  'create.title': string;
  'create.kahoot': string;
  'create.newKahoot': string;
  'create.titleLabel': string;
  'create.titlePlaceholder': string;
  'create.imageLabel': string;
  'create.addImage': string;
  'create.changeImage': string;
  'create.cancel': string;
  'create.creating': string;
  'create.success': string;
  'create.error': string;
  'create.titleRequired': string;

  // Game Setup
  'game.setup': string;
  'game.configuration': string;
  'game.backToDashboard': string;
  'game.addQuestion': string;
  'game.questionForm': string;

  // Question Form
  'form.questionLabel': string;
  'form.questionPlaceholder': string;
  'form.duration': string;
  'form.enableTimer': string;
  'form.questionType': string;
  'form.selectType': string;
  'form.points': string;
  'form.selectPoints': string;
  'form.answers': string;
  'form.answer': string;
  'form.correctAnswer': string;
  'form.addAnswer': string;
  'form.removeAnswer': string;
  'form.selectCorrect': string;
  'form.addQuestion': string;
  'form.adding': string;

  // Game Details
  'details.backToDashboard': string;
  'details.title': string;
  'details.questions': string;
  'details.planifications': string;
  'details.sessions': string;
  'details.statistics': string;
  'details.noQuestions': string;
  'details.noPlanifications': string;
  'details.noSessions': string;

  // Schedule
  'schedule.title': string;
  'schedule.sessionFor': string;
  'schedule.createSession': string;

  // Not Found
  'notFound.title': string;
  'notFound.message': string;
  'notFound.returnHome': string;

  // Planification Details
  'planDetails.title': string;
  'planDetails.backButton': string;
  'planDetails.deleteButton': string;
  'planDetails.confirmDelete': string;
  'planDetails.confirmDeleteDesc': string;
  'planDetails.deleting': string;
  'planDetails.sessionStats': string;
  'planDetails.participants': string;
  'planDetails.noParticipants': string;
  'planDetails.notFound': string;
  'planDetails.notFoundDesc': string;
  'planDetails.loading': string;

  // Breadcrumbs
  'breadcrumb.dashboard': string;
  'breadcrumb.game': string;
  'breadcrumb.planification': string;
  'breadcrumb.details': string;
}

export type TranslationKey = keyof TranslationKeys;
