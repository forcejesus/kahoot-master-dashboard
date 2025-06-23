export type Language = 'en' | 'fr';

export type TranslationKey = keyof TranslationKeys;

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
  'auth.passwordChanged': string;
  'auth.passwordChangedSuccess': string;
  
  // Nav translations
  'nav.logout': string;
  'nav.profile': string;
  'nav.settings': string;
  'nav.loggingOut': string;

  // Dashboard translations
  'dashboard.goodMorning': string;
  'dashboard.goodAfternoon': string;
  'dashboard.goodEvening': string;
  'dashboard.welcomeBack': string;
  'dashboard.user': string;
  'dashboard.welcomeDescription': string;
  'dashboard.trackProgress': string;
  'dashboard.engageLearners': string;
  'dashboard.totalKahoots': string;
  'dashboard.totalLearners': string;
  'dashboard.totalSessions': string;
  'dashboard.loading': string;
  'dashboard.noKahoots': string;
  'dashboard.myKahoots': string;
  'dashboard.searchKahoots': string;
  'dashboard.deleting': string;
  'dashboard.delete': string;

  // Table translations
  'table.title': string;
  'table.questions': string;
  'table.sessions': string;
  'table.participants': string;

  // Question translations  
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

  // Delete translations
  'delete.confirm': string;
  'delete.confirmDescription': string;
  'delete.confirmDescriptionPlural': string;
  'delete.cancel': string;
  'delete.deleting': string;
  'delete.delete': string;

  // Planification translations
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
  'planification.allStatuses': string;
  'planification.inProgress': string;
  'planification.completed': string;
  'planification.allTypes': string;
  'planification.public': string;
  'planification.assigned': string;
  'planification.searchPlaceholder': string;
  'planification.filterByStatus': string;
  'planification.filterByType': string;
  'planification.bestScore': string;
  'planification.activeUntil': string;
  'planification.sessionEnded': string;
  'planification.viewPlanification': string;
  'planification.loading': string;
  'planification.noMatchingResults': string;

  // Loading translations
  'loading.data': string;
  'loading.dataDescription': string;
  'loading.deleting': string;
  'loading.deletingDescription': string;
  'loading.statsTitle': string;
  'loading.statsDescription': string;

  // Success translations
  'success.dataLoaded': string;
  'success.dataLoadedDescription': string;
  'success.deleteSuccess': string;
  'success.deleteSuccessDescription': string;

  // Error translations
  'error.loadingFailed': string;
  'error.loadingFailedDescription': string;
  'error.deleteFailed': string;
  'error.deleteFailedDescription': string;

  // Create game translations
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
  'create.subtitle': string;
  'create.gameInfo': string;
  'create.optional': string;
  'create.imageFormats': string;
  'create.selectedFile': string;
  'create.preview': string;

  // Game translations
  'game.setup': string;
  'game.configuration': string;
  'game.backToDashboard': string;
  'game.addQuestion': string;
  'game.questionForm': string;

  // Form translations
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

  // Details translations
  'details.backToDashboard': string;
  'details.title': string;
  'details.questions': string;
  'details.planifications': string;
  'details.sessions': string;
  'details.statistics': string;
  'details.noQuestions': string;
  'details.noPlanifications': string;
  'details.noSessions': string;

  // Schedule translations
  'schedule.title': string;
  'schedule.sessionFor': string;
  'schedule.createSession': string;

  // Not found translations
  'notFound.title': string;
  'notFound.message': string;
  'notFound.returnHome': string;

  // Plan details translations
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

  // Breadcrumb translations
  'breadcrumb.dashboard': string;
  'breadcrumb.game': string;
  'breadcrumb.planification': string;
  'breadcrumb.details': string;

  // Planifications translations
  'planifications.loading': string;
  'planifications.empty': string;
  'planifications.emptyDescription': string;
  'planifications.startCreating': string;
  'planifications.filter': string;
  'planifications.allStatuses': string;
  'planifications.allTypes': string;
  'planifications.search': string;

  // Create game additional translations
  'createGame.coverImage': string;
  'createGame.uploadCover': string;
  'createGame.dragDrop': string;
  'createGame.maxSize': string;
  'createGame.formats': string;
  'createGame.gameTitle': string;
  'createGame.titlePlaceholder': string;
  'createGame.createButton': string;
  'createGame.creatingButton': string;

  // Password reset translations
  'passwordReset.success': string;
  'passwordReset.successMessage': string;
  'passwordReset.loginButton': string;
}
