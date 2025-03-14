
import { Question, QuestionReponse } from "@/types/game-details";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageIcon, TimerIcon, Check, Clock, Info, Calendar, Hash, ToggleLeft, ToggleRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface QuestionCardProps {
  question: Question;
  index: number;
  token: string;
}

export function QuestionCard({ question, index, token }: QuestionCardProps) {
  // Get the image URL
  const imageUrl = question.fichier 
    ? `http://kahoot.nos-apps.com/${question.fichier}`
    : question.image 
      ? `http://kahoot.nos-apps.com/${question.image}`
      : null;

  // Check if reponses is an array of objects (new format) or array of strings (old format)
  const isNewResponseFormat = question.reponses && 
    question.reponses.length > 0 && 
    typeof question.reponses[0] !== 'string';

  return (
    <Card key={index} className="border border-gray-100 shadow-sm hover:shadow-md transition-all">
      <CardHeader className="bg-gray-50 rounded-t-lg">
        <CardTitle className="text-lg flex justify-between items-center">
          <span>Question {index + 1}: {question.libelle}</span>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{question.temps || "30"} sec</span>
            </Badge>
            {question.limite_response ? (
              <Badge variant="success" className="flex items-center gap-1">
                <TimerIcon className="h-3 w-3" />
                <span>Chrono activé</span>
              </Badge>
            ) : (
              <Badge variant="outline" className="flex items-center gap-1">
                <TimerIcon className="h-3 w-3" />
                <span>Sans chrono</span>
              </Badge>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-4">
        {/* Question Image */}
        {imageUrl ? (
          <div className="relative w-full h-[200px] rounded-lg overflow-hidden border border-gray-100">
            <img
              src={imageUrl}
              alt={`Image question ${index + 1}`}
              className="object-contain w-full h-full"
            />
          </div>
        ) : (
          <div className="flex items-center justify-center w-full h-[100px] bg-gray-100 rounded-lg">
            <div className="text-gray-400 flex flex-col items-center">
              <ImageIcon className="w-8 h-8 mb-1" />
              <span className="text-sm">Aucune image</span>
            </div>
          </div>
        )}
        
        {/* Question Answers with Expanded Details - Focus on responses details */}
        <div className="space-y-4 mt-4">
          <h3 className="font-medium text-base">Réponses détaillées:</h3>
          
          {isNewResponseFormat ? (
            // New response format - reponses is an array of objects with reponse_texte property
            <div className="space-y-4">
              {(question.reponses as QuestionReponse[]).map((reponse, rIndex) => {
                if (!reponse) return null;
                
                return (
                  <Card key={rIndex} className={`border ${
                    reponse.etat ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-100'
                  }`}>
                    <CardHeader className="py-3 px-4">
                      <CardTitle className="text-lg flex justify-between items-center">
                        <span className={`${reponse.etat ? 'text-green-700' : ''}`}>
                          {reponse.reponse_texte || "Réponse sans texte"}
                        </span>
                        {reponse.etat ? (
                          <Badge variant="success" className="flex items-center gap-1">
                            <Check className="w-3 h-3" />
                            <span>Correcte</span>
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="flex items-center gap-1">
                            <ToggleLeft className="w-3 h-3" />
                            <span>Incorrecte</span>
                          </Badge>
                        )}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="py-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-2 bg-white/60 rounded border border-gray-100">
                          <div className="flex items-center gap-1 text-sm font-medium text-gray-700 mb-1">
                            <Calendar className="w-3.5 h-3.5" /> 
                            <span>Date de création</span>
                          </div>
                          <div className="text-sm">
                            {new Date(reponse.date).toLocaleDateString('fr-FR', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </div>
                        </div>
                        
                        <div className="p-2 bg-white/60 rounded border border-gray-100">
                          <div className="flex items-center gap-1 text-sm font-medium text-gray-700 mb-1">
                            <Clock className="w-3.5 h-3.5" /> 
                            <span>Heure</span>
                          </div>
                          <div className="text-sm">
                            {new Date(reponse.date).toLocaleTimeString('fr-FR', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </div>
                        </div>
                        
                        <div className="p-2 bg-white/60 rounded border border-gray-100">
                          <div className="flex items-center gap-1 text-sm font-medium text-gray-700 mb-1">
                            <ToggleRight className="w-3.5 h-3.5" /> 
                            <span>Statut</span>
                          </div>
                          <div className="text-sm">
                            {reponse.etat ? "Réponse correcte" : "Réponse incorrecte"}
                          </div>
                        </div>
                        
                        <div className="p-2 bg-white/60 rounded border border-gray-100">
                          <div className="flex items-center gap-1 text-sm font-medium text-gray-700 mb-1">
                            <Info className="w-3.5 h-3.5" /> 
                            <span>Version</span>
                          </div>
                          <div className="text-sm">
                            {reponse.__v !== undefined ? `v${reponse.__v}` : "N/A"}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            // Old response format - reponses is an array of strings
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Array.isArray(question.reponses) && (question.reponses as string[]).map((reponse, rIndex) => {
                const isCorrect = reponse === question.reponse_correcte;
                
                return (
                  <Card key={rIndex} className={`border ${
                    isCorrect ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-100'
                  }`}>
                    <CardHeader className="py-3 px-4">
                      <CardTitle className="text-base flex justify-between items-center">
                        <span className={isCorrect ? 'text-green-700' : ''}>
                          {reponse}
                        </span>
                        {isCorrect && (
                          <Badge variant="success" className="flex items-center gap-1">
                            <Check className="w-3 h-3" />
                            <span>Correcte</span>
                          </Badge>
                        )}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="py-2">
                      <div className="p-2 bg-white/60 rounded border border-gray-100">
                        <div className="flex items-center gap-1 text-sm font-medium text-gray-700 mb-1">
                          <Info className="w-3.5 h-3.5" /> 
                          <span>Détails</span>
                        </div>
                        <div className="text-sm">
                          {isCorrect 
                            ? "Cette réponse est marquée comme correcte" 
                            : "Cette réponse est incorrecte"}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
        
        {/* Question details - Simplified */}
        <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
          <h3 className="font-medium text-base mb-2">Informations sur la question:</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div><span className="font-medium">Type:</span> {question.typeQuestion?.libelle || "Non spécifié"}</div>
            <div><span className="font-medium">Points:</span> {question.point?.valeur || 0}</div>
            <div><span className="font-medium">Temps:</span> {question.temps || "30"} secondes</div>
            <div><span className="font-medium">Chrono:</span> {question.limite_response ? "Activé" : "Désactivé"}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
