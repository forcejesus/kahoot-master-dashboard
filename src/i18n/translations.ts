import { TranslationKeys } from '@/types/i18n';

export const translations: {
  en: { [key in TranslationKeys]: string };
  fr: { [key in TranslationKeys]: string };
} = {
  en: {
    auth: {
      email: 'Email',
      password: 'Password',
      login: 'Sign In',
      loginTitle: 'Welcome Back',
      loginSubtitle: 'Sign in to your Kahoot account',
      rememberMe: 'Remember me',
      forgotPassword: 'Forgot password?',
      invalidCredentials: 'Invalid email or password',
      loginError: 'Login failed. Please try again.',
      loginSuccess: 'Successfully logged in!',
      loggingIn: 'Signing in...'
    },
    dashboard: {
      goodMorning: 'Good Morning',
      goodAfternoon: 'Good Afternoon',
      goodEvening: 'Good Evening',
      welcomeBack: 'Welcome back, {{name}}!',
      user: 'User',
      welcomeDescription: 'Manage your Kahoots, track your progress, and engage your learners with interactive quizzes.',
      totalKahoots: 'Total Kahoots',
      totalLearners: 'Total Learners',
      totalSessions: 'Active Sessions',
      loading: 'Loading...',
      noKahoots: 'No Kahoots found',
      myKahoots: 'My Kahoots',
      searchKahoots: 'Search Kahoots...',
      deleting: 'Deleting...',
      delete: 'Delete'
    },
    table: {
      title: 'Title',
      questions: 'Questions',
      sessions: 'Sessions',
      participants: 'Participants'
    },
    question: {
      type: 'Type',
      points: 'Points',
      duration: 'Duration',
      responses: 'Responses'
    },
    loading: {
      data: 'Loading data...',
      dataDescription: 'Fetching your Kahoots',
      deleting: 'Deleting...',
      deletingDescription: 'Deleting {{count}} Kahoot(s)',
      statsTitle: 'Loading Statistics',
      statsDescription: 'Gathering your data...'
    },
    success: {
      dataLoaded: 'Data loaded successfully',
      dataLoadedDescription: '{{count}} Kahoot(s) loaded',
      deleteSuccess: 'Successfully deleted',
      deleteSuccessDescription: '{{count}} Kahoot(s) deleted'
    },
    error: {
      loadingFailed: 'Failed to load data',
      loadingFailedDescription: 'Unable to fetch Kahoots',
      deleteFailed: 'Failed to delete',
      deleteFailedDescription: 'Unable to delete selected Kahoots'
    }
  },
  fr: {
    auth: {
      email: 'Email',
      password: 'Mot de passe',
      login: 'Se connecter',
      loginTitle: 'Bon retour',
      loginSubtitle: 'Connectez-vous à votre compte Kahoot',
      rememberMe: 'Se souvenir de moi',
      forgotPassword: 'Mot de passe oublié ?',
      invalidCredentials: 'Email ou mot de passe invalide',
      loginError: 'Échec de la connexion. Veuillez réessayer.',
      loginSuccess: 'Connexion réussie !',
      loggingIn: 'Connexion en cours...'
    },
    dashboard: {
      goodMorning: 'Bonjour',
      goodAfternoon: 'Bon après-midi',
      goodEvening: 'Bonsoir',
      welcomeBack: 'Bon retour, {{name}} !',
      user: 'Utilisateur',
      welcomeDescription: 'Gérez vos Kahoots, suivez vos progrès et engagez vos apprenants avec des quiz interactifs.',
      totalKahoots: 'Total des Kahoots',
      totalLearners: 'Total des Apprenants',
      totalSessions: 'Sessions Actives',
      loading: 'Chargement...',
      noKahoots: 'Aucun Kahoot trouvé',
      myKahoots: 'Mes Kahoots',
      searchKahoots: 'Rechercher des Kahoots...',
      deleting: 'Suppression...',
      delete: 'Supprimer'
    },
    table: {
      title: 'Titre',
      questions: 'Questions',
      sessions: 'Sessions',
      participants: 'Participants'
    },
    question: {
      type: 'Type',
      points: 'Points',
      duration: 'Durée',
      responses: 'Réponses'
    },
    loading: {
      data: 'Chargement des données...',
      dataDescription: 'Récupération de vos Kahoots',
      deleting: 'Suppression...',
      deletingDescription: 'Suppression de {{count}} Kahoot(s)',
      statsTitle: 'Chargement des Statistiques',
      statsDescription: 'Collecte de vos données...'
    },
    success: {
      dataLoaded: 'Données chargées avec succès',
      dataLoadedDescription: '{{count}} Kahoot(s) chargé(s)',
      deleteSuccess: 'Suppression réussie',
      deleteSuccessDescription: '{{count}} Kahoot(s) supprimé(s)'
    },
    error: {
      loadingFailed: 'Échec du chargement',
      loadingFailedDescription: 'Impossible de récupérer les Kahoots',
      deleteFailed: 'Échec de la suppression',
      deleteFailedDescription: 'Impossible de supprimer les Kahoots sélectionnés'
    }
  }
};
